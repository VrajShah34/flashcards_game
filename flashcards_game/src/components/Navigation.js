import React from 'react';

const Navigation = ({ currentIndex, total, onPrev, onNext }) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:bg-gray-400"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex === total - 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
