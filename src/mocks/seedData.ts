import { Job, Candidate, Assessment, AssessmentSection, QuestionType, HiringStage, AssessmentResponse } from '../types';

// Helper function to generate a random date within the last 3 months
const getRandomRecentDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  return new Date(
    threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  ).toISOString();
};

// Helper function to generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get multiple random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// --- JOB DATA ---
const jobTitles = [
  'Software Engineer', 'Product Manager', 'UI/UX Designer', 'Data Scientist', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'QA Engineer', 'Technical Writer', 'Engineering Manager', 'Mobile Developer', 'Machine Learning Engineer', 'Business Analyst',
];
const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Gurgaon', 'Noida', 'Remote'];
const departments = ['Engineering', 'Product', 'Design', 'Data Science', 'Marketing', 'Sales'];
const jobTags = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'Scrum', 'Remote', 'Fintech', 'SaaS', 'E-commerce'];
const jobDescriptions = [
  'Join our dynamic team in Bangalore to work on cutting-edge technologies and deliver exceptional user experiences.',
  'We are seeking an experienced professional for our Gurgaon office to help us build scalable and robust systems.',
  'In this remote-friendly role, you will collaborate with cross-functional teams to design, develop, and deploy innovative solutions.',
];

// --- CANDIDATE DATA ---
const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Ayaan', 'Atharva', 'Krishna', 'Ishaan', 'Shaurya', 'Dhruv', 'Kabir', 'Aarush', 'Veer', 'Samar', 'Shivansh', 'Aanya', 'Aadhya', 'Ananya', 'Pari', 'Aisha', 'Kiara', 'Myra', 'Sara', 'Siya', 'Aarohi', 'Anvi', 'Prisha', 'Riya',
];
const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Jain', 'Shah', 'Mehta', 'Agarwal', 'Reddy', 'Rao', 'Nair', 'Menon', 'Pillai', 'Iyer', 'Mukherjee', 'Banerjee', 'Das', 'Dutta', 'Desai', 'Patil', 'Kaur', 'Malhotra', 'Kapoor',
];
const hiringStages: HiringStage[] = ['Applied', 'Screening', 'Technical', 'Offer', 'Rejected', 'Hired','Managerial','HR'];

// Generate 25 seed jobs
export const generateJobs = (): Job[] => {
  const jobs: Job[] = [];
  for (let i = 0; i < 25; i++) {
    const title = `${getRandomItem(jobTitles)} - ${getRandomItem(locations)}`;
    const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    jobs.push({
      id: crypto.randomUUID(),
      title,
      slug,
      description: getRandomItem(jobDescriptions),
      department: getRandomItem(departments),
      location: getRandomItem(locations),
      tags: getRandomItems(jobTags, getRandomInt(2, 5)),
      status: i < 15 ? 'active' : 'archived',
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate(),
      order: i,
    });
  }
  return jobs;
};

