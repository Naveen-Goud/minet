package com.minet.cryptoservice.controller;

import com.minet.cryptoservice.dto.PriceResponseDTO;
import com.minet.cryptoservice.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cryptos/prices")
public class PriceController {
    @Autowired
   private PriceService priceService;
    @GetMapping("/{coinId}")
    public ResponseEntity<PriceResponseDTO> getPriceHistory(@PathVariable Integer coinId){
        if(coinId < 1){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
       return priceService.getPriceHistory(coinId);
    }
}
