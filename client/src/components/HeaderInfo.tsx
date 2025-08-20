import React from 'react';
import { useAuth } from '../store/auth';     // ✅ 스토어 구독
import { daysSince } from '../utils/daysSince';

type HeaderInfoProps = {
  todayString: string;
  onLogout: () => void;  // 로그아웃 함수 전달용 prop 추가
};

function HeaderInfo({ todayString, onLogout }: HeaderInfoProps) {
  const user = useAuth((s) => s.user);      // ✅ user 변화에 반응 (리렌더 유도)
  const signupDate =
    user?.createdAt ||
    (typeof window !== "undefined" ? localStorage.getItem("signupDate") ?? undefined : undefined);

  const dday = signupDate ? daysSince(signupDate) : 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "left", minWidth: "120px" }}>
        <div style={{ fontSize: "2.0rem", fontWeight: "bold", color: "#65CFC7" }}>
          D+{dday}
          </div>
        <div style={{ fontSize: "0.98rem", marginTop: "2px" }}>{todayString}</div>
      </div>

      <div style={{ margin: "0 auto" }}>
        <div className="logo" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "#65CFC7" }}>정글몽글짐</div>
          <span style={{ fontSize: "1.5rem", color: "#FFD680", fontWeight: "bold", marginTop: "6px" }}>
            오늘부터 득근↑
          </span>
        </div>
      </div>

      <div style={{ minWidth: "120px", textAlign: "right" }}>
        <button
          onClick={onLogout}
          style={{
            padding: "6px 0px",
            borderRadius: 8, 
            background: "transparent",      // 투명 배경
            cursor: "pointer",
            fontWeight: "bold",
            color: "#3ca1b0ff",               // 크림톤 폰트 색깔 (노란 계열)
            boxShadow: "none",
            fontSize: 20
          }}
          type="button"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default HeaderInfo;
