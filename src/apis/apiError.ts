export default class ApiError<T = unknown> extends Error {
  errorCode: string;
  reason: string;
  data: T | null;

  constructor(errorCode: string, reason: string, data: T | null = null) {
    super(reason);
    this.name = 'ApiError';
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
  }
}
