export const loginValidation = {
    username: "required|string",
    password: "required|string",
};

export const registerValidation = {
    name: "required|string",
    email: "required|string",
    username: "required|string",
    password: "required|string",
};

export const verificationValidation = {
    token: "required|string",
};

export const resetPasswordValidation = {
    email: "required|string",
};

export const validateResetPasswordVerification = {
    token: "required|string",
};

export const refreshTokenValidation = {
    refreshToken: "required|string",
};
