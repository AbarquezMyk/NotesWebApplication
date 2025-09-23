package com.notes.app.service;

import java.time.LocalDateTime;

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
}
