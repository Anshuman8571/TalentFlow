import Dexie, { Table } from 'dexie';
import { Job, Candidate, Assessment, AssessmentResponse, StatusChange, Note } from '../../types';

// Define the database schema
class TalentFlowDatabase extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  assessments!: Table<Assessment>;
  assessmentResponses!: Table<AssessmentResponse>;
  statusChanges!: Table<StatusChange>;
  notes!: Table<Note>;

  constructor() {
    super('talentFlowDB');
    
    // Define tables and their primary keys and indexes
    this.version(1).stores({
      jobs: 'id, slug, status, *tags',
      candidates: 'id, name, email, currentStage, appliedJobId',
      assessments: 'id, jobId',
      assessmentResponses: 'id, assessmentId, candidateId',
      statusChanges: 'id, candidateId, timestamp',
      notes: 'id, candidateId, createdAt, *mentions'
    });
  }

  // Helper methods for jobs
  async getAllJobs(): Promise<Job[]> {
    return this.jobs.toArray();
  }

  async getJobById(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobBySlug(slug: string): Promise<Job | undefined> {
    return this.jobs.where('slug').equals(slug).first();
  }

  async addJob(job: Job): Promise<string> {
    return this.jobs.add(job);
  }

  async updateJob(id: string, changes: Partial<Job>): Promise<number> {
    return this.jobs.update(id, changes);
  }

  async deleteJob(id: string): Promise<void> {
    return this.jobs.delete(id);
  }

  // Helper methods for candidates
  async getAllCandidates(): Promise<Candidate[]> {
    return this.candidates.toArray();
  }

  async getCandidateById(id: string): Promise<Candidate | undefined> {
    return this.candidates.get(id);
  }

  async getCandidatesByStage(stage: string): Promise<Candidate[]> {
    return this.candidates.where('currentStage').equals(stage).toArray();
  }

  async addCandidate(candidate: Candidate): Promise<string> {
    return this.candidates.add(candidate);
  }

  async updateCandidate(id: string, changes: Partial<Candidate>): Promise<number> {
    return this.candidates.update(id, changes);
  }

  async deleteCandidate(id: string): Promise<void> {
    return this.candidates.delete(id);
  }

  // Helper methods for assessments
  async getAllAssessments(): Promise<Assessment[]> {
    return this.assessments.toArray();
  }

  async getAssessmentById(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentsByJobId(jobId: string): Promise<Assessment[]> {
    return this.assessments.where('jobId').equals(jobId).toArray();
  }

  async addAssessment(assessment: Assessment): Promise<string> {
    return this.assessments.add(assessment);
  }

  async updateAssessment(id: string, changes: Partial<Assessment>): Promise<number> {
    return this.assessments.update(id, changes);
  }

  async deleteAssessment(id: string): Promise<void> {
    return this.assessments.delete(id);
  }

  // Helper methods for assessment responses
  async getAssessmentResponseById(id: string): Promise<AssessmentResponse | undefined> {
    return this.assessmentResponses.get(id);
  }

  async getAssessmentResponsesByAssessmentId(assessmentId: string): Promise<AssessmentResponse[]> {
    return this.assessmentResponses.where('assessmentId').equals(assessmentId).toArray();
  }

  async getAssessmentResponsesByCandidateId(candidateId: string): Promise<AssessmentResponse[]> {
    return this.assessmentResponses.where('candidateId').equals(candidateId).toArray();
  }

  async addAssessmentResponse(response: AssessmentResponse): Promise<string> {
    return this.assessmentResponses.add(response);
  }

  // Helper methods for status changes
  async addStatusChange(statusChange: StatusChange): Promise<string> {
    return this.statusChanges.add(statusChange);
  }

  async getStatusChangesByCandidateId(candidateId: string): Promise<StatusChange[]> {
    return this.statusChanges
      .where('candidateId')
      .equals(candidateId)
      .sortBy('timestamp');
  }

  // Helper methods for notes
  async addNote(note: Note): Promise<string> {
    return this.notes.add(note);
  }

  async getNotesByCandidateId(candidateId: string): Promise<Note[]> {
    return this.notes
      .where('candidateId')
      .equals(candidateId)
      .sortBy('createdAt');
  }

  async updateNote(id: string, changes: Partial<Note>): Promise<number> {
    return this.notes.update(id, changes);
  }

  async deleteNote(id: string): Promise<void> {
    return this.notes.delete(id);
  }
}

// Create and export a single instance of the database
const db = new TalentFlowDatabase();
export default db;