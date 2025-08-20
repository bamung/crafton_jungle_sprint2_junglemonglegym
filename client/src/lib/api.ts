// client/src/lib/api.ts

// BASE가 비어 있으면 /api 로 기본 설정 (Vite 프록시/배포 대응)
const BASE = import.meta.env.VITE_API_URL ?? "/api";

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const ct = res.headers.get("content-type") || "";
    try {
      if (ct.includes("application/json")) {
        const j = await res.json();
        const msg = j?.message || j?.error || JSON.stringify(j);
        throw new Error(msg || `HTTP ${res.status}`);
      } else {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
    } catch (e: any) {
      throw new Error(e?.message || `HTTP ${res.status}`);
    }
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

/** ---------- 공용 유틸 ---------- */
const toQuery = (obj: Record<string, any>) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    p.set(k, String(v));
  });
  const qs = p.toString();
  return qs ? `?${qs}` : "";
};

/** ---------- Auth & Me ---------- */
export const api = {
  register: (body: { name: string; email: string; password: string; confirm?: string }) => {
    const payload = {
      email: body.email,
      password: body.password,
      passwordConfirm: body.confirm ?? body.password,
      name: body.name,
      nickname: body.name,
      username: body.name,
      displayName: body.name,
    };
    return req<{ token?: string; user?: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login: (body: { email: string; password: string }) =>
    req<{ token: string; user?: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  forgot: (body: { email: string }) =>
    req<{ ok: boolean }>("/auth/forgot", { method: "POST", body: JSON.stringify(body) }),

  reset: (body: { token: string; password: string }) =>
    req<{ ok: boolean }>("/auth/reset", { method: "POST", body: JSON.stringify(body) }),

  me: () => req<any>("/auth/me", { method: "GET" }),

  /** ---------- Daily helpers (GainCalendar에서 사용) ---------- */
  toYMD: (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  },

  getDaily: (dateKey: string) => req(`/daily/${dateKey}`, { method: "GET" }),
  setDidWorkout: (dateKey: string, didWorkout: boolean) =>
    req(`/daily/${dateKey}`, { method: "PUT", body: JSON.stringify({ didWorkout }) }),
};

/** ---------- Raw Daily API (기존 유지) ---------- */
export const dailyApi = {
  get: (dateKey: string) => req(`/daily/${dateKey}`, { method: "GET" }),
  save: (dateKey: string, body: any) =>
    req(`/daily/${dateKey}`, { method: "PUT", body: JSON.stringify(body) }),
};

/** ---------- Weights ---------- */
export const weightApi = {
  list: (from?: string, to?: string) => {
    const qs = toQuery({ from, to });
    return req(`/weights${qs}`, { method: "GET" });
  },
  save: (dateKey: string, body: any) =>
    req(`/weights/${dateKey}`, { method: "PUT", body: JSON.stringify(body) }),
};

/** ---------- Diet Memo ---------- */
export const dietMemoApi = {
  get: (weekStart: string) => req(`/diet-memo/${weekStart}`, { method: "GET" }),
  save: (weekStart: string, body: any) =>
    req(`/diet-memo/${weekStart}`, { method: "PUT", body: JSON.stringify(body) }),
};

/** ---------- Diary (일기) ---------- */
export const diaryApi = {
  get: (dateKey: string) => req(`/diary/${dateKey}`, { method: "GET" }),
  save: (dateKey: string, body: { title?: string; content: string }) =>
    req(`/diary/${dateKey}`, { method: "PUT", body: JSON.stringify(body) }),
  list: (from?: string, to?: string) => {
    const qs = toQuery({ from, to });
    return req(`/diary${qs}`, { method: "GET" });
  },
};

/** ---------- Workouts (카탈로그) ---------- */
export type Difficulty = "easy" | "mid" | "hard";
export type Group = "back" | "shoulder" | "chest" | "arm" | "legs" | "cardio";

export type Workout = {
  id: string;
  title: string;
  group: Group;
  difficulty: Difficulty;
  cues?: string[];
  image?: string;
};

export const workoutApi = {
  list: (params?: { group?: Group; difficulty?: Difficulty; q?: string }) => {
    const qs = toQuery(params || {});
    return req<Workout[]>(`/workouts${qs}`, { method: "GET" });
  },
};

// 과거 호환
export const getWorkouts = (params?: { group?: Group; difficulty?: Difficulty; q?: string }) =>
  workoutApi.list(params);

/** ---------- Favorites (즐겨찾기) ---------- */
export const favApi = {
  list: () => req<string[]>("/user/favorites", { method: "GET" }),
  setAll: (ids: string[]) =>
    req<string[]>("/user/favorites", { method: "PUT", body: JSON.stringify({ ids }) }),
  add: (id: string) => req<string[]>(`/user/favorites/${encodeURIComponent(id)}`, { method: "POST" }),
  remove: (id: string) =>
    req<string[]>(`/user/favorites/${encodeURIComponent(id)}`, { method: "DELETE" }),
  toggle: (id: string) =>
    req<string[]>(`/user/favorites/${encodeURIComponent(id)}/toggle`, { method: "PATCH" }),
};

/** ---------- Workout Logs (운동 기록 저장/조회) ---------- */
export type LogSet = { weight: number; reps: number; done: boolean };
export type LogEntry = {
  exerciseId: string; // 서버와 동일 key 사용
  title: string;
  group: Group;
  sets: LogSet[];
  note?: string;
};
export type WorkoutLogDoc = {
  userId?: string;
  date: string; // YYYY-MM-DD
  entries: LogEntry[];
  durationSec: number; // 하루 누적 경과초
  durationByGroup?: Record<string, number>; // 선택: 부위별 누적
  startedAt?: string | null;
  finishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type CalendarDaySummary = {
  date: string;
  count: number;
  sec: number;
  // 선택: 자세한 운동명/개수 (detail=1일 때만)
  labels?: string[];
  more?: number;
  // 선택: 해당 날짜에 수행한 부위 코드 배열 (groups=1일 때만)
  groups?: Group[];
};

export const workoutLogsApi = {
  /** 특정 날짜 기록 조회 — group을 넘기면 해당 부위만 서버가 필터/머지 */
  get: (dateKey: string, group?: Group) => {
    const qs = toQuery({ date: dateKey, group });
    return req<WorkoutLogDoc | null>(`/workout-logs${qs}`, { method: "GET" });
  },

  /** 특정 날짜 기록 업서트 저장 — group을 넘기면 해당 부위 파트만 병합 저장 */
  save: (dateKey: string, body: Partial<WorkoutLogDoc>, group?: Group) => {
    const qs = toQuery({ group });
    return req<WorkoutLogDoc>(`/workout-logs/${encodeURIComponent(dateKey)}${qs}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  /**
   * 월 요약(캘린더 뱃지)
   * - 기본: [{ date, count, sec }]
   * - opts.detail: 운동명 라벨/추가개수 포함
   * - opts.groups: 수행 부위 코드 배열 포함 (예: ["chest","back"])
   */
  monthly: (monthYYYYMM: string, opts?: { detail?: boolean; groups?: boolean }) => {
    const params: Record<string, any> = { month: monthYYYYMM };
    if (opts?.detail) params.detail = 1;
    if (opts?.groups) params.groups = 1;
    const qs = toQuery(params);
    return req<CalendarDaySummary[]>(`/workout-logs/calendar${qs}`, { method: "GET" });
  },
};

// 별칭(호환)
export const workoutLogApi = workoutLogsApi;
export const getWorkoutLog = (dateKey: string, group?: Group) =>
  workoutLogsApi.get(dateKey, group);
export const putWorkoutLog = (dateKey: string, body: Partial<WorkoutLogDoc>, group?: Group) =>
  workoutLogsApi.save(dateKey, body, group);
/** @deprecated 기존 시그니처 호환: detail과 groups를 boolean으로 넘길 수 있음 */
export const getCalendarMonth = (monthYYYYMM: string, detail = false, groups = false) =>
  workoutLogsApi.monthly(monthYYYYMM, { detail, groups });
