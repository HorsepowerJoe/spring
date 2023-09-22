package com.toyproject.spring.commandLineRunner;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.toyproject.spring.model.Grooming;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.repository.GroomingQnaRepository;
import com.toyproject.spring.repository.GroomingRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DummyDataLoader implements CommandLineRunner {
    private final GroomingRepository groomingRepository;
    private final GroomingQnaRepository groomingQnaRepository;

    @Override
    public void run(String... args) throws Exception {

        for (int i = 0; i < 50; i++) {
            GroomingQna qna = new GroomingQna();
            qna.setCustomerNum(1L);
            qna.setGroomingQnaContent(i + "test");
            qna.setGroomingQnaTitle(i + "test");
            groomingQnaRepository.save(qna);
        }

    }

}
