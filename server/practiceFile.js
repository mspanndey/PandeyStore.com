const Practice = async () => {
  const user = await sending_data.create({
    name: "Manoj Pandey",
    email: "Practice@gmail.com",
  });

  const savedUser = await user.save();
  const userId = savedUser._id;

  const post = await Practic.create({
    post: "This is the new post",
    user: userId, // Correct field name
  });

  const savedPost = await post.save();
  console.log("Saved Post:", savedPost);
};

Practice();
