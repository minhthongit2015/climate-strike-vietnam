/* eslint-disable no-tabs */
import React from 'react';
import './IconCheckbox.scss';

export default React.memo((props) => {
  const { checked, ...restProps } = props;
  return (
    <svg
      viewBox="0 0 474.8 474.801"
      style={{ enableBackground: 'new 0 0 474.8 474.801' }}
      {...restProps}
    >
      <path
        fill="url(#SVG_DreamWhiteGradient)"
        style={{ transition: 'd .3s ease-in-out' }}
        className={`icon-checkbox__box ${checked ? 'checked' : ''}`}
        d="M396.8,93.5c-2.1-5.6-5.5-10.5-5.5-10.5s-8.7-14-12.3-17.4l-26.1,22.1c11.1,12,12.6,28.4,12.6,30.9v237.6
        c0,12.6-4.5,23.3-13.4,32.3c-8.9,8.9-19.7,13.4-32.3,13.4H82.2c-12.6,0-23.3-4.5-32.3-13.4c-8.9-8.9-13.4-19.7-13.4-32.3V118.6
        c0-12.6,4.5-23.3,13.4-32.3c8.9-8.9,19.7-13.4,32.3-13.4h237.5c4.2,0,8.5,0.6,12.8,1.7c1.1,0.4,3.2,0.6,3.7,0.8
        c3,1.1,13,8.3,16.5,12.3L379,65.6c-2.6-4.3-10.5-11-14.7-14.8c-3.1-3-8.3-6-11.2-7.3c-10.3-4.8-21.4-7.1-33.4-7.1H82.2
        c-22.7,0-42,8-58.1,24.1C8,76.6,0,96,0,118.6v237.5c0,22.6,8,42,24.1,58.1c16.1,16.1,35.5,24.1,58.1,24.1h237.5
        c22.6,0,42-8,58.1-24.1c16.1-16.1,24.1-35.5,24.1-58.1V112.3C401.6,109,398.9,98.6,396.8,93.5z"
      />
      {checked && (
        <path
          fill="url(#SVG_DreamWhiteGradient)"
          d="M467.95,93.216l-31.409-31.409c-4.568-4.567-9.996-6.851-16.279-6.851c-6.275,0-11.707,2.284-16.271,6.851
    L219.265,246.532l-75.084-75.089c-4.569-4.57-9.995-6.851-16.274-6.851c-6.28,0-11.704,2.281-16.274,6.851l-31.405,31.405
    c-4.568,4.568-6.854,9.994-6.854,16.277c0,6.28,2.286,11.704,6.854,16.274l122.767,122.767c4.569,4.571,9.995,6.851,16.274,6.851
    c6.279,0,11.704-2.279,16.274-6.851l232.404-232.403c4.565-4.567,6.854-9.994,6.854-16.274S472.518,97.783,467.95,93.216z"
        />
      )}
    </svg>
  );
});
