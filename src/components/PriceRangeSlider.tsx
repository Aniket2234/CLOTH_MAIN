import React, { useState, useRef, useCallback } from 'react';

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
  step = 50
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [tempValue, setTempValue] = useState<[number, number]>(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback((val: number) => {
    if (max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPercentage = useCallback((percentage: number) => {
    const rawValue = min + (percentage / 100) * (max - min);
    // Only apply step rounding when dragging ends, not during dragging
    return rawValue;
  }, [min, max]);

  const snapToStep = useCallback((val: number) => {
    return Math.round(val / step) * step;
  }, [step]);

  const updateValue = useCallback((clientX: number, handleType: 'min' | 'max', isTemporary = false) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const rawValue = getValueFromPercentage(percentage);

    let newRange: [number, number];

    if (handleType === 'min') {
      const newMin = Math.max(min, Math.min(rawValue, tempValue[1] - step));
      newRange = [newMin, tempValue[1]];
    } else {
      const newMax = Math.min(max, Math.max(rawValue, tempValue[0] + step));
      newRange = [tempValue[0], newMax];
    }

    if (isTemporary) {
      // During dragging, update temp value for smooth visual feedback
      setTempValue(newRange);
    } else {
      // On release, snap to step and update actual value
      const snappedRange: [number, number] = [
        snapToStep(newRange[0]),
        snapToStep(newRange[1])
      ];
      setTempValue(snappedRange);
      onChange(snappedRange);
    }
  }, [tempValue, min, max, step, onChange, getValueFromPercentage, snapToStep]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(type);
    setTempValue(value); // Initialize temp value

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      updateValue(moveEvent.clientX, type, true); // Temporary update during drag
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      updateValue(upEvent.clientX, type, false); // Final update with snapping
      setIsDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  };

  const handleTouchStart = (type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(type);
    setTempValue(value); // Initialize temp value

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();
      if (moveEvent.touches.length > 0) {
        updateValue(moveEvent.touches[0].clientX, type, true); // Temporary update during drag
      }
    };

    const handleTouchEnd = (endEvent: TouchEvent) => {
      // Use the last known position for final update
      if (endEvent.changedTouches.length > 0) {
        updateValue(endEvent.changedTouches[0].clientX, type, false); // Final update with snapping
      }
      setIsDragging(null);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const clickValue = getValueFromPercentage(percentage);

    // Determine which handle is closer
    const distanceToMin = Math.abs(clickValue - value[0]);
    const distanceToMax = Math.abs(clickValue - value[1]);

    const handleType = distanceToMin < distanceToMax ? 'min' : 'max';
    setTempValue(value);
    updateValue(e.clientX, handleType, false); // Direct update with snapping
  };

  // Use temp value during dragging for smooth movement, actual value otherwise
  const displayValue = isDragging ? tempValue : value;
  const minPercentage = getPercentage(displayValue[0]);
  const maxPercentage = getPercentage(displayValue[1]);

  return (
    <div className="px-2 py-4">
      <div className="mb-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
          <span>₹{Math.round(displayValue[0]).toLocaleString()}</span>
          <span>₹{Math.round(displayValue[1]).toLocaleString()}</span>
        </div>
        
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer select-none"
          onClick={handleTrackClick}
        >
          {/* Active Track */}
          <div
            className="absolute h-2 bg-black rounded-full pointer-events-none transition-all duration-75 ease-out"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* Min Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 transition-all duration-75 ease-out ${
              isDragging === 'min' 
                ? 'cursor-grabbing scale-110 shadow-xl border-gray-800' 
                : 'hover:scale-105 hover:shadow-md'
            }`}
            style={{ 
              left: `${minPercentage}%`,
              transition: isDragging === 'min' ? 'none' : 'all 0.075s ease-out'
            }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />
          
          {/* Max Handle */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-black rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 transition-all duration-75 ease-out ${
              isDragging === 'max' 
                ? 'cursor-grabbing scale-110 shadow-xl border-gray-800' 
                : 'hover:scale-105 hover:shadow-md'
            }`}
            style={{ 
              left: `${maxPercentage}%`,
              transition: isDragging === 'max' ? 'none' : 'all 0.075s ease-out'
            }}
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