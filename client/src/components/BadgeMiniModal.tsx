// client/src/components/collection/BadgeMiniModal.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './BadgeMiniModal.module.css';
import { useAuth, getExerciseStartDate } from '../store/auth';
import { daysSince, toYmd } from '../utils/daysSince';

// ===== Types =====
type Badge = { need: number; img: string };
type Mini  = { id: string; name: string; img: string };

// ===== Constants (파일명 그대로, public 경로 사용) =====
const BADGES: Badge[] = [
  { need: 7,   img: '/images/mongle7day-remove.png' },
  { need: 30,  img: '/images/mongle30day-remove.png' },
  { need: 100, img: '/images/mongle100day-remove.png' },
  { need: 200, img: '/images/mongle200day-remove.png' },
  { need: 300, img: '/images/mongle300day-remove.png' },
  { need: 365, img: '/images/mongle1year-remove.png' },
  { need: 730, img: '/images/mongle2year-remove.png' },
];

const MINIS: Mini[] = [
  { id:'Babel',  name:'바벨',        img:'/images/바벨.png' },
  { id:'Chest_fly', name:'체스트플라이', img:'/images/체스트플라이.png' },
  { id:'running_machine', name:'런닝머신', img:'/images/런닝머신.png' },
  { id:'Hairband', name:'헤어밴드', img:'/images/헤어밴드.png' },
  { id:'Shoulder_Press', name:'숄더프레스', img:'/images/숄더프레스.png' },
  { id:'Bench_press', name:'벤치프레스', img:'/images/벤치프레스.png' },
  { id:'cable_machine', name:'케이블머신', img:'/images/케이블머신.png'},
  { id:'sportswear', name:'운동복상의', img:'/images/운동복상의.png' },
  { id:'sportswearunder', name:'운동복하의', img:'/images/운동복하의.png' },
  { id:'leg_extension', name:'레그익스텐션', img:'/images/레그익스텐션.png' },
  { id:'incline_bench', name:'인클라인 벤치', img:'/images/인클라인 벤치.png' },
  { id:'Kettle_Bell', name:'케틀벨', img:'/images/케틀벨.png' },
  { id:'foam_roller', name:'폼롤러', img:'/images/폼롤러.png' },
  { id:'bike', name:'자전거', img:'/images/자전거.png' },
  { id:'Tumbler', name:'텀블러', img:'/images/텀블러.png' },
  { id:'Sneakers', name:'운동화', img:'/images/운동화.png' },
  { id:'Twisted', name:'트위스트머신', img:'/images/트위스트머신.png' },
  { id:'steps', name:'천국의 계단', img:'/images/천국의계단.png'},
  { id:'Sandbags', name:'샌드백', img:'/images/샌드백.png' },
  { id:'power', name:'스미스머신', img:'/images/스미스머신.png' },
  { id:'inbody', name:'인바디기계', img:'/images/인바디기계.png' },
  { id:'wide', name:'와이드풀다운', img:'/images/와이드풀다운.png' },
  { id:'plate1', name:'원판2.5kg', img:'/images/원판2.5kg.png' },
  { id:'plate2', name:'원판5kg', img:'/images/원판5kg.png' },
  { id:'plate3', name:'원판10kg', img:'/images/원판10kg.png' },
  { id:'plate4', name:'원판15kg', img:'/images/원판15kg.png' },
  { id:'plate5', name:'원판20kg', img:'/images/원판20kg.png' },
];

// ===== LocalStorage Keys =====
const KEY_MINIS = 'jm_minis';

// ===== Accessible Toast =====
function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 1600);
    return () => clearTimeout(t);
  }, [msg]);
  return { msg, show: (m: string) => setMsg(m) };
}

