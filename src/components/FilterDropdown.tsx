import { useEffect, useState } from "react";
import clsx from "clsx";

import {
  CheckmarkIcon,
  FilterIcon,
  SingleArrowDownIcon,
} from "./icons/GeneralIcons";
import { useOutsideClick } from "@hooks/useOutsideClick";

type FilterDropdownProps = {
  allCategories: string[];
  currentCategories: string[];
  onCategorySelected: (category: string) => void;
};

const FilterDropdown = ({
  allCategories,
  currentCategories,
  onCategorySelected,
}: FilterDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ref = useOutsideClick(() => {
    setIsDropdownOpen(false);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex gap-4 items-center justify-between border border-gray-600 rounded-xl px-3 py-2 hover:cursor-pointer hover:border-brand transition-colors ease-in-out duration-150"
        aria-label="Category dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex gap-2">
          <div className="w-5 h-5 flex items-center justify-center text-brand">
            <FilterIcon />
          </div>
          <p className="text-bodyM text-gray-200">Categories</p>
        </div>
        <div>
          <div className="w-4 h-4 flex items-center justify-center text-gray-200">
            <SingleArrowDownIcon />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="p-3 rounded-xl border border-gray-600 flex flex-col gap-2 absolute left-0 right-0 w-full top-[125%] bg-gray-1050 z-10">
          {allCategories.map((category, index) => {
            const isActive = currentCategories.includes(category);

            return (
              <li
                key={index}
                className={clsx(
                  "text-bodyM flex items-center justify-between capitalize",
                  isActive ? "text-brand" : "text-gray-200",
                  "hover:cursor-pointer hover:text-brand transition-colors ease-in-out duration-150",
                )}
                onClick={() => onCategorySelected(category)}
              >
                {category}
                <div className="w-4 h-4 flex items-center justify-center text-brand">
                  {isActive && <CheckmarkIcon />}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
