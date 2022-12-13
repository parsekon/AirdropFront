import walletProvider from "../providers/walletProvider";
import contractAirdrop from "./airdrop";


const airdropWithSigner = () => {
    const signer = walletProvider?.getSigner();
    return contractAirdrop.connect(signer);
}

export default airdropWithSigner; 