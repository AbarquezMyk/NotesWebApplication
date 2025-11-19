package com.notes.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.notes.app.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    boolean existsByNameIgnoreCase(String name); // optional: check duplicates
}
