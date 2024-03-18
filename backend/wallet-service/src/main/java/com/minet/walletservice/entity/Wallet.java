package com.minet.walletservice.entity;

        import lombok.*;

        import javax.persistence.*;
        import java.util.ArrayList;
        import java.util.List;

@Entity
@Table(name = "wallets")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Wallet{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "coin_id")
    private Integer coinId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "balance")
    private double balance;

}