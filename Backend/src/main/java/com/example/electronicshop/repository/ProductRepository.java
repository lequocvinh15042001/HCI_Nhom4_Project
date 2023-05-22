package com.example.electronicshop.repository;

import com.example.electronicshop.communication.StateCountAggregate;
import com.example.electronicshop.models.product.Product;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String>{
    Optional<Product> findProductByIdAndState(String id, String state);
    Page<Product> findAllByStateOrderByCreatedDateDesc(String state, Pageable pageable);
    Page<Product> findAllByCategory_IdAndStateOrderByCreatedDateDesc(ObjectId catId, String state, Pageable pageable);
    @Query(value = "{ $or: [{'category' : ?0},{'category':{$in: ?1}}] ," +
            "    'state' : 'enable'}")
    Page<Product> findProductsByCategoryOrderByCreatedDateDesc(ObjectId id, List<ObjectId> subCat, Pageable pageable);
    Page<Product> findAllBy(TextCriteria textCriteria, Pageable pageable);
    Page<Product> findByTagsOrderByCreatedDateDesc(String tags, Pageable pageable);
//    List<Product> findAllByIdIsIn(List<String> productIds);
//
//    Optional<Product> findBy(String id, ObjectId option_id);
//    @Query(value = "{'id': ?0, 'options.value': ?1}")
//    Optional<Product> findByIdAndOptionsValue(String id, String value);
//    @Query(value = "{'id': ?0, 'images.id_image': ?1}")
//    Optional<Product> findByIdAndImagesId(String id, String image_id);

    Page<Product> findAllByStateOrderByPriceDesc(String state, Pageable pageable);
    Page<Product> findAllByStateOrderByPriceAsc(String state, Pageable pageable);
    Page<Product> findAllByStateOrderByNameDesc(String state, Pageable pageable);
    Page<Product> findAllByStateOrderByNameAsc(String state, Pageable pageable);
    @Aggregation("{ $group: { _id : $state, count: { $sum: 1 } } }")
    List<StateCountAggregate> countAllByState();
}
