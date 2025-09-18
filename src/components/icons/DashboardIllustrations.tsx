import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

// Smart Matching Illustration
export const SmartMatchingIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="smartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976d2" />
        <stop offset="100%" stopColor="#42a5f5" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="50" fill="url(#smartGradient)" opacity="0.1" />
    <circle cx="40" cy="40" r="15" fill="url(#smartGradient)" />
    <circle cx="80" cy="40" r="15" fill="url(#smartGradient)" />
    <circle cx="60" cy="80" r="15" fill="url(#smartGradient)" />
    <path d="M40 40 L60 80 L80 40" stroke="url(#smartGradient)" strokeWidth="3" fill="none" />
    <circle cx="60" cy="60" r="8" fill="#fff" />
    <path d="M56 60 L59 63 L64 58" stroke="url(#smartGradient)" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Interview Management Illustration
export const InterviewManagementIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="interviewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2e7d32" />
        <stop offset="100%" stopColor="#66bb6a" />
      </linearGradient>
    </defs>
    <rect x="20" y="30" width="80" height="60" rx="8" fill="url(#interviewGradient)" opacity="0.1" />
    <rect x="30" y="40" width="25" height="15" rx="3" fill="url(#interviewGradient)" />
    <rect x="65" y="40" width="25" height="15" rx="3" fill="url(#interviewGradient)" />
    <circle cx="42.5" cy="70" r="8" fill="url(#interviewGradient)" />
    <circle cx="77.5" cy="70" r="8" fill="url(#interviewGradient)" />
    <path d="M35 85 Q42.5 80 50 85" stroke="url(#interviewGradient)" strokeWidth="2" fill="none" />
    <path d="M70 85 Q77.5 80 85 85" stroke="url(#interviewGradient)" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Analytics Illustration
export const AnalyticsIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ed6c02" />
        <stop offset="100%" stopColor="#ff9800" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="80" height="80" rx="8" fill="url(#analyticsGradient)" opacity="0.1" />
    <rect x="30" y="70" width="8" height="20" fill="url(#analyticsGradient)" />
    <rect x="45" y="60" width="8" height="30" fill="url(#analyticsGradient)" />
    <rect x="60" y="50" width="8" height="40" fill="url(#analyticsGradient)" />
    <rect x="75" y="40" width="8" height="50" fill="url(#analyticsGradient)" />
    <circle cx="60" cy="35" r="3" fill="url(#analyticsGradient)" />
    <path d="M30 35 Q45 25 60 35 Q75 45 90 35" stroke="url(#analyticsGradient)" strokeWidth="2" fill="none" />
  </SvgIcon>
);

// Fast Hiring Illustration
export const FastHiringIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 120 120">
    <defs>
      <linearGradient id="fastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9c27b0" />
        <stop offset="100%" stopColor="#ba68c8" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="45" fill="url(#fastGradient)" opacity="0.1" />
    <path d="M40 40 L60 60 L80 40" stroke="url(#fastGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M40 60 L60 80 L80 60" stroke="url(#fastGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <circle cx="60" cy="60" r="6" fill="url(#fastGradient)" />
    <path d="M50 30 L70 30" stroke="url(#fastGradient)" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 90 L70 90" stroke="url(#fastGradient)" strokeWidth="3" strokeLinecap="round" />
  </SvgIcon>
);

// Hero Background Pattern
export const HeroPattern: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
  >
    <defs>
      <pattern id="heroPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="#1976d2" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#heroPattern)" />
    <circle cx="100" cy="100" r="60" fill="#1976d2" opacity="0.05" />
    <circle cx="300" cy="150" r="40" fill="#9c27b0" opacity="0.05" />
    <circle cx="350" cy="300" r="50" fill="#2e7d32" opacity="0.05" />
  </svg>
);

// Metric Card Background
export const MetricCardBg: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
  >
    <defs>
      <linearGradient id={`metricGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.1" />
        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill={`url(#metricGradient-${color})`} />
    <circle cx="160" cy="20" r="30" fill={color} opacity="0.08" />
    <circle cx="20" cy="100" r="20" fill={color} opacity="0.06" />
  </svg>
);

// Team Collaboration Enhanced
export const TeamCollaborationEnhanced: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 200 150">
    <defs>
      <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1976d2" />
        <stop offset="50%" stopColor="#9c27b0" />
        <stop offset="100%" stopColor="#2e7d32" />
      </linearGradient>
    </defs>
    {/* Background circles */}
    <circle cx="50" cy="50" r="35" fill="url(#teamGradient)" opacity="0.1" />
    <circle cx="150" cy="50" r="35" fill="url(#teamGradient)" opacity="0.1" />
    <circle cx="100" cy="100" r="35" fill="url(#teamGradient)" opacity="0.1" />
    
    {/* People icons */}
    <circle cx="50" cy="40" r="12" fill="url(#teamGradient)" />
    <rect x="38" y="52" width="24" height="20" rx="12" fill="url(#teamGradient)" />
    
    <circle cx="150" cy="40" r="12" fill="url(#teamGradient)" />
    <rect x="138" y="52" width="24" height="20" rx="12" fill="url(#teamGradient)" />
    
    <circle cx="100" cy="90" r="12" fill="url(#teamGradient)" />
    <rect x="88" y="102" width="24" height="20" rx="12" fill="url(#teamGradient)" />
    
    {/* Connection lines */}
    <path d="M62 50 L88 90" stroke="url(#teamGradient)" strokeWidth="3" opacity="0.6" />
    <path d="M138 50 L112 90" stroke="url(#teamGradient)" strokeWidth="3" opacity="0.6" />
    <path d="M62 50 L138 50" stroke="url(#teamGradient)" strokeWidth="3" opacity="0.6" />
  </SvgIcon>
);