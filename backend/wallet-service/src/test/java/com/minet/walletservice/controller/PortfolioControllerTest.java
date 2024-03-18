package com.minet.walletservice.controller;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import com.minet.walletservice.dto.PortfolioResponseDto;
import com.minet.walletservice.exceptions.UserNotFoundException;
import com.minet.walletservice.service.WalletService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PortfolioController.class)
class PortfolioControllerTest {
    @InjectMocks
    private WalletController walletController;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private WalletService walletService;
    @Autowired
    private PortfolioController portfolioController;

    @Test
    void testGetPortfolioDetails() {
        int userId = 1;
        List<PortfolioResponseDto> expectedResponse = Arrays.asList();
        when(walletService.findPortfolioDetails(userId)).thenReturn(expectedResponse);
        ResponseEntity<List<PortfolioResponseDto>> actualResponse = portfolioController.getPortfolioDetails(userId);
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedResponse, actualResponse.getBody());
    }
    @Test
    void testGetPortfolioDetailsForValidUserId() throws Exception {
        int userId = 123;
        List<PortfolioResponseDto> portfolioData = new ArrayList<>();
        when(walletService.findPortfolioDetails(userId)).thenReturn(portfolioData);
        mockMvc.perform(get("/portfolio/")
                        .param("userId", String.valueOf(userId)))
                .andExpect(status().isOk());
    }
    @Test
    void testUserNotFoundException() {
        int userId = 1;
        when(walletService.findPortfolioDetails(userId))
                .thenThrow(new UserNotFoundException("User not found for userId: " + userId, HttpStatus.NOT_FOUND));
        assertThrows(UserNotFoundException.class, () -> portfolioController.getPortfolioDetails(userId));
    }
    @Test
     void testGetPortfolioDetailsForNonExistingUser() {
        int userId = 456;

        Mockito.when(walletService.findPortfolioDetails(userId)).thenReturn(null);

        try {
            portfolioController.getPortfolioDetails(userId);
        } catch (UserNotFoundException ex) {
            assertEquals("User not found for walletId: " + userId, ex.getMessage());
        }
    }
}
