# Python爬虫

环境的搭建

1.  安装python: [https://www.cnblogs.com/zjazn/p/15364795.html](https://www.cnblogs.com/zjazn/p/15364795.html "https://www.cnblogs.com/zjazn/p/15364795.html")

2.  安装环境：

```sh=
python3 -m venv venv_name
cd venv_name/bin
source activate  //进入独立环境
pip install beautifulsoup4  //安装beautifulsoup4
python3 //直接python3
from bs4 import BeautifulSoup //导入beautifulsoup4 不报错则安装成功
exit() #退出python3

//如何要使用编辑器
mkdir ../../scraping_std
cd  ../../scraping_std
python -m  idlelib //启动编辑器-"new File" - Run

```

在专业编辑器上使用专用编辑器

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16342170963681634217096336.png)

## 爬虫学习

BeautifulSoup在线文档

1、\[正式实例]抓取果核剥壳文章

```python==
import requests
from bs4 import BeautifulSoup
#下载网络文件
def download(file_url, save_ful_name):
    file_stream = requests.get(file_url, stream=True)
    with open(save_ful_name, 'wb') as file:
        for block in file_stream.iter_content(1024):
            file.write(block)
#将文本保存为本地文件
def write_to_local(file_path, content):
    paper = open(file_path, mode='w',encoding='utf-8')
    paper.write(content)

#将页面url html转为对象
def page_to_obj(page_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive'
    }
    page = requests.get(page_url, headers=headers)
    return BeautifulSoup(page.content, 'html.parser')
#进度视图
def percentage_view(val):
    sum_block = 0
    view = ""
    if val > 1:
        sum_block = (val.__floor__()/10).__floor__()
    else:
        sum_block = ((val*100).__floor__()/10).__floor__()
    view += "["
    for block in range(1, sum_block+1):
        view += "#"
    for blank in range(sum_block+1, 11):
        view += "_"
    view += "]"
    return view

if __name__ == "__main__":
    count_obj = page_to_obj('https://www.ghxi.com/category/all')
    count_txt = count_obj.find('li', {"class": "disabled"}).get_text()
    start_page_number = int(count_txt.split("/")[0])
    end_page_number = int(count_txt.split("/")[1])
    for i in range(start_page_number, end_page_number):
        print("【开始抓取{}/{}页，当前进度{} 】".format(i,end_page_number, percentage_view(i/end_page_number)))
        page_url = 'https://www.ghxi.com/category/all/page/{}'.format(i)
        item_page_obj = page_to_obj(page_url)
        page_items = item_page_obj.findAll('h2', {"class": "item-title"})
        for page_item in page_items:
            page_item_title = page_item.find('a').get_text().strip().replace("/", "或").replace("|", "或").replace("?", " ").replace("*", "~")
            page_item_link = page_item.find('a').attrs['href']
            page_item_content = page_to_obj(page_item_link).find("div", {"class": "entry-content"}).get_text()
            write_to_local(page_item_title+".txt", page_item_content)
            print("{}\t\t{}".format(page_item_title, page_item_link))
```

2、\[正式实例]  抓取乐愚蓝奏云链接\[使用到下面的函数]

```python==
def climb_pages_item():
    share_file = open('leyu_share_links.txt', 'a+', encoding='utf-8')
    def link_write_local(in_stream, links):
        for link in links:
            print("正在写入文件...")
            in_stream.write("{}\n".format(json.dumps(link)))
            in_stream.flush()
            print("[end]")

    #1、如何获取总页面数  返回总页数
    page_count = 527
    for n in range(0,page_count):
        print("正在抓取{}/{}".format(n+1,page_count)+percentage_view((n+1)/page_count))
        #如何根据页数，返回要跳转的链接  返回跳转链接
        tar_page_link = "https://bbs.leyuz.net/f/ruanjian?pn={}&od=0".format(n+1)
        link_obj = page_to_obj(tar_page_link)
        #如何从页面中获取item对象； 返回item_obj对象
        items_obj = link_obj.findAll("a", {"class": "tag-title"})
        for item_obj in items_obj:
            #item_obj  返回item_link
            item_link = "https://bbs.leyuz.net"+item_obj.attrs['href']
            #从item详情页中获取content
            item_content = page_to_obj(item_link).find('article', {"class": "blog-main"})
            if item_content != None:
                item_content = item_content.get_text()
            else:
                item_content = ''
            #从item详情页中获取评论（数组对象）
            items_comment = page_to_obj(item_link).find('article', {"class": "am-comment"})
            item_sum_text = ''
            if items_comment != None:
                for item_comment in items_comment:
                    item_sum_text += item_comment.get_text()+"\n"
            item_all_content = item_content+"\n"+item_sum_text
            #筛选特征分享链接
            _share =  get_share_link(item_all_content, 'lanzou');
            link_write_local(share_file, _share)
            print(_share)
    share_file.close()
```

