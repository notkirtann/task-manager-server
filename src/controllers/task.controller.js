import Task from "../models/tasks.js";

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
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ error: "Error fetching tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    // const task = await Task.findByIdAndUpdate(
    //   req.params.id, 
    //   req.body, 
    //   { new: true, runValidators: true }
    // );

    const task = await Task.findById(req.params.id)
    updates.forEach((update)=> task[update] = req.body[update])
    task.save()


    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteTask = async (req,res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.send(400).send()   
        }
        
    } catch (error) {
        res.status(500).send()
    }
}

export { createTask, getAllTasks, getTaskById, updateTaskById,deleteTask };