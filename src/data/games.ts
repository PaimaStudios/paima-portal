import { GameProps } from "@pages/Games";

export const gamesData: GameProps[] = [
  {
    iconURL: "/images/game-icon-tarochi.webp",
    title: "Tarochi: Monster Chronicle",
    description:
      "Tarochi is a ambitious onchain RPG, where every quest, every challenge, and every monster caught becomes a part of the blockchain history. Journey through a vast, immersive land, interacting with NPCs, unlocking achievements, and unraveling quests. Dive into this revolutionary experience on the Xai network, made seamless by Arbitrum Orbit and the powerful Paima Engine. Best of all? Embark on this adventure without the hassle of bridging, and kickstart your legend for free!",
    categories: ["retro", "multi-player"],
    isFeatured: true,
    playNowButtonText: "Play Tarochi Now",
    illustrationImageURLs: [
      "/images/game-illustration-tarochi-1.jpg",
      "/images/game-illustration-tarochi-2.jpg",
    ],
    additionalInformation: [
      {
        title: "Full control over your assets",
        description:
          "Every monster you catch isn't just a game asset; it's a unique Stateful NFT, evolving with every in-game action. And not just monsters either - all game state is uniquely owned by you and tradeable anytime.",
      },
      {
        title: "Free and smooth onchain experience",
        description:
          "Start playing Tarochi right away for free without having to connect any wallet Tarochi will create a wallet for you, and at any point you can transfer your game data to your main wallet. No bridging required.",
      },
    ],
  },
  {
    iconURL: "/images/game-icon-towerdefense.webp",
    title: "Wrath Of The Jungle: Tower Defense",
    description:
      "Experience the strategic thrill of Web3 PvP Tower Defense in Paima Studio's upcoming game. Will you fight with the animals of the jungle to defend their homes, or join the undead and summon crypts to overpower them? A classic game genre, now expanded into the world of Web3 gaming thanks to Paima Engine.",
    categories: ["strategic", "single-player"],
    isFeatured: true,
    playNowButtonText: "Play Tower Defense Now",
    illustrationImageURLs: [
      "/images/game-illustration-towerdefense-1.jpg",
      "/images/game-illustration-towerdefense-2.jpg",
    ],
    additionalInformation: [
      {
        title: "A PvP Twist To A Classic Genre",
        description:
          "Whether you're a gamer who enjoys the thrill of offense, or a classic TD veteran who excels in building an indomitable fortress of towers, Wrath Of The Jungle will quench your thirst for a competitive Tower Defense game.",
      },
      {
        title: "On Chain Gaming Meets Competitive Play",
        description:
          "WotJ is the first on-chain game to support real complexity in game logic, enabling a rich & exciting meta to be developed by the community. With Paima Whirlpool, it won't matter which crypto ecosystem you're in, you'll be able to play from your favorite wallet and prove your expertise.",
      },
    ],
  },
  {
    iconURL: "/images/game-icon-junglewars.webp",
    coverImageURL: "/images/game-cover-image-junglewars.jpg",
    title: "Jungle Wars: NFT Rumble",
    description:
      "The first casual PvP game was built to showcase the base tech underlying Paima Engine. Test your wits and craftiness while getting a feel for a completely new model of Web3 gaming.",
    categories: ["retro", "action", "strategic"],
    isFeatured: true,
    illustrationImageURLs: [
      "/images/game-illustration-junglewars-1.jpg",
      "/images/game-illustration-junglewars-2.jpg",
    ],
    additionalInformation: [
      {
        title: "Tactical Fully On-Chain Combat",
        description:
          "Outsmart your opponent in battle with Jungle Wars' deceptively simple yet psychological gameplay, and get a first taste of the future of on-chain Web3 gaming with Paima Engine. Learn what it takes to rise to the top of the Jungle, and acquire the sought-after #1 spot on the Volcaneer Stateful NFT leaderboard!",
      },
      {
        title: "Experience Cross-Chain Gameplay For The First Time",
        description:
          "Jungle Wars is the only on-chain Web3 game with full-fledged cross-chain support, thanks to our novel tech: Paima Whirlpool. Whether you're using Metamask, a Polkadot wallet, or a Cardano wallet (with more being added in the near future), you can start playing Jungle Wars immediately without having to install any new software!",
      },
    ],
  },
  // {
  //   title: "Stateful NFT Auto Battler",
  //   description:
  //     "What happens when the animals of the jungle have thousands of years to master technology? In this upcoming Paima Studio game, Stateful NFTs will play a pivotal role, giving players a taste of MMO-esque mechanics combined with exciting autobattler-based gameplay.",
  //   categories: ["retro", "action", "strategic"],
  //   isFeatured: false,
  //   isNotReleasedYet: true,
  // },
];
