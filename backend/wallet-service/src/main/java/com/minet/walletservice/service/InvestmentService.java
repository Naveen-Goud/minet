package com.minet.walletservice.service;
import com.minet.walletservice.entity.*;
import com.minet.walletservice.repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class InvestmentService{
    private InvestmentRepository investmentRepository;

    @Autowired
    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }

    public Optional<List<Investment>> getInvestmentByUserId(int userId) {
        List<Investment> investments = investmentRepository.findByUserId(userId);
        if (investments != null && !investments.isEmpty()) {
            return Optional.of(investments);
        } else {
            throw new RuntimeException("No user found with specified userID");
        }
    }

}

