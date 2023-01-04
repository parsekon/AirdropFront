import { ethers } from "ethers";
import airdrop from "../abi/contracts/airdrop";

const getDataAirdrop = async () => {
  const owner = await airdrop.owner();
  const amountDropHex = await airdrop.amountAirdrop();
  const amountDrop = Number(amountDropHex, 10);
  const isPause = await airdrop.paused();

  return { owner, amountDrop, isPause };
};

export default getDataAirdrop;
