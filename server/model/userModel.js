import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  //user model schema
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);
export default Users;
