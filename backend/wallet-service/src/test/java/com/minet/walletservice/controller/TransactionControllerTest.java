
package com.minet.walletservice.controller;
        import com.minet.walletservice.dto.TransactionDTO;
        import com.minet.walletservice.service.TransactionService;
        import org.junit.jupiter.api.BeforeEach;
        import org.junit.jupiter.api.Test;
        import org.mockito.InjectMocks;
        import org.mockito.Mock;
        import org.mockito.MockitoAnnotations;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;

        import java.util.ArrayList;
        import java.util.List;

        import static org.junit.jupiter.api.Assertions.assertEquals;
        import static org.mockito.Mockito.*;

class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTransaction_BadRequest() {
        TransactionRequest request = new TransactionRequest();
        request.setUser_id(-1);
        request.setTransaction_type("buy");
        request.setCoin_id(100);
        request.setCoin_amount(10.0);
        request.setTransaction_value(100.0);

        ResponseEntity<?> response = transactionController.createTransaction(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Bad Request parameters", response.getBody());
    }

    @Test
    void testCreateTransaction_InternalServerError() {
        TransactionRequest request = new TransactionRequest();
        request.setUser_id(1);
        request.setTransaction_type("buy");
        request.setCoin_id(100);
        request.setCoin_amount(10.0);
        request.setTransaction_value(100.0);

        when(transactionService.createTransaction(anyInt(), anyString(), anyInt(), anyDouble(), anyDouble()))
                .thenThrow(new RuntimeException("Something went wrong"));


        ResponseEntity<?> response = transactionController.createTransaction(request);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Something went wrong", response.getBody());
    }
    @Test
    void testGetTransactionByUserIdAndCoinId_GetAllTransactionsByUserID_Success() {
        Integer userID = 1;
        List<TransactionDTO> transactions = createSampleTransactionList();

        when(transactionService.getTransactionByUserId(userID)).thenReturn(transactions);

        ResponseEntity<?> responseEntity = transactionController.getTransactionByUserIdAndCoinId(userID, null);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        List<?> responseBody = (List<?>) responseEntity.getBody();
        assertEquals(transactions, responseBody);
    }

    @Test
    void testGetTransactionByUserIdAndCoinId_GetTransactionsByUserIDAndCoinID_Success() {
        Integer userID = 1;
        Integer coinID = 100;
        List<TransactionDTO> transactions = createSampleTransactionList();

        when(transactionService.getTransactionByUserIdAndCoinId(userID, coinID)).thenReturn(transactions);

        ResponseEntity<?> responseEntity = transactionController.getTransactionByUserIdAndCoinId(userID, coinID);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        List<?> responseBody = (List<?>) responseEntity.getBody();
        assertEquals(transactions, responseBody);
    }

    private List<TransactionDTO> createSampleTransactionList() {
       List<TransactionDTO> dto = new ArrayList<>();
       TransactionDTO dto1 = new TransactionDTO(1, 100, "sell", 3, 9000, 1000, "23-09-09","pending", "john", "mary");
       dto.add(dto1);
       return dto;
        }

}
