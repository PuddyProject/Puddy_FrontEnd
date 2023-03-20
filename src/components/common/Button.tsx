import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  width?: string;
  isOutline?: boolean;
  margin?: string;
  padding?: string;
  customSize?: string;
}

export default function Button({
  children,
  customSize,
  isOutline,
  onClick,
  width,
  margin,
  padding,
}: ButtonProps) {
  const buttonStyle = {
    margin: margin,
    padding: padding,
    width: customSize,
  };

  return (
    <button
      className={classnames('button', width, { isOutline })}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}
