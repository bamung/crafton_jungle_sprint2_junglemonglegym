import React, { useState, useEffect, useRef } from "react";

const REWARD_DAYS = 15;

const styles = {
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(2px)",
    zIndex: 2000,
  },
  modal: {
    position: "fixed",
    inset: 0,
    margin: "auto",
    width: "min(960px, 94vw)",
    height: "min(88vh, 940px)",
    background: "#f5dac0ed",
    borderRadius: "18px",
    outline: "5px solid #482d1c",
    boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
    padding: 16,
    overflow: "auto",
    zIndex: 2001,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    flex: 1,
    textAlign: "center",
    background: "#FFE39C",
    padding: "12px 16px",
    fontWeight: 800,
    fontSize: 20,
    borderRadius: 14,
    border: "5px solid #482d1c",
    textShadow: "0 1px rgba(255,255,255,0.4)",
  },
  navBtn: {
    border: "5px solid #482d1c",
    background: "#fff7e8",
    borderRadius: 12,
    padding: "8px 12px",
    cursor: "pointer",
    color: "#482d1c",
  },
  weekdayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: 4,
    marginBottom: 4,
  },
  weekdayCell: {
    textAlign: "center",
    padding: "8px 0",
    borderRadius: 12,
    border: "5px solid #482d1c",
    background: "#fff7e8",
    fontWeight: 800,
  },
  grids: {
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    gap: 4,
    flexGrow: 1,
  },
  cell: {
    position: "relative",
    borderRadius: 16,
    border: "5px solid #c1976f",
    background:
      "linear-gradient(180deg, rgba(255,255,255,.75), transparent 60%)," +
      "radial-gradient(200% 180% at 50% -10%, rgba(255,255,255,.25), transparent 40%)," +
      "linear-gradient(180deg, #F5FFE9, #FFEBDD)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    aspectRatio: "1 / 1",
    cursor: "pointer",
  },
  cellEmpty: {
    border: "4px dashed #c1976f",
    borderRadius: 14,
    aspectRatio: "1 / 1",
    opacity: 0.45,
  },
  dayNumber: {
    fontWeight: 800,
  },
  checkBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    border: "5px solid #482d1c",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    color: "#f5f6c4",
  },
  checked: {
    background: "#fc9494",
    boxShadow: "inset 0 2px 0 rgba(0,0,0,0.08)",
    color: "#f5f6c4",
  },
  todayOutline: {
    outline: "3px dashed rgba(79,59,47,0.7)",
    outlineOffset: -6,
  },
  footer: {
    marginTop: 12,
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    border: "5px solid #482d1c",
    borderRadius: 12,
    background: "#fff7e8",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#dfab78,#eba13a)",
    transition: "width 0.25s ease",
  },
  giftBox: {
    width: 62,
    height: 62,
    border: "5px solid #482d1c",
    borderRadius: 14,
    background: "#fff7e8",
    position: "relative",
  },
  giftLocked: {
    filter: "saturate(0.1) opacity(0.7)",
  },
  giftActive: {
    animation: "twinkle 1.15s infinite ease-in-out",
    cursor: "pointer",
  },
  "@keyframes twinkle": {
    "0%,100%": {
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      transform: "translateY(0)",
    },
    "50%": {
      boxShadow: "0 10px 24px rgba(255,211,110,0.45)",
      transform: "translateY(-1px)",
    },
  },
};

// 헬퍼 함수: 달의 날짜 배열 생성 + 시작 요일 맞추기
function generateCalendar(year, month) {
  const firstDayWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  // 빈 칸 생성
  for(let i=0; i<firstDayWeekday; i++){
    cells.push(null);
  }
  // 날짜 생성
  for(let d=1; d<=daysInMonth; d++){
    cells.push(d);
  }
  return cells;
}

