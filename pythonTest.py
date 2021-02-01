from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

browser = webdriver.Chrome("./chromdriver/chromedriver.exe")
browser.get("http://naver.com")

elem = browser.find_element_by_class_name("link_login")
elem.click()

#id, pass 입력
#browser.find_element_by_id("id").send_keys("내 아이디 입력")
#browser.find_element_by_id("pw").send_keys("내 비밀번호 입력")

browser.find_element_by_id("id").send_keys("naver_id")
browser.find_element_by_id("pw").send_keys("naver_pw")

browser.find_element_by_id("log.login").click()

#id를 새로 입력
time.sleep(3)

browser.find_element_by_id("id").clear()
browser.find_element_by_id("id").send_keys("my_id")

# 이후 bs4 이용하면 된다
# html 정보 출력

print(browser.page_source)  #html 문서 전부 가져오기
browser.quit()