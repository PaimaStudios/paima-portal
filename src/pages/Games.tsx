import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FilterDropdown from "@components/FilterDropdown";
import FeaturedGameCard from "@components/FeaturedGameCard";
import GameCard from "@components/GameCard";
import FilterTagList from "@components/FilterTagList";
import { gamesData } from "src/data/games";

export const gameCategories = [
  "action",
  "retro",
  "strategic",
  "multi-player",
  "single-player",
] as const satisfies string[];

export type GameCategory = (typeof gameCategories)[number];

export type GameProps = {
  iconURL?: string;
  coverImageURL?: string;
  title: string;
  description: string;
  categories: GameCategory[];
  playNowButtonText?: string;
  isNotReleasedYet?: boolean;
  isFeatured?: boolean;
  illustrationImageURLs?: string[];
  additionalInformation?: {
    title: string;
    description: string;
  }[];
};

export default function Games() {
  const [currentGameCategories, setCurrentGameCategories] = useState<
    GameCategory[]
  >([]);

  const handleCategorySelected = (category: GameCategory) => {
    if (currentGameCategories.includes(category)) {
      setCurrentGameCategories(
        currentGameCategories.filter((c) => c !== category),
      );
    } else {
      setCurrentGameCategories([...currentGameCategories, category]);
    }
  };

  const handleCategoryRemoved = (category: GameCategory) => {
    setCurrentGameCategories(
      currentGameCategories.filter((c) => c !== category),
    );
  };

  const getFileteredGames = () => {
    if (currentGameCategories.length === 0) {
      return gamesData;
    }

    return gamesData.filter((game) =>
      game.categories.some((category) =>
        currentGameCategories.includes(category),
      ),
    );
  };

  const featuredGames = gamesData.filter((game) => game.isFeatured);

  const responsive = {
    tablet: {
      breakpoint: { max: 9999, min: 767 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full py-6 container">
      <div className="flex flex-col gap-6 tablet:gap-12">
        <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
          Games
        </h1>
        <div className="flex flex-col gap-6 tablet:gap-12">
          <div className="flex flex-col gap-6">
            <div className="max-w-[180px]">
              <FilterDropdown
                allCategories={gameCategories}
                currentCategories={currentGameCategories}
                onCategorySelected={(category) =>
                  handleCategorySelected(category as GameCategory)
                }
              />
            </div>
            {currentGameCategories.length > 0 && (
              <div className="flex flex-col laptop:flex-row gap-4 laptop:items-center">
                <p className="text-bodyM text-gray-200">
                  {gamesData.length} games filtered by
                </p>
                <FilterTagList
                  categories={currentGameCategories}
                  onCategorySelected={(category) =>
                    handleCategoryRemoved(category as GameCategory)
                  }
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-heading2 text-gray-50 font-semibold">
                Featured games
              </h2>
              {/* <div className="relative w-full tablet:w-[calc(100%+16px)] laptop:w-[calc(100%+24px)]">
                <Carousel
                  responsive={responsive}
                  arrows={false}
                  showDots
                  itemClass="tablet:pr-6 flex flex-col"
                  dotListClass="absolute bottom-2 gap-2"
                  containerClass="pb-12"
                >
                  {featuredGames.map((game, index) => (
                    <FeaturedGameCard
                      key={index}
                      title={game.title}
                      description={game.description}
                      coverImageURL={game.coverImageURL}
                      additionalClassname="flex-1"
                    />
                  ))}
                </Carousel>
              </div> */}
            </div>
            <div className="flex flex-col gap-6">
              {getFileteredGames().map((game, index) => (
                <GameCard
                  key={index}
                  title={game.title}
                  description={game.description}
                  iconURL={game.iconURL}
                  categories={game.categories}
                  playNowButtonText={game.playNowButtonText}
                  illustrationImageURLs={game.illustrationImageURLs}
                  additionalInformation={game.additionalInformation}
                  isNotReleasedYet={game.isNotReleasedYet}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
