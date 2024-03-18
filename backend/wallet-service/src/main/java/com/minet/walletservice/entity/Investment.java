
package com.minet.walletservice.entity;

import lombok.*;
import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "investments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Investment{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "coin_id")
    private int coinId;

    @Column(name = "amount")
    private double amount;

    @Column(name = "date")
    private Date date;
}