import React, { useState } from 'react';
import LoginModal from './LoginModal';
import DiaryPopup from './components/DiaryPopup';
import HeaderInfo from './components/HeaderInfo';
import MainButtonGroup from './components/MainButtonGroup';
import MonggleImageArea from './components/MonggleImageArea';
import DailyStatusButtons from './components/DailyStatusButtons';
import GainCalendarModal from './components/GainCalendarModal';

function MainPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [showDiaryPopup, setShowDiaryPopup] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleIconClick = (name) => {
    if (name === "일기") {
      setShowDiaryPopup(true);
    }
    else if (name === "득근캘린더") {
      setCalendarOpen(true);
    }
    else {
      alert(`"${name}" 기능은 추후 연결됩니다!`);
    }
  };

  const handlePartClick = (part) => {
    alert(`"${part}" 부위를 선택하셨습니다.`);
  };

  function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${year}년 ${month}월 ${date}일`;
  }
  const todayString = getTodayString();

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "28px 10px 10px 10px",
        textAlign: "center",
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#FFF9F3",
        fontFamily: "'BMJUA', sans-serif"
      }}
    >
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <HeaderInfo todayString={todayString} />

      <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0 22px" }}>
        <MainButtonGroup handleIconClick={handleIconClick} />
        <MonggleImageArea handlePartClick={handlePartClick} />
      </div>

      <DailyStatusButtons handleIconClick={handleIconClick} />

      {showDiaryPopup && <DiaryPopup onClose={() => setShowDiaryPopup(false)} />}

      {/* GainCalendarModal 모달 연동 */}
      <GainCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </div>
  );
}

export default MainPage;
