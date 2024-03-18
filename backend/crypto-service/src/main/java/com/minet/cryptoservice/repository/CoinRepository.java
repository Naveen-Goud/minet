package com.minet.cryptoservice.repository;

import com.minet.cryptoservice.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinRepository extends JpaRepository<Coin,Integer> {}
