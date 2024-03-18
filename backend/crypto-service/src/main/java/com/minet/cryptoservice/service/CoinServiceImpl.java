package com.minet.cryptoservice.service;

import com.minet.cryptoservice.dto.DBResponseDTO;
import com.minet.cryptoservice.dto.GeckoResponseDTO;
import com.minet.cryptoservice.dto.CoinResponseDTO;
import com.minet.cryptoservice.model.Coin;
import com.minet.cryptoservice.repository.CoinRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CoinServiceImpl implements CoinService {
  @Autowired private CoinRepository coinRepository;

  public List<DBResponseDTO> fetchDBData() {
    List<Coin> coins = coinRepository.findAll();
    ModelMapper modelMapper = new ModelMapper();
    return coins.stream()
        .map(coin -> modelMapper.map(coin, DBResponseDTO.class))
        .collect(Collectors.toList());
  }

  public List<GeckoResponseDTO> fetchGeckoData(String ids) {
    String geckoUrl = "https://api.coingecko.com/api/v3/coins/markets";
    String vsCurrency = "usd";
    String urlTemplate =
        UriComponentsBuilder.fromHttpUrl(geckoUrl)
            .queryParam("vs_currency", vsCurrency)
            .queryParam("ids", ids)
            .encode()
            .toUriString();

    RestTemplate restTemplate = new RestTemplate();
    GeckoResponseDTO[] geckoResponse =
        restTemplate.getForObject(urlTemplate, GeckoResponseDTO[].class);
    return Arrays.asList(geckoResponse);
  }

  @Override
  public List<CoinResponseDTO> getAllCoins() {
    ModelMapper modelMapper = new ModelMapper();
    List<CoinResponseDTO> coinResponseDTOS = new ArrayList<>();
    List<DBResponseDTO> dbResponseDTOS = fetchDBData();
    List<GeckoResponseDTO> geckoResponseDTOS = fetchGeckoData("bitcoin,ethereum,binancecoin,ethereum-classic,tether,cardano,ripple,dogecoin,usd-coin");
    Map<String, GeckoResponseDTO> geckoResponseDTOMap =
        geckoResponseDTOS.stream()
            .collect(
                Collectors.toMap(GeckoResponseDTO::getId, geckoResponseDTO -> geckoResponseDTO));
    for (DBResponseDTO DBResponseDTO : dbResponseDTOS) {
      CoinResponseDTO coinResponseDTO =
          modelMapper.map(DBResponseDTO, CoinResponseDTO.class);
      GeckoResponseDTO geckoResponseDTO = geckoResponseDTOMap.get(coinResponseDTO.getApiId());
      coinResponseDTOS.add(mergeGeckoAndCoin(geckoResponseDTO,coinResponseDTO));
    }
    return coinResponseDTOS;
  }

  @Override
  public ResponseEntity<CoinResponseDTO> getCoin(Integer id) {
    Coin coin = coinRepository.findById(id).orElse(null);
    if(coin != null){
      ModelMapper modelMapper = new ModelMapper();
      CoinResponseDTO coinResponseDTO = modelMapper.map(coin, CoinResponseDTO.class);
      List<GeckoResponseDTO> geckoResponseDTOS=fetchGeckoData(coin.getApiId());
      GeckoResponseDTO geckoResponseDTO = geckoResponseDTOS.get(0);
      return ResponseEntity.ok(mergeGeckoAndCoin(geckoResponseDTO,coinResponseDTO));
    }
  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
  }

  private CoinResponseDTO  mergeGeckoAndCoin(GeckoResponseDTO geckoResponseDTO, CoinResponseDTO coinResponseDTO){
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.typeMap(GeckoResponseDTO.class, CoinResponseDTO.class).addMappings(mapper->{
      mapper.map(src->src.getId(),CoinResponseDTO::setApiId );
      mapper.skip(CoinResponseDTO::setId);
    });
    modelMapper.map(geckoResponseDTO,coinResponseDTO);
    return  coinResponseDTO;
  }
}
