import User from "../models/user.js";

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

const getMyUsers = async (req, res) => {
  res.send(req.user)
}

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
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
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

const updateAddressField = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const updates = req.body; 

    const updateQuery = {};
    for (let key in updates) {
      updateQuery[`address.$.${key}`] = updates[key];
    }

    const user = await User.findOneAndUpdate(
      { _id: id, "address._id": addressId },
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
    const { id, phoneId } = req.params;
    const updates = req.body; 

    const updateQuery = {};
    for (let key in updates) {
      updateQuery[`phoneNumber.$.${key}`] = updates[key];
    }
    
    const user = await User.findOneAndUpdate(
      { _id: id, "phoneNumber._id": phoneId },
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

export { createUser, getMyUsers, getUserById, updateUserById, deleteUser, loginUser, logoutUser, logoutAll, updateAddressField, updatePhoneNumberField};