# Airdrop Front
## Dima ProCrypto

Для установки проекта на локальном компьютере необходимо:

1. Установить Node.js с офф сайта
https://nodejs.org/ru/download/

2. Клонируем репозиторий 
```sh
git clone https://github.com/parsekon/AirdropFront.git
```

4. В папке blockchain запускаем команду
```sh
cd blockchain
npm install
```

4. Создаем файл .env
```sh
touch .env
```

5. Открываем его в редакторе и вставляем следующий код:
```sh
NETWORK="sepolia"
INFURA_URL="https://sepolia.infura.io/v3/000000000xxxINFURA_URLxxx0000"
PRIVATE_KEY="000xxxPRIVATE_KEYxxx000"
ETHERSCAN_API="000XXXETHERSCAN_APIXXX000"
```
INFURA_URL можно получить на сайте: https://app.infura.io/

ETHERSCAN_API в личном кабинете https://etherscan.io/

PRIVATE_KEY копируете из своего MetaMask. 

!!! Для тестового проекта лучше НЕ использовать свой основной кошелек, 
но в файле .gitignore прописаны исключения для git на эти файлы

6. Деплоим тестовый токен
```sh
npx hardhat run scripts/deployToken.js --network sepolia
```
*вместо sepolia указываете свою сеть, например, goerli

Копируем адреса контрактов из консоли

7. Деплоим контракт Airdrop
```sh
npx hardhat run scripts/deployAirdrop.js --network sepolia
```

8. Верифицируем контракты
- Airdrop
```sh
npx hardhat verify --network sepolia ADDRESS_CONTR_AIRDROP
```
- Token
```sh
npx hardhat verify --contract contracts/TokenDrop.sol:TokenDropOne --network sepolia ADDR_TOKEN_CONTR
```
