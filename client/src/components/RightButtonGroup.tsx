import type { GroupProps } from './LeftButtonGroup';

type ButtonName = '일기' | '스트레칭' | '체중계';

const rightButtonColors: Record<ButtonName, string> = {
  '일기': '#B3C0E4',
  '스트레칭': '#65CFC7',
  '체중계': '#b6ebd5ff',
};

// 버튼 원색에 대비되는 진한 색상(물감 느낌)을 미리 정의
const rightButtonBorderColors: Record<ButtonName, string> = {
  '일기': '#7A8BBF',       // #B3C0E4보다 진한 블루
  '스트레칭': '#3A8B86',   // #65CFC7보다 진한 청록
  '체중계': '#6ABFA8',     // #b6ebd5ff보다 진한 민트톤
};

const rightButtonShadowColors: Record<ButtonName, string> = {
  '일기': 'rgba(122,139,191,0.5)',
  '스트레칭': 'rgba(58,139,134,0.5)',
  '체중계': 'rgba(106,191,168,0.4)',
};

type RightButtonGroupProps = GroupProps & {
  weightDiff?: number | null;  // 목표까지 kg 전달용 prop
  buttonSize?: string;         // 버튼 크기 지정 (예: '64px', '12vw')
  minSize?: number;
  maxSize?: number;
};

export default function RightButtonGroup({
  onClick,
  weightDiff,
  buttonSize = '64px',
  minSize,
  maxSize,
}: RightButtonGroupProps) {
  const buttons: ButtonName[] = ['일기', '스트레칭', '체중계'];

  // 크기 스타일 객체 계산
  const sizeStyle: React.CSSProperties = {
    width: buttonSize,
    height: buttonSize,
    minWidth: minSize ? `${minSize}px` : undefined,
    minHeight: minSize ? `${minSize}px` : undefined,
    maxWidth: maxSize ? `${maxSize}px` : undefined,
    maxHeight: maxSize ? `${maxSize}px` : undefined,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', zIndex: 10, position: 'relative', marginTop: 150}}>
      {buttons.map(name => (
        <button
          key={name}
          onClick={() => onClick(name)}
          aria-label={name}
          type="button"
          style={{
            ...sizeStyle,
            backgroundColor: rightButtonColors[name],
            borderRadius: 24, // 더 둥글게 (구름 느낌)
            border: `3px solid ${rightButtonBorderColors[name]}`,  // 진한 테두리색
            boxShadow: `0 4px 16px ${rightButtonShadowColors[name]}`, // 부드러운 진한 그림자
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget.style.boxShadow = `0 6px 20px ${rightButtonShadowColors[name]}`);
          }}
          onMouseLeave={e => {
            (e.currentTarget.style.boxShadow = `0 4px 16px ${rightButtonShadowColors[name]}`);
          }}
        >
          <span style={{ whiteSpace: 'nowrap', color: '#1F2F2C', fontWeight: 600 }}>
            {name}
          </span>
        </button>
      ))}

      {weightDiff !== null && weightDiff !== undefined && (
        <div
          style={{
            marginTop: -10,
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: '#3B726B',
            whiteSpace: 'nowrap',
          }}
        >
          목표까지<br/> {Math.abs(weightDiff).toFixed(1)}kg!
        </div>
      )}
    </div>
  );
}
