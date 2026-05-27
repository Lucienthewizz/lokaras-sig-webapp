// Utils untuk mengkonversi value ke boolean
export const toBoolean = (value) => {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return value;
};
