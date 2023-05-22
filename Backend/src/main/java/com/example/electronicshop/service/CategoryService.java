package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.CategoryRequest;
import com.example.electronicshop.communication.response.CategoryResponse;
import com.example.electronicshop.config.CloudinaryConfig;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.CategoryMap;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CloudinaryConfig cloudinary;
    private final CategoryMap categoryMap;

    public ResponseEntity<ResponseObject> findAll() {
        List<Category> list = categoryRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all category success", list));
        else
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "Cannot find category ", ""));

    }
    public ResponseEntity<ResponseObject> findCategoryById(String id)
    {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get category success", category));
        else
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "Cannot find category ", ""));
    }
    public ResponseEntity<ResponseObject> findAllCategory() {
        List<Category> categoryList = categoryRepository.findCategoryByState(Constant.ENABLE);
        if (categoryList.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all category success", categoryList));
        else
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "Cannot find category ", ""));
    }

    public ResponseEntity<ResponseObject> createCategory(CategoryRequest categoryRequest) {
        if (categoryRequest.getName() != null) {
            Optional<Category> foundCategory = categoryRepository.findCategoryByNameAndState(categoryRequest.getName(), categoryRequest.getState());
            if (foundCategory.isPresent()) {
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                        new ResponseObject("Fail", "Insert Category Fail Because Category Name exist", "")
                );
            }

            Category newcategory = new Category(categoryRequest.getName(), categoryRequest.getState());
            categoryRepository.save(newcategory);
            CategoryResponse categoryResponse = new CategoryResponse(newcategory.getId(), newcategory.getName(), categoryRequest.getState());
            if (categoryResponse != null)
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Get category success", categoryResponse));

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("false", "Cannot create category ", ""));
        } else {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject("ok", "Insert Category Fail", "")
            );
        }
    }

    public ResponseEntity<?> updateCateogryImage(String id, MultipartFile file) {
        Optional<Category> category= categoryRepository.findById(id);
        if (category.isPresent()) {
            if (file != null && !file.isEmpty()) {
                try {
                    String imgUrl = cloudinary.uploadImage(file, category.get().getCategoryimage());
                    category.get().setCategoryimage(imgUrl);
                    categoryRepository.save(category.get());
                } catch (IOException e) {
                    throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload image");
                }
            }
            CategoryResponse res = categoryMap.thisCategoryRespone(category.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Update user success", res));
        }
        throw new NotFoundException("Can not found category with id " + id );
    }
    public ResponseEntity<ResponseObject>updateCategory (String id, CategoryRequest categoryRequest) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            category.get().setName(categoryRequest.getName());
           category.get().setState(categoryRequest.getState());

                categoryRepository.save(category.get());
            CategoryResponse categoryResponse = new CategoryResponse(category.get().getId(), category.get().getName(), category.get().getState());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "update category success ", categoryResponse));

        } else {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                    new ResponseObject("ok", "update Category Fail", "")
            );
        }
    }
    public ResponseEntity<ResponseObject> deleteCategory(String id)
    {
        Optional<Category> category = categoryRepository.findCategoryByIdAndState(id, Constant.ENABLE);
        if (category.isPresent()) {
            category.get().setState(Constant.DISABLE);
            categoryRepository.save(category.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete category success", ""));
        }
        throw new NotFoundException("Can not find category");
    }

}
