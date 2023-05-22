package com.example.electronicshop.service.paypalpayment;

import com.example.electronicshop.models.enity.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class PaymentFactory {



    public abstract ResponseEntity<?> createPayment(HttpServletRequest request, Order order);

    public abstract ResponseEntity<?> executePayment(String paymentId, String payerId, String responseCode, String id, HttpServletRequest request, HttpServletResponse response);

    public abstract ResponseEntity<?> cancelPayment(String id, String responseCode, HttpServletResponse response);

}
