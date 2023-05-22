package com.example.electronicshop.models.enity;

import com.example.electronicshop.config.Constant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Category {
    @Id
    private String id;

    private String name;
    private String categoryimage;
    private String state;
    @DocumentReference
    private List<Category> subCategories;
    public Category(String name, String state) {
        this.name = name;
        this.state = state;
    }

    public List<Category> getSubCategories() {
        subCategories.removeIf(category -> (category.getState().equals(Constant.DISABLE)));
        return subCategories;
    }

    public Category(String name, String categoryimage, String state) {
        this.name = name;
        this.categoryimage = categoryimage;
        this.state = state;
    }
}
