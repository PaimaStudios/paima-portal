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
  progressPercentage?: number;
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
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["landmark"],
    progressPercentage: 23,
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["capture"],
    progressPercentage: 89,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 11,
    timestamp: "2021-09-01T00:00:00Z",
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 54,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["pve"],
    progressPercentage: 9,
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    categories: ["landmark"],
    progressPercentage: 23,
    timestamp: "2021-09-01T00:00:00Z",
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 89,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 11,
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 54,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    categories: ["landmark"],
    progressPercentage: 9,
  },
];

const AchievementItem: React.FC<AchievementItemProps> = ({
  imageURL,
  title,
  description,
  progressPercentage,
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
          {progressPercentage !== undefined && (
            <div className="w-full rounded-xl py-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-bodyM text-gray-50">Progress</h3>
                <h3 className="text-bodyM text-gray-50">
                  <span className="text-brand">{progressPercentage}</span>/100
                </h3>
              </div>
              <div className="h-2 bg-gray-700 rounded-lg relative w-full">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-brand rounded-lg"
                  style={{ width: `${progressPercentage}%` }}
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
  achievementCount: number;
  progressPercentage: number;
}> = ({ achievementCount, progressPercentage }) => {
  return (
    <div className="border border-gray-800 rounded-2xl">
      <div className="p-4 rounded-2xl">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-heading3 font-semibold text-gray-400">
              Total Achievements:&nbsp;
              <span className="text-gray-50">{achievementCount}</span>
            </h2>
          </div>
          <div className="w-full py-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="text-bodyM text-gray-50">Achievement progress:</h3>
              <h3 className="text-bodyM text-gray-50">
                <span className="text-brand">{progressPercentage}</span>/100
              </h3>
            </div>
            <div className="h-2 bg-gray-700 rounded-lg relative w-full">
              <div
                className="absolute left-0 top-0 bottom-0 bg-brand rounded-lg"
                style={{ width: `${progressPercentage}%` }}
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
          achievementsData.achievements.map((item) => item.objective_type),
        ),
      ]
    : [];

  const myAchievements = achievementsData
    ? achievementsData.myAchievements.map((achievement) => {
        return {
          ...achievement,
          fullData: {
            ...achievementsData.achievements.find(
              (item) => item.id === achievement.achievement_id,
            ),
          },
        };
      })
    : [];

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
      currentAchievementCategories.includes(
        achievement.fullData.objective_type ?? "",
      ),
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
        {(!achievementsData || achievementsData?.myAchievements.length === 0) &&
          address && (
            <p className="text-bodyL text-gray-100">
              You haven't completed any achievements yet.
            </p>
          )}
        {achievementsData &&
          achievementsData.myAchievements.length > 0 &&
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
                  // TODO: Replace dummy data with real data
                  progressPercentage={47}
                  achievementCount={myAchievements.length}
                />
                {filteredAchievements.length === 0 &&
                  currentAchievementCategories.length > 0 && (
                    <p className="text-bodyL text-gray-100 mt-6 laptop:mt-10">
                      No achievements found for selected categories.
                    </p>
                  )}
                {filteredAchievements.map((achievement, index) => (
                  <AchievementItem
                    key={index}
                    // TODO: Replace dummy data with real data
                    imageURL="/images/achievement-placeholder-general.svg"
                    // TODO: Replace dummy data with real data
                    title="Achievement Title"
                    // TODO: Replace dummy data with real data
                    description="Achievement Description"
                    // TODO: Replace dummy data with real data
                    progressPercentage={15}
                    // TODO: Replace dummy data with real data
                    timestamp="2021-09-01T00:00:00Z"
                    categories={
                      achievement.fullData.objective_type
                        ? [achievement.fullData.objective_type]
                        : []
                    }
                    // TODO: Replace dummy data with real data
                    score={25}
                    isCompleted={achievement.completed}
                  />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
}
