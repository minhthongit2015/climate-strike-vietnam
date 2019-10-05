import React from 'react';

export default (props) => {
  const { children, className, ...restProps } = props;
  return (
    <div className={`text-pre-wrap text-light text-center mb-5 ${className || ''}`} {...restProps}>
      {children}
    </div>
  );
};