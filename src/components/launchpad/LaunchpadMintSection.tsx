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
}: {
  status: "completed" | "in_progress" | "locked";
  title: string;
  description: string;
}) => {
  const getIcon = () => {
    if (status === "completed") return <CheckmarkIcon />;
    if (status === "in_progress") return <RocketIcon />;
    if (status === "locked") return <LockIcon />;
  };

  return (
    <div className="flex flex-col gap-3 flex-1 z-10 w-[210px] max-w-[210px]">
      <div
        className={clsx(
          "w-12 h-12 p-3 flex items-center justify-center rounded-full border border-gray-600 bg-gray-1100",
          status === "in_progress" ? "text-brand" : "text-gray-200",
        )}
      >
        {getIcon()}
      </div>
      <h3
        className={clsx(
          "text-heading3 font-bold",
          status === "in_progress" ? "text-white" : "text-gray-200",
        )}
      >
        {title}
      </h3>
      <p
        className={clsx(
          "text-bodyL",
          status === "in_progress" ? "text-white" : "text-gray-200",
        )}
      >
        {description}
      </p>
    </div>
  );
};

const MINT_DEADLINE = dayjs("2024-08-31T23:59:59");

type LaunchpadMintSectionProps = {};

const LaunchpadMintSection = ({}: LaunchpadMintSectionProps) => {
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [deadlineDifference, setDeadlineDifference] = useState(0);

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
    const interval = setInterval(() => {
      const difference = dayjs(MINT_DEADLINE).diff(dayjs());

      if (difference <= 0) {
        setDeadlineDifference(0);
      } else {
        setDeadlineDifference(dayjs(MINT_DEADLINE).diff(dayjs()));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineDifference]);

  const zeroPadValue = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col laptop:flex-row laptop:items-start laptop:justify-between gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-heading4 laptop:text-heading2 font-bold">
            Phase 2 mint will end in:
          </h2>
          <p className="text-displayXS laptop:text-displayS font-formula">
            {zeroPadValue(days)}
            <span className="text-brand">d</span>&nbsp;{zeroPadValue(hours)}
            <span className="text-brand">h</span>&nbsp;{zeroPadValue(minutes)}
            <span className="text-brand">m</span>&nbsp;{zeroPadValue(seconds)}
            <span className="text-brand">s</span>
          </p>
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
            status="completed"
            title="Phase 1 Mint"
            description="The mint is over. Thank you to all who supported Tarochi early!"
          />
          <MintTimelineItem
            status="in_progress"
            title="Phase 2 Mint"
            description="This mint is currently ongoing. Mint while you can! Lorem ipsum dolor sit amet."
          />
          <MintTimelineItem
            status="locked"
            title="Phase 3 Mint"
            description="This mint is will be available shortly once the previous mint ends."
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchpadMintSection;
