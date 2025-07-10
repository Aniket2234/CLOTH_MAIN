import React, { useState, useEffect, useRef } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 100
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((min + (percentage / 100) * (max - min)) / step) * step;

    if (isDragging === 'min') {
      const newMin = Math.max(min, Math.min(newValue, value[1] - step));
      onChange([newMin, value[1]]);
    } else {
      const newMax = Math.min(max, Math.max(newValue, value[0] + step));
      onChange([value[0], newMax]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, value, min, max, step]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className="px-2 py-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>₹{value[0].toLocaleString()}</span>
          <span>₹{value[1].toLocaleString()}</span>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Track */}
          <div
            className="absolute h-2 bg-black rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className="absolute w-5 h-5 bg-black rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
          />
          
          {/* Max Handle */}
          <div
            className="absolute w-5 h-5 bg-black rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹{min.toLocaleString()}</span>
          <span>₹{max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;