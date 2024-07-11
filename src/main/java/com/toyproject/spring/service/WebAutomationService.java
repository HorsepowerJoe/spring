package com.toyproject.spring.service;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebAutomationService {
    private final WebDriver webDriver;
    private final String url = "http://59.13.64.73:8085";
    private final String loginUrl = url + "/loginForm";
    private final String freeBoardUrl = url + "/freeBoard";

    public void login(String username, String password) {
        try {
            WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(10));
            webDriver.get(loginUrl);

            wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));

            WebElement emailInput = webDriver.findElement(By.id("email"));
            emailInput.sendKeys(username);

            WebElement passwordInput = webDriver.findElement(By.id("password"));
            passwordInput.sendKeys(password);

            WebElement loginButton = webDriver.findElement(By.id("loginButton"));
            loginButton.click();

            wait.until(ExpectedConditions.urlContains(url));
        } catch (TimeoutException e) {
            e.printStackTrace();
        }
    }

    public void crawlAndCommentOnFreeBoard(String keyword, String comment) {
        webDriver.get(freeBoardUrl);
        WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(10));

        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("clickable")));
        } catch (TimeoutException e) {
            System.out.println(e.getMessage());
            return;
        }

        List<WebElement> clickable = webDriver.findElements(By.className("clickable"));
        System.out.println("\n\n 몇개찾았나 " + clickable.size() + "\n\n\n");
        JavascriptExecutor executor = (JavascriptExecutor) webDriver;

        for (int i = 0; i < clickable.size(); i++) {
            try {
                // 각 반복에서 게시글 요소를 다시 찾음
                clickable = webDriver.findElements(By.className("clickable"));
                WebElement post = clickable.get(i);

                String title = post.findElement(By.xpath("./td[@id='title']")).getText();

                if (title.contains(keyword)) {
                    executor.executeScript("arguments[0].click();", post);

                    wait.until(ExpectedConditions.presenceOfElementLocated(By.className("freeBoardReplyName")));
                    WebElement commentName = webDriver.findElement(By.className("freeBoardReplyName"));
                    commentName.sendKeys("자동화테스트");

                    WebElement commentInput = webDriver.findElement(By.id("commentInput"));
                    commentInput.sendKeys(comment);

                    WebElement submitButton = webDriver.findElement(By.className("commentSubmit"));
                    executor.executeScript("arguments[0].click();", submitButton);

                    webDriver.navigate().back();
                    wait.until(ExpectedConditions.presenceOfElementLocated(By.className("clickable")));
                }
            } catch (NoSuchElementException | StaleElementReferenceException e) {

                System.out.println("Exception 발생: " + e.getMessage());
            }
        }
    }

    public void quitWebDriver() {
        webDriver.quit();
    }
}
