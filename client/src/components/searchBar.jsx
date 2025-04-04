import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../context/notes";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
function SearchBar() {
  const { queryNote, setQueryNote } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const { userID } = useParams();
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
      // console.log(response.data);
      setQueryNote(response.data);
    } catch (error) {
      if (error.repsonse) {
        console.log(error.repsonse);
      }
    }
  };
  return (
    <div className="flex items-center gap-1 px-1 md:gap-2 bg-slate-50 lg:bg-slate-100 rounded">
      <label htmlFor="search">
        <HiMagnifyingGlass className="search-icons" />
      </label>
      <input
        type="text"
        id="search"
        className="w-[180px] md:w-[300px] lg:w-[400px] outline-none drop-shadow-sm bg-transparent"
        placeholder="Search notes"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        onKeyDown={(e) => handleKeydown(e)}
      />
      {searchQuery && (
        <RxCross2 className="search-icons" onClick={() => setSearchQuery("")} />
      )}
    </div>
  );
}
export default SearchBar;
