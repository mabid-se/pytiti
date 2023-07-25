export const saveToken = (accessToken) => {
  localStorage.setItem("access_token", accessToken);
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
};

export const getToken = () => {
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    return user.session.access_token;
  } catch (error) {
    let keysToRemove = ["distrital", "user", "provincias", "municipios"];
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    return null;
  }
};

export const getUserStored = () => {
  return JSON.parse(localStorage.getItem("user"));
};
