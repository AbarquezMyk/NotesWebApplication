package com.notes.app.controller;

import org.springframework.web.bind.annotation.*;
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
    private final NoteService noteService;  // 🔥 Added

    public CategoryController(CategoryService categoryService, NoteService noteService) {
        this.categoryService = categoryService;
        this.noteService = noteService; // 🔥 Required
    }

    @GetMapping("/read")
    public List<Category> getAll() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/create")
    public Category create(@RequestBody Category category) {
        return categoryService.createCategory(category.getName());
    }

    // 🔥 NEW: return categories with note counts
    @GetMapping("/all-with-count")
    public List<Map<String, Object>> getAllWithCount() {
        return categoryService.getAllCategories().stream().map(cat -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", cat.getId());
            map.put("name", cat.getName());
            map.put("count", noteService.countNotesByFolder(cat.getName())); 
            return map;
        }).toList();
    }
}
