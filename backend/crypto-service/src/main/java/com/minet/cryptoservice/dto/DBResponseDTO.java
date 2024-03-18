package com.minet.cryptoservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DBResponseDTO {
    private Integer id;

    private String apiId;

    private String acronym;

    private String iconUrl;

    private  String name;
}
