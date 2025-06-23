import React from 'react';

const FloatingCrucifix: React.FC = () => {
  return (
    <div className="floating-crucifix">
      <svg
        width="80"
        height="120"
        viewBox="0 0 80 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="crucifix-svg"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0, 0, 0, 0.5)" />
          </filter>
        </defs>
        <rect
          x="36"
          y="10"
          width="8"
          height="100"
          fill="currentColor"
          filter="url(#shadow)"
        />
        <rect
          x="20"
          y="32"
          width="40"
          height="8"
          fill="currentColor"
          filter="url(#shadow)"
        />
        <circle
          cx="40"
          cy="36"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <rect
          x="35"
          y="105"
          width="10"
          height="10"
          fill="currentColor"
          filter="url(#shadow)"
        />
      </svg>
    </div>
  );
};

export default FloatingCrucifix;