<!-- REQUIREMENTS -->
### ABOUT THE EXERCISE/PRACTICE PROJECT
This is an NFT smart contract example. The NFT Collection Name is "Spacebear" and the contract allows to add various images as NFTs under this collection. The smart contract follows [ERC721](https://eips.ethereum.org/EIPS/eip-721) specs.
This project demonstrates a basic foundry use case.

<!-- BUILT WITH -->
### Built With
* Solidity

### Run With
* [Foundry](https://github.com/foundry-rs/foundry)


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

### Install Foundry
To install `foundry`, run the following commands:
```sh
curl -L https://foundry.paradigm.xyz | bash
```
```sh
source ~/.bashrc 
```
```sh 
foundryup
```

### Building the project
To build the project use the following command:
```sh
forge build
```

### Deployment 
To deploy the smart contract, the following [instructions](https://ethereum-blockchain-developer.com/2022-06-nft-truffle-hardhat-foundry/16-foundry-deployment/) need to be followed.

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
Instructor👨‍🏫: [Thomas Wiesner](https://ethereum-blockchain-developer.com/000-introduction/01-your-instructor/)


## Contacts
[![@nozotrox][Twitter-badge]](https://twitter.com/nozotrox)   
[![@nozotrox][Github-badge]](https://github.com/nozotrox)  
[![@nozotrox][LinkedIn-badge]](http://www.linkedin.com/in/feliciano-jr-mazoio)   
![feliciano.j.a.mazoio@gmail.com][Gmail-badge]



[Twitter-badge]:https://img.shields.io/badge/Twitter-1DA1F2?style=social&logo=twitter&logoColor=blue&label=@nozotrox
[Github-badge]:https://img.shields.io/badge/GitHub-100000?style=social&logo=github&label=nozotrox&logoColor=#242424
[LinkedIn-badge]:https://img.shields.io/badge/LinkedIn-0077B5?style=social&logo=linkedin&label=Feliciano_Mazoio&logoColor=blue
[Gmail-badge]:https://img.shields.io/badge/Gmail-D14836?style=social&logo=gmail&label=feliciano.j.a.mazoio@gmail.com&logoColor=red