package com.minet.cryptoservice.service;

import com.minet.cryptoservice.dto.PriceResponseDTO;
import org.springframework.http.ResponseEntity;

public interface PriceService {
    ResponseEntity<PriceResponseDTO> getPriceHistory(Integer coinId);
}
