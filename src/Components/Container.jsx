import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      {children}
    </div>
  );
};

export default Container;