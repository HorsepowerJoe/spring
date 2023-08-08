package com.toyproject.spring.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.toyproject.spring.filter.MyFilter1;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<MyFilter1> filter1() {
        FilterRegistrationBean<MyFilter1> filterRegistrationBean = new FilterRegistrationBean<>(new MyFilter1());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(1); // 낮은 번호가 필터중에서 가장 먼저 실행됨
        return filterRegistrationBean;

    }

    @Bean
    public FilterRegistrationBean<MyFilter1> filter2() {
        FilterRegistrationBean<MyFilter1> filterRegistrationBean = new FilterRegistrationBean<>(new MyFilter1());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(0); // 낮은 번호가 필터중에서 가장 먼저 실행됨
        return filterRegistrationBean;

    }
}
