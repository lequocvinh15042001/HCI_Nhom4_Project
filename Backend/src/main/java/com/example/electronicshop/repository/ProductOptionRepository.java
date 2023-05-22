package com.example.electronicshop.repository;

import com.example.electronicshop.models.product.ProductOption;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductOptionRepository extends MongoRepository<ProductOption, String> {
    Optional<ProductOption> findByValueAndProduct_Id(String value, ObjectId productId);
    List<ProductOption> findAllByProduct_Id(ObjectId productId);
//    Optional<ProductOption> findById(String id);
    void deleteByProduct_Id(String id);
//    @Query(value = "{'value': ?0, 'product.id': ?1}")
    Optional<ProductOption> findByValueAndId(String value, ObjectId productId);
//    @Query(value = "{'product': ?0, 'value': ?1}")
//    Optional<ProductOption> findByProductAndValue(ObjectId id, String value);
}