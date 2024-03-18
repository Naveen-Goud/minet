package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletResponceDto {
    int id;
    int userId;
    int coinId;
    double amount;
}
