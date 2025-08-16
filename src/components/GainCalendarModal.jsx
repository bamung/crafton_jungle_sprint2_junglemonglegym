import React, { useState, useEffect } from "react";
const REWARD_DAYS = 15;
/* 반응형/크기 오버라이드 CSS */
const responsiveCSS = `
  .gc-grid {
    display:grid;
    grid-template-columns:repeat(7, minmax(0,1fr));
    grid-template-rows: repeat(6, 1fr);
    gap:4px;
    height:100%;
    min-height:0;
  }
  .gc-cell, .gc-empty { min-height:0; overflow:hidden; }
  .gc-check { width:24px; height:24px; right:8px; bottom:8px; font-size:14px; }
  @media (max-width: 900px){
    .gc-title { font-size: 18px !important; padding: 8px 14px !important; }
    .gc-weekday { padding: 6px 0 !important; }
  }
  @media (max-width: 640px){
    .gc-title { font-size: 16px !important; }
    .gc-weekday { padding: 4px 0 !important; }
    .gc-check { width:18px; height:18px; right:6px; bottom:6px; font-size:12px; }
  }
`;

const weekdayColors = [
  "#ED9090", // 일: 
  "#f0bc81ff", // 월: 
  "#ebe9a0ff", // 화: 
  "#74b96cff", // 수: 
  "#9290e7ff", // 목: 
  "#c75fe7ff", // 금: 
  "#d647a7ff"  // 토: 
];

