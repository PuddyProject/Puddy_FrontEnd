import React from 'react';
import classnames from 'classnames';

const cn = classnames;

interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  fontWeight?: string;
  fontSize?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  outline?: boolean;
  margin?: string;
  padding?: string;
  secondStyle?: boolean;
}

export default function Button({
  children,
  fontWeight,
  fontSize,
  width,
  height,
  outline,
  onClick,
  margin,
  padding,
  secondStyle,
}: ButtonProps) {
  const buttonStyle = {
    fontWeight,
    fontSize,
    margin,
    padding,
    width,
    height,
    secondStyle,
  };

  return (
    <button
      onClick={onClick}
      className={cn('button', width, height, { outline, secondStyle })}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
