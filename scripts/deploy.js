const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const todoList = await ToDoList.deploy();
  await todoList.deployed();

  console.log(`Contract deployed to ${todoList.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
