const generateStringFromQueryParams = (params, exclude = ["ordering"]) => {
  return (
    "?" +
    Object.keys(params)
      .map(
        (k) =>
          encodeURIComponent(k) +
          "=" +
          (exclude.includes(k) ? params[k] : encodeURIComponent(params[k]))
      )
      .join("&")
  );
};

export const generateUrl = (url, params) => {
  return `${url}${params ? generateStringFromQueryParams(params) : ""}`;
};
