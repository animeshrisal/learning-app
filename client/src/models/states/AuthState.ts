export interface AuthState {
    username?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email?: string;
    role?: "USER" | "TEACHER" | "ADMIN" | "";
    isLoading?: boolean;
    errors?: any;
  }
  