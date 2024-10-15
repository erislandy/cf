export class APIError extends Error {
  readonly data?: any;

  constructor(message?: string, data?: any) {
    super(message);
    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
