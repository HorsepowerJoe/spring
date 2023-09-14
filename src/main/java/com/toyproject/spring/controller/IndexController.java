package com.toyproject.spring.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.jwt.JwtProperties;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class IndexController {

    @GetMapping(value = "/api/getFeed")
    private String requestToServer() throws IOException {
        URL url = new URL(JwtProperties.FEED_ACCESS_URL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        int responseCode = con.getResponseCode();
        BufferedReader br;
        System.out.println("responseCode=" + responseCode);
        if (responseCode == 200) { // 정상 호출
            br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else { // 에러 발생
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }

        String inputLine;
        StringBuffer res = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            res.append(inputLine);
        }
        br.close();

        return res.toString();
    }

}
