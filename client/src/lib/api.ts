// client/src/lib/api.ts

const BASE = import.meta.env.VITE_API_URL;

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
      // JSON 파싱 실패 대비
      throw new Error(e?.message || `HTTP ${res.status}`);
    }
  }

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}

export const api = {
  // 여러 백엔드 스키마를 커버하도록 키를 넉넉히 보냅니다.
  register: (body: { name: string; email: string; password: string; confirm?: string }) => {
    const payload = {
      email: body.email,
      password: body.password,
      // 비번 확인을 요구하는 서버 대비
      passwordConfirm: body.confirm ?? body.password,
      // 닉네임/유저명 관련 여러 별칭
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
    req<{ ok: boolean }>("/auth/forgot", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  reset: (body: { token: string; password: string }) =>
    req<{ ok: boolean }>("/auth/reset", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  me: () => req<any>("/auth/me", { method: "GET" }),
};

// Daily
export const dailyApi = {
  get: (dateKey: string) => req(`/daily/${dateKey}`, { method: "GET" }),
  save: (dateKey: string, body: any) =>
    req(`/daily/${dateKey}`, { method: "PUT", body: JSON.stringify(body) }),
};

// Weights
export const weightApi = {
  list: (from?: string, to?: string) => {
    const p = new URLSearchParams();
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    const qs = p.toString() ? `?${p.toString()}` : "";
    return req(`/weights${qs}`, { method: "GET" });
  },
  save: (dateKey: string, body: any) =>
    req(`/weights/${dateKey}`, { method: "PUT", body: JSON.stringify(body) }),
};

// Diet Memo
export const dietMemoApi = {
  get: (weekStart: string) => req(`/diet-memo/${weekStart}`, { method: "GET" }),
  save: (weekStart: string, body: any) =>
    req(`/diet-memo/${weekStart}`, { method: "PUT", body: JSON.stringify(body) }),
};
