import type { GroupProps } from './LeftButtonGroup';
type ButtonName = '일기' | '스트레칭' | '체중계';

const rightButtonColors: Record<ButtonName, string> = {
  '일기': '#B3C0E4',
  '스트레칭': '#65CFC7',
  '체중계': '#b6ebd5ff',
};

export default function RightButtonGroup({ onClick }: GroupProps) {
  const buttons: ButtonName[] = ['일기', '스트레칭', '체중계'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {buttons.map(name => (
        <button
          key={name}
          onClick={() => onClick(name)}
          style={{ 
            width: 64, height: 64, backgroundColor: rightButtonColors[name],
            borderRadius: 16, border: '2px dashed #f3e1c1', boxShadow: '0 2px 8px #efd',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
        <span style={{ whiteSpace: 'nowrap' }}>
            {name}
        </span>
        </button>
      ))}
    </div>
  );
}