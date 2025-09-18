import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

// Team collaboration illustration
export const TeamCollaborationIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 400 300">
    <defs>
      <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect width="400" height="300" fill="url(#teamGradient)" opacity="0.1" rx="20" />
    
    {/* People figures */}
    <g transform="translate(50, 80)">
      {/* Person 1 */}
      <circle cx="50" cy="40" r="20" fill="#667eea" />
      <rect x="35" y="60" width="30" height="40" rx="15" fill="#667eea" />
      
      {/* Person 2 */}
      <circle cx="150" cy="40" r="20" fill="#764ba2" />
      <rect x="135" y="60" width="30" height="40" rx="15" fill="#764ba2" />
      
      {/* Person 3 */}
      <circle cx="250" cy="40" r="20" fill="#f093fb" />
      <rect x="235" y="60" width="30" height="40" rx="15" fill="#f093fb" />
    </g>
    
    {/* Connection lines */}
    <path d="M100 120 Q200 100 250 120" stroke="#667eea" strokeWidth="3" fill="none" strokeDasharray="5,5" />
    <path d="M150 120 Q200 140 300 120" stroke="#764ba2" strokeWidth="3" fill="none" strokeDasharray="5,5" />
    
    {/* Floating elements */}
    <circle cx="320" cy="60" r="8" fill="#f093fb" opacity="0.7" />
    <circle cx="80" cy="180" r="6" fill="#667eea" opacity="0.5" />
    <circle cx="350" cy="200" r="10" fill="#764ba2" opacity="0.6" />
  </SvgIcon>
);

// Job search illustration
export const JobSearchIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 400 300">
    <defs>
      <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="300" fill="url(#searchGradient)" opacity="0.1" rx="20" />
    
    {/* Magnifying glass */}
    <g transform="translate(150, 100)">
      <circle cx="0" cy="0" r="40" fill="none" stroke="#4facfe" strokeWidth="6" />
      <line x1="28" y1="28" x2="60" y2="60" stroke="#4facfe" strokeWidth="6" strokeLinecap="round" />
    </g>
    
    {/* Document/Resume */}
    <g transform="translate(80, 50)">
      <rect x="0" y="0" width="60" height="80" rx="5" fill="white" stroke="#4facfe" strokeWidth="2" />
      <line x1="10" y1="15" x2="50" y2="15" stroke="#4facfe" strokeWidth="2" />
      <line x1="10" y1="25" x2="40" y2="25" stroke="#00f2fe" strokeWidth="2" />
      <line x1="10" y1="35" x2="45" y2="35" stroke="#4facfe" strokeWidth="2" />
      <circle cx="15" cy="50" r="8" fill="#00f2fe" />
    </g>
    
    {/* Floating job icons */}
    <g transform="translate(280, 80)">
      <rect x="0" y="0" width="40" height="30" rx="5" fill="#4facfe" opacity="0.7" />
      <rect x="5" y="5" width="30" height="4" rx="2" fill="white" />
      <rect x="5" y="12" width="20" height="3" rx="1.5" fill="white" />
      <rect x="5" y="18" width="25" height="3" rx="1.5" fill="white" />
    </g>
    
    {/* Stars/sparkles */}
    <g fill="#00f2fe" opacity="0.6">
      <polygon points="50,200 52,206 58,206 53,210 55,216 50,212 45,216 47,210 42,206 48,206" />
      <polygon points="320,50 322,56 328,56 323,60 325,66 320,62 315,66 317,60 312,56 318,56" />
      <polygon points="350,180 352,186 358,186 353,190 355,196 350,192 345,196 347,190 342,186 348,186" />
    </g>
  </SvgIcon>
);

// Interview process illustration
export const InterviewIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 400 300">
    <defs>
      <linearGradient id="interviewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fa709a" />
        <stop offset="100%" stopColor="#fee140" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="300" fill="url(#interviewGradient)" opacity="0.1" rx="20" />
    
    {/* Table */}
    <rect x="100" y="180" width="200" height="20" rx="10" fill="#fa709a" opacity="0.3" />
    
    {/* Interviewer */}
    <g transform="translate(120, 100)">
      <circle cx="0" cy="0" r="25" fill="#fa709a" />
      <rect x="-20" y="25" width="40" height="50" rx="20" fill="#fa709a" />
    </g>
    
    {/* Candidate */}
    <g transform="translate(280, 100)">
      <circle cx="0" cy="0" r="25" fill="#fee140" />
      <rect x="-20" y="25" width="40" height="50" rx="20" fill="#fee140" />
    </g>
    
    {/* Speech bubbles */}
    <g transform="translate(80, 60)">
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="white" stroke="#fa709a" strokeWidth="2" />
      <polygon points="-10,15 -5,25 5,15" fill="white" stroke="#fa709a" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#fa709a">?</text>
    </g>
    
    <g transform="translate(320, 60)">
      <ellipse cx="0" cy="0" rx="30" ry="20" fill="white" stroke="#fee140" strokeWidth="2" />
      <polygon points="10,15 5,25 -5,15" fill="white" stroke="#fee140" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#fee140">!</text>
    </g>
    
    {/* Decorative elements */}
    <circle cx="50" cy="50" r="5" fill="#fa709a" opacity="0.5" />
    <circle cx="350" cy="80" r="7" fill="#fee140" opacity="0.6" />
    <circle cx="60" cy="220" r="4" fill="#fa709a" opacity="0.4" />
  </SvgIcon>
);

