

type ButtonName = '득근캘린더' | '몽글이 뱃지';

const leftButtonColors: Record<ButtonName, string> = {
  '득근캘린더': '#24c474ff',
  '몽글이 뱃지': '#FFD680',
};

export type GroupProps = {
  onClick: (name: ButtonName) => void;
  buttonSize?: string;
  minSize?: number;
  maxSize?: number;
};

export default function LeftButtonGroup({ onClick  }: GroupProps) {
  const buttons: ButtonName[] = ['득근캘린더', '몽글이 뱃지'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
      {buttons.map(name => (
        <button
          key={name}
          onClick={() => onClick(name)}
          style={{ 
            width: 64, height: 64, backgroundColor: leftButtonColors[name],
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