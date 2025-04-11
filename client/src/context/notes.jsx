import { createContext } from "react";
import { useState } from "react";
const Context = createContext();

const NoteProvider = ({ children }) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [notesID, setNotesID] = useState("");
  const [showNotesInfo, setShowNotesInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Context.Provider
      value={{
        showAddNote,
        showEditNote,
        setShowAddNote,
        setShowEditNote,
        userInfo,
        setUserInfo,
        refresh,
        setRefresh,
        notesID,
        setNotesID,
        showNotesInfo,
        setShowNotesInfo,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Context, NoteProvider };
