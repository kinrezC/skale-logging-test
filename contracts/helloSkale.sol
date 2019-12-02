pragma solidity 0.5.11;

contract HelloSKALE {
    /* Define variable greeting of the type string */
    string greeting;
    uint256 number;

    /* This runs when the contract is executed */
    constructor() public {
        greeting = "Hello SKALE";
        number = 45;
    }

    /* Main function */
    function sayHello() public view returns (string memory) {
        return greeting;
    }
    
    function getValue() public view returns (uint256) {
        return number;
    }
}

