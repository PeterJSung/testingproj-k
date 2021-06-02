export abstract class BaseClass {
  public abstract attachEvent: () => Promise<void>;
  public abstract beforeRender: () => Promise<void>;
  public abstract render: () => Promise<string>;
}
