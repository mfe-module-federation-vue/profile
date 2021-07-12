import store from "root/store";

export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    if (store.getters.user) {
      resolve(store.getters.user);
    } else {
      fetch("https://randomuser.me/api/")
        .then((res) => res.json())
        .then((user) => {
          store.dispatch("setUser", user);
          resolve(store.getters.user);
        })
        .catch(reject);
    }
  });
};
