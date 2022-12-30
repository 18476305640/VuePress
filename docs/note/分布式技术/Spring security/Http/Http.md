# Http

## 目录

### \[\_1\_] http请求

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16525986902861652598690141.png)

在VScode上安装插件`REST Client`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16525988290121652598828886.png)

创建一个项目，编写一个后缀名为`.http`的文件：

```http
###
GET http://127.0.0.1:8080/demo/test HTTP/1.1
Authorization: Basic user 14618de1-3d34-4592-9d7f-6071385b06ac

###
POST http://127.0.0.1:8080/demo/test?user=小庄 HTTP/1.1
Authorization: Basic user 9323c6c6-98fe-4ee0-b99c-c67e44fdb44f

###
PUT http://127.0.0.1:8080/demo/test/小庄 HTTP/1.1
Authorization: Basic user 9323c6c6-98fe-4ee0-b99c-c67e44fdb44f

###
POST http://127.0.0.1:8080/demo/user HTTP/1.1
Authorization: Basic user ce6a2830-a32c-4314-9123-8853a05bbb5a
Content-Type: application/json

{
    "name": "zhuangjie",
    "sex": "男"
}

```

去请求：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16525989750331652598974933.png)

### \[\_2\_] http 响应

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526010898531652601089679.png)

*   [有哪些状态码？](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E4%BF%A1%E6%81%AF%E5%93%8D%E5%BA%94 "有哪些状态码？")

    1XX

    2XX

    200：请求成功

    3XX

    重定向

    4XX

    401：需要登录

    403：没有权限

    404：资源找不到

    405：请求方式不对，GET\POST..

    5XX:

    500：服务端出错
