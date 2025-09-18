import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

// Job Posting Illustration
export const JobPostingIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="jobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976d2" />
        <stop offset="100%" stopColor="#42a5f5" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="80" height="80" rx="8" fill="url(#jobGradient)" opacity="0.1" />
    <rect x="30" y="30" width="60" height="8" rx="4" fill="url(#jobGradient)" />
    <rect x="30" y="45" width="45" height="6" rx="3" fill="url(#jobGradient)" opacity="0.7" />
    <rect x="30" y="58" width="50" height="6" rx="3" fill="url(#jobGradient)" opacity="0.7" />
    <rect x="30" y="71" width="35" height="6" rx="3" fill="url(#jobGradient)" opacity="0.7" />
    <circle cx="75" cy="85" r="8" fill="url(#jobGradient)" />
    <path d="M71 85 L74 88 L79 83" stroke="white" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Candidate Review Illustration
export const CandidateReviewIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="reviewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9c27b0" />
        <stop offset="100%" stopColor="#e1bee7" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#reviewGradient)" opacity="0.1" />
    <circle cx="45" cy="45" r="15" fill="url(#reviewGradient)" />
    <rect x="30" y="60" width="30" height="20" rx="10" fill="url(#reviewGradient)" />
    <rect x="70" y="35" width="25" height="4" rx="2" fill="url(#reviewGradient)" opacity="0.8" />
    <rect x="70" y="45" width="20" height="4" rx="2" fill="url(#reviewGradient)" opacity="0.6" />
    <rect x="70" y="55" width="22" height="4" rx="2" fill="url(#reviewGradient)" opacity="0.6" />
    <polygon points="85,70 90,75 95,65" fill="#4caf50" />
  </SvgIcon>
);

// Interview Scheduling Illustration
export const InterviewScheduleIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="scheduleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2e7d32" />
        <stop offset="100%" stopColor="#66bb6a" />
      </linearGradient>
    </defs>
    <rect x="25" y="25" width="70" height="70" rx="8" fill="url(#scheduleGradient)" opacity="0.1" />
    <rect x="25" y="25" width="70" height="15" rx="8" fill="url(#scheduleGradient)" />
    <circle cx="40" cy="32" r="3" fill="white" />
    <circle cx="50" cy="32" r="3" fill="white" />
    <circle cx="60" cy="32" r="3" fill="white" />
    <rect x="35" y="50" width="8" height="8" rx="2" fill="url(#scheduleGradient)" opacity="0.6" />
    <rect x="50" y="50" width="8" height="8" rx="2" fill="url(#scheduleGradient)" />
    <rect x="65" y="50" width="8" height="8" rx="2" fill="url(#scheduleGradient)" opacity="0.6" />
    <rect x="35" y="65" width="8" height="8" rx="2" fill="url(#scheduleGradient)" opacity="0.6" />
    <rect x="50" y="65" width="8" height="8" rx="2" fill="url(#scheduleGradient)" opacity="0.6" />
    <circle cx="69" cy="69" r="4" fill="#ff5722" />
  </SvgIcon>
);

// Analytics Dashboard Illustration
export const AnalyticsDashboardIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ed6c02" />
        <stop offset="100%" stopColor="#ffb74d" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="80" height="80" rx="8" fill="url(#analyticsGradient)" opacity="0.1" />
    <rect x="30" y="70" width="8" height="20" rx="4" fill="url(#analyticsGradient)" />
    <rect x="45" y="60" width="8" height="30" rx="4" fill="url(#analyticsGradient)" />
    <rect x="60" y="50" width="8" height="40" rx="4" fill="url(#analyticsGradient)" />
    <rect x="75" y="65" width="8" height="25" rx="4" fill="url(#analyticsGradient)" />
    <path d="M30 45 Q45 35 60 40 T90 35" stroke="url(#analyticsGradient)" strokeWidth="3" fill="none" />
    <circle cx="30" cy="45" r="3" fill="url(#analyticsGradient)" />
    <circle cx="60" cy="40" r="3" fill="url(#analyticsGradient)" />
    <circle cx="90" cy="35" r="3" fill="url(#analyticsGradient)" />
  </SvgIcon>
);

// Talent Pipeline Illustration
export const TalentPipelineIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7b1fa2" />
        <stop offset="100%" stopColor="#ba68c8" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#pipelineGradient)" opacity="0.1" />
    <circle cx="30" cy="40" r="8" fill="url(#pipelineGradient)" />
    <circle cx="60" cy="30" r="8" fill="url(#pipelineGradient)" />
    <circle cx="90" cy="40" r="8" fill="url(#pipelineGradient)" />
    <circle cx="45" cy="70" r="8" fill="url(#pipelineGradient)" />
    <circle cx="75" cy="70" r="8" fill="url(#pipelineGradient)" />
    <path d="M30 48 Q45 55 45 62" stroke="url(#pipelineGradient)" strokeWidth="2" fill="none" />
    <path d="M60 38 Q67 55 75 62" stroke="url(#pipelineGradient)" strokeWidth="2" fill="none" />
    <path d="M90 48 Q82 55 75 62" stroke="url(#pipelineGradient)" strokeWidth="2" fill="none" />
    <path d="M45 78 Q60 85 75 78" stroke="url(#pipelineGradient)" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Automated Workflow Illustration
export const AutomatedWorkflowIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1565c0" />
        <stop offset="100%" stopColor="#64b5f6" />
      </linearGradient>
    </defs>
    <rect x="20" y="30" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    <rect x="50" y="20" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    <rect x="80" y="30" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    <rect x="35" y="60" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    <rect x="65" y="60" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    <rect x="50" y="85" width="20" height="15" rx="7" fill="url(#workflowGradient)" />
    
    <path d="M40 37 L50 27" stroke="url(#workflowGradient)" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M70 27 L80 37" stroke="url(#workflowGradient)" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M45 45 L45 60" stroke="url(#workflowGradient)" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M75 45 L75 60" stroke="url(#workflowGradient)" strokeWidth="2" markerEnd="url(#arrow)" />
    <path d="M55 75 L60 85" stroke="url(#workflowGradient)" strokeWidth="2" markerEnd="url(#arrow)" />
    
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="url(#workflowGradient)" />
      </marker>
    </defs>
  </SvgIcon>
);