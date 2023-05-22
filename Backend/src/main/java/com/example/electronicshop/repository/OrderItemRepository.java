package com.example.electronicshop.repository;

import com.example.electronicshop.models.enity.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderItemRepository extends MongoRepository<OrderItem, String> {
}
