package com.example.electronicshop.config;

import java.util.List;

public class Constant {
    public static final String ENABLE = "enable";
    public static final String DISABLE = "disable";
    public static final String COMMENT_BLOCK="block";
    public static final String COMMENT_ENABLE = "enable";
    //ROLE
    public static final String ROLE_ADMIN = "role_admin";
    public static final String ROLE_USER = "role_user";

    //USER STATE
        public static final String USER_ACTIVE = "active";
    public static final String USER_NOT_ACTIVE = "block";
    public static final String USER_NOT_VERIFY = "not_verify";
    //ORDER STATE
    public static final String ORDER_STATE_ENABLE = "enable";
    public static final String ORDER_STATE_CANCEL = "cancel";
    public static final String ORDER_STATE_PENDINGPAY = "pendingpay";
    public static final String ORDER_STATE_PROCESS = "process"; // đang tiến hành
    public static final String ORDER_STATE_COMPLETE = "complete";
    public static final String ORDER_STATE_DELIVERY = "delivery";
    public static final String ORDER_STATE_PENDING = "pending"; // đã chờ

    //PAYMENT TYPE
    public static final String PAY_COD = "cod";
    public static final String PAY_PAYPAL = "paypal";
    public static final String PAY_VNPAY = "vnpay";

}
