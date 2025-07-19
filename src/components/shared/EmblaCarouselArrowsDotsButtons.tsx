import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropType {
  enabled: boolean;
  onClick: () => void;
}

export const PrevButton: React.FC<PropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla__button embla__button--prev disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla__button embla__button--next disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
};

interface DotButtonPropType {
  selected: boolean;
  onClick: () => void;
}

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={`embla__dot w-3 h-3 rounded-full mx-1 transition-all duration-300 ${selected ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
      type="button"
      onClick={onClick}
      aria-label="Go to slide"
    />
  );
};
