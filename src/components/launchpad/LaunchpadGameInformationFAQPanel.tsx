import clsx from "clsx";
import { useState } from "react";

import { SingleArrowDownIcon } from "@components/icons/GeneralIcons";
import { LaunchpadFaqDataType } from "@config/launchpad";

const FAQItem = ({ question, answer }: LaunchpadFaqDataType[number]) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-gray-600">
      <div
        className="flex items-start justify-between gap-4 hover:cursor-pointer group/head"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-heading4 font-semibold text-gray-50">{question}</h3>
        <div
          className={clsx(
            "w-7 h-7 flex items-center justify-center shrink-0 p-1 border border-gray-600 rounded-lg laptop:group-hover/head:text-brand transition-colors ease-in-out duration-150",
            isOpen && "transform rotate-180 text-brand",
          )}
        >
          <SingleArrowDownIcon />
        </div>
      </div>
      {isOpen && <p className="text-bodyL text-gray-100">{answer}</p>}
    </div>
  );
};

const LaunchpadGameInformationFAQPanel = ({
  data,
}: {
  data: LaunchpadFaqDataType;
}) => {
  if (data.length === 0) {
    return null;
  }
  return (
    <div className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl">
      <div className="flex flex-col achievement-background rounded-2xl p-6 laptop:p-10 gap-8 laptop:gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-heading2 font-semibold text-gray-50">FAQ</h2>
          <p className="text-bodyL text-gray-100">
            Find answers to common questions that other players have asked
            previously about the game below.
          </p>
        </div>
        <div>
          {data.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchpadGameInformationFAQPanel;
