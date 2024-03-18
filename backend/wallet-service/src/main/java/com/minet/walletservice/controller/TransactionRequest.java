package com.minet.walletservice.controller;

import lombok.*;

@Data
@Getter
@Setter
public class TransactionRequest {
    Integer user_id;
    String transaction_type;
    Integer coin_id;
    Double coin_amount;
    Double transaction_value;

}

