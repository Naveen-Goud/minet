package com.minet.walletservice.service;
import com.minet.walletservice.entity.Investment;
        import com.minet.walletservice.repository.InvestmentRepository;
        import org.junit.jupiter.api.BeforeEach;
        import org.junit.jupiter.api.Test;
        import org.mockito.InjectMocks;
        import org.mockito.Mock;
        import org.mockito.MockitoAnnotations;
        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;
        import java.util.Optional;

        import static org.junit.jupiter.api.Assertions.*;
        import static org.mockito.Mockito.*;

class InvestmentServiceTest {

    @Mock
    private InvestmentRepository investmentRepository;

    @InjectMocks
    private InvestmentService investmentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetInvestmentByUserId() {
        int userId = 1;
        Investment investment1 = new Investment(1, 1, 1, 15000.0, new Date());
        Investment investment2 = new Investment(2,1,1,13000, new Date());

        List<Investment> mockInvestments = new ArrayList<>();
        mockInvestments.add(investment1);
        mockInvestments.add(investment2);

        when(investmentRepository.findByUserId(userId)).thenReturn(mockInvestments);

        Optional<List<Investment>> result = investmentService.getInvestmentByUserId(userId);

        assertTrue(result.isPresent());
        List<Investment> investments = result.get();
        assertEquals(2, investments.size());
        assertEquals(investment1, investments.get(0));
        assertEquals(investment2, investments.get(1));

        verify(investmentRepository).findByUserId(userId);
    }

    @Test
    void testGetInvestmentByUserIdNotFound() {
        int userId = 1;

        when(investmentRepository.findByUserId(userId)).thenReturn(new ArrayList<>());

        assertThrows(RuntimeException.class, () -> investmentService.getInvestmentByUserId(userId));
    }

}
