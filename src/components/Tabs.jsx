import React, { useState } from 'react';

// Placeholder component for a basic tab interface
// Expects tabs prop: an array of objects like { label: 'Tab 1', content: <Component /> }
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0); // Index of the active tab

  if (!tabs || tabs.length === 0) {
    return <div>Tabs component requires tabs data.</div>;
  }

  return (
    <div className="tabs-container">
      <div className="tab-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div 
        className="tab-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`tabpanel-${activeTab}`}
      >
        {tabs[activeTab].content}
      </div>
       {/* Basic styling needed in a CSS file later */}
    </div>
  );
}

export default Tabs; 