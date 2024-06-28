// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToDoList {
    struct Task {
        string description;
        bool completed;
    }

    Task[] public tasks;
    address public owner;

    event TaskAdded(string description);
    event TaskCompleted(uint256 index);
    event TaskDeleted(uint256 index);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function addTask(string memory _description) public onlyOwner {
        tasks.push(Task({
            description: _description,
            completed: false
        }));
        emit TaskAdded(_description);
    }

    function completeTask(uint256 _index) public onlyOwner {
        require(_index < tasks.length, "Task index out of bounds");
        tasks[_index].completed = true;
        emit TaskCompleted(_index);
    }

    function deleteTask(uint256 _index) public onlyOwner {
        require(_index < tasks.length, "Task index out of bounds");
        for (uint i = _index; i < tasks.length - 1; i++) {
            tasks[i] = tasks[i + 1];
        }
        tasks.pop();
        emit TaskDeleted(_index);
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
