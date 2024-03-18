package com.minet.walletservice.repository;
import com.minet.walletservice.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Integer> {
    List<Investment> findByUserId(int userId);

}