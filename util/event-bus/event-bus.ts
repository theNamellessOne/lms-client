const subscribers = new Map<string, ((payload: any) => void)[]>();

export const subscribe = (
  eventName: string,
  callback: (payload: any) => void,
) => {
  let callbacks = subscribers.get(eventName);

  if (!callbacks) {
    callbacks = [];
  }

  callbacks.push(callback);
  subscribers.set(eventName, callbacks);
};

export const unsubscribe = (
  eventName: string,
  callback: (payload: any) => void,
) => {
  const idx = subscribers.get(eventName)?.indexOf(callback);
  if (idx) subscribers.get(eventName)?.splice(idx >>> 0, 1);
};

export const publish = (event: { name: string; payload: any }) => {
  console.log(subscribers);
  let callbacks = subscribers.get(event.name);

  if (!callbacks) {
    callbacks = [];
  }

  callbacks.forEach((item) => {
    item(event.payload);
  });
};
