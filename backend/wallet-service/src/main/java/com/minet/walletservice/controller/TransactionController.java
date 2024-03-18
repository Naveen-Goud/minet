package com.minet.walletservice.controller;
import com.minet.walletservice.dto.TransactionDTO;
import com.minet.walletservice.entity.Transaction;
import org.springframework.http.*;
import com.minet.walletservice.service.TransactionService;
import org.springframework.web.bind.annotation.*;
import lombok.Data;
import java.util.List;
import java.util.Optional;

@RestController
@Data
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/")
    public ResponseEntity<?> getTransactionByUserIdAndCoinId(
            @RequestParam(value = "userID", required = true) Integer userID,
            @RequestParam(value = "coinID", required = false) Integer coinID
    ) {
        System.out.println("in get transaction controller");
        try {
            if (userID != null && coinID == null) {
                List<TransactionDTO> transaction = transactionService.getTransactionByUserId(userID);
                return ResponseEntity.ok(transaction);
            }
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
        try {
            if (coinID != null && userID != null) {
                List<TransactionDTO> transaction = transactionService.getTransactionByUserIdAndCoinId(userID, coinID);
                return ResponseEntity.ok(transaction);
            }
        }catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected Error");
    }
    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest request) {
        try {
            int userId = request.getUser_id();
            String type = request.getTransaction_type();
            int coinId = request.getCoin_id();
            double amount = request.getCoin_amount();
            double value = request.getTransaction_value();
            System.out.println("in create transaction controller");
            if (userId <= 0 || type == null || type.isEmpty() || coinId <= 0 || amount <= 0 || value <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request parameters");
            }
            TransactionDTO transaction = transactionService.createTransaction(userId, type, coinId, amount, value);
            return ResponseEntity.status(HttpStatus.CREATED).body(transaction);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}