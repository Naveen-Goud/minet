package com.minet.walletservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PortfolioResponseDto {
    @GeneratedValue(strategy = GenerationType.AUTO)
    int portfolioId;

    int coinId;
    String name;
    String acronym;
    double balance;
    String iconUrl;

}
