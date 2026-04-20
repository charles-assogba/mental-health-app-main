export const msgTemplate = (msg: string, payload?: object) => {
  const data = {
    msg: msg,
    ...(payload && { payload: payload }),
  };

  return data;
};
