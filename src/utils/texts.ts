export const SnackbarMessage = {
  Common: {
    TransactionSubmitted: "Transaction submitted, awaiting confirmation...",
  },
  LockSuccess: "Lock operation successful!",
  UnlockSuccess: "Unlock reqest operation successful!",
  WithdrawSuccess: "Withdraw operation successful!",
  ApprovalSuccess: "Approval operation successful!",
  BlockDidNotReachUnlockTime:
    "Latest block has not reached unlock time yet. Try again a bit later!",
  Dex: {
    ApprovalForCreateOrderSuccess:
      "Approval successful, proceeding with creating sell order...",
    CreateOrderSuccess: "Sell order created successfully!",
    CreateBatchOrderSuccess: "Batch sell order created successfully!",
    CancelOrderSuccess: "Sell order cancelled successfully!",
    FillOrderSuccess: "Order filled successfully!",
    BalanceClaimSuccess: "Balance claimed successfully!",
  },
  Launchpad: {
    PurchaseSuccess: "Purchase successful!",
    ApprovalErc20Success: "Approval successful, proceeding with purchase...",
  },
};

export const InputErrorMessage = {
  InputExceedsAvailableAmount: "Value exceeds available amount",
  InputMustBeGreaterThanZero: "Value must be greater than 0",
  InputExceedsBalance: "Value exceeds your balance",
  ValueNotPercentage: "Must be between 0 and 100",
};
