package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@AllArgsConstructor
@Data
@Getter
@Setter
public class InvestmentHistory {
    String date;
    double investedAmount;
}
