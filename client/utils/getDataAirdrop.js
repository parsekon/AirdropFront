import { ethers } from "ethers";
import contractAirdrop from "../abi/contracts/airdrop";


 const getDataAirdrop = async () => {
    const owner = await contractAirdrop.owner();
    const amountDropHex = await contractAirdrop.amountAirdrop();
    const amountDrop = Number(amountDropHex, 10);
    const isPause = await contractAirdrop.paused();

    return {owner, amountDrop, isPause };
}

export default getDataAirdrop;