package com.minet.walletservice.entity;
import lombok.*;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    @Column(name="coin_amount")
    private double coinAmount;

    @Column(name="transaction_value")
    private double transactionValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @JsonIgnore
    @Column(name="timestamp")
    private Date timestamp;

    @Column(name = "coin_id")
    private int coin;

    @Column(name = "from_user_id")
    private int fromUser;

    @Column(name = "to_user_id")
    private int toUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @Column(name = "from_wallet")
    private int fromWallet;

    @Column(name = "to_wallet")
    private int toWallet;

}