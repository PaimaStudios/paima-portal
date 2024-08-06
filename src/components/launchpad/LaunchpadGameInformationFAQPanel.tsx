import clsx from "clsx";
import { useState } from "react";

import { SingleArrowDownIcon } from "@components/icons/GeneralIcons";

const faqData = [
  {
    question: "What is the rarity of the NFTs in the game?",
    answer:
      "The rarity of NFTs in the game varies. Some NFTs are common, while others are rare or even legendary.",
  },
  {
    question: "How can I earn in-game currency?",
    answer:
      "You can earn in-game currency by completing quests, participating in events, or trading NFTs with other players.",
  },
  {
    question: "Are there any limited edition NFTs available?",
    answer:
      "Yes, there are limited edition NFTs available in the game. These NFTs are usually more valuable and harder to obtain.",
  },
  {
    question: "Can I trade my NFTs with other players?",
    answer:
      "Yes, you can trade your NFTs with other players. This allows you to exchange NFTs and potentially acquire new ones.",
  },
  {
    question: "What are the benefits of owning rare NFTs?",
    answer:
      "Owning rare NFTs can provide various benefits, such as increased in-game abilities, access to exclusive content, or higher trade value.",
  },
  {
    question: "How can I level up my NFTs?",
    answer:
      "You can level up your NFTs by participating in battles, completing challenges, or using specific in-game items.",
  },
  {
    question: "Are there any special events in the game?",
    answer:
      "Yes, there are special events in the game. These events often provide unique opportunities to earn rewards or obtain rare NFTs.",
  },
  {
    question: "Can I sell my NFTs for real money?",
    answer:
      "Yes, you can sell your NFTs for real money on supported marketplaces. However, the availability and regulations may vary depending on the platform.",
  },
  {
    question: "What happens if I lose my NFTs?",
    answer:
      "If you lose your NFTs, it may be difficult or impossible to recover them. It's important to keep your NFTs secure and backed up.",
  },
  {
    question: "How can I participate in tournaments?",
    answer:
      "To participate in tournaments, you usually need to meet certain requirements or qualifications. Keep an eye out for announcements and registration details.",
  },
  {
    question: "Are there any hidden secrets in the game?",
    answer:
      "Yes, there are hidden secrets in the game. Exploring the game world and interacting with different elements may reveal hidden surprises and rewards.",
  },
  {
    question: "Can I upgrade my NFTs?",
    answer:
      "Yes, you can upgrade your NFTs in various ways. This can include enhancing their abilities, unlocking new features, or evolving them into more powerful versions.",
  },
];

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
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

const LaunchpadGameInformationFAQPanel = () => {
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
          {faqData.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchpadGameInformationFAQPanel;
