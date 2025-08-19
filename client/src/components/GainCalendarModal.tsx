// client/src/components/GainCalendarModal.tsx
import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { api } from "../lib/api";           // ✅ 서버 API(getDaily, setDidWorkout, toYMD)
import { useAuth } from "../store/auth";    // ✅ 토큰 구독

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
const ymKey = (d: Date): string => {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const weekdayColors: string[] = [
  "#ED9090",
  "#f0bc81ff",
  "#ebe9a0ff",
  "#74b96cff",
  "#9290e7ff",
  "#c75fe7ff",
  "#d647a7ff"
];

const styles: { [key: string]: CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "#FAF4E4CC",
    backdropFilter: "blur(2px)",
    zIndex: 2000
  },
  
  modal: {
    position: "fixed", inset: 0, margin: "auto",
    width: "min(960px,94vw)",
    height: "min(92vh,940px)",
    background: "#FAF4E4",
    borderRadius: 18,
    outline: "5px solid #7e5a3e",
    boxShadow: "0 10px 28px rgba(218, 209, 196, 0.12)",
    zIndex: 2001,
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    gap: 8,
    padding: 12,
    overflow: "hidden"
  },
  header: {
    display:"grid",
    gridTemplateColumns:"auto 1fr auto auto auto",
    alignItems:"center",
    gap:8
  },
  title: {
    textAlign: "center",
    background: "#FFFBE8",
    padding: "8px 16px",
    fontWeight: 800,
    fontSize: 20,
    borderRadius: 14,
    border: "5px solid #7e5a3e",
    textShadow: "0 1px rgba(255,255,255,0.4)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  navBtn: {
    border: "4px solid #7e5a3e",
    background: "#FAF4E4",
    borderRadius: 12,
    padding: "8px 12px",
    cursor: "pointer",
    color: "#7e5a3e"
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: "9999px",
    background: "#FAF4E4",
    border: "4px solid #7e5a3e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    lineHeight: 1
  },
  closeGlyph: {
    fontWeight: 900,
    fontSize: 20,
    color: "#7e5a3e",
    marginTop: 5
  },
  weekdayGrid:{
    display:"grid",
    gridTemplateColumns:"repeat(7,1fr)",
    gap:4,
    marginBottom:0,
    minHeight:36
  },
  weekdayCell: {
    textAlign: "center",
    padding: "8px 0",
    borderRadius: 12,
    border: "4px solid #7e5a3e",
    background: "#fffbe8",
    fontWeight: 800,
    fontSize: 17,
    color: "#a99e7e",
    textShadow: `
    -1px -1px 0 #000000ff,
     1px -1px 0 #000000ff,
    -1px  1px 0 #000000ff,
     1px  1px 0 #000000ff
  `
  },
  daysWrap: { minHeight: 0, height: "100%" },
  cell: {
    position: "relative",
    borderRadius: 16,
    border: "4px solid #7e5a3e",
    background: "linear-gradient(180deg, #fffbe8 85%, #f7e8c5 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    cursor: "pointer",
    overflow: "hidden"
  },
  cellEmpty: {
    border: "4px dashed #e9dcc8",
    borderRadius: 14,
    opacity: .45,
    background: "#fdf6e3"
  },
  dayNumber: {
    fontWeight: 800,
    color: "#b49a7f",
    fontSize: 20
  },
  checkBtn: {
    position: "absolute", right: 8, bottom: 8,
    width: 24, height:24,
    border: "1px solid #e9dcc8",
    borderRadius: "50%",
    background: "#fffbe8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 1,
    color: "#ffe384"
  },
  checkedBtn: {
    background: "#ed7d7d63",
    boxShadow: "inset 0 0.1px 0 rgba(0,0,0,0.08)",
    color: "#ffe384"
  },
  todayOutline: {
    outline: "3px dashed #b1e5d9",
    outlineOffset: -6
  },
  footer: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap"
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    border: "4px solid #e9dcc8",
    borderRadius: 12,
    background: "#fffbe8",
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #d8d81eff 0%, #ff8e8e 100%)",
    transition: "width 0.25s ease"
  },
  giftBox: {
    width: 50,
    height: 50,
    border: "5px solid #ffe384",
    borderRadius: 14,
    background: "#ffb1b1",
    position: "relative"
  },
  giftLocked: {
    filter: "saturate(0.1) opacity(0.7)"
  },
  giftActive: {
    animation: "twinkle 1.15s infinite ease-in-out",
    cursor: "pointer"
  },
};

function buildCells(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const arr: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) arr.push(null);
  for (let d = 1; d <= daysInMonth; d++) arr.push(d);
  while (arr.length < 42) arr.push(null);
  return arr.slice(0, 42);
}

type GainCalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GainCalendarModal({ isOpen, onClose }: GainCalendarModalProps){
  const [viewDate, setViewDate] = useState<Date>(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });

  // 월별 체크(일 번호 Set)
  const [checksByMonth, setChecksByMonth] = useState<Record<string, Set<number>>>({});
  const [monthLoading, setMonthLoading] = useState(false); // ✅ 월 데이터 로딩 표시용

  const token = useAuth((s) => s.token); // ✅ 토큰 구독

  useEffect(() => {
    if (isOpen) {
      const n = new Date();
      setViewDate(new Date(n.getFullYear(), n.getMonth(), 1));
    }
  }, [isOpen]);

  const key = ymKey(viewDate);
  const monthSet = checksByMonth[key] ?? new Set();
  const cells = buildCells(viewDate.getFullYear(), viewDate.getMonth());

  // ✅ 월 진입/변경/토큰 준비 시 서버에서 월 데이터 하이드레이트
  useEffect(() => {
    if (!isOpen || !token) return; // 토큰 없으면 호출하지 않음
    let canceled = false;
    const loadMonth = async () => {
      setMonthLoading(true);
      try {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const set = new Set<number>();

        // 간단하게 순차 호출 (필요하면 병렬/쓰로틀 적용 가능)
        type DailyResponse = { didWorkout?: boolean };
        for (let d = 1; d <= daysInMonth; d++) {
          const ymd = api.toYMD(new Date(year, month, d));
          try {
            const data = await api.getDaily(ymd) as DailyResponse;
            if (canceled) return;
            if (data?.didWorkout) set.add(d);
          } catch {
            // 무시 (개별 실패)
          }
        }

        if (!canceled) {
          setChecksByMonth((prev) => ({ ...prev, [key]: set }));
        }
      } finally {
        if (!canceled) setMonthLoading(false);
      }
    };
    loadMonth();
    return () => { canceled = true; };
    // key(=연월), token, isOpen이 바뀔 때 재조회
  }, [key, token, isOpen, viewDate]);

  const toggleDay = async (day: number | null) => {
    if (day == null) return;
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const ymd = api.toYMD(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));

    // 낙관적 업데이트
    setChecksByMonth((prev) => {
      const copy = { ...prev };
      const cur = new Set(copy[key] ?? []);
      if (cur.has(day)) cur.delete(day);
      else cur.add(day);
      copy[key] = cur;
      return copy;
    });

    try {
      const willBe = !monthSet.has(day); // 토글 후 상태
      await api.setDidWorkout(ymd, willBe);
    } catch {
      // 실패 시 롤백
      setChecksByMonth((prev) => {
        const copy = { ...prev };
        const cur = new Set(copy[key] ?? []);
        if (cur.has(day)) cur.delete(day);
        else cur.add(day);
        copy[key] = cur;
        return copy;
      });
    }
  };

  const prevMonth = (): void => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = (): void => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToToday = (): void => {
    const n = new Date();
    setViewDate(new Date(n.getFullYear(), n.getMonth(), 1));
  };

  const progressPercent = Math.min((monthSet.size / REWARD_DAYS) * 100, 100);
  const isGiftActive = monthSet.size >= REWARD_DAYS;

  if (!isOpen) return null;

  return (
    <>
      <style>{responsiveCSS}</style>
      <div style={styles.modalOverlay} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gain-calendar-title"
        tabIndex={-1}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 헤더: 이전 | 제목 | 다음 | 오늘 | X ── */}
        <div style={styles.header}>
          <button aria-label="이전 달" onClick={prevMonth} style={styles.navBtn}>
            ◀
          </button>
          <div id="gain-calendar-title" className="gc-title" style={styles.title}>
            {viewDate.getFullYear()}.{String(viewDate.getMonth() + 1).padStart(2, "0")} 득근 캘린더
            {monthLoading ? " · 불러오는 중..." : ""}
          </div>
          <button aria-label="다음 달" onClick={nextMonth} style={styles.navBtn}>
            ▶
          </button>
          {/* 오늘 버튼 */}
          <button aria-label="오늘로 이동" onClick={goToToday} style={styles.navBtn}>
            오늘
          </button>
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
          {["일", "월", "화", "수", "목", "금", "토"].map((d, idx) => (
            <div
              key={d}
              className="gc-weekday"
              style={{
                ...styles.weekdayCell,
                color: weekdayColors[idx],
                borderColor: weekdayColors[idx],
                background: "#FAF4E4"
              }}
            >
              {d}
            </div>
          ))}
        </div>
        {/* 날짜 */}
        <div style={styles.daysWrap}>
          <div className="gc-grid" role="grid" aria-label="득근 캘린더 날짜">
            {cells.map((day, i) => {
              if (day == null) {
                return <div key={i} className="gc-empty" style={styles.cellEmpty} aria-hidden="true" />;
              }
              const t = new Date();
              const isToday =
                day === t.getDate() &&
                viewDate.getMonth() === t.getMonth() &&
                viewDate.getFullYear() === t.getFullYear();
              const checked = monthSet.has(day);
              return (
                <div
                  key={i}
                  className="gc-cell"
                  role="gridcell"
                  tabIndex={0}
                  aria-checked={checked}
                  onClick={() => toggleDay(day)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleDay(day);
                  }}
                  style={{ ...styles.cell, ...(isToday ? styles.todayOutline : {}) }}
                >
                  <span style={styles.dayNumber}>{day}</span>
                  <button
                    type="button"
                    className="gc-check"
                    aria-label={`${day}일 출석 체크`}
                    style={{ ...styles.checkBtn, ...(checked ? styles.checkedBtn : {}) }}
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
            <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
          </div>
          <span aria-live="polite">
            출석 {monthSet.size}/{REWARD_DAYS}
          </span>
          <div
            role="button"
            aria-label={isGiftActive ? "선물 오픈 가능" : `한 달 ${REWARD_DAYS}일 이상 출석 시 선물 오픈`}
            tabIndex={0}
            style={{ ...styles.giftBox, ...(isGiftActive ? styles.giftActive : styles.giftLocked) }}
            onClick={() => {
              if (isGiftActive) alert(":짠: 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!");
            }}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && isGiftActive)
                alert(":짠: 선물 오픈! 메인 화면 몽글이 옆으로 이동합니다!");
            }}
          />
        </div>
      </div>
    </>
  );
}
