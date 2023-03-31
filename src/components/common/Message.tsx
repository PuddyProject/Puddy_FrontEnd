import React from 'react';

interface MessageProps {
  children?: React.ReactNode;
  isWarning?: boolean;
  alignRight?: boolean;
}

export default function Message({ isWarning, alignRight, children }: MessageProps) {
  return (
    <strong
      className={`message ${isWarning ? 'warning-message' : 'correct-message'} ${
        alignRight ? 'align-right' : ''
      }`}
    >
      {children}
    </strong>
  );
}
