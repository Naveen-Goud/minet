package com.minet.walletservice.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coins {
    private int id;
    private String apiId;
    private String acronym;
    private String iconUrl;
    private  String name;
    private  double amount;

}
