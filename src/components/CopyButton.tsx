import { useState } from "react";
import Button, { ButtonProps } from "./Button";

type Props = {
  valueToCopy: string;
  text?: string;
  textCopied?: string;
  buttonProps?: Partial<ButtonProps>;
};

export default function CopyButton({
  valueToCopy,
  text = "Copy",
  textCopied = "Copied!",
  buttonProps,
}: Props) {
  const [copyReferralLinkButtonText, setCopyReferralLinkButtonText] =
    useState(text);

  const handleClickCopyReferralLinkButton = () => {
    navigator.clipboard.writeText(valueToCopy);
    setCopyReferralLinkButtonText(textCopied);
    setTimeout(() => {
      setCopyReferralLinkButtonText(text);
    }, 2000);
  };

  return (
    <Button
      onButtonClick={handleClickCopyReferralLinkButton}
      text={copyReferralLinkButtonText}
      {...buttonProps}
    />
  );
}
