declare namespace Express {
  interface Request {
    user: User;
  }

  interface User {
    sub: number;
    username: string;
    roles?: string[];
  }
}
