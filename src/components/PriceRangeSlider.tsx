import React, { useState, useEffect, useRef, useCallback } from 'react';

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

  const getPercentage = useCallback((val: number) => {
    if (max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number) => {
    const rawValue = min + (percentage / 100) * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
  };

  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const updateValue = useCallback((clientX: number) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = getValueFromPercentage(percentage);

    if (isDragging === 'min') {
      const newMin = Math.max(min, Math.min(newValue, value[1] - step));
      if (newMin !== value[0]) {
        onChange([newMin, value[1]]);
      }
    } else if (isDragging === 'max') {
      const newMax = Math.min(max, Math.max(newValue, value[0] + step));
      if (newMax !== value[1]) {
        onChange([value[0], newMax]);
      }
    }
  }, [isDragging, value, min, max, step, onChange, getValueFromPercentage]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateValue(e.clientX);
  }, [updateValue]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientX);
    }
  }, [updateValue]);

  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  return (
    <div className="px-2 py-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
          <span>₹{value[0].toLocaleString()}</span>
          <span>₹{value[1].toLocaleString()}</span>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer select-none"
        >
          {/* Active Track */}
          <div
            className="absolute h-2 bg-black rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 hover:scale-110 transition-transform ${
              isDragging === 'min' ? 'cursor-grabbing scale-110' : ''
            }`}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />
          
          {/* Max Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 hover:scale-110 transition-transform ${
              isDragging === 'max' ? 'cursor-grabbing scale-110' : ''
            }`}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>₹{min.toLocaleString()}</span>
          <span>₹{max.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;