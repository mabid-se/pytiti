const host = process.env.VUE_APP_PROD_URL;

export const getSelectList = async (target_api) => {
  let url = `${host}${target_api}`;
  let response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const getLocalSelectList = async (table_name) => {
  return await JSON.parse(localStorage.getItem(`${table_name}`));
};
