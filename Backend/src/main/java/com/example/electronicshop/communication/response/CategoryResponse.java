package com.example.electronicshop.communication.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private String id;
    private String name;
    private String state;
    private String category_image;

    public CategoryResponse(String id, String name, String state) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}
