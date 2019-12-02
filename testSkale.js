const Web3 = require("web3"); // version 1.0.0-beta.35

const {
  TerminalHttpProvider,
  EnvironmentTypes,
  Web3Versions
} = require("@terminal-packages/sdk");

let account = "0xaD7d7543188e13b63699eEF2f0B963d6d589B47D";
let schainEndpoint = "http://sip1.skalenodes.com:10046";

//Connect Web3 to your SKALE Chain
//const web3 = new Web3(new Web3.providers.HttpProvider(schainEndpoint));

const web3 = new Web3(
  new TerminalHttpProvider({
    apiKey: "zYwDsCwqeD6Sg9plihI/xQ==",
    source: "SKALE",
    host: schainEndpoint,
    projectId: "ZoanBDVJvKDlLYAM",
    environment: EnvironmentTypes.live
    //web3Version: Web3Versions.one
  })
);
//const web3 = new Web3(provider);
web3.eth.getBalance(account).then(res => console.log(res));
web3.eth
  .getTransaction(
    "0x46053709b461e47f58ab67e40a7309a5db3f5dfd9bdeba586467b4e95993b9ce"
  )
  .then(console.log);
