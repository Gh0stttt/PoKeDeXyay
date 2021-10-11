import React from 'react';

function Tabs({ tabs, activeTabIndex, setActiveTabIndex }) {
    return (
      <div className="tabs-nav">
        {tabs.map((v, i) => (
          <div
            onClick={() => setActiveTabIndex(i)}
            className={`tab-link${activeTabIndex === i ? "active" : ""}`}
          >
            <span>{v}</span>
            {activeTabIndex === i && <div className="dot" />}
          </div>
        ))}
        {activeTabIndex === 0 && <p> Overview stuff </p>}
        {activeTabIndex === 1 && <p> Stats stuff </p>}
        {activeTabIndex === 2 && <p> Abilities stuff </p>}
      </div>
    );
}

export default Tabs