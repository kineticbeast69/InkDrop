import Navbar from "../components/Navbar";
import NotesCard from "../components/notesCard";
import { MdAdd } from "react-icons/md";
import AddNote from "../components/addnote";
import NotesInfoCard from "../components/notesInfoCard";
import EditNote from "../components/editNote";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/notes";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/spinner";
function Home() {
  const {
    showAddNote,
    setShowAddNote,
    showEditNote,
    setUserInfo,
    refresh,
    showNotesInfo,
    searchQuery,
    setSearchQuery,
    setRefresh,
  } = useContext(Context); //context hook
  const navigate = useNavigate();
  const { userID } = useParams();
  const [showProfile, setShowProfile] = useState(false);
  const [hasNotes, setHasNotes] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(false);

  // authenticating the user
  async function validUser() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "auth-user",
        { withCredentials: true }
      );
      setUserInfo(response.data);
      setShowProfile(true);

      // console.log(response.data);
    } catch (error) {
      if (error.response) {
        navigate("/");
        setShowProfile(false);
      }
    }
  }

  // reading the notes
  async function readNotes() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_NOTE_URL + `read/${userID}`
      );
      // console.log(response.data.getNotes);
      const data = response.data.getNotes;
      data === 0 ? setHasNotes(true) : setNoteData(response.data.getNotes);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    validUser();
    setLoading(true);

    setTimeout(readNotes, 1000);
    return () => {};
  }, [refresh]);

  // search note from searchbar func
  const handleKeydown = async (e) => {
    if (!searchQuery.trim()) return; //retruning if value is empty
    if (e.key == "Backspace") {
      //deleting the lue
      const words = searchQuery.trim().split(" ").pop();
      setSearchQuery(words.join(" "));
    }
    if (e.key === "Enter") {
      // console.log(searchQuery);
      setSearchQuery("");
    }
    try {
      const response = await axios.get(
        import.meta.env.VITE_NOTE_URL + `searchQuery/${userID}`,
        { params: { query: searchQuery } }
      );
      console.log(response.data);
      if (response.data.length === 0) {
        setHasNotes(true);
        readNotes();
      }
      setNoteData(response.data);
    } catch (error) {
      if (error.repsonse) {
        console.log(error.repsonse);
      }
    }
  };
  return (
    <>
      <Navbar
        showProfile={showProfile}
        handleKeydown={handleKeydown}
        readNotes={readNotes}
      />
      <div className="container mx-auto px-2 md:p-4">
        <div>
          {" "}
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : hasNotes ? (
            <div className="text-center mt-10 text-lg md:text-3xl lg:text-5xl text-slate-600">
              No notes found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
              {noteData.map((note) => (
                <NotesCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="bg-primary hover:bg-blue-600  w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl m-2 absolute bottom-0 right-0 hover:scale-[1.1] transition-all ease-in-out z-50"
        onClick={() => setShowAddNote(true)}
      >
        <MdAdd className="text-3xl md:text-4xl lg:text-5xl  text-white" />
      </div>
      {showAddNote && <AddNote userID={userID} />}
      {showEditNote && <EditNote />}
      {showNotesInfo && <NotesInfoCard />}
    </>
  );
}
export default Home;
