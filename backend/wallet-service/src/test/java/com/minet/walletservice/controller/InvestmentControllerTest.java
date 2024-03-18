package com.minet.walletservice.controller;
import com.minet.walletservice.dto.InvestmentHistory;
import com.minet.walletservice.entity.Investment;
import com.minet.walletservice.service.InvestmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InvestmentControllerTest {

    @Mock
    private InvestmentService investmentService;

    @InjectMocks
    private InvestmentController investmentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetInvestmentsByUserID() {
        int userID = 1;
        Investment investment1 = new Investment(1, 1, 1, 15000.0, new Date());
        Investment investment2 = new Investment(2, 1, 1, 7000.0, new Date());

        List<Investment> mockInvestments = new ArrayList<>();
        mockInvestments.add(investment1);
        mockInvestments.add(investment2);

        when(investmentService.getInvestmentByUserId(userID)).thenReturn(Optional.of(mockInvestments));

        ResponseEntity<?> response = investmentController.getInvestmentsByUserID(userID);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        InvestmentResponse investmentResponse = (InvestmentResponse) response.getBody();
        assertNotNull(investmentResponse);
        assertEquals(userID, investmentResponse.getUserId());
        assertEquals("$", investmentResponse.getCurrency());

        List<InvestmentHistory> historyArray = investmentResponse.getInvestmentHistory();
        assertNotNull(historyArray);
        assertEquals(2, historyArray.size());

        assertEquals(investment1.getAmount(), historyArray.get(0).getInvestedAmount());
        assertEquals(investment2.getAmount(), historyArray.get(1).getInvestedAmount());
        verify(investmentService).getInvestmentByUserId(userID);
    }

    @Test
    void testGetInvestmentsByUserIDNotFound() {
        int userID = 1;

        when(investmentService.getInvestmentByUserId(userID)).thenReturn(Optional.empty());

        ResponseEntity<?> response = investmentController.getInvestmentsByUserID(userID);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Unexpected Error", response.getBody());
    }

}
