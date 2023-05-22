package com.example.electronicshop.controller;

import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.service.OrderService;
import lombok.AllArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;
    private final JwtUtils jwtUtils;

    @GetMapping(path = "/admin/manage/orders")
    public ResponseEntity<?> findAll (@RequestParam(defaultValue = "") String state,
                                      @PageableDefault(size = 5, sort = "createdDate", direction = Sort.Direction.DESC) @ParameterObject Pageable pageable){
        return orderService.findAll(state, pageable);
    }

//    @GetMapping(path = "/admin/manage/orders")
//    public ResponseEntity<?> findAll (@RequestParam(defaultValue = "") String state,
//                                      @PageableDefault(size = 5, sort = "createdDate", direction = Sort.Direction.DESC)){
//        return orderService.findAll(state);
//    }

    @GetMapping(path = "/admin/manage/ordersEnable")
    public ResponseEntity<?> findAllNoEnable (@PageableDefault(size = 5, sort = "createdDate", direction = Sort.Direction.DESC) @ParameterObject Pageable pageable){
        return orderService.findAllNoEnable( pageable);
    }


    @GetMapping(path = "/admin/manage/orders/{orderId}")
    public ResponseEntity<?> findOrderById (@PathVariable String orderId){
        return orderService.findOrderById(orderId);
    }

    @GetMapping(path = "/orders/{orderId}")
    public ResponseEntity<?> userFindOrderById (@PathVariable String orderId,
                                                HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findOrderById(orderId, user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PutMapping(path = "/orders/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder (@PathVariable String orderId,
                                          HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        return orderService.cancelOrder(orderId, user.getId());
    }
    @PutMapping(path = "/admin/manage/orders/setcomplete/{orderId}")
    public ResponseEntity<?> setCompletelOrderAdmin (@PathVariable String orderId){;
        return orderService.setCompleteOrderByAdmin(orderId);
    }
    @PutMapping(path = "/admin/manage/orders/setdelivery/{orderId}")
    public ResponseEntity<?> setDeliverylOrderAdmin (@PathVariable String orderId){;
        return orderService.setDeliveryOrderByAdmin(orderId);
    }
    @PutMapping(path = "/admin/manage/orders/setcancel/{orderId}")
    public ResponseEntity<?> setCancelOrderAdmin (@PathVariable String orderId){;
        return orderService.setCancelOrderByAdmin(orderId);
    }
//    @GetMapping(path = "/orders/getallorder")
//    public ResponseEntity<?> userFindAllOrder (HttpServletRequest request,@PageableDefault (size = 5) @SortDefault(sort = "createdDate",
//            direction = Sort.Direction.DESC) @ParameterObject Pageable pageable ){
//        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
//        if (!user.getId().isBlank())
//            return orderService.findAllOrderByUserId(user.getId(),pageable);
//        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
//    }
    @GetMapping(path = "/orders/getallorder")
    public ResponseEntity<?> userFindAllOrder (HttpServletRequest request,@SortDefault(sort = "createdDate",
            direction = Sort.Direction.DESC) @ParameterObject Pageable pageable ){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findAllOrderByUserId(user.getId(),pageable);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
    @GetMapping(path = "/orders/getallordercomplete")
    public ResponseEntity<?> userFindAllOrderComplete (HttpServletRequest request,@SortDefault(sort = "createdDate",
            direction = Sort.Direction.DESC) @ParameterObject Pageable pageable ){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findAllOrderCompleteByUserId(user.getId(), pageable);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
}
