import userSchema from "../scheme/userSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  console.log(user);

  if (user && password === user.password) {
    // Password is correct, so send user data and token
    generateToken(res, user._id);

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If user is not found or password is incorrect, throw an error
    res.status(401);
    throw new Error("Invalid user or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await userSchema.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("email already exist");
  }
  const user = await userSchema.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Please enter the correct details ");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "you are log out sucessfully",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userSchema.findById(req.user._id);
  if (user) {
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("no user Exist");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userSchema.findById(req.user._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updated_User = await user.save();

    res.status(200).json({
      userId: updated_User._id,
      name: updated_User.name,
      email: updated_User.email,
      isAdmin: updated_User.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("user Not Found ");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userSchema.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Something Went Wrong ");
  }
});

const deleteUsers = asyncHandler(async (req, res) => {
  const user = await userSchema.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can't delete This user Parmission requires");
    }

    await userSchema.deleteOne(user._id);
    res.send("yes its deleted ");
  } else {
    res.status(500);
    throw new Error("user not found ");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userSchema.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("user not Found ");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  // Find the user by ID and exclude the password
  const user = await userSchema.findById(req.params.id).select("-password");
  if (user) {
    // Update the fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : Boolean(req.body.isAdmin);

    try {
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to update user");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUserById,
  updateUser,
};
