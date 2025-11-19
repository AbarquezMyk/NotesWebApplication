package com.notes.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.notes.app.entity.Note;
import com.notes.app.entity.Category;
import com.notes.app.repository.NoteRepository;
import com.notes.app.repository.CategoryRepository;
import com.notes.app.web.NotFoundException;
import com.notes.app.dto.NoteDTO;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final CategoryRepository categoryRepository;

    public NoteService(NoteRepository noteRepository, CategoryRepository categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }

    // CREATE using DTO
    public Note createNote(NoteDTO dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new NotFoundException("Category with id " + dto.getCategoryId() + " not found"));

        Note note = new Note();
        note.setTitle(dto.getTitle());
        note.setText(dto.getText());
        note.setCreatedAt(LocalDateTime.now());
        note.setCategory(category);

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

        if (updates.getTitle() != null) existing.setTitle(updates.getTitle());
        if (updates.getText() != null) existing.setText(updates.getText());
        if (updates.getCategory() != null) existing.setCategory(updates.getCategory());

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

    // Count notes per category
    public long countNotesByCategory(Category category) {
        return noteRepository.countByCategory(category);
    }
}