// client/src/store/auth.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

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

    // user 응답이 없을 수도 있으니 JWT에서 기본 정보 추출
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
      // ignore
    }

    if (u) localStorage.setItem("user", JSON.stringify(u));
    set({ token, user: u || null });
  },

  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },

  hydrateFromStorage: () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    set({
      token,
      user: userRaw ? JSON.parse(userRaw) : null,
    });
  },
}));
