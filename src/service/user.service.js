import { STORAGE_KEYS, EVENT_KEYS, emitter } from "../dealful";

export const changeUser = async () => {
  try {
    const fakeUserData = {
      name: { first: "Seu", last: "Madruga" },
      age: 22,
      email: "some@some",
      picture: {
        large:
          "https://imagens3.ne10.uol.com.br/blogsne10/social1/uploads/2021/05/Ramon-Valdes-como-Seu-Madruga-em-Chaves.jpg",
      },
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(fakeUserData));
    console.log("%c set user called - store", "color: red;");
    return await emitter.emit(EVENT_KEYS.CHANGE_USER, () => {
      return fakeUserData;
    });
  } catch (error) {
    console.error("user set erro request", error);
  }
};

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
