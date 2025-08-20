import React from 'react';

// 타입 정의
type ButtonName = '득근캘린더' | '몽글이뱃지';

export type GroupProps = {
  onClick: (name: ButtonName) => void;
  buttonSize?: string; // e.g. '64px'
  minSize?: number;
  maxSize?: number;
};

// 색상 상수 정의
const leftButtonColors: Record<ButtonName, string> = {
  '득근캘린더': '#24c474ff',
  '몽글이뱃지': '#FFD680',
};
const leftButtonBorderColors: Record<ButtonName, string> = {
  '득근캘린더': '#1a8d56',
  '몽글이뱃지': '#bfa332',
};
const leftButtonShadowColors: Record<ButtonName, string> = {
  '득근캘린더': 'rgba(26,141,86,0.4)',
  '몽글이뱃지': 'rgba(191,163,50,0.4)',
};

export default function LeftButtonGroup({
  onClick,
  buttonSize = '64px',
  minSize,
  maxSize,
}: GroupProps) {
  const buttons: ButtonName[] = ['득근캘린더', '몽글이뱃지'];
  const sizeStyle: React.CSSProperties = {
    width: buttonSize,
    height: buttonSize,
    minWidth: minSize ? `${minSize}px` : undefined,
    minHeight: minSize ? `${minSize}px` : undefined,
    maxWidth: maxSize ? `${maxSize}px` : undefined,
    maxHeight: maxSize ? `${maxSize}px` : undefined,
  };
  const handleClick = (name: ButtonName) => {
    onClick?.(name);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', zIndex: 10, position: 'relative', marginTop: 150 }}>
      {buttons.map(name => (
        <button
          key={name}
          onClick={() => handleClick(name)}
          aria-label={name}
          type="button"
          style={{
            ...sizeStyle,
            backgroundColor: leftButtonColors[name],
            borderRadius: 24,
            border: `3px solid ${leftButtonBorderColors[name]}`,
            boxShadow: `0 4px 16px ${leftButtonShadowColors[name]}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `0 6px 20px ${leftButtonShadowColors[name]}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = `0 4px 16px ${leftButtonShadowColors[name]}`;
          }}
        >
          <span style={{ whiteSpace: 'nowrap', color: '#3B3B3B', fontWeight: 600 }}>{name}</span>
        </button>
      ))}
    </div>
  );
}
