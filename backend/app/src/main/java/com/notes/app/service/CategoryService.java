package com.notes.app.service;

import org.springframework.stereotype.Service;
import com.notes.app.entity.Category;
import com.notes.app.repository.CategoryRepository;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public Category createCategory(String name) {
        if(categoryRepo.existsByNameIgnoreCase(name)) {
            throw new RuntimeException("Category already exists");
        }
        Category category = new Category(name);
        return categoryRepo.save(category);
    }
}
