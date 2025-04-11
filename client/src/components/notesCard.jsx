import { useState, useContext } from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Context } from "../context/notes";
import { toast } from "react-toastify";
import { FcInfo } from "react-icons/fc";
import axios from "axios";
function NotesCard({ note }) {
  const { setShowEditNote, setRefresh, setNotesID, setShowNotesInfo } =
    useContext(Context);
  const [isPinned, setIsPinned] = useState(false);

  // deleting the note function
  const deleteNote = async (id) => {
    setRefresh(true);
    try {
      const response = await axios.delete(
        import.meta.env.VITE_NOTE_URL + `delete/${id}`
      );
      // console.log(response);
      toast.error(response.data.message, { position: "top-right" });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setRefresh(false);
    }
  };

  // pinning the function
  const pinnedFunction = async (id) => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_NOTE_URL + `pinnedNote/${id}`
      );
      console.log(response.data.note);
      setIsPinned(response.data.note); //true and false the pin form server
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };
  return (
    <div className="border rounded p-2 md:p-3 lg:p-4 bg-white hover:bg-slate-200 hover:shadow-2xl hover:scale-[1.1] transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{note?.title}</h6>
          <span className="text-xs text-slate-500">
            {new Date(note?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-500"
          } `}
          onClick={() => pinnedFunction(note?._id)}
        />
      </div>
      <p className="text-sm md:text-lg text-slate-600 mt-1 text-wrap">
        {`${note?.content.slice(0, 40)}...`}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-xs  text-slate-500 my-1 md:my-2">
          {note?.tags.map((tag) => `#${tag}  `)}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <MdCreate
            className="icon-btn hover:text-green-500"
            onClick={() => {
              setShowEditNote(true), setNotesID(note?._id);
            }}
          />
          <FcInfo
            className="icon-btn hover:bg-blue-600 rounded-full"
            onClick={() => {
              setShowNotesInfo(true);
              setNotesID(note?._id);
            }}
          />

          <MdDelete
            className="icon-btn hover:text-danger"
            onClick={() => deleteNote(note?._id)}
          />
        </div>
      </div>
    </div>
  );
}
export default NotesCard;
