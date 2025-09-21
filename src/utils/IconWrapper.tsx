/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  className = "w-5 h-5",
  ...rest
}) => {
  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
};

export default IconWrapper;
