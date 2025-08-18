// client/src/pages/MainPage.tsx
import React from "react";
import HeaderInfo from "../components/HeaderInfo";
import MonggleImageArea from "../components/MonggleImageArea";
import MainButtonGroup from "../components/MainButtonGroup";
import DailyStatusButtons from "../components/DailyStatusButtons";
// 필요하면 모달도 같은 방식으로(default) 가져오세요.
// import GainCalendarModal from "../components/GainCalendarModal";
// import WeeklyDietMemoModal from "../components/WeeklyDietMemoModal";

import { useAuth } from "../store/auth";
import { dPlusFrom } from "../utils/dayCounter";

export default function MainPage() {
  const { user, clear } = useAuth();
  const dplus = dPlusFrom(user?.createdAt);
  const today = new Date().toLocaleDateString();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* 상단 바 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "center",
          padding: "14px 18px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ fontWeight: 700 }}>{dplus !== null ? `D+${dplus}` : "환영합니다!"}</div>
        <div>{today}</div>
        <button
          onClick={clear}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>

      {/* 기존 메인 콘텐츠 */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        <HeaderInfo />
        <MonggleImageArea />
        <MainButtonGroup />
        <DailyStatusButtons />
        {/* 필요 시 모달 컴포넌트를 배치 */}
        {/* <GainCalendarModal /> */}
        {/* <WeeklyDietMemoModal /> */}
      </div>
    </div>
  );
}
