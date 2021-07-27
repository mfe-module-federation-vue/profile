import emitter from "store/emitter";
export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((res) => {
        emitter.sendEvent(emitter.EVENTS.SET_USER, res.results[0]);
        resolve(res);
      })
      .catch(reject);
  });
};
