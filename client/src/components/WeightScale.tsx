import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "./WeightScale.module.css";

type WeightScaleProps = {
  open: boolean;
  onClose: () => void;
  onDiffChange?: (diff: number | null) => void;
};

export default function WeightScale({ open, onClose, onDiffChange }: WeightScaleProps) {
  const [current, setCurrent] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);
  const [topPos, setTopPos] = useState<number>(-90);

  useEffect(() => {
    function updateTopPosition() {
      if (!modalRef.current) return;
      const modalHeight = modalRef.current.offsetHeight;
      const imageHeight = 180; // 몽글이 이미지 높이(px 기준)
      // 모달 중앙 기준 위로 이미지 높이 절반만큼 올림
      const calculatedTop = -modalHeight / 2 - imageHeight / 2;
      setTopPos(calculatedTop);
    }
    updateTopPosition();
    window.addEventListener("resize", updateTopPosition);
    return () => window.removeEventListener("resize", updateTopPosition);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const c = localStorage.getItem("scale.current");
    const g = localStorage.getItem("scale.goal");
    if (c) setCurrent(c);
    if (g) setGoal(g);
  }, [open]);

  useEffect(() => {
    if (current !== "") localStorage.setItem("scale.current", current);
    else localStorage.removeItem("scale.current");

    if (goal !== "") localStorage.setItem("scale.goal", goal);
    else localStorage.removeItem("scale.goal");
  }, [current, goal]);

  useEffect(() => {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const val = e.target.value;
    if (val === "") {
      setter("");
      return;
    }
    if (/^\d*\.?\d*$/.test(val)) {
      const integerPart = val.split(".")[0];
      if (integerPart.length > 3) return;
      setter(val);
    }
  };

  const diff = useMemo(() => {
    const numCurrent = parseFloat(current);
    const numGoal = parseFloat(goal);
    if (isNaN(numCurrent) || isNaN(numGoal)) return null;
    const d = numCurrent - numGoal;
    return Math.round(d * 10) / 10;
  }, [current, goal]);

  useEffect(() => {
    if (onDiffChange) onDiffChange(diff);
  }, [diff, onDiffChange]);

  const displayText = useMemo(() => {
    if (diff === null) return "0.0";
    const abs = Math.abs(diff).toFixed(1);
    if (diff > 0) return `-${abs}`;
    if (diff < 0) return `+${abs}`;
    return "0.0";
  }, [diff]);

  const helper = useMemo(() => {
    if (diff === null) return "현재/목표를 입력하세요";
    if (diff > 0) return `${diff.toFixed(1)}kg 감량 필요`;
    if (diff < 0) return `${Math.abs(diff).toFixed(1)}kg 증량 필요`;
    return "목표 달성!";
  }, [diff]);

  if (!open) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.backdrop} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          style={{ position: "relative" }}
          ref={modalRef}
        >
          {/* 몽글이 상단 이미지 - 가로 중앙, 동적 top 위치 */}
          <img
            src="../../public/images/mongletop.png"
            alt="몽글이 상단 데코"
            style={{
              position: "absolute",
              top: topPos,
              left: "50%",
              transform: "translateX(-50%)",
              width: 450,
              height: "auto",
              pointerEvents: "none",
              zIndex: 1000,
              userSelect: "none",
            }}
            draggable={false}
          />

          <h3 className={styles.title}>체중 목표 입력</h3>
          <label className={styles.row}>
            <span>현재 체중(kg)</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="예: 63.5"
              value={current}
              onChange={(e) => handleInputChange(e, setCurrent)}
            />
          </label>
          <label className={styles.row}>
            <span>목표 체중(kg)</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="예: 58"
              value={goal}
              onChange={(e) => handleInputChange(e, setGoal)}
            />
          </label>
          <div className={styles.resultBox}>
            <div className={styles.resultPrimary}>
              {diff === null ? "—" : displayText} kg
            </div>
            <div className={styles.resultSub}>{helper}</div>
          </div>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={onClose}>
              저장
            </button>
            <button
              className={styles.ghost}
              onClick={() => {
                setCurrent("");
                setGoal("");
                localStorage.removeItem("scale.current");
                localStorage.removeItem("scale.goal");
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
