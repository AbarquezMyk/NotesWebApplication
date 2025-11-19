package com.notes.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.notes.app.dto.CategoryDTO;
import com.notes.app.entity.Category;
import com.notes.app.service.CategoryService;
import com.notes.app.service.NoteService;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryService categoryService;
    private final NoteService noteService;

    public CategoryController(CategoryService categoryService, NoteService noteService) {
        this.categoryService = categoryService;
        this.noteService = noteService;
    }

    // READ ALL
    @GetMapping("/read")
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // CREATE (using DTO)
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CategoryDTO dto) {
        try {
            Category created = categoryService.createCategory(dto.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("error", e.getMessage()));
        }
    }

    // READ ONE
    @GetMapping("/read/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return (category == null)
            ? ResponseEntity.notFound().build()
            : ResponseEntity.ok(category);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    // Categories with note counts
    @GetMapping("/all-with-count")
    public ResponseEntity<List<Map<String, Object>>> getAllWithCount() {
        List<Map<String, Object>> result = categoryService.getAllCategories().stream().map(cat -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", cat.getId());
            map.put("name", cat.getName());
            map.put("count", noteService.countNotesByCategory(cat));
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }
}