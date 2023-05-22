package com.example.electronicshop.service.paypalpayment;

import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.repository.ProductOptionRepository;
import com.example.electronicshop.repository.ProductRepository;
import com.mongodb.MongoWriteException;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PaymentUtils {
   private final ProductOptionRepository productOptionRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    @Synchronized
    @Transactional
    public String checkingUpdateQuantityProduct(Order order, boolean isPaid) {
        order.getItems().forEach(item -> {
            //Check if the product has an option
            if(item.getValue()==null){
                if (isPaid) {
                    if (item.getItem().getQuantity() < item.getQuantity()) {
                        order.setState(Constant.ORDER_STATE_ENABLE);
                        orderRepository.save(order);
                        throw new AppException(HttpStatus.CONFLICT.value(),
                                "Quantity exceeds the available stock on hand at Product:" +
                                        item.getItem().getName());
                    } else item.getItem().setQuantity((int) (item.getItem().getQuantity() - item.getQuantity()));
                } else item.getItem().setQuantity((int) (item.getItem().getQuantity() + item.getQuantity()));
            }else {
                if (isPaid) {
                    if (item.getOption().getStock() < item.getQuantity()) {
                        order.setState(Constant.ORDER_STATE_ENABLE);
                        orderRepository.save(order);
                        throw new AppException(HttpStatus.CONFLICT.value(),
                                "Quantity exceeds the available stock on hand at Product:" +
                                        item.getItem().getName());
                    } else {item.getOption().setStock(item.getOption().getStock() - item.getQuantity());
                        productOptionRepository.save(item.getOption());}
                } else {item.getOption().setStock(item.getOption().getStock() + item.getQuantity());
                    productOptionRepository.save(item.getOption());}
            }
            try {
                productRepository.save(item.getItem());
            } catch (MongoWriteException e) {
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Failed when update quantity");
            }
        });
        return null;
    }
}