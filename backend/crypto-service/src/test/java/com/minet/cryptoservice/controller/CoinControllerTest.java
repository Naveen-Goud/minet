package com.minet.cryptoservice.controller;

import com.minet.cryptoservice.dto.CoinResponseDTO;
import com.minet.cryptoservice.service.CoinService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
 class CoinControllerTest {

    @Mock
    private CoinService coinService;

    @InjectMocks
    private CoinController coinController;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testGetAllCoins() {

        List<CoinResponseDTO> coins = new ArrayList<>();
        coins.add(new CoinResponseDTO(1, BigDecimal.valueOf(564778411), 56688.78F,55465116.41644,1684631.464664, "bitcoin","BTC","http://example.com","Bitcoin"));

        when(coinService.getAllCoins()).thenReturn(coins);

        List<CoinResponseDTO> response = coinController.getAllCoins();

        assertEquals(coins, response);
    }

    @Test
    void testGetCoinValidId() {

        int coinId = 1;
        CoinResponseDTO coin = new CoinResponseDTO();

        when(coinService.getCoin(coinId)).thenReturn(ResponseEntity.ok(coin));

        ResponseEntity<CoinResponseDTO> response = coinController.getCoin(coinId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(coin, response.getBody());
    }

    @Test
    void testGetCoinInvalidId() {

        int invalidCoinId = 0;

        ResponseEntity<CoinResponseDTO> response = coinController.getCoin(invalidCoinId);

        assertEquals(HttpStatus.BAD_REQUEST, ((ResponseEntity<?>) response).getStatusCode());
        assertEquals(null, response.getBody());
    }
}