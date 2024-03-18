export const checkEmail = (value: any) => {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
  };
export const checkCode = (value: any) => {
    return /^\d{8}$/.test(value);
  }