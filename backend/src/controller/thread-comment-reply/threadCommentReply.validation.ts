export const threadCommentReplyValidation = {
    comment_id: "required|numeric",
    body: "required|string",
};

export const threadCommentReplyUpdateValidation = {
    body: "required|string",
};
