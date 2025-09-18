// Common types for the TalentFlow application

// Job related types
export type JobStatus = 'active' | 'archived';
export type JobTag = string;

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: JobStatus;
  tags: JobTag[];
  location: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

// Candidate related types
export type HiringStage = 'Applied' | 'Screening' | 'Technical' | 'Offer' | 'Rejected' | 'Hired' | 'Managerial' | 'HR';

export interface StatusChange {
  id: string;
  candidateId: string;
  fromStage: HiringStage | null;
  toStage: HiringStage;
  timestamp: string;
  note?: string;
}

export interface Note {
  id: string;
  candidateId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  mentions: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentStage: HiringStage;
  appliedJobId: string;
  resume: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusChange[];
  notes: Note[];
}

// Assessment related types
export type QuestionType = 'single-choice' | 'multi-choice' | 'text' | 'numeric' | 'file-upload';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  conditionalOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  options: string[];
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: 'multi-choice';
  options: string[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  maxLength?: number;
}

export interface NumericQuestion extends BaseQuestion {
  type: 'numeric';
  min?: number;
  max?: number;
}

export interface FileUploadQuestion extends BaseQuestion {
  type: 'file-upload';
  allowedFileTypes?: string[];
}

// export type Question = 
//   | SingleChoiceQuestion 
//   | MultiChoiceQuestion 
//   | TextQuestion 
//   | NumericQuestion 
//   | FileUploadQuestion;

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  maxLength?: number;
  min?: number;
  max?: number;
  allowedFileTypes?: string[];
  conditionalQuestions?: {
    parentAnswer: string;
    // This removes the recursive part of the type, fixing the circular reference.
    question: Omit<Question, 'conditionalQuestions'>;
  }[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  correctAnswer?: string; // This was missing
  correctAnswers?: string[]; // This was missing
}

export interface Assessment {
  id: string;
  jobId: string;
  title: string;
  description?: string;
  sections: AssessmentSection[];
  createdAt: string;
  updatedAt: string;
}

// Response types
export type QuestionResponse = {
  questionId: string;
  value: string | string[] | number | File | null;
};

export interface AssessmentResponse {
  id: string;
  assessmentId: string;
  candidateId: string;
  submittedAt: string;
  answers: {
    questionId: string;
    value: any; // Can be string, string[], number, etc.
  }[];
}