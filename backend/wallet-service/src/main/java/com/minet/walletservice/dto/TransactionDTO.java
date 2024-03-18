package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    int id; //id
    int user_id; // userid
    String action; //action
    int coinId; //coinId
    double coinValue; //coinValue
    double amount; //amount
    String time;
    String status; //status
    String fromUser; //fromUser
    String toUser; //toUser
}
