import { useEffect, useState } from "react";
import contractAirdropWithSigner from "../abi/contracts/airdropWhithSigner";
import getDataAirdrop from "../utils/getDataAirdrop";

const GetAirdrop = () => {
    const [currentAddress, setCurrentAddress] = useState();
  const [info, setInfo] = useState({});

  useEffect(() => {
    setCurrentAddress(sessionStorage.getItem("login"));
    console.log("currentAddress:", currentAddress);
    (async () => {
      try {
        setInfo(await getDataAirdrop());
      } catch (error) {
        console.error(error);
      }
    })();
    console.log("Drop info:", info);
  }, []);

  const handleGetDropClick = async () => {
    try {
      const tx = await contractAirdropWithSigner().getAirdrop();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {}
  };

  const handleGetDropWithApproveClick = async () => {
    try {
      const tx = await contractAirdropWithSigner().getAirdropWithApprove();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {}
  };

    return(
        <div>
            <h1>Получить AirDrop</h1>
            <h2>{info.amountDrop}</h2>
            <button onClick={handleGetDropClick}>Claim</button>
            <button onClick={handleGetDropWithApproveClick}>Claim with approve</button>
        </div>
    )
}

export default GetAirdrop;