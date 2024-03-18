package com.minet.cryptoservice.dto;

import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CoinResponseDTO {
    private Integer id;
    private BigDecimal marketCap;
    private Float priceChangePercentage24h;
    private Double circulatingSupply;
    private Double volume;
    private String apiId;
    private String acronym;
    private String iconUrl;
    private  String name;
}
