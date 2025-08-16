function DiaryCard({ diary, onEdit, onDelete, idx }) {
  return (
    <div className={`diary-card diary-card-${idx}`} onClick={onEdit} style={{
      cursor:"pointer",
      boxShadow:"0 4px 16px #efd",
      border:"2px dashed #EBC57C",
      background: idx%2===1 ? "#FFF3CD" : "#FFE4F0",
      fontFamily: "'Cafe24 Dangdanghae', 'Nanum Pen Script', cursive",
      padding:"10px 14px", position:"relative"
    }}>
      <div style={{fontSize:"0.95rem", color:"#888", marginBottom:"6px"}}>{diary.date.replace(/-/g,".")}</div>
      <div style={{fontSize:"0.9rem", color:"#606"}}>
        <b>아침:</b> {diary.breakfast||"-"}<br/>
        <b>점심:</b> {diary.lunch||"-"}<br/>
        <b>저녁:</b> {diary.dinner||"-"}
      </div>
      <div style={{
        fontSize:"0.85rem", color:"#413",
        marginTop:"12px", minHeight:"28px"
      }}>
        {diary.memo
          ? diary.memo.slice(0,18) + (diary.memo.length>18?"...":"")
          : "오늘은..."}
      </div>
      {/* 내용있으면 작은 삭제 아이콘(클릭시 내용 삭제) */}
      {(diary.breakfast||diary.lunch||diary.dinner||diary.memo) && (
        <button style={{
          position:"absolute", right:"8px", top:"8px",
          background:"none", border:"none", color:"#d92", cursor:"pointer", fontSize:"1rem"
        }} onClick={(e)=>{ e.stopPropagation(); onDelete(); }}>
          ×
        </button>
      )}
    </div>
  );
}
<div className="diary-popup-container" style={{ fontFamily: "'BMJUA', sans-serif" }}></div>