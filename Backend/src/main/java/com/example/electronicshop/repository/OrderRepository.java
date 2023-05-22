package com.example.electronicshop.repository;

import com.example.electronicshop.communication.StateCountAggregate;
import com.example.electronicshop.models.enity.Order;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findOrderByUser_IdAndState(ObjectId userId, String state);
    Page<Order> findAllByState(String state, Pageable pageable);
//    List<Order> findAllByState(String state);
    Optional<Order> findOrderByPaymentDetail_PaymentTokenAndState(String token, String state);
//    Page<Order> findAllByCreatedDateBetweenAndState(LocalDateTime from, LocalDateTime to, String state, Pageable pageable);
//    Page<Order> findOrderByUser_Id(ObjectId userId, Pageable pageable);
    Page<Order> findOrderByUser_Id(ObjectId userId, Pageable pageable);


    @Aggregation("{ $group: { _id : $state, count: { $sum: 1 } } }")
    List<StateCountAggregate> countAllByState();
    Page<Order> findAllByLastModifiedDateBetweenAndState(LocalDateTime from, LocalDateTime to, String state, Pageable pageable);
    Page<Order> findAllByCreatedDateBetweenAndState(LocalDateTime from, LocalDateTime to, String state, Pageable pageable);

    //    List<Order> getOrderByUser_IdAndState(ObjectId userId, String state);
    Page<Order> getOrderByUser_IdAndState(ObjectId userId, String state, Pageable pageable);

    @Query(value=" {state: {'$nin': ['enable']}}")
    Page<Order> findAllByStateNoEnable( Pageable pageable);
    Page<Order> countAllByLastModifiedDateBetweenAndStateOrderByLastModifiedDateAsc(LocalDateTime from, LocalDateTime to, String state, Pageable pageable);
}
