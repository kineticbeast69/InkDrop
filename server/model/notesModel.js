import mongoose from "mongoose";

const notesSchema = new mongoose.Schema( //notes model schema
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], required: true, default: [] },
    isPinned: { type: Boolean, default: false },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
