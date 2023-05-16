<!-- REQUIREMENTS -->
### ABOUT THE EXERCISE/PRACTICE PROJECT
This is an NFT smart contract example. The NFT Collection Name is "Spacebear" and the contract allows to add various images as NFTs under this collection. The smart contract follows [ERC721](https://eips.ethereum.org/EIPS/eip-721) specs.


<!-- BUILT WITH -->
### Built With
* Solidity

### Run With
* Truffle
* Ganache


<!-- GETTING STARTED -->
## Getting Started
For this project, there is a set of tools required to run the project. Follow the instructions in the following sections to get it all setup.

### Prerequisites
To run the project, you'll need to have `node`(v12 or later)  & `npm` installed. 
To check if the tools have been installed, run the following commands on a terminal window:
```sh
npm -v
node -v
git --version
```
If an error or a message is displayed instead of a version output, it means you'll have to install them. You can search how to install them on Windows & Mac. The commands shown in this section  were run on Ubuntu 20.04 LTS. For Windows, you can run on an WSL terminal.

To install this tools, run the following commands (Linux):
```sh
sudo apt install node
```
```sh
sudo apt install npm
```

### Install Truffle
To install `truffle`, run the following command:
```sh
sudo npm install -g truffle
```
This will install truffle in your global npm directory.

### Running the project
Before starting the project, run the following commands:
```sh
npm install
```
```sh
truffle compile
```
```sh
truffle develop
```
This command will spawn an interactive console where you can type commands. Type the following command:
```sh
> migrate
```
After running this command, the nft smart contract will run in the truffle development blockchain environment. But we can run this on a different blockchain network, for example, [ganache](https://trufflesuite.com/docs/ganache/).

### Running the project on Ganache🍫
First, install ganache
```sh
sudo npm install -g ganache
```
Now, run ganache by writing in the terminal:
```sh
ganache
```  
On a separate terminal, run the following commnad:
```sh
truffle migrate --network ganache
```

### Interacting with the smart contract
To interact with the smart contract deployed in the ganache network, first run following command:
```sh
truffle console --network ganache
```
This will open an interactive javascript console. For interacting with the smart contract, you can use the [web3js](https://web3js.readthedocs.io/en/v1.10.0/). For example:
```sh
truffle(ganache)> const spacebear = await Spacebear.deployed()
trufffle(ganache)> spacebear.name()
```
This example outputs the stored name of the NFT collection name.
For further testing, you can execute in the same way other methods of the `Spacebear.sol` smart contract.

<!-- CONTACT -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- License -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.


## Acknowledgments
[Read-me File Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md?plain=1)   
[openzepellin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master)  
[Thomas Wiesner](https://ethereum-blockchain-developer.com/000-introduction/01-your-instructor/)


## Contacts
[![@nozotrox][Twitter-badge]](https://twitter.com/nozotrox)   
[![@nozotrox][Github-badge]](https://github.com/nozotrox)  
[![@nozotrox][LinkedIn-badge]](http://www.linkedin.com/in/feliciano-jr-mazoio)   
![feliciano.j.a.mazoio@gmail.com][Gmail-badge]



[Twitter-badge]:https://img.shields.io/badge/Twitter-1DA1F2?style=social&logo=twitter&logoColor=blue&label=@nozotrox
[Github-badge]:https://img.shields.io/badge/GitHub-100000?style=social&logo=github&label=nozotrox&logoColor=#242424
[LinkedIn-badge]:https://img.shields.io/badge/LinkedIn-0077B5?style=social&logo=linkedin&label=Feliciano_Mazoio&logoColor=blue
[Gmail-badge]:https://img.shields.io/badge/Gmail-D14836?style=social&logo=gmail&label=feliciano.j.a.mazoio@gmail.com&logoColor=red