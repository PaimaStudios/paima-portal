import { GameCategory } from "@pages/Games";
import { CloseIcon } from "./icons/GeneralIcons";

type GamesFilterTagListProps = {
  categories: GameCategory[];
  onCategorySelected: (category: GameCategory) => void;
};

const GamesFilterTagList = ({
  categories,
  onCategorySelected,
}: GamesFilterTagListProps) => {
  return (
    <div className="flex flex-wrap laptop:flex-nowrap gap-3">
      {categories.map((category, index) => {
        return (
          <div
            key={index}
            className="text-bodyM flex gap-1 items-center justify-center capitalize hover:cursor-pointer transition-colors ease-in-out duration-150 text-gray-50 py-1 pr-2 pl-3 border border-brand rounded-2xl bg-gray-800"
          >
            {category}
            <div
              className="w-4 h-4 flex items-center justify-center text-gray-200 hover:text-brand"
              onClick={() => onCategorySelected(category)}
            >
              <CloseIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GamesFilterTagList;
