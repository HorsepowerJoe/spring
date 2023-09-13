package com.toyproject.spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/api/upload/**")
                .addResourceLocations("file:///Users/jml/Documents/upload/");
        // 절대 마지막 패스에 /를 빼먹지 마 후우..

    }

}
