package com.notes.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.notes.app.entity.Note;
import com.notes.app.repository.NoteRepository;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // CREATE
    public Note createNote(Note note) {
        note.setCreatedAt(LocalDateTime.now());
        return noteRepository.save(note);
    }
     // READ ALL
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // READ ONE
    public Note getNoteById(Long id) {
        Optional<Note> opt = noteRepository.findById(id);
        return opt.orElse(null); 
    }
}

