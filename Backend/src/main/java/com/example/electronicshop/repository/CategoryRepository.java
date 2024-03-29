package com.example.electronicshop.repository;

import com.example.electronicshop.communication.StateCountAggregate;
import com.example.electronicshop.models.enity.Category;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findCategoryByNameAndState(String name, String state);
    List<Category> findCategoryByState(String state);
    Optional<Category>findCategoryByIdAndState(String id, String state);
//    Optional<Category>existsCategoriesByNameAndState(String name, String state);
    @Aggregation("{ $group: { _id : $state, count: { $sum: 1 } } }")
    List<StateCountAggregate> countAllByState();
}
