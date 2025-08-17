type DailyStatusButtonsProps = {
  handleIconClick: (cardType: string) => void;
};

function DailyStatusButtons({ handleIconClick }: DailyStatusButtonsProps) {
  const baseCard = {
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
  } as const;

  const wrapper = {
    display: "flex",
    justifyContent: "space-around",
    gap: "14px",
    margin: "24px 0",
    flexWrap: "wrap",
  } as const;

  return (
    <div style={wrapper}>
      <div
        style={{ ...baseCard, background: "#FFF8E7" }}
        onClick={() => handleIconClick("오늘은 살살")}
        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)" }}
        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.03rem" }}>오늘은 살살!</span>
        {/* 덤벨, 헬린이 이미지 안내 */}
      </div>
      <div
        style={{ ...baseCard, background: "#FFD680" }}
        onClick={() => handleIconClick("오늘은 적당히")}
        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)" }}
        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.03rem" }}>오늘은 적당히!!</span>
        {/* 헬청년 덤벨 이미지 안내 */}
      </div>
      <div
        style={{ ...baseCard, background: "#B3C0E4" }}
        onClick={() => handleIconClick("오늘은 빡세게")}
        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)" }}
        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.03rem" }}>오늘은 빡세게!!!</span>
        {/* 헬 난이도 최고 이미지 안내 */}
      </div>
      <div
        style={{ ...baseCard, background: "#65CFC7" }}
        onClick={() => handleIconClick("나만의 운동")}
        onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)" }}
        onMouseUp={e => { e.currentTarget.style.transform = "scale(1)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.03rem" }}>나만의 운동</span>
        {/* 나만의 운동 이미지 안내 */}
      </div>
    </div>
  );
}

export default DailyStatusButtons;
