package com.notes.app.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.notes.app.entity.Category;
import com.notes.app.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
    long countByCategory(Category category);

}
