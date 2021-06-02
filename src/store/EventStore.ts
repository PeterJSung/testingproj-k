export interface EventType {
  fn: (data: Object) => Promise<void>;
  data: Object;
  eventUpdate?: boolean;
}

const eventQueue: EventType[] = [];

export { eventQueue };
