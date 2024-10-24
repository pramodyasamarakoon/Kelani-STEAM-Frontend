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
    <div className="w-[60px] h-[100px] md:w-[200px] md:h-[200px] mx-2 flex flex-col justify-center items-center">
      <div className="h-[30px] md:h-auto">
        <span className="font-OpenSans-SemiBold text-2xl md:text-5xl">
          {count}
        </span>
        {isPlus ? (
          <span className="font-OpenSans-SemiBold text-2xl md:text-5xl">+</span>
        ) : null}
      </div>
      <div className="h-[40px] md:h-auto">
        <span className="font-OpenSans-regular text-[12px] md:text-[18px]">
          {label}
        </span>
      </div>
    </div>
  );
};

export default CountingNumber;
