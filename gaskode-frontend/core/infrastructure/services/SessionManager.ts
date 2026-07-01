import Cookies from 'js-cookie';

const TOKEN_KEY = 'gaskode_token';
const USER_KEY = 'gaskode_user';

export const SessionManager = {
  setSession(token: string, user: any, expires_in: number) {
    // expires_in dari Laravel dalam detik, js-cookie menggunakan hari
    const days = expires_in / 86400;
    Cookies.set(TOKEN_KEY, token, { expires: days, secure: true, sameSite: 'strict' });
    Cookies.set(USER_KEY, JSON.stringify(user), { expires: days });
  },

  getToken() {
    return Cookies.get(TOKEN_KEY);
  },

  getUser() {
    const user = Cookies.get(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  clearSession() {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
  }
};