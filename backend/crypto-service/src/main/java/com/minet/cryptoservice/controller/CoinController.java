package com.minet.cryptoservice.controller;

import com.minet.cryptoservice.dto.CoinResponseDTO;
import com.minet.cryptoservice.repository.CoinRepository;
import com.minet.cryptoservice.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cryptos")
public class CoinController {
    @Autowired
    private CoinService coinService;
    @Autowired
    private CoinRepository coinRepository;
    @GetMapping()
    public List<CoinResponseDTO> getAllCoins(){
    return coinService.getAllCoins();
    }

    @GetMapping("/{coinId}")
    public ResponseEntity<CoinResponseDTO> getCoin(@PathVariable Integer coinId){
        if(coinId < 1){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return coinService.getCoin(coinId);
    }
}
