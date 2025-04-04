import ProfileIcons from "../components/profileIcons";
import SearchBar from "./searchBar";
function Navbar({ showProfile }) {
  return (
    <div className=" bg-white flex items-center justify-between px-3 md:px-4 lg:px-6 py-2 shadow-lg md:shadow-xl  gap-2 ">
      <h1 className="flex items-center justify-center text-2xl lg:text-3xl font-medium text-black py-1">
        InkDrop
        <span className="-ml-1">
          <img
            src="/inkdrop.svg"
            alt=""
            className="w-9 md:w-10 lg:w-12 xl:w-14 p-0 -ml-1"
          />
        </span>
      </h1>

      {showProfile && (
        <>
          {/* search bar  */}
          <SearchBar />
          {/* profile icons  */}
          <ProfileIcons />
        </>
      )}
    </div>
  );
}
export default Navbar;
