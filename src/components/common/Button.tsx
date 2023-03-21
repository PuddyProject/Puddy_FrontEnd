import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string;
  isOutline?: boolean;
  margin?: string;
  padding?: string;
}

export default function Button({
  children,
  width,
  isOutline,
  onClick,
  margin,
  padding,
}: ButtonProps) {
  const buttonStyle = {
    margin,
    padding,
    width,
  };

  return (
    <button className={classnames('button', width, { isOutline })} style={buttonStyle}>
      {children}
    </button>
  );
}
