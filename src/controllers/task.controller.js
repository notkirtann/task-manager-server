import Task from "../models/task.js";

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('userId', 'name email');
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Error fetching tasks" });
  }
};

const updateTaskById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    updates.forEach(update => task[update] = req.body[update]);
    await task.save();
    
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}

export { createTask, getAllTasks, updateTaskById, deleteTask };