const styles = {
  modalOverlay: {
    position:"fixed",
    inset:0,
    background:"#FAF4E4CC",    // 연베이지 투명
    backdropFilter:"blur(2px)",
    zIndex:2000
  },
  modal: {
    position:"fixed",inset:0,margin:"auto",
    width:"min(960px,94vw)",
    height:"min(92vh,940px)",
    background:"#FAF4E4",
    borderRadius:18,
    outline:"5px solid #d4acacff",  // 연한 갈색 라인
    boxShadow:"0 10px 28px rgba(112,97,78,0.10)",
    zIndex:2001,
    display:"grid",
    gridTemplateRows:"auto auto 1fr auto",
    gap:8,
    padding:12,
    overflow:"hidden"
  },
  header: {
    display:"grid",
    gridTemplateColumns:"auto 1fr auto auto auto",
    alignItems:"center",
    gap:8
  },
  title:{
    textAlign:"center",
    background:"#FFFBE8",
    padding:"8px 16px",
    fontWeight:800,fontSize:20,
    borderRadius:14,
    border:"5px solid #afe1fdff",
    textShadow:"0 1px rgba(255,255,255,0.4)",
    whiteSpace:"nowrap",
    overflow:"hidden",
    textOverflow:"ellipsis"
  },
  navBtn:{border:"4px solid #a6f3ffff",background:"#FFFBE8",borderRadius:12,padding:"8px 12px",cursor:"pointer",color:"#8D7966"},
  closeBtn:{
    width:36,height:36,
    borderRadius:"9999px",
    background:"#FFB7B7",
    border:"4px solid #B5A38D",
    display:"flex",alignItems:"center",justifyContent:"center",
    cursor:"pointer",
    lineHeight:1
  },
  closeGlyph:{
    fontWeight:900,
    fontSize:20,
    color:"#634B2E",
    marginTop:5
  },
  weekdayGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(7,1fr)",
    gap:4,
    marginBottom:0,
    minHeight:36
  },
  weekdayCell:{
    textAlign:"center",
    padding:"6px 0",
    borderRadius:12,
    border:"4px solid #C2B4A2",
    background:"#FFFBE8",
    fontWeight:800,
    fontSize:17
  },
  daysWrap:{ minHeight:0, height:"100%" },
  cell:{position:"relative",borderRadius:16,border:"5px solid #ffd2d2ff",
    background:"linear-gradient(180deg, rgba(255,255,255,.75), transparent 60%), radial-gradient(200% 180% at 50% -10%, rgba(255,255,255,.25), transparent 40%), linear-gradient(180deg, #F5FFE9, #FFEBDD)",
    display:"flex",alignItems:"flex-start",justifyContent:"flex-start",
    padding:10,cursor:"pointer",overflow:"hidden"
  },
  cellEmpty:{border:"4px dashed #ffd8b4ff",borderRadius:14,opacity:.45},
  dayNumber:{fontWeight:800},
  checkBtn:{
    position:"absolute",right:8,bottom:8,
    width:24,height:24,
    border:"4px solid #ffababff",
    borderRadius:"50%",
    background:"rgba(255,255,255,0.7)",
    display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:14,lineHeight:1,color:"#F5F6C4"
  },
  checkedBtn:{background:"#f79090ff",boxShadow:"inset 0 2px 0 rgba(0,0,0,0.08)",color:"#F5F6C4"},
  todayOutline:{outline:"3px dashed rgba(133, 101, 81, 0.7)",outlineOffset:-6},
  footer:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},
  progressBarContainer:{flex:1,height:10,border:"5px solid #482D1C",borderRadius:12,background:"#FFF7E8",overflow:"hidden"},
  progressBar:{height:"100%",background:"linear-gradient(90deg,#b61010ff,#EBA13A)",transition:"width 0.25s ease"},
  giftBox:{width:50,height:50,border:"5px solid #b61010ff",borderRadius:14,background:"#F75C5C",position:"relative"},
  giftLocked:{filter:"saturate(0.1) opacity(0.7)"},
  giftActive:{animation:"twinkle 1.15s infinite ease-in-out",cursor:"pointer"},
};
function buildCells(year, month){
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const arr = [];
  for(let i=0;i<firstDow;i++) arr.push(null);
  for(let d=1; d<=daysInMonth; d++) arr.push(d);
  while(arr.length < 42) arr.push(null);
  return arr.slice(0,42);
}
const ymKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
export default function GainCalendarModal({ isOpen, onClose }){
  const [viewDate, setViewDate] = useState(()=> {
    const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [checksByMonth, setChecksByMonth] = useState({});
  useEffect(()=> {
    if(isOpen){
      const n = new Date();
      setViewDate(new Date(n.getFullYear(), n.getMonth(), 1));
    }
  }, [isOpen]);
  const key = ymKey(viewDate);
  const monthSet = checksByMonth[key] ?? new Set();
  const cells = buildCells(viewDate.getFullYear(), viewDate.getMonth());
  const toggleDay = (day) => {
    if(day == null) return;
    setChecksByMonth(prev => {
      const copy = {...prev};
      const cur = new Set(copy[key] ?? []);
      if(cur.has(day)) cur.delete(day); else cur.add(day);
      copy[key] = cur;
      return copy;
    });
  };
  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1));
  const goToToday  = () => { const n=new Date(); setViewDate(new Date(n.getFullYear(), n.getMonth(), 1)); };
  const progressPercent = Math.min((monthSet.size / REWARD_DAYS) * 100, 100);
  const isGiftActive = monthSet.size >= REWARD_DAYS;
  if(!isOpen) return null;
  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.modalOverlay} onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="gain-calendar-title"
           tabIndex={-1} style={styles.modal} onClick={(e)=>e.stopPropagation()}>
        {/* ── 헤더: 이전 | 제목 | 다음 | 오늘 | X ── */}
        <div style={styles.header}>
          <button aria-label="이전 달" onClick={prevMonth} style={styles.navBtn}>:뒤쪽_화살표:</button>
          <div id="gain-calendar-title" className="gc-title" style={styles.title}>
            {viewDate.getFullYear()}.{String(viewDate.getMonth()+1).padStart(2,"0")} 득근 캘린더
          </div>
          <button aria-label="다음 달" onClick={nextMonth} style={styles.navBtn}>:앞쪽_화살표:</button>
          {/* 오늘 버튼 */}
          <button aria-label="오늘로 이동" onClick={goToToday} style={styles.navBtn}>오늘</button>
          {/* 닫기(X) */}
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            style={styles.closeBtn}
            title="닫기"
          >
            <span style={styles.closeGlyph}>×</span>
          </button>
        </div>
        <div style={styles.weekdayGrid}>
        {["일","월","화","수","목","금","토"].map((d, idx) => (
            <div
            key={d}
            className="gc-weekday"
            style={{
                ...styles.weekdayCell,
                color: weekdayColors[idx],
                borderColor: weekdayColors[idx], // 테두리까지 적용하면 더욱 그림 느낌
                background: "#FAF4E4"
            }}>
            {d}
            </div>
        ))}
        </div>
        {/* 날짜 */}
        <div style={styles.daysWrap}>
          <div className="gc-grid" role="grid" aria-label="득근 캘린더 날짜">
            {cells.map((day, i) => {
              if(day == null){
                return <div key={i} className="gc-empty" style={styles.cellEmpty} aria-hidden="true" />;
              }
              const t = new Date();
              const isToday = (day === t.getDate()
                && viewDate.getMonth() === t.getMonth()
                && viewDate.getFullYear() === t.getFullYear());
              const checked = monthSet.has(day);
              return (
                <div key={i}
                     className="gc-cell"
                     role="gridcell"
                     tabIndex={0}
                     aria-checked={checked}
                     onClick={()=>toggleDay(day)}
                     onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===" ") toggleDay(day); }}
                     style={{...styles.cell, ...(isToday ? styles.todayOutline : {})}}>
                  <span style={styles.dayNumber}>{day}</span>
                  <button
                    type="button"
                    className="gc-check"
                    aria-label={`${day}일 출석 체크`}
                    style={{...styles.checkBtn, ...(checked ? styles.checkedBtn : {})}}
                  >
                    ★
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 푸터 */}
        <div style={styles.footer}>
          <div style={styles.progressBarContainer} aria-hidden="true">
            <div style={{...styles.progressBar, width:`${progressPercent}%`}} />
          </div>
          <span aria-live="polite">출석 {monthSet.size}/{REWARD_DAYS}</span>
          <div
            role="button"
            aria-label={isGiftActive ? "선물 오픈 가능" : `한 달 ${REWARD_DAYS}일 이상 출석 시 선물 오픈`}
            tabIndex={0}
            style={{...styles.giftBox, ...(isGiftActive ? styles.giftActive : styles.giftLocked)}}
            onClick={()=>{ if(isGiftActive) alert(":짠: 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!"); }}
            onKeyDown={(e)=>{ if((e.key==="Enter"||e.key===" ") && isGiftActive) alert(":짠: 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!"); }}
          />
        </div>
      </div>
    </>
  );
}