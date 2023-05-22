package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.CartReq;
import com.example.electronicshop.communication.response.CartItemRes;
import com.example.electronicshop.communication.response.CartRes;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.CartMapper;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.OrderItem;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.models.product.Product;
import com.example.electronicshop.models.product.ProductOption;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.*;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final ProductOptionRepository productOptionRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartMapper cartMapper;
    private final ProductRepository productRepository;

    public ResponseEntity<?> getProductFromCart(String userId) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<Order> order = orderRepository.findOrderByUser_IdAndState(new ObjectId(userId), Constant.ORDER_STATE_ENABLE);
            if (order.isPresent()) {
                CartRes res = cartMapper.toCartRes(order.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Get cart success", res));
            } throw new NotFoundException("Can not found any order with user id: "+userId);
        } throw new NotFoundException("Can not found user with id: "+userId);
    }

    @Transactional
    public ResponseEntity<?> addAndUpdateProductToCart(String userId, CartReq req) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<Order> order = orderRepository.findOrderByUser_IdAndState(new ObjectId(userId), Constant.ORDER_STATE_ENABLE);
            if (order.isPresent()) {
                Optional<OrderItem> item = order.get().getItems().stream().filter(
                        p -> p.getItem().getId().equals(req.getProducId())).findFirst();
//                                && p.getValue().equals(req.getValue())).findFirst();
                if (item.isPresent())
                    return processUpdateProductInCart(item.get(), req);
                else return processAddProductToExistOrder(order.get(), req);
            } else return processAddProductToOrder(user.get(), req);
        } throw new NotFoundException("Can not found user with id: "+userId);
    }

    @Transactional
    @Synchronized
    ResponseEntity<?> processAddProductToOrder(User user, CartReq req) {
        if (req.getQuantity() <= 0) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Invalid quantity");
//        Optional<ProductOption> productOption = productOptionRepository.findByIdAndValue(req.getProductOptionId(),req.getValue());
        Optional<Product> product = productRepository.findById(req.getProducId());
        OrderItem item;
        if (product.isPresent()) {
            checkProductQuantity(product.get(), req);
            Order order = new Order(user, Constant.ORDER_STATE_ENABLE);
            orderRepository.insert(order);
            if(req.getProductOptionId()==null){
                item = new OrderItem(product.get(), req.getQuantity(), order);
            }else {Optional<ProductOption> productOption = productOptionRepository.findById(req.getProductOptionId());
                item = new OrderItem(product.get(), productOption.get(),req.getValue(), req.getQuantity(), order);}
            orderItemRepository.insert(item);
            CartItemRes res = CartMapper.toCartItemRes(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product to cart first time success", res));
        } else throw new NotFoundException("Can not found product option with id: "+req.getProductOptionId());
    }

    private ResponseEntity<?> processAddProductToExistOrder(Order order, CartReq req) {
        if (req.getQuantity() <= 0) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Invalid quantity");
//        Optional<ProductOption> productOption = productOptionRepository.findByIdAndValue(req.getProductOptionId(),req.getValue());
        Optional<Product> product = productRepository.findById(req.getProducId());
        OrderItem item;
        if (product.isPresent()) {
            checkProductQuantity(product.get(), req);
            if(req.getProductOptionId()==null){
                item = new OrderItem(product.get(), req.getQuantity(), order);
            }else {Optional<ProductOption> productOption = productOptionRepository.findById(req.getProductOptionId());
                item = new OrderItem(product.get(), productOption.get(),req.getValue(), req.getQuantity(), order);}
            orderItemRepository.insert(item);
            CartItemRes res = CartMapper.toCartItemRes(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product to cart success", res));
        } else throw new NotFoundException("Can not found product option with id: "+req.getProductOptionId());
    }

    private void checkProductQuantity(Product product, CartReq req) {
        product.getOptions().forEach(v -> {
            if (v.getValue().equals(req.getValue())) {
                if (v.getStock() < req.getQuantity() ) {
                    throw new AppException(HttpStatus.CONFLICT.value(), "Quantity exceeds stock on product: "+req.getProductOptionId());
                }
            }
        });
    }

    private ResponseEntity<?> processUpdateProductInCart(OrderItem orderItem, CartReq req) {
        if (orderItem.getQuantity() + req.getQuantity() == 0) {
            orderItemRepository.deleteById(orderItem.getId());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete item "+orderItem.getId()+" in cart success", ""));
        }
        long quantity = orderItem.getQuantity() + req.getQuantity();
        if(req.getProductOptionId()==null){
            if(orderItem.getItem().getQuantity() >= quantity && quantity > 0){
                orderItem.setQuantity(quantity);
                orderItemRepository.save(orderItem);
            } else throw new AppException(HttpStatus.CONFLICT.value(), "Quantity invalid or exceeds stock on product: "+req.getProducId());
        }else {
            if (orderItem.getOption().getStock() >= quantity && quantity > 0) {
                orderItem.setQuantity(quantity);
                orderItemRepository.save(orderItem);
            } else throw new AppException(HttpStatus.CONFLICT.value(),
                    "Quantity invalid or exceeds stock on product: "+req.getProducId()
                    +" with option: "+req.getProductOptionId());
        }
//        orderItem.getItem().getOptions().forEach(v -> {
//            if (v.getStock() >= quantity && quantity > 0) {
//                orderItem.setQuantity(quantity);
//                orderItemRepository.save(orderItem);
//            } else throw new AppException(HttpStatus.CONFLICT.value(), "Quantity invalid or exceeds stock on product: "+req.getProductOptionId());
//        });
        CartItemRes res = CartMapper.toCartItemRes(orderItem);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Update product "+req.getProductOptionId()+" in cart success", res));
    }

    public ResponseEntity<?> deleteProductFromCart(String userId, String orderItemId) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<OrderItem> orderItem = orderItemRepository.findById(orderItemId);
            if (orderItem.isPresent() && orderItem.get().getOrder().getUser().getId().equals(userId)){
                orderItemRepository.deleteById(orderItemId);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Delete item "+orderItemId+" in cart success", ""));
            }
            else throw new AppException(HttpStatus.NOT_FOUND.value(), "Can not found product in your cart");
        } throw new NotFoundException("Can not found user with id: "+userId);
    }
}
