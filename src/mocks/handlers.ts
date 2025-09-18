import { http, HttpResponse } from 'msw';
import db from '../services/db';
import { Job, Candidate, Assessment, StatusChange, Note } from '../types';

// Helper function to simulate random API failures (5-10% failure rate)
const shouldFail = () => Math.random() < 0.075;

// Helper function to simulate API latency (200-1200ms)
const getRandomLatency = () => Math.floor(Math.random() * 1000) + 200;

// Base API URL
const API_URL = 'https://api.talentflow.example';

export const handlers = [
  // ============================================================================
  // JOBS API HANDLERS
  // ============================================================================
  http.get(`${API_URL}/jobs`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || 10);
    const status = url.searchParams.get('status');
    const title = url.searchParams.get('title');
    const tag = url.searchParams.get('tag');

    let jobs = await db.getAllJobs();

    if (status) jobs = jobs.filter(job => job.status === status);
    if (title) jobs = jobs.filter(job => job.title.toLowerCase().includes(title.toLowerCase()));
    if (tag) jobs = jobs.filter(job => job.tags.includes(tag));

    jobs.sort((a, b) => a.order - b.order);

    const total = jobs.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedJobs = jobs.slice(offset, offset + limit);

    return HttpResponse.json({
      data: paginatedJobs,
      meta: { total, page, limit, totalPages },
    });
  }),

  http.get(`${API_URL}/jobs/:id`, async ({ params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const { id } = params;
    const job = await db.getJobById(id as string);
    if (!job) return HttpResponse.json({ error: 'Job not found' }, { status: 404 });
    return HttpResponse.json({ data: job });
  }),

  http.post(`${API_URL}/jobs`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const jobData = await request.json() as Job;
    const existingJob = await db.getJobBySlug(jobData.slug);
    if (existingJob) return HttpResponse.json({ error: 'Job with this slug already exists' }, { status: 400 });
    const id = await db.addJob(jobData);
    const job = await db.getJobById(id);
    return HttpResponse.json({ data: job }, { status: 201 });
  }),

  http.put(`${API_URL}/jobs/:id`, async ({ request, params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { id } = params;
    const jobData = await request.json() as Partial<Job>;
    const existingJob = await db.getJobById(id as string);
    if (!existingJob) return HttpResponse.json({ error: 'Job not found' }, { status: 404 });
    if (jobData.slug && jobData.slug !== existingJob.slug) {
      const jobWithSlug = await db.getJobBySlug(jobData.slug);
      if (jobWithSlug && jobWithSlug.id !== id) {
        return HttpResponse.json({ error: 'Job with this slug already exists' }, { status: 400 });
      }
    }
    await db.updateJob(id as string, jobData);
    const updatedJob = await db.getJobById(id as string);
    return HttpResponse.json({ data: updatedJob });
  }),

   http.patch(`${API_URL}/jobs/reorder`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { jobIds } = await request.json() as { jobIds: string[] };
    for (let i = 0; i < jobIds.length; i++) {
      await db.updateJob(jobIds[i], { order: i });
    }
    const jobs = await Promise.all(jobIds.map(id => db.getJobById(id)));
    return HttpResponse.json({ data: jobs });
  }),

  // ============================================================================
  // CANDIDATES API HANDLERS
  // ============================================================================
  http.get(`${API_URL}/candidates`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || 20);
    const stage = url.searchParams.get('stage');
    const search = url.searchParams.get('search');

    let candidates = await db.getAllCandidates();

    if (stage) candidates = candidates.filter(c => c.currentStage === stage);
    if (search) {
      const s = search.toLowerCase();
      candidates = candidates.filter(c => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
    }
    
    // Sort alphabetically
    candidates.sort((a, b) => a.name.localeCompare(b.name));

    const total = candidates.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedCandidates = candidates.slice(offset, offset + limit);

    return HttpResponse.json({
      data: paginatedCandidates,
      meta: { total, page, limit, totalPages },
    });
  }),
  
  http.get(`${API_URL}/candidates/:id`, async ({ params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const { id } = params;
    const candidate = await db.getCandidateById(id as string);
    if (!candidate) return HttpResponse.json({ error: 'Candidate not found' }, { status: 404 });
    const statusChanges = await db.getStatusChangesByCandidateId(id as string);
    const notes = await db.getNotesByCandidateId(id as string);
    return HttpResponse.json({ data: { ...candidate, statusHistory: statusChanges, notes } });
  }),
  
  http.post(`${API_URL}/candidates/:id/notes`, async ({ request, params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { id } = params;
    if (!await db.getCandidateById(id as string)) return HttpResponse.json({ error: 'Candidate not found' }, { status: 404 });
    const noteData = await request.json() as Omit<Note, 'id' | 'candidateId' | 'createdAt'>;
    const newNote: Note = { ...noteData, id: crypto.randomUUID(), candidateId: id as string, createdAt: new Date().toISOString() };
    await db.addNote(newNote);
    return HttpResponse.json({ data: newNote }, { status: 201 });
  }),

  http.patch(`${API_URL}/candidates/:id/stage`, async ({ request, params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { id } = params;
    const { stage } = await request.json() as { stage: string };
    const candidate = await db.getCandidateById(id as string);
    if (!candidate) return HttpResponse.json({ error: 'Candidate not found' }, { status: 404 });
    const statusChange: StatusChange = { id: crypto.randomUUID(), candidateId: id as string, fromStage: candidate.currentStage, toStage: stage as any, timestamp: new Date().toISOString() };
    await db.addStatusChange(statusChange);
    await db.updateCandidate(id as string, { currentStage: stage as any });
    const updatedCandidate = await db.getCandidateById(id as string);
    return HttpResponse.json({ data: updatedCandidate });
  }),

  // ============================================================================
  // ASSESSMENTS API HANDLERS
  // ============================================================================
  http.get(`${API_URL}/assessments`, async () => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const assessments = await db.getAllAssessments();
    return HttpResponse.json({ data: assessments });
  }),

  http.get(`${API_URL}/assessments/:id`, async ({ params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    const { id } = params;
    const assessment = await db.getAssessmentById(id as string);
    if (!assessment) return HttpResponse.json({ error: 'Assessment not found' }, { status: 404 });
    return HttpResponse.json({ data: assessment });
  }),

  http.post(`${API_URL}/assessments`, async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const assessmentData = await request.json() as Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>;
    const newAssessment: Assessment = { ...assessmentData, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const id = await db.addAssessment(newAssessment);
    return HttpResponse.json({ data: { ...newAssessment, id } }, { status: 201 });
  }),

  http.put(`${API_URL}/assessments/:id`, async ({ request, params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { id } = params;
    const assessmentData = await request.json() as Partial<Assessment>;
    if (!await db.getAssessmentById(id as string)) return HttpResponse.json({ error: 'Assessment not found' }, { status: 404 });
    await db.updateAssessment(id as string, { ...assessmentData, updatedAt: new Date().toISOString() });
    const updatedAssessment = await db.getAssessmentById(id as string);
    return HttpResponse.json({ data: updatedAssessment });
  }),
  
  http.delete(`${API_URL}/assessments/:id`, async ({ params }) => {
    await new Promise(resolve => setTimeout(resolve, getRandomLatency()));
    if (shouldFail()) return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
    const { id } = params;
    if (!await db.getAssessmentById(id as string)) return HttpResponse.json({ error: 'Assessment not found' }, { status: 404 });
    await db.deleteAssessment(id as string);
    return new HttpResponse(null, { status: 204 });
  }),
];

