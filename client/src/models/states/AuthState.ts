export interface AuthState {
    username?: string;
    firstName?: string;
    lastName?: string;
    jwt?: string;
    email?: string;
    role?: "USER" | "TEACHER" | "ADMIN" | "";
    isLoading?: boolean;
    errors?: any;
  }
  