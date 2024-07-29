import useConnectWallet from "@hooks/useConnectWallet";
import { networksData } from "@utils/constants";
import { Network, networks } from "@utils/types";
import { useState } from "react";
// import ReactModal from "react-modal";

type Props = {
  continueStep: (selectedChain: Network) => void;
};

const ChainSelection = ({ continueStep }: Props) => {
  const [isMetamaskModalOpen, setIsMetamaskModalOpen] = useState(false);
  const [isRabbyModalOpen, setIsRabbyModalOpen] = useState(false);
  const connectWallet = useConnectWallet();

  // todo: this will be generically defined per launchpad
  const usedNetworks = networks;
  const whitelistEnd = 1707494400000;
  const whitelistAddresses: string[] = [];

  async function handleClickChain(chain: Network) {
    const networkData = networksData[chain];
    try {
      connectWallet(networkData.type);
      // connect wallet is not Promise, need to put continueStep into useEffect dependent on some custom isWalletConnected
      continueStep(chain);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col text-white font-heading text-center">
      <p className="font-semibold text-28 sm:text-32 md:text-40">
        Choose your chain
      </p>
      <p className="text-14 sm:text-18 md:text-24">
        (all chains will be treated equally)
      </p>
      <div className="flex flex-col sm:flex-row gap-40 justify-center mt-20 mb-28">
        {usedNetworks.map((network) => {
          const networkData = networksData[network];
          return (
            <div
              key={networkData.name}
              className="flex flex-col p-20 gap-16 items-center cursor-pointer hover:bg-opacity-10 hover:bg-engine-gray rounded-2xl"
              onClick={() => {
                handleClickChain(network);
              }}
            >
              <img
                src={networkData.icon}
                className="w-[100px] md:w-[160px]"
                alt={`${networkData.name} Icon`}
              />
              <p className="text-20 sm:text-32 md:text-40 font-bold">
                {networkData.name}
              </p>
            </div>
          );
        })}
      </div>
      {/* <ReactModal
        isOpen={isMetamaskModalOpen}
        onRequestClose={() => {
          setIsMetamaskModalOpen(false);
        }}
        style={modalStyles}
        contentLabel="Install Metamask Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col gap-16 text-white font-heading text-center">
          <p className="text-white">
            You need to have the MetaMask extension installed in your browser to
            connect your wallet.
          </p>
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noreferrer"
          >
            <Button>Install MetaMask Extension</Button>
          </a>
        </div>
      </ReactModal> */}
      {/* <ReactModal
        isOpen={isRabbyModalOpen}
        onRequestClose={() => {
          setIsRabbyModalOpen(false);
        }}
        style={modalStyles}
        contentLabel="Install Metamask Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col gap-16 text-white font-heading text-center">
          <p className="text-white">
            Rabby is having issues with our mint page. Please use a different
            wallet such as MetaMask.
          </p>
          <a
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
            rel="noreferrer"
          >
            <Button>Install MetaMask Extension</Button>
          </a>
        </div>
      </ReactModal> */}
    </div>
  );
};

export default ChainSelection;
