import React, { useEffect, useState } from "react";

const NAMES = ['일','월','화','수','목','금','토'];

// 날짜를 YYYY.MM.DD 포맷으로 변환
const fmt = (y,m,d) => `${y}.${String(m).padStart(2,'0')}.${String(d).padStart(2,'0')}`;

// 시작일을 받아 해당 주 일요일 날짜 반환
function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0,0,0,0);
  return d;
}

// 주어진 기준일의 한 주(일~토) 날짜 배열 반환
function weekDates(anchor) {
  const start = startOfWeek(anchor);
  return Array.from({length:7}, (_,i) => new Date(start.getFullYear(), start.getMonth(), start.getDate()+i));
}

// 더미 함수 - 나중에 서버 연동 시 실제 API 호출로 교체
async function fetchWeeklyDietData(anchor) {
  // anchor는 이번 주 기준 날짜
  // 예시로 모든 빈 데이터 내려주는 형태
  const dates = weekDates(anchor);
  return dates.map(d => ({
    date: d.toISOString().slice(0,10),
    weekday: d.getDay(),
    diet: "",
    memo: "",
  }));
}

async function updateDayDiet(dateStr, data) {
  // dateStr: YYYY-MM-DD, data: { diet, memo }
  // 실제 서버 연동 시 호출 부분
  console.log(`업데이트 요청: ${dateStr}`, data);
  // 예시는 바로 성공했다고 가정
  return true;
}

export default function WeeklyDietMemoModal({ isOpen, onClose }) {
  const [anchor, setAnchor] = useState(new Date());
  const [weekData, setWeekData] = useState([]);

  // 팝업 열릴 때 해당 주 데이터 로드
  useEffect(() => {
    if (!isOpen) return;
    async function loadData() {
      const data = await fetchWeeklyDietData(anchor);
      setWeekData(data);
    }
    loadData();
  }, [isOpen, anchor]);

  // 날짜 범위 문자열
  const dates = weekDates(anchor);
  const rangeStr = `${fmt(dates[0].getFullYear(), dates[0].getMonth()+1, dates[0].getDate())} ~ ${fmt(dates[6].getFullYear(), dates[6].getMonth()+1, dates[6].getDate())}`;

  // 오늘 날짜
  const today = new Date();
  today.setHours(0,0,0,0);

  // 텍스트 변경 시 local state 수정 & 서버 업데이트 트리거
  const onChangeField = (index, field, value) => {
    setWeekData(prev => {
      const newData = [...prev];
      newData[index] = {...newData[index], [field]: value};
      // 서버 업데이트 (비동기 호출, 에러 처리는 별도 구현 가능)
      updateDayDiet(newData[index].date, {diet: newData[index].diet, memo: newData[index].memo});
      return newData;
    });
  };

  // ESC 키 눌렀을 때 닫기 처리
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if(e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if(!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          zIndex: 3000,
        }}
      />

      {/* 모달 박스 */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#f3e1c1",
          borderRadius: 20,
          border: "4px solid #7e5a3e",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          padding: 24,
          maxWidth: 940,
          width: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 3001,
          fontFamily: "'BMJUA', sans-serif",
          color: "#5b4027",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="팝업 닫기"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#5b4027",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        {/* 헤더 영역 */}
        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        padding: "0 16px",
        boxSizing: "border-box",
        }}>

        {/* 왼쪽 타이틀 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <h2 style={{
            margin: 0,
            fontSize: 24,
            fontWeight: "bold",
            backgroundColor: "#fcdcad",
            padding: "6px 14px",
            borderRadius: 12,
            border: "3px solid #7e5a3e",
            userSelect: "none",
            }}>
            주간 식단 · 메모
            </h2>
        </div>

        {/* 중앙 버튼 그룹 */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 8 }}>
            {/* 이전주 */}
            <button
            aria-label="이전 주"
            onClick={() => setAnchor(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() -7))}
            style={{
                marginLeft: 50,
                border: "3px solid #7e5a3e",
                backgroundColor: "#fff7e8",
                borderRadius: 10,
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                color: "#5b4027",
            }}
            >◀</button>

            {/* 날짜 범위 */}
            <div style={{
            border: "3px solid #7e5a3e",
            backgroundColor: "#fff7e8",
            padding: "6px 20px",
            borderRadius: 10,
            fontWeight: "bold",
            fontSize: 16,
            minWidth: 210,
            textAlign: "center",
            userSelect: "none",
            }}>
            {rangeStr}
            </div>

            {/* 다음주 */}
            <button
            aria-label="다음 주"
            onClick={() => setAnchor(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7))}
            style={{
                border: "3px solid #7e5a3e",
                backgroundColor: "#fff7e8",
                borderRadius: 10,
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                color: "#5b4027",
            }}
            >▶</button>

            {/* 이번주 */}
            <button
            aria-label="이번 주로 이동"
            onClick={() => setAnchor(new Date())}
            style={{
                border: "3px solid #7e5a3e",
                backgroundColor: "#fff7e8",
                borderRadius: 10,
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                color: "#5b4027",
            }}
            >이번 주</button>
        </div>

        {/* 오른쪽 빈 공간 */}
        <div style={{ flex: 1 }} />
        </div>

        {/* 그리드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {dates.map((d, i) => {
            const isToday = d.getTime() === today.getTime();
            return (
              <section
                key={d.toISOString()}
                style={{
                  border: "3px dashed #7e5a3e",
                  borderRadius: 14,
                  backgroundColor: "#fff7e8",
                  padding: 12,
                  minHeight: 210,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  userSelect: "text",
                }}
              >
                {/* 요일 라벨 */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      padding: "4px 10px",
                      borderRadius: 12,
                      border: "3px solid #7e5a3e",
                      backgroundColor: isToday ? "#a4d9a4" : "#fcdcad",
                      color: "#5b4027",
                      userSelect: "none",
                    }}
                  >
                    {NAMES[d.getDay()]}
                  </div>
                  <div style={{ fontWeight: "bold", opacity: 0.8, userSelect: "none" }}>
                    {fmt(d.getFullYear(), d.getMonth()+1, d.getDate())}
                  </div>
                </div>

                {/* 식단 입력 */}
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>식단</div>
                  <textarea
                    placeholder="예) 아침: 오트밀 · 점심: 닭가슴살샐러드 · 저녁: 연어덮밥"
                    value={weekData[i]?.diet || ""}
                    onChange={e => onChangeField(i, "diet", e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 60,
                      resize: "vertical",
                      border: "1px solid #d5b895",
                      borderRadius: 8,
                      padding: 6,
                      fontFamily: "'BMJUA', cursive",
                      fontSize: 15,
                      lineHeight: 1.5,
                      backgroundColor: "#fffaf0",
                      color: "#5b4027",
                    }}
                  />
                </div>

                {/* 메모 입력 */}
                <div>
                  <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>메모</div>
                  <textarea
                    placeholder="간단한 메모를 적어보세요 :)"
                    value={weekData[i]?.memo || ""}
                    onChange={e => onChangeField(i, "memo", e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 60,
                      resize: "vertical",
                      border: "1px solid #d5b895",
                      borderRadius: 8,
                      padding: 6,
                      fontFamily: "'BMJUA', cursive",
                      fontSize: 15,
                      lineHeight: 1.5,
                      backgroundColor: "#fffaf0",
                      color: "#5b4027",
                    }}
                  />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
