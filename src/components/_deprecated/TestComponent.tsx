import React, { useState } from 'react';

interface TestComponentProps {
  isArabic?: boolean;
}

const TestComponent: React.FC<TestComponentProps> = ({ isArabic = false }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">
        {isArabic ? 'مكون اختبار' : 'Test Component'}
      </h2>
      <p className="text-gray-300 mb-4">
        {isArabic ? 'هذا مكون اختبار للتحقق من عمل React مع Astro بشكل صحيح.' : 
          'This is a test component to verify React is working properly with Astro.'}
      </p>
      <div className="flex items-center justify-center space-x-4">
        <button 
          onClick={() => setCount(prev => prev - 1)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          -
        </button>
        <span className="text-white text-xl font-bold">{count}</span>
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
