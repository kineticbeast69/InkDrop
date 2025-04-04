import { RxCross2 } from "react-icons/rx";
import { Context } from "../context/notes";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
function NotesInfoCard() {
  const { setShowNotesInfo, notesID } = useContext(Context);
  const [data, setData] = useState([]);
  // fetching the single user
  useEffect(() => {
    const singleNote = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_NOTE_URL + `singleNote/${notesID}`
        );
        //    console.log(response.data);
        setData(response.data.note);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    singleNote();
  }, []);
  const createFunc = () => {
    const date = new Date(data.createdAt);
    const noteDate = date.toLocaleDateString();
    const noteTime = date.toLocaleTimeString();
    //     const noteHr = date.getUTCHours().toString().padStart(2, "0");
    //     const noteMin = date.getUTCMinutes().toString().padStart(2, "0");
    //     const noteSec = date.getUTCSeconds().toString().padStart(2, "0");
    //     const format = `${noteDate}-${noteHr}:${noteMin}:${noteSec}`;
    const format = `${noteDate}-${noteTime}`;
    return format;
  };
  const updateFunc = () => {
    const date = new Date(data.updatedAt);
    const noteDate = date.toLocaleDateString();
    const noteTime = date.toLocaleTimeString();
    const format = `${noteDate}-${noteTime}`;
    return format;
  };
  return (
    <div className="bg-black bg-opacity-30 w-full h-full P-1 md:p-2 rounded absolute inset-0 flex items-center justify-center transition-colors ease-in-out">
      <div className="w-[70%] md:w-[50%] lg:w-[30%] bg-white px-3 py-4 rounded relative">
        {/* title section  */}
        <div>
          <h3 className="input-title">Title</h3>
          <p className="text-xs text-slate-500">{data?.title}</p>
        </div>

        {/* content section */}
        <div className="mt-3">
          <h3 className="input-title">Content</h3>
          <p className="text-xs text-slate-500">{data?.content}</p>
        </div>

        {/* createdAt and updatedAt */}
        <div className="bg-slate-200">
          <div className="flex gap-4 items-center mt-2">
            <h3 className="input-title">Created At:</h3>
            <p className="text-xs text-slate-500">{createFunc()}</p>
          </div>
          <div className="flex gap-4 items-center mt-2">
            <h3 className="input-title">Updated At:</h3>
            <p className="text-xs text-slate-500">{updateFunc()}</p>
          </div>
        </div>
        <button
          className=" text-slate-500 absolute top-1 right-1"
          onClick={() => setShowNotesInfo(false)}
        >
          <RxCross2 className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
export default NotesInfoCard;
