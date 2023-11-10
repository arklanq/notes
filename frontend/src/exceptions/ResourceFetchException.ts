import {Exception} from 'enhanced-exception';

export class ResourceFetchException extends Exception {
  public readonly response: Response;

  constructor(response: Response) {
    super(`${response.status.toString()} ${response.statusText}`);
    this.response = response;
  }
}
