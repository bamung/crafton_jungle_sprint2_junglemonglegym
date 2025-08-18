import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type DailyStatusButtonsProps = {
  handleIconClick: (cardType: string) => void;
};

function useResponsiveStyles() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 600); // 600px 이하를 모바일로 간주
    }
    handleResize(); // 최초 적응
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardMobile: CSSProperties = {
    fontFamily: "'BMJUA', sans-serif",
    width: "96px",
    height: "52px",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px #ecd",
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.08s ease",
  };

  const cardDesktop: CSSProperties = {
    fontFamily: "'BMJUA', sans-serif",
    width: "120px",
    height: "70px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 10px #ecd",
    cursor: "pointer",
    userSelect: "none",
    transition: "transform 0.08s ease",
  };

  const wrapperMobile: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    margin: "12px 0",
    flexWrap: "wrap",
  };

  const wrapperDesktop: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    gap: "14px",
    margin: "24px 0",
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

  return (
    <div style={wrapper}>
      <div
        style={{ ...card, background: "#FFF8E7" }}
        onClick={() => handleIconClick("오늘은 살살")}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="오늘은 살살"
      >
        <span style={font}>오늘은 살살!</span>
      </div>
      <div
        style={{ ...card, background: "#FFD680" }}
        onClick={() => handleIconClick("오늘은 적당히")}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="오늘은 적당히"
      >
        <span style={font}>오늘은 적당히!!</span>
      </div>
      <div
        style={{ ...card, background: "#B3C0E4" }}
        onClick={() => handleIconClick("오늘은 빡세게")}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="오늘은 빡세게"
      >
        <span style={font}>오늘은 빡세게!!!</span>
      </div>
      <div
        style={{ ...card, background: "#65CFC7" }}
        onClick={() => handleIconClick("나만의 운동")}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="나만의 운동"
      >
        <span style={font}>나만의 운동</span>
      </div>
    </div>
  );
}

export default DailyStatusButtons;
