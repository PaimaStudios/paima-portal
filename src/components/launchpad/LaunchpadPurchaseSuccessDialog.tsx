import CopyButton from "@components/CopyButton";
import { CloseIcon } from "@components/icons/GeneralIcons";
import useConnectWallet from "@hooks/useConnectWallet";
import { useEffect, useRef } from "react";

type Props = { txHash?: string; hasReferralRewardSharing?: boolean };

export default function LaunchpadPurchaseSuccessDialog({
  txHash,
  hasReferralRewardSharing,
}: Props) {
  const { address } = useConnectWallet();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!!txHash) {
      dialogRef.current?.showModal();
    }
  }, [txHash]);

  if (!txHash) return null;

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-xl px-2 tablet:px-0 bg-transparent backdrop:bg-gray-1100 backdrop:opacity-90 backdrop:backdrop-filter backdrop-blur-lg"
    >
      <div className="w-full p-4 bg-gray-1100 rounded-xl border-[1px] border-gray-600 text-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Purchase order sent!</p>
            <button
              id="closeModalButtonTop"
              className="h-8 w-8"
              onClick={() => {
                dialogRef.current?.close();
              }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col">
            <p>Transaction hash:</p>
            <p className="break-words">{txHash}</p>
          </div>
          <div className="flex flex-col">
            <p>
              You have successfully sent an order to purchase the selected
              items.
            </p>
            <p>They will be delivered to your wallet at a later date.</p>
          </div>

          <div className="flex gap-4 items-center justify-between">
            <p>
              Refer your friends to this launchpad! If they use your referral
              code, they'll get a discount
              {hasReferralRewardSharing &&
                ` and you'll get a portion of their purchase`}
              .
            </p>
            <CopyButton
              buttonProps={{ additionalClasses: "whitespace-nowrap" }}
              text={"Copy link"}
              valueToCopy={`${window.location.href}?referral=${address}`}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
