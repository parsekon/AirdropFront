import Footer from "./Footer";
import Header from "./Header";
import Head from 'next/head';
import { useEffect, useState } from "react";

function Layout({ children }) {
  const [loginAccount, setLoginAccount] = useState();
  const [needMetamask, setNeedMetamask] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    setLoginAccount(sessionStorage.getItem("login"));
    setExit(false);
    if (ethereum) {
      ethereum.on("accountsChanged", handleDisconnectMetamaskClick);
      ethereum.on("chainChanged", handleDisconnectMetamaskClick);
      return () => {
        ethereum.removeListener("accountsChanged", handleDisconnectMetamaskClick);
        ethereum.removeListener("chainChanged", handleDisconnectMetamaskClick);
      };
    }
  }, [exit]);

  const handleConnectMetamaskClick = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      setNeedMetamask(true);
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== process.env.targetChainId) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: process.env.targetChainId,}],
            });
      }
      sessionStorage.setItem("login", accounts[0]);
      setLoginAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectMetamaskClick = () => {
    sessionStorage.removeItem("login");
    setExit(true);
  };

  return (
    <div className="">
      <Head>
        <title>AirDrop</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="favicon-32x32.png" />
      </Head>
      <Header connectMetamask = {handleConnectMetamaskClick} disconnectMetamask = {handleDisconnectMetamaskClick} account = {loginAccount} />
      <div className="w-full m-auto items-center max-w-[1440px] px-6 h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
