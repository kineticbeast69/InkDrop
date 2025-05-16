import { useContext } from "react";
import { Context } from "../context/notes";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
function SearchBar({ handleKeydown, readNotes }) {
  const { searchQuery, setSearchQuery } = useContext(Context);

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
        <RxCross2
          className="search-icons"
          onClick={() => {
            return setSearchQuery(""), readNotes();
          }}
        />
      )}
    </div>
  );
}
export default SearchBar;
