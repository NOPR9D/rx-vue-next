import { Observable } from "rxjs";

/**
 * @see {@link https://vuejs.org/v2/api/#vm-on}
 * @param {String||Array} evtName Event name
 * @return {Observable} Event stream
 */
export function eventToObservable(evtName) {
  const vm = this;
  const evtNames = Array.isArray(evtName) ? evtName : [evtName];
  const obs$ = new Observable((observer) => {
    const eventPairs = evtNames.map((name) => {
      const callback = (msg) => observer.next({ name, msg });
      vm.$on(name, callback);
      return { name, callback };
    });
    return () => {
      // Only remove the specific callback
      eventPairs.forEach((pair) => vm.$off(pair.name, pair.callback));
    };
  });

  return obs$;
}
