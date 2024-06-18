const errors = {
  InsufficientEndAmount:
    "Market has changed and your desired minimum outcome is not achievable. Refresh the data and if the issue persists, try increasing the slippage.",
  InsufficientPayment:
    "Market has changed and your input payment is not enough. Refresh the data and if the issue persists, try increasing the slippage.",
  "insufficient funds":
    "Insufficient funds for the operation + gas fee. Lower the amount.",
  ERC1155InsufficientBalance:
    "Data about your ERC1155 balance was outdated, please try again.",
};

export const getErrorMessage = (error: Error) => {
  const message = Object.entries(errors).find(([key, value]) =>
    error.message.includes(key),
  );
  return message?.[1] ?? error.message;
};
