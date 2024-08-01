import React, { useState } from "react";
import Markdown from "react-markdown";

import { SingleArrowDownIcon, StarIcon } from "@components/icons/GeneralIcons";
import LaunchpadGameInformationFAQPanel from "./LaunchpadGameInformationFAQPanel";

enum HeadingType {
  HEADING2 = "heading2",
  HEADING3 = "heading3",
  HEADING4 = "heading4",
  HEADING5 = "heading5",
  HEADING6 = "heading6",
}

enum ContentType {
  TEXT = "text",
  LIST = "list",
  GALLERY = "gallery",
}

type DataType = {
  sideImageURL?: string;
  body: (
    | {
        type: HeadingType;
        content: string;
      }
    | {
        type: ContentType.TEXT;
        content: string;
      }
    | {
        type: ContentType.LIST;
        content: string[];
      }
    | {
        type: ContentType.GALLERY;
        imageURLs: string[];
      }
  )[][];
}[];

const data: DataType = [
  {
    sideImageURL: "/images/tarochi-launchpad-overview.jpg",
    body: [
      [
        {
          type: HeadingType.HEADING2,
          content: "What is Tarochi?",
        },
        {
          type: ContentType.TEXT,
          content:
            "Tarochi is an ambitious onchain RPG, where every quest, every challenge, and every monster caught becomes a part of the blockchain history. Journey through a vast, immersive land, interacting with NPCs, unlocking achievements, and unraveling quests.",
        },
        {
          type: ContentType.TEXT,
          content:
            "Dive into this revolutionary experience on the Xai network, made seamless by Arbitrum Orbit and the powerful Paima Engine. Best of all? Embark on this adventure without the hassle of bridging, and kickstart your legend for free!",
        },
      ],
    ],
  },
  {
    body: [
      [
        {
          type: HeadingType.HEADING2,
          content: "Tarochi Tokenomics",
        },
        {
          type: ContentType.TEXT,
          content:
            "Tarochi comes with three primary components to its tokenomics model:",
        },
        {
          type: ContentType.LIST,
          content: [
            "**Tarochi Monsters:** tradeable as NFTs including limited-time monsters, supply-limited monsters and unlimited supply free-to-play monsters",
            "**Tarochi Gold:** an in-game currency earned through competing against other players globally",
            "**Paima ecosystem token:** a token that will power the Paima ecosystem across games (whitepaper pending)",
          ],
        },
        {
          type: ContentType.TEXT,
          content:
            "Dive into this revolutionary experience on the Xai network, made seamless by Arbitrum Orbit and the powerful Paima Engine. Best of all? Embark on this adventure without the hassle of bridging, and kickstart your legend for free!",
        },
      ],
      [
        {
          type: HeadingType.HEADING3,
          content: "Tarochi Monsters",
        },
        {
          type: ContentType.TEXT,
          content:
            "Every wild area in Tarochi contains monsters that you can battle for experience points or to capture. Monsters come in a variety of rarity:",
        },
        {
          type: ContentType.LIST,
          content: [
            "**Common and Uncommon:** unlimited supply (for F2P players)",
            "**Rare, Epic, Legendary:** global daily supply limit between players",
            "**Limited Edition:** can only be caught during a limited-time campaign",
          ],
        },
        {
          type: ContentType.TEXT,
          content:
            "Dive into this revolutionary experience on the Xai network, made seamless by Arbitrum Orbit and the powerful Paima Engine. Best of all? Embark on this adventure without the hassle of bridging, and kickstart your legend for free!",
        },
        {
          type: ContentType.TEXT,
          content: "Notably, respawn rates are as follows:",
        },
        {
          type: ContentType.LIST,
          content: [
            "Rare: every hour",
            "Epic: every 4hrs",
            "Legendary: every 17hrs",
          ],
        },
        {
          type: ContentType.TEXT,
          content:
            "With the exception of Limited Edition monsters, each monster has a soft-cap on its level based on its rarity. Once the monster reaches the soft-cap level, it can only be leveled up by fusing copies of the same monster into it. This means even monsters you already own are still valuable, and acts as a deflationary pressure on the new limited supply monsters that appear daily.",
        },
        {
          type: ContentType.TEXT,
          content:
            "You can read more about monster trading in the [wiki](https://tarochi.fandom.com/wiki/Monster_Trading)",
        },
        {
          type: ContentType.GALLERY,
          imageURLs: [
            "/images/tarochi-information-image-2.jpg",
            "/images/tarochi-information-image-1.jpg",
          ],
        },
      ],
      [
        {
          type: HeadingType.HEADING3,
          content: "Tarochi Gold",
        },
        {
          type: ContentType.TEXT,
          content:
            "Tarochi features Tarochi Gold (TGold) as the onchain currency for the world. Tarochi Gold is earned from competitive actions like participating in Arena battles against other players. Tarochi gold has a limited yet growing supply, and allows players to purchase whitelist cards to have a significant edge in capturing rare monsters. This IS meant to have financial value on the open market as it has a limited growth in supply and will trade starting with Arbitrum One. The initial supply of TGold will come purely from this pre-order + $3770 worth of TGold given to the top players of Jungle Wars: Tower Defense.",
        },
        {
          type: ContentType.TEXT,
          content:
            "Notably, the primary way to earn Tarochi Gold is to participate in Arena battles. Arena battles are a type of PVP where users do not all have to online at the same time. Instead, there are multiple arena matches going on in parallel continuously, and the champion of the arena at any given point earns Tarochi Gold (with participants who are not champions earning Tarochi Silver instead). To semi-active play, the arena is reset every 24hrs. When you battle a player in the arena, you are battles against an AI that controls their monsters, allowing multiple battles against the reigning champion to happen in parallel. The player with the highest score (defined by how well you did) by the end of the rotation becomes the new champion for that slot. Think of it like a fast-paced best player wins tournament. Our goal is to encourage a social fabric such as guilds working together and pooling rewards or players renting out monsters in exchange for a cut of any arena rewards.",
        },
      ],
    ],
  },
  {
    body: [
      [
        {
          type: HeadingType.HEADING2,
          content: "Genesis Trainer Collection",
        },
        {
          type: ContentType.TEXT,
          content:
            "Pre-ordering for the Genesis Trainer tier gives you a Genesis Trainer NFT which will sent to your wallet once the pre-order is complete and provides multiple benefits including whitelist slots for limited-edition monsters, loyalty rewards and accelerated progress in-game (see Tarochi season pass section above for more information).",
        },
      ],
      [
        {
          type: HeadingType.HEADING3,
          content: "Collection layout",
        },
        {
          type: ContentType.TEXT,
          content:
            "Genesis Trainers are capped at a 10,000 supply limit. Every purchase of the Genesis Trainer tier will get you an additional NFT once the pre-order is complete.",
        },
        {
          type: ContentType.LIST,
          content: [
            "Rare: every hour",
            "Epic: every 4hrs",
            "Legendary: every 17hrs",
          ],
        },
        {
          type: ContentType.TEXT,
          content:
            "For every increase in rarity of the frame, one rank is removed per trainer. (ex: for the golden frame, there will only be one rank 3 for a given trainer). To round it down to 10,000 NFTs, 80 red frame cards will be removed at random",
        },
      ],
    ],
  },
];

