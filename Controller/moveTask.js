const Task = require("../model/taskModel");
const List = require("../model/listModel"); // Ensure you have a List model

const moveTask = async (req, res) => {
  try {
    const { taskId, newListId } = req.body;

    if (!taskId || !newListId) {
      return res.status(400).json({ message: "Task ID and New List ID are required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newList = await List.findById(newListId);
    if (!newList) {
      return res.status(404).json({ message: "New list not found" });
    }

    task.list = newListId;
    await task.save();

    res.status(200).json({ message: "Task moved successfully", task });
  } catch (error) {
    console.error("Move Task Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { moveTask };
