package com.toyproject.spring.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.jwt.JwtProperties;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Token;
import com.toyproject.spring.repository.TokenRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class NaverSignController {

    private String CLIENT_ID = JwtProperties.NAVER_ID; // 애플리케이션 클라이언트 아이디값";
    private String CLI_SECRET = JwtProperties.NAVER_SECRET; // 애플리케이션 클라이언트 시크릿값";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenRepository tokenRepository;
    private final ObjectMapper objm;

    /**
     * 로그인 화면이 있는 페이지 컨트롤
     * 
     * @param session
     * @param model
     * @return
     * @throws UnsupportedEncodingException
     * @throws UnknownHostException
     */
    @RequestMapping("/naver")
    public String testNaver(HttpSession session, Model model)
            throws UnsupportedEncodingException, UnknownHostException {
        String redirectURI = URLEncoder.encode("http://localhost:8080/naver/callback1", "UTF-8");
        SecureRandom random = new SecureRandom();
        String state = new BigInteger(130, random).toString();
        String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
        apiURL += String.format("&client_id=%s&redirect_uri=%s&state=%s",
                CLIENT_ID, redirectURI, state);
        session.setAttribute("state", state);
        model.addAttribute("apiURL", apiURL);
        return "test-naver";
    }

    /**
     * 콜백 페이지 컨트롤러
     * 
     * @param session
     * @param request
     * @param model
     * @return
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping("/naver/callback1")
    public String naverCallback1(HttpSession session, HttpServletRequest request, Model model)
            throws IOException, ParseException {
        String code = request.getParameter("code");
        String state = request.getParameter("state");
        String redirectURI = URLEncoder.encode("http://localhost:8080/naver/callback1", "UTF-8");
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&redirect_uri=" + redirectURI;
        apiURL += "&code=" + code;
        apiURL += "&state=" + state;
        System.out.println("apiURL=" + apiURL);
        String res = requestToServer(apiURL);
        if (res != null && !res.equals("")) {
            model.addAttribute("res", res);
            Map<String, Object> parsedJson = new JSONParser(res).parseObject();
            System.out.println(parsedJson);
            session.setAttribute("currentUser", res);
            session.setAttribute("currentAT", parsedJson.get("access_token"));
            session.setAttribute("currentRT", parsedJson.get("refresh_token"));
        } else {
            model.addAttribute("res", "Login failed!");
        }
        return "test-naver-callback";
    }

    /**
     * 토큰 갱신 요청 페이지 컨트롤러
     * 
     * @param session
     * @param request
     * @param model
     * @param refreshToken
     * @return
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping("/naver/refreshToken")
    public String refreshToken(HttpSession session, HttpServletRequest request, Model model, String refreshToken)
            throws IOException, ParseException {
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&refresh_token=" + refreshToken;
        System.out.println("apiURL=" + apiURL);
        String res = requestToServer(apiURL);
        model.addAttribute("res", res);
        session.invalidate();
        return "test-naver-callback";
    }

    /**
     * 토큰 삭제 컨트롤러
     * 
     * @param session
     * @param request
     * @param model
     * @param accessToken
     * @return
     * @throws IOException
     */
    @RequestMapping("/naver/deleteToken")
    public String deleteToken(HttpSession session, HttpServletRequest request, Model model, String accessToken)
            throws IOException {
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=delete&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&access_token=" + accessToken;
        apiURL += "&service_provider=NAVER";
        System.out.println("apiURL=" + apiURL);
        String res = requestToServer(apiURL);
        model.addAttribute("res", res);
        session.invalidate();
        return "test-naver-callback";
    }

    /**
     * 액세스 토큰으로 네이버에서 프로필 받기
     * 
     * @param accessToken
     * @return
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping("/naver/getProfile")
    public String getProfileFromNaver(@RequestBody String token) throws IOException {
        // 네이버 로그인 접근 토큰;
        String apiURL = "https://openapi.naver.com/v1/nid/me";
        String headerStr = "Bearer " + token.replace("=", ""); // Bearer 다음에 공백 추가
        String res = requestToServer(apiURL, headerStr);
        return res;
    }

    /**
     * 세션 무효화(로그아웃)
     * 
     * @param session
     * @return
     */
    @RequestMapping("/naver/invalidate")
    public String invalidateSession(HttpSession session) {
        session.invalidate();
        return "redirect:/naver";
    }

    /**
     * 서버 통신 메소드
     * 
     * @param apiURL
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL) throws IOException {
        return requestToServer(apiURL, "");
    }

    /**
     * 서버 통신 메소드
     * 
     * @param apiURL
     * @param headerStr
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL, String headerStr) throws IOException {
        URL url = new URL(apiURL);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        System.out.println("header Str: " + headerStr);
        if (headerStr != null && !headerStr.equals("")) {
            con.setRequestProperty("Authorization", headerStr);
        }
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
        Map<String, Object> parsedJson = new HashMap<>();
        String jwtToken = null;

        if (responseCode == 200) {
            try {
                parsedJson = new JSONParser(res.toString()).parseObject();
                parsedJson = ((Map<String, Object>) parsedJson.get("response"));
                Customer customerEntity = userRepository.findByUsername("naver" + (String) parsedJson.get("email"));

                System.out.println(customerEntity == null);
                if (customerEntity == null) {
                    String username = "naver" + (String) parsedJson.get("email");
                    String customerEmail = (String) parsedJson.get("email");
                    String customerName = (String) parsedJson.get("name");
                    String customerPassword = bCryptPasswordEncoder.encode("HorsepowerJo");
                    String role = "ROLE_USER";
                    String customerPhone = "null";
                    String customerAddress = "null";
                    String cutomerGender = "null";
                    int customerAge = 0;
                    String provider = "naver";
                    String providerId = (String) parsedJson.get("id");

                    customerEntity = customerEntity.builder()
                            .customerEmail(customerEmail)
                            .username(username)
                            .customerName(customerName)
                            .customerPassword(customerPassword)
                            .role(role)
                            .customerPhone(customerPhone)
                            .customerAddress(customerAddress)
                            .customerGender(cutomerGender)
                            .customerAge(customerAge)
                            .provider(provider)
                            .providerId(providerId)
                            .build();

                    userRepository.save(customerEntity);
                }

                jwtToken = JWT.create()
                        .withSubject(customerEntity.getUsername())
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10))) // 만료시간
                        .withClaim("id", customerEntity.getCustomerNum()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                        .withClaim("username", customerEntity.getUsername()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                        .withClaim("customerName", customerEntity.getCustomerName()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                        .withClaim("customerEmail", customerEntity.getCustomerEmail()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                        .sign(Algorithm.HMAC512("HorsepowerJo"));

                String refreshToken = JWT.create()
                        .withClaim("id", customerEntity.getCustomerNum())
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withExpiresAt(new Date(System.currentTimeMillis() + 604800000))
                        .sign(Algorithm.HMAC512("HorsepowerJo"));

                Token tokenDto = new Token();
                tokenDto.setJwtToken(jwtToken);
                tokenDto.setRefreshToken(refreshToken);

                if (tokenRepository.findByRefreshToken(refreshToken) == null) {
                    tokenRepository.save(tokenDto);
                } else {
                    System.out.println("중복실행방지");
                }
                return objm.writeValueAsString(tokenDto);

            } catch (ParseException e) {

                e.printStackTrace();

            }
            return null;
        } else {
            return null;
        }
    }
}
