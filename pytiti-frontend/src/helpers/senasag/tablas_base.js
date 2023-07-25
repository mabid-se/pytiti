export const getList = (apiEntity) => {
  try {
    let results = JSON.parse(localStorage.getItem(apiEntity));
    return results;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getCityProvinces = (cityId) => {
  let results = getList("provincias");
  return results.filter((item) => item.distrital_id === cityId);
};

export const getProvinceTowns = (cityId, provinceId) => {
  let results = getList("municipios");
  return results.filter(
    (item) =>
      cityId.trim() === item.distrital_id.trim() &&
      provinceId.trim() === item.provincia_id.trim()
  );
};

export const getKeyId = (key) => {
  return localStorage.getItem(key);
};

export const storeKeyId = (key, value) => {
  localStorage.setItem(key, value);
};

export const clearKeyId = (key) => {
  localStorage.setItem(key, null);
};
