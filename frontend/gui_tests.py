from selenium import webdriver
from unittest import TestCase, main
import selenium
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome("/Users/Nabil/Downloads/chromedriver")
website = "http://hikeadvisor.me"

class TestGUI(TestCase):
	def test_load(self):
		driver.get(website)
		print(driver.current_url)
		assert driver.current_url == "https://hikeadvisor.me/"

	def test_states(self):
		driver.get(website)
		link = driver.find_element_by_link_text("STATES")
		link.click()
		assert driver.current_url == "https://hikeadvisor.me/states"

	def test_animals(self):
		driver.get(website)
		link = driver.find_element_by_link_text("ANIMALS")
		link.click()
		assert driver.current_url == "https://hikeadvisor.me/animals"

	def test_trails(self):
		driver.get(website)
		link = driver.find_element_by_link_text("TRAILS")
		link.click()
		assert driver.current_url == "https://hikeadvisor.me/trails/0"

	def test_about(self):
		driver.get(website)
		link = driver.find_element_by_link_text("ABOUT")
		link.click()
		assert driver.current_url == "https://hikeadvisor.me/about"

if __name__ == "__main__":
	main()
