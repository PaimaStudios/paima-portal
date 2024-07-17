import clsx from "clsx";
import { useState } from "react";
import { useAccount } from "wagmi";

import ConnectWallet from "./common/ConnectWallet";
import DEXTradingBuyPanel from "./DEXTradingBuyPanel";
import DEXTradingSellPanel from "./DEXTradingSellPanel";

const DEXTradingModeButton = ({
  text,
  isActive = false,
  onButtonClicked,
}: {
  text: string;
  isActive?: boolean;
  onButtonClicked?: () => void;
}) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center uppercase font-medium text-white text-heading4 px-6 py-3 border-2 rounded-xl w-full hover:cursor-pointer transition-colors duration-150 ease-in-out",
        isActive ? "border-brand" : "border-gray-800 hover:border-brand",
      )}
      onClick={onButtonClicked}
    >
      {text}
    </button>
  );
};

type DEXTradingPanelProps = {
  wrapperClassname?: string;
};

enum SellingMode {
  Buy = "buy",
  Sell = "sell",
}

const DEXTradingPanel = ({ wrapperClassname }: DEXTradingPanelProps) => {
  const { chain } = useAccount();

  const [sellingMode, setSellingMode] = useState<SellingMode>(SellingMode.Buy);

  const handleSellingModeChange = (mode: SellingMode) => {
    setSellingMode(mode);
  };

  return (
    <div
      className={clsx("flex flex-col justify-center gap-6", wrapperClassname)}
    >
      {chain === undefined ? (
        <div className="p-14 flex flex-col items-center justify-center gap-6">
          <h2 className="text-heading3 text-gray-50 text-center font-medium">
            Connect your wallet to start trading
          </h2>
          <ConnectWallet />
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <DEXTradingModeButton
              text="Buy"
              isActive={sellingMode === SellingMode.Buy}
              onButtonClicked={() => handleSellingModeChange(SellingMode.Buy)}
            />
            <DEXTradingModeButton
              text="Sell"
              isActive={sellingMode === SellingMode.Sell}
              onButtonClicked={() => handleSellingModeChange(SellingMode.Sell)}
            />
          </div>
          {sellingMode === SellingMode.Buy ? (
            <DEXTradingBuyPanel />
          ) : (
            <DEXTradingSellPanel />
          )}
        </>
      )}
    </div>
  );
};

export default DEXTradingPanel;
