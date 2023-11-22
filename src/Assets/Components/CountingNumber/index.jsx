import React, { useState, useEffect } from "react";

const CountingNumber = ({ label, initialValue, finalValue, isPlus = true }) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    let start = Date.now();
    const duration = 2000;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - start;

      if (elapsed < duration) {
        const progress = (elapsed / duration) * (finalValue - initialValue);
        setCount(Math.floor(progress + initialValue));
        requestAnimationFrame(updateCount);
      } else {
        setCount(finalValue);
      }
    };

    updateCount();
  }, [initialValue, finalValue]);

  return (
    <div className="w-[200px] h-[200px] mx-2 flex flex-col justify-center items-center">
      <div className="mb-4">
        <span className="font-OpenSans-SemiBold text-6xl">{count}</span>
        {isPlus ? (
          <span className="font-OpenSans-SemiBold text-6xl">+</span>
        ) : null}
      </div>
      <span className="font-OpenSans-regular text-[20px]">{label}</span>
    </div>
  );
};

export default CountingNumber;
