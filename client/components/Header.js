import { ethers } from "ethers";
import { useEffect, useState } from "react";
import walletProvider from "../abi/providers/walletProvider";

function Header() {
    const handleClickMetamask = async () => {
        await walletProvider.send("eth_requestAccounts", []);
    }


    return(
        <div className="flex justify-between p-4">
            <h1 className="text-3xl text-slate-900">AirDrop Token</h1>
            <button class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400" onClick={handleClickMetamask}>Connect MetaMask</button>
        </div>
    );
}

export default Header;