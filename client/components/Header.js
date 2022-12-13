import { useEffect, useState } from "react";

function Header({ connectMetamask, disconnectMetamask, account, exit }) {
  const [is, setIs] = useState(false);
  useEffect(() => {
      setIs(exit);
  }, [is]);
  return (
    <div className="flex justify-between p-4 bg-slate-900 shadow-md">
      <h1 className="text-3xl text-white">AirDrop Token</h1>
      {!account ? (
        <button
          className="bg-slate-800 border border-solid border-indigo-500  hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={connectMetamask}
        >
          Connect MetaMask
        </button>
       
      ) : (
        <button
          className="bg-slate-800 border border-solid border-indigo-500  hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          onClick={disconnectMetamask}
        >
            <i className="p-2 text-blue-300">{account.toString().slice(0, 5) + "..." + account.toString().slice(38) + "    "}</i>
              Log out
        </button>
      )}
    </div>
  );
}

export default Header;
