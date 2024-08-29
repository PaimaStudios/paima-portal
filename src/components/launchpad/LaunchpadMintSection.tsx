import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";

import {
  CheckmarkIcon,
  LockIcon,
  RocketIcon,
} from "@components/icons/GeneralIcons";
import Button from "@components/Button";

const MintTimelineItem = ({
  status,
  title,
  description,
  isLast,
}: {
  status: "completed" | "in_progress" | "locked";
  title: string;
  description: string;
  isLast?: boolean;
}) => {
  const getIcon = () => {
    if (isLast && status !== "locked") return <CheckmarkIcon />;
    if (status === "completed") return <CheckmarkIcon />;
    if (status === "in_progress") return <RocketIcon />;
    if (status === "locked") return <LockIcon />;
  };

  return (
    <div className="flex flex-col gap-3 flex-1 z-10 w-[210px] max-w-[210px] min-w-[210px]">
      <div
        className={clsx(
          "w-12 h-12 p-3 flex items-center justify-center rounded-full border  bg-gray-1100",
          status === "in_progress" || (isLast && status !== "locked")
            ? "text-brand border-brand"
            : "text-gray-200 border-gray-600",
        )}
      >
        {getIcon()}
      </div>
      <h3
        className={clsx(
          "text-heading3 font-bold",
          status === "in_progress" ? "text-white" : "text-gray-400",
        )}
      >
        {title}
      </h3>
      <p
        className={clsx(
          "text-bodyL",
          status === "in_progress" ? "text-white" : "text-gray-400",
        )}
      >
        {description}
      </p>
    </div>
  );
};

type LaunchpadMintSectionProps = {
  timestampStartWhitelistSale?: number;
  timestampStartPublicSale: number;
  timestampEndSale: number;
};

const LaunchpadMintSection = ({
  timestampStartWhitelistSale,
  timestampStartPublicSale,
  timestampEndSale,
}: LaunchpadMintSectionProps) => {
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [deadlineDifference, setDeadlineDifference] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const days = Math.floor(deadlineDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (deadlineDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (deadlineDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((deadlineDifference % (1000 * 60)) / 1000);

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

  useEffect(() => {
    const refreshDeadline = () => {
      const deadlines = [
        timestampStartWhitelistSale ?? timestampStartPublicSale,
        timestampStartPublicSale,
        timestampEndSale,
      ];
      const nextDeadline = deadlines.find((timestamp) =>
        dayjs(timestamp).isAfter(dayjs()),
      );
      setCurrentPhase(
        nextDeadline === undefined
          ? deadlines.length
          : deadlines.indexOf(nextDeadline),
      );
      if (!nextDeadline) return;
      const difference = dayjs(nextDeadline).diff(dayjs());

      if (difference <= 0) {
        setDeadlineDifference(0);
      } else {
        setDeadlineDifference(dayjs(nextDeadline).diff(dayjs()));
      }
    };

    const interval = setInterval(() => {
      refreshDeadline();
    }, 1000);

    refreshDeadline();

    return () => clearInterval(interval);
  }, [
    deadlineDifference,
    timestampEndSale,
    timestampStartPublicSale,
    timestampStartWhitelistSale,
  ]);

  const zeroPadValue = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const getTimelineItemStatus = (index: number) => {
    if (index < currentPhase) return "completed";
    if (index === currentPhase) return "in_progress";
    return "locked";
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col laptop:flex-row laptop:items-start laptop:justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-heading4 laptop:text-heading2 font-bold">
            {currentPhase < 2
              ? "Next phase will begin in:"
              : currentPhase === 2
              ? "Current phase will end in:"
              : "Sale has concluded!"}
          </h2>
          {currentPhase < 3 && (
            <p className="text-displayXS laptop:text-displayS font-formula">
              {zeroPadValue(days)}
              <span className="text-brand text-heading2 laptop:text-displayXS">
                d
              </span>
              &nbsp;
              {zeroPadValue(hours)}
              <span className="text-brand text-heading2 laptop:text-displayXS">
                h
              </span>
              &nbsp;
              {zeroPadValue(minutes)}
              <span className="text-brand text-heading2 laptop:text-displayXS">
                m
              </span>
              &nbsp;
              {zeroPadValue(seconds)}
              <span className="text-brand text-heading2 laptop:text-displayXS">
                s
              </span>
            </p>
          )}
        </div>
        <Button outlineVariant text="Play game now!" />
      </div>
      <div className="overflow-x-auto" ref={wrapperRef}>
        <div className="flex items-start gap-10 relative">
          <div
            className="w-full h-[2px] absolute left-0 right-0 top-[24px] bg-gray-600"
            ref={horizontalLineRef}
          />
          <MintTimelineItem
            status={getTimelineItemStatus(0)}
            title="Before the sale"
            description="Waiting for the sale to start."
          />
          {timestampStartWhitelistSale !== undefined && (
            <MintTimelineItem
              status={getTimelineItemStatus(1)}
              title="Whitelist sale phase"
              description="The whitelisted addresses are able to participate in the sale."
            />
          )}
          <MintTimelineItem
            status={getTimelineItemStatus(2)}
            title="Public sale phase"
            description="The sale is open to everyone."
          />
          <MintTimelineItem
            status={getTimelineItemStatus(3)}
            title="Sale ended"
            description="The sale is over. Thank you for participating!"
            isLast
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadMintSection;
