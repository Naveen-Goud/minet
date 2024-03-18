package com.minet.walletservice.controller;

import com.minet.walletservice.dto.InvestmentHistory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
public class InvestmentResponse {
    int userId;
    String currency;
    List<InvestmentHistory> investmentHistory;
}
