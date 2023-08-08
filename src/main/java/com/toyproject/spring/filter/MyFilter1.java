package com.toyproject.spring.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.spi.ServiceRegistry.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyFilter1 implements Filter, javax.servlet.Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        if (req.getMethod().equals("POST")) {
            String headerAuth = req.getHeader("Authorization");
            System.out.println(headerAuth);

            if (headerAuth.equals("코스")) {
                chain.doFilter(req, resp);
            } else {
                PrintWriter out = resp.getWriter();
                out.println("인증안됨");
            }
        }
    }

    @Override
    public boolean filter(Object provider) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'filter'");
    }

}
