// src/components/ImageButton.jsx
import React from 'react';

export function ImageButton({ src, alt, onClick }) {
    return (
        <button className='image-btn' onClick={onClick}>
            <img src={src} alt={alt} />
        </button>
    )
}
