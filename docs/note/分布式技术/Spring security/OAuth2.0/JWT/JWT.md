# JWT

## 目录

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16468067679271646806767868.png)

### 1.1 Jwt结构概述

**Session与Token：**

> 单体应用时，使用session+cookie就可以，并且session的信息也是可以确认用户的信息的，用户认证成功后，在服务端生成用户相关的数据保存在session(当前会话)，而发
> 给客户端的 sesssion\_id 存放到 cookie 中，这样用客户端请求时带上 session\_id 就可以验证服务器端是否存在session 数据，以此完成用户的合法校验。当用户退出系统或session过期销毁时,客户端的session\_id也就无效了 ，[更多>>](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16468913969251646891396134.png "更多>>") 。但如果是分布式场景时，此时就会存在问题了，多个服务之间，session是不同步的，为解决这个问题我们就有了"session黏贴"，但这缺点很明显，当我们该服务宕机时，那么前端是无法获取请求了，还有在不同微服务间还是不适用的。这个问题仍然存在，然后又有了"session复制"，但当我们访问很快时，服务器复制还没完成时，那么当我们访问了没有session时，就会让我们重新登录了。这又是一个问题。从而又引出了"session的集中存储"，可以使用Redis进行存储，但美中不足的是session是放在服务端的，当我们并发访问过多时，有可能出现问题。从而引出了token的方式，这是一种无状态的。token存储在客户端cookie时。

**JWT令牌：**

Jwt令牌可以存储用户的信息，可以让服务知道是哪个用户的访问。如果是普通的令牌，它只是一串无意义的令牌 ，那么服务是不知道访问的用户的，服务还需要进行请求来获取用户的信息。

**具体结构：**

JWT分为三部分，分别是Header（头部）、Payload（负载）、Signature（签名）。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16468066799781646806679905.png)

*   Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。`alt` 是最后加密的签名方式，`typ` 是JWT,JWT令牌统一写为'jwt'。

    ```c
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    ```

*   Plyload：Payload 部分也是一个 JSON 对象，存放的是能代表用户，注意不要存放私密的信息。用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

    ```c
    iss (issuer)：签发人
    exp (expiration time)：过期时间
    sub (subject)：主题
    aud (audience)：受众
    nbf (Not Before)：生效时间
    iat (Issued At)：签发时间
    jti (JWT ID)：编号
    ```

    Plyload例子：

    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
    }
    ```

*   Signature 部分是对前两部分的签名，防止数据篡改。

    Signature 信息是如何生成的呢？首先需要我们自定义一个密钥(比如"secret")，用来加密这个数据，

    ```java
    HMACSHA256(
      base64UrlEncode(header) + "." +base64UrlEncode(payload),
      "secret")
    ```

### 2.1 Jwt的使用

maven依赖：

```xml
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.1</version>
        </dependency>
```

使用：

```java
package com.zjazn.jwt;

import io.jsonwebtoken.*;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.UUID;

public class main {
    //加解密使用
    private String key = "zjazn";
    @Test
    public void en(){
        long time_length = 1*12*60*60*1000; //一天的毫秒数
        JwtBuilder jwtBuilder = Jwts.builder();
        String jwtToken = jwtBuilder
                //header
                .setHeaderParam("typ","JWT")
                .setHeaderParam("alg","HS256")
                //payload
                .claim("username","zhuangjie")
                .claim("role","admin")
                .setSubject("admin-test")
                .setExpiration(new Date(System.currentTimeMillis() + time_length))
                .setId(UUID.randomUUID().toString())
                //signature
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        System.out.println("1、生成的jwtToken:\n"+jwtToken);

        //去解密
        parse(jwtToken);


    }
    @Test
    public void parse(String token) {
        JwtParser jwtParser = Jwts.parser();
        Jws<Claims> claimsJws = jwtParser.setSigningKey(key).parseClaimsJws(token);
        Claims body = claimsJws.getBody();
        System.out.println("2、解密的内容：");
        //自定义的
        System.out.println(body.get("username"));
        System.out.println(body.get("role"));
        //jwt内置
        System.out.println(body.getId());
        System.out.println(body.getSubject());
        System.out.println(body.getExpiration());
    }
}

```
