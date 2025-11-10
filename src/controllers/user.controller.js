import User from "../models/user.js";
import Task from "../models/task.js";

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.genAuthToken()
    await user.save();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.genAuthToken()
    res.send({user, token})
  } catch (e) {
    res.status(400).send('Invalid Login')
  }
}

const logoutUser = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token 
    })
    await req.user.save()
    res.send('Succesfully Logout')
  } catch (e) {
    res.status(500).send()
  } 
}

const logoutAll = async (req,res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send('Succesfully Logout from all session')
  } catch (e) {
    res.status(500).send('Unable to logout from All session')
  }
}

const getMyProfile = async (req, res) => {
  res.send(req.user)
}

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    
    res.send(req.user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateAddressField = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const updates = req.body; 

    const updateQuery = {};
    for (let key in updates) {
      updateQuery[`address.$.${key}`] = updates[key];
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, "address._id": addressId },
      { $set: updateQuery },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "User or address not found" });
    }

    res.send({
      message: "Address updated successfully",
      updatedUser: user
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePhoneNumberField = async (req, res) => {
  try {
    const { userId, phoneId } = req.params;
    const updates = req.body; 

    const updateQuery = {};
    for (let key in updates) {
      updateQuery[`phoneNumber.$.${key}`] = updates[key];
    }
    
    const user = await User.findOneAndUpdate(
      { _id: userId, "phoneNumber._id": phoneId },
      { $set: updateQuery },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "User or phone number not found" });
    }

    res.send({
      message: "Phone number updated successfully",
      updatedUser: user
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const removeAddressField = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { address: { _id: addressId } } }, // remove that address object
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "User or address not found" });
    }

    res.send({
      message: "Address removed successfully",
      updatedUser: user
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne()
    await Task.deleteMany({ownerId : req.user._id})
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const userController ={
  createUser, getMyProfile, updateUser, deleteUser, loginUser, logoutUser, logoutAll, updateAddressField, updatePhoneNumberField, removeAddressField
}

export default userController;