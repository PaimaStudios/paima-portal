import { useState } from "react";

import { GameProps } from "@pages/Games";
import { DoubleArrowDownIcon } from "./icons/GeneralIcons";
import clsx from "clsx";

type GameCardProps = Pick<
  GameProps,
  | "title"
  | "description"
  | "iconURL"
  | "categories"
  | "playNowButtonText"
  | "illustrationImageURLs"
  | "additionalInformation"
  | "isNotReleasedYet"
>;

const GameCard = ({
  title,
  description,
  iconURL,
  categories,
  playNowButtonText,
  illustrationImageURLs,
  isNotReleasedYet = false,
  additionalInformation,
}: GameCardProps) => {
  const [areAdditionalInfoVisible, setAreAdditionalInfoVisible] =
    useState(false);

  return (
    <div className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl">
      <div className="flex flex-col achievement-background rounded-2xl p-6 laptop:p-10 gap-6">
        <div className="flex items-start justify-between">
          <div className="w-28">
            <img
              src={iconURL ?? "/images/game-icon-placeholder.svg"}
              alt={title}
              className="object-fit"
            />
          </div>
          {/* TODO: Extract to a Button component */}
          <button
            className={clsx(
              "py-3 px-4 rounded-xl text-heading5 text-white bg-gray-800 font-semibold transition-colors duration-150 ease-in-out",
              !isNotReleasedYet
                ? "hover:bg-brand hover:cursor-pointer"
                : "hover:cursor-not-allowed",
            )}
          >
            <span className="hidden laptop:block">
              {isNotReleasedYet
                ? "Coming soon"
                : playNowButtonText ?? "Play now"}
            </span>
            <span className="laptop:hidden">Play now</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-heading3 font-semibold text-gray-50">{title}</h3>
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="text-bodyS flex gap-1 items-center justify-center capitalize text-gray-200 py-1 px-3 border border-gray-800 rounded-2xl"
              >
                {category}
              </div>
            ))}
          </div>
          <p className="text-bodyM text-gray-200">{description}</p>
        </div>
        {illustrationImageURLs && (
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {illustrationImageURLs.map((imageURL, index) => (
              <div
                key={index}
                className="h-64 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${imageURL})` }}
              />
            ))}
          </div>
        )}
        {additionalInformation && (
          <div className="flex flex-col gap-6">
            <div
              className="flex gap-1 items-center justify-center text-gray-200 hover:cursor-pointer hover:text-brand"
              onClick={() =>
                setAreAdditionalInfoVisible(!areAdditionalInfoVisible)
              }
            >
              <p className="text-bodyS uppercase">Additional information</p>
              <div
                className={clsx(
                  "w-4 h-4 flex items-center justify-center",
                  areAdditionalInfoVisible ? "rotate-180" : "rotate-0",
                )}
              >
                <DoubleArrowDownIcon />
              </div>
            </div>
            {areAdditionalInfoVisible &&
              additionalInformation.map((info, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h4 className="text-heading3 text-gray-50 font-semibold">
                    {info.title}
                  </h4>
                  <p className="text-bodyM text-gray-200">{info.description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
