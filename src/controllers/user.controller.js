import User from "../models/users.js";

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    // const user = await User.findByIdAndUpdate(
    //   req.params.id, 
    //   req.body, 
    //   { new: true, runValidators: true }
    // );
    const user = await User.findById(req.params.id)
    updates.forEach((update)=> user[update] = req.body[update])
    user.save()

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req,res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.send(400).send()   
        }
        
    } catch (error) {
        res.status(500).send()
    }
};

const loginUser = async (req,res) =>{
   try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
    res.send(user)
    
   } catch (error) {
    res.status(400).send()
   }
}

export { createUser, getAllUser, getUserById, updateUserById,deleteUser,loginUser };