import clsx from "clsx";
import { useState } from "react";
import Checkbox from "./Checkbox";

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

const DEXTradingPanel = ({ wrapperClassname }: DEXTradingPanelProps) => {
  const [sellingMode, setSellingMode] = useState<"sell" | "buy">("buy");
  const [customSlippageVisible, setCustomSlippageVisible] = useState(false);

  const handleSellingModeChange = (mode: "sell" | "buy") => {
    setSellingMode(mode);
    setCustomSlippageVisible(false);
  };

  const isSubmitAllowed = true;

  const BuyPanel = (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-bodyL text-white">Buy amount</label>
          <div className="border border-gray-600 rounded-xl flex items-center justify-between py-3 pr-4 pl-6">
            <p>1,392</p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border border-brand rounded-xl">
              TGOLD
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <p className="text-gray-200 text-bodyS">
              Available: 3,434,231 TGOLD
            </p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-gray-200 hover:text-white text-bodyS border border-gray-800 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out">
              Buy all
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-bodyL text-white">Total ETH to pay</label>
          <div className="border border-gray-600 rounded-xl flex items-center justify-between py-3 pr-4 pl-6">
            <p>0.0000792</p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border border-brand rounded-xl">
              ETH
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <p className="text-gray-200 text-bodyS">
              Wallet balance: 0.00000423 ETH
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4 border border-brand rounded-xl">
        <div className="flex flex-col gap-3 border-b border-gray-600 pb-3">
          <div className="flex flex-col gap-1 text-white text-bodyM">
            <p>Taker fee: 0.5%</p>
            <p>Fees paid: 0.0000000034 ETH</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-bodyM">Custom slippage</p>
            <Checkbox
              onCheckboxChecked={(checked) => setCustomSlippageVisible(checked)}
            />
            {customSlippageVisible && (
              <div className="flex items-center gap-1 justify-center py-1 px-3 uppercase text-white hover:text-white text-bodyS border border-gray-600 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out">
                0.1
                <span className="text-brand">%</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-white text-bodyL font-medium">
          You'll pay at most: 0.000017 ETH
        </p>
      </div>
      <button
        className={clsx(
          "flex items-center justify-center uppercase font-medium text-white text-heading4 px-6 py-3 rounded-xl w-full transition-colors duration-150 ease-in-out",
          isSubmitAllowed
            ? "bg-brand hover:cursor-pointer"
            : "bg-gray-800 hover:cursor-not-allowed",
        )}
      >
        Buy
      </button>
    </>
  );

  const SellPanel = (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-bodyL text-white">Buy amount</label>
          <div className="border border-gray-600 rounded-xl flex items-center justify-between py-3 pr-4 pl-6">
            <p>12</p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border border-brand rounded-xl">
              TGOLD
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <p className="text-gray-200 text-bodyS">
              Available: 3,434,231 TGOLD
            </p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-gray-200 hover:text-white text-bodyS border border-gray-800 rounded-xl hover:cursor-pointer hover:border-brand transition-colors duration-150 ease-in-out">
              Sell all
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-bodyL text-white">Price per 1 TGOLD</label>
          <div className="border border-gray-600 rounded-xl flex items-center justify-between py-3 pr-4 pl-6">
            <p>0.0000792</p>
            <div className="flex items-center justify-center py-1 px-3 uppercase text-white text-bodyM border border-brand rounded-xl">
              ETH
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4 border border-brand rounded-xl">
        <div className="flex flex-col gap-3 border-b border-gray-600 pb-3">
          <div className="flex flex-col gap-1 text-white text-bodyM">
            <p>Maker fee: 0.5%</p>
            <p>Fees paid: 0.0000000034 ETH</p>
          </div>
        </div>
        <p className="text-white text-bodyL font-medium">
          You'll pay at most: 0.000017 ETH
        </p>
      </div>
      <button
        className={clsx(
          "flex items-center justify-center uppercase font-medium text-white text-heading4 px-6 py-3 rounded-xl w-full transition-colors duration-150 ease-in-out",
          isSubmitAllowed
            ? "bg-brand hover:cursor-pointer"
            : "bg-gray-800 hover:cursor-not-allowed",
        )}
      >
        Create Sell Order
      </button>
    </>
  );

  return (
    <div
      className={clsx("flex flex-col justify-center gap-6", wrapperClassname)}
    >
      <div className="flex gap-4">
        <DEXTradingModeButton
          text="Buy"
          isActive={sellingMode === "buy"}
          onButtonClicked={() => handleSellingModeChange("buy")}
        />
        <DEXTradingModeButton
          text="Sell"
          isActive={sellingMode === "sell"}
          onButtonClicked={() => handleSellingModeChange("sell")}
        />
      </div>
      {sellingMode === "buy" ? BuyPanel : SellPanel}
    </div>
  );
};

export default DEXTradingPanel;
