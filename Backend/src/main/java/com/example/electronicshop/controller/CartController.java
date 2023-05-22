package com.example.electronicshop.controller;

import com.example.electronicshop.communication.request.CartReq;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final JwtUtils jwtUtils;

    @GetMapping(path = "")
    public ResponseEntity<?> getProductFromCart (HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.getProductFromCart(user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PostMapping(path = "")
    public ResponseEntity<?> addAndUpdateProduct (@RequestBody @Valid CartReq req,
                                                  HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.addAndUpdateProductToCart(user.getId(), req);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @DeleteMapping(path = "/delete/{orderItemId}")
    public ResponseEntity<?> deleteProductInCart (@PathVariable("orderItemId") String orderItemId,
                                                  HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.deleteProductFromCart(user.getId(), orderItemId);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
}
