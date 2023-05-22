package com.example.electronicshop.map;

import com.example.electronicshop.communication.response.CategoryResponse;
import com.example.electronicshop.communication.response.UserResponse;
import com.example.electronicshop.models.enity.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryMap {
    public CategoryResponse thisCategoryRespone(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        if (category != null) {
            categoryResponse.setId(category.getId());
            categoryResponse.setName(category.getName());
            categoryResponse.setCategory_image(category.getCategoryimage());
            categoryResponse.setState(category.getState());
        }
        return categoryResponse;
    }
}
