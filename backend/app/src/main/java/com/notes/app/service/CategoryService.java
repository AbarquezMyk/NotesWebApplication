package com.notes.app.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.notes.app.entity.Category;
import com.notes.app.repository.CategoryRepository;
import com.notes.app.web.NotFoundException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    // READ ALL
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // READ ONE
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Category with id " + id + " not found"));
    }

    // CREATE
    public Category createCategory(String name) {
        if (categoryRepo.existsByNameIgnoreCase(name)) {
            throw new RuntimeException("Category already exists");
        }
        Category category = new Category(name);
        return categoryRepo.save(category);
    }

    // UPDATE
    public Category updateCategory(Long id, String newName) {
        Category existing = categoryRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Category with id " + id + " not found"));

        if (categoryRepo.existsByNameIgnoreCase(newName)) {
            throw new RuntimeException("Category with name '" + newName + "' already exists");
        }

        existing.setName(newName);
        return categoryRepo.save(existing);
    }

    // DELETE
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepo.existsById(id)) {
            throw new NotFoundException("Category with id " + id + " not found");
        }
        categoryRepo.deleteById(id);
    }
}