package com.minet.walletservice.controller;
import com.minet.walletservice.dto.InvestmentHistory;
import com.minet.walletservice.entity.Investment;
import com.minet.walletservice.service.InvestmentService;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@Data
@RequestMapping("/investments")
public class InvestmentController {
    private final InvestmentService investmentService;

    @GetMapping("/")
    public ResponseEntity<?> getInvestmentsByUserID(
           @RequestParam(value = "userID", required = true) Integer userID
    ) {
        System.out.println("in get investments controller");
        try {
            if (userID != null) {
                Optional<List<Investment>> investment = investmentService.getInvestmentByUserId(userID);
                if(investment.isPresent()) {
                    List<InvestmentHistory> historyArray = new ArrayList<>();
                            for(int i = 0; i<investment.get().size(); i++){
                                double investedAmount = investment.get().get(i).getAmount();
                                Date date = investment.get().get(i).getDate();
                                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                                String newdate = simpleDateFormat.format(date);
                                InvestmentHistory history = new InvestmentHistory(newdate, investedAmount);
                                historyArray.add(history);
                            }
                    InvestmentResponse investmentResponse = new InvestmentResponse(userID, "$", historyArray);
                    return ResponseEntity.ok(investmentResponse);
                }
            }
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected Error");
    }

}