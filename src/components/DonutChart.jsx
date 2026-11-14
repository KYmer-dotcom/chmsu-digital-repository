import React, { useState } from 'react';

export default function DonutChart({ data, totalLabel = "2,504", subLabel = "Documents" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG Donut calculation
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="donut-chart-container">
      <div className="donut-svg-wrapper">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percentage;

            const isHovered = hoveredIndex === index;

            return (
              <circle
                key={item.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        <div className="donut-center-text">
          <div className="donut-center-count">
            {hoveredIndex !== null ? `${data[hoveredIndex].percentage}%` : totalLabel}
          </div>
          <div className="donut-center-label">
            {hoveredIndex !== null ? data[hoveredIndex].name : subLabel}
          </div>
        </div>
      </div>

      <div className="chart-legend">
        {data.map((item, index) => (
          <div 
            key={item.name} 
            className="legend-item"
            style={{ 
              opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.45,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="legend-color-name">
              <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
              <span>{item.name}</span>
            </div>
            <span className="legend-value">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
