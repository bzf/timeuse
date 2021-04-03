export default BaseAuthenticator;

declare class BaseAuthenticator {
  authenticate(email: string, password: string): Promise<void>;

  invalidate(data: any, args: Array<any>): Promise<void>;

  restore(data: any): Promise<any>;
}
