export type User = {
  email: string;
  password: string;
};

const USER_KEY = "verbora_user";
const AUTH_KEY = "verbora_auth";

export function register(email: string, password: string) {
  const user: User = { email, password };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_KEY, "true");
}

export function login(email: string, password: string): boolean {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return false;

  const user: User = JSON.parse(stored);
  if (user.email === email && user.password === password) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}
