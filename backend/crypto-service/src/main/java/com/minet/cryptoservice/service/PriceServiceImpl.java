package com.minet.cryptoservice.service;

import com.minet.cryptoservice.dto.GeckoPriceResponseDTO;
import com.minet.cryptoservice.dto.PriceResponseDTO;
import com.minet.cryptoservice.model.Coin;
import com.minet.cryptoservice.model.PriceData;
import com.minet.cryptoservice.repository.CoinRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PriceServiceImpl implements PriceService {
  @Autowired private CoinRepository coinRepository;

  private RestTemplate restTemplate = new RestTemplate();

  @Override
  public ResponseEntity<PriceResponseDTO> getPriceHistory(Integer coinId) {
    Coin coin = coinRepository.findById(coinId).orElse(null);
    if (coin == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    GeckoPriceResponseDTO geckoResponse = getPriceData(coin.getApiId());
    PriceResponseDTO priceResponseDTO = new PriceResponseDTO();
    priceResponseDTO.setCoinId(coinId);
    List<PriceData> priceHistory = new ArrayList<>();
    if(geckoResponse != null){
    for (List<Object> item : geckoResponse.getPrices()) {
      PriceData priceData = new PriceData();
      priceData.setPrice((double) item.get(1));
      long timestamp = (long) item.get(0);
      Date date = new Date(timestamp);
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
      String formattedDate = dateFormat.format(date);
      priceData.setDate(formattedDate);
      priceHistory.add(priceData);
    }
    }
    priceResponseDTO.setPriceHistory(priceHistory);
    return ResponseEntity.ok(priceResponseDTO);
  }

  private GeckoPriceResponseDTO getPriceData(String apiId) {
    String geckoUrl = "https://api.coingecko.com/api/v3/coins/" + apiId + "/market_chart";
    String vsCurrency = "usd";
    Integer days = 30;
    String interval = "daily";

    String urlTemplate =
        UriComponentsBuilder.fromHttpUrl(geckoUrl)
            .queryParam("vs_currency", vsCurrency)
            .queryParam("days", days)
            .queryParam("interval", interval)
            .encode()
            .toUriString();

    return restTemplate.getForObject(urlTemplate, GeckoPriceResponseDTO.class);
  }
}
