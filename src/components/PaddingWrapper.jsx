import React from 'react';

const PaddingWrapper = ({ paddingTop, children }) => {
  return (
    <div style={{ paddingTop: `${paddingTop}px` }}>
      {children}
    </div>
  );
};

export default PaddingWrapper;
