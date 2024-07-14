// src/components/ImageButton.jsx
import React from 'react';

export function ImageButton({ src, alt, onClick }) {
    return (
        <button onClick={onClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <img src={src} alt={alt} style={{ width: '200px', height: '200px' }} />
        </button>
    );
}