10、\[正式函数] 函数

```python=
import requests
from bs4 import BeautifulSoup
import re
from PyPDF2 import PdfFileReader, PdfFileWriter

import json
import os
from tkinter import *
from tkinter import ttk


#下载网络文件
def download(file_url, save_ful_name):
    file_stream = requests.get(file_url, stream=True)
    with open(save_ful_name, 'wb') as file:
        for block in file_stream.iter_content(1024):
            file.write(block)
#将文本保存为本地文件
def write_to_local(file_path, content):
    paper = open(file_path, mode='w',encoding='utf-8')
    paper.write(content)

#将页面url html转为对象
def page_to_obj(page_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive'
    }
    page = requests.get(page_url, headers=headers)
    return BeautifulSoup(page.content, 'html.parser')
#进度视图
def percentage_view(val):
    sum_block = 0
    view = ""
    if val > 1:
        sum_block = (val.__floor__()/10).__floor__()
    else:
        sum_block = ((val*100).__floor__()/10).__floor__()
    view += "["
    for block in range(1, sum_block+1):
        view += "#"
    for blank in range(sum_block+1, 11):
        view += "_"
    view += "]"
    return view
    
#操作的字符
def ctl_string(ctl_string, re_str, limit ) -> object:
    if type(limit) == list:
        #进行搜索模式 参数： 操作的字符串(str)  re(str) [start_index,end_index]
        pattern = re.compile(r'{}'.format(re_str))
        if len(limit) == 0:
            return pattern.findall(ctl_string)
        else:
            return pattern.findall(ctl_string, limit[0], limit[1])
    elif type(limit) == int:
        #进入替换模式 参数：操作的字符串(str) [re,replace_str] count(int)
        if limit == 0:
            return re.sub(re_str[0], re_str[1], ctl_string)
        else:
            return re.sub(re_str[0], re_str[1], ctl_string, limit)
    else:
        raise RuntimeError('第三个参数有重要作用，传入是一个整数值是替换操作，代表替换的数量，传入一个二值整形数组是查找，是查找的位置范围')



#将pdf指定的多个的页面转到新的pdf文件中
#pdf_page_pick("ctl.pdf", [5, 6], to="split.pdf")
def pdf_page_pick(pdf_file_path, pages, to):
    pdf_file_stream = open(r"{}".format(pdf_file_path), "rb") #要读取的pdf文件
    pdf_read = PdfFileReader(pdf_file_stream)  #读取pdf为处理对象
    pdf_write = PdfFileWriter()  #创建pdf写处理对象
    for n in pages:
        print("当前索引{}".format(n))
        pdf_write.addPage(pdf_read.getPage(n-1))  #将要求的页面添加到写的队列中
    child_pdf_stream = open(r"{}".format(to), "wb") #创建文件的输出流
    pdf_write.write(child_pdf_stream) #开始输出


#传一html中file name
def get_html_file_name(page_text):
    _name = ctl_string(page_text, "\>.+\.[0-9|A-z]+[^(com)|(con)|\>|\;]<\/", [])
    if len(_name) > 0:
        return _name[0][1:][:-2]
    else:
        return None
        
#扫描文本字符串有指定的链接并扫描最近可能的四位分享提取码
def get_share_link(text_str, features):
   def clean_key_str(dirty_key):
       new_key = ctl_string(dirty_key, "[\w]{4}", [])
       if len(new_key) < 1:
           return ""
       return new_key[0]
   #安全访问数组，避免越界访问
   def security_access_array(arr,index):
       if len(arr) > index:
           return arr[index]
       else:
           return None
   #开始准备利用正则获取分享链接信息，并最终加入到一个数组中
   re = 'http[s]?:\/\/[A-z|0-9|\.|\/|\-]+'
   share_links = ctl_string(text_str, re, [])  #不具有特征的分享链接或全部链接
   key_seach_between = []
   for share in share_links:
       index = text_str.index(share)
       if(len(key_seach_between) != 0):
           key_seach_between.insert(len(key_seach_between), index)
       key_seach_between.insert(len(key_seach_between), index+len(share))
   key_seach_between.insert(len(key_seach_between),-1)
   #开始获取分享链接的提取码并且合并分享信息到一个对象数组中
   shares = [] #全部的分享信息
   share_info = {'link': "", 'key': ""}  #分享信息单元
   point = 0
   end_index = len(key_seach_between) - 2
   current_link_index = 0
   while(point <= end_index):
        tail_index = 0
        if key_seach_between[point+1] == -1:
            tail_index = len(text_str)
        else:
            tail_index = key_seach_between[point+1]
        #print("在{}到{}这个范围查找提取码".format(key_seach_between[point], tail_index ))

        key = security_access_array(ctl_string(text_str, "[:|：| ]+?[0-9|A-z]{4}[^0-9|^A-z]+?", [key_seach_between[point], tail_index]), 0)
        share_info['link'] = share_links[current_link_index]
        share_info['key'] = clean_key_str(key if (key != None) else '')
        shares.insert(len(shares), share_info)
        point += 2
        current_link_index += 1
        share_info = {'link': "", 'key': ""} #重置分享信息
   #筛选出具有特征的链接
   false_link_count = 0
   _shares = [] #具有目标特征的分享链接
   for _share in shares:
       try:
           has_share = _share['link'].index(features)
       except Exception as e:
           has_share = None
           false_link_count += 1
       if has_share != None:
           _shares.insert(len(_shares), _share)
   print("扫描完成，一共有：{}个链接，特征链接{}个，假链接{}个！".format(len(shares), len(shares)-false_link_count, false_link_count))
   return _shares
   
   
#对文本行进行操作，返回为新行
def text_line_ctl(local_file_path, ctl_fun):
    ##
    # def _ctl(line, line_n):
    #     if line_n == 0:
    #         return line
    #     return line + "已作修改！"
    #
    # text_line_ctl("leyu_share_links.txt", _ctl)
    ##
    def join(arr, between_str):
        result = ''
        length = len(arr)
        for n in range(0, length):
            result += (arr[n] + between_str)
        return result
    try:
        r = open(local_file_path, 'r', encoding='utf-8')
        split = r.read().split("\n")
        if split[len(split) - 1] == "":
            del split[len(split) - 1]
        temp_file = open("ctl-{}".format(local_file_path), 'w+', encoding="utf-8")
        for n in range(0, len(split)):
            new_line = ctl_fun(split[n], n)

            temp_file.write(new_line+"\n")
            temp_file.flush()

            split[n] = new_line
        new_text = join(split, "\n")
        w = open(local_file_path, 'w', encoding='utf-8')
        w.write(new_text)
    finally:
        temp_file.close()
        r.close()
        w.close()
   
#对文本文件的内容进行替换 replace_text_content("leyu_share_links.txt", "lanzous", "lanzoui")
def replace_text_content(file_path,update_before,update_after):
    file_r = open(file_path, 'r', encoding="utf-8")

    try:
        new_text_content = ctl_string(file_r.read(), [update_before, update_after], 0)
        print(new_text_content)
        file_w = open(file_path, 'w', encoding="utf-8")
        file_w.write(new_text_content)
    finally:
        file_r.close()
        file_w.close()

```

## 控制浏览器

```python==
from selenium import webdriver
#需要下载安装 chromedriver.exe
#下载：https://npm.taobao.org/mirrors/chromedriver
#文档：https://www.selenium.dev/zh-cn/documentation/overview/
browser = webdriver.Chrome(executable_path='./chromedriver.exe')
def tips_and_go(selector):
    elem = browser.find_element_by_css_selector(selector)
    print("开始点击：{}".format(elem.text))
    elem.click()
    # 等待新标签页完成加载内容
def to_last_window():
    window_ids = browser.window_handles
    last_id = window_ids[len(window_ids)-1]
    browser.switch_to.window(last_id)
    print("当前窗口是：{}".format(browser.current_window_handle))

def close_window(closed_to):
    browser.close()
    window_ids = browser.window_handles
    browser.switch_to.window(window_ids[closed_to])
def end_browser():
    for id in browser.window_handles:
        to_last_window()
        browser.close()

browser.get("https://www.baidu.com")
tips_and_go("#s-top-left > a:nth-child(1)")
to_last_window()
tips_and_go('#channel-all > div > ul > li:nth-child(3) > a')

close_window(closed_to=0)
print(browser.current_window_handle)

end_browser()
```
