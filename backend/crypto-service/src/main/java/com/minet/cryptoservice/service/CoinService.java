package com.minet.cryptoservice.service;

import com.minet.cryptoservice.dto.CoinResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CoinService {
    List<CoinResponseDTO> getAllCoins();
    ResponseEntity<CoinResponseDTO> getCoin(Integer id);
}
