import { GiftIcon } from "@components/icons/GeneralIcons";
import LaunchpadItemCard from "./LaunchpadItemCard";
import { useEffect, useRef } from "react";

type LaunchpadRewardsSectionProps = {};

const LaunchpadRewardsSection = ({}: LaunchpadRewardsSectionProps) => {
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
        <div className="flex flex-col gap-3 flex-1 z-10 min-w-[210px]">
          <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
            <GiftIcon />
          </div>
          {/* TODO: Handle currency switching */}
          <h5 className="text-heading3 font-bold text-gray-50">
            Per 0.0001ETH
          </h5>
          <LaunchpadItemCard
            imageURL="/images/launchpad-item-placeholder.svg"
            title="Reward #1"
            description="Tarochi is an ambitious onchain RPG, where every quest."
          />
        </div>
        <div className="flex flex-col gap-3 flex-1 z-10 min-w-[210px]">
          <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
            <GiftIcon />
          </div>
          {/* TODO: Handle currency switching */}
          <h5 className="text-heading3 font-bold text-gray-50">Per 0.001ETH</h5>
          <LaunchpadItemCard
            imageURL="/images/launchpad-item-placeholder.svg"
            title="Reward #2"
            description="Tarochi is an ambitious onchain RPG, where every quest."
          />
        </div>
        <div className="flex flex-col gap-3 flex-1 z-10 min-w-[210px]">
          <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
            <GiftIcon />
          </div>
          {/* TODO: Handle currency switching */}
          <h5 className="text-heading3 font-bold text-gray-50">Per 0.01ETH</h5>
          <LaunchpadItemCard
            imageURL="/images/launchpad-item-placeholder.svg"
            title="Reward #3"
            description="Tarochi is an ambitious onchain RPG, where every quest."
          />
        </div>
        <div className="flex flex-col gap-3 flex-1 z-10 min-w-[210px]">
          <div className="w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 text-brand bg-gray-1100">
            <GiftIcon />
          </div>
          {/* TODO: Handle currency switching */}
          <h5 className="text-heading3 font-bold text-gray-50">Per 0.1ETH</h5>
          <LaunchpadItemCard
            imageURL="/images/launchpad-item-placeholder.svg"
            title="Reward #4"
            description="Tarochi is an ambitious onchain RPG, where every quest."
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadRewardsSection;
