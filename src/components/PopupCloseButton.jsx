import React from "react";

function PopupCloseButton({ onClose }) {
  return (
    <button
      style={{
        position: "absolute",
        top: 14,
        right: 18,
        background: "none",
        border: "none",
        fontSize: "1.6rem",
        color: "#ccc",
        cursor: "pointer",
        padding: 0,
        lineHeight: 1,
        userSelect: "none",
      }}
      aria-label="닫기"
      onClick={onClose}
      type="button"
    >
      ×
    </button>
  );
}

export default PopupCloseButton;
