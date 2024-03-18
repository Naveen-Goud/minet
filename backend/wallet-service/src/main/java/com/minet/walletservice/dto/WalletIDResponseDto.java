package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WalletIDResponseDto {
    int id;
    int coinId;
    double amount;

}
