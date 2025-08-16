import React, { useState, useEffect } from "react";

// 임시 더미 데이터 생성 함수
function getWeekDates(weekStart) {
  // weekStart: "2025-08-11"
  const dates = [];
  const start = new Date(weekStart);
  for(let i=0; i<7; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }
  return dates;
}

const initialDiaryList = (weekStart) =>
  getWeekDates(weekStart).map(date => ({
    date,
    breakfast: "",
    lunch: "",
    dinner: "",
    memo: "",
  }));

export default function DiaryPopup({ weekStart = "2025-08-11", onClose }) {
  const [selectedWeek, setSelectedWeek] = useState(weekStart);
  const [diaryList, setDiaryList] = useState(initialDiaryList(weekStart));
  const [editIdx, setEditIdx] = useState(null); // 수정할 카드의 index
  const [editData, setEditData] = useState({ breakfast:"", lunch:"", dinner:"", memo:"" });
  const [showAlert, setShowAlert] = useState(false);

  // 주간 변경 시 일기 데이터 새로 고침
  useEffect(() => {
    setDiaryList(initialDiaryList(selectedWeek));
  }, [selectedWeek]);

  // 일기 수정 함수 (백엔드 연동 예정)
  function editDiaryEntry(idx, newData) {
    const newDiary = diaryList.slice();
    newDiary[idx] = { ...newDiary[idx], ...newData };
    setDiaryList(newDiary);
    setShowAlert(true);
    setTimeout(()=>setShowAlert(false), 1500);
  }

  // 일기 입력 삭제 함수(내용만 비우기)
  function deleteDiaryEntry(idx) {
    editDiaryEntry(idx, { breakfast:"", lunch:"", dinner:"", memo:"" });
  }

  // 수정 모달 열기
  function openEdit(idx) {
    setEditIdx(idx);
    setEditData({ ...diaryList[idx] });
  }
  function closeEdit() {
    setEditIdx(null);
  }
  function onChange(field, value) {
    setEditData(ed => ({...ed, [field]: value}));
  }
  function saveEdit() {
    if(editIdx !== null){
      editDiaryEntry(editIdx, editData);
      closeEdit();
    }
  }

  // WeekSelector: (샘플) 3주치 드롭다운
  const weekOptions = [
    "2025-08-04", "2025-08-11", "2025-08-18"
  ];

  return (
    <div className="diary-popup-container">
      <PopupCloseButton onClose={onClose} />
      {/* 좌측상단 주간 선택 */}
      <div style={{ position:"absolute", top:18, left:26, fontSize:"1rem" }}>
        <select
          value={selectedWeek}
          onChange={e => setSelectedWeek(e.target.value)}
          style={{
            borderRadius:"10px", border:"2px solid #ece4cb",
            background:"#FFF9F3", padding:"6px 10px",
            fontFamily:"inherit", fontSize:"1rem"
          }}
        >
          {weekOptions.map(start=>
            <option key={start} value={start}>
              {start.replace(/-/g,".")} ~ {getWeekDates(start)[6].replace(/-/g,".")}
            </option>
          )}
        </select>
      </div>
      {/* 일기 7개 배치 */}
      <DiaryGrid
        diaryList={diaryList}
        onEdit={openEdit}
        onDelete={deleteDiaryEntry}
      />
      {/* 수정 모달 */}
      {editIdx !== null && (
        <DiaryEditModal
          diary={editData}
          onChange={onChange}
          onSave={saveEdit}
          onDelete={()=>{ deleteDiaryEntry(editIdx); closeEdit(); }}
          onClose={closeEdit}
          date={diaryList[editIdx].date}
        />
      )}
      {/* 저장 완료 알림 */}
      {showAlert && (
        <div className="diary-alert">
          일기 작성완료!
        </div>
      )}
    </div>
  );
}
