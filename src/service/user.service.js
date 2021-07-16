export const fetchUser = () => {
  return new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((user) => {
        resolve(user);
      })
      .catch(reject);
  });
};
