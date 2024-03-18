package com.minet.cryptoservice.service;

import com.minet.cryptoservice.dto.CoinResponseDTO;
import com.minet.cryptoservice.model.Coin;
import com.minet.cryptoservice.repository.CoinRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
 class CoinServiceImplTest {
    @InjectMocks
    private CoinServiceImpl coinService;

    @Mock
    private CoinRepository coinRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
     void testGetAllCoins() {

        List<Coin> mockCoinList = new ArrayList<>();
        mockCoinList.add(new Coin(1,"bitcoin","BTC","http://example.com","Bitcoin"));

        when(coinRepository.findAll()).thenReturn(mockCoinList);

        List<CoinResponseDTO> result = coinService.getAllCoins();

        assertEquals(mockCoinList.size(), result.size());

    }

    @Test
     void testGetCoinByIdValid() {
        int coinId = 1;
        Coin mockCoin = new Coin();

        when(coinRepository.findById(coinId)).thenReturn(Optional.of(mockCoin));

        ResponseEntity<CoinResponseDTO> result = coinService.getCoin(coinId);

        assertEquals(HttpStatus.OK, result.getStatusCode());

    }

    @Test
        void testGetCoinByIdInvalid() {
        int coinId = 999;
        when(coinRepository.findById(coinId)).thenReturn(Optional.empty());

        ResponseEntity<CoinResponseDTO> result = coinService.getCoin(coinId);

        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());

    }
}
