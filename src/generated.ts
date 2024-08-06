import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InverseAppProjected1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inverseAppProjected1155Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
      { name: "_owner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "accounts", internalType: "address[]", type: "address[]" },
      { name: "ids", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "balanceOfBatch",
    outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "baseExtension",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "baseURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "ids", internalType: "uint256[]", type: "uint256[]" },
      { name: "values", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "currentNonce",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "currentTokenId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "initialSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "verificationData", internalType: "bytes", type: "bytes" },
    ],
    name: "mint",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "mint",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "minter", internalType: "address", type: "address" }],
    name: "mintCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "ids", internalType: "uint256[]", type: "uint256[]" },
      { name: "values", internalType: "uint256[]", type: "uint256[]" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_newBaseExtension", internalType: "string", type: "string" },
    ],
    name: "setBaseExtension",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_URI", internalType: "string", type: "string" }],
    name: "setBaseURI",
    outputs: [],
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
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "tokenToMint",
    outputs: [
      { name: "minter", internalType: "address", type: "address" },
      { name: "userTokenId", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "updateMetadata",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_fromTokenId", internalType: "uint256", type: "uint256" },
      { name: "_toTokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "updateMetadataBatch",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "uri",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "customBaseUri", internalType: "string", type: "string" },
    ],
    name: "uri",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      {
        name: "customUriInterface",
        internalType: "contract IUri",
        type: "address",
      },
    ],
    name: "uri",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_fromTokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_toTokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "BatchMetadataUpdate",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MetadataUpdate",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "minter",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "userTokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Minted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldBaseExtension",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "newBaseExtension",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "SetBaseExtension",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldUri",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "newUri",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "SetBaseURI",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "ids",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "values",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "TransferBatch",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: false },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TransferSingle",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "value", internalType: "string", type: "string", indexed: false },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "URI",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidApprover",
  },
  {
    type: "error",
    inputs: [
      { name: "idsLength", internalType: "uint256", type: "uint256" },
      { name: "valuesLength", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InvalidArrayLength",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC1155InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC1155InvalidSender",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC1155MissingApprovalForAll",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "length", internalType: "uint256", type: "uint256" },
    ],
    name: "StringsInsufficientHexLength",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OrderbookDex
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const orderbookDexAbi = [
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidApprover",
  },
  {
    type: "error",
    inputs: [
      { name: "idsLength", internalType: "uint256", type: "uint256" },
      { name: "valuesLength", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InvalidArrayLength",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC1155InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC1155InvalidSender",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC1155MissingApprovalForAll",
  },
  {
    type: "constructor",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_defaultMakerFee", internalType: "uint256", type: "uint256" },
      { name: "_defaultTakerFee", internalType: "uint256", type: "uint256" },
      { name: "_orderCreationFee", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "balances",
    outputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "orderIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "cancelBatchSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "orderId", internalType: "uint256", type: "uint256" },
    ],
    name: "cancelSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "collectedFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "assetIds", internalType: "uint256[]", type: "uint256[]" },
      { name: "assetAmounts", internalType: "uint256[]", type: "uint256[]" },
      { name: "pricesPerAssets", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "createBatchSellOrder",
    outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "assetId", internalType: "uint256", type: "uint256" },
      { name: "assetAmount", internalType: "uint256", type: "uint256" },
      { name: "pricePerAsset", internalType: "uint256", type: "uint256" },
    ],
    name: "createSellOrder",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "asset", internalType: "address", type: "address" }],
    name: "currentOrderId",
    outputs: [{ name: "orderId", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "defaultMakerFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "defaultTakerFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
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
      { name: "asset", internalType: "address", type: "address" },
      { name: "minimumAsset", internalType: "uint256", type: "uint256" },
      { name: "orderIds", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "fillOrdersExactEth",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "asset", internalType: "address", type: "address" }],
    name: "getAssetAppliedFees",
    outputs: [
      { name: "makerFee", internalType: "uint256", type: "uint256" },
      { name: "takerFee", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "asset", internalType: "address", type: "address" }],
    name: "getAssetFeeInfo",
    outputs: [
      {
        name: "",
        internalType: "struct IOrderbookDex.FeeInfo",
        type: "tuple",
        components: [
          { name: "makerFee", internalType: "uint256", type: "uint256" },
          { name: "takerFee", internalType: "uint256", type: "uint256" },
          { name: "set", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "orderId", internalType: "uint256", type: "uint256" },
    ],
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
          { name: "makerFee", internalType: "uint256", type: "uint256" },
          { name: "takerFee", internalType: "uint256", type: "uint256" },
          { name: "creationFeePaid", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "maxFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
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
    inputs: [],
    name: "orderCreationFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "asset", internalType: "address", type: "address" },
      { name: "makerFee", internalType: "uint256", type: "uint256" },
      { name: "takerFee", internalType: "uint256", type: "uint256" },
    ],
    name: "setAssetFeeInfo",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "makerFee", internalType: "uint256", type: "uint256" },
      { name: "takerFee", internalType: "uint256", type: "uint256" },
    ],
    name: "setDefaultFeeInfo",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "fee", internalType: "uint256", type: "uint256" }],
    name: "setOrderCreationFee",
    outputs: [],
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
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "BalanceClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "asset",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "makerFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "takerFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FeeInfoChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FeesWithdrawn",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "asset",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assetId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "orderId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "OrderCancelled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "asset",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assetId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "orderId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: false,
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
      {
        name: "makerFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "takerFee",
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
        name: "oldFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newFee",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderCreationFeeChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "asset",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assetId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "orderId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: false,
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
      {
        name: "makerFeeCollected",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "takerFeeCollected",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrderFilled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  { type: "error", inputs: [], name: "FeeTooHigh" },
  {
    type: "error",
    inputs: [
      { name: "expectedAmount", internalType: "uint256", type: "uint256" },
      { name: "actualAmount", internalType: "uint256", type: "uint256" },
    ],
    name: "InsufficientEndAmount",
  },
  { type: "error", inputs: [], name: "InsufficientPayment" },
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
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "Unauthorized",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PaimaLaunchpad
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const paimaLaunchpadAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "token", internalType: "address", type: "address" }],
    name: "acceptedPaymentToken",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "acceptedPaymentTokens",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "paymentToken", internalType: "address", type: "address" },
      { name: "paymentAmount", internalType: "uint256", type: "uint256" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "referrer", internalType: "address", type: "address" },
      { name: "itemsIds", internalType: "uint256[]", type: "uint256[]" },
      { name: "itemsQuantities", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "buyItemsErc20",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "referrer", internalType: "address payable", type: "address" },
      { name: "itemsIds", internalType: "uint256[]", type: "uint256[]" },
      { name: "itemsQuantities", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "buyItemsNative",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "price", internalType: "uint256", type: "uint256" },
      { name: "referrer", internalType: "address", type: "address" },
    ],
    name: "getReferrerReward",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_referrerRewardsBps", internalType: "uint256", type: "uint256" },
      {
        name: "_acceptedPaymentTokens",
        internalType: "address[]",
        type: "address[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "referrerRewardBps",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "tokens", internalType: "address[]", type: "address[]" }],
    name: "setAcceptedPaymentTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "newReferrerRewardBps",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "setReferrerRewardBps",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newImplementation", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "account", internalType: "address payable", type: "address" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "tokens",
        internalType: "address[]",
        type: "address[]",
        indexed: true,
      },
    ],
    name: "AcceptedPaymentTokensChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "paymentToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "referrer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "itemsIds",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "itemsQuantities",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "BuyItems",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "referrer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "paymentToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ReferrerReward",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "implementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Upgraded",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  {
    type: "error",
    inputs: [
      { name: "implementation", internalType: "address", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
  },
  { type: "error", inputs: [], name: "ERC1967NonPayable" },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "PaimaLaunchpad__InvalidBps" },
  { type: "error", inputs: [], name: "PaimaLaunchpad__InvalidReceiver" },
  { type: "error", inputs: [], name: "PaimaLaunchpad__InvalidReferral" },
  {
    type: "error",
    inputs: [],
    name: "PaimaLaunchpad__UnsupportedPaymentToken",
  },
  { type: "error", inputs: [], name: "UUPSUnauthorizedCallContext" },
  {
    type: "error",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "allowance",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "decimals",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "transfer",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: "approve",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: "transfer" },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__
 */
export const useReadInverseAppProjected1155 =
  /*#__PURE__*/ createUseReadContract({ abi: inverseAppProjected1155Abi });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadInverseAppProjected1155BalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "balanceOf",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadInverseAppProjected1155BalanceOfBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "balanceOfBatch",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"baseExtension"`
 */
export const useReadInverseAppProjected1155BaseExtension =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "baseExtension",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"baseURI"`
 */
export const useReadInverseAppProjected1155BaseUri =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "baseURI",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"currentNonce"`
 */
export const useReadInverseAppProjected1155CurrentNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "currentNonce",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"currentTokenId"`
 */
export const useReadInverseAppProjected1155CurrentTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "currentTokenId",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"initialSupply"`
 */
export const useReadInverseAppProjected1155InitialSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "initialSupply",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadInverseAppProjected1155IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "isApprovedForAll",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"mintCount"`
 */
export const useReadInverseAppProjected1155MintCount =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "mintCount",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"name"`
 */
export const useReadInverseAppProjected1155Name =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "name",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"owner"`
 */
export const useReadInverseAppProjected1155Owner =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "owner",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadInverseAppProjected1155SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadInverseAppProjected1155Symbol =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "symbol",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"tokenToMint"`
 */
export const useReadInverseAppProjected1155TokenToMint =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "tokenToMint",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadInverseAppProjected1155TotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "totalSupply",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"uri"`
 */
export const useReadInverseAppProjected1155Uri =
  /*#__PURE__*/ createUseReadContract({
    abi: inverseAppProjected1155Abi,
    functionName: "uri",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__
 */
export const useWriteInverseAppProjected1155 =
  /*#__PURE__*/ createUseWriteContract({ abi: inverseAppProjected1155Abi });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"burn"`
 */
export const useWriteInverseAppProjected1155Burn =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "burn",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"burnBatch"`
 */
export const useWriteInverseAppProjected1155BurnBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "burnBatch",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteInverseAppProjected1155Mint =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "mint",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteInverseAppProjected1155RenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteInverseAppProjected1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "safeBatchTransferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteInverseAppProjected1155SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "safeTransferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteInverseAppProjected1155SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setApprovalForAll",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setBaseExtension"`
 */
export const useWriteInverseAppProjected1155SetBaseExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setBaseExtension",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteInverseAppProjected1155SetBaseUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setBaseURI",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteInverseAppProjected1155TransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"updateMetadata"`
 */
export const useWriteInverseAppProjected1155UpdateMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "updateMetadata",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"updateMetadataBatch"`
 */
export const useWriteInverseAppProjected1155UpdateMetadataBatch =
  /*#__PURE__*/ createUseWriteContract({
    abi: inverseAppProjected1155Abi,
    functionName: "updateMetadataBatch",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__
 */
export const useSimulateInverseAppProjected1155 =
  /*#__PURE__*/ createUseSimulateContract({ abi: inverseAppProjected1155Abi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"burn"`
 */
export const useSimulateInverseAppProjected1155Burn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "burn",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"burnBatch"`
 */
export const useSimulateInverseAppProjected1155BurnBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "burnBatch",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateInverseAppProjected1155Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "mint",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateInverseAppProjected1155RenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateInverseAppProjected1155SafeBatchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "safeBatchTransferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateInverseAppProjected1155SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "safeTransferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateInverseAppProjected1155SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setApprovalForAll",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setBaseExtension"`
 */
export const useSimulateInverseAppProjected1155SetBaseExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setBaseExtension",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateInverseAppProjected1155SetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "setBaseURI",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateInverseAppProjected1155TransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"updateMetadata"`
 */
export const useSimulateInverseAppProjected1155UpdateMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "updateMetadata",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `functionName` set to `"updateMetadataBatch"`
 */
export const useSimulateInverseAppProjected1155UpdateMetadataBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: inverseAppProjected1155Abi,
    functionName: "updateMetadataBatch",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__
 */
export const useWatchInverseAppProjected1155Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchInverseAppProjected1155ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "ApprovalForAll",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchInverseAppProjected1155BatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "BatchMetadataUpdate",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchInverseAppProjected1155MetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "MetadataUpdate",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"Minted"`
 */
export const useWatchInverseAppProjected1155MintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "Minted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchInverseAppProjected1155OwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"SetBaseExtension"`
 */
export const useWatchInverseAppProjected1155SetBaseExtensionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "SetBaseExtension",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"SetBaseURI"`
 */
export const useWatchInverseAppProjected1155SetBaseUriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "SetBaseURI",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchInverseAppProjected1155TransferBatchEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "TransferBatch",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchInverseAppProjected1155TransferSingleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "TransferSingle",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link inverseAppProjected1155Abi}__ and `eventName` set to `"URI"`
 */
export const useWatchInverseAppProjected1155UriEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: inverseAppProjected1155Abi,
    eventName: "URI",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useReadOrderbookDex = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"balances"`
 */
export const useReadOrderbookDexBalances = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "balances",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"collectedFees"`
 */
export const useReadOrderbookDexCollectedFees =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "collectedFees",
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"defaultMakerFee"`
 */
export const useReadOrderbookDexDefaultMakerFee =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "defaultMakerFee",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"defaultTakerFee"`
 */
export const useReadOrderbookDexDefaultTakerFee =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "defaultTakerFee",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"getAssetAppliedFees"`
 */
export const useReadOrderbookDexGetAssetAppliedFees =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "getAssetAppliedFees",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"getAssetFeeInfo"`
 */
export const useReadOrderbookDexGetAssetFeeInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "getAssetFeeInfo",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"getOrder"`
 */
export const useReadOrderbookDexGetOrder = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "getOrder",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"maxFee"`
 */
export const useReadOrderbookDexMaxFee = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "maxFee",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"orderCreationFee"`
 */
export const useReadOrderbookDexOrderCreationFee =
  /*#__PURE__*/ createUseReadContract({
    abi: orderbookDexAbi,
    functionName: "orderCreationFee",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOrderbookDexOwner = /*#__PURE__*/ createUseReadContract({
  abi: orderbookDexAbi,
  functionName: "owner",
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteOrderbookDexClaim = /*#__PURE__*/ createUseWriteContract({
  abi: orderbookDexAbi,
  functionName: "claim",
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOrderbookDexRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setAssetFeeInfo"`
 */
export const useWriteOrderbookDexSetAssetFeeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "setAssetFeeInfo",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setDefaultFeeInfo"`
 */
export const useWriteOrderbookDexSetDefaultFeeInfo =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "setDefaultFeeInfo",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setOrderCreationFee"`
 */
export const useWriteOrderbookDexSetOrderCreationFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "setOrderCreationFee",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOrderbookDexTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useWriteOrderbookDexWithdrawFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: orderbookDexAbi,
    functionName: "withdrawFees",
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateOrderbookDexClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "claim",
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOrderbookDexRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setAssetFeeInfo"`
 */
export const useSimulateOrderbookDexSetAssetFeeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "setAssetFeeInfo",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setDefaultFeeInfo"`
 */
export const useSimulateOrderbookDexSetDefaultFeeInfo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "setDefaultFeeInfo",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"setOrderCreationFee"`
 */
export const useSimulateOrderbookDexSetOrderCreationFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "setOrderCreationFee",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOrderbookDexTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link orderbookDexAbi}__ and `functionName` set to `"withdrawFees"`
 */
export const useSimulateOrderbookDexWithdrawFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: orderbookDexAbi,
    functionName: "withdrawFees",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__
 */
export const useWatchOrderbookDexEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: orderbookDexAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"BalanceClaimed"`
 */
export const useWatchOrderbookDexBalanceClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "BalanceClaimed",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"FeeInfoChanged"`
 */
export const useWatchOrderbookDexFeeInfoChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "FeeInfoChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"FeesWithdrawn"`
 */
export const useWatchOrderbookDexFeesWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "FeesWithdrawn",
  });

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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OrderCreationFeeChanged"`
 */
export const useWatchOrderbookDexOrderCreationFeeChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OrderCreationFeeChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OrderFilled"`
 */
export const useWatchOrderbookDexOrderFilledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OrderFilled",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link orderbookDexAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOrderbookDexOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: orderbookDexAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__
 */
export const useReadPaimaLaunchpad = /*#__PURE__*/ createUseReadContract({
  abi: paimaLaunchpadAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadPaimaLaunchpadUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "UPGRADE_INTERFACE_VERSION",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"acceptedPaymentToken"`
 */
export const useReadPaimaLaunchpadAcceptedPaymentToken =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "acceptedPaymentToken",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"acceptedPaymentTokens"`
 */
export const useReadPaimaLaunchpadAcceptedPaymentTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "acceptedPaymentTokens",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"getReferrerReward"`
 */
export const useReadPaimaLaunchpadGetReferrerReward =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "getReferrerReward",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"owner"`
 */
export const useReadPaimaLaunchpadOwner = /*#__PURE__*/ createUseReadContract({
  abi: paimaLaunchpadAbi,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadPaimaLaunchpadProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "proxiableUUID",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"referrerRewardBps"`
 */
export const useReadPaimaLaunchpadReferrerRewardBps =
  /*#__PURE__*/ createUseReadContract({
    abi: paimaLaunchpadAbi,
    functionName: "referrerRewardBps",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__
 */
export const useWritePaimaLaunchpad = /*#__PURE__*/ createUseWriteContract({
  abi: paimaLaunchpadAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"buyItemsErc20"`
 */
export const useWritePaimaLaunchpadBuyItemsErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "buyItemsErc20",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"buyItemsNative"`
 */
export const useWritePaimaLaunchpadBuyItemsNative =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "buyItemsNative",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"initialize"`
 */
export const useWritePaimaLaunchpadInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "initialize",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWritePaimaLaunchpadRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"setAcceptedPaymentTokens"`
 */
export const useWritePaimaLaunchpadSetAcceptedPaymentTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "setAcceptedPaymentTokens",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"setReferrerRewardBps"`
 */
export const useWritePaimaLaunchpadSetReferrerRewardBps =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "setReferrerRewardBps",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWritePaimaLaunchpadTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWritePaimaLaunchpadUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "upgradeToAndCall",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWritePaimaLaunchpadWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: paimaLaunchpadAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__
 */
export const useSimulatePaimaLaunchpad =
  /*#__PURE__*/ createUseSimulateContract({ abi: paimaLaunchpadAbi });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"buyItemsErc20"`
 */
export const useSimulatePaimaLaunchpadBuyItemsErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "buyItemsErc20",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"buyItemsNative"`
 */
export const useSimulatePaimaLaunchpadBuyItemsNative =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "buyItemsNative",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulatePaimaLaunchpadInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "initialize",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulatePaimaLaunchpadRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"setAcceptedPaymentTokens"`
 */
export const useSimulatePaimaLaunchpadSetAcceptedPaymentTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "setAcceptedPaymentTokens",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"setReferrerRewardBps"`
 */
export const useSimulatePaimaLaunchpadSetReferrerRewardBps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "setReferrerRewardBps",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulatePaimaLaunchpadTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulatePaimaLaunchpadUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "upgradeToAndCall",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulatePaimaLaunchpadWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: paimaLaunchpadAbi,
    functionName: "withdraw",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__
 */
export const useWatchPaimaLaunchpadEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: paimaLaunchpadAbi });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"AcceptedPaymentTokensChanged"`
 */
export const useWatchPaimaLaunchpadAcceptedPaymentTokensChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "AcceptedPaymentTokensChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"BuyItems"`
 */
export const useWatchPaimaLaunchpadBuyItemsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "BuyItems",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchPaimaLaunchpadInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchPaimaLaunchpadOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"ReferrerReward"`
 */
export const useWatchPaimaLaunchpadReferrerRewardEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "ReferrerReward",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link paimaLaunchpadAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchPaimaLaunchpadUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: paimaLaunchpadAbi,
    eventName: "Upgraded",
  });
