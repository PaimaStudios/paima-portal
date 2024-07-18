import Button from "@components/Button";

export type TransactionButtonProps = {
  isLoading?: boolean;
  isPending?: boolean;
  actionText: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function TransactionButton({
  onClick,
  isLoading,
  isPending,
  actionText,
  disabled,
}: TransactionButtonProps) {
  return (
    <Button
      onButtonClick={onClick}
      disabled={isLoading || isPending || disabled}
      text={
        isPending
          ? "Confirm transaction..."
          : isLoading
          ? "Transaction pending..."
          : actionText
      }
    />
  );
}
