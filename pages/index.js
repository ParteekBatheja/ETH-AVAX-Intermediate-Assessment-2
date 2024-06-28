import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import todoList_abi from "../artifacts/contracts/Assessment.sol/TodoList.json";
import styles from '../styles/styles.module.css';

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [todoList, setTodoList] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [connected, setConnected] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const todoListABI = todoList_abi.abi;

  const getWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      setConnected(true);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
      getTodoListContract();
    } catch (error) {
      console.error("Error connecting MetaMask account:", error);
    }
  };

  const getTodoListContract = () => {
    if (!ethWallet) return;
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const todoListContract = new ethers.Contract(contractAddress, todoListABI, signer);

    setTodoList(todoListContract);
  };

  const fetchTasks = async () => {
    if (todoList) {
      const tasks = await todoList.getTasks();
      setTasks(tasks);
    }
  };

  const addTask = async () => {
    if (todoList && newTask.trim() !== "") {
      let tx = await todoList.addTask(newTask);
      await tx.wait();
      setNewTask("");
      fetchTasks();
    }
  };

  const completeTask = async (index) => {
    if (todoList) {
      let tx = await todoList.completeTask(index);
      await tx.wait();
      fetchTasks();
    }
  };

  const deleteTask = async (index) => {
    if (todoList) {
      let tx = await todoList.deleteTask(index);
      await tx.wait();
      fetchTasks();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return (
        <div className={styles.walletPrompt}>
          <p>Please install MetaMask to use the TodoList.</p>
        </div>
      );
    }

    if (!account) {
      return (
        <button className={`${styles.btn} ${styles.connectBtn}`} onClick={connectAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (tasks.length === 0) {
      fetchTasks();
    }

    return (
      <div className={styles.notebook}>
        <div className={styles.notebookCover}>
          <p>Your Account: {account}</p>
        </div>
        <div className={styles.notebookPages}>
          <div className={styles.tasks}>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className={task.completed ? styles.completedTask : ""}>
                  <div className={styles.taskContainer}>
                    <span className={styles.taskName}>{task.description}</span>
                    <div className={styles.buttonsContainer}>
                      {!task.completed && (
                        <button className={`${styles.btn} ${styles.completeBtn}`} onClick={() => completeTask(index)}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                      <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => deleteTask(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.addTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task"
              className={styles.addInput}
            />
            <button className={`${styles.btn} ${styles.addBtn}`} onClick={addTask} disabled={newTask.trim() === ""}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div className={styles.bodyStyles}>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>{connected ? "Decentralized Todo List" : "Welcome to the Decentralized Todo List!"}</h1>
        </header>
        {initUser()}
      </main>
    </div>
  );
}
