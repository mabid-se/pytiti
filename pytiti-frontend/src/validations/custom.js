const regex2digits = /^(-)?\d+\.?\d{0,2}$/;

export const numeric2digits = (value) => {
  if (typeof value === "undefined" || value === null || value === "") {
    return true;
  }
  return regex2digits.test(value);
};
