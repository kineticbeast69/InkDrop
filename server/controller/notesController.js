import Notes from "../model/notesModel.js";

const addNotes = async (req, res) => {
  const { title, content, tags, userID } = req.body;
  try {
    const addNote = new Notes({
      title,
      content,
      tags,
      userID,
    });
    await addNote.save();
    return res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "server error" });
  }
}; //adding the note controller
const readNotes = async (req, res) => {
  const { userID } = req.params;
  if (!userID) return res.json({ message: "No userID found" });
  try {
    const getNotes = await Notes.find({ userID }).select("-userID");
    if (getNotes.length === 0) return res.status(201).json({ getNotes: 0 });
    return res.status(201).json({ getNotes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}; //reading all the note controller
const updateNotes = async (req, res) => {
  const { title, content, notesID } = req.body;
  try {
    const updateNote = await Notes.findByIdAndUpdate(
      notesID,
      { title: title, content: content },
      { new: true }
    );
    if (!updateNote)
      return res.status(402).json({ message: "No records found" });
    return res.status(201).json({ message: "Notes edit succesfully." });
  } catch (error) {
    if (error) console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
}; // updating the note controller
const deleteNotes = async (req, res) => {
  const { notesID } = req.params;
  try {
    const deleteNote = await Notes.findByIdAndDelete(notesID);
    if (!deleteNote)
      return res.status(404).json({ message: "No records found" });
    return res.status(201).json({ message: "Note deleted succesfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}; //deleting the note controller
const singleNote = async (req, res) => {
  const { notesID } = req.params;
  // console.log(notesID);
  try {
    if (!notesID) return res.status(409).json({ message: "can't get token" });
    const note = await Notes.findById({ _id: notesID });
    if (!note) return res.status(401).json({ message: "No note found" });
    return res.status(201).json({ note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}; // getting single note controller
const pinnedNote = async (req, res) => {
  const { notesID } = req.params;
  try {
    if (!notesID) return res.status(409).json({ message: "Can't find the " });
    const noteExist = await Notes.findById({ _id: notesID });
    // return res.status(201).json({ noteExist });

    const note = await Notes.findByIdAndUpdate(
      notesID,
      { isPinned: !noteExist.isPinned }, // Correct way to update the field
      { new: true } // Optional: Returns the updated document
    );
    if (!note) return res.status(404).json({ message: "no record found." });
    return res.status(201).json({ note: note.isPinned });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}; // pinning and unpinning the note
const searchNote = async (req, res) => {
  const { userID } = req.params;
  const { query } = req.query;

  if (!userID || !query) {
    return res.status(400).json({ message: "Missing userID or query" });
  }

  try {
    const note = await Notes.find({
      userID: userID,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    // ✅ Always return 200 even if no notes found
    return res.status(200).json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  addNotes,
  readNotes,
  updateNotes,
  deleteNotes,
  singleNote,
  pinnedNote,
  searchNote,
};