// Analytics/Growth illustration
export const AnalyticsIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 400 300">
    <defs>
      <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a8edea" />
        <stop offset="100%" stopColor="#fed6e3" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="300" fill="url(#analyticsGradient)" opacity="0.1" rx="20" />
    
    {/* Chart bars */}
    <g transform="translate(80, 80)">
      <rect x="0" y="80" width="30" height="60" rx="5" fill="#a8edea" />
      <rect x="50" y="60" width="30" height="80" rx="5" fill="#fed6e3" />
      <rect x="100" y="40" width="30" height="100" rx="5" fill="#a8edea" />
      <rect x="150" y="20" width="30" height="120" rx="5" fill="#fed6e3" />
      <rect x="200" y="30" width="30" height="110" rx="5" fill="#a8edea" />
    </g>
    
    {/* Trend line */}
    <path d="M95 160 L115 140 L135 120 L165 100 L215 110" 
          stroke="#fa709a" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Data points */}
    <circle cx="95" cy="160" r="6" fill="#fa709a" />
    <circle cx="115" cy="140" r="6" fill="#fa709a" />
    <circle cx="135" cy="120" r="6" fill="#fa709a" />
    <circle cx="165" cy="100" r="6" fill="#fa709a" />
    <circle cx="215" cy="110" r="6" fill="#fa709a" />
    
    {/* Upward arrow */}
    <g transform="translate(320, 100)">
      <path d="M0 30 L0 0 M-10 10 L0 0 L10 10" 
            stroke="#fed6e3" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Percentage indicator */}
    <g transform="translate(300, 150)">
      <text x="0" y="0" fontSize="24" fontWeight="bold" fill="#fa709a">+25%</text>
    </g>
  </SvgIcon>
);

// Success/Achievement illustration
export const SuccessIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 400 300">
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffecd2" />
        <stop offset="100%" stopColor="#fcb69f" />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="300" fill="url(#successGradient)" opacity="0.1" rx="20" />
    
    {/* Trophy */}
    <g transform="translate(200, 100)">
      {/* Cup */}
      <path d="M-30 0 Q-30 -20 -20 -30 L20 -30 Q30 -20 30 0 L30 40 Q30 50 20 50 L-20 50 Q-30 50 -30 40 Z" 
            fill="#fcb69f" />
      
      {/* Handles */}
      <ellipse cx="-40" cy="10" rx="8" ry="15" fill="none" stroke="#fcb69f" strokeWidth="4" />
      <ellipse cx="40" cy="10" rx="8" ry="15" fill="none" stroke="#fcb69f" strokeWidth="4" />
      
      {/* Base */}
      <rect x="-25" y="50" width="50" height="15" rx="7" fill="#ffecd2" />
      <rect x="-20" y="65" width="40" height="10" rx="5" fill="#fcb69f" />
      
      {/* Star on cup */}
      <polygon points="0,-10 3,-3 10,-3 5,1 7,8 0,4 -7,8 -5,1 -10,-3 -3,-3" fill="#ffecd2" />
    </g>
    
    {/* Confetti */}
    <g fill="#fcb69f" opacity="0.7">
      <rect x="100" y="50" width="8" height="8" rx="2" transform="rotate(45 104 54)" />
      <rect x="300" y="80" width="6" height="6" rx="1" transform="rotate(30 303 83)" />
      <rect x="80" y="200" width="10" height="10" rx="2" transform="rotate(60 85 205)" />
      <rect x="320" y="180" width="7" height="7" rx="1" transform="rotate(15 323.5 183.5)" />
    </g>
    
    {/* Sparkles */}
    <g fill="#ffecd2" opacity="0.8">
      <polygon points="150,80 152,86 158,86 153,90 155,96 150,92 145,96 147,90 142,86 148,86" />
      <polygon points="280,120 282,126 288,126 283,130 285,136 280,132 275,136 277,130 272,126 278,126" />
      <polygon points="120,180 122,186 128,186 123,190 125,196 120,192 115,196 117,190 112,186 118,186" />
    </g>
  </SvgIcon>
);