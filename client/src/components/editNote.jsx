import { useContext, useState, useEffect } from "react";
import { Context } from "../context/notes";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
function EditNote() {
  const { setShowEditNote, notesID, setRefresh } = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [singleNoteData, setSingleNoteData] = useState("");

  // updating the note
  const updateNotes = async (e) => {
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
    try {
      const response = await axios.put(
        import.meta.env.VITE_NOTE_URL + "update",
        { title, content, notesID }
      );
      // console.log(response.data.message);
      toast.success(response.data.message, { position: "top-center" });
      setContent("");
      setTitle("");
      setError("");
      setShowEditNote(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    } finally {
      setRefresh(true);
    }
  };

  // fetching the single note
  useEffect(() => {
    const singleNote = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_NOTE_URL + `singleNote/${notesID}`
        );
        // console.log(response.data.note);
        setSingleNoteData(response.data.note);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    };
    singleNote();
  }, []);
  return (
    <div className="bg-black bg-opacity-30 w-full h-full P-1 md:p-2 rounded absolute inset-0 flex items-center justify-center transition-colors ease-in-out">
      <form
        className="w-[70%] md:w-[50%] lg:w-[30%] bg-white px-3 py-4 rounded relative"
        onSubmit={updateNotes}
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
            defaultValue={singleNoteData?.title}
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
            defaultValue={singleNoteData?.content}
            rows={10}
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          ></textarea>
        </div>

        {/* error zone */}
        {error && <p className="form-error">{error}</p>}

        {/* add note button */}
        <button
          type="submit"
          className="btn-primary font-medium mt-3 md:mt-4 lg:mt-5 p-3 flex-1"
        >
          Update Note
        </button>
        <button
          className=" text-slate-500 absolute top-1 right-1"
          onClick={() => setShowEditNote(false)}
        >
          <RxCross2 className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
export default EditNote;
