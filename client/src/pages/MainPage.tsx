import React, { useState, useEffect } from 'react';
import HeaderInfo from '../components/HeaderInfo';
import LeftButtonGroup from '../components/LeftButtonGroup';
import RightButtonGroup from '../components/RightButtonGroup';
import MonggleImageArea from '../components/MonggleImageArea';
import DailyStatusButtons from '../components/DailyStatusButtons';
import GainCalendarModal from '../components/GainCalendarModal';
import WeeklyDietMemoModal from '../components/WeeklyDietMemoModal';
import { useAuth } from '../store/auth';
import type { BodyPart } from '../components/MonggleImageArea';

export default function MainPage() {
  // 로그인 상태
  const { user, clear } = useAuth();

  // 로그인 안 된 경우 접근 차단 or 로그인 페이지 표시 예시
  if (!user) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>로그인이 필요합니다.</h2>
        {/* 로그인 페이지 링크 또는 컴포넌트 배치 */}
      </div>
    );
  }

  // 모달 상태 관리 (네 코드 기준)
  const [showDiaryPopup, setShowDiaryPopup] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleIconClick = (name: string): void => {
    if (name === '일기') {
      setShowDiaryPopup(true);
      setCalendarOpen(false);
    } else if (name === '득근캘린더') {
      setCalendarOpen(true);
      setShowDiaryPopup(false);
    } else if (name === '몽글이 뱃지') {
    // 아무 동작도 하지 않음
    // LeftButtonGroup 내부에서 모달 열기 처리됨
    } else {
      alert(`"${name}" 기능은 추후 연결됩니다!`);
    }
  };

  useEffect(() => {
    if (showDiaryPopup || calendarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDiaryPopup, calendarOpen]);

  const handlePartClick = (part: BodyPart): void => {
    alert(`"${part}" 부위를 선택하셨습니다.`);
  };

  // 날짜 문자열
  function getTodayString(): string {
    const today = new Date();
    return `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  }
  const todayString = getTodayString();

  return (
    <div
      style={{
        maxWidth: '1500px',
        margin: '0 auto',
        padding: '28px 10px 10px 10px',
        textAlign: 'center',
        position: 'relative',
        minHeight: '90vh',
        fontFamily: "'BMJUA', sans-serif",
      }}
    >
      {/* HeaderInfo 추가 - 로그아웃 이벤트 핸들러 clear 전달 */}
      <HeaderInfo todayString={todayString} onLogout={clear} />

      {/* 네가 만든 메인 UI 레이아웃 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0px 0 22px',
          alignItems: 'center',
          flexWrap: 'nowrap',
        }}
      >
        <LeftButtonGroup onClick={handleIconClick} buttonSize="12vw" minSize={48} maxSize={80} />
        <MonggleImageArea handlePartClick={handlePartClick} />
        <RightButtonGroup onClick={handleIconClick} buttonSize="12vw" minSize={48} maxSize={80} />
      </div>

      <DailyStatusButtons handleIconClick={handleIconClick} />

      {/* 모달은 네 코드 기준으로 유지 */}
      <WeeklyDietMemoModal isOpen={showDiaryPopup} onClose={() => setShowDiaryPopup(false)} />
      <GainCalendarModal isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
    </div>
  );
}
