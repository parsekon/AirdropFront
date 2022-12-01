import { ethers } from "ethers";

function Header() {

    const handleClickMetamask = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
    }



    return(
        <div className="h-100">
            <h1>Start AirDrop</h1>
            <button onClick={handleClickMetamask}>Connect MetaMask</button>
        </div>
    );
}

export default Header;