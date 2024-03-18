package com.minet.walletservice.controller;
import com.minet.walletservice.dto.PortfolioResponseDto;
import com.minet.walletservice.exceptions.UserNotFoundException;
import com.minet.walletservice.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {
    @Autowired
    WalletService walletService;

    @GetMapping("/")
    public ResponseEntity<List<PortfolioResponseDto>> getPortfolioDetails(@RequestParam(value = "userId") int userId) {
        try {
            List<PortfolioResponseDto> portfolioDetails = walletService.findPortfolioDetails(userId);
            return ResponseEntity.ok(portfolioDetails);
        } catch (UserNotFoundException e) {
            String errorMessage = "User not found for walletId: " + userId;
            throw  new UserNotFoundException(errorMessage,HttpStatus.NOT_FOUND);
        }
    }
}
