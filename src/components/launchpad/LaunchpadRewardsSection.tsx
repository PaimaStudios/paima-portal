import { GiftIcon } from "@components/icons/GeneralIcons";
import LaunchpadItemCard from "./LaunchpadItemCard";
import { useEffect, useRef } from "react";
import { FreeRewardItem } from "@hooks/launchpad/useGetAllLaunchpadsData";
import { formatUnits } from "viem";
import { tokens } from "@config/tokens";
import useGetItemQuantityLeft from "@hooks/launchpad/useGetItemQuantityLeft";

type LaunchpadRewardsSectionProps = {
  activeCurrency: string;
  freeRewards: FreeRewardItem[];
  handleIncreaseItemQuantityInOrder: (itemId: number) => void;
  orderFreeRewards: {
    id: number;
    quantity: number;
  }[];
  launchpadSlug: string;
};

const LaunchpadRewardsSection = ({
  activeCurrency,
  freeRewards,
  handleIncreaseItemQuantityInOrder,
  orderFreeRewards,
  launchpadSlug,
}: LaunchpadRewardsSectionProps) => {
  const { getItemQuantityLeft } = useGetItemQuantityLeft(
    launchpadSlug,
    orderFreeRewards,
  );
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleLineWidthChange = () => {
    if (horizontalLineRef.current && wrapperRef.current) {
      const wrapperScrollWidth = wrapperRef.current.scrollWidth;
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const currentLineWidth = horizontalLineRef.current.style.width;

      if (wrapperWidth === parseInt(currentLineWidth)) return;

      horizontalLineRef.current.style.width = `${wrapperScrollWidth}px`;
    }
  };

  const getItemCountFromOrder = (itemID: number) => {
    const existingItem = orderFreeRewards.find((item) => item.id === itemID);

    return existingItem ? existingItem.quantity : 0;
  };

  useEffect(() => {
    handleLineWidthChange();

    window.addEventListener("resize", handleLineWidthChange);

    return () => {
      window.removeEventListener("resize", handleLineWidthChange);
    };
  }, []);

  return (
    <div className="overflow-x-auto" ref={wrapperRef}>
      <div className="flex items-start gap-10 relative">
        <div
          className="w-full h-[2px] absolute left-0 right-0 top-[24px] bg-gray-600"
          ref={horizontalLineRef}
        />
        {freeRewards.map((reward) => (
          <div
            className="flex flex-col gap-3 flex-1 z-10 w-[210px] max-w-[210px] min-w-[210px]"
            key={reward.id}
          >
            <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
              <GiftIcon />
            </div>
            <h5 className="text-heading4 font-bold text-gray-50">
              Per{" "}
              {formatUnits(
                BigInt(reward.freeAt[activeCurrency] ?? 0),
                tokens[activeCurrency]?.decimals,
              )}{" "}
              {tokens[activeCurrency]?.symbol}
            </h5>
            <LaunchpadItemCard
              imageURL={
                reward.image ?? "/images/launchpad-item-placeholder.svg"
              }
              title={reward.name}
              description={reward.description}
              onItemCardClick={() => {
                handleIncreaseItemQuantityInOrder(reward.id);
              }}
              counter={getItemCountFromOrder(reward.id)}
              isHighlighted={getItemCountFromOrder(reward.id) > 0}
              supply={reward.supply}
              quantityLeft={getItemQuantityLeft(reward.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchpadRewardsSection;
