const Web3 = require("web3"); // version 1.0.0-beta.35
const abi = require("./abi");
const {
  TerminalHttpProvider,
  EnvironmentTypes
} = require("@terminal-packages/sdk");

const data =
  "608060405234801561001057600080fd5b5060408051808201909152600b8082527f48656c6c6f20534b414c45000000000000000000000000000000000000000000602090920191825261005591600091610060565b50602d6001556100fb565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a157805160ff19168380011785556100ce565b828001600101855582156100ce579182015b828111156100ce5782518255916020019190600101906100b3565b506100da9291506100de565b5090565b6100f891905b808211156100da57600081556001016100e4565b90565b6101d28061010a6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806320965255146100465780633fb5c1cb14610060578063ef5fb05b1461007f575b600080fd5b61004e6100fc565b60408051918252519081900360200190f35b61007d6004803603602081101561007657600080fd5b5035610102565b005b610087610107565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100c15781810151838201526020016100a9565b50505050905090810190601f1680156100ee5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60015490565b600155565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156101935780601f1061016857610100808354040283529160200191610193565b820191906000526020600020905b81548152906001019060200180831161017657829003601f168201915b505050505090509056fea265627a7a7231582064dcc11fb2265ffdf0705ec4c46250b79683aba3f75243b84f3b594f4790fe5c64736f6c634300050b0032";

let privateKey =
  "E8EDE80EC1E8566CE19EDD0D98CA6A98A0B7F4436D20620AA1E03D38ABE0EAEA";
let account = "0xaD7d7543188e13b63699eEF2f0B963d6d589B47D";

const apiKey = "zYwDsCwqeD6Sg9plihI/xQ==";
const projectID = "ZoanBDVJvKDlLYAM";

// SKALE
let schainEndpoint = "http://sip1.skalenodes.com:10046";

const web3 = new Web3(
  new TerminalHttpProvider({
    apiKey: apiKey,
    source: "SKALE",
    host: schainEndpoint,
    projectId: projectID,
    environment: EnvironmentTypes.dev
  })
);

console.log("web3 created");
let address;
web3.eth.getTransactionCount(account).then(nonce => {
  //create transaction
  var tx = {
    data: data,
    from: account,
    gasPrice: web3.eth.gasPrice,
    gas: 80000000,
    nonce: nonce
  };

  //sign transaction to deploy contract
  web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
    web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .on("receipt", receipt => {
        console.log(receipt);
        address = receipt.contractAddress;
        const contract = new web3.eth.Contract(abi, address);
        contract.methods
          .getValue()
          .call()
          .then(console.log);
      })
      .catch(console.error);
  });
});
