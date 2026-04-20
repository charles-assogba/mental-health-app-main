export const msgTemplate = (msg, payload) => {
    const data = Object.assign({ msg: msg }, (payload && { payload: payload }));
    return data;
};
