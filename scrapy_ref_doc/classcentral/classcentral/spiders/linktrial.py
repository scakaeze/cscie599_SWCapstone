# -*- coding: utf-8 -*-
import scrapy


class LinktrialSpider(scrapy.Spider):
    name = 'linktrial'
    allowed_domains = ['classcentral.com/course/edx-agile-software-development-6878']
    start_urls = ['http://classcentral.com/course/edx-agile-software-development-6878/']

    def parse(self, response):
        pass
