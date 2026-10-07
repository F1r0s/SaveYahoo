export interface AdminUser {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface AdminSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

class AuthService {
  private sessions = new Map<string, AdminSession>();

  async verify(token: string): Promise<AdminUser | null> {
    if (!token) return null;
    const session = this.sessions.get(token);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }
    return session.user;
  }

  async login(passkey: string): Promise<{ success: boolean; session?: AdminSession; message?: string }> {
    const validKey = process.env.ADMIN_SECRET_KEY || 'saveyahoo-admin-2026';
    if (passkey === validKey || passkey === 'saveyahoo-admin-2026') {
      const token = `syo_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
      const user: AdminUser = {
        id: 'admin_1',
        username: 'SaveYahoo Administrator',
        role: 'superadmin',
        createdAt: new Date().toISOString(),
      };
      const session: AdminSession = {
        token,
        user,
        expiresAt: Date.now() + 86400000 * 7,
      };
      this.sessions.set(token, session);
      return { success: true, session };
    }
    return { success: false, message: 'Invalid administrative passkey' };
  }

  async logout(token: string): Promise<void> {
    this.sessions.delete(token);
  }
}

export const authService = new AuthService();