export default function GainCalendarModal({ isOpen, onClose }) {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [checkedDays, setCheckedDays] = useState(new Set());

  useEffect(() => {
    // 모달 열릴 때 현재 달로 초기화, 출석 정보 초기화(임시)
    if(isOpen){
      const now = new Date();
      setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setCheckedDays(new Set());
    }
  }, [isOpen]);

  const cells = generateCalendar(viewDate.getFullYear(), viewDate.getMonth());

  // 출석 체크 토글
  function toggleDay(day) {
    if(day === null) return;
    setCheckedDays((prev) => {
      const newSet = new Set(prev);
      if(newSet.has(day)) newSet.delete(day);
      else newSet.add(day);
      return newSet;
    });
  }

  // 이전 달 보기
  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  // 다음 달 보기
  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  // 오늘 달로 이동
  function goToToday() {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }
  
  const progressPercent = Math.min((checkedDays.size / REWARD_DAYS) * 100, 100);
  const isGiftActive = checkedDays.size >= REWARD_DAYS;

  return isOpen ? (
    <>
      <div style={styles.modalOverlay} onClick={onClose}></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gain-calendar-title"
        tabIndex={-1}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <button aria-label="이전 달" onClick={prevMonth} style={styles.navBtn}>◀</button>
          <div id="gain-calendar-title" style={styles.title}>
            {viewDate.getFullYear()}.{String(viewDate.getMonth() + 1).padStart(2, "0")} 득근 캘린더
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button aria-label="다음 달" onClick={nextMonth} style={styles.navBtn}>▶</button>
            <button aria-label="오늘로 이동" onClick={goToToday} style={styles.navBtn}>오늘</button>
          </div>
        </div>

        <div style={styles.weekdayGrid}>
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d} style={styles.weekdayCell}>{d}</div>
          ))}
        </div>

        <div style={styles.grids} role="grid" aria-label="득근 캘린더 날짜">
          {cells.map((day, idx) => {
            if(day === null){
              return <div key={idx} style={styles.cellEmpty} aria-hidden="true"></div>;
            }
            const isToday = (() => {
              const today = new Date();
              return day === today.getDate() && viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear();
            })();
            const checked = checkedDays.has(day);
            return (
              <div
                key={idx}
                role="gridcell"
                tabIndex={0}
                aria-checked={checked}
                onClick={() => toggleDay(day)}
                onKeyDown={(e) => { if(e.key === "Enter" || e.key === " ") toggleDay(day); }}
                style={{
                  ...styles.cell,
                  outline: isToday ? styles.todayOutline.outline : "none",
                  outlineOffset: isToday ? styles.todayOutline.outlineOffset : "none",
                  backgroundColor: checked ? "#fc9494" : styles.cell.background,
                  cursor: "pointer",
                }}
              >
                <span style={styles.dayNumber}>{day}</span>
                <button
                  type="button"
                  aria-label={`${day}일 출석 체크`}
                  style={{
                    ...styles.checkBtn,
                    ...(checked ? styles.checked : {})
                  }}
                >
                  ★
                </button>
              </div>
            );
          })}
        </div>

        <div style={styles.footer}>
          <div style={styles.progressBarContainer} aria-hidden="true">
            <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
          </div>
          <span aria-live="polite">출석 {checkedDays.size}/{REWARD_DAYS}</span>

          <div
            role="button"
            aria-label={isGiftActive ? "선물 오픈 가능" : `한 달 ${REWARD_DAYS}일 이상 출석 시 선물 오픈`}
            tabIndex={0}
            style={{
              ...styles.giftBox,
              ...(isGiftActive ? styles.giftActive : styles.giftLocked),
            }}
            onClick={() => {
              if(isGiftActive) alert("🎉 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!");
            }}
            onKeyDown={(e) => {
              if((e.key === "Enter" || e.key === " ") && isGiftActive) {
                alert("🎉 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!");
              }
            }}
          />
        </div>
      </div>
    </>
  ) : null;
}
