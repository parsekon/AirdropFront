import { useEffect, useRef, useState } from "react";
import airdropWithSigner from "../abi/contracts/airdropWithSigner";
import getDataAirdrop from "../utils/getDataAirdrop";
import FormSetDrop from "./FormSetDrop";
import InfoDrop from "./InfoDrop";

const SetAirdrop = () => {
  const [info, setInfo] = useState();
  const tokenRef = useRef();
  const walletRef = useRef();
  const amountDropRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        setInfo(await getDataAirdrop());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const tx = await airdropWithSigner().setTokenWalletAddrAmount(
        tokenRef.current.value,
        walletRef.current.value,
        amountDropRef.current.value
      );
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handlePausedAirdropClick = async () => {
    try {
      const tx = await airdropWithSigner().pause();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleUnpausedAirdropClick = async () => {
    try {
      const tx = await airdropWithSigner().unpause();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <FormSetDrop
        submitForm={handleSubmit}
        refToken={tokenRef}
        refWallet={walletRef}
        refDrop={amountDropRef}
        pause={info?.isPause}
        unpaused={handleUnpausedAirdropClick}
        paused={handlePausedAirdropClick}
      />
      <InfoDrop amount={info?.amountDrop} pause={info?.isPause} />
    </div>
  );
};

export default SetAirdrop;
