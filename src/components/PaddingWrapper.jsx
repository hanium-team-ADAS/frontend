import React from 'react';

const PaddingWrapper = ({ paddingTop, children }) => {
  const additionalPadding = 16; // navbars's padding-top = 1rem(=16px)

  return (
    <div style={{ paddingTop: `${paddingTop + additionalPadding}px` }}>
      {children}
    </div>
  );
};

export default PaddingWrapper;
