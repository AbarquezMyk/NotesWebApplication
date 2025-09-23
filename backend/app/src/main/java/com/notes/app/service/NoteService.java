package com.notes.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.notes.app.web.NotFoundException;

import com.notes.app.entity.Note;
import com.notes.app.repository.NoteRepository;
import org.springframework.transaction.annotation.Transactional;

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

    // UPDATE
    public Note updateNote(Long id, Note updates) {
        Note existing = noteRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Note with id " + id + " not found"));

        if (updates.getText() != null) existing.setText(updates.getText());
        if (updates.getFolder() != null) existing.setFolder(updates.getFolder());

        return noteRepository.save(existing);
    }

                                                                                                                                                                                                             
    // DELETE
    @Transactional
    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NotFoundException("Note with id " + id + " not found");
        }
        noteRepository.deleteById(id);
    }
}                                                                                                                                                                                                                                                    