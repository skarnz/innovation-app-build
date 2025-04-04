import React from 'react';

// Placeholder component for Next/Back navigation buttons
function NavigationControls({ onNext, onBack, hasBack = true, hasNext = true, nextLabel = 'Next', backLabel = 'Back' }) {
  return (
    <div className="navigation-controls">
      {hasBack && (
        <button onClick={onBack} className="back-button">
          {backLabel}
        </button>
      )}
      {hasNext && (
        <button onClick={onNext} className="next-button">
          {nextLabel}
        </button>
      )}
      {/* Styling needed later */}
    </div>
  );
}

export default NavigationControls; 