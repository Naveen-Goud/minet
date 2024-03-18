package com.minet.walletservice.repository;
import com.minet.walletservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByFromUser(int userId);
    List<Transaction> findByFromUserAndCoin(int userId, int coinId);

}