package com.minet.cryptoservice.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class GeckoPriceResponseDTO {
    private List<List<Object>> prices;
}
