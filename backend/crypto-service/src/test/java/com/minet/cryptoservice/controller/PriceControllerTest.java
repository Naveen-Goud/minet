package com.minet.cryptoservice.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.minet.cryptoservice.controller.PriceController;
import com.minet.cryptoservice.dto.PriceResponseDTO;
import com.minet.cryptoservice.service.PriceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.util.NestedServletException;import org.mockito.InjectMocks;
import org.springframework.test.web.servlet.MockMvc;

class PriceControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private PriceController priceController;

    @Mock
    private PriceService priceService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(priceController).build();
    }

    @Test
    void testGetPriceHistory_ValidCoinId() throws Exception {
        int coinId = 1;

        PriceResponseDTO mockResponseDTO = new PriceResponseDTO();

        when(priceService.getPriceHistory(coinId)).thenReturn(ResponseEntity.ok(mockResponseDTO));

        mockMvc.perform(get("/api/cryptos/prices/{coinId}", coinId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

    }

    @Test
    void testGetPriceHistory_InvalidCoinId() throws Exception {
        int coinId = -1;

        mockMvc.perform(get("/api/cryptos/prices/{coinId}", coinId))
                .andExpect(status().isBadRequest());
    }
}