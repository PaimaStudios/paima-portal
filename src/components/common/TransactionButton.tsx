import Button, { ButtonProps } from "@components/Button";

export type TransactionButtonProps = {
  isLoading?: boolean;
  isPending?: boolean;
  actionText: string;
  disabled?: boolean;
  onClick?: () => void;
} & Pick<ButtonProps, "smallVariant" | "outlineVariant">;

export default function TransactionButton({
  onClick,
  isLoading,
  isPending,
  actionText,
  disabled,
  ...props
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
      {...props}
    />
  );
}
