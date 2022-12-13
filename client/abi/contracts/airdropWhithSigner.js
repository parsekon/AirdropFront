import walletProvider from "../providers/walletProvider";
import contractAirdrop from "./airdrop";


const contractAirdropWithSigner = () => {
    const signer = walletProvider?.getSigner();
    return contractAirdrop.connect(signer);
}

export default contractAirdropWithSigner; 