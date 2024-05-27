import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderbookDex
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderbookDexAbi = [
  {
    type: "constructor",
    inputs: [{ name: "_asset", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "asset",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "orderIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "cancelBatchSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
    name: "cancelSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "assetIds", internalType: "uint256[]", type: "uint256[]" },
      { name: "assetAmounts", internalType: "uint256[]", type: "uint256[]" },
      { name: "pricesPerAssets", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "createBatchSellOrder",
    outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "assetId", internalType: "uint256", type: "uint256" },
      { name: "assetAmount", internalType: "uint256", type: "uint256" },
      { name: "pricePerAsset", internalType: "uint256", type: "uint256" },
    ],
    name: "createSellOrder",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "currentOrderId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "assetAmount", internalType: "uint256", type: "uint256" },
      { name: "orderIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "fillOrdersExactAsset",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "minimumAsset", internalType: "uint256", type: "uint256" },
      { name: "orderIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "fillOrdersExactEth",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
    name: "getOrder",
    outputs: [
      {
        name: "",
        internalType: "struct IOrderbookDex.Order",
        type: "tuple",
        components: [
          { name: "assetId", internalType: "uint256", type: "uint256" },
          { name: "assetAmount", internalType: "uint256", type: "uint256" },
          { name: "pricePerAsset", internalType: "uint256", type: "uint256" },
          { name: "seller", internalType: "address payable", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256[]", type: "uint256[]" },
      { name: "", internalType: "uint256[]", type: "uint256[]" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "OrderCancelled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "orderId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "assetId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "assetAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "pricePerAsset",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "orderId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assetAmount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "pricePerAsset",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderFilled",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  {
    type: "error",
    inputs: [
      { name: "expectedAmount", internalType: "uint256", type: "uint256" },
      { name: "actualAmount", internalType: "uint256", type: "uint256" },
    ],
    name: "InsufficientEndAmount",
  },
  { type: "error", inputs: [], name: "InvalidArrayLength" },
  {
    type: "error",
    inputs: [{ name: "input", internalType: "uint256", type: "uint256" }],
    name: "InvalidInput",
  },
  {
    type: "error",
    inputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
    name: "OrderDoesNotExist",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "Unauthorized",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useReadOrderbookDex = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"asset"`
 */
export const useReadOrderbookDexAsset = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "asset",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"currentOrderId"`
 */
export const useReadOrderbookDexCurrentOrderId =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "currentOrderId",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"getOrder"`
 */
export const useReadOrderbookDexGetOrder = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "getOrder",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadOrderbookDexSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useWriteOrderbookDex = /*#__PURE__*/ createUseWriteContract({
  abi: orderbookDexAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"cancelBatchSellOrder"`
 */
export const useWriteOrderbookDexCancelBatchSellOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "cancelBatchSellOrder",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"cancelSellOrder"`
 */
export const useWriteOrderbookDexCancelSellOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "cancelSellOrder",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"createBatchSellOrder"`
 */
export const useWriteOrderbookDexCreateBatchSellOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "createBatchSellOrder",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"createSellOrder"`
 */
export const useWriteOrderbookDexCreateSellOrder =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "createSellOrder",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"fillOrdersExactAsset"`
 */
export const useWriteOrderbookDexFillOrdersExactAsset =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "fillOrdersExactAsset",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"fillOrdersExactEth"`
 */
export const useWriteOrderbookDexFillOrdersExactEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "fillOrdersExactEth",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useWriteOrderbookDexOnErc1155BatchReceived =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "onERC1155BatchReceived",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useWriteOrderbookDexOnErc1155Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "onERC1155Received",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useSimulateOrderbookDex = /*#__PURE__*/ createUseSimulateContract({
  abi: orderbookDexAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"cancelBatchSellOrder"`
 */
export const useSimulateOrderbookDexCancelBatchSellOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "cancelBatchSellOrder",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"cancelSellOrder"`
 */
export const useSimulateOrderbookDexCancelSellOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "cancelSellOrder",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"createBatchSellOrder"`
 */
export const useSimulateOrderbookDexCreateBatchSellOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "createBatchSellOrder",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"createSellOrder"`
 */
export const useSimulateOrderbookDexCreateSellOrder =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "createSellOrder",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"fillOrdersExactAsset"`
 */
export const useSimulateOrderbookDexFillOrdersExactAsset =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "fillOrdersExactAsset",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"fillOrdersExactEth"`
 */
export const useSimulateOrderbookDexFillOrdersExactEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "fillOrdersExactEth",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useSimulateOrderbookDexOnErc1155BatchReceived =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "onERC1155BatchReceived",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useSimulateOrderbookDexOnErc1155Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "onERC1155Received",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useWatchOrderbookDexEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: orderbookDexAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OrderCancelled"`
 */
export const useWatchOrderbookDexOrderCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OrderCancelled",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OrderCreated"`
 */
export const useWatchOrderbookDexOrderCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OrderCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OrderFilled"`
 */
export const useWatchOrderbookDexOrderFilledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OrderFilled",
  });
