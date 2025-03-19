import { useState } from "react";
import { useAccount } from "wagmi";

import FilterDropdown from "@components/FilterDropdown";
import FilterTagList from "@components/FilterTagList";
import { CheckmarkIcon } from "@components/icons/GeneralIcons";
import useGetAchievements from "@hooks/useGetAchievements";
import ConnectWallet from "@components/common/ConnectWallet";

export type AchievementItemProps = {
  imageURL: string;
  title: string;
  description: string;
  categories?: string[];
  progressCurrent?: number;
  progressTotal?: number;
  timestamp?: string;
  isCompleted?: boolean;
  score?: number;
};

const dummyAchievements: AchievementItemProps[] = [
  {
    imageURL: "/images/achievement-placeholder-mystery.svg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["capture"],
    timestamp: "2021-09-01T00:00:00Z",
    isCompleted: true,
  },
  {
    imageURL: "/images/achievement-placeholder-general.svg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["capture"],
    timestamp: "2021-09-01T00:00:00Z",
    score: 45,
    progressTotal: 50,
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["landmark"],
    progressCurrent: 23,
    progressTotal: 50,
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["capture"],
    progressCurrent: 89,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 11,
    progressTotal: 100,
    timestamp: "2021-09-01T00:00:00Z",
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 54,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["pve"],
    progressCurrent: 9,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["landmark"],
    progressCurrent: 23,
    progressTotal: 50,
    timestamp: "2021-09-01T00:00:00Z",
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 89,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 11,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 54,
    progressTotal: 100,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressCurrent: 9,
    progressTotal: 100,
  },
];

