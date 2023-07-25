export const jsonToFormData = (jsonBody) => {
  let bodyData = new FormData();
  for (let key in jsonBody) {
    if (!Array.isArray(jsonBody[key])) {
      bodyData.append(key, jsonBody[key]);
    } else {
        console.log(jsonBody[key]);
      jsonBody[key].forEach((value) => {
        bodyData.append(key, value);
      });
    }
  }
  return bodyData;
};
