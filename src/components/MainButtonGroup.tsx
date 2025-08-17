type MainButtonGroupProps = {
  handleIconClick: (name: string) => void;
};

function MainButtonGroup({ handleIconClick }: MainButtonGroupProps){
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <div
        style={{ width:"60px", height:"60px", background:"#24c474ff", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        onClick={() => handleIconClick("득근캘린더")}
      >{/* 이미지 or 아이콘 */}</div>
      <div
        style={{ width:"60px", height:"60px", background:"#FFD680", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        onClick={() => handleIconClick("몽글이 뱃지")}
      >{/* 이미지 or 아이콘 */}</div>
      <div
        style={{ width:"60px", height:"60px", background:"#B3C0E4", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        onClick={() => handleIconClick("일기")}
      >{/* 이미지 or 아이콘 */}</div>
      <div
        style={{ width:"60px", height:"60px", background:"#65CFC7", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        onClick={() => handleIconClick("스트레칭")}
      >{/* 이미지 or 아이콘 */}</div>
      <button
        onClick={() => handleIconClick('체중계')}
        style={{ width:"60px", height:"60px", background:"#b6ebd5ff", borderRadius:"14px", boxShadow:"0 2px 8px #efd", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
        aria-label="체중계"
        tabIndex={0}
      >{/* 아이콘 */}</button>
      <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "-15px", textAlign: "center" }}>
        목표까지 7kg!
      </div>
    </div>
  );
}

export default MainButtonGroup;
