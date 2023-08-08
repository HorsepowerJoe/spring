package com.toyproject.spring.filter;

import java.io.IOException;

import javax.imageio.spi.ServiceRegistry.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class MyFilter2 implements Filter, javax.servlet.Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {
        chain.doFilter(req, resp);
    }

    @Override
    public boolean filter(Object provider) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'filter'");
    }

}
