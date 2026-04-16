import React from 'react';

const Logo = ({ width = 40, height = 40, className = "", color = "#6f42c1" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Shape (Soft Square/Circle Hybrid) */}
            <rect x="2" y="2" width="36" height="36" rx="10" fill={color} fillOpacity="0.1" />

            {/* Stylized 'V' / Book Shape */}
            <path
                d="M11 14L20 30L29 14"
                stroke={color}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Education/Spark Accent */}
            <circle cx="20" cy="8" r="3" fill={color} />
            <path
                d="M30 24L34 24M32 22L32 26"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.5"
            />
        </svg>
    );
};

export default Logo;
