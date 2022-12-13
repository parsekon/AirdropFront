import { useRef } from "react";
import contractAirdropWithSigner from "../abi/contracts/airdropWhithSigner";


const SetAirdrop = () => {
    const tokenRef = useRef();
    const walletRef = useRef();
    const amountDropRef = useRef();

    const handleSubmit = async () => {
        event.preventDefault();
        try {
          const tx = await contractAirdropWithSigner().setTokenWalletAddrAmount(tokenRef.current.value, walletRef.current.value, amountDropRef.current.value);
          const response = await tx.wait();
          console.log("response >", response);    
        } catch (error) {
            console.error(error)
        } finally {}
    }

    const handlePausedAirdropClick = async () => {
        try {
            const tx = await contractAirdropWithSigner().pause();
            const response = await tx.wait();
            console.log("response >", response);
        } catch (error) {
            console.error(error);
        } finally {}
    }

    const handleUnpausedAirdropClick = async () => {
        try {
            const tx = await contractAirdropWithSigner().unpause();
            const response = await tx.wait();
            console.log("response >", response);
        } catch (error) {
            console.error(error);
        } finally {}
    }

    return(
        <div>
            <h1>Set Airdrop</h1>
            <form onSubmit={handleSubmit}>
                <label className="" htmlFor="Token address">
                    Введите арес токена:
                </label>
                <input
                    className=""
                    ref={tokenRef}
                    name="token address"
                    type="text"
                    placeholder="enter token address"
                />

                <label className="" htmlFor="Wallet address">
                    Введите арес кошелька:
                </label>
                <input
                    className=""
                    ref={walletRef}
                    name="wallet address"
                    type="text"
                    placeholder="enter wallet address"
                />

                <label className="" htmlFor="Amount airdrop">
                    Введите количество токенов:
                </label>
                <input
                    className=""
                    ref={amountDropRef}
                    name="amount airdrop"
                    type="text"
                    placeholder="enter amount airdrop"
                />
                <button type="submit">Create</button>
            </form>

            <h1>Paused/Unpaused</h1>
            <button onClick={handlePausedAirdropClick}>paused</button>
            <button onClick={handleUnpausedAirdropClick}>unpaused</button>
        </div>
    )
}

export default SetAirdrop;