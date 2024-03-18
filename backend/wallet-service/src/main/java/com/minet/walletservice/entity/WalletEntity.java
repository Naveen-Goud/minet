package com.minet.walletservice.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "wallets")
public class WalletEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private int  id;
    @Column(name ="coin_id")
    private int coinId;

    @Column(name="user_id")
    private  int userId;

    @Column(name="balance")
    private double balance;

    @JsonIgnore
    @Column(name = "created_at")
    private Date createdAt;

    @JsonIgnore
    @Column(name = "updated_at")
    private Date updatedAt;

}