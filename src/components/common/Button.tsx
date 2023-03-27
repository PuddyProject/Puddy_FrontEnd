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
  disabled?: boolean;
  deactivationStyle?: boolean;
}

export default function Button({
  disabled,
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
  deactivationStyle,
}: ButtonProps) {
  const buttonStyle = {
    fontWeight,
    fontSize,
    margin,
    padding,
    width,
    height,
    secondStyle,
    deactivationStyle,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn('button', width, height, { outline, secondStyle, deactivationStyle })}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