function LinkRenderer(props: JSX.IntrinsicElements["a"]) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const LaunchpadGameInformation = () => {
  const renderHeading = (type: HeadingType, content: string) => {
    switch (type) {
      case HeadingType.HEADING2:
        return (
          <h3 className="text-heading2 font-semibold text-gray-50">
            {content}
          </h3>
        );
      case HeadingType.HEADING3:
        return (
          <h3 className="text-heading3 font-semibold text-gray-50">
            {content}
          </h3>
        );
      case HeadingType.HEADING4:
        return (
          <h4 className="text-heading4 font-semibold text-gray-50">
            {content}
          </h4>
        );
      case HeadingType.HEADING5:
        return (
          <h5 className="text-heading5 font-semibold text-gray-50">
            {content}
          </h5>
        );
      case HeadingType.HEADING6:
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
              <div className="flex flex-col gap-8 laptop:gap-16">
                {panel.body.map((section, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-4">
                      {section.map((item, index) => {
                        // render paragraph
                        if (item.type === ContentType.TEXT) {
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

                        if (item.type === ContentType.GALLERY) {
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
                        if (item.type === ContentType.LIST) {
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

                        // render heading
                        if (
                          (Object.values(HeadingType) as string[]).includes(
                            item.type,
                          )
                        ) {
                          return (
                            <React.Fragment key={index}>
                              {renderHeading(
                                item.type as HeadingType,
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
      <LaunchpadGameInformationFAQPanel />
    </>
  );
};

export default LaunchpadGameInformation;
