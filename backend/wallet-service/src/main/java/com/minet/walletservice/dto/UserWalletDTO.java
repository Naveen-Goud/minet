package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWalletDTO {
    int walletId;
    int coinId;
    int userId;
    String name;
    String acronym;
    double amount;
}
