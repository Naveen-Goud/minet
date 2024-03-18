package com.minet.cryptoservice.dto;

import com.minet.cryptoservice.model.PriceData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PriceResponseDTO {
    private  Integer coinId;
    private List<PriceData> priceHistory;
}
