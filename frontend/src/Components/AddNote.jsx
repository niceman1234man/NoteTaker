import React, { useState } from "react";
import TagInput from "./TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

function AddNote({ noteData, type, getAllNotes, onClose }) {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [error, setError] = useState("");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [loading, setLoading] = useState(false);

    const addNewNote = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/note/add-note', {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
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

    const editNote = async () => {
        const noteId = noteData._id;
        setLoading(true);
        try {
            const response = await axiosInstance.put('/note/edit-note/' + noteId, {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                getAllNotes();
                onClose();
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

    const handleNote = () => {
        if (!title.trim() || !content.trim()) { // Trim to avoid whitespace
            setError("Please fill all fields");
            return;
        }
        setError("");
        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    };

    const handleClose = () => {
        setTitle("");  // Reset title
        setContent(""); // Reset content
        setTags([]);   // Reset tags
        onClose();
    };

    return (
        <div className="p-8 relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 bg-slate-300"
                onClick={handleClose}
                aria-label="Close"
            >
                <MdClose className="text-xl text-slate-400" />
            </button>
            <div className="flex flex-col mb-4">
                <label className="py-1">TITLE</label>
                <input
                    type="text"
                    className="border px-3 py-2"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="py-1">CONTENT</label>
                <textarea
                    className="border px-3 py-2"
                    value={content}
                    rows={5}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="py-1">TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
                className={`bg-blue-700 text-white mt-2 px-3 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                onClick={handleNote}
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Processing...' : (type === 'edit' ? 'Update' : 'Add')}
            </button>
        </div>
    );
}

export default AddNote;