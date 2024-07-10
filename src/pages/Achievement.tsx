type AchievementItemProps = {
  imageURL: string;
  title: string;
  description: string;
  progressPercentage: number;
};

const achievements = [
  {
    imageURL: "/images/achievement-image.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    progressPercentage: 47,
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    progressPercentage: 23,
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 89,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 11,
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 54,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 9,
  },
  {
    imageURL: "/images/achievement-image2.jpg",
    title: "Chain Reaction Expert",
    description:
      "Complete a series of 50 interconnected events without breaking the chain in any simul...",
    progressPercentage: 23,
  },
  {
    imageURL: "/images/achievement-image3.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 89,
  },
  {
    imageURL: "/images/achievement-image4.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 11,
  },
  {
    imageURL: "/images/achievement-image5.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 54,
  },
  {
    imageURL: "/images/achievement-image6.jpg",
    title: "Decryptor Supreme",
    description:
      "Successfully decrypt 100 encrypted blocks using the Paima Engine’s built-in chain in any",
    progressPercentage: 9,
  },
];

const AchievementItem: React.FC<AchievementItemProps> = ({
  imageURL,
  title,
  description,
  progressPercentage,
}) => {
  return (
    <div className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl">
      <div className="flex gap-4 p-4 achievement-background rounded-2xl">
        <div className="w-28 h-28 rounded-xl shrink-0">
          <img src={imageURL} alt={title} className="object-cover rounded-xl" />
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-heading3 font-semibold text-gray-50">
              {title}
            </h2>
            <p className="text-bodyM text-gray-200">{description}</p>
          </div>
          <div className="w-full bg-gray-900 rounded-xl p-2 flex flex-col gap-1">
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
        </div>
      </div>
    </div>
  );
};

const TotalAchievementItem: React.FC<{
  achievementCount: number;
  progressPercentage: number;
}> = ({ achievementCount, progressPercentage }) => {
  return (
    <div className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl">
      <div className="p-4 achievement-background rounded-2xl">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-heading3 font-semibold text-gray-400">
              Total Achievements:{" "}
              <span className="text-gray-50">{achievementCount}</span>
            </h2>
          </div>
          <div className="w-full p-2 flex flex-col gap-1">
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
  return (
    <div className="w-full py-6 container">
      <div className="flex flex-col gap-12">
        <h1 className="text-heading2 tablet:text-displayS font-formula font-bold">
          Game's Achievement
        </h1>
        <div className="flex flex-col gap-3">
          <TotalAchievementItem
            progressPercentage={47}
            achievementCount={achievements.length}
          />
          {achievements.map((achievement, index) => (
            <AchievementItem
              key={index}
              imageURL={achievement.imageURL}
              title={achievement.title}
              description={achievement.description}
              progressPercentage={achievement.progressPercentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
