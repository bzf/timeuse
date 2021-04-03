export default SessionService;

declare interface SessionService {
  authenticate(
    authenticator: string,
    email: string,
    password: string
  ): Promise<void>;

  invalidate(args: Array<any>): Promise<any>;

  data: any;

  isAuthenticated: boolean;
}

declare module '@ember/service' {
  interface Registry {
    session: SessionService;
  }
}
