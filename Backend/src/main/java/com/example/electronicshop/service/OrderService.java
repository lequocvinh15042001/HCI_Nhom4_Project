package com.example.electronicshop.service;

import com.example.electronicshop.communication.response.OrderRes;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.OrderMapper;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.service.paypalpayment.PaymentUtils;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final PaymentUtils paymentUtils;

    public ResponseEntity<?> findAll(String state, Pageable pageable) {
        Page<Order> orders;
        if (state.isBlank()) orders = orderRepository.findAll(pageable);
        else orders = orderRepository.findAllByState(state, pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderRes2).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalQuantity", orders.getTotalElements());
        resp.put("totalPage", orders.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success", resp));
    }
//    public ResponseEntity<?> findAll(String state) {
//        List<Order> orders;
//        if (state.isBlank()) orders = orderRepository.findAll();
//        else orders = orderRepository.findAllByState(state);
//        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
//        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderRes2).collect(Collectors.toList());
//        Map<String, Object> resp = new HashMap<>();
//        resp.put("list", resList);
//        resp.put("totalQuantity",orders.stream().count());
////        resp.put("totalPage");
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("true", "Get orders success", resp));
//    }
    public ResponseEntity<?> findAllNoEnable( Pageable pageable) {
        Page<Order> orders;
         orders = orderRepository.findAllByStateNoEnable( pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderRes2).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalQuantity", orders.getTotalElements());
        resp.put("totalPage", orders.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success", resp));
    }

    public ResponseEntity<?> findOrderById(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            OrderRes orderRes = orderMapper.toOrderDetailRes(order.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", orderRes));
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> findOrderById(String id, String userId) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getUser().getId().equals(userId)) {
            OrderRes orderRes = orderMapper.toOrderDetailRes(order.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", orderRes));
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> cancelOrder(String id, String userId) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getUser().getId().equals(userId)) {
            if (order.get().getState().equals(Constant.ORDER_STATE_PENDING) ||
                    order.get().getState().equals(Constant.ORDER_STATE_ENABLE) ||
                    order.get().getState().equals(Constant.ORDER_STATE_PROCESS)) {
                String checkUpdateQuantityProduct = paymentUtils.checkingUpdateQuantityProduct(order.get(), false);
                order.get().setState(Constant.ORDER_STATE_CANCEL);
                orderRepository.save(order.get());
                if (checkUpdateQuantityProduct == null) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "Cancel order successfully", ""));
                }
            } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                    "You cannot cancel");
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }
    public ResponseEntity<?> setDeliveryOrderByAdmin(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getState().equals(Constant.ORDER_STATE_PENDING) || order.get().getState().equals(Constant.ORDER_STATE_PENDINGPAY)) {
            order.get().setState(Constant.ORDER_STATE_DELIVERY);
            orderRepository.save(order.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delivery order successfully", order));
        } else throw new NotFoundException("Can not found or delivery order with id: "+ id);
    }

    public ResponseEntity<?> setCompleteOrderByAdmin(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() ) {
            if (order.get().getState().equals(Constant.ORDER_STATE_DELIVERY) ) {
                order.get().setState(Constant.ORDER_STATE_COMPLETE);
                order.get().setLastModifiedDate(LocalDateTime.now());
                orderRepository.save(order.get());
              {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "Complete order successfully", order));
                }
            } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                    "You cannot complete this order");
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> setCancelOrderByAdmin(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() ) {
                order.get().setState(Constant.ORDER_STATE_CANCEL);
                orderRepository.save(order.get());
                {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "Cancel order successfully", order));
                }
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }
//    public ResponseEntity<?> findAllOrderByUserId(String userId,Pageable pageable) {
//        Page<Order> orders = orderRepository.findOrderByUser_Id(new ObjectId(userId),pageable);
//        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderDetailRes).collect(Collectors.toList());
//        Map<String, Object> resp = new HashMap<>();
//        resp.put("list", resList);
//        resp.put("totalOrder", orders.getTotalElements());
//        resp.put("totalPage", orders.getTotalPages());
//        if(resList.size()>0){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("true", "Get order success", resp));
//        }
//        throw new NotFoundException("Can not found any order" );
//    }
    public ResponseEntity<?> findAllOrderByUserId(String userId, Pageable pageable) {
        Page<Order> orders = orderRepository.findOrderByUser_Id(new ObjectId(userId), pageable);
        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderDetailRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalOrder", orders.getTotalElements());
        if(resList.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", resp));
        }
        throw new NotFoundException("Can not found any order" );
    }
//    public ResponseEntity<?> findAllOrderCompleteByUserId(String userId, Pageable pageable)
//    {
//        List<Order> orders = orderRepository.getOrderByUser_IdAndState(new ObjectId(userId),Constant.ORDER_STATE_COMPLETE);
//        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderDetailRes).collect(Collectors.toList());
//        Map<String, Object> resp = new HashMap<>();
//        resp.put("list", resList);
//        if(resList.size()>0){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new ResponseObject("true", "Get order success", resp));
//        }
//        throw new NotFoundException("Can not found any order" );
//    }
    public ResponseEntity<?> findAllOrderCompleteByUserId(String userId, Pageable pageable)
    {
        Page<Order> orders = orderRepository.getOrderByUser_IdAndState(new ObjectId(userId),Constant.ORDER_STATE_COMPLETE, pageable);
        List<OrderRes> resList = orders.stream().map(orderMapper::toOrderDetailRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        if(resList.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", resp));
        }
        throw new NotFoundException("Can not found any order" );
    }
}
