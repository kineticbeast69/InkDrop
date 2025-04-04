import { useContext, useState } from "react";
import { Context } from "../context/notes";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
function AddNote({ userID }) {
  const { setShowAddNote, setRefresh } = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  // function for adding the note
  const handleNotes = async (e) => {
    setRefresh(true);
    e.preventDefault();
    if (!title.trim()) {
      setError("PLease write some title.");
      return;
    }
    if (!content.trim()) {
      setError("Please write some content.");
      return;
    }
    if (!tags.trim()) {
      setError("PLease write some tags.");
      return;
    }
    const arrayTags = tags
      .split(", ")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    try {
      const response = await axios.post(import.meta.env.VITE_NOTE_URL + "add", {
        title,
        content,
        tags: arrayTags,
        userID,
      });
      // console.log(response.data.message);
      toast.success(response.data.message, { position: "top-center" });
      setContent("");
      setTags("");
      setTitle("");
      setError("");
      setShowAddNote(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        console.log(error.response);
      }
    } finally {
      setRefresh(true);
    }
  };
  return (
    <div className="bg-black bg-opacity-30 w-full h-full P-1 md:p-2 rounded absolute inset-0 flex items-center justify-center transition-colors ease-in-out">
      <form
        className="w-[70%] md:w-[50%] lg:w-[30%] bg-white px-3 py-4 rounded relative"
        onSubmit={handleNotes}
      >
        {/* title input field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter the title"
            className="text-sm md:text-lg text-salte-950 outline-none p-1"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* content input fields */}
        <div className="flex flex-col gap-2 mt-2 md:mt-3 lg:mt-4">
          <label htmlFor="description" className="input-label">
            Content
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            rows={10}
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          ></textarea>
        </div>

        {/* tags input field */}
        <div className="flex flex-col gap-2 mt-2 md:mt-3 lg:mt-4">
          <label htmlFor="tags" className="input-label">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            placeholder="#wow, #sunny"
            className="text-sm text-slate-950 outline-none"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </div>

        {/* error zone */}
        {error && <p className="form-error">{error}</p>}

        {/* add note button */}
        <button
          type="submit"
          className="btn-primary font-medium mt-3 md:mt-4 lg:mt-5 p-3 flex-1"
        >
          Add Note
        </button>
        <button
          className=" text-slate-500 absolute top-1 right-1"
          onClick={() => setShowAddNote(false)}
        >
          <RxCross2 className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
export default AddNote;