// Generate 1000 seed candidates
export const generateCandidates = (jobs: Job[]): Candidate[] => {
  const candidates: Candidate[] = [];
  const activeJobs = jobs.filter(job => job.status === 'active');
  if (activeJobs.length === 0) return [];

  for (let i = 0; i < 1000; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${i}@example.com`;
    candidates.push({
      id: crypto.randomUUID(),
      name: `${firstName} ${lastName}`,
      email,
      phone: `+91${getRandomInt(7000000000, 9999999999)}`,
      currentStage: getRandomItem(hiringStages),
      appliedJobId: getRandomItem(activeJobs).id,
      resume: 'resume_stub.pdf',
      statusHistory: [],
      notes: [],
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate(),
    });
  }
  return candidates.sort((a, b) => a.name.localeCompare(b.name));
};


// --- ASSESSMENT DATA ---
const assessmentTemplates = [
    {
      title: 'Frontend Engineering Assessment',
      description: 'Evaluates core frontend development skills in React and TypeScript.',
      sections: [
        { id: crypto.randomUUID(), title: 'React Fundamentals', description: 'Testing core React knowledge.', questions: [
            { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is JSX?', required: true, options: ['A JavaScript syntax extension', 'A templating language', 'A CSS preprocessor'], },
            { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the difference between state and props.', required: true, maxLength: 500 },
        ]},
        { id: crypto.randomUUID(), title: 'TypeScript Knowledge', description: 'Testing core TypeScript knowledge.', questions: [
            { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which of the following are valid TypeScript types?', required: true, options: ['string', 'number', 'variant', 'boolean'] },
        ]}
      ],
    },
    {
      title: 'Product Management Case Study',
      description: 'Assesses product thinking, strategy, and market awareness.',
      sections: [
        { id: crypto.randomUUID(), title: 'Market Analysis', description: '', questions: [
            { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Identify the target audience for a new fintech app in Tier 2 Indian cities.', required: true },
        ]},
      ],
    },
    {
      title: 'UI/UX Design Challenge',
      description: 'Evaluates design principles and problem-solving skills.',
      sections: [
        { id: crypto.randomUUID(), title: 'Design Principles', description: '', questions: [
            { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which of the following are key principles of good UX?', required: true, options: ['Usability', 'Accessibility', 'Code complexity', 'Visual Hierarchy'] },
            { id: crypto.randomUUID(), type: 'file-upload' as QuestionType, text: 'Upload a portfolio piece you are proud of.', required: true },
        ]},
      ],
    },
    {
        title: 'Backend Developer (Node.js)',
        description: 'Tests knowledge of Node.js, Express, and database concepts.',
        sections: [
            { id: crypto.randomUUID(), title: 'Core Concepts', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the Node.js event loop.', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'Which is not a core module in Node.js?', required: true, options: ['fs', 'http', 'express', 'path'] },
            ]}
        ]
    },
    {
        title: 'DevOps Engineer Skills Test',
        description: 'Focuses on AWS, Docker, and CI/CD practices.',
        sections: [
            { id: crypto.randomUUID(), title: 'Containerization', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'What is the purpose of a Dockerfile?', required: true },
            ]},
            { id: crypto.randomUUID(), title: 'Cloud Services', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which AWS services are commonly used for a CI/CD pipeline?', required: true, options: ['CodeCommit', 'S3', 'CodeBuild', 'CodePipeline', 'EC2'] },
            ]}
        ]
    },
    {
        title: 'Data Scientist Challenge',
        description: 'Evaluates Python, SQL, and basic machine learning knowledge.',
        sections: [
            { id: crypto.randomUUID(), title: 'SQL Proficiency', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Write a SQL query to find the second highest salary from an Employee table.', required: true },
            ]},
        ]
    },
    {
        title: 'QA Engineer Assessment',
        description: 'Covers both manual testing concepts and automation fundamentals.',
        sections: [
            { id: crypto.randomUUID(), title: 'Testing Concepts', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is regression testing?', required: true, options: ['Testing new features', 'Retesting fixed defects', 'Testing to ensure new changes haven\'t broken existing functionality'] },
            ]}
        ]
    },
    {
        title: 'Mobile Developer (React Native)',
        description: 'Assesses knowledge of React Native components and state management.',
        sections: [
            { id: crypto.randomUUID(), title: 'Core Components', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'What is the difference between a <View> and a <Text> component in React Native?', required: true },
            ]}
        ]
    },
    {
        title: 'Business Analyst Evaluation',
        description: 'Focuses on requirement gathering and documentation skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Requirement Elicitation', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Describe a technique you use to gather requirements from stakeholders who are unsure of what they want.', required: true },
            ]}
        ]
    },
    {
        title: 'Technical Writer Screening',
        description: 'Tests clarity, conciseness, and ability to explain technical concepts.',
        sections: [
            { id: crypto.randomUUID(), title: 'Writing Sample', description: '', questions: [
                { id: crypto.randomUUID(), type: 'file-upload' as QuestionType, text: 'Please upload a sample of your technical writing (e.g., API documentation, user guide).', required: true },
            ]}
        ]
    },
    {
        title: 'Full Stack Developer Assessment',
        description: 'Comprehensive evaluation of both frontend and backend development skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Frontend Skills', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'Which CSS property is used to create a flexbox container?', required: true, options: ['display: flex', 'flex-direction: row', 'justify-content: center', 'align-items: center'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the concept of virtual DOM in React.', required: true, maxLength: 300 },
            ]},
            { id: crypto.randomUUID(), title: 'Backend Skills', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which HTTP methods are idempotent?', required: true, options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
            ]}
        ]
    },
    {
        title: 'Cybersecurity Specialist Test',
        description: 'Evaluates knowledge of security principles, threat analysis, and risk management.',
        sections: [
            { id: crypto.randomUUID(), title: 'Security Fundamentals', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What does CIA stand for in cybersecurity?', required: true, options: ['Confidentiality, Integrity, Availability', 'Central Intelligence Agency', 'Computer Information Access', 'Cyber Intelligence Analysis'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Describe the difference between symmetric and asymmetric encryption.', required: true },
            ]},
            { id: crypto.randomUUID(), title: 'Threat Assessment', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which of the following are common types of cyber attacks?', required: true, options: ['Phishing', 'SQL Injection', 'DDoS', 'Social Engineering', 'Buffer Overflow'] },
            ]}
        ]
    },
    {
        title: 'Machine Learning Engineer Evaluation',
        description: 'Tests understanding of ML algorithms, data preprocessing, and model deployment.',
        sections: [
            { id: crypto.randomUUID(), title: 'ML Algorithms', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'Which algorithm is best suited for binary classification problems?', required: true, options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'PCA'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the bias-variance tradeoff in machine learning.', required: true },
            ]},
            { id: crypto.randomUUID(), title: 'Data Processing', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which techniques are used for feature scaling?', required: true, options: ['Min-Max Scaling', 'Standardization', 'Normalization', 'One-Hot Encoding'] },
            ]}
        ]
    },
    {
        title: 'Cloud Solutions Architect Assessment',
        description: 'Comprehensive evaluation of cloud architecture design and implementation skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Architecture Design', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Design a scalable architecture for a high-traffic e-commerce application using AWS services.', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'Which AWS service provides managed Kubernetes?', required: true, options: ['ECS', 'EKS', 'Fargate', 'Lambda'] },
            ]},
            { id: crypto.randomUUID(), title: 'Cost Optimization', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which strategies help optimize cloud costs?', required: true, options: ['Reserved Instances', 'Spot Instances', 'Auto Scaling', 'Right Sizing', 'Load Balancing'] },
            ]}
        ]
    },
    {
        title: 'Digital Marketing Specialist Assessment',
        description: 'Evaluates knowledge of SEO, SEM, social media marketing, and analytics.',
        sections: [
            { id: crypto.randomUUID(), title: 'SEO & Content Marketing', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the primary purpose of meta descriptions?', required: true, options: ['Direct ranking factor', 'Improve click-through rates', 'Keyword stuffing', 'Page loading speed'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Describe your approach to creating a content marketing strategy for a B2B SaaS company.', required: true, maxLength: 400 },
            ]},
            { id: crypto.randomUUID(), title: 'Analytics & Performance', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which metrics are important for measuring social media ROI?', required: true, options: ['Engagement Rate', 'Conversion Rate', 'Follower Count', 'Click-Through Rate', 'Cost Per Acquisition'] },
            ]}
        ]
    },
    {
        title: 'Sales Development Representative Evaluation',
        description: 'Tests prospecting skills, communication abilities, and sales methodology knowledge.',
        sections: [
            { id: crypto.randomUUID(), title: 'Prospecting & Outreach', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Write a cold email to a potential client for a CRM software solution.', required: true, maxLength: 300 },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the most effective time to make cold calls?', required: true, options: ['Early morning (8-10 AM)', 'Late afternoon (4-6 PM)', 'It depends on the target audience', 'Anytime during business hours'] },
            ]},
            { id: crypto.randomUUID(), title: 'Sales Process', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which are key components of effective sales qualification?', required: true, options: ['Budget', 'Authority', 'Need', 'Timeline', 'Competition'] },
            ]}
        ]
    },
    {
        title: 'HR Generalist Assessment',
        description: 'Covers recruitment, employee relations, compliance, and HR best practices.',
        sections: [
            { id: crypto.randomUUID(), title: 'Recruitment & Selection', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'How would you handle a situation where a hiring manager wants to reject a qualified candidate based on unconscious bias?', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the primary purpose of behavioral interviewing?', required: true, options: ['Test technical skills', 'Predict future performance', 'Check cultural fit', 'Verify experience'] },
            ]},
            { id: crypto.randomUUID(), title: 'Employee Relations', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which factors contribute to employee engagement?', required: true, options: ['Recognition', 'Career Development', 'Work-Life Balance', 'Compensation', 'Management Support'] },
            ]}
        ]
    },
    {
        title: 'Financial Analyst Evaluation',
        description: 'Tests financial modeling, analysis skills, and understanding of financial statements.',
        sections: [
            { id: crypto.randomUUID(), title: 'Financial Analysis', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the difference between NPV and IRR, and when you would use each.', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'Which ratio measures a company\'s ability to pay short-term obligations?', required: true, options: ['Debt-to-Equity', 'Current Ratio', 'Return on Assets', 'Price-to-Earnings'] },
            ]},
            { id: crypto.randomUUID(), title: 'Valuation Methods', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which are common valuation methods for companies?', required: true, options: ['DCF Analysis', 'Comparable Company Analysis', 'Precedent Transactions', 'Asset-Based Valuation', 'Book Value'] },
            ]}
        ]
    },
    {
        title: 'Graphic Designer Portfolio Review',
        description: 'Evaluates design principles, creativity, and technical proficiency in design tools.',
        sections: [
            { id: crypto.randomUUID(), title: 'Design Fundamentals', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the golden ratio in design?', required: true, options: ['1:1.618', '1:2', '2:3', '3:4'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Describe your design process from concept to final delivery.', required: true, maxLength: 350 },
            ]},
            { id: crypto.randomUUID(), title: 'Portfolio Submission', description: '', questions: [
                { id: crypto.randomUUID(), type: 'file-upload' as QuestionType, text: 'Upload your best 3 design pieces that showcase your range and creativity.', required: true },
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which design software are you proficient in?', required: true, options: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Sketch', 'Adobe InDesign'] },
            ]}
        ]
    },
    {
        title: 'Operations Manager Assessment',
        description: 'Tests process optimization, team management, and operational efficiency skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Process Improvement', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Describe a time when you identified and implemented a process improvement. What was the impact?', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the primary goal of Lean methodology?', required: true, options: ['Reduce costs', 'Eliminate waste', 'Increase speed', 'Improve quality'] },
            ]},
            { id: crypto.randomUUID(), title: 'Team Leadership', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which are effective strategies for managing remote teams?', required: true, options: ['Regular Check-ins', 'Clear Communication Channels', 'Goal Setting', 'Performance Tracking', 'Team Building Activities'] },
            ]}
        ]
    },
    {
        title: 'Content Writer & Copywriter Test',
        description: 'Evaluates writing skills, creativity, and understanding of different content formats.',
        sections: [
            { id: crypto.randomUUID(), title: 'Writing Sample', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Write a compelling 150-word product description for a new fitness tracking smartwatch.', required: true, maxLength: 200 },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Create a catchy headline for a blog post about sustainable living tips.', required: true, maxLength: 100 },
            ]},
            { id: crypto.randomUUID(), title: 'Content Strategy', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which content formats are effective for B2B marketing?', required: true, options: ['White Papers', 'Case Studies', 'Webinars', 'Infographics', 'Email Newsletters'] },
            ]}
        ]
    },
    {
        title: 'Customer Success Manager Evaluation',
        description: 'Tests customer relationship management, problem-solving, and retention strategies.',
        sections: [
            { id: crypto.randomUUID(), title: 'Customer Relationship Management', description: '', questions: [
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'How would you handle a situation where a key customer is considering churning due to product limitations?', required: true },
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the most important metric for measuring customer success?', required: true, options: ['Customer Satisfaction Score', 'Net Promoter Score', 'Customer Lifetime Value', 'Churn Rate'] },
            ]},
            { id: crypto.randomUUID(), title: 'Growth & Retention', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which strategies help reduce customer churn?', required: true, options: ['Proactive Support', 'Regular Check-ins', 'Product Training', 'Usage Analytics', 'Feedback Loops'] },
            ]}
        ]
    },
    {
        title: 'Network Administrator Assessment',
        description: 'Evaluates networking concepts, security protocols, and troubleshooting skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Network Fundamentals', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the default subnet mask for a Class C network?', required: true, options: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'Explain the difference between TCP and UDP protocols.', required: true },
            ]},
            { id: crypto.randomUUID(), title: 'Network Security', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which are common network security measures?', required: true, options: ['Firewalls', 'VPN', 'IDS/IPS', 'Network Segmentation', 'Access Control Lists'] },
            ]}
        ]
    },
    {
        title: 'Project Manager (Agile/Scrum) Assessment',
        description: 'Tests Agile methodologies, project planning, and team coordination skills.',
        sections: [
            { id: crypto.randomUUID(), title: 'Agile Methodology', description: '', questions: [
                { id: crypto.randomUUID(), type: 'single-choice' as QuestionType, text: 'What is the recommended duration for a Sprint in Scrum?', required: true, options: ['1 week', '2-4 weeks', '6 weeks', 'It varies by project'] },
                { id: crypto.randomUUID(), type: 'text' as QuestionType, text: 'How would you handle a situation where the development team consistently misses Sprint commitments?', required: true },
            ]},
            { id: crypto.randomUUID(), title: 'Project Planning', description: '', questions: [
                { id: crypto.randomUUID(), type: 'multi-choice' as QuestionType, text: 'Which are key components of effective project planning?', required: true, options: ['Scope Definition', 'Risk Assessment', 'Resource Allocation', 'Timeline Estimation', 'Stakeholder Communication'] },
            ]}
        ]
    }
];

// Generate seed assessments
export const generateAssessments = (jobs: Job[]): Assessment[] => {
  const assessments: Assessment[] = [];
  const activeJobs = jobs.filter(job => job.status === 'active');
  if (activeJobs.length === 0) return [];

  for (let i = 0; i < assessmentTemplates.length; i++) {
    const template = assessmentTemplates[i];
    const job = activeJobs[i % activeJobs.length];
    assessments.push({
      id: crypto.randomUUID(),
      jobId: job.id,
      title: template.title,
      description: template.description,
      sections: template.sections.map(s => ({...s, description: s.description || ''})) as AssessmentSection[],
      createdAt: getRandomRecentDate(),
      updatedAt: getRandomRecentDate(),
    });
  }
  return assessments;
};

// ============================================================================
// NEW: Generate Assessment Responses
// ============================================================================
export const generateAssessmentResponses = (candidates: Candidate[], assessments: Assessment[]): AssessmentResponse[] => {
  const responses: AssessmentResponse[] = [];
  const candidatesToProcess = candidates.slice(0, 50);

  for (const candidate of candidatesToProcess) {
    const relevantAssessment = assessments.find(a => a.jobId === candidate.appliedJobId);
    if (relevantAssessment) {
      const answers: { questionId: string; value: any }[] = [];
      relevantAssessment.sections.forEach(section => {
        section.questions.forEach(question => {
          let answerValue: any = null;
          switch (question.type) {
            case 'single-choice':
              answerValue = question.options ? getRandomItem(question.options) : null;
              break;
            case 'multi-choice':
              answerValue = question.options ? getRandomItems(question.options, getRandomInt(1, question.options.length)) : [];
              break;
            case 'text':
              answerValue = "This is a sample text answer demonstrating my thought process and communication skills.";
              break;
            case 'numeric':
              answerValue = getRandomInt(question.min ?? 0, question.max ?? 10);
              break;
            case 'file-upload':
              answerValue = 'submitted-portfolio.pdf';
              break;
          }
          if (answerValue !== null) {
            answers.push({ questionId: question.id, value: answerValue });
          }
        });
      });

      responses.push({
        id: crypto.randomUUID(),
        assessmentId: relevantAssessment.id,
        candidateId: candidate.id,
        submittedAt: getRandomRecentDate(),
        answers
      });
    }
  }
  return responses;
};

export const initializeDatabase = async (db: any) => {
  try {
    // Clear existing data to ensure a clean slate
    await db.jobs.clear();
    await db.candidates.clear();
    await db.assessments.clear();
    await db.statusChanges.clear();
    await db.notes.clear();
    // Also clear the new responses table
    await db.assessmentResponses.clear();

    // Generate and add seed data in order
    const jobs = generateJobs();
    await db.jobs.bulkAdd(jobs);
    
    const candidates = generateCandidates(jobs);
    await db.candidates.bulkAdd(candidates);
    
    const assessments = generateAssessments(jobs);
    await db.assessments.bulkAdd(assessments);

    // Generate and add assessment responses
    const responses = generateAssessmentResponses(candidates, assessments);
    await db.assessmentResponses.bulkAdd(responses);

    console.log('✅ Database successfully initialized with seed data.');
    console.log(`   - Added ${jobs.length} jobs`);
    console.log(`   - Added ${candidates.length} candidates`);
    console.log(`   - Added ${assessments.length} assessments`);
    console.log(`   - Added ${responses.length} assessment responses`);

  } catch (error) {
    console.error('❌ Failed to seed the database:', error);
  }
};

