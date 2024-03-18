package com.minet.cryptoservice.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "coins")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Coin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "api_id")
    private String apiId;

    private String acronym;

    @Column(name = "icon_url")
    private String iconUrl;

    private  String name;

}
