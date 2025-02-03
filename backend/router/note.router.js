import express from 'express'
import { addNote,editNote,deleteNote,allNotes } from '../controller/note.controller';
const router=express.Router();
router.post('/add-note',addNote)
router.put('/edit-note',editNote)
router.get('/get-notes',allNotes)
router.delete('/delete/:id',deleteNote)
