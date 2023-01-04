const FormSetDrop = ({
  submitForm,
  refToken,
  refWallet,
  refDrop,
  pause,
  unpaused,
  paused,
}) => {
  return (
    <div className="flex place-content-center mt-24">
      <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Set Airdrop
        </h1>
        <form onSubmit={submitForm}>
          <div class="mb-6">
            <label
              for="token address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Token address:
            </label>
            <input
              type="text"
              id="token address"
              ref={refToken}
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="token address"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="wallet address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Wallet address:
            </label>
            <input
              type="text"
              id="wallet address"
              ref={refWallet}
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="wallet address"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="amount"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount drop:
            </label>
            <input
              type="number"
              id="amount"
              ref={refDrop}
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="amount drop"
              required
            />
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>

        <h1 className="mb-4 mt-4 text-xl font-medium text-gray-500 dark:text-gray-400">
          Paused/Unpaused
        </h1>
        <button
          type="button"
          onClick={pause ? unpaused : paused}
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Paused
        </button>
      </div>
    </div>
  );
};

export default FormSetDrop;
