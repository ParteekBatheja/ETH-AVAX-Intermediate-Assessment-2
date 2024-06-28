# ETH+AVAX Intermediate Assessment - 2

A decentralized to-do list application with Solidity smart contract integration for task management and blockchain interaction.

## Description

This project implements a decentralized to-do list where tasks are managed using a Solidity smart contract deployed on the Ethereum blockchain. The smart contract allows users to add tasks, mark them as completed, and delete them. The frontend application provides a user-friendly interface to interact with these functionalities.

## Getting Started

### Installing

To run this project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ParteekBatheja/ETH-AVAX-Intermediate-Assessment-2.git
   cd ETH-AVAX-Intermediate-Assessment-2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Executing Program

To start the project, you will need to run several commands in different terminals:

1. **Start Hardhat node:**

   ```bash
   npx hardhat node
   ```

2. **Deploy the contract:**

   Open a new terminal and run:

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

3. **Start the frontend:**

   In another terminal, run:

   ```bash
   npm run dev
   ```

After completing these steps, the project will be accessible at http://localhost:3000/.

## Interacting with the Contract

Once the frontend is running, you can interact with the decentralized to-do list application:

- **Add Task**: Enter a task description and click "Add Task".
- **Complete Task**: Click the checkmark button next to a task to mark it as completed.
- **Delete Task**: Click the trash icon button to delete a task.

## Modifications

No modifications are required for basic functionality. Feel free to extend or customize the smart contract or frontend to suit additional requirements.

## Authors

Parteek Batheja  
GitHub: [@ParteekBatheja](https://github.com/ParteekBatheja)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
