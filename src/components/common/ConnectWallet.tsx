import Button from "@components/Button";
import { CloseIcon } from "@components/icons/GeneralIcons";
import useConnectWallet from "@hooks/useConnectWallet";
import { NetworkType } from "@utils/types";
import { useRef } from "react";
import useDappStore from "src/store";

type Props = { networkTypes?: NetworkType[] };

export default function ConnectWallet({ networkTypes }: Props) {
  const { addressShort, chain, changeChain, connectWallet, disconnectWallet } =
    useConnectWallet();
  const { pageNetworkTypes } = useDappStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  networkTypes = networkTypes ?? pageNetworkTypes;

  const handleConnectWalletClick = () => {
    if (networkTypes && networkTypes.length > 1) {
      dialogRef.current?.showModal();
    } else {
      connectWallet(networkTypes?.[0] ?? "evm");
    }
  };

  return (
    <>
      {addressShort ? (
        chain ? (
          <Button
            text={addressShort}
            outlineVariant
            onButtonClick={() => {
              disconnectWallet();
            }}
          />
        ) : (
          <Button
            text="Unsupported Network"
            additionalClasses="bg-error"
            onButtonClick={() => {
              changeChain();
            }}
          />
        )
      ) : (
        <Button
          text="Connect Wallet"
          onButtonClick={handleConnectWalletClick}
        />
      )}
      <dialog
        ref={dialogRef}
        className="w-full max-w-sm p-4 bg-gray-1100 rounded-xl border-[1px] border-gray-600 text-white backdrop:bg-gray-1100 backdrop:opacity-90 backdrop:backdrop-filter backdrop-blur-lg"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Connect Wallet</p>
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
          <div className="flex flex-col gap-2">
            {networkTypes?.map((networkType) => (
              <Button
                text={networkType}
                key={networkType}
                onButtonClick={() => {
                  connectWallet(networkType);
                  dialogRef.current?.close();
                }}
                disabled={networkType !== "evm"}
                outlineVariant
                additionalClasses="uppercase"
              />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
