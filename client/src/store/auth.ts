// client/src/store/auth.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

// ✅ 추가: MongoDB ObjectId → ISO 날짜 복원 헬퍼
const oidToISO = (id?: string) => {
  if (!id || id.length < 8) return null;
  const ts = parseInt(id.slice(0, 8), 16); // ObjectId 앞 8자 = seconds since epoch
  return Number.isNaN(ts) ? null : new Date(ts * 1000).toISOString();
};

type User = {
  _id?: string;
  id?: string;
  email: string;
  name?: string;
  createdAt?: string;
};

type JWTPayload = {
  sub?: string;
  email?: string;
  name?: string;
  createdAt?: string;
  iat?: number;
  exp?: number;
  [k: string]: any;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user?: User | null) => void;
  clear: () => void;
  hydrateFromStorage: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  setAuth: (token, user) => {
    localStorage.setItem("token", token);

    // 기존 로직 유지
    let u = user || null;
    try {
      const payload = jwtDecode<JWTPayload>(token);
      u = u || {
        id: payload.sub,
        email: payload.email || "",
        name: payload.name,
        createdAt: payload.createdAt,
      };
    } catch {
      /* ignore */
    }

    if (u) {
      localStorage.setItem("user", JSON.stringify(u));

      // ✅ 추가: signupDate 저장 보강 (createdAt → ObjectId 순서로 시도)
      const candidate =
        u.createdAt ||
        oidToISO(u._id || u.id) ||
        null;

      if (candidate) {
        localStorage.setItem("signupDate", candidate);
      }
    }

    set({ token, user: u || null });
  },

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("signupDate"); // ✅ 추가: 함께 제거
    set({ token: null, user: null });
  },

  hydrateFromStorage: () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    const u = userRaw ? (JSON.parse(userRaw) as User) : null;

    // ✅ 추가: 앱 최초 진입 시 signupDate가 비어 있으면 보강 저장
    if (!localStorage.getItem("signupDate") && u) {
      const candidate =
        u.createdAt ||
        oidToISO(u._id || u.id) ||
        null;
      if (candidate) localStorage.setItem("signupDate", candidate);
    }

    set({
      token,
      user: u,
    });
  },
}));

// (선택) 헬퍼가 필요하면 유지해서 사용 가능
export const getSignupDate = (): string | null => {
  const fromLS = typeof window !== "undefined" ? localStorage.getItem("signupDate") : null;
  if (fromLS) return fromLS;
  const u = useAuth.getState().user;
  return u?.createdAt ?? null;
};
