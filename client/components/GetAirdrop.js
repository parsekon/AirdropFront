import { useEffect, useState } from "react";
import airdropWithSigner from "../abi/contracts/airdropWithSigner";
import getDataAirdrop from "../utils/getDataAirdrop";

const GetAirdrop = () => {
  const [currentAddress, setCurrentAddress] = useState();
  const [info, setInfo] = useState({});
  const [isLoader, setLoader] = useState(false);
  const [isAmount, setAmount] = useState(true);
  const [balance, setBalance] = useState();

  useEffect(() => {
    setCurrentAddress(sessionStorage.getItem("login"));
    console.log("currentAddress:", currentAddress);
    (async () => {
      try {
        setLoader(!isLoader);
        setInfo(await getDataAirdrop());
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(!isLoader);
        setAmount(false);
      }
    })();
    console.log("Drop info:", info);
  }, [isAmount]);

  const handleGetDropClick = async () => {
    try {
      const tx = await airdropWithSigner().getAirdrop();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleGetDropWithApproveClick = async () => {
    try {
      const tx = await airdropWithSigner().getAirdropWithApprove();
      const response = await tx.wait();
      console.log("response >", response);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="flex place-content-center mt-24">
      <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Get Airdrop
        </h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-5xl font-extrabold tracking-tight">
            {isLoader ? 0 : info.amountDrop}
          </span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            {" "}
            tokens
          </span>
        </div>

        <button
          onClick={
            balance > 0 ? handleGetDropClick : handleGetDropWithApproveClick
          }
          type="button"
          className="text-white bg-blue-600 mt-8 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Claim tokens
        </button>
      </div>
    </div>
  );
};

export default GetAirdrop;
