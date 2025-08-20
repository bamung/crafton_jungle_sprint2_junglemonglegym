import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type DailyStatusButtonsProps = {
  handleIconClick: (cardType: string) => void;
};

// 기존 배경색 기준 더 진한 테두리와 그림자 색관셉 정의
const borderColors: Record<string, string> = {
  "#FFF8E7": "#cdbd81", // 밝은 크림 - 진한 베이지
  "#FFD680": "#bfa332", // 머스타드 - 진한 머스타드
  "#B3C0E4": "#7a8bbf", // 연한 블루 - 진한 블루
  "#65CFC7": "#3a8b86", // 청록 - 진한 청록
};

const shadowColors: Record<string, string> = {
  "#FFF8E7": "rgba(205,189,129,0.4)",
  "#FFD680": "rgba(191,163,50,0.4)",
  "#B3C0E4": "rgba(122,139,191,0.4)",
  "#65CFC7": "rgba(58,139,134,0.4)",
};

function useResponsiveStyles() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardMobile: CSSProperties = {
    fontFamily: "'BMJUA', sans-serif",
    width: "96px",
    height: "52px",
    borderRadius: "24px",          // 구름 느낌 살리도록 둥글게 수정
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // 기본 값. 버튼별로 덮어씌움
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.08s ease",
    border: "3px solid transparent",           // 기본 테두리, 버튼별로 덮어씌움
  };

  const cardDesktop: CSSProperties = {
    fontFamily: "'BMJUA', sans-serif",
    width: "120px",
    height: "70px",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.08s ease",
    border: "3px solid transparent",
  };

  const wrapperMobile: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    margin: "150px 0 10px 0",
    flexWrap: "wrap",
  };

  const wrapperDesktop: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    gap: "14px",
    margin: "170px 0 10px 0",
    flexWrap: "wrap",
  };

  return {
    card: isMobile ? cardMobile : cardDesktop,
    wrapper: isMobile ? wrapperMobile : wrapperDesktop,
    font: isMobile
      ? { fontWeight: "bold", fontSize: "0.95rem" }
      : { fontWeight: "bold", fontSize: "1.03rem" },
  };
}

function DailyStatusButtons({ handleIconClick }: DailyStatusButtonsProps) {
  const { card, wrapper, font } = useResponsiveStyles();

  const buttons = [
    { name: "오늘은 살살", background: "#FFF8E7" },
    { name: "오늘은 적당히", background: "#FFD680" },
    { name: "오늘은 빡세게", background: "#B3C0E4" },
    { name: "나만의 운동", background: "#65CFC7" },
  ];

  return (
    <div style={wrapper}>
      {buttons.map(({ name, background }) => {
        const borderColor = borderColors[background] || "transparent";
        const shadowColor = shadowColors[background] || "rgba(0,0,0,0.1)";
        return (
          <div
            key={name}
            style={{
              ...card,
              background,
              border: `3px solid ${borderColor}`,
              boxShadow: `0 4px 12px ${shadowColor}`,
            }}
            onClick={() => handleIconClick(name)}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
              e.currentTarget.style.boxShadow = `0 6px 20px ${shadowColor}`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 12px ${shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 12px ${shadowColor}`;
            }}
            aria-label={name}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleIconClick(name);
            }}
          >
            <span style={{ ...font, color: '#3B3B3B', userSelect: 'none' }}>{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default DailyStatusButtons;
