import { useState, Suspense, lazy } from 'react';

type ButtonName = '득근캘린더' | '몽글이 뱃지';

const leftButtonColors: Record<ButtonName, string> = {
  '득근캘린더': '#24c474ff',
  '몽글이 뱃지': '#FFD680',
};

export type GroupProps = {
  onClick: (name: ButtonName) => void;
  buttonSize?: string; // e.g. '64px'
  minSize?: number;
  maxSize?: number;
};

// 모달(뱃지함) 지연 로딩
const BadgeMiniModal = lazy(() => import('./collection/BadgeMiniModal'));

export default function LeftButtonGroup({
  onClick,
  buttonSize = '64px',
  minSize,
  maxSize,
}: GroupProps) {
  const [open, setOpen] = useState(false);
  const buttons: ButtonName[] = ['득근캘린더', '몽글이 뱃지'];

  const sizeStyle: React.CSSProperties = {
    width: buttonSize,
    height: buttonSize,
    minWidth: minSize ? `${minSize}px` : undefined,
    minHeight: minSize ? `${minSize}px` : undefined,
    maxWidth: maxSize ? `${maxSize}px` : undefined,
    maxHeight: maxSize ? `${maxSize}px` : undefined,
  };

  const handleClick = (name: ButtonName) => {
    // 외부에 전달
    onClick?.(name);
    // 내부 모달 열기: '몽글이 뱃지' 버튼일 때만
    if (name === '몽글이 뱃지') setOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {buttons.map((name) => (
        <button
          key={name}
          onClick={() => handleClick(name)}
          style={{
            ...sizeStyle,
            backgroundColor: leftButtonColors[name],
            borderRadius: 16,
            border: '2px dashed #f3e1c1',
            boxShadow: '0 2px 8px #efd',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={name}
          type="button"
        >
          <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
        </button>
      ))}

      {/* 뱃지함 모달 */}
      <Suspense fallback={null}>
        <BadgeMiniModal open={open} onClose={() => setOpen(false)} />
      </Suspense>
    </div>
  );
}