// ===== Main Modal Component =====
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BadgeMiniModal({ open, onClose }: Props) {
  const dlgRef = useRef<HTMLDivElement>(null);
  const { msg, show } = useToast();
  const { user } = useAuth();

  // 운동 시작일 = 가입일(스토어/LS)
  const startISO = useMemo(() => {
    return user?.exerciseStartDate || user?.createdAt || getExerciseStartDate() || null;
  }, [user]);

  const startDate = startISO ? toYmd(startISO) : toYmd(new Date());

  // minis
  const [owned, setOwned] = useState<Set<string>>(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(KEY_MINIS) || '[]') as string[];
      return new Set(arr);
    } catch {
      return new Set();
    }
  });

  // focus trap + ESC close
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    dlgRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusables = dlgRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  // D+ (메인과 동일 유틸)
  const dplus = useMemo(() => (startISO ? daysSince(startISO) : 0), [startISO]);

  // handlers (미니어처)
  const allOwned = owned.size === MINIS.length;
  const openCrate = () => {
    if (allOwned) { show('이미 전부 모았어요!'); return; }
    const pool = MINIS.filter(m => !owned.has(m.id));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const next = new Set(owned);
    next.add(pick.id);
    setOwned(next);
    localStorage.setItem(KEY_MINIS, JSON.stringify([...next]));
    show(`획득! ${pick.name}`);
  };
  const resetMinis = () => {
    const ok = window.confirm('미니어처 획득 내역을 초기화할까요?');
    if (!ok) return;
    const next = new Set<string>();
    setOwned(next);
    localStorage.setItem(KEY_MINIS, JSON.stringify([]));
    show('초기화했습니다.');
  };

  const renderBadges = () => (
    <div className={styles.badgeGrid} role="list" aria-label="달성 뱃지 목록">
      {BADGES.map((b, i) => {
        const unlocked = dplus >= b.need;
        const remain = Math.max(0, b.need - dplus);
        const pct = Math.min(100, Math.floor((dplus / b.need) * 100));
        return (
          <div
            key={i}
            className={`${styles.badge} ${!unlocked ? styles.locked : ''}`}
            role="listitem"
            aria-label={`목표 ${b.need}일 ${unlocked ? '획득 완료' : `남은 ${remain}일`}`}
          >
            <div className={styles.thumb}>
              <img
                src={encodeURI(b.img)}
                alt="달성 뱃지"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.15';
                  (e.currentTarget as HTMLImageElement).alt = '이미지 경로 확인';
                }}
              />
            </div>
            <div className={styles.hint}>{unlocked ? '획득 완료 :짠:' : `다음까지 ${remain}일`}</div>
            <div
              className={styles.progress}
              aria-label={`진행률 ${pct}%`}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            >
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderMinis = () => (
    <>
      <div className={styles.miniToolbar}>
        <button type="button" onClick={openCrate} disabled={allOwned} aria-disabled={allOwned} aria-label="선물상자 열기">
          :선물: 선물상자 열기
        </button>
        <div className={styles.pill} aria-live="polite">
          보유:&nbsp;<span>{owned.size}</span>&nbsp;/&nbsp;<span>{MINIS.length}</span>
        </div>
        <button type="button" onClick={resetMinis} title="획득 초기화">초기화</button>
      </div>
      <div className={styles.miniGrid} role="list" aria-label="미니어처 보유 현황">
        {MINIS.map(m => {
          const has = owned.has(m.id);
          return (
            <div
              key={m.id}
              className={`${styles.slot} ${!has ? styles.locked : ''}`}
              role="listitem"
              title={has ? m.name : ''}
              aria-label={has ? `${m.name} 보유` : `${m.name} 잠김`}
            >
              {has && (
                <img
                  src={encodeURI(m.img)}
                  alt={m.name}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.15'; }}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={false}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="jm-modal-title"
        ref={dlgRef}
        tabIndex={-1}
      >
        <header className={styles.hero}>
          <h1 id="jm-modal-title" className={styles.h1}>정글몽글짐 뱃지함</h1>
          <div className={styles.meta}>
            <div className={styles.pill}>오늘:&nbsp;<span>{toYmd(new Date())}</span></div>
            <div className={styles.pill}>D+&nbsp;<span>{dplus}</span></div>
          <div className={styles.pill}>
            <label>운동 시작일</label>
            <span>{startDate ? toYmd(new Date(startDate)) : "미정"}</span>
          </div>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="닫기">✕</button>
          </div>
        </header>

        <section className={styles.box} aria-label="달성 뱃지 구역">
          <h2 className={styles.h2}>달성 뱃지</h2>
          {renderBadges()}
        </section>

        <section className={styles.minis} aria-label="미니어처 구역">
          <h2 className={styles.h2}>미니어처</h2>
          {renderMinis()}
        </section>

        {/* Toast (status) */}
        <div className={`${styles.toast} ${msg ? styles.show : ''}`} role="status" aria-live="polite">
          {msg}
        </div>
      </div>
    </div>
  );
}
