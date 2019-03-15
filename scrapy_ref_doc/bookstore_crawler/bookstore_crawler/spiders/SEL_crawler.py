# -*- coding: utf-8 -*-
from scrapy import Spider
from scrapy.http import Request
from scrapy.selector import Selector

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from time import sleep
import os



class SelCrawlerSpider(Spider):
    name = 'SEL_crawler'
    allowed_domains = ['books.toscrape.com']

    def start_requests(self):
    	#self.driver = webdriver.Chrome('/home/stakes/Desktop/chromedriver')
    	#OR
    	#self.driver = webdriver.Firefox()

    	#remember to install chromium browser binary with "sudo apt-get install chromium-browser"
    	# and save the chromedriver file in the spider directory
    	self.driver = webdriver.Chrome(os.path.dirname(os.path.abspath(__file__)) + '/chromedriver')
    	
    	self.driver.get('http://books.toscrape.com')

    	sel = Selector(text= self.driver.page_source)
    	books = sel.xpath('//h3/a/@href').extract()
    	for book in books:
    		url  = 'http://books.toscrape.com/' + book
    		yield Request(url, callback = self.parse_book)

    	while True:
    		try:
    		
	    		next_page = self.driver.find_element_by_xpath('//a[text()="next"]')
	    		sleep(3)
	    		self.logger.info('Sleeping for 3 seconds.')
	    		next_page.click()

	    		sel = Selector(text = self.driver.page_source)
	    		books = sel.xpath('//h3/a/@href').extract()
	    		for book in books:
	    			# after first page, the remaining did not include "catalogue in href value"
	    			url  = 'http://books.toscrape.com/catalogue/' + book 
	    			yield Request(url, callback = self.parse_book)


    		except NoSuchElement:
    			self.logger.info('No more pages to load')
    			self.driver.quit()
    			pass
    	

    def parse_book(self, response):
    	pass
