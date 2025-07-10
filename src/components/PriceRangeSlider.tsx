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
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercentage = useCallback((val: number) => {
    if (max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number) => {
    const rawValue = min + (percentage / 100) * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const updateValue = useCallback((clientX: number) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = Math.max(min, Math.min(max, getValueFromPercentage(percentage)));

    let newRange: [number, number];

    if (isDragging === 'min') {
      const newMin = Math.min(newValue, localValue[1] - step);
      newRange = [Math.max(min, newMin), localValue[1]];
    } else {
      const newMax = Math.max(newValue, localValue[0] + step);
      newRange = [localValue[0], Math.min(max, newMax)];
    }

    setLocalValue(newRange);
    onChange(newRange);
  }, [isDragging, localValue, min, max, step, onChange, getValueFromPercentage]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
  };

  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();
    updateValue(e.clientX);
  }, [updateValue]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientX);
    }
  }, [updateValue]);

  const handleEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!sliderRef.current || isDragging) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const clickValue = getValueFromPercentage(percentage);

    // Determine which handle is closer
    const distanceToMin = Math.abs(clickValue - localValue[0]);
    const distanceToMax = Math.abs(clickValue - localValue[1]);

    let newRange: [number, number];

    if (distanceToMin < distanceToMax) {
      // Move min handle
      const newMin = Math.max(min, Math.min(clickValue, localValue[1] - step));
      newRange = [newMin, localValue[1]];
    } else {
      // Move max handle
      const newMax = Math.min(max, Math.max(clickValue, localValue[0] + step));
      newRange = [localValue[0], newMax];
    }

    setLocalValue(newRange);
    onChange(newRange);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveGlobal = (e: MouseEvent) => handleMouseMove(e);
      const handleTouchMoveGlobal = (e: TouchEvent) => handleTouchMove(e);
      const handleEndGlobal = () => handleEnd();

      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleEndGlobal);
      document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
      document.addEventListener('touchend', handleEndGlobal);
      
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveGlobal);
        document.removeEventListener('mouseup', handleEndGlobal);
        document.removeEventListener('touchmove', handleTouchMoveGlobal);
        document.removeEventListener('touchend', handleEndGlobal);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const minPercentage = getPercentage(localValue[0]);
  const maxPercentage = getPercentage(localValue[1]);

  return (
    <div className="px-2 py-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
          <span>₹{localValue[0].toLocaleString()}</span>
          <span>₹{localValue[1].toLocaleString()}</span>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer select-none"
          onClick={handleTrackClick}
        >
          {/* Active Track */}
          <div
            className="absolute h-2 bg-black rounded-full pointer-events-none"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 hover:scale-110 transition-transform ${
              isDragging === 'min' ? 'cursor-grabbing scale-110 shadow-xl' : ''
            }`}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />
          
          {/* Max Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 hover:scale-110 transition-transform ${
              isDragging === 'max' ? 'cursor-grabbing scale-110 shadow-xl' : ''
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