import React from "react";
import Markdown from "react-markdown";

import { StarIcon } from "@components/icons/GeneralIcons";
import {
  LaunchpadInformationContentType,
  LaunchpadInformationDataType,
  LaunchpadInformationHeadingType,
} from "@config/launchpad";

function LinkRenderer(props: JSX.IntrinsicElements["a"]) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const LaunchpadGameInformation = ({
  data,
}: {
  data: LaunchpadInformationDataType;
}) => {
  const renderHeading = (
    type: LaunchpadInformationHeadingType,
    content: string,
  ) => {
    switch (type) {
      case LaunchpadInformationHeadingType.HEADING2:
        return (
          <h3 className="text-heading2 font-semibold text-gray-50">
            {content}
          </h3>
        );
      case LaunchpadInformationHeadingType.HEADING3:
        return (
          <h3 className="text-heading3 font-semibold text-gray-50">
            {content}
          </h3>
        );
      case LaunchpadInformationHeadingType.HEADING4:
        return (
          <h4 className="text-heading4 font-semibold text-gray-50">
            {content}
          </h4>
        );
      case LaunchpadInformationHeadingType.HEADING5:
        return (
          <h5 className="text-heading5 font-semibold text-gray-50">
            {content}
          </h5>
        );
      case LaunchpadInformationHeadingType.HEADING6:
        return (
          <h6 className="text-heading6 font-semibold text-gray-50">
            {content}
          </h6>
        );
    }
  };

  return (
    <>
      {data.map((panel, index) => {
        return (
          <div
            className="p-[1px] bg-gradient-to-b from-gray-850 to-gray-1000 rounded-2xl"
            key={index}
          >
            <div className="flex flex-col-reverse laptop:flex-row laptop:justify-between laptop:items-start achievement-background rounded-2xl p-6 laptop:p-10 gap-8 laptop:gap-16">
              <div className="flex flex-col gap-8 laptop:gap-16 w-full">
                {panel.body.map((section, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-4 w-full">
                      {section.map((item, index) => {
                        // render paragraph
                        if (
                          item.type === LaunchpadInformationContentType.TEXT
                        ) {
                          return (
                            <Markdown
                              key={index}
                              className="text-bodyL text-gray-100 launchpad-markdown"
                              components={{
                                a: LinkRenderer,
                              }}
                            >
                              {item.content}
                            </Markdown>
                          );
                        }

                        if (
                          item.type === LaunchpadInformationContentType.GALLERY
                        ) {
                          return (
                            <div
                              className="grid grid-cols-1 tablet:grid-cols-2 gap-4"
                              key={index}
                            >
                              {item.imageURLs.map((image, index) => {
                                return <img src={image} key={index} alt="" />;
                              })}
                            </div>
                          );
                        }

                        // render list
                        if (
                          item.type === LaunchpadInformationContentType.LIST
                        ) {
                          return (
                            <ul
                              className="text-bodyL text-gray-100 flex flex-col gap-2"
                              key={index}
                            >
                              {item.content.map((listItem, index) => (
                                <li key={index} className="flex gap-2">
                                  <div className="w-5 h-5 flex items-center justify-center text-brand shrink-0 relative top-[1px]">
                                    <StarIcon />
                                  </div>
                                  <Markdown components={{ p: "span" }}>
                                    {listItem}
                                  </Markdown>
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // render video
                        if (
                          item.type === LaunchpadInformationContentType.VIDEO
                        ) {
                          return (
                            <iframe
                              className="w-full aspect-video"
                              src={item.url}
                              title="YouTube video player"
                              allowFullScreen={true}
                            ></iframe>
                          );
                        }

                        // render heading
                        if (
                          (
                            Object.values(
                              LaunchpadInformationHeadingType,
                            ) as string[]
                          ).includes(item.type)
                        ) {
                          return (
                            <React.Fragment key={index}>
                              {renderHeading(
                                item.type as LaunchpadInformationHeadingType,
                                item.content,
                              )}
                            </React.Fragment>
                          );
                        }

                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
              {panel.sideImageURL && (
                <div className="laptop:w-[200px] laptop:h-[200px] laptop:shrink-0">
                  <img
                    src="/images/tarochi-launchpad-overview.jpg"
                    alt="Tarochi"
                    className="object-fit"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LaunchpadGameInformation;
