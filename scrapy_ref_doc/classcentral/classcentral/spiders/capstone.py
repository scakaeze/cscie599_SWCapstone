# -*- coding: utf-8 -*-
import scrapy


class CapstoneSpider(scrapy.Spider):
    name = 'capstone'
    allowed_domains = ['google.com']
    start_urls = ['http://google.com/']

    def parse(self, response):
        pass
