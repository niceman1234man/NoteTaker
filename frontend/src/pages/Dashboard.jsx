import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import NoteCard from "../Components/NoteCard";
import Modal from "react-modal";
import AddNote from "../Components/AddNote";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import Navnar from "../Components/Navnar";
import note from "../assets/note.jpg";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function Dashboard() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [isSearch,setIsSearch]=useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      } else {
        console.error("User data not found in response");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Error:", error.response.data);
        }
      } else {
        console.error("Network or other error:", error);
      }
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/note/get-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("An expected error occurred. Please try again.", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };


  const onPinned = async (noteData) => {
    const noteId = noteData._id;
    const currentPinnedStatus = noteData.isPinned; // Get the current pinned status
    setLoading(true);
    try {
        const response = await axiosInstance.put('/note/pin-note/' + noteId, {
            isPinned: !currentPinnedStatus, // Toggle the pinned status
        });
        if (response) {
           toast.success("Note Updated successfully!");
           window.location.reload();
            getAllNotes(); // Refresh notes list
            
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        }
    } finally {
        setLoading(false);
    }
};
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/note/delete-note/" + noteId);
      if (response) {
         toast.success("Note deleted successfully!");
         window.location.reload();
        getAllNotes();
       
      }
    } catch (error) {
      console.error("An expected error occurred. Please try again.", error);
    }
  };

  const onSearch = async (query) => {
    try {
      const response = await axiosInstance.get("/note/search-note", { // Correct route
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  };
  
const closeModal = () => {
  setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
  });
};

  useEffect(() => {
    Modal.setAppElement("#root");
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navnar userInfo={userInfo} onSearchNote={onSearch} />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {loading ? (
            <p>Loading notes...</p>
          ) : allNotes.length > 0 ? (
            allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdAt}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() =>( deleteNote(item))}
                onPinNote={() => {onPinned(item)}}
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img src={note} alt="No notes available" />
              <h1>Empty Notes</h1>
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-blue-600 px-3 py-2 rounded absolute right-8 bottom-5 text-white text-[30px] sm:fixed"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <IoMdAdd />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        className="w-[40%] mx-auto mt-8 bg-white rounded"
      >
        <AddNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={closeModal}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}

export default Dashboard;