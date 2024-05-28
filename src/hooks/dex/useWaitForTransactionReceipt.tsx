import { useWaitForTransactionReceipt as useWaitForTransactionReceiptWagmi } from "wagmi";

export default function useWaitForTransactionReceipt(
  parameters: typeof useWaitForTransactionReceiptWagmi extends (
    parameters: infer P,
  ) => any
    ? P
    : never,
) {
  return useWaitForTransactionReceiptWagmi({
    ...parameters,
    query: { ...parameters?.query, staleTime: Infinity },
  });
}
