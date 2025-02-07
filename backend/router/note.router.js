import express from 'express'
import { authenticateToken } from '../utilities.js';
import { addNote,editNote,deleteNote,allNotes,editPin, searchNote} from '../controller/note.controller.js';
export const router=express.Router();
router.post('/add-note',authenticateToken,addNote);
router.put('/edit-note/:id',authenticateToken,editNote);
router.put('/pin-note/:id',authenticateToken,editPin);
router.get('/get-notes',authenticateToken,allNotes);
router.get('/search-note',authenticateToken,searchNote);
router.delete('/delete-note/:id',authenticateToken,deleteNote);
