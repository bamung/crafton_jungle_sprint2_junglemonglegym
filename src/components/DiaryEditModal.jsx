function DiaryEditModal({ diary, onChange, onSave, onDelete, onClose, date }) {
  return (
    <div className="diary-edit-modal">
      <div style={{
        background:"#FFF9F3", borderRadius:"18px", boxShadow:"0 2px 16px #efd",
        padding:"22px 20px", minWidth:"320px", maxWidth:"380px"
      }}>
        <div style={{fontSize:"1.1rem", color:"#65CFC7", marginBottom:"8px"}}>
          {date.replace(/-/g,".")}
        </div>
        <label style={{fontWeight:"bold"}}>아침</label>
        <input value={diary.breakfast} onChange={e=>onChange("breakfast",e.target.value)} style={inputStyle}/>
        <label style={{fontWeight:"bold", marginTop:"12px"}}>점심</label>
        <input value={diary.lunch} onChange={e=>onChange("lunch",e.target.value)} style={inputStyle}/>
        <label style={{fontWeight:"bold", marginTop:"12px"}}>저녁</label>
        <input value={diary.dinner} onChange={e=>onChange("dinner",e.target.value)} style={inputStyle}/>
        <label style={{fontWeight:"bold", marginTop:"12px"}}>메모</label>
        <textarea value={diary.memo} onChange={e=>onChange("memo",e.target.value)} rows={3} style={{
          ...inputStyle, resize:"none", minHeight:"44px", fontSize:"0.98rem"
        }}/>
        <div style={{display:"flex", gap:"12px", marginTop:"16px", justifyContent:"flex-end"}}>
          <button style={btnStyle} onClick={onSave}>저장</button>
          <button style={{...btnStyle, color:"#d92"}} onClick={onDelete}>내용삭제</button>
          <button style={{...btnStyle, color:"#666"}} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
const inputStyle = {
  width:"100%", border:"2px solid #ece4cb", borderRadius:"8px",
  background:"#fff", marginTop:"4px", fontSize:"1rem", padding:"6px"
};
const btnStyle = {
  background:"#F8E3B2", border:"none", borderRadius:"12px", padding:"6px 18px",
  fontWeight:"bold", color:"#615", cursor:"pointer", fontSize:"1rem"
};
<div className="diary-popup-container" style={{ fontFamily: "'BMJUA', sans-serif" }}></div>