from selenium import webdriver
from unittest import TestCase, main
import selenium
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome("/Users/Nabil/Downloads/chromedriver")
website = "http://localhost:3000/"
prod_website = "https://hikeadvisor.me/"

class TestGUI(TestCase):
	def test_load(self):
		driver.get(website)
		assert driver.current_url == website

	def test_states(self):
		driver.get(website)
		link = driver.find_element_by_link_text("STATES")
		link.click()
		assert driver.current_url == website + "states/0"
		assert "State Lookup" in driver.page_source

	def test_animals(self):
		driver.get(website)
		link = driver.find_element_by_link_text("ANIMALS")
		link.click()
		assert driver.current_url == website + "animals/0"
		assert "Animal Dictionary" in driver.page_source

	def test_trails(self):
		driver.get(website)
		link = driver.find_element_by_link_text("TRAILS")
		link.click()
		assert driver.current_url == website + "trails/0"

	def test_about(self):
		driver.get(website)
		link = driver.find_element_by_link_text("ABOUT")
		link.click()
		assert driver.current_url == website + "about"
		assert "Team" in driver.page_source

	def test_state_instance(self):
		driver.get(website)
		link = driver.find_element_by_link_text("STATES")
		link.click()
		link = driver.find_element_by_xpath("//*[text()='Alabama']") 
		link.click()
		assert "Alabama" in driver.page_source
		assert "Capital: Montgomery" in driver.page_source

	def test_animal_instance(self):
		driver.get(website)
		link = driver.find_element_by_link_text("ANIMALS")
		link.click()
		link = driver.find_element_by_xpath("//*[text()='Animals']") 
		link.click()
		assert "Origin State" in driver.page_source
		assert "Common Trails" in driver.page_source

	def test_trail_instance(self):
		driver.get(website)
		link = driver.find_element_by_link_text("TRAILS")
		link.click()
		link = driver.find_element_by_xpath("//*[text()='Angels Landing']") 
		link.click()
		assert "Highest Elevation" in driver.page_source
		assert "Latitude" in driver.page_source

	def test_pagination(self):
		driver.get(website)
		link = driver.find_element_by_link_text("TRAILS")
		link.click()
		assert driver.current_url == website + "trails/0"
		driver.find_element_by_xpath('//button[normalize-space()="2"]').click()
		assert driver.current_url == website + "trails/1"

if __name__ == "__main__":
	main()
