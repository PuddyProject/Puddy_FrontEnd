import React from 'react';
import classnames from 'classnames';

const cn = classnames;

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  outline?: boolean;
  margin?: string;
  padding?: string;
}

export default function Button({
  children,
  width,
  height,
  outline,
  onClick,
  margin,
  padding,
}: ButtonProps) {
  const buttonStyle = {
    margin,
    padding,
    width,
    height,
  };

  return (
    <button className={cn('button', width, height, { outline })} style={buttonStyle}>
      {children}
    </button>
  );
}
