import React, { useState, useMemo } from "react";
const videos = [
  {
    id: "50WCSpZtdmA",
    title: "스트레칭",
    url: "https://youtu.be/50WCSpZtdmA?si=JPu0XNKlFfGXJKZA",
  },
  {
    id: "BnNSjsXARjc",
    title: "레그익스텐션",
    url: "https://youtu.be/BnNSjsXARjc?si=HihzDy6gILa5HhDh",
  },
  {
    id: "et370jWSmgk",
    title: "레그컬",
    url: "https://youtu.be/et370jWSmgk?si=3zm9Btu6WS9N4mWx",
  },
];
function getYTThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
export default function StretchingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(videos[0].id);
  // :흰색_확인_표시: [추가] 오른쪽 데코 이미지 위치 state
  const [rightPos, setRightPos] = useState(0);
  const filteredVideos = useMemo(() => {
    if (!search.trim()) return videos;
    return videos.filter((v) => v.title.includes(search.trim()));
  }, [search]);
  React.useEffect(() => {
    if (selectedId && !filteredVideos.some((v) => v.id === selectedId)) {
      setSelectedId(filteredVideos.length > 0 ? filteredVideos[0].id : null);
    }
  }, [filteredVideos, selectedId]);
  // :흰색_확인_표시: [추가] 모달의 화면상 오른쪽 기준으로 이미지 위치 계산하는 effect
  React.useEffect(() => {
    function updatePosition() {
      const wndWidth = window.innerWidth;
      const modalMaxWidth = 960;
      const modalWidthVW = 94;
      const modalWidth = Math.min(modalMaxWidth, (wndWidth * modalWidthVW) / 100);
      const leftOfModal = (wndWidth - modalWidth) / 2;
      // 오른쪽에 400px 이미지가 모달에 50px 겹치도록
      setRightPos(leftOfModal + modalWidth - 50);
    }
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  React.useEffect(() => {
  if (!open) return;

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      onClose();
    }
  }
  window.addEventListener("keydown", onKeyDown);
  return () => {
    window.removeEventListener("keydown", onKeyDown);
  };
}, [open, onClose]);
  if (!open) return null;

  
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        padding: 12,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
        {/* :흰색_확인_표시: [추가] 오른쪽 데코 이미지 (모달 카드와 같은 레벨) */}
      <img
        src="/images/mongleright.png"
        alt="스트레칭 모달 데코"
        style={{
          position: "absolute",
          left: rightPos,           // ← 방금 만든 상태값 사용
          top: "50%",
          transform: "translateY(-50%)",
          width: "400px",
          height: "auto",
          pointerEvents: "none",
          zIndex: 2002,
        }}
      />
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 22,
          width: "100%",
          maxWidth: 960,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "row",
          boxShadow: "0 10px 24px rgba(0,0,0,.1)",
          overflow: "hidden",
        }}
      >
        {/* Left side: Video Player */}
        <div
          style={{
            flex: "1 1 50%",
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          {selectedId ? (
            <iframe
              key={selectedId}
              style={{ width: "100%", height: "100%", border: "none" }}
              src={`https://www.youtube.com/embed/${selectedId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="스트레칭 영상"
            />
          ) : (
            <div
              style={{
                color: "#fff",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
        {/* Right side: Controls */}
        <div
          style={{
            flex: "1 1 50%",
            padding: 16,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header with search and Close btn */}
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 16,
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="운동 이름을 입력해주세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "8px 40px 8px 12px",  // 오른쪽에 공간 확보
                borderRadius: 12,
                border: "2px solid #7E7058",
                fontSize: 16,
                fontFamily: "'BMJUA', sans-serif",
              }}
            />
            <button
              onClick={onClose}
              aria-label="모달 닫기"
              style={{
                backgroundColor: "#FFAE00",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "'BMJUA', sans-serif",
              }}
            >
              X
            </button>
          </div>
          {/* Thumbnails list */}
          <div
            style={{
              overflowY: "auto",
              flexGrow: 1,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
            }}
          >
            {filteredVideos.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#7E7058",
                  fontFamily: "'BMJUA', sans-serif",
                }}
              >
                검색 결과 없음
              </div>
            )}
            {filteredVideos.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                style={{
                  cursor: "pointer",
                  border:
                    v.id === selectedId
                      ? "3px solid #FFAE00"
                      : "3px solid transparent",
                  borderRadius: 14,
                  overflow: "hidden",
                  padding: 0,
                  background: "none",
                  boxShadow: v.id === selectedId ? "0 0 10px #FFAE00" : "none",
                }}
                aria-label={`재생할 영상 선택: ${v.title}`}
              >
                <img
                  src={getYTThumbnail(v.id)}
                  alt={v.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}