const AchievementItem: React.FC<AchievementItemProps> = ({
  imageURL,
  title,
  description,
  progressCurrent,
  progressTotal,
  timestamp,
  categories,
  isCompleted,
  score,
}) => {
  return (
    <div className="border border-gray-800 rounded-2xl p-4">
      <div className="flex gap-4 rounded-2xl">
        <div className="w-28 h-28 rounded-xl shrink-0">
          <img src={imageURL} alt={title} className="object-cover rounded-xl" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex justify-between items-start gap-4 tablet:gap-0">
            <div className="flex-1 flex flex-col gap-1">
              {(timestamp || categories) && (
                <div className="flex gap-3 items-center">
                  {timestamp && (
                    <p className="text-bodyS text-gray-200">{timestamp}</p>
                  )}
                  {categories && (
                    <div className="gap-2 hidden tablet:flex">
                      {categories.map((category, index) => (
                        <div
                          key={index}
                          className="text-bodyS flex gap-1 items-center justify-center capitalize text-gray-200 py-1 px-3 border border-gray-800 rounded-2xl"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <h2 className="text-heading3 font-semibold text-gray-50">
                {title}
              </h2>
            </div>
            <div className="flex gap-2">
              {score !== undefined && (
                <div className="flex items-center justify-center p-2 tablet:py-2 tablet:px-3 border border-brand tablet:border-gray-800 rounded-xl">
                  <p className="text-bodyM text-gray-50">
                    <span className="hidden tablet:inline-block">
                      Score:&nbsp;
                    </span>
                    {score}
                  </p>
                </div>
              )}
              {isCompleted && (
                <div className="flex items-center justify-center gap-1 p-2 tablet:py-2 tablet:px-3 border border-brand rounded-xl text-brand">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <CheckmarkIcon />
                  </div>
                  <p className="text-bodyM text-brand hidden tablet:block">
                    Completed!
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-1 hidden tablet:block">
            <p className="text-bodyM text-gray-200">{description}</p>
          </div>
          {progressCurrent !== undefined && progressTotal !== undefined && (
            <div className="w-full rounded-xl py-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-bodyM text-gray-50">Progress</h3>
                <h3 className="text-bodyM text-gray-50">
                  <span className="text-brand">{progressCurrent}</span>/{progressTotal}
                </h3>
              </div>
              <div className="h-2 bg-gray-700 rounded-lg relative w-full">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-brand rounded-lg"
                  style={{ width: `${100 * progressCurrent / progressTotal}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 tablet:hidden flex flex-col gap-2">
        {categories && (
          <div className="flex gap-2 tablet:hidden">
            {categories.map((category, index) => (
              <div
                key={index}
                className="text-bodyS flex gap-1 items-center justify-center capitalize text-gray-200 py-1 px-3 border border-gray-800 rounded-2xl"
              >
                {category}
              </div>
            ))}
          </div>
        )}
        <p className="text-bodyM text-gray-200">{description}</p>
      </div>
    </div>
  );
};

const TotalAchievementItem: React.FC<{
  ownAchievementCount: number;
  allGameAchievementCount: number;
}> = ({ ownAchievementCount, allGameAchievementCount }) => {
  return (
    <div className="border border-gray-800 rounded-2xl">
      <div className="p-4 rounded-2xl">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-heading3 font-semibold text-gray-400">
              Total Achievements:&nbsp;
              <span className="text-gray-50">{ownAchievementCount}</span>
            </h2>
          </div>
          <div className="w-full py-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="text-bodyM text-gray-50">Achievement progress:</h3>
              <h3 className="text-bodyM text-gray-50">
                <span className="text-brand">{ownAchievementCount}</span>/{allGameAchievementCount}
              </h3>
            </div>
            <div className="h-2 bg-gray-700 rounded-lg relative w-full">
              <div
                className="absolute left-0 top-0 bottom-0 bg-brand rounded-lg"
                style={{ width: `${100 * ownAchievementCount / allGameAchievementCount}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Achievement() {
  const { address } = useAccount();
  const { data: achievementsData } = useGetAchievements({ address });

  const achievementCategories = achievementsData
    ? [
        ...new Set(
          Object.values(achievementsData).flatMap((game) => Object.values(game.metadata).map((item) => item.category).filter(item => item != null)),
        ),
      ]
    : [];

  const myAchievements = achievementsData
    ? Object.entries(achievementsData).flatMap(([gameId, game]) => game.user.achievements.map((achievement) => {
        return {
          gameId,
          ...achievement,
        };
      }))
    : [];

  const totalAchievements = achievementsData == null ? 0 : Object.values(achievementsData).reduce((acc, curr) => acc + Object.keys(curr.metadata).length, 0);

  const [currentAchievementCategories, setCurrentAchievementCategories] =
    useState<string[]>([]);

  const handleCategorySelected = (category: string) => {
    if (currentAchievementCategories.includes(category)) {
      setCurrentAchievementCategories(
        currentAchievementCategories.filter((c) => c !== category),
      );
    } else {
      setCurrentAchievementCategories([
        ...currentAchievementCategories,
        category,
      ]);
    }
  };

  const handleCategoryRemoved = (category: string) => {
    setCurrentAchievementCategories(
      currentAchievementCategories.filter((c) => c !== category),
    );
  };

  const getFilteredAchievements = () => {
    if (!achievementsData) {
      return [];
    }

    if (currentAchievementCategories.length === 0) {
      return myAchievements;
    }

    return myAchievements.filter((achievement) =>
      currentAchievementCategories.includes(achievementsData[achievement.gameId].metadata[String(achievement.name)].category ?? "")
    );
  };

  const filteredAchievements = getFilteredAchievements();

  return (
    <div className="w-full py-6 container">
      <div className="flex flex-col gap-6 tablet:gap-12">
        <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
          Game's Achievement
        </h1>
        {!address && (
          <div className="p-14 flex flex-col items-center justify-center gap-6 border border-gray-600 rounded-2xl">
            <h2 className="text-heading3 text-gray-50 text-center font-medium">
              Connect your wallet to see achievements
            </h2>
            <ConnectWallet />
          </div>
        )}
        {(!achievementsData || totalAchievements === 0) &&
          address && (
            <p className="text-bodyL text-gray-100">
              You haven't completed any achievements yet.
            </p>
          )}
        {achievementsData &&
          totalAchievements > 0 &&
          address && (
            <>
              <div className="flex flex-col gap-6">
                <div className="max-w-[180px]">
                  <FilterDropdown
                    allCategories={achievementCategories}
                    currentCategories={currentAchievementCategories}
                    onCategorySelected={(category) =>
                      handleCategorySelected(category)
                    }
                  />
                </div>
                {currentAchievementCategories.length > 0 && (
                  <div className="flex flex-col laptop:flex-row gap-4 laptop:items-center">
                    <p className="text-bodyM text-gray-200">
                      {myAchievements.length} achievements filtered by
                    </p>
                    <FilterTagList
                      categories={currentAchievementCategories}
                      onCategorySelected={(category) =>
                        handleCategoryRemoved(category)
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <TotalAchievementItem
                  ownAchievementCount={Object.values(achievementsData).reduce((acc, curr) => acc + curr.user.completed, 0)}
                  allGameAchievementCount={Object.values(achievementsData).reduce((acc, curr) => acc + Object.keys(curr.metadata).length, 0)}
                />
                {filteredAchievements.length === 0 &&
                  currentAchievementCategories.length > 0 && (
                    <p className="text-bodyL text-gray-100 mt-6 laptop:mt-10">
                      No achievements found for selected categories.
                    </p>
                  )}
                {filteredAchievements.map((achievement, index) => {
                  const achievementData = achievementsData[achievement.gameId].metadata[String(achievement.name)];
                  return (
                    <AchievementItem
                      key={index}
                      imageURL={achievementData.iconURI ?? "/images/achievement-placeholder-general.svg"}
                      title={achievementData.displayName}
                      description={achievementData.description}
                      progressCurrent={achievement.completedRate?.progress}
                      progressTotal={achievement.completedRate?.total}
                      timestamp={achievement.completedDate}
                      categories={achievementData.category == null ? undefined : [achievementData.category]}
                      score={achievementData?.score}
                      isCompleted={achievement.completed}
                    />
                  );
                })}
              </div>
            </>
          )}
      </div>
    </div>
  );
}
