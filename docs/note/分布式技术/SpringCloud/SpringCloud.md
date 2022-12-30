# SpringCloud

这里的代码格式乱了，老师脑图：[https://gitmind.cn/app/doc/6cc5960899](https://gitmind.cn/app/doc/6cc5960899 "https://gitmind.cn/app/doc/6cc5960899")

我的实践代码：[https://github.com/18476305640/springcloud2021](https://github.com/18476305640/springcloud2021 "https://github.com/18476305640/springcloud2021")

# SpringCloud 伴我随行

## SpringCloud介绍

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/44a20wpkvtn.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210407170707704.png)

**SpringClound**

就是分布式微服务架构的一站式解决方案，是多种微服务架构落地技术的集合体，俗称微服务全家桶。

**功能：**

服务注册与发现、服务调用、服务熔断、负载均衡、服务降级、服务消息队列、配置中心管理、服务网关、

服务监控、全链路追踪、自动化构建部署、服务定时任务调度操作

**版本对应**：[https://start.spring.io/actuator/info](https://start.spring.io/actuator/info "https://start.spring.io/actuator/info")

**Cloud升级与技术选型：**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/Cloud升级.png)

## 父工程的创建

路线：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/父工程的创建.png)

`创建`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408193923573.png)

`编辑器编码`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408193812398.png)

`开启注解`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408193825474.png)

`选择java版本`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408194328379.png)

`在编辑器中隐藏不想显示的文件后缀类型`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408193906937.png)

`pom.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <modelVersion>4.0.0</modelVersion>  
  <groupId>com.atguigu.springcloud</groupId>  
  <artifactId>cloud2020</artifactId>  
  <version>1.0-SNAPSHOT</version>  
  <packaging>pom</packaging>
  <!--1-->  
  <name>Maven</name>  
  <!-- FIXME change it to the project's website -->  
  <url>http://maven.apache.org/</url>  
  <inceptionYear>2001</inceptionYear>  
  <distributionManagement> 
    <site> 
      <id>website</id>  
      <url>scp://webhost.company.com/www/website</url> 
    </site> 
  </distributionManagement>  
  <!--统一管理jar包版本-->  
  <properties> 
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
    <maven.compiler.source>1.8</maven.compiler.source>  
    <maven.compiler.target>1.8</maven.compiler.target>  
    <junit.version>4.12</junit.version>  
    <log4j.version>1.2.17</log4j.version>  
    <lombok.version>1.16.18</lombok.version>  
    <mysql.version>5.1.47</mysql.version>  
    <druid.version>1.1.16</druid.version>  
    <mybatis.spring.boot.version>1.3.0</mybatis.spring.boot.version> 
  </properties>  
  <!--子模块继承之后，提供作用：锁定版本+子module不用groupId和version-->  
  <dependencyManagement> 
    <dependencies> 
      <!--spring boot 2.2.2-->  
      <dependency> 
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-dependencies</artifactId>  
        <version>2.2.2.RELEASE</version>  
        <type>pom</type>  
        <scope>import</scope> 
      </dependency>  
      <!--spring cloud Hoxton.SR1-->  
      <dependency> 
        <groupId>org.springframework.cloud</groupId>  
        <artifactId>spring-cloud-dependencies</artifactId>  
        <version>Hoxton.SR1</version>  
        <type>pom</type>  
        <scope>import</scope> 
      </dependency>  
      <!--spring cloud alibaba 2.1.0.RELEASE-->  
      <dependency> 
        <groupId>com.alibaba.cloud</groupId>  
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>  
        <version>2.1.0.RELEASE</version>  
        <type>pom</type>  
        <scope>import</scope> 
      </dependency>  
      <dependency> 
        <groupId>mysql</groupId>  
        <artifactId>mysql-connector-java</artifactId>  
        <version>${mysql.version}</version> 
      </dependency>  
      <dependency> 
        <groupId>com.alibaba</groupId>  
        <artifactId>druid</artifactId>  
        <version>${druid.version}</version> 
      </dependency>  
      <dependency> 
        <groupId>org.mybatis.spring.boot</groupId>  
        <artifactId>mybatis-spring-boot-starter</artifactId>  
        <version>${mybatis.spring.boot.version}</version> 
      </dependency>  
      <dependency> 
        <groupId>junit</groupId>  
        <artifactId>junit</artifactId>  
        <version>${junit.version}</version> 
      </dependency>  
      <dependency> 
        <groupId>org.projectlombok</groupId>  
        <artifactId>lombok</artifactId>  
        <version>${lombok.version}</version>  
        <optional>true</optional> 
      </dependency> 
    </dependencies> 
  </dependencyManagement>  
  <build> 
    <plugins> 
      <plugin> 
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-maven-plugin</artifactId>  
        <configuration> 
          <fork>true</fork>  
          <addResources>true</addResources> 
        </configuration> 
      </plugin> 
    </plugins> 
  </build>
</project>

```

最终父工程：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210408203151556.png)

## Model 创建与步骤

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210409214641100.png)

#### 建model

#### pom依赖

```xml
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <parent> 
    <artifactId>cloud2020</artifactId>  
    <groupId>com.atguigu.springcloud</groupId>  
    <version>1.0-SNAPSHOT</version> 
  </parent>  
  <modelVersion>4.0.0</modelVersion>  
  <artifactId>cloud-provider-payment8001</artifactId>  
  <dependencies> 
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-web</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-actuator</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.mybatis.spring.boot</groupId>  
      <artifactId>mybatis-spring-boot-starter</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>com.alibaba</groupId>  
      <artifactId>druid-spring-boot-starter</artifactId>  
      <version>1.1.10</version> 
    </dependency>  
    <!--mysql-connector-java-->  
    <dependency> 
      <groupId>mysql</groupId>  
      <artifactId>mysql-connector-java</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-jdbc</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-devtools</artifactId>  
      <scope>runtime</scope>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.projectlombok</groupId>  
      <artifactId>lombok</artifactId>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-test</artifactId>  
      <scope>test</scope> 
    </dependency> 
  </dependencies>
</project>

```

#### 写yml

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-provider-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource      #当前数据源操作类型
    driver-class-name: org.gjt.mm.mysql.Driver        #mysql驱动包
    url: jdbc:mysql://localhost:3306/db2019?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 3333


mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.atguigu.springcloud.entities       #所有Entity别名类所在包

```

#### 主启动类

```java
package com.atguigu.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplicationpublic
class PaymentMain8001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8001.class, args);
    }
}

```

#### 业务类

#### 建表sql

```sql
CREATE TABLE `payment`(  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',  `serial` varchar(200) DEFAULT '',  PRIMARY KEY (`id`)) ENGING=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
```

#### entities

```java
package com.atguigu.springcloud.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructorpublic
class Payment implements Serializable { /*继承用于自动化部署*/

    private Long id;
    private String serial;
}

```

```java
//Json封装体CommentResult,传给前端，判断编码是否成功，成功才显示
package com.atguigu.springcloud.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructorpublic
class CommonResult<T> {
    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code, String message) {
        //泛型：如果装的payment 返回payment,装的order 返回order
        this(code, message, null);
    }

    //new CommonResult(200,'成功')。。？
}

```

#### dao

```java
package com.atguigu.springcloud.dao;

import com.atguigu.springcloud.entities.Payment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapperpublic
interface PaymentDao {
    int create(Payment payment);

    Payment getPaymentById(@Param("id")
    Long id);
}

```

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.atguigu.springcloud.dao.PaymentDao"> 
  <insert id="create" parameterType="Payment" useGeneratedKeys="true" keyProperty="id">insert into payment(serial) values (#{serial})</insert>  
  <resultMap id="BaseResultMap" type="com.atguigu.springcloud.entities.Payment"> 
    <id column="id" property="id" jdbcType="BIGINT"/>  
    <result column="serial" property="serial" jdbcType="VARCHAR"/> 
  </resultMap>  
  <select id="getPaymentById" parameterType="Long" resultMap="BaseResultMap">select * from payment where id=#{id}</select>
</mapper>

```

#### service

```java
package com.atguigu.springcloud.service;

import com.atguigu.springcloud.entities.Payment;

import org.apache.ibatis.annotations.Param;


public interface PaymentService {
    int create(Payment payment);

    Payment getPaymentById(@Param("id")
    Long id);
}

```

```java
package com.atguigu.springcloud.service.impl;

import com.atguigu.springcloud.dao.PaymentDao;
import com.atguigu.springcloud.entities.Payment;
import com.atguigu.springcloud.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Servicepublic
class PaymentServiceImpl implements PaymentService {
    @Resource
    private PaymentDao paymentDao;

    public int create(Payment payment) {
        return paymentDao.create(payment);
    }

    public Payment getPaymentById(Long id) {
        return paymentDao.getPaymentById(id);
    }
}

```

#### controller

```java
public CommonResult create(@RequestBody Payment payment){
    int result = paymentService.create(payment);
    log.info("*****插入结果："+result);
    if(result > 0){
        return new CommonResult(200,"插入数据成功,serverPort="+serverPort,result);
    }else{
        return new CommonResult(444,"插入数据失败",null);
    }
}
@GetMapping(value = "/payment/get/{id}")
public CommonResult getPaymentById(@PathVariable("id") Long id){
    Payment payment = paymentService.getPaymentById(id);
    log.info("*****查询结果："+payment);
    if(payment != null){
        return new CommonResult(200,"查询成功,serverPort="+serverPort,payment);
    }else{
        return new CommonResult(444,"没有对应记录,查询ID："+id,null);
    }
}
```

#### devtools热部署

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210409214726625.png)

`模块`

```xml
<?xml version="1.0" encoding="utf-8"?>

<!--热部署-->
<dependency> 
  <groupId>org.springframework.boot</groupId>  
  <artifactId>spring-boot-devtools</artifactId>  
  <scope>runtime</scope>  
  <optional>true</optional> 
</dependency>

```

`父工程`

```xml
<?xml version="1.0" encoding="utf-8"?>

<!--热部署-->
<build> 
  <plugins> 
    <plugin> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-maven-plugin</artifactId>  
      <configuration> 
        <fork>true</fork>  
        <addResources>true</addResources> 
      </configuration> 
    </plugin> 
  </plugins> 
</build>

```

`IDEA设置`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210409214329373.png)

`ctrl+shift+alt+/`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210409214433230.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210409214413380.png)

`重启IDEA`

### 消费者模块

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210410180546928.png)

`创建model`

普通Maven

`改pom`

```xml
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <parent> 
    <artifactId>cloud2020</artifactId>  
    <groupId>com.atguigu.springcloud</groupId>  
    <version>1.0-SNAPSHOT</version> 
  </parent>  
  <modelVersion>4.0.0</modelVersion>  
  <artifactId>cloud-consumer-order80</artifactId>  
  <properties> 
    <maven.compiler.source>8</maven.compiler.source>  
    <maven.compiler.target>8</maven.compiler.target> 
  </properties>  
  <dependencies> 
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-web</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-actuator</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-devtools</artifactId>  
      <scope>runtime</scope>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.projectlombok</groupId>  
      <artifactId>lombok</artifactId>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-test</artifactId>  
      <scope>test</scope> 
    </dependency> 
  </dependencies>
</project>

```

`写yml`

```yaml
server:  port: 86
```

`主启动类`

```java
package com.atguigu.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplicationpublic
class OrderMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class, args);
    }
}

```

`entities`

```java
package com.atguigu.springcloud.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructorpublic
class CommonResult<T> {
    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code, String message) {
        this(code, message, null);
    }
}

```

```java
package com.atguigu.springcloud.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import sun.rmi.runtime.Log;


@Data
@AllArgsConstructor
@NoArgsConstructorpublic
class Payment {
    private Log id;
    private String serial;
}

```

`config`

```java
package com.atguigu.springcloud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.client.RestTemplate;


@Configurationpublic
class ApplicationContextConfig {
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}

```

`controller`

```java
package com.atguigu.springcloud.controller;

import com.atguigu.springcloud.entities.CommonResult;
import com.atguigu.springcloud.entities.Payment;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;


@RestController
@Slf4jpublic
class OrderController {
    private static final String PAYMENT_URL = "http://localhost:8001";
    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public CommonResult<Payment> create(Payment payment) {
        return restTemplate.postForObject(PAYMENT_URL + "/payment/create",
            payment, CommonResult.class);
    }

    @GetMapping("/consumer/payment/get/{id}")
    public CommonResult<Payment> getPayment(@PathVariable("id")
    Long id) {
        return restTemplate.getForObject(PAYMENT_URL + "/payment/get/" + id,
            CommonResult.class);
    }
}

```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210410181056211.png)

重构：

`common模块`

```java
package com.atguigu.springcloud.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructorpublic
class Payment {
    private Long id;
    private String serial;
}

```

```java
//Json封装体CommentResult,传给前端，判断编码是否成功，成功才显示
package com.atguigu.springcloud.entities;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {  //泛型：如果装的payment 返回payment,装的order 返回order

    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code,String message){
        this(code,message,null);
    }
}

```

```java
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <parent> 
    <artifactId>springcloud2021</artifactId>  
    <groupId>com.atguigu</groupId>  
    <version>1.0-SNAPSHOT</version> 
  </parent>  
  <modelVersion>4.0.0</modelVersion>  
  <artifactId>cloud-common</artifactId>  
  <dependencies> 
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-devtools</artifactId>  
      <scope>runtime</scope>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.projectlombok</groupId>  
      <artifactId>lombok</artifactId>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>cn.hutool</groupId>  
      <artifactId>hutool-all</artifactId>  
      <version>5.1.0</version> 
    </dependency> 
  </dependencies>
</project>

```

# 核心知识学习

## Eureka

### 注册中心 Eureka

![](https://img2018.cnblogs.com/blog/1117146/201905/1117146-20190510153141906-1290481315.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210417182416549.png)

`改pom`

```xml
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <parent> 
    <artifactId>springcloud2021</artifactId>  
    <groupId>com.atguigu</groupId>  
    <version>1.0-SNAPSHOT</version> 
  </parent>  
  <modelVersion>4.0.0</modelVersion>  
  <artifactId>cloud-eureka-server7001</artifactId>  
  <properties> 
    <maven.compiler.source>8</maven.compiler.source>  
    <maven.compiler.target>8</maven.compiler.target> 
  </properties>  
  <dependencies> 
    <!--引入我的自己的模块-->  
    <dependency> 
      <groupId>com.atguigu</groupId>  
      <artifactId>cloud-common</artifactId>  
      <version>1.0-SNAPSHOT</version> 
    </dependency>  
    <!--eureka-server-->  
    <dependency> 
      <groupId>org.springframework.cloud</groupId>  
      <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId> 
    </dependency>  
    <!--boot web actuator-->  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-web</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-actuator</artifactId> 
    </dependency>  
    <!--一般通用配置-->  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-devtools</artifactId>  
      <scope>runtime</scope>  
      <optional>true</optional> 
    </dependency>  
    <dependency> 
      <groupId>org.projectlombok</groupId>  
      <artifactId>lombok</artifactId> 
    </dependency>  
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-test</artifactId>  
      <scope>test</scope> 
    </dependency>  
    <dependency> 
      <groupId>junit</groupId>  
      <artifactId>junit</artifactId> 
    </dependency> 
  </dependencies>
</project>

```

`写yml`

```yaml
server:  port: 7001eureka:  instance:    hostname: eureka7001.com #eureka服务端的实例名称  client:    #false表示不向注册中心注册自己    register-with-eureka: false    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务    fetch-registry: false    service-url:      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址，相互注册      defaultZone: http://7002.cn.utools.club/eureka/
```

`主启动`

```java
package com.atguigu.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
//Eureka鏈嶅姟绔?
@EnableEurekaServer
public class EurekaMain7001 {
    public static void main(String[] args) {
        SpringApplication.run(EurekaMain7001.class,args);
    }
}

```

`入住服务`

```xml
<?xml version="1.0" encoding="utf-8"?>

<!--eureka-client client入驻server -->
<dependency> 
  <groupId>org.springframework.cloud</groupId>  
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> 
</dependency>

```

```yaml
server:
  port: 8002

spring:
  application:
    name: cloud-provider-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource      #当前数据源操作类型
    driver-class-name: org.gjt.mm.mysql.Driver        #mysql驱动包
    url: jdbc:mysql://localhost:3306/db2019?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: 3333


mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.atguigu.springcloud.entities       #所有Entity别名类所在包

#服务入驻
eureka:
  client:
    #表示是否将自己注册进EurekaServer默认为true
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
  instance:
    instance-id: payment-8002
    prefer-ip-address: true  #mouse hover时显示IP地址
```

```java
@SpringBootApplication
@EnableEurekaClientpublic
class PaymentMain8002 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8002.class, args);
    }
}

```

`集群`

就是多注册几个。

`RestTemplate负载均衡`

```java
package com.atguigu.springcloud.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.client.RestTemplate;


@Configurationpublic
class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    //赋于 负载均衡的能力
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

```java
package com.atguigu.springcloud.controller;
import com.atguigu.springcloud.entities.CommonResult;
import com.atguigu.springcloud.entities.Payment;
import com.atguigu.springcloud.lb.LoadBalancer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import javax.annotation.Resource;
import java.net.URI;
import java.util.List;

@RestController
@Slf4j
public class OrderController {
    //    private static final String PAYMENT_URL="http://localhost:8001";
    //通过在eureka上注册过的微服务名称调用
    private static final String PAYMENT_URL = "http://CLOUD-PROVIDER-SERVICE";
    @Resource
    private RestTemplate restTemplate;
    @Resource
    private LoadBalancer loadBalancer;
    @Resource
    private DiscoveryClient discoveryClient;

    @GetMapping("/consumer/payment/create")
    public CommonResult<Payment> create(Payment payment){
        return restTemplate.postForObject(PAYMENT_URL+"/payment/create",payment,CommonResult.class);
    }

    @GetMapping("/consumer/payment/get/{id}")
    public CommonResult<Payment> getPayment(@PathVariable("id") Long id){
        return restTemplate.getForObject(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);
    }
}
```

`可选： mouse hover 显示ip`

```java
#服务入驻eureka:  client:    #表示是否将自己注册进EurekaServer默认为true    register-with-eureka: true    fetch-registry: true    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka  instance:    instance-id: payment-8002    prefer-ip-address: true  #mouse hover时显示IP地址
```

### 服务发现 Discovery

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210417182416549.png)

`注入与使用Discovery`

```java
//PaymentControllerpackage com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.service.PaymentService;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.cloud.client.ServiceInstance;import org.springframework.cloud.client.discovery.DiscoveryClient;import org.springframework.web.bind.annotation.*;import javax.annotation.Resource;import java.util.List;@RestController@Slf4jpublic class PaymentController {    @Resource    private PaymentService paymentService;    @Value("${server.port}")    private String serverPort;    @Resource    private DiscoveryClient discoveryClient;    //只传给前端CommonResult，不需要前端了解其他的组件    @PostMapping(value = "/payment/create")    public CommonResult create(@RequestBody Payment payment){        int result = paymentService.create(payment);        log.info("*****插入结果："+result);        if(result > 0){            return new CommonResult(200,"插入数据成功,serverPort="+serverPort,result);        }else{            return new CommonResult(444,"插入数据失败",null);        }    }    @GetMapping(value = "/payment/get/{id}")    public CommonResult getPaymentById(@PathVariable("id") Long id){        Payment payment = paymentService.getPaymentById(id);        log.info("*****查询结果："+payment);        if(payment != null){            return new CommonResult(200,"查询成功,serverPort="+serverPort,payment);        }else{            return new CommonResult(444,"没有对应记录,查询ID："+id,null);        }    }    @GetMapping(value = "/payment/discovery")    public Object discovery() {        List<String> services = discoveryClient.getServices();        for (String element :services) {            log.info("*********element:"+element);        }        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PROVIDER-SERVICE");        for (ServiceInstance instance : instances) {            log.info(instance.getServiceId()+"\t"+instance.getHost()+"\t"+instance.getPort()+"\t"+instance.getUri());        }        return this.discoveryClient;    }}
```

`效果`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210417175651591.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210417175612544.png)

`禁止自我保护`

`--服务端`

```yaml
server:  port: 7001eureka:  instance:    hostname: eureka7001.com #eureka服务端的实例名称  client:    #false表示不向注册中心注册自己    register-with-eureka: false    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务    fetch-registry: false    service-url:      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址      defaultZone: http://7002.cn.utools.club/eureka/  # ******下面的代码用来关闭Eureka服务端的自我保护机制******  server:    # 关闭自我保护机制，保证不可用的服务被及时剔除    enable-self-preservation: false    # 如果2秒内没有收到某个微服务的心跳，那就剔除该微服务，单位为毫秒    eviction-interval-timer-in-ms: 2000
```

`客户端`

```yaml
server:  port: 8002spring:  application:    name: cloud-provider-service  datasource:    type: com.alibaba.druid.pool.DruidDataSource      #当前数据源操作类型    driver-class-name: org.gjt.mm.mysql.Driver        #mysql驱动包    url: jdbc:mysql://localhost:3306/db2019?useUnicode=true&characterEncoding=utf-8&useSSL=false    username: root    password: 3333mybatis:  mapper-locations: classpath:mapper/*.xml  type-aliases-package: com.atguigu.springcloud.entities       #所有Entity别名类所在包#服务入驻eureka:  client:    #表示是否将自己注册进EurekaServer默认为true    register-with-eureka: true    fetch-registry: true    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka  instance:    instance-id: payment-8002    prefer-ip-address: true  #mouse hover时显示IP地址    #Eureka客户端向服务器端发送心跳的时间间隔 ，单位为秒（默认是30秒）    lease-renewal-interval-in-seconds: 1    #Eureka 服务端在收到最后一次心跳后等待时间上限，单位为秒（默认是90秒）,超时剔除服务    lease-expiration-duration-in-seconds: 2
```

`效果`

## zookeeper

### zookeeper注册中心

概览：

> Linux端环境：就是在Linux上启用zookeeper,与查看上zookeeper注册的服务。

步骤说明：因为zookeeper要用到jdk,所以我们需要在linux上安装jdk，然后再配置使用zookeeper.也就是先配置jdk再配置zookeeper，才能使用zookeeper。

效果：我们使用Linux的ip地址与一般固定的2181端口用于注册中心给模块注册。然后我们用命令来查看在上面的服务列表可以看到我们注册的服务-> 模块上的具体信息, 这不懂？？

***

全局使用：解压命令：tar -zxvf 压缩包.tar.gz

\*\*1、java-jdk \*\*
【下载jdk1.8】（(我选择的是jdk-8u281-linux-x64.tar.gz)）:
[https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html](https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html "https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html")
【配置环境变量】
export JAVA\_HOME=/opt/jdk1.8.0\_281
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA\_HOME/lib/dt.jar
export PATH=$JAVA_HOME/bin:$HOME/bin:$HOME/.local/bin:$PATH

**2、zookeeper**

(下载:  [http://archive.apache.org/dist/zookeeper/zookeeper-3.4.9/?C=S;O=A](http://archive.apache.org/dist/zookeeper/zookeeper-3.4.9/?C=S;O=A "http://archive.apache.org/dist/zookeeper/zookeeper-3.4.9/?C=S;O=A"))

【修改zookeeper包配置】

进入包根目录，mkdir data

进入包下的conf ,将 zoo\_sample.cfg 复制一份并命名为 zoo.cfg

```纯文本
cp zoo_sample.cfg zoo.cfg
```

编辑  vi  zoo.cfg  修改dataDir为你的包路径下的data,这不会？？

【环境变量】
打开vim /etc/profile,在最后加入
export ZOOKEEPER\_HOME=/opt/zookeeper-3.4.9
export PATH=.:$HADOOP_HOME/bin:$ZOOKEEPER\_HOME/bin:$JAVA_HOME/bin:$PATH

【设置zookeeper开机自启】
1）进入/etc/init.d 然后  vi zookeeper,内容是：

```纯文本
#!/bin/sh#chkconfig: 2345 80 90#description:auto_run#description:zookeeper#processname:zookeeperZK_PATH=/opt/zookeeper-3.4.9export JAVA_HOME=/opt/jdk1.8.0_281case $1 in         start) sh  $ZK_PATH/bin/zkServer.sh start;;         stop)  sh  $ZK_PATH/bin/zkServer.sh stop;;         status) sh  $ZK_PATH/bin/zkServer.sh status;;         restart) sh $ZK_PATH/bin/zkServer.sh restart;;         *)  echo "require start|stop|status|restart"  ;;esac
```

```纯文本
2）注册为服务(就可以使用service来操作zookeeper了)
```

chkconfig --add zookeeper

```纯文本
3）添加操作zookeeper文件权限,否则4会提示没有权限
```

chmod a+xwr zookeeper  #如果没有权限

```纯文本
4）然后以服务的方式启动zookeeper
```

service zookeeper start

【关闭防火墙 !!】
\[rooMode: standalone
t\@localhost bin]#  systemctl stop firewalld   #关闭防火墙
\[root\@localhost bin]#  systemctl status firewalld   #查看防火墙是否关闭
● firewalld.service - firewalld - dynamic firewall daemon
Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
Active: inactive (dead) since 一 2021-04-19 21:01:41 PDT; 13s ago
...

【开启zookeeper注册中心功能】
service zookeeper start  #启动服务
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper-3.4.9/bin/../conf/zoo.cfg
Starting zookeeper ... already running as process 2765.

service zookeeper status  #查看状态
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper-3.4.9/bin/../conf/zoo.cfg
Mode: standalone

**【查看注册情况】**
zookeeper>bin执行命令：
\[root\@localhost opt]# cd zookeeper-3.4.9/bin  #1、进入zookeeper的bin目录下
\[root\@localhost bin]# ./zk
zkCleanup.sh  zkCli.cmd     zkCli.sh      zkEnv.cmd     zkEnv.sh      zkServer.cmd  zkServer.sh
\[root\@localhost bin]# ./zkCli.sh  #2、执行zkCli.sh
Connecting to localhost:2181
2021-04-19 21:39:27,413 \[myid:] - INFO  \[main:Environment\@100] - Client environment:zookeeper.version=3.4.9-1757313, built on 08/23/2016 06:50 GMT
2021-04-19 21:39:27,423 \[myid:] - INFO  \[main:Environment\@100] - Client environment:host.name=localhost
2021-04-19 21:39:27,423 \[myid:] - INFO  \[main:Environment\@100] - Client environment:java.version=1.8.0\_282
....
WatchedEvent state:SyncConnected type:None path:null
\[zk: localhost:2181(CONNECTED) 0]    #3、说明代表成功

\[zk: localhost:2181(CONNECTED) 9] ls /      #查看

\[services, zookeeper]
\[zk: localhost:2181(CONNECTED) 10] ls /services  #查看服务
\[cloud-provider-payment, cloud-provider-payment-test]    #哪些服务注册在zookeeper上了
\[zk: localhost:2181(CONNECTED) 11] ls /services/cloud-provider-payment       #查看服务名下有哪些模块
\[ec071f77-3477-4be1-a625-ab5a015f6719]
\[zk: localhost:2181(CONNECTED) 13]  get /services/cloud-provider-payment/ec071f77-3477-4be1-a625-ab5a015f6719     #查看模块具体信息（下面json字符串）
{"name":"cloud-provider-payment","id":"ec071f77-3477-4be1-a625-ab5a015f6719","address":"DESKTOP-HPKMNTJ","port":8004,"sslPort":null,"payload":{"@class":"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance","id":"application-1","name":"cloud-provider-payment","metadata":{}},"registrationTimeUTC":1618903366771,"serviceType":"DYNAMIC","uriSpec":{"parts":\[{"value":"scheme","variable":true},{"value":"://","variable":false},{"value":"address","variable":true},{"value":":","variable":false},{"value":"port","variable":true}]}}

...

> 服务模块: zookeeper注册中心在Linux中部署好后，我们可以让服务模块注册上传，那怎么写这样的模块呢？也就是创建一个可以注册到时注册中心上的服务模块。

效果：注册上去后，我们在Linux中使用命令可以看到服务名下的节点（服务模块）

`创建模块`

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-provider-payment8004</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--springboot整合zookeeper客户端-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>            <!--先排除自带的zookeeper3.5.3-->            <exclusions>                <exclusion>                    <groupId>org.apache.zookeeper</groupId>                    <artifactId>zookeeper</artifactId>                </exclusion>            </exclusions>        </dependency>        <!--添加zookeeper3.4.14版本-->        <dependency>            <groupId>org.apache.zookeeper</groupId>            <artifactId>zookeeper</artifactId>            <version>3.4.14</version>            <exclusions>                <exclusion>                    <groupId>log4j</groupId>                    <artifactId>log4j</artifactId>                </exclusion>                <exclusion>                    <groupId>org.slf4j</groupId>                    <artifactId>slf4j-log4j12</artifactId>                </exclusion>            </exclusions>        </dependency>        <!--Springboot整合web组件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--引入自定义的api通用包，可以使用payment支付Entity-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
#8004表示注册到zookeeper服务器的支付服务提供者端口号server:  port: 8004#服务别名----注册zookeeper到注册中心名称spring:  application:    name: cloud-provider-payment  cloud:    zookeeper:      connect-string: 192.168.44.130:2181
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClient  //该注解用于想使用consul或者zookeeper作为注册中心时注册服务public class PaymentMain8004 {    public static void main(String[] args) {        SpringApplication.run(PaymentMain8004.class,args);    }}
```

`业务`

controller

```java
package com.atguigu.springcloud.controller;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;import java.util.UUID;@RestController@Slf4jpublic class PaymentController {    @Value("${server.port}")    private String serverPort;    @GetMapping(value = "/payment/zk")    public String paymentzk(){        return "springcloud with zookeeper："+serverPort+"\t"+ UUID.randomUUID().toString();    }}
```

`在linux上查看服务` 按住ctr去看

> 3、zookeeper是临时还是持久节点

简要： 当我们注册上去后，是可以在zookeeper注册中心看到某服务名的节点的，但如果该节点对应的服务关闭了，也就是zookeeper接收不到该服务的心跳了，等下就会该节点主会被删除，下次恢复后，节点值不是之前的节点值了，也就是zookeeper一定时间接收不到服务的心跳后一定时间后服务对应的节点会被删除，下次注册进来与前一次无关系。

### zookeeper服务发现

> 概述： 当我们的生产都注册zookeeper后，我们注册上面的消费都需要调用zookeeper上的生产者。也就是生产者与消费者都注册进zookeeper后，我们消费都用RestTemplate来调用生产都接口。

步骤说明： 创建消费者服务模块 ->RestTemplate通过服务发现来调用生产者中的接口。

开始：

`建model`

创建名为 cloud-consumerzk-order8080 的maven模块。

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-consumerzk-order8080</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--springboot整合zookeeper客户端-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>            <!--先排除自带的zookeeper3.5.3-->            <exclusions>                <exclusion>                    <groupId>org.apache.zookeeper</groupId>                    <artifactId>zookeeper</artifactId>                </exclusion>            </exclusions>        </dependency>        <!--添加zookeeper3.4.14版本-->        <dependency>            <groupId>org.apache.zookeeper</groupId>            <artifactId>zookeeper</artifactId>            <version>3.4.14</version>            <exclusions>                <exclusion>                    <groupId>log4j</groupId>                    <artifactId>log4j</artifactId>                </exclusion>                <exclusion>                    <groupId>org.slf4j</groupId>                    <artifactId>slf4j-log4j12</artifactId>                </exclusion>            </exclusions>        </dependency>        <!--Springboot整合web组件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--引入自定义的api通用包，可以使用payment支付Entity-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
server:  port: 8080spring:  application:    name: cloud-consumer-order  cloud:    #注册到zookeeper地址    zookeeper:      connect-string: 192.168.44.130:2181
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class OrderZKMain8080 {    public static void main(String[] args) {        SpringApplication.run(OrderZKMain8080.class,args);    }}
```

`业务`

将RestTemplate注入Springboot作为组件

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.client.loadbalancer.LoadBalanced;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.web.client.RestTemplate;@Configurationpublic class ApplicationContextConfig {    @Bean    @LoadBalanced    public RestTemplate getRestTemplate() {        return new RestTemplate();    }}
```

controller

```java
package com.atguigu.springcloud.controller;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderZKController {    public static final String INVOKE_URL = "http://cloud-provider-payment";    @Resource    private RestTemplate restTemplate;    @GetMapping(value = "/consumer/payment/zk")    public String paymentInfo() {        String result = restTemplate.getForObject(INVOKE_URL + "/payment/zk", String.class);        return result;    }}
```

`测试`

[http://127.0.0.1:8080/consumer/payment/zk](http://127.0.0.1:8080/consumer/payment/zk "http://127.0.0.1:8080/consumer/payment/zk")

## Consul

### Consul 注册中心

> Consul简介： 提供服务发现，健康监测、KV存储、多数据中心、可视化Web界面，它是用Go语言编写的。

官网：[https://learn.hashicorp.com/consul](https://learn.hashicorp.com/consul "https://learn.hashicorp.com/consul")

下载：[https://www.consul.io/downloads](https://www.consul.io/downloads "https://www.consul.io/downloads")   /   [https://releases.hashicorp.com/consul/](https://releases.hashicorp.com/consul/ "https://releases.hashicorp.com/consul/")

使用：

> 它是一个可直接命令运行程序，在consul所在目录下查看版本 consul --version,运行 consul agent -dev
> 浏览器打开web界面：[http://127.0.0.1:8500/](http://127.0.0.1:8500/ "http://127.0.0.1:8500/") ，到此Consul 注册中心完成了，就这不懂？？

> 消费者模块：创建一个浪费者模块与上面zookeeper一样，只是换了注册中心的yml配置与pom的依赖。
> 也就是想要加入在Consul注册中心中，需要加入Consul的依赖与对应的yml配置。这不懂？？

步骤说明：创建一个模块，改pom，写yml, 主启动， 业务controll

消费模块开始：

`创建一个模块` ：创建 cloud-providerconsul-payment8006  Maven模块

`改pom`  ：

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-providerconsul-payment8006</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--springboot整合consul客户端-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-consul-discovery</artifactId>        </dependency>        <!--consul 建康检测报错用到,如果不报错可不用-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--Springboot整合web组件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--引入自定义的api通用包，可以使用payment支付Entity-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
server:  port: 8006spring:  application:    name: consul-provider-payment#####consul 注册中心地址  cloud:    consul:      host: localhost      port: 8500      discovery:        #hostname: 127.0.0.1        service-name: ${spring.application.name}
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class PaymentMain8006 {    public static void main(String[] args) {        SpringApplication.run(PaymentMain8006.class,args);    }}
```

`业务`

```java
package com.atguigu.springcloud.controller;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RestController;import java.util.UUID;@RestController@Slf4jpublic class ConsulPaymentController {    @Value("${server.port}")    private String serverPort;    @RequestMapping(value = "/payment/consul")    public String paymentConsul() {        return "springCloud with consul: "+serverPort+"\t   "+ UUID.randomUUID().toString();    }}
```

### Consul 服务发现

> 消费者模块： Consul 注册中心及消费者注册到Consul上去后，下面我们需要创建一个消费者模块，像zookeeper与Eureka一样进行服务发现，也就是创建一个消费模块并将之注册到Consul注册中心上，然后再进行调用消费者接口，这不懂？？

步骤：创建模块 ->改pom ->写yml ->主启动类 ->业务

`创建模块`  创建 cloud-consumerconsul-order8080

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-consumerconsul-order8080</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--springboot整合consul客户端-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-consul-discovery</artifactId>        </dependency>        <!--consul 建康检测报错用到-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--Springboot整合web组件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--引入自定义的api通用包，可以使用payment支付Entity-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml `

```yaml
server:  port: 8080spring:  application:    name: consul-consumer-payment  #####consul 注册中心地址  cloud:    consul:      host: localhost      port: 8500      discovery:        #hostname: 127.0.0.1        service-name: ${spring.application.name}
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class ConsulPaymentMain8080 {    public static void main(String[] args) {        SpringApplication.run(ConsulPaymentMain8080.class,args);    }}
```

`业务`

注册RestTemplate组件到springboot

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.client.loadbalancer.LoadBalanced;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.web.client.RestTemplate;@Configurationpublic class ApplicationContextConfig {    @Bean    @LoadBalanced    public RestTemplate getRestTemplate() {        return new RestTemplate();    }}
```

controller

```java
package com.atguigu.springcloud.controller;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class ConsulPaymentController {    public static final String INVOKE_URL = "http://consul-provider-payment";    @Resource    private RestTemplate restTemplate;    @GetMapping(value = "/consumer/payment/consul")    public String paymentInfo() {        String result = restTemplate.getForObject(INVOKE_URL + "/payment/consul", String.class);        return result;    }}
```

## CAP 说明

分布式系统（distributed system）正变得越来越重要，大型网站几乎都是分布式的。分布式系统的最大难点，就是各个节点的状态如何同步。CAP 定理是这方面的基本定理，也是理解分布式系统的起点。

分区：一台服务器放在中国，另一台服务器放在美国，这就是两个区；

> 一致性（C）：写操作之后的读操作，是立即返回，还是等分区数据同步保证数据一致性再可读操作。

> 可用性（A）：Availability 中文叫做"可用性"，意思是只要收到用户的请求，服务器就必须给出回应。

> 分区容错性（p）：一台服务器放在中国，另一台服务器放在美国，这就是两个区，它们之间可能无法通信。

> 相互关系

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/bg2018071607.jpg)

一般来说，分区容错无法避免，因此可以认为 CAP 的 P 总是成立。CAP 定理告诉我们，剩下的 C 和 A 无法同时做到。

只能CP与AP，因为CA是相互矛盾的，如果想要保存数据一致性就不能保证可用性，可用性又要求请求即返回，所以不能保证数据一致性。

Eureka(AP),而zookeeper与consul是CP.

还不懂？强烈推荐阅读：[https://www.ruanyifeng.com/blog/2018/07/cap.html](https://www.ruanyifeng.com/blog/2018/07/cap.html "https://www.ruanyifeng.com/blog/2018/07/cap.html")

## Ribbon 服务调用（负载均衡）

> Ribbon是进程内的LB，还有一种是集中式的LB  (nginx) ，LB是负均衡，比如一个人去医院，人家一看你口腔肿了，好那你去口腔科，这是集中式的LB，而口腔科有很多医生，谁给你看这时就是进程内的LB。这不懂？？也就是都是属性LB负载均衡，只不过集中式在进程内的前面。
> 具体：集中式负责把访问请求通过某种策略发至服务提供方；进程内的集成于消费方进程。且RestTemplate + 负载均衡 = Ribbon

#### RestTemplate学习

> RestTemplate: 上面也用到了RestTemplate，因为Ribbon是是RestTemplate的包装，所以我们需要再认识认识RestTemplate.
> RestTemplate注册到SpringBoot组件后，我们在使用RestTemplate进行负载均衡访问API时有两种，分别get/postForObject返回的是json,与get/postForEntity它返回的是更详细的内容entity.getBody也是json。也是一个直接json，另一种是更详细的信息，不仅包含json还是状态码等。不懂？？

以下步骤： 是get/postForObject与get/postForEntity 的示例

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import lombok.extern.slf4j.Slf4j;import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.PostMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderController {    //    private static final String PAYMENT_URL="http://localhost:8001";    //通过在eureka上注册过的微服务名称调用    private static final String PAYMENT_URL = "http://CLOUD-PROVIDER-SERVICE";    @Resource    private RestTemplate restTemplate;    //get/postForObject --!!!----------    @GetMapping("/consumer/payment/create")    public CommonResult<Payment> create(Payment payment){        return restTemplate.postForObject(PAYMENT_URL+"/payment/create",payment,CommonResult.class);    }    @GetMapping("/consumer/payment/get/{id}")    public CommonResult<Payment> getPayment(@PathVariable("id") Long id){        return restTemplate.getForObject(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);    }        //get/postForEntity --!!!----------    @GetMapping("/consumer/payment/getForEntity/{id}")    public CommonResult<Payment> getPayment2(@PathVariable("id") Long id){        ResponseEntity<CommonResult> entity = restTemplate.getForEntity(PAYMENT_URL + "/payment/get/" + id, CommonResult.class);        if(entity.getStatusCode().is2xxSuccessful()) {            return entity.getBody();        }else {            return new CommonResult<>(444,"操作失败");        }    }    @GetMapping("/consumer/payment/createForEntity")    public CommonResult<Payment> create2(Payment payment){        ResponseEntity<CommonResult> entity = restTemplate.postForEntity(PAYMENT_URL + "/payment/create", payment, CommonResult.class);        if(entity.getStatusCode().is2xxSuccessful()) {            return entity.getBody();        }else {            return new CommonResult<>(444,"操作失败");        }    }}
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210422170313954.png)

#### Ribbon默认负载均衡轮询算法

> 简介：Ribbon有很多负载均衡的算法。下面演示的是随机的。不懂？也就是使用Ribbon进行服务调用，负载均衡演示的是随机。

以下步骤：引入pom，因为Eureka已经依赖了 spring-cloud-starter-netflix-ribbon ,不信？你点击Eureka的依赖，搜索一下ribbon ——>

注意： 官方文档明确给出了警告：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20200313152118177.png)

这个自定义配置类不能放在 @ComponentScan 所扫描的当前包下以及子包下，否则自定义的配置类就会被所有的 Ribbon 客户端所共享，达不到特殊化定制的目的了。也就是我们在创建与启动类不同目录下。我们选择在`com.atguigu.myRule`与`com.atguigu.springcloud`同级，即myRule下创建自定义的配置类。——>

再在主启动类将服务与策略绑定。

具体：

`依赖`

写Eureka依赖后，无须再写Ribbon的依赖  spring-cloud-starter-netflix-ribbon

`自定义配置类`

```java
package com.atguigu.myRule;import com.netflix.loadbalancer.IRule;import com.netflix.loadbalancer.RandomRule;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;/** * 自定义负载均衡规则类 */@Configurationpublic class MySelfRule {    @Bean    public IRule myRule(){        return new RandomRule();    }}
```

`主启动类`

```java
package com.atguigu.springcloud;import com.atguigu.myRule.MySelfRule;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;import org.springframework.cloud.netflix.ribbon.RibbonClient;@SpringBootApplication@EnableEurekaClient//服务与策略绑定@RibbonClient(name = "CLOUD-PROVIDER-SERVICE",configuration = MySelfRule.class)public class OrderMain8080 {    public static void main(String[] args) {        SpringApplication.run(OrderMain8080.class,args);    }}
```

`使用`

RestTemplate就是使用。不知道？？ 学习  使用过程就是将RestTemplate注入到Springboot组件中，然后在Controller使用RestTemplate进行`服务`调用即可。

`手写轮询算法`

一以下步骤：不用原来的算法，即注释掉RestTemplate注册到Springboot组件上的@LoadBalanced，没有该注释当不具备负载均衡。我们写轮询，该算法的使用是，输入该服务下的所有节点List,输出其中某个节点，即让我们选择出一个节点。返回给调用者（Controller中的API方法），获取调用节点的getUri方法获取uri,然后api方法再具体访问某个请求。 不懂？？也就是帮人家在指定服务中选一个节点。

——注释——

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.client.loadbalancer.LoadBalanced;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.web.client.RestTemplate;@Configurationpublic class ApplicationContextConfig {    @Bean    //@LoadBalanced  //赋于 负载均衡的能力  轮询算法第一步    public RestTemplate getRestTemplate(){        return new RestTemplate();    }}
```

——开始我们的轮询算法：创建一个接口——

```纯文本
package com.atguigu.springcloud.lb;import org.springframework.cloud.client.ServiceInstance;import java.util.List;//第二步public interface LoadBalancer {    ServiceInstance instances(List<ServiceInstance> serviceInstances);}
```

——实现类——

```java
package com.atguigu.springcloud.lb;import org.springframework.cloud.client.ServiceInstance;import org.springframework.stereotype.Component;import java.util.List;import java.util.concurrent.atomic.AtomicInteger;@Component //第三步public class MyLB implements LoadBalancer{    private AtomicInteger atomicInteger = new AtomicInteger(0);    //作用： 记录访问次数    public  int getAndIncrement() {        int current;//0/1        int next;//1/2        do {            current = this.atomicInteger.get(); //0-1/1-2            next = current >= 2147483647 ? 0 : current+1;        }while (! this.atomicInteger.compareAndSet(current,next));        System.out.println("*****next: "+next);        return next;//1/2/3/4/5    }    @Override    public ServiceInstance instances(List<ServiceInstance> serviceInstances) {        int index = getAndIncrement() % serviceInstances.size();        //返回要访问的具体server        return serviceInstances.get(index);    }}
```

——使用——

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.lb.LoadBalancer;import lombok.extern.slf4j.Slf4j;import org.springframework.cloud.client.ServiceInstance;import org.springframework.cloud.client.discovery.DiscoveryClient;import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.PostMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;import java.net.URI;import java.util.List;@RestController@Slf4jpublic class OrderController {    //通过在eureka上注册过的微服务名称调用    private static final String PAYMENT_URL = "http://CLOUD-PROVIDER-SERVICE";    //1、依赖注入    @Resource    private RestTemplate restTemplate;    @Resource    private LoadBalancer loadBalancer;      @Resource    private DiscoveryClient discoveryClient;        @GetMapping(value = "/consumer/payment/lb")    public String getPaymentLB() {        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PROVIDER-SERVICE");        if(instances == null || instances.size() <= 0) {            return  null;        }        //使用！！        ServiceInstance serviceInstance = loadBalancer.instances(instances);        URI uri = serviceInstance.getUri();        System.out.println("****选中server的uri："+uri);        return restTemplate.getForObject(uri+"/payment/lb",String.class);    }}
```

## OpenFeign 服务调用（负载均衡）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20200518135903121.JPG)

> 它的使用方式非常简单，我们概述一下，Feign是Springcloud组件中的一个轻量级Restful的HTTP服务客户端，Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是：使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务
> `OpenFeign是springcloud在Feign的基础上支持了SpringMVC的注解，如@RequestMapping等等。`OpenFeign的@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

> 使用说明：创建一个module，引入OpenFeign的依赖，就一个 `spring-cloud-starter-openfeign`, 且它
> 也像`spring-cloud-starter-netflix-eureka-client`依赖一样引入了ribbon,因为openfeign是内置了ribbon的。yml就eureka的注册中心与服务端口配置，主启动类加一个注解激活OpenFeign, 主要是业务类，openfeign使我们像调用service一样使用生产者的API，但我们需要写配配置这个”浮在表面“的service，也就是注解+方法，这个方法就是消费端Controller方法上的注解与方法声明（复制过来即可）。不懂？？也就是配置好模块的必须环境后，如依赖，激活OpenFeign后，余下工作就是service了，而service就是注解+复制过来的方法头。

OpenFeign做负载均衡步骤： 创建module，改pom,写yml，主启动类，业务

`创建模块`

cloud-consumer-feign-order8080

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-consumer-feign-order8080</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--openfeign-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-openfeign</artifactId>        </dependency>        <!--eureka client-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <!--引入自定义的api通用包，可以使用Payment支付Entity-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <!--web-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--一般基础通用配置-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
server:  port: 8080eureka:  client:    register-with-eureka: false    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.openfeign.EnableFeignClients;@SpringBootApplication@EnableFeignClients  //激活OpenFeignpublic class OrderFeignMain8080 {    public static void main(String[] args) {        SpringApplication.run(OrderFeignMain8080.class,args);    }}
```

`业务`

service

```java
package com.atguigu.springcloud.service;import com.atguigu.springcloud.entities.CommonResult;import org.springframework.cloud.openfeign.FeignClient;import org.springframework.stereotype.Component;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;@Component@FeignClient(value = "http://CLOUD-PROVIDER-SERVICE")  ////指定调用哪个微服务public interface PaymentFeignService {    @GetMapping(value = "/payment/get/{id}")    public CommonResult getPaymentById(@PathVariable("id") Long id);}
```

controller调用service

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.service.PaymentFeignService;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderFeignController {    @Resource    private PaymentFeignService paymentFeignService;    @GetMapping("/consumer/payment/get/{id}")    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {        return paymentFeignService.getPaymentById(id);    }}
```

> OpenFeign超时控制 : 两端，消费者调用生产者超时控制，有两种，即两种建立连接的超时控制与建立连接到返回资源给消费者的超时控制。不懂？？就是生产者可能获取资源需要3秒，但消费端它只能等1秒。且OpenFeign 默认超时时候是1秒，这里我们可能需要修改超时时间，这就是超时控制。

以下测试步骤：在消费者端创建一个耗时的API -> 消费者OpenFeign写入到Service接口 -> Controller调用service -> 访问出现500超时错误 -> 进行超时控制 -> 访问正常

`消费端写一个耗时的API`

```java
...@GetMapping(value = "/payment/timeout")    public String getPaymentTimeout() {        try {            Thread.sleep(3000);        } catch (InterruptedException e) {            e.printStackTrace();        }        return serverPort;    }...
```

` 消费者OpenFeign写入到Service接口`

```java
package com.atguigu.springcloud.service;import com.atguigu.springcloud.entities.CommonResult;import org.springframework.cloud.openfeign.FeignClient;import org.springframework.stereotype.Component;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;@Component@FeignClient(value = "http://CLOUD-PROVIDER-SERVICE")  ////指定调用哪个微服务public interface PaymentFeignService {    @GetMapping(value = "/payment/get/{id}")    public CommonResult getPaymentById(@PathVariable("id") Long id);    //”浮在表面“的耗时API    @GetMapping(value = "/payment/timeout")    public String getPaymentTimeout();}
```

`OpenFeign消费端 Controller调用service`

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.service.PaymentFeignService;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderFeignController {    @Resource    private PaymentFeignService paymentFeignService;    @GetMapping("/consumer/payment/get/{id}")    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id) {        return paymentFeignService.getPaymentById(id);    }    @GetMapping(value = "/consumer/payment/timeout")    public String getPaymentTimeout() {        return paymentFeignService.getPaymentTimeout();    }}
```

`访问测试`

[http://127.0.0.1:8080/consumer/payment/timeout](http://127.0.0.1:8080/consumer/payment/timeout "http://127.0.0.1:8080/consumer/payment/timeout")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424002504424.png)

`超时控制`

```yaml
server:  port: 8080eureka:  client:    register-with-eureka: false    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eurekaribbon:  ReadTimeout: 5000  #建立连接超时时间  ConnectTimeout: 5000 #建立连接到服务器读取到杉资源所用的时间
```

`结果`

访问正常

步骤：对fs 模块的方法进行逐一讲解

> OpenFeign日志增强： 就是对OpenFeign负载均衡的API进行日志增强。我们访问被日志增强的API，在控制台就可以看到详细的日志输出。

以下步骤：向SpringBoot注册加入`Logger.Level` 为组件。 ->  然后进行日志配置，即哪些Service进行日志增强。-> 测试 -> 查看控制台

`注册组件`

```java
package com.atguigu.springcloud.config;import feign.Logger;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;@Configurationpublic class FeignConfig {    @Bean    Logger.Level feignLoggerLevel() {        return Logger.Level.FULL;    }}
```

`yml配置`

```yaml
server:  port: 8080eureka:  client:    register-with-eureka: false    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eurekaribbon:  ReadTimeout: 5000  #建立连接超时时间  ConnectTimeout: 5000 #建立连接到服务器读取到杉资源所用的时间logging:  level:    #feign日志以什么级别监控哪个接口    com.atguigu.springcloud.service.PaymentFeignService: debug
```

`测试`

启动注册中心与生产者端，再启动我们消费端，访问调用了 PaymentFeignService 接口API的Controller方法。

`查看控制台`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424200356472.png)

## Hystrix

> Hystrix ：为解决服务雪崩而生，形成原因分为三个阶段，服务提供者不可用，重试加大请求流量，服务调用者不可用。
> Hystrix是一个用于处理分布式系统的延迟和容错的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时，异常等，Hystrix能够保证在一个依赖出问题的情况下，不会导致整体服务失败，避免级联故障，以提高分布式系统的弹性。
> ”断路器“本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝），向调用方返回一个符合预期，可处理的备选响应（FallBack） ，而不是长时间的等待或者抛出调用方无法处理的异常，这样就保证了服务调用方的线程不会地被长时间，不必要地占用，从而避免了故障在分布式系统中蔓延，乃至雪崩。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20171108164858509)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20171108170359201)

> Hystrix 重要概念
> 服务降级（fallback）：不让客户端等待并立刻返回一个友好提示。导致服务降级的原因有以下几点，程序运行异常，超时，服务熔断触发服务降级，线程池/信号量打满也会导致服务降级
> 服务熔断（break）：类比保险丝达到最大服务访问后，直接拒绝访问，拉闸限电，然后调用服务降级的方法并返回友好提示。
> 服务限流(flowlimit)： 都给我一个一个来。

> 开始：我们先开始创建基本的模块`cloud-provider-hystrix-payment8001`，有两个方法一个正常的API一个延时的API，然后进行高并发测试，用的是JMeter，使用方式是先添加线程组，再配置并发量，线程组上加http请求。然后查看我们正常API的访问速度，结果由秒开变为要等待。不懂？？也就是创建一个用于高并发测试的模块。

以下步骤：创建模块 cloud-provider-hystrix-payment8001 -> 改pom -> 写yml -> 业务 -> JMeter高并发测试

`创建模块`

cloud-provider-hystrix-payment8001

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-provider-hystrix-payment8001</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--hystrix-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>        </dependency>        <!--Eureka依赖-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <!--引入公共模块坐标-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署插件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
server:  port: 8001#微服务名称spring:  application:    #入驻进Eureka服务器的名称    name: cloud-provider-hystrix-payment#Eurekaeureka:  client:    #表示是否将自己注册进EurekaServer，默认为true    register-with-eureka: true    #表示是否从EurekaServer中抓取已有的注册信息，默认为true，单节点无所谓，集群必须设置为true才能默认ribbon使用负载均衡    fetch-registry: true    service-url:      #注册地址      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

`业务`

service

```java
package com.atguigu.springcloud.service;import org.springframework.stereotype.Service;import java.util.concurrent.TimeUnit;@Servicepublic class PaymentHystrixService {    /**     * 正常访问     */    public String paymentInfo_OK(Long id) {        return "线程池： "+Thread.currentThread().getName()+"   paymentInfo_OK id: "+id+"\t哈哈";    }    /**     * 模拟出错     */    public String paymentInfo_TimeOut(Long id){        int timeNum = 3;        try {            TimeUnit.SECONDS.sleep(timeNum);        }catch (InterruptedException e) {            e.printStackTrace();        }        return "线程池：   "+Thread.currentThread().getName()+"   paymentInfo_Timeout id: "+id+"\t耗时"+timeNum+"秒钟";    }}
```

controller

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.service.PaymentHystrixService;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4jpublic class PaymentController {    @Resource    private PaymentHystrixService paymentHystrixService;    @Value("${server.port}")    private String serverPost;    //正常访问    @GetMapping("/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id){        return paymentHystrixService.paymentInfo_OK(id);    }    //延时访问    @GetMapping("/payment/hystrix/Timeout/{id}")    public String paymentInfo_TimeOut(@PathVariable("id") Long id){        return paymentHystrixService.paymentInfo_TimeOut(id);    }}
```

`高并发测试`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424222721020.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424222733151.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424222755162.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210424222809043.png)

> Hystrix 加入8080高并发测试 ： 就是完成了8001即消费端API的高压测试后，再加入8001的消费端8080，再调用其API进行高并发测试。

以下步骤： 创建模块 `cloud-consumer-feign-hystrix-order-8080` -> 改pom ->  写yml -> 主启动类  -> 业务类 -> 测试

`创建模块`

模块名：cloud-consumer-feign-hystrix-order-8080

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-consumer-feign-hystrix-order-8080</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--openfeign-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-openfeign</artifactId>        </dependency>                <!--hystrix-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>        </dependency>        <!--Eureka依赖-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <!--引入公共模块坐标-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署插件-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yaml`

```yaml
server:  port: 8080eureka:  client:    register-with-eureka: false    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eurekaribbon:  ReadTimeout: 5000  #建立连接超时时间  ConnectTimeout: 5000 #建立连接到服务器读取到杉资源所用的时间
```

`主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;import org.springframework.cloud.openfeign.EnableFeignClients;@SpringBootApplication@EnableFeignClientspublic class OrderHystrixMain8080 {    public static void main(String[] args) {        SpringApplication.run(OrderHystrixMain8080.class,args);    }}
```

`业务类`

service

```java
package com.atguigu.springcloud.service;import org.springframework.cloud.openfeign.FeignClient;import org.springframework.stereotype.Component;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;@Component@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT")public interface PaymentHystrixService {    //正常访问    @GetMapping("/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id);    //延时访问    @GetMapping("/payment/hystrix/Timeout/{id}")``    public String paymentInfo_TimeOut(@PathVariable("id") Long id);}
```

controller

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.service.PaymentHystrixService;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderHystrixController {    @Resource    private PaymentHystrixService paymentHystrixService;    //正常访问    @GetMapping("/consumer/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id) {        String info_ok = paymentHystrixService.paymentInfo_OK(id);        return info_ok;    }    //延时访问    @GetMapping("/consumer/payment/hystrix/Timeout/{id}")    public String paymentInfo_TimeOut(@PathVariable("id") Long id) {        String timeOut = paymentHystrixService.paymentInfo_TimeOut(id);        return timeOut;    }}
```

`测试`

测试对象就是8001  还不会?

结果：访问秒开变转圈，甚至超时

> 服务降级(FallBack)： 即当我们方法比如8001服务提供者，服务超时、程序出错、消费端宕机与服务熔断时，就进行服务降级，返回给用户一个友好的提示。不懂？？ 即访问的API 出现问题了，转调用其它API，该API可以返回友好提示。

以下步骤：在可能会出错访问超时的模块的主启动类加入服务降级的激活注解 `@EnableCircuitBreaker`  ,然后在可能会服务超时或出错的API加入注解 ->  然后进行方法超时（注解指定超时触发降级时间）与设置API出错进行测试 -> 浏览器查看是否触发服务降级返回的内容 -> 消费端也进行服务降级 -> 浏览器测试是否触发消费端服务降级 -> 全局默认FallBack ->  测试消费方调用生产方，服务端宕机，进行服务降级

`主启动类加注解`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;@SpringBootApplication@EnableEurekaClient@EnableCircuitBreaker  //服务降级public class PaymentHystrixMain8001 {    public static void main(String[] args) {        SpringApplication.run(PaymentHystrixMain8001.class,args);    }}
```

`APIl加服务降级注解`

```java
package com.atguigu.springcloud.service;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCollapser;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;import org.springframework.stereotype.Service;import java.util.concurrent.TimeUnit;@Servicepublic class PaymentHystrixService {    /**     * 正常访问     */    public String paymentInfo_OK(Long id) {        return "线程池： "+Thread.currentThread().getName()+"   paymentInfo_OK id: "+id+"\t哈哈";    }    /**     * 模拟出错     */    @HystrixCommand(fallbackMethod = "paymentInfo_TimeOutHandler", commandProperties = {            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds",value = "3000")}    )    public String paymentInfo_TimeOut(Long id){        int timeNum = 5000;//超时        //int timeNum = 5000;//程序出错        try {            TimeUnit.MILLISECONDS.sleep(timeNum);        }catch (InterruptedException e) {            e.printStackTrace();        }        return "线程池：   "+Thread.currentThread().getName()+"   paymentInfo_Timeout id: "+id+"\t耗时(毫秒)"+timeNum;    }    //服务降级FallBack    public String paymentInfo_TimeOutHandler(Long id){        return "线程池：   "+Thread.currentThread().getName()+"   paymentInfo_TimeOutHandler id: "+id+"现访问人数过多或服务出错，请悄后再试 /(ㄒoㄒ)/~~";    }}
```

`测试`

分别测试服务超时与程序出错测试

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210425181002396.png)

`消费端8080服务降级`

在8080模块，`yml`中加入配置 用于Feign开启hystrix  ->  主启动类加入 `@EnableCircuitBreaker`  -> controller中使用服务降级，具体是写FallBack，FallBack方法参数可以与原API可相同，然后在调用的API上加入注解

**yml :  feign.hystrix.enabled=true**

```yaml
server:  port: 8080eureka:  client:    register-with-eureka: false    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eurekaribbon:  ReadTimeout: 5000  #建立连接超时时间  ConnectTimeout: 5000 #建立连接到服务器读取到杉资源所用的时间#开启feign:hystrix属性 feign:  hystrix:    enabled: true
```

主启动类:  加入 @EnableCircuitBreaker  //激活Hystrix

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;import org.springframework.cloud.openfeign.EnableFeignClients;@SpringBootApplication@EnableFeignClients@EnableCircuitBreaker  //激活Hystrixpublic class OrderHystrixMain8080 {    public static void main(String[] args) {        SpringApplication.run(OrderHystrixMain8080.class,args);    }}
```

业务 Controller: 即写FallBack 方法，然后配置注解，不清楚？ 即在可能出现服务调用与程序出错的API上加入注解，

@HystrixCommand(fallbackMethod = "paymentInfo\_TimeOutHandler",commandProperties = {
@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds",value = "1500")
})

且依赖FallBack 方法:

//FallBack
public String paymentInfo\_TimeOutHandler (@PathVariable("id") Long id) {
return "我是消费者8080，对方制度系统繁忙，请10秒后再试，参数是"+id+"或者自己运行出错请自行检查，/(ㄒoㄒ)/\~\~";
}

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.service.PaymentHystrixService;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderHystrixController {    @Resource    private PaymentHystrixService paymentHystrixService;    //正常访问    @GetMapping("/consumer/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id) {        String info_ok = paymentHystrixService.paymentInfo_OK(id);        return info_ok;    }    //延时访问    @HystrixCommand(fallbackMethod = "paymentInfo_TimeOutHandler",commandProperties = {            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds",value = "1500")    })    @GetMapping("/consumer/payment/hystrix/Timeout/{id}")    public String paymentInfo_TimeOut(@PathVariable("id") Long id) {        int i = 1/0;        String timeOut = paymentHystrixService.paymentInfo_TimeOut(id);        return timeOut;    }    //FallBack    public String paymentInfo_TimeOutHandler (@PathVariable("id") Long id) {        return "我是消费者8080，对方制度系统繁忙，请10秒后再试，参数是"+id+"或者自己运行出错请自行检查，/(ㄒoㄒ)/~~";    }}
```

`全局默认BackFall` :如果第个API都进行服务降级FallBack的话，按上面都要写一个FallBack方法，那就非常傻X的，于是我们要写一个全局的FallBack 再在Controll类上加一个注解。不懂？？即创建一个全局的FallBack再API在类上加注解`@DefaultProperties(defaultFallback = "payment_Global_FallbackMethod")`，然后原来的API只需加`@HystrixCommand` 即可 注解中指定了全局的FallBack方法。

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.service.PaymentHystrixService;import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;import lombok.extern.slf4j.Slf4j;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestController@Slf4j@DefaultProperties(defaultFallback = "payment_Global_FallbackMethod")public class OrderHystrixController {    @Resource    private PaymentHystrixService paymentHystrixService;    //正常访问    @GetMapping("/consumer/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id) {        String info_ok = paymentHystrixService.paymentInfo_OK(id);        return info_ok;    }    //延时访问    @HystrixCommand     @GetMapping("/consumer/payment/hystrix/Timeout/{id}")    public String paymentInfo_TimeOut(@PathVariable("id") Long id) {        int i = 1/0;        String timeOut = paymentHystrixService.paymentInfo_TimeOut(id);        return timeOut;    }    public String paymentInfo_TimeOutHandler (@PathVariable("id") Long id) {        return "我是消费者8080，对方制度系统繁忙，请10秒后再试，参数是"+id+"或者自己运行出错请自行检查，/(ㄒoㄒ)/~~";    }    public String payment_Global_FallbackMethod() {        return "Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~";    }}
```

`生产端宕机Feign服务端服务降级`

以下步骤：在yml中加入配置，因为我们要在Feign接口上使用hystrix的注解 -> 继承消费端Feign接口 -> 在消费端Feign接口上加上`@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT",fallback = OrderHystrixFallback.class)` 表示当调用对应`CLOUD-PROVIDER-HYSTRIX-PAYMENT` 服务上的API失败，即宕机时，用哪个继承类当作Fallback

开始：

`yml配置`

```yaml
#开启feign:hystrix属性feign:  hystrix:    enabled: true
```

`业务`

Feign service接口

```yaml
package com.atguigu.springcloud.service;import com.atguigu.springcloud.service.impl.OrderHystrixFallback;import org.springframework.cloud.openfeign.FeignClient;import org.springframework.stereotype.Component;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;@Component@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT",fallback = OrderHystrixFallback.class)public interface OrderHystrixService {    //正常访问    @GetMapping("/payment/hystrix/OK/{id}")    public String paymentInfo_OK(@PathVariable("id") Long id);    //延时访问    @GetMapping("/payment/hystrix/Timeout/{id}")    public String paymentInfo_TimeOut(@PathVariable("id") Long id);}
```

Feign 服务接口的impl （宕机FeignBack）

```yaml
package com.atguigu.springcloud.service.impl;import com.atguigu.springcloud.service.OrderHystrixService;import org.springframework.stereotype.Component;@Componentpublic class OrderHystrixFallback implements OrderHystrixService {    @Override    public String paymentInfo_OK(Long id) {        return "---OrderHystrixFallback fall back-paymentInfo_OK,/(ㄒoㄒ)/~~";    }    @Override    public String paymentInfo_TimeOut(Long id) {        return "---OrderHystrixFallback fall back-paymentInfo_TimeOut,/(ㄒoㄒ)/~~";    }}
```

`测试`

正常运行注册中心与生产端消费端，消费端调用生产端正常，然后关闭生产端（宕机，启用后备），再测试服务降级：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210427091904198.png)

> 服务熔断： 熔断机制是应对雪崩的一种微服务链路保护机制，当扇出链路的某个微服务出错不可用或者 响应时间太长时，会进行服务降级，进而熔断该节点微服务的调用，快速返回错误的响应 信息。
> **当检测到该节点微服务调用响应正常，恢复调用链路。**
> 不懂？？服务熔断会触发服务降级，准确地来说，服务熔断也是服务降级的一种，但又不完全是。
> **ps:**   马丁福勒关于服务熔断的论文：[https://martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html "https://martinfowler.com/bliki/CircuitBreaker.html")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20200908212740704.png)

以下步骤（服务熔断）：

在 `cloud-provider-hystrix-payment8001`  PaymentHystrixService类写方法（id是正数访问正常，负数访问出错），该方法具有服务熔断（具体怎么会熔断，请看下面PaymentHystrixService 类 41行开始的代码注释）说的是当时间窗内，访问次数达到阀值，并失败率也达到阀值，断路器就会打开 ->并在该类下写服务熔断后服务降级的方法FallBack ->　测试  ->  `HystrixCommandPropertiesHystrix配置类`

开始：

`服务熔断方法`   `服务熔断后服务降级的方法FallBack `

```java
package com.atguigu.springcloud.service;import cn.hutool.core.util.IdUtil;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCollapser;import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;import org.springframework.stereotype.Service;import org.springframework.web.bind.annotation.PathVariable;import java.util.concurrent.TimeUnit;@Servicepublic class PaymentHystrixService {    /**     * 正常访问     */    public String paymentInfo_OK(Long id) {        return "线程池： "+Thread.currentThread().getName()+"   paymentInfo_OK id: "+id+"\t哈哈";    }    /**     * 模拟出错     */    @HystrixCommand(fallbackMethod = "paymentInfo_TimeOutHandler", commandProperties = {            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds",value = "3000")}    )    public String paymentInfo_TimeOut(Long id){        int timeNum = 5000;        try {            TimeUnit.MILLISECONDS.sleep(timeNum);        }catch (InterruptedException e) {            e.printStackTrace();        }        return "线程池：   "+Thread.currentThread().getName()+"   paymentInfo_Timeout id: "+id+"\t耗时(毫秒)"+timeNum;    }    //服务降级FallBack    public String paymentInfo_TimeOutHandler(Long id){        return "线程池：   "+Thread.currentThread().getName()+"   paymentInfo_TimeOutHandler id: "+id+"现访问人数过多或服务出错，请悄后再试 /(ㄒoㄒ)/~~";    }    //==============================服务熔断================================    @HystrixCommand(fallbackMethod = "paymentCircuitBreaker_fallback",commandProperties = {            @HystrixProperty(name = "circuitBreaker.enabled",value = "true"),//是否开启断路器            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "10"),//请求次数            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "10000"),//时间窗日期            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "60"),//失败率达到多少后跳闸    })    public String paymentCircuitBreaker(@PathVariable("id") Integer id){        if(id < 0){            throw new RuntimeException("**********id不能为负数***********");        }        String serialNnmber = IdUtil.simpleUUID();        return Thread.currentThread().getName()+"\t调用成功，流水号："+serialNnmber;    }  //服务熔断后服务降级的方法FallBack    public String paymentCircuitBreaker_fallback(@PathVariable("id") Integer id){        return "id不能为复数，请稍后再试，/(ㄒoㄒ)/~~    id:"+id;    }}
```

`测试`

开启  cloud-provider-hystrix-payment8001 ，访问服务熔断的方法

测试过程：

访问 [http://localhost:8001/payment/circuit/1](http://localhost:8001/payment/circuit/1 "http://localhost:8001/payment/circuit/1") 正数，测试访问正常

访问  [http://localhost:8001/payment/circuit/-1](http://localhost:8001/payment/circuit/-1 "http://localhost:8001/payment/circuit/-1")  负数访问异常，同时Ctrl+R不断刷新，提高失败率以触发服务熔断

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210427111021863.png)

访问 [http://localhost:8001/payment/circuit/1](http://localhost:8001/payment/circuit/1 "http://localhost:8001/payment/circuit/1")  正数，发现会触发FallBack,因为这时已经不是闭合状态了，不断刷新，提高成功率，熔断器闭合，访问正常

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210427111030944.png)

`all配置`   All全部配置 :   探寻HystrixCommandPropertiesHystrix配置类, 部分如下：

```java
//如果 滚动时间窗（默认10秒） 内仅收到19个请求，即使这19个请求都失败了，断路器也不会打开 （75行）@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "20")//该属性用来设置滚动时间窗中，表示在滚动时间窗中，在请求数量超时,circuitBreaker.requestVolumeThreshold 的情况下，如果错误请求数的百分比超过50//就把断路器设置为“打开”状态，否则就设置为“关闭”状态@HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "50")//该属性用来设置当断路器打开之后的休眠时间窗，休眠时间窗结束之后，会将断路器设置为“半开” 状态，尝试熔断的请求命令，如果依然失败就将断路器设置为“打开”状态@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "5000")//断路器强制打开@HystrixProperty(name = "circuitBreaker.forceOpen",value = "false")//断路器强制关闭@HystrixProperty(name = "circuitBreaker.forceClosed",value = "false")//滚动时间窗设置，该时间用于断路器判断健康度时需要收集信息的持续时间@HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds", value = "10000")//该属性用来设置滚动时间窗统计指标信息时划分“桶”的数量，断路器在收集指标信息的时候会根据设置的时间长度拆分成多个“桶”来累计各度量值，每个“桶”记录了一段时间内的采集指标。比如10秒内拆分成10个“桶”收集这样，所以timeinMilliseconds，必须能被NumBuckets整除，否则会抛出异常@HystrixProperty(name = "metrics.rollingStats.numBuckets",value = "10")//该属性用来设置对命令执行的延迟是否使用百分位数来跟踪和计算，如果设置为false ，那么所有的概要统计都将返回-1@HystrixProperty(name = "metrics.rollingPercentile.enabled",value = "false")
```

> Hystrix服务限流： 不展开讲,需要了解：[https://www.cnblogs.com/huanchupkblog/p/10772274.html](https://www.cnblogs.com/huanchupkblog/p/10772274.html "https://www.cnblogs.com/huanchupkblog/p/10772274.html")

![](https://img2018.cnblogs.com/blog/528977/201904/528977-20190426084523578-1057721007.png)

> **Hystrix图形化Dashboard搭建:**
> **概述:**
> 除了隔离依赖服务的调用外，Hystrix还提供了准实时的调用监控（Hystrix Dashboard）,Hystrix会持续地记录所有通过Hystrix发起的请求执行信息，并以统计报表和图形展示给用户，包括每秒执行多少请求多少成功，多少失败等等，Netflix 通过hystrix-metrics-event-stream项目，实现了对以上指标的监控，SpringCloud也提供了HystrixDashboard的整合，对监控内容转化成可视化界面；
> **搭建：**
> 搭建一个模块，是图形化Dashboard，其它被监视模块，需要加一个依赖，不懂？？就是塔建一个模块，启动后，其它有指定依赖的模块将被监视

以下步骤 （搭建图形化DashBoard）：创建一个模块，`hystrix-dashboard-consumer9001`   -> 改pom ->写yml -> 主启动类 -> 启动服务测试  ->  实时监控实战

开始：

`创建一个模块`

hystrix-dashboard-consumer9001

`改pom`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>hystrix-dashboard-consumer9001</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--新增hystrix dashboard-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

```yaml
server:  port: 9001
```

`主启动类` : 主要是`@EnableHystrixDashboard`注解

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;@SpringBootApplication@EnableHystrixDashboardpublic class HystrixDashboard9001 {    public static void main(String[] args) {        SpringApplication.run(HystrixDashboard9001.class,args);    }}
```

`启动服务测试`

[http://localhost:9001/hystrix](http://localhost:9001/hystrix "http://localhost:9001/hystrix")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620046046429-1620046046421.png)

`实时监控实战`

监控端 cloud-provider-hystrix-payment8001

确保pom中存在以下依赖：

```xml
        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>
```

主启动添加方法`getServlet`：

```java
package com.atguigu.springcloud;import com.netflix.hystrix.contrib.metrics.eventstream.HystrixMetricsStreamServlet;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.boot.web.servlet.ServletRegistrationBean;import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;import org.springframework.context.annotation.Bean;@SpringBootApplication@EnableEurekaClient@EnableCircuitBreaker  //服务降级public class PaymentHystrixMain8001 {    public static void main(String[] args) {        SpringApplication.run(PaymentHystrixMain8001.class,args);    }    @Bean    public ServletRegistrationBean getServlet(){        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);        registrationBean.setLoadOnStartup(1);        registrationBean.addUrlMappings("/hystrix.stream");        registrationBean.setName("HystrixMetricsStreamServlet");        return registrationBean;    }}
```

启动服务 8001：cloud-provider-hystrix-payment8001

`9001监控8001：填写监控地址，http://localhost:8001/hystrix.strea`

9001会监控8001的服务熔断

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620046015778-1620046015772.png)

## Zuul路由网关

待挂

[https://www.cnblogs.com/itzlg/p/10699575.html](https://www.cnblogs.com/itzlg/p/10699575.html "https://www.cnblogs.com/itzlg/p/10699575.html")

zuul官网：[https://github.com/Netflix/zuul/wiki](https://github.com/Netflix/zuul/wiki "https://github.com/Netflix/zuul/wiki")

## Gateway新一代网关

> **Gateway简介：**  是springcloud官方出的
> **SpringCloud Gateway与Zuul的区别：**  Geteway是非阻塞异步的，而Zool 1.x是阻塞不支持长连接，Zool 2.x 支持非阻塞和支持长连接
> Gateway核心部分：Router（路由）、Predicate（断言）、Filter（过滤器）
> 工作流程：以下更多查看
> Gateway官网：[https://spring.io/projects/spring-cloud-gateway#learn](https://spring.io/projects/spring-cloud-gateway#learn "https://spring.io/projects/spring-cloud-gateway#learn")
> 更多参考 ：[https://blog.csdn.net/weixin\_44449838/article/details/110847357](https://blog.csdn.net/weixin_44449838/article/details/110847357 "https://blog.csdn.net/weixin_44449838/article/details/110847357")

![](https://gitee.com/xue--dong/blog_images/raw/master/images/20210129212912.png)

![](https://gitee.com/xue--dong/blog_images/raw/master/images/20210129212951.png)

> Gateway网关的搭建:  它是服务的挡风口，搭建中Cateway需要注册在注册中心中，且在yml配置好路由后，我们就可以进行测试了。

以下步骤：创建Gatway网关模块 ->  改pom ->  写yml -> 主启动类  -> 测试  -> 路由书写的第二种方式

开始：

`创建Gatway网关模块`

创建  cloud-gateway-9527  模块为Gatway网关模块

`改pom `

注意不要再加 `spring-boot-starter-web` 与 `spring-boot-starter-actuator` 依赖。否则报错

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-gateway-9527</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <!--新增gateway-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-gateway</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`写yml`

里面包含`路由信息`与`注册中心`的信息

```yaml
server:  port: 9527spring:  application:    name: cloud-gateway  cloud:    gateway:      routes:        # 路由 1        - id: payment_routh #路由的ID，没有固定规则但要求唯一，建议配合服务名          uri: http://localhost:8001   #匹配后提供服务的路由地址          predicates:            - Path=/provider/payment/get/**   #断言,路径相匹配的进行路由        # 路由 2        - id: payment_routh2          uri: http://localhost:8001          predicates:            - Path=/provider/payment/lb/**   #断言,路径相匹配的进行路由eureka:  instance:    hostname: cloud-gateway-service  client:    register-with-eureka: true    fetch-registry: true    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

`主启动类`

注册中心的客户端注解

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;@SpringBootApplication@EnableEurekaClientpublic class GatewayMain9527 {    public static void main(String[] args) {        SpringApplication.run(GatewayMain9527.class, args);    }}
```

`测试`

启动 Eureka-7001、Provider-8001、Gateway-9527

访问：上面的yml中配置了两个路由信息，我们先用原服务url进行测试，即 `http://localhost:8001/provider/payment/get/1` 再修改端口为网关的 url `http://localhost:9527/provider/payment/get/1` ，发现访问结果一致。

`路由书写的第二种方式`

在Gateway网关中com.atguigu.springcloud下创建config包，配置书写方式如下：

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.gateway.route.RouteLocator;import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;@Configurationpublic class GateWayConfig {    @Bean    public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {        RouteLocatorBuilder.Builder routes = routeLocatorBuilder.routes();        routes.route("my_router", r -> r.path("/provider/payment/timeout").uri("http://localhost:8001")).build();        return routes.build();    }}
```

*uri有path与无path区别，有path使用该path，无path，将自动匹配,即断言的path。*

> Gateway 动态路由配置:  默认情况下Gateway 会根据注册中心注册的服务列表以注册中心上微服务名为路径创建动态路由进行转发，从而实现同动态路由的功能。不懂？？也就是根据注册中心来实现动态路由

以下步骤：在  cloud-gateway-9527  （基本Gateway网关功能）  ->    改pom  ->  测试

开始：

`在 cloud-gateway-9527（基本Gateway网关功能）`

即 cloud-gateway-9527  官网注册在注册中心中

`改pom `

添加了`开启从注册中心主动态创建路由的功能 `   配置与修改路由的  `uri`

```yaml
server:  port: 9527spring:  application:    name: cloud-gateway  cloud:    gateway:      # 开启从注册中心动态创建路由的功能，利用微服务名进行路由      discovery:        locator:          enabled: true      routes:        # 路由 1        - id: payment_routh #路由的ID，没有固定规则但要求唯一，建议配合服务名          #uri: http://localhost:8001   #匹配后提供服务的路由地址          uri: lb://CLOUD-PROVIDER-SERVICE # 修改为服务名称          predicates:            - Path=/provider/payment/get/**   #断言,路径相匹配的进行路由        # 路由 2        - id: payment_routh2          #uri: http://localhost:8001          uri: lb://CLOUD-PROVIDER-SERVICE # 修改为服务名称          predicates:            - Path=/provider/payment/lb/**   #断言,路径相匹配的进行路由eureka:  instance:    hostname: cloud-gateway-service  client:    register-with-eureka: true    fetch-registry: true    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

`测试`

开启  `cloud-provider-payment8001`  `cloud-provider-payment8002`  `cloud-eureka-server7001`  `cloud-eureka-server7002`  与网关`cloud-gateway-9527  `

访问：[http://localhost:9527/provider/payment/lb](http://localhost:9527/provider/payment/lb "http://localhost:9527/provider/payment/lb")

结果：在8001与8002之间进行轮询，成功\~

> 常用的Router Predicate ：Predicate就是断言， 我们使用断言就可以进行路由匹配了。如 `path` 也属于断言。
> 下面我们就逐一演示！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620100275541-1620100275533.png)

以下步骤(断言演示)：After、Before、Between ->   Cookie ->  Header ->  Host  ->  Method  -> Path  -> Query

`1) After、Before、Between`

拿After，配置好后效果是在某时间后该路由才生效，不符合将报404, 演示：

配置：在`-Path**`下加`-After=2021-05-04T10:29:24.264+08:00[Asia/Shanghai]`  即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620095810369-1620095810357.png)

存在的问题：如何获取上面的时间格式，创建一个测试类返回当前的上面的时间格式：

```java
import com.thoughtworks.xstream.converters.time.ZonedDateTimeConverter;import java.time.ZonedDateTime;public class T2 {    public static void main(String[] args) {        ZonedDateTime zdt = ZonedDateTime.now();        System.out.println(zdt);    }}
```

测试：当前是在上面时间之后，通过Gateway 访问  [http://localhost:9527/provider/payment/lb](http://localhost:9527/provider/payment/lb "http://localhost:9527/provider/payment/lb") 正常，将时间配置成当前时间之后时（不符合时），再访问：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620095653188-1620095653168.png)

*Before、Between自行演示\~*

`2) Cookie `

配置好后效果是只有携带指定Cookie与对应value时才能正常访问，否则将报404, 演示：

配置：配置：在`-Path**`下加`- Cookie=username,zs`  即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620096998907-1620096998904.png)

测试：使用curl进行测试，下面演示的是cookie的value是否正确

结果：cookie的value值不符合上面的配置时，报404找不到的错误

存在的问题：curl返回中文乱码解决 [https://blog.csdn.net/leedee/article/details/82685636](https://blog.csdn.net/leedee/article/details/82685636 "https://blog.csdn.net/leedee/article/details/82685636")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620096948807-1620096948793.png)

curl [http://127.0.0.1:9527/provider/payment/lb](http://127.0.0.1:9527/provider/payment/lb "http://127.0.0.1:9527/provider/payment/lb")  --cookie "username=zs"

`3) Header `

配置好后效果是只有携带指定Header与符合配置好正则的value时才能正常访问，否则将报404, 演示：

配置：配置：在`-Path**`下加`- Header=X-Request-Id, \d+`  即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620097597690-1620097597676.png)

测试：使用curl进行测试，下面演示的是请求头X-Request-Id的value是否正确

结果：X-Request-Id的value值不符合上面的配置正则时，报404找不到的错误

![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210504110505330.png)

curl [http://127.0.0.1:9527/provider/payment/lb](http://127.0.0.1:9527/provider/payment/lb "http://127.0.0.1:9527/provider/payment/lb")  -H "X-Request-Id:1234"

`4) Host `

配置好后效果是只有符合配置好的域名才能正常访问，否则将报404, 演示：

配置：配置：在`-Path**`下加`- Host=**.cn.utools.club`  即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620098391201-1620098391196.png)

存在的问题：如何进行内网映射来进行测试，请使用uTools软件里面的 “内网穿透” 插件，特别简单。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620098517114-1620098517110.png)

测试：使用curl进行测试，下面演示域名是否正确

结果：域名不符合上面的配置时，报404找不到的错误

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620098242894-1620098242890.png)

curl [http://localhost:9527/provider/payment/lb](http://localhost:9527/provider/payment/lb "http://localhost:9527/provider/payment/lb") 与 curl [http://gateway9527.cn.utools.club/provider/payment/lb](http://gateway9527.cn.utools.club/provider/payment/lb "http://gateway9527.cn.utools.club/provider/payment/lb")

`5）Path`

最基本的Predicate (断言) ，上面的演示都有，作用是  请求的Path是否存在符合的路由Path，有可访问，无报404找不到

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620098828214-1620098828208.png)

`6) Query`

配置好后效果是只有Path存在符合的Query时才能正常访问，否则将报404, 演示：

配置：配置：在`-Path**`下加`- Query=username, \d+`  即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620099103369-1620099103366.png)

测试：使用curl进行测试，下面演示的是Query 中username的value是否符合配置

结果：Query 中username的value不符合上面的配置正则时，报404找不到的错误

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620099014559-1620099014547.png)

curl [http://localhost:9527/provider/payment/lb?username=1234](http://localhost:9527/provider/payment/lb?username=1234 "http://localhost:9527/provider/payment/lb?username=1234")

与   curl [http://localhost:9527/provider/payment/lb?username=-1234](http://localhost:9527/provider/payment/lb?username=-1234 "http://localhost:9527/provider/payment/lb?username=-1234")

> Gateway 过滤器：
> 路由过滤器可用于修改进入的HTTP请求和返回的HTTP响应，路由过滤器只能指定路由进行使用。
> Spring Cloud Gateway内置了多种路由过滤器，他们都由GatewayFilter的工厂 类来产生。但我们用的是自定义的过滤器。

以下步骤：内置Filter ->  自定义Filter

开始：

`内置Filter`

请查看官网：

[https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories "https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/#gatewayfilter-factories")

`自定义Filter`

在com.atguigu.springcloud 下创建一个 `filter包`  写如下自定义Filter类：

（只有当Query存在uname时才能访问成功）

```java
package com.atguigu.springcloud.filter;import lombok.extern.slf4j.Slf4j;import org.apache.commons.lang.StringUtils;import org.springframework.cloud.gateway.filter.GatewayFilterChain;import org.springframework.cloud.gateway.filter.GlobalFilter;import org.springframework.core.Ordered;import org.springframework.http.HttpStatus;import org.springframework.stereotype.Component;import org.springframework.web.server.ServerWebExchange;import reactor.core.publisher.Mono;import java.util.Date;@Component@Slf4jpublic class MyLogGateWayFilter implements GlobalFilter, Ordered {    @Override    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {        log.info("******come in MyLogGateWayFilter: "+new Date());        if(StringUtils.isEmpty(exchange.getRequest().getQueryParams().getFirst("uname"))) {            log.info("*****用户名为Null 非法用户,(┬＿┬)");            exchange.getResponse().setStatusCode(HttpStatus.NOT_ACCEPTABLE);//给人家一个回应            return exchange.getResponse().setComplete();        }        return chain.filter(exchange);    }    /** 加载过滤器顺序，返回值越小，优先级越高 */    @Override    public int getOrder() {        return 0;    }}
```

测试： 存在`uname` 访问成功，Query不存在`uname`  访问失败

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620102021725-1620102021722.png)

## Config 分布式配置中心

> SpringCloud Config为微服务架构中的微服提供集中化的外部配置支持，配置服务器为各个不同微服务应用的所有环境提供了一个中心化的外部配置。

> Config服务端

以下步骤：搭建Git环境 ->  创建Config模块 `cloud-config-center-3344` 来读取git仓库的配置文件 ->   配置文件读取规则

`搭建Git环境`

在github账号下创建一个`springcloud-config`  的git仓库，然后git clone XXX 到本地，创建文件 `config-dev.yml`   `config-test.yml`    `config-prod.yml`    内容这里写的是

```纯文本
config:  info: "config-dev.yml"
```

...

然后git push origin master 到github远程仓库上。

`创建Config模块来读取git仓库的配置文件`

模块名为 cloud-config-center-3344

`改pom`

引入的是：`spring-cloud-config-server`

```java
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-config-center-3344</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-config-server</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

写yml

```yaml
server:  port: 3344spring:  application:    name: cloud-config-center  cloud:    config:      server:        git:          # 填写自己的 github 路径,注意如果用的是ssh链接，就算你电脑存在ssh并在github账号加入了，也可能会认证失败，因此在这里用的是http链接          uri: https://github.com/18476305640/springcloud-config.git            search-paths:            - springcloud-config  #仓库名      label: master   #分支名eureka:  client:    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

主启动类

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.config.server.EnableConfigServer;@SpringBootApplication@EnableConfigServerpublic class ConfigCenterMain3344 {    public static void main(String[] args) {        SpringApplication.run(ConfigCenterMain3344 .class,args);    }}
```

测试

读取远程仓库 `springcloud-config` 下的`config-dev.yml`文件

访问：[http://localhost:3344/master/config-dev.yml](http://localhost:3344/master/config-dev.yml "http://localhost:3344/master/config-dev.yml")

结果（如下成功）：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620109581192-1620109581178.png)

` 配置文件读取规则`

示例：[http://localhost:3344/master/config-dev.yml](http://localhost:3344/master/config-dev.yml "http://localhost:3344/master/config-dev.yml")

规则：`label`是上面是分支(master)，`application-profile` 就是上面的config-dev.yml中的`config-dev`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620109664938-1620109664935.png)

> Config客户端: 即从Config服务端获取yml配置作为自己的配置

以下步骤：创建Config客户端模块`cloud-config-client-3355`  -> 改pom -> 写yml -> 主启动类 -> 业务类 ->  测试（存在的问题） ->  动态刷新（解决问题）

`1） 创建Config客户端模块`

创建模块 cloud-config-client-3355

`2）改pom`

引入的是：`spring-cloud-starter-config`

```xml
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-config-client-3355</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-config</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

`3）写yml: `

bootstrap.yml

```yaml
server:  port: 3355spring:  application:    name: config-client  cloud:    config:      # 分支名称      label: master      # 配置文件名      name: config      # 环境      profile: dev      # 配置中心的地址      uri: http://localhost:3344eureka:  client:    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka
```

`4）主启动类`

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;@SpringBootApplicationpublic class ConfigClientMain3355 {    public static void main(String[] args) {        SpringApplication.run(ConfigClientMain3355.class,args);    }}
```

`5）业务类`

controller层

```java
package com.atguigu.springcloud.controller;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestControllerpublic class ConfigClientController {    @Value("${config.info}")    private String configInfo;    @GetMapping("/configInfo")    public String getConfigInfo(){        return configInfo;    }}
```

`6）测试(存在问题)`

启动注册中心7001、7002与Config 服务端3344再启动Config客户端3355 ，注意如果3344无法获取到github上的yml文件，Config客户端3355 将失败！

访问：[http://localhost:3355/configInfo](http://localhost:3355/configInfo "http://localhost:3355/configInfo")

结果：输出 config-dev.yml  ，成功！

存在的问题：Config客户端3355只在启动时从Config服务端3344获取yml,而无法实时更新yml

`7）动态刷新（解决问题）`

问题：Config客户端3355只在启动时从Config服务端3344获取yml,而无法实时更新yml

最终效果：github上yml配置文件修改后，Config客户端想要从3355获取最新的配置文件，不用重启，运维人员只需向Config客户端3355发一个`post请求`即可通知刷新。

以下步骤：改pom ->  改yml -> 改业务 -> 测试

改pom

确保存在以下依赖

```xml
<dependency>    <groupId>org.springframework.boot</groupId>    <artifactId>spring-boot-starter-actuator</artifactId></dependency>
```

改yml

```yaml
management:  endpoints:    web:      exposure:        include: "*"
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620150481738-1620150481733.png)

改业务

在Config类上加入 `@RefreshScope `注解

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620150544665-1620150544659.png)

测试

启动注册中心7001、7002与Config 服务端3344再启动Config客户端3355 ，注意如果3344无法获取到github上的yml文件，Config客户端3355 将失败！

访问： [http://localhost:3355/configInfo](http://localhost:3355/configInfo "http://localhost:3355/configInfo")

改github上的yml

再次访问，结果：与之前一样

发送post请求通知Config客户端刷新配置文件yml :    curl -X POST "[http://localhost:3355/actuator/refresh](http://localhost:3355/actuator/refresh "http://localhost:3355/actuator/refresh")"

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620150852017-1620150852011.png)

再次访问，结果：配置文件已经刷新！测试成功

## Bus 消息总线

> 简介
> **是什么**：Spring Cloud Bus是用来将分布式系统的节点与轻量级消息系统链接起来的框架，它整合了Java的事件处理机制和消息中间件的功能
> 目前支持RabbitMQ和Kafka
> **能做什么：**
> Spring Cloud Bus能管理和传播分布式系统间的消息，就像一个分布式执行器，可用于广播状态的更改、事件推送等，也可以当做微服务间的通讯通道
> **消息总线**：
> 在微服务架构的系统中，通常会使用轻量级的消息代理来构架一个共用的消息主题，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会被所有实例监听和消费，所以称它为消息总线。在总线的各个实例，都可以方便地广播一些需要让连接在该主题上的实例都知道的消息
> 基本原理：ConfigClient实例都监听MQ中同一个topic（默认是springCloudBus）。当一个服务刷新数据的时候，它会把这个信息放到Topic中，这样其他监听同一Topic的服务就能得到通知，然后去更新自身的配置

Bus动态刷新全局广播的设计思想：

方案1 ：利用消息总线触发一个 `客户端 `/bus/refresh ,而刷新所有客户端的配置

方案2 ：利用消息总线触发一个`服务端`ConfigServer 的 /bus/refresh 端点,而刷新所有客户端的配置（更加推荐）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620180404267-1620180404260.png)

\*\*推荐：方案2，方案1客户端不适合的原因是: \*\*

```纯文本
微服务本身是业务模块，它本不应该承担配置刷新职责、

破坏了微服务各节点的对等性、

有一定的局限性。例如，微服务在迁移时，它的网络地址常常会发生变化，此时如果想要做到自动刷新，那就会增加更多的修改
```

> RibbitMQ环境：安装`RabbitMQ`，因为RabbitMQ依赖Erlang所以也需要安装`Erlang`安装完成后，就启动RabbitMQ服务了

以下步骤：安装Erlang ->  安装RabbitMQ -> 启动RabbitMQ服务

开始：

`1） Erlang的安装：`

下载：直链   官网   博主版本

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620181644375-1620181644370.png)

安装过程：可一路回车

`2） RabbitMQ 的安装`

下载： 直链  官网   博主版本

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620181528439-1620181528427.png)

安装过程：可一路回车

`3） 启动RabbitMQ服务`

请保证设备名称为英文

1\)进入RabbitMQ安装目录的sbin目录下，cmd执行 (先不要关掉)：

`rabbitmq-plugins enable rabbitmq_management`

1.  在win右下角菜单中选择点击 RabbitMQ Service - start

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620184338340-1620184338339.png)

3）再在sbin cmd命令中执行：`rabbitmqctl start_app`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620184149115-1620184149112.png)

1.  访问地址，查看是否成功： [http://localhost:15672/](http://localhost:15672/ "http://localhost:15672/")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620184423695-1620184423694.png)

5）登录

账号 ：guest
密码 ：guest

> 利用消息总线解决Config存在的问题：
> 在分布式配置中心中，存在的问题是我们就能通知一个客户端模块一个客户端模块地通知刷新，做不到一次修改，广播通知，处处生效。在下面我们就是围绕着解决这个问题来做的。在上面我们已经创建了3344服务端模块与3355客户端模块，我们还需要创建一个客户端模块3366。且向将处于消息总线系统的模块即3344（服务端）与33344、3355 (客户端) 加入配置，即加入消息总线系统中。然后再测试

以下步骤：克隆3355客户端模块即3366客户端模块（建module ->  改pom -> 写yml ->  主启动类 ->  业务类） ->  将3344、3355、3366模块加入消息总线系统 -> 测试（广播通知）  ->  定点通知

`1） 克隆3355客户端模块即3366客户端模块`

建module

cloud-config-client-3366

改pom

```纯文本
<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0"         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">    <parent>        <artifactId>springcloud2021</artifactId>        <groupId>com.atguigu</groupId>        <version>1.0-SNAPSHOT</version>    </parent>    <modelVersion>4.0.0</modelVersion>    <artifactId>cloud-config-client-3366</artifactId>    <properties>        <maven.compiler.source>8</maven.compiler.source>        <maven.compiler.target>8</maven.compiler.target>    </properties>    <dependencies>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-config</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies></project>
```

写yml

bootstrap.yml

```yaml
server:  port: 3366spring:  application:    name: config-client  cloud:    config:      # 分支名称      label: master      # 配置文件名      name: config      # 环境      profile: dev      # 配置中心的地址      uri: http://localhost:3344eureka:  client:    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eurekamanagement:  endpoints:    web:      exposure:        include: "*"
```

主启动类

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.EnableEurekaClient;@EnableEurekaClient@SpringBootApplicationpublic class ConfigClientMain3366 {    public static void main(String[] args) {        SpringApplication.run( ConfigClientMain3366.class,args);    }}
```

业务类

com.atguigu.springcloud ->  controller

```java
package com.atguigu.springcloud.controller;import org.springframework.beans.factory.annotation.Value;import org.springframework.cloud.context.config.annotation.RefreshScope;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestController@RefreshScopepublic class ConfigClientController {    @Value("${server.port}")    private String serverPort;    @Value("${config.info}")    private String configInfo;    @GetMapping("/configInfo")    public String getConfigInfo(){        return "serverPort:"+serverPort+"\t\n\n configInfo: "+configInfo;    }}
```

` 2） 将3344、3355、3366模块加入消息总线系统`

**3344模块：**

改pom

加入：

```xml
<dependency>     <groupId>org.springframework.cloud</groupId>     <artifactId>spring-cloud-starter-bus-amqp</artifactId></dependency>
```

改yml：按注释的“位置”，加入

```yaml
spring:  # RabbitMQ 相关配置,“位置”:spring的子属性  rabbitmq:    host: localhost    port: 5672    username: guest    password: guest
```

```yaml
management:   # 暴露 Bus 刷新配置的端点，“位置”：与spring同层次  endpoints:    web:      exposure:        include: 'bus-refresh'
```

**Config-Client-3355、3366模块**：

**改pom**

加入：

```xml
<dependency>     <groupId>org.springframework.cloud</groupId>     <artifactId>spring-cloud-starter-bus-amqp</artifactId></dependency>
```

**改yml**

加入：

```yaml
# RabbitMQ 相关的配置rabbitmq:  host: localhost  port: 5672  username: guest  password: guest
```

`3） 测试（广播通知）`

\*\*启动： \*\*

注册中心：7001与7002

消息总线系统/Config服务端：3344

消息总线系统/Config客户端：3355、3366

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620188771343-1620188771320.png)

**测试步骤：** 修改远程仓库yml（config-dev.yml）配置文件， 访问：

[http://localhost:3344/config-dev.yml](http://localhost:3344/config-dev.yml "http://localhost:3344/config-dev.yml")
[http://localhost:3355/configInfo](http://localhost:3355/configInfo "http://localhost:3355/configInfo")
[http://localhost:3366/configInfo](http://localhost:3366/configInfo "http://localhost:3366/configInfo")

发现3344yml始终保持最新yml配置文件，而客户端3355，3366仍是启动时的yml配置文件信息，未更新。

向服务端3344发送post请求，让消息总线发送配置更新通知，让客户端配置文件更新：

打开 CMD 发送 POST 请求    curl -X POST "[http://localhost:3344/actuator/bus-refresh](http://localhost:3344/actuator/bus-refresh "http://localhost:3344/actuator/bus-refresh")"

再次刷新上面的3个地址，发现服务端配置文件已经是最新！ 测试成功

打开RabbitMQ web：发现存在默认的springCloudBus订阅主题

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620190148347-1620190148324.png)

`4) 定点通知`

\*\*启动： \*\*

```纯文本
  注册中心：7001与7002

  消息总线系统/Config服务端：3344

  消息总线系统/Config客户端：3355、3366
```

**访问：**

```纯文本
  http://localhost:3344/config-dev.yml 
  http://localhost:3355/configInfo
  http://localhost:3366/configInfo
```

**测试：**

```纯文本
  修改github上的配置文件yml,向注册中心即服务端3344发现post请求，要求定时通知

  格式：http://localhost:配置中心的端口号/actuator/bus-refresh/{destination}

  发出定点刷新的请求    curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client:3355"

  结果：3355客户端配置文件刷新配置文件信息最新，3366配置不变。测试成功
```

**总结：**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620192814822-1620192814807.png)

## SpringCloud Stream 消息驱动

> springcloud stream是一个构建”消息驱动“微服务的框架。能屏蔽底层消息中间件的差异，降低切换版本，统一消息的编程模型

![](https://img-blog.csdnimg.cn/20201217092911891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDQ0OTgzOA==,size_16,color_FFFFFF,t_70)

> 这些中间件的差异性导致我们实际项目开发给我们造成了一定的困扰，我们如果用了两个消息队列的其中一种，后面的业务需求，我想往另外一种消息队列进行迁移，这时候无疑就是一个灾难性的，一大堆东西都要重新推倒重新做，因为它跟我们的系统耦合了，这时候 springcloud Stream 给我们提供了—种解耦合的方式。

> 官网地址 ：[https://spring.io/projects/spring-cloud-stream#overview](https://spring.io/projects/spring-cloud-stream#overview "https://spring.io/projects/spring-cloud-stream#overview")

> 参考详细说明： [https://blog.csdn.net/weixin\_44449838/article/details/111300096](https://blog.csdn.net/weixin_44449838/article/details/111300096 "https://blog.csdn.net/weixin_44449838/article/details/111300096")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620194156688-1620194156684.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620564687740-1620564687733.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620564762655-1620564762644.png)

Binder ：很方便的连接中间件，屏蔽差异
Channel ：通道，是队列 Queue 的一种抽象，在消息通讯系统中就是实现存储和转发的媒介，通过对 Channel 对队列进行配置
Source和Sink ：简单的可理解为参照对象是 Spring Cloud Stream 自身，从 Stream 发布消息就是输出，接受消息就是输入

> **Stream消息又要去之生产者**：作为生产者，完成 消息的发送，想要完成下面的功能，我们需要搭建RabbitMQ的环境进行搭建。在RabbitMQ确认搭建成功后，开始以下，下面就是创建一个Stream消息生产者8801模块的创建。完成后进行测试，调用接口 发送信息。在RibbitMQ中可以监控到”流量“。

以下步骤：创建Stream消息生产者`cloud-stream-rabbitmq-provider-8801`模块（建module-> 改pom -> 写yml -> 主启动类 -> 业务类 ） ->  测试

`建module`

cloud-stream-rabbitmq-provider-8801

`改pom`

```xml
    <dependencies>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-eureka-server -->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

`写yml`

```yaml
server:  port: 8801spring:  application:    name: cloud-stream-provider  cloud:    stream:      binders: # 在此处配置要绑定的rabbitmq的服务信息；        defaultRabbit: # 表示定义的名称，用于于binding整合          type: rabbit # 消息组件类型          environment: # 设置rabbitmq的相关的环境配置            spring:              rabbitmq:                host: localhost                port: 5672                username: guest                password: guest      bindings: # 服务的整合处理        output: # 这个名字是一个通道的名称          destination: studyExchange # 表示要使用的Exchange名称定义          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”          # ！=！=！实际这里可能会爆红，不用管，可以正常运行 ！=！=！          binder: defaultRabbit  # 设置要绑定的消息服务的具体设置eureka:  client: # 客户端进行Eureka注册的配置    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka  instance:    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）    instance-id: send-8801.com  # 在信息列表时显示主机名称    prefer-ip-address: true     # 访问的路径变为IP地址
```

`主启动类`

com.atguigu.springcloud ->  controller

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;@SpringBootApplicationpublic class StreamMQMain8801 {    public static void main(String[] args) {        SpringApplication.run(StreamMQMain8801.class, args);    }}
```

`业务类`

service接口

```java
package com.atguigu.springcloud.service;public interface IMessageProvider {    public String send();}
```

impl

```java
package com.atguigu.springcloud.service.impl;import com.atguigu.springcloud.service.IMessageProvider;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.cloud.stream.annotation.EnableBinding;import org.springframework.cloud.stream.messaging.Source;import org.springframework.messaging.MessageChannel;import org.springframework.messaging.support.MessageBuilder;import java.util.UUID;@EnableBinding(Source.class)   //定义消息的推送管道, 绑定 信道（Channel）和 Exchangepublic class MessageProviderImpl implements IMessageProvider {    @Autowired    private MessageChannel output; // 消息发送管道    @Override    public String send() {        //简单的消息        String serial = UUID.randomUUID().toString();        output.send(MessageBuilder.withPayload(serial).build());        System.out.println("********serial:"+serial);        return null;    }}
```

controller

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.service.IMessageProvider;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;import javax.annotation.Resource;@RestControllerpublic class SendMessageController {    @Resource    private IMessageProvider messageProvider;    @GetMapping(value = "/sendMessage")    public String sendMessage() {        return messageProvider.send();    }}
```

`测试`

1）启动 ：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509213130588.png)

注册中心：7001、7002

Stream消息生产者 cloud-stream-rabbitmq-provider-8801

2）测试

访问发送消息：  [http://localhost:8801/sendMessage](http://localhost:8801/sendMessage "http://localhost:8801/sendMessage")

打开RabbitMQ web  [http://localhost:15672/](http://localhost:15672/ "http://localhost:15672/") ，查看以下数据（即消息通道名studyExchange是否存在，studyExchange是我们创建的8801模块的application.yml中配置的，除此还需要查看是否存在数据波动）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509212027311.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509212021028.png)

> Stream消息消费者：可以监听获取指定生产者发送的消息，创建一个8802模块，它是Stream消息消费者模块。创建来后，调用方法让生产者发送消息，然后查看消费者模块控制台的输出情况。

以下步骤：创建Stream消费者8002模块(创建module -> 改pom -> 写yml -> 主启动类 -> 业务类) -> 测试

`创建Stream消费者8002模块`

1） 创建module  cloud-stream-rabbitmq-consumer-8802

2）改pom

```xml
    <dependencies>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-eureka-server -->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test -->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

3\)写yml

```yaml
server:  port: 8802spring:  application:    name: cloud-stream-consumer  cloud:    stream:      binders: # 在此处配置要绑定的rabbitmq的服务信息；        defaultRabbit: # 表示定义的名称，用于于binding整合          type: rabbit # 消息组件类型          environment: # 设置rabbitmq的相关的环境配置            spring:              rabbitmq:                host: localhost                port: 5672                username: guest                password: guest      bindings: # 服务的整合处理        input: # 这个名字是一个通道的名称          destination: studyExchange # 表示要使用的Exchange名称定义          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”          binder: defaultRabbit  # 设置要绑定的消息服务的具体设置eureka:  client: # 客户端进行Eureka注册的配置    service-url:      defaultZone: https://7001.cn.utools.club/eureka,https://7002.cn.utools.club/eureka  instance:    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）    instance-id: receive-8802.com  # 在信息列表时显示主机名称    prefer-ip-address: true     # 访问的路径变为IP地址
```

1.  主启动类

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;@SpringBootApplicationpublic class StreamMQMain8802 {    public static void main(String[] args) {        SpringApplication.run(StreamMQMain8802.class, args);    }}
```

1.  业务类

com.atguigu.springcloud ->controller

```java
package com.atguigu.springcloud.controller;import org.springframework.beans.factory.annotation.Value;import org.springframework.cloud.stream.annotation.EnableBinding;import org.springframework.cloud.stream.annotation.StreamListener;import org.springframework.cloud.stream.messaging.Sink;import org.springframework.messaging.Message;import org.springframework.stereotype.Component;@Component@EnableBinding(Sink.class)public class ReceiveMessageListenerController {    @Value("${server.port}")    private String serverPort;    @StreamListener(Sink.INPUT)    public void input(Message<String> message) {        System.out.println("消费者1号，接收："+message.getPayload()+"\t port: "+serverPort);    }}
```

`测试`

1）启动： 注册中心7001、7002； Stream消息生产者8801； Stream消息消费者8802，打开RabbitMQ web  [http://localhost:15672/](http://localhost:15672/ "http://localhost:15672/") 查看指定生产下有哪些监听者（消费者）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509221006575.png)

2）测试：调用生产者8801的方法发送消息 [http://localhost:8801/sendMessage，查看消费者模块控制台输出](http://localhost:8801/sendMessage，查看消费者模块控制台输出 "http://localhost:8801/sendMessage，查看消费者模块控制台输出")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509221952531.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509222156989.png)

> 消息消费者与生产者存在的问题解决： 将8802消费者克隆一个新的8803模块，然后再说明并解决他们之间存在的问题。

以下步骤： 8802消费者克隆一个新的8803模块消费模块 -> 解决它们之间的问题

`8802消费者克隆一个新的8803模块消费模块`

前提，我们创建了8801生产者模块并创建一个8802消费者模块，这时我们进行克隆。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509230008534.png)

`解决它们之间的问题 `

1） 重复消费问题： 默认情况下，消费者是不在同一个组的，不在同一个组时，在生产者发送消息时，它们都会接收并消费。这是我们开发中必须要解决的问题，即进行分组，分组后同一组内是竞争关系且只消费一次。

未自定义分组前： 自动分配组流水号

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509233554102.png)

分组：在消费者（8801、8802）yml中加入以下配置，`group: 组名`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509233746025.png)

异组：即消费者（8801、8802）配置的 `group不同` ，调用生产者（[http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）都消费了这再次消息。](http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）都消费了这再次消息。 "http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）都消费了这再次消息。")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509234233129.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509234520590.png)

同组：即消费者（8801、8802）配置的 `group相同` ，调用生产者（[http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）轮询的方式消费了消息。](http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）轮询的方式消费了消息。 "http://localhost:8801/sendMessage）发送两次消息。测试结果：两个消费者（8801、8802）轮询的方式消费了消息。")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509235052684.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210509234847845.png)

2）持久化： 当我们配置了	`group` 分组后，自动支持了持久化，什么是持久化即不在线时人家给你发信息，你在线了，就会收到信息（捡起消费）。

测试：

1）去掉8802分组，启动，发送消息测试，关闭8802，发送消息测试（此时8802已经下线） ，启动8802,查看控制台：

发现：无捡起消费！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210510001723854.png)

2） 以异组身份，即8802与8803不同group不同，同组的话另一个”下线“ 会全部被另一消费者消费。所以测试用异组，异组启动8802,发送消息测试，关闭8802，发送消息（此时8802已经下线），启动8802，查看控制台：

发现：被捡起消费！！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210510002117799.png)

## SpringCloud Sleuth

```纯文本
分布式请求链路跟踪：为什么会出现这个技术，要解决哪些问题。在微服务框架中，一个客户端发起的请求在后端系统中会经过多次不同的服务节点调用来协同产生最后的请求结果，每一个前段请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求最后的失败。SpringCloudSleuth提供了一套完整的服务跟踪的解决方案，在分布式系统中提供乐追踪解决方案并且兼容支持了zipkin。
```

> Sleuth ：来负责跟踪整理

> zipkin：负责展现

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620632673865-1620632673859.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620632613649-1620632613616.png)

以下步骤：启动Zipkin ->  向8001、8080加入zipkin依赖，创建测试方法 ->  测试

`启动Zipkin `

下载： 点击下载Zipkin-server

启动： java -jar  zipkin-server-2.12.9-exec.jar

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510153905063.png)

打开Web: [http://localhost:9411/zipkin/](http://localhost:9411/zipkin/ "http://localhost:9411/zipkin/")   因为我服务器启动失败（报错），所以在虚拟机上启动：[http://192.168.44.130:9411/zipkin/](http://192.168.44.130:9411/zipkin/ "http://192.168.44.130:9411/zipkin/")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510153932625.png)

`向8001、8080加入zipkin依赖，创建测试方法`

cloud-provider-payment8001

改pom:  加入

```xml
        <!-- 包含了sleuth zipkin 数据链路追踪-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-zipkin</artifactId>        </dependency>
```

写yml

```yaml
spring:  application:    name: cloud-provider-service  datasource:    type: com.alibaba.druid.pool.DruidDataSource      #当前数据源操作类型    driver-class-name: org.gjt.mm.mysql.Driver        #mysql驱动包    url: jdbc:mysql://localhost:3306/db2019?useUnicode=true&characterEncoding=utf-8&useSSL=false    username: root    password: 3333  #zipkin配置  zipkin:    base-url: http://192.168.44.130:9411 # 指定zipkin地址    sleuth:      sampler:        # 采样率介于0~1之间，1则表示全部采集        probability: 1
```

业务类

```java
/** * 测试链路监控 */@GetMapping("/payment/zipkin")public String paymentZipkin(){    return "hi, i'am paymentZipkin server fall back, welcome to here, O(∩_∩)O哈哈~";}
```

cloud-provider-payment8080

改pom:  加入

```xml
        <!-- 包含了sleuth zipkin 数据链路追踪-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-zipkin</artifactId>        </dependency>
```

写yml

```yaml
server:  port: 8080spring:  application:    name: cloud-consumer-order  #zipkin配置  zipkin:    base-url: http://192.168.44.130:9411 # 指定zipkin地址    sleuth:      sampler:        # 采样率介于0~1之间，1则表示全部采集        probability: 1
```

业务类

controller

```java
/** * 测试链路监控 */@GetMapping("/consumer/payment/zipkin")public String paymentZipkin(){    String result = restTemplate.getForObject(PAYMENT_URL+"/provider/payment/zipkin", String.class);    return result;}
```

取消@LoadBalanced注释！！！！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510171628622.png)

`  测试`

访问：打开zipkin Web:  [http://localhost:8080/consumer/payment/zipkin](http://localhost:8080/consumer/payment/zipkin "http://localhost:8080/consumer/payment/zipkin")

说明：访问后，zipkin就会追踪到链路。我们可以查询服务名，刚才就是`cloud-consumer-order` 我们选择查看就然后点击“查找” ，就会查询到追踪的信息，点入”一项” 追踪信息，我们可以查询依赖，就可以查找调用信息（即谁调用谁）。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510172107765.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510180123536.png)

## Alibaba Nacos

> 简介：

*   Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

*   依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。

*   Nacos = Eureka+Config+Bus

*   前4个字母分别为Naming和Configuration的前两个字母，最后的s为service

> 能做什么：

*   **服务限流降级**：默认支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Spring Cloud Gateway, Zuul, Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。

*   **服务注册与发现**：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。

*   **分布式配置管理**：支持分布式系统中的外部化配置，配置更改时自动刷新。

*   **消息驱动能力**：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。

*   **分布式事务**：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。

*   **阿里云对象存储**：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。

*   **分布式任务调度**：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。

*   **阿里云短信服务**：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

> 去哪下：

*   github上找springcloud alibaba nacos,选择版本，根据自己的系统进行下载 [https://github.com/alibaba/nacos/tags](https://github.com/alibaba/nacos/tags "https://github.com/alibaba/nacos/tags")

> 怎么玩：

*   手册：[https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html "https://nacos.io/zh-cn/docs/what-is-nacos.html")

*   GITHUB：  [https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md "https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md")

具体：

### 环境的搭建：

以下步骤： 下载 ->  启动

`下载`：   [https://github.com/alibaba/nacos/tags](https://github.com/alibaba/nacos/tags "https://github.com/alibaba/nacos/tags")

`启动`： bin目录下执行  startup.cmd 启动，报错请更换jdk（博主使用：jdk11\_jb51）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510221832190.png)

访问：[http://192.168.44.1:8848/nacos/index.html#/login](http://192.168.44.1:8848/nacos/index.html#/login "http://192.168.44.1:8848/nacos/index.html#/login")    登录：nacos  nacos

### Alibaba注册中心

> AlibabaNacos的注册中心替代了Eureka。下面就演示，如果将服务注册到Nacos注册中心上。

以下步骤：创建module(9001) ->  改pom -> 写yml -> 主启动 -> 业务  -> 根据9001克隆9002 -> 创建消费者83  -> 测试

`创建module`

模块名：cloudalibaba-provider-payment9001

`改pom`

```xml
    <dependencies>        <!--spring cloud alibaba nacos-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--web/actuator这两个一般一起使用，写在一起-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--监控-->        <dependency>            <groupId>                org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

`写yml`

```yaml
server:  port: 9001spring:  application:    name: nacos-payment-provider  cloud:    nacos:      discovery:        server-addr: localhost:8848 #配置Nacos地址management:  endpoints:    web:      exposure:        include: '*'  #监控
```

`主启动类`

```纯文本
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class PaymentMain9001 {    public static void main(String[] args) {        SpringApplication.run(PaymentMain9001.class,args);    }}
```

`业务`

controller

```java
package com.atguigu.springcloud.controller;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;@RestControllerpublic class PaymentController {    @Value("${server.port}")    private String serverPort;    @GetMapping(value = "/payment/nacos/{id}")    public String getPayment(@PathVariable("id") Integer id){        return "nacos registry, serverPort: "+ serverPort+"\t id="+id;    }}
```

`根据9001克隆9002`

不同点：模块名 cloudalibaba-provider-payment9002  端口：9002

`测试`

启动 cloudalibaba-provider-payment9001与 cloudalibaba-provider-payment9002

发现：服务名下存在两个节点，即9001、9002

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/10/20210510231538767.png)

`创建消费者83`

1）创建Module

cloudalibaba-consumer-nacos-order83

2）改pom

```xml
<dependencies>        <!--spring cloud alibaba nacos-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--引入我们自定义的公共api jar包-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <!--web/actuator这两个一般一起使用，写在一起-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--监控-->        <dependency>            <groupId>                org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

1.  写yml

```yaml
server:  port: 83spring:  application:    name: naocs-order-consumer  cloud:    nacos:      discovery:        server-addr: localhost:8848 # 配置nacos注册中心地址# 消费者将要去访问的微服务名称（成功注册进nacos的微服务提供者）server-url:  nacos-user-service: http://nacos-payment-provider
```

1.  主启动类

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class PaymentMain83 {    public static void main(String[] args) {        SpringApplication.run(PaymentMain83.class,args);    }}
```

1.  业务类

config -> ApplicationContextConfig

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.client.loadbalancer.LoadBalanced;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.web.client.RestTemplate;@Configurationpublic class ApplicationContextConfig {    @Bean    @LoadBalanced    public RestTemplate getRestTemplate() {        return new RestTemplate();    }}
```

controller ->  OrderNacosController

```java
package com.atguigu.springcloud.controller;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class OrderNacosController {    @Value("${server-url.nacos-user-service}")    private String serverURL;    @Resource    private RestTemplate restTemplate;    @GetMapping("/consumer/payment/nacos/{id}")    public String paymentInfo(@PathVariable("id") Long id) {        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);    }}
```

测试：

启动生产者9001、9002 与消费者83

访问：[http://localhost:83/consumer/payment/nacos/1](http://localhost:83/consumer/payment/nacos/1 "http://localhost:83/consumer/payment/nacos/1")

发现：以轮询的方式进行调用， Nacos天生就支持负载均衡。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513004844359.png)

#### 注册中心的比较

`Nacos支持AP与CP的切换`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513010006889.png)

`Nacos与其他注册中心特性对比：`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513005511157.png)

### Nacos配置中心

> Nacos配置中心： 完美解决了Spring Config无法自动解决配置的问题。只要我们修改Nacos中的配置文件，就会立即生效！

以下步骤： 创建3377模块使用Nacos中的配置文件 ->  在Nacos上创建具有规则的配置文件  -> 测试  -> DataID的切换 演示->  自定义分组group与获取指定分组中的指定配置  -> 自定义nameSpace的演示

` 1) 创建3377模块使用Nacos中的配置文件`

1.  创建模块

    ```纯文本
      cloudalibaba-config-nacos-client3377
    ```

2）改pom

新加入的依赖是：

```xml
        <!--nacos-config-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>        </dependency>
```

完整依赖：

```xml
    <dependencies>        <!--nacos-config-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>        </dependency>        <!--nacos-discovery-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--web/actuator这两个一般一起使用，写在一起-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--监控-->        <dependency>            <groupId>                org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

3）写yml

bootstrap.yml

```yaml
server:  port: 3377spring:  application:    name: nacos-config-client  cloud:    nacos:      discovery:        server-addr: localhost:8848 # Nacos服务注册中心地址      config:        server-addr: localhost:8848 # Nacos作为配置中心地址        file-extension: yaml  # 指定yaml格式的配置
```

application.yml

```yaml
spring:  profiles:    active: dev # 表示找一个开发环境的配置文件# ${spring.application.name}-${spring.cloud.config.file-extension}.${spring.profiles.active}  配置文件名的规则
```

1.  主启动类

```java
package com.atguigu.com;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class NacosConfigClientMain3377 {    public static void main(String[] args) {        SpringApplication.run(NacosConfigClientMain3377.class,args);    }}
```

5）业务类

controller  ->

```java
package com.atguigu.com.controller;import org.springframework.beans.factory.annotation.Value;import org.springframework.cloud.context.config.annotation.RefreshScope;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestController@RefreshScope   //支持Nacos的动态刷新功能public class ControllerClientController {    @Value("${config.info}")    private String configInfo;    @GetMapping("/config/info")    public String getConfigInfo(){        return configInfo;    }}
```

`2) 在Nacos上创建具有规则的配置文件 `

${spring.application.name}-${spring.cloud.config.file-extension}.\${spring.profiles.active}  配置文件名的规则

即在Nacos上创建：  `nacos-config-client-dev.yaml`  文件

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513014436288.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513014440925.png)

`3）测试`

启动  3377 模块

访问：[http://localhost:3377//config/info](http://localhost:3377//config/info "http://localhost:3377//config/info")

发现：启动访问后 是`version:1`  ,然后修改Nacos 中的`nacos-config-client-dev.yaml`配置文件后，再刷新发现是`version:2`  ,所以Nacos的Config 解决了动态刷新问题，这主要依赖于`@RefreshScope`注解；

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513014531605.png)

`4）DataID的切换 演示`

**有三个需要进行演示说明，分别是DataID、Group、NameSpace,现在演示的是DataID !!**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513220459859.png)

以下步骤：创建一个新的配置文件 -> 在微服务3377中将application.yml中的配置`spring.active`  修改为`test` ->   测试

在Nacos上创建一个新的配置文件：nacos-config-client-test.yaml，内容是

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513212146214.png)

在微服务3377中将application.yml中的配置spring.active  修改为test

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513212220759.png)

测试

启动：cloudalibaba-config-nacos-client3377

访问：[http://localhost:3377/config/info](http://localhost:3377/config/info "http://localhost:3377/config/info")

结果：获取到了配置test的配置文件。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513212332331.png)

`5）自定义分组与获取指定分组中的指定配置`

以下步骤：自定义一个分组  ->  配置从指定分组中获取配置  -> 测试

1）自定义一个分组

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513214309836.png)

创建的分组

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513214319317.png)

2） 配置从指定分组中获取配置

在 spring.cloud.config中加入group ,即：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513214734806.png)

修改prifiles.active中的值，因为我们在分组中创建的文件是 `nacos-config-client-info.yaml`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513214535755.png)

3）测试

开启3377，访问：[http://localhost:3377/config/info](http://localhost:3377/config/info "http://localhost:3377/config/info")

结果：获取到了`DEV_GROUP`里面的 `nacos-config-client-info.yaml` 配置文件。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513214822812.png)

切换分组获取配置：略

`6） 自定义nameSpace的演示`

说明：加入nameSpace后，就完整了namespace -> group -> dataid

以下步骤：创建两个命名空间`dev` 、`test`  分别在这二个命名空间内书写两个相同分组相同Data ID 的 配置文件->  修改配置 ->  测试

1.  创建两个命名空间`dev` 、`test`  分别在这二个命名空间内书写两个相同分组相同Data ID 的 配置文件

配置配置分组是`DEV_GROUP`  DataID是`info`  ,配置文件名：`nacos-config-client-info.yaml` 进行创建

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513222455383.png)

2\. 修改配置：在spring.nacos.config下加入namespace,值是命名空间对应的`命名空间ID`
命令空间ID:

修改配置：

```纯文本
![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513222921464.png "")
![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513222743977.png "")
```

3\. 测试：启动3377，访问：[http://localhost:3377/config/info](http://localhost:3377/config/info "http://localhost:3377/config/info")
发现：获取了指定namespace-> group -> dataid下的指定的配置文件

切换命名空间测试：略

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/13/20210513223146030.png)

#### Nacos在Linux上的集群配置

> 之前用的老师一个Nacos配置中心，但在生产环境中是不可能一台的，肯定是集群。因为如果不是集群，那么如果一个炸了，注册到Nacos的服务集群将全部炸。所以我们必须要搞集群。
> 有没有这样的疑惑，之前我们写的配置文件，都是什么存的？其实，  默认Nacos使用嵌入式数据库（derby数据库），实现数据存储。但是如果启动多个默认配置下的Nacos节点，每个nacos都有自己独立呃嵌入式数据库，存放的数据不一致。为了解决这个问题，Nacos采用了集中式存储的方式来支持集群化部署，目前只支持MySQL存储。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621265870399-1621265870378.png)

以下步骤：window下配置  ->   Linux生产级别使用

`window下配置`

即不使用Nacos，而使用Mysql数据库代替。需要有数据库，第二将数据库配置进去。

1）创建数据库：在nacos ->  conf -> nacos-mysql.sql 执行生成。

2）nacos配置mysql数据库：在nacos -> conf ->  application.properties 追加：

```.properties
spring.datasource.platform=mysqldb.num=1db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=truedb.user=rootdb.password=3333
```

3）启动nacos，访问：[http://127.0.0.1:8848/nacos/index.html](http://127.0.0.1:8848/nacos/index.html "http://127.0.0.1:8848/nacos/index.html")   登录（nacos、nacos）后，发现原来的数据全部消失了。

加入一条配置文件后，查看数据库中`config_info`表，发现数据录入了我们配置的mysql数据库中了。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/2021/05/14/20210514003831616.png)

> 集群配置环境：我们在Linux上配置好Nacos后，需要在Nacos上配置Mysql,然后再进行集群配置，也就是都是修改Nacos的配置文件。

以下步骤：在Linux上搭建Nacos -> 将Mysql配置进Nacos ->  Nacos的集群环境的配置

`1）在Linux上搭建Nacos`

*   下载：[https://github.com/alibaba/nacos/releases/tag/1.1.4](https://github.com/alibaba/nacos/releases/tag/1.1.4 "https://github.com/alibaba/nacos/releases/tag/1.1.4")

选择下载第一个：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621262797635-1621262797617.png)

*   下载好后，移动到目标目录进行解压。

`2）将Mysql配置到 Nacos:`

*   创建数据库：nacos\_config   执行根目录下`conf > nacos-mysql.sql`

*   开始配置：将以下配置修改成你的，然后配置进Nacos根目录下的`conf > application.properties`  中`“追加”` :

    ```.properties
    #mysqlspring.datasource.platform=mysqldb.num=1db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=truedb.user=rootdb.password=3333
    ```

`3）Nacos的集群配置`

1.  说明：其它就只需要配置`cluster.conf`、`与startup.sh`

2.  cluster.conf:

    *   获取自身ip地址

    vim cluster.conf

    ```纯文本
     ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621266415018-1621266415011.png "")
     ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621266660035-1621266660029.png "")
    ```

3.  编辑启动文件 `startup.sh`
    `4.启动：`

    *   加入以下内容：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621300298394-1621300298383.png)

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621300182532-1621300182509.png)

    ```纯文本
    bash ./startup.sh  -p 3333 bash ./startup.sh  -p 4444 bash ./startup.sh  -p 5555#查看启动个数，在根目录下ps -ef|grep nacos|grep -v grep|wc -l
    ```

4）nginx的配置到集群系统

```纯文本
nginx的安装：在Linux上：
```

1.  下载：[http://nginx.org/en/download.html](http://nginx.org/en/download.html "http://nginx.org/en/download.html")

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621328734355-1621328734335.png)

2.  安装环境：
    **Ubuntu:**
    CentOS:

    ```纯文本
    apt-get install gccapt-get install libpcre3 libpcre3-devapt-get install zlib1g zlib1g-dev# Ubuntu14.04的仓库中没有发现openssl-dev，由下面openssl和libssl-dev替代#apt-get install openssl openssl-devsudo apt-get install openssl sudo apt-get install libssl-dev
    ```

    ```纯文本
    yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
    ```

3.  安装
    需要说明一下，我们一共需要执行三个命令，执行位置是根目录,  我们安装分别是：
    解压后，将目录修改为别的目录，然后再创建一个目录nginx-1.20.0作为我们安装的目录。

    ```纯文本
    ＃指定安装目录./configure --prefix=/usr/local/nginx/nginx-1.20.0#安装makemake install
    ```

4.  启动
    进行安装目录，即/usr/local/nginx/nginx-1.20.0下的sbin/下，执行：
    \#测试命令：
    显示以下，则代表成功：

END
`纯文本
	./nginx＃nginx的关闭：./nginx -s stop./nginx -s quit
	`

````纯文本
```纯文本
./nginx -t
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621329666772-1621329666762.png "")
````

5）测试

如果上面已经按步骤启动Nacos，nginx.则可以直接进行以下测试：

访问nginx：[http://127.0.0.1:8888/nacos/#/login](http://127.0.0.1:8888/nacos/#/login "http://127.0.0.1:8888/nacos/#/login")

发现能可以进行nacos界面，登录进去，指向的是mysql.即实现了：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621265870399-1621265870378.png)

## Alibaba Sentinel

> 是什么？
> 随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621339276434-1621339276425.png)

> 官方中文文档

### Sentinel环境的搭建：

以下步骤： 下载 -> 移动 -> 启动 -> 访问测试  -> 服务监控测试

`1）下载 `

[https://github.com/alibaba/Sentinel/releases/tag/1.7.0](https://github.com/alibaba/Sentinel/releases/tag/1.7.0 "https://github.com/alibaba/Sentinel/releases/tag/1.7.0")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621338353064-1621338353059.png)

`2）移动`

`3）启动`

8080端口不能被占用。

```纯文本
java -jar XXX.jar
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621338573260-1621338573253.png)

`4）访问`

[http://127.0.0.1:8080](http://127.0.0.1:8080 "http://127.0.0.1:8080")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621338634276-1621338634272.png)

### 流控规则

> 我们需要创建一个服务，即8401，它测试进了8848,它注册到了nacos注册中心中，同时被8848被Sentinal监控。

以下步骤： 流控测试准备 ->   QPS模式流控测试 ->  线程数模式流控 ->   关联流控 ->  预热 Warm up 流控  ->  排队等待

开始：

#### 1)  流控测试准备

创建模块：cloudalibaba-sentinel-service8401

改pom:

```xml
    <dependencies>        <!--springcloud alibaba nacos-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--springcloud alibaba sentinel-datasource-nacos 后续做持久化用到-->        <dependency>            <groupId>com.alibaba.csp</groupId>            <artifactId>sentinel-datasource-nacos</artifactId>        </dependency>        <!--springcloud alibaba sentinel-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-openfeign</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>    </dependencies>
```

写yml

```yaml
server:  port: 8401spring:  application:    name: cloudalibaba-sentinel-service  cloud:    nacos:      discovery:        # Nacos服务注册中心地址        server-addr: localhost:8848    sentinel:      transport:        # 配置Sentinel dashboard地址        dashboard: localhost:8080        # 默认8719端口，假如被占用会自动从8719开始一次+1扫描，直至找到被占用的端口。        port: 8719management:  endpoints:    web:      exposure:        include: "*"
```

主启动类：

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class SentinelMainApp8401 {    public static void main(String[] args) {        SpringApplication.run(SentinelMainApp8401.class,args);    }}
```

业务类：

```java
package com.atguigu.springcloud.controller;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestControllerpublic class FlowLimitController {    @GetMapping("/testA")    public String testA(){        return "-------testA";    }    @GetMapping("/testB")    public String testB(){        return "--------testB";    }}
```

可能存在一个启动失败问题：[logs/csp/sentinel-record.log.2021-05-18.0.lck](https://www.cnblogs.com/zjazn/p/14783446.html "logs/csp/sentinel-record.log.2021-05-18.0.lck")

测试

*   关于nacos

经过上面，现在的nacos是依赖mysql数据库存储数据且配置了多端口启动。

所以我们在保证mysql对应数据库存在下，与nacos的集群端口

在本次测试时，不需要nacos集群，我们只需要使用之前的单机模式即可。即

[http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/ "http://127.0.0.1:8848/nacos/")

*   关于Sentinel

正常启动即可

*   访问：[http://127.0.0.1:8401/testB](http://127.0.0.1:8401/testB "http://127.0.0.1:8401/testB")

Sentinel显示如下，则代表成功！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621499472511-1621499472489.png)

#### 2 )  QPS模式流控测试

下面是对`/testA`进行流控，即当在1秒时，不能超过1次请求。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621500217862-1621500217843.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621500137717-1621500137696.png)

否则，默认如下：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621500338684-1621500338683.png)

#### 3 )线程数模式流控

修改`/testB`  ,延长请求处理时间。

```java
    @GetMapping("/testB")    public String testB(){        try{            TimeUnit.MILLISECONDS.sleep(3000);        }catch (Exception e) {            System.out.println(e.getMessage());        }        return "--------testB";    }
```

设置线程数流控模式

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621501040344-1621501040317.png)

添加到流控列表

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621501085282-1621501085279.png)

测试：使用不同浏览器测试, 访问/testB ,同时去请求/testA，发现访问/testA直接失败！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621501835007-1621501834985.png)

#### 4) 关联流控

当`/testB`QPS不符合时，即1秒，单机发送超过一个请求时，会导致`/testA` 不可用。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621503332728-1621503332699.png)

测试：使用`postman` 工具去请求`/textB`,  我们再访问`/testA`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621504409920-1621504409915-UTOOLS-CLIPBOARD-1621504285138.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621504524679-1621504524677-UTOOLS-CLIPBOARD-1621504496445.png)

与此同时，我们去访问  [http://127.0.0.1:8401/testA](http://127.0.0.1:8401/testA "http://127.0.0.1:8401/testA") ，发现无法访问，被限流了。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621504596065-1621504596045.png)

#### 5) 预热 Warm up 流控

默认3秒（冷加载因子），下面：5秒内单机阈值由（10/3）到10进行过渡， 如果中途超过，则会快速失败。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621510226149-1621510226141-UTOOLS-CLIPBOARD-1621510039365.png)

#### 6) 排队等待

请求都能满足，但需要排队，而多少处理一个请求，由如下配置决定。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621511927468-1621511927462-UTOOLS-CLIPBOARD-1621511862826.png)

修改`/testB`  :

```java
    @GetMapping("/testB")    public String testB(){        log.info(new Date().toString());        return "--------testB";    }
```

用postman 线程发送 `/testB` 请求，在控制台发现： 一秒只收到了一个请求。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621512340378-1621512340376.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621512120083-1621512120076.png)

### 服务熔断

#### RT

> RT模式下，当1秒内超过5个线程，且这些线程1秒打进来的请求它们的平均处理时间超过预定的平均处理时，断路器将打开，未来1秒后关闭。

为/testB 加入服务熔断RT，如下：RT代表请求平均请求时间，当一秒内请求的线程数超过5个，且平均请求时间超过500ms时，触发服务熔断。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621516508436-1621516508416.png)

测试：使用JMeter,将10个线程固定打入/testB上，线程这点超过5，并且，我们在/testB设置请求时间为>=1000ms ,超过我们设置的500ms，可以预定将会熔断。

```java
    @GetMapping("/testB")    public String testB(){        try{            TimeUnit.MILLISECONDS.sleep(1000);        }catch (Exception e) {            System.out.println(e.getMessage());        }        log.info("*************testB");        return "--------testB";    }
```

JMeter :

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621518599072-1621518599055.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621518621516-1621518621513.png)

结果：/testB一直处于熔断状态。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621518713669-1621518713667.png)

#### 异常比例

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621561731940-1621561731893.png)

> 当线程数超过5，且请求失败率大于0.2时，当进行服务熔断。

以下步骤：修改测试的API方法 ->  使用jmeter进行测试  ->  测试  -> 结果

修改测试的controller项：

```java
    @GetMapping("/testB")    public String testB(){        log.info("*************testB测试异常比例");        int i = 1/0;        return "--------testB";    }
```

测试：基于上面的服务降级配置，我们用jmeter进行测试。请求的线程数为10，大于5，但每个线程持续以1秒一次发送。可以预想，将会进行服务熔断。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621561896011-1621561895991.png)

结果： 测试进行时，我们访问测试的/testB，会被“flow limiing” 。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621562473624-1621562473620.png)

停止后，访问直接报错。测试成功！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621562550986-1621562550982.png)

#### 异常数

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621562972085-1621562972077.png)

> 当在默认1分钟内，异常数超过5个，就会进入70s的时间窗口期，时间窗口期结束后，断路器才关闭。

测试：

```java
    @GetMapping("/testB")    public String testB(){        log.info("*************testB测试异常比例");        int i = 1/0;        return "--------testB";    }
```

访问：[http://127.0.0.1:8401/testB](http://127.0.0.1:8401/testB "http://127.0.0.1:8401/testB")

刷新5次，都会报错，这时已经超过我们指定的异常数，此时已进入了时间窗口期，当我们第六次刷新时就会看到是报错的。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621563265547-1621563265524.png)

### 热点规则

#### 标准热点规则

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621569470840-1621569470833.png)

> 被＠SentinelResource标记，且value值与API的索引为0的参数的值相同时（键名可不同），`总记`，1秒内系统最多处理5个这样的请求，超过将进入2秒的时间窗口中（统计窗口时长）。

api方法：

在这里我们在@SentinelResource注解中加入blockHandler = "del\_testHotKey"，来使用我们自定义的兜底的方法del\_testHotKey。

```java
    @GetMapping("/testHotKeyabcA")    @SentinelResource(value = "testHotKeyabcA",blockHandler = "del_testHotKey")    public String testHotKey(@RequestParam(value = "p1", required = false) String p1,                             @RequestParam(value = "p2", required = false) String p2) {        return "----testHotKey";    }    public String del_testHotKey(String p1, String p2, BlockException e) {        return "这次不用默认的兜底提示Blocked by Sentinel(flow limiting)，自定义提示：del_testHotKeyo(╥﹏╥)o...";    }
```

测试：

访问：[http://127.0.0.1:8401/testHotKeyabcA?p1=2](http://127.0.0.1:8401/testHotKeyabcA?p1=2 "http://127.0.0.1:8401/testHotKeyabcA?p1=2")

不停地刷新窗口，让其超过单机阈值，当超过后，全部的满足的请求将执行del\_testHotKey。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621569969570-1621569969555.png)

#### 例外热点规则

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621571960735-1621571960680.png)

> 就是在标准热点规则下，当存在索引为0的参数且相同参数请求的QPS超过1时，当进入窗口时长，如果想有例外，比如参数值为6的，它可以指定其它的阈值，我们则进行参数例外项配置。上面是配置参数值为6时，它的限流阈值是200而不是1。

测试：

分别请求：

[http://127.0.0.1:8401/testHotKeyabcA?p1=5](http://127.0.0.1:8401/testHotKeyabcA?p1=5 "http://127.0.0.1:8401/testHotKeyabcA?p1=5")

[http://127.0.0.1:8401/testHotKeyabcA?p1=6](http://127.0.0.1:8401/testHotKeyabcA?p1=6 "http://127.0.0.1:8401/testHotKeyabcA?p1=6")  （例外项）

发现p1＝5的，一下子就超过了阈值，而p1＝6的我们不停地刷新，而没有超过我们设置的限流阈值200！

### 系统规则

> 这个设置是比较危险的，用的相对较少。它是API容器的入口规则。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621572860789-1621572860774.png)

上面是设置了入口QPS，即不管你走哪个API，总的QPS是不能超过设定的阈值的。

测试：

使用jmeter，让它1秒请求一次/testA这个API，来占满入口QPS，我们再去访问/testB,发现，直接：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621573220903-1621573220895.png)

### blockHandler与fallback

> bolockHandler:  是自定义的界面，如果不自定义，就会显示Sentinel默认的 `Blocked by Sendtinel (flow limiting)`
> fallback:  当我们执行的API有错误时 ，就会跳到我们   @SentinelResource 注解 fallback属性指定的方法：

#### blockHandler

@SentinelResource(value = "fallback",blockHandler = "myblockHandler")  ,界面指定了blockHandler是本类的 myblockHandler 方法。

```java
package com.atguigu.springcloud.controller;import com.alibaba.csp.sentinel.annotation.SentinelResource;import com.alibaba.csp.sentinel.slots.block.BlockException;import com.atguigu.springcloud.entities.CommonResult;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestControllerpublic class CircuitBreakerController {    @GetMapping("/fallback")    @SentinelResource(value = "fallback",blockHandler = "myblockHandler")    public CommonResult fallback() {        return new CommonResult(200,"ok",null);    }    public CommonResult myblockHandler(BlockException e) {        return new CommonResult(400,"float limit to blockHeadler!",null);    } }
```

#### fallback

@SentinelResource(value = "fallback" fallback = "myfallback") 指定了，但本api执行出错时，交由 本类的myfallback 方法处理。

```java
package com.atguigu.springcloud.controller;import com.alibaba.csp.sentinel.annotation.SentinelResource;import com.alibaba.csp.sentinel.slots.block.BlockException;import com.atguigu.springcloud.entities.CommonResult;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RestController;@RestControllerpublic class CircuitBreakerController {    @GetMapping("/fallback")    @SentinelResource(value = "fallback" fallback = "myfallback")    public CommonResult fallback() {        int i = 1/0;        return new CommonResult(200,"ok",null);    }    public CommonResult myfallback() {        return new CommonResult(444,"error to fallback!",null);    } }
```

当我访问/fallback  api接口时将执行myfallback 方法，即显示：

{"code":444,"message":"error to fallback!","data":null}

### 与业务解构的BlockHandler方法

> 也就是将之前与api同级的block方法，抽取出来作为一个类，然后再在@SentinelResource 注解中去声明使用这个类中的指定block方法。

1.  创建与业务解构的BlockHandler方法：

创建一个与controller同级的handler 目录，再创建一个名为CutomerBlockHandler的类。

```java
package com.atguigu.springcloud.handler;import com.alibaba.csp.sentinel.slots.block.BlockException;import com.atguigu.springcloud.entities.CommonResult;public class CutomerBlockHandler {    public static CommonResult blockHandlerA(BlockException e) {        return new CommonResult(4444,"与业务解构ockHandlerA的方法");    }    public static CommonResult blockHandlerB(BlockException e) {        return new CommonResult(4444,"与业务解构ockHandlerB的方法");    }}
```

1.  使用 与业务解构的BlockHandler方法

在CircuitBreakerController类中加入一个api：

其中 blockHandlerClass 指定的就是 CutomerBlockHandler，而blockHandler就是blockHandlerClass声明的类所在的方法。

```java
    //测试与代码解构的Block方法    @GetMapping("/globalBlockHandler")    @SentinelResource(value = "globalBlockHandler",            blockHandlerClass = CutomerBlockHandler.class,            blockHandler = "blockHandlerA")    public CommonResult globalBlockHandler() {        return new CommonResult(200,"ok~");    }
```

### sentinel整合ribbon+openFeign+fallback

#### Ribbon 系列

> 我们在整合时，需要先创建两个服务模块（9003、9004），与一个消费模块（8484），在linux下，如果使用1024以下的端口则需要root权限，所以因为我当前使用的不是root权限，所以我们不写84，而改为8484。下面是Sentinel整合ribbon+fallback

以下步骤：创建生产者9003、9004  ->  消费者8484 -> 基本测试  -> fallback与blockhandler

`创建生产者9003、9004`

创建模块：cloudalibaba-provider-payment9003、cloudalibaba-provider-payment9004

改pom:

```xml
<dependencies>        <!--spring cloud alibaba nacos-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--web/actuator这两个一般一起使用，写在一起-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--监控-->        <dependency>            <groupId>                org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>    </dependencies>
```

写yml:

```yaml
server:  port: 9003spring:  application:    name: nacos-payment-provider  cloud:    nacos:      discovery:        # Nacos服务注册中心地址        server-addr: localhost:8848    sentinel:      transport:        # 配置Sentinel dashboard地址        dashboard: localhost:8080        # 默认8719端口，假如被占用会自动从8719开始一次+1扫描，直至找到被占用的端口。        port: 8719management:  endpoints:    web:      exposure:        include: "*"
```

主启动类：

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class PaymentMain9003 {    public static void main(String[] args) {        SpringApplication.run(PaymentMain9003.class,args);    }}
```

业务类：

```java
package com.atguigu.springcloud.controller;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RestController;import java.util.HashMap;@RestControllerpublic class PaymentController {    @Value("${server.port}")    private String serverPort;    public static HashMap<Long, Payment> hashMap = new HashMap<>();    static {        hashMap.put(1L,new Payment(1L,"大聪明"));        hashMap.put(2L,new Payment(2L,"猪猪"));        hashMap.put(3L,new Payment(3L,"小猪猪"));    }    //模拟查表    @GetMapping(value = "/paymentSQL/{id}")    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {        Payment payment = hashMap.get(id);        return new CommonResult<>(200, "from mysql, serverPORT: "+serverPort, payment);    }}
```

`创建消费者8484`

创建模块：cloudalibaba-consumer-nacos-order8484

改pom :

```xml
<dependencies>        <!--spring cloud alibaba nacos-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>        </dependency>        <!--引入我们自定义的公共api jar包-->        <dependency>            <groupId>com.atguigu</groupId>            <artifactId>cloud-common</artifactId>            <version>1.0-SNAPSHOT</version>        </dependency>        <!--SpringCloud alibaba sentinel-datasource-nacos：后续做持久化用到-->        <dependency>            <groupId>com.alibaba.csp</groupId>            <artifactId>sentinel-datasource-nacos</artifactId>        </dependency>        <!--SpringCloud alibaba Sentinel-->        <dependency>            <groupId>com.alibaba.cloud</groupId>            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>        </dependency>        <!--openFeign-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-openfeign</artifactId>        </dependency>        <!--web/actuator这两个一般一起使用，写在一起-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-web</artifactId>        </dependency>        <!--监控-->        <dependency>            <groupId>                org.springframework.boot</groupId>            <artifactId>spring-boot-starter-actuator</artifactId>        </dependency>        <!--热部署-->        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-devtools</artifactId>            <scope>runtime</scope>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>            <artifactId>lombok</artifactId>            <optional>true</optional>        </dependency>        <dependency>            <groupId>org.springframework.boot</groupId>            <artifactId>spring-boot-starter-test</artifactId>            <scope>test</scope>        </dependency>    </dependencies>
```

写yml:

```yaml
server:  port: 8484spring:  application:    name: nacos-order-consumer  cloud:    nacos:      discovery:        server-addr: localhost:8848    sentinel:      transport:        dashboard: localhost:8080 # 配置Sentinel dashboard地址        port: 8719 #sentinel后台端口# 消费者将要去访问的微服务名册：方便controller的@value获取server-url:  nacos-user-service: http://nacos-payment-provider
```

主启动：

```java
package com.atguigu.springcloud;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;@SpringBootApplication@EnableDiscoveryClientpublic class OrderNacosMain8484 {    public static void main(String[] args) {        SpringApplication.run(OrderNacosMain8484.class,args);    }}
```

业务类：

config:

```java
package com.atguigu.springcloud.config;import org.springframework.cloud.client.loadbalancer.LoadBalanced;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.web.client.RestTemplate;@Configurationpublic class ApplicationContextConfig {    @Bean    @LoadBalanced    public RestTemplate getRestTemplate() {        return new RestTemplate();    }}
```

controller:

```java
package com.atguigu.springcloud.controller;import com.alibaba.csp.sentinel.annotation.SentinelResource;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class CircuitBreakerController {    @Value("${server-url.nacos-user-service}")    private String SERVER_URL;    @Resource    private RestTemplate restTemplate;    @RequestMapping("/consumer/fallback/{id}")    @SentinelResource(value = "fallback")    public CommonResult<Payment> fallback(@PathVariable("id") Long id) {        CommonResult result = restTemplate.getForObject(SERVER_URL + "/paymentSQL/" + id, CommonResult.class, id);        if(id==4){            throw new IllegalArgumentException("IllegalArgumentException，非法参数异常....");        }else if(result.getData() == null) {            throw new NullPointerException("NullPointerException，该ID没有对应记录，空指针异常");        }        return result;    }}
```

`测试`

访问：[http://localhost:8484/consumer/fallback/1](http://localhost:8484/consumer/fallback/1 "http://localhost:8484/consumer/fallback/1")

发现：在9003、9004之间进行轮询

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621654270629-1621654270595.png)

`faallback与blockhandler`

说明：fallback作用只是，当我们的java程序异常时的友好提示或说界面，不至于直接报Error Page。而如果我们违背了Sentinel的规则，但会出现blockhandler的提示或说界面。那就出现一个问题了，如果既违背了Sentinel的规则且java程序出错。那么是fallback还是blockHandler呢？结果当然是blockHandler啦，下面我们就来验证一下！

以下步骤：修改controller（加入blockHandler与fallback） ->  加入Sentinel规则 -> 测试 ->   exceptionToIgnor的说明

开始：

1）修改controller， 也就是在@SentinelResource 加入blockHandler与fallback ，与对应的方法。

```java
package com.atguigu.springcloud.controller;import com.alibaba.csp.sentinel.annotation.SentinelResource;import com.alibaba.csp.sentinel.slots.block.BlockException;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import lombok.extern.slf4j.Slf4j;import org.springframework.beans.factory.annotation.Value;import org.springframework.web.bind.annotation.PathVariable;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RestController;import org.springframework.web.client.RestTemplate;import javax.annotation.Resource;@RestController@Slf4jpublic class CircuitBreakerController {    @Value("${server-url.nacos-user-service}")    private String SERVER_URL;    @Resource    private RestTemplate restTemplate;    @RequestMapping("/consumer/fallback/{id}")    //@SentinelResource(value = "fallback")    @SentinelResource(value = "fallback",            blockHandler = "blockHandler",fallback = "handlerFallback")    public CommonResult<Payment> fallback(@PathVariable("id") Long id) {        CommonResult result = restTemplate.getForObject(SERVER_URL + "/paymentSQL/" + id, CommonResult.class, id);        if(id==4){            throw new IllegalArgumentException("IllegalArgumentException，非法参数异常....");        }else if(result.getData() == null) {            throw new NullPointerException("NullPointerException，该ID没有对应记录，空指针异常");        }        return result;    }    //blockHandler:只负责sentinel控制台的违规配置    public CommonResult blockHandler(@PathVariable Long id, BlockException e){        Payment payment = new Payment(id, "null");        return new CommonResult<>(445, "blockHandler-sentinel限流，无此流水：blockException " + e.getMessage());    }    //handlerFallback：兜底处理异常方法    public CommonResult handlerFallback(Long id, Throwable e){        Payment payment = new Payment(id, "null");        //可以把异常带过来        return new CommonResult<>(444, "兜底异常handlerFallback，exception内容 "+e.getMessage(), payment);    }}
```

2） 加入规则，流控

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621656960345-1621656960335.png)

3）测试

访问：[http://localhost:8484/consumer/fallback/4](http://localhost:8484/consumer/fallback/4 "http://localhost:8484/consumer/fallback/4") ，参数是4时，程序会抛出异常的

发现：初次访问时会到我们设置的fallback方法中的提示或说界面，触发流控后，是blockHandler中方法的提示或说界面。

`exceptionToIgnor的说明`

我们想要某些异常正常的显示出来，好排错。不让我们自定义的异常处理方法处理。也就是不用exceptionToIgnor属性取消掉 fallback 属性的功能。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621661833278-1621661833275.png)

#### openFeign 系列

> 想要通过OpenFeign来实现服务的调用，首先是需要加入Open信赖的，且确保生产者与消费者都已经注册了注册中心了。这时我们只需要知道服务名即可开始使用OpenFeign来调用服务了。

以下步骤： 加入OpenFeign的信赖 ->  配置yml激活OpenFeign ->  在主启动类加入注解开启OpenFeign ->  开始使用 -> 测试

` 加入OpenFeign依赖`

确保有：

```xml
        <!--openFeign-->        <dependency>            <groupId>org.springframework.cloud</groupId>            <artifactId>spring-cloud-starter-openfeign</artifactId>        </dependency>
```

`开始yml配置激活OpenFeign`

feign.sentinel.enabled: true

```yaml
server:  port: 8484spring:  application:    name: nacos-order-consumer  cloud:    nacos:      discovery:        server-addr: localhost:8848    sentinel:      transport:        dashboard: localhost:8080 # 配置Sentinel dashboard地址        port: 8719 #sentinel后台端口# 消费者将要去访问的微服务名册：方便controller的@value获取server-url:  nacos-user-service: http://nacos-payment-provider  # 激活Sentinel对Feign的支持feign:  sentinel:    enabled: true
```

`在主启动类加入注解开启OpenFeign`

@EnableFeignClients

```java
@SpringBootApplication@EnableDiscoveryClient@EnableFeignClients //OpenFeignpublic class OrderNacosMain8484 {    public static void main(String[] args) {        SpringApplication.run(OrderNacosMain8484.class,args);    }}
```

`开始使用`

使用消费者8484使用openFeign调用9003、9004。

需要创建对应的service接口来对应9003（9004）对应的api与服务降级后的Fallback即他们的实现类。 也就是创建与调用端相同的api接口与fallback实现类。

service接口（对应生产端的api）：

```java
package com.atguigu.springcloud.service;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.service.impl.PaymentFallbackService;import org.springframework.cloud.openfeign.FeignClient;import org.springframework.stereotype.Component;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PathVariable;@Component@FeignClient(value = "nacos-payment-provider",fallback = PaymentFallbackService.class)public interface PaymentService {    @GetMapping(value = "/paymentSQL/{id}") //去找nacos-payment-consumer服务中的相应接口    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id);}
```

实现类(当无法调用成功api时的fallback方法)：

```java
package com.atguigu.springcloud.service.impl;import com.atguigu.springcloud.entities.CommonResult;import com.atguigu.springcloud.entities.Payment;import com.atguigu.springcloud.service.PaymentService;import org.springframework.stereotype.Component;@Componentpublic class PaymentFallbackService implements PaymentService {    //如果nacos-payment-consumer服务中的相应接口出事了，我来兜底    @Override    public CommonResult<Payment> paymentSQL(Long id) {        return new CommonResult(444,"服务降级返回---PaymentFallbackService", new Payment(id, "errorSerial...."));    }}
```

controller（在controller中调用）

```java
    //===========openFeign    @Resource    private PaymentService paymentService;    @GetMapping(value = "/consumer/paymentSQL/{id}")    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id){        return paymentService.paymentSQL(id);    }
```

`测试`

访问：[http://127.0.0.1:8484/consumer/paymentSQL/1](http://127.0.0.1:8484/consumer/paymentSQL/1 "http://127.0.0.1:8484/consumer/paymentSQL/1")

发现与轮询的方式调用生产者9003、9004 ，成功！

当我们关闭9003、9004时，无法调用服务，则会执行service接口的实现类对应的方法。

### 配置的持久化

如果我们要对一个服务的进行Sentinel的配置进行持久化，比如流控等。我们要做的是写yml的配置来读取nacos上我们的配置好的Sentinel的规则。

以下步骤：加入依赖支持 -> 写yml规则文件在nacos上查找的配置 ->  在nacos上配置规则 -> 测试

`加入依赖支持`

确保存在

```xml
<!--springcloud alibaba sentinel-datasource-nacos 后续做持久化用到--><dependency>    <groupId>com.alibaba.csp</groupId>    <artifactId>sentinel-datasource-nacos</artifactId></dependency>
```

`写yml规则文件在nacos上查找的配置`

与之前我们写的是不同的。

```yaml
server:  port: 8401spring:  application:    name: cloudalibaba-sentinel-service  cloud:    nacos:      discovery:        # Nacos服务注册中心地址        server-addr: localhost:8848    sentinel:      transport:        # 配置Sentinel dashboard地址        dashboard: localhost:8080        # 默认8719端口，假如被占用会自动从8719开始一次+1扫描，直至找到被占用的端口。        port: 8719      #添加Nacos数据源配置      datasource:        ds1: # 数据源1          nacos:            server-addr: localhost:8848            dataId: ${spring.application.name}            groupId: DEFAULT_GROUP            data-type: json            rule-type: flow # 流控规则management:  endpoints:    web:      exposure:        include: "*"
```

加入的是：

```yaml
  #添加Nacos数据源配置  datasource:    ds1: # 数据源1      nacos:        server-addr: localhost:8848        dataId: ${spring.application.name}        groupId: DEFAULT_GROUP        data-type: json        rule-type: flow # 流控规则
```

`在nacos上配置规则 `

如果在nacos上写配置？

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621676484499-1621676484467.png)

我们nacos上的配置，它是对资源名`/testA`进行流控：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621676609523-1621676609518.png)

```json
[    {        "resource": "/testA",        "limitApp": "default",        "grade": 1,        "count": 1,        "strategy": 0,        "controlBehavior": 0,        "clusterMode":  false    }]
```

`测试`

访问：[http://127.0.0.1:8401/testA](http://127.0.0.1:8401/testA "http://127.0.0.1:8401/testA")

发现：在流控上有我们配置的持久化Sentinel配置。它与上面配置在nacos的json配置对应：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621676775208-1621676775206.png)

且能进行使用。

## seata 解决分布式问题

> Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。
> 能解决分布式数据一致性的问题。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621760896156-1621760896133.png)

#### Seata 一个典型的分布式控制事务的流程：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621761076420-1621761076408.png)

> 下载：[https://github.com/seata/seata](https://github.com/seata/seata "https://github.com/seata/seata")

> 官网：[https://seata.io/zh-cn/docs/overview/what-is-seata.html](https://seata.io/zh-cn/docs/overview/what-is-seata.html "https://seata.io/zh-cn/docs/overview/what-is-seata.html")

### 1) Seata 环境的搭建

**以下步骤 ：****下载****后，移动到你认为合适的位置，然后修改两个配置文件与创建数据库**

开始：

`修改 `conf > file.conf :

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621759159442-1621759159423.png)

`修改` bin >  registry.conf :

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621759978130-1621759978125.png)

`创建 "seata" 数据库`，

sql来源：conf >  db.store.sql 、版本源码查看(这里是v1.00)

最终seata数据库下的表：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621762360985-1621762360983.png)

启动：

先启动naocs (8848), 然后再去bin目录下启动seata 。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621762235731-1621762235726.png)

### 2） 使用案例

> 整体的，我们需要搭建+配置好Seata环境后。我们需要创建业务要使用的数据 库，即seata\_account、seata\_order、seata\_storage三个数据库。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621762422761-1621762422757.png)

> 而业务内容是，我们调用下订单会调用2001（订单处理模块）的API进行处理，而2001服务调用2002（库存处理模块）进行减库存，再调用2003（余额表）支付。加入seata后，不管哪里出现了异常，数据都会进行回滚。如果没有Seata，在支付超时了，但最终还是扣了钱，但订单状态没改变。等等问题。

以下步骤 ：数据库的准备 ->  业务代码说明

开始：

`数据库的准备`

1.  订单数据库准备：seata\_order

    ```sql
    CREATE TABLE t_order(    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',    `count` INT(11) DEFAULT NULL COMMENT '数量',    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',    `status` INT(1) DEFAULT NULL COMMENT '订单状态：0：创建中; 1：已完结') ENGINE=INNODB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;SELECT * FROM t_order;
    ```

2.  库存数据准备：seata\_storage

    ```sql
    CREATE TABLE t_storage(    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',   `total` INT(11) DEFAULT NULL COMMENT '总库存',    `used` INT(11) DEFAULT NULL COMMENT '已用库存',    `residue` INT(11) DEFAULT NULL COMMENT '剩余库存') ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;INSERT INTO seata_storage.t_storage(`id`,`product_id`,`total`,`used`,`residue`)VALUES('1','1','100','0','100');SELECT * FROM t_storage;
    ```

3.  账户业务数据库准备：seata\_account

`业务代码说明  `
业务代码：请前往githu   2001、2002、2003模块
Seata在业务中的使用是1+1+2,分别是注解配置ymll配置，而resource下的file.conf与registry.conf
`测试`
分别模块在有无
下测试，数据 是否回滚，最终结果 是，当我们不加入时，模拟失败，数据不回滚，加入后一旦失败，数据全部回滚。
``sql
	CREATE TABLE t_account(    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',    `total` DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',    `used` DECIMAL(10,0) DEFAULT NULL COMMENT '已用余额',    `residue` DECIMAL(10,0) DEFAULT '0' COMMENT '剩余可用额度') ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;INSERT INTO seata_account.t_account(`id`,`user_id`,`total`,`used`,`residue`) VALUES('1','1','1000','0','1000')SELECT * FROM t_account;
	``

````纯文本
```纯文本
4.  以上三个数据库的共同表`undo_log`，sql ：<a href="https://github.com/seata/seata/tree/develop/script/client/at/db">查看（v1.00）</a> （小于1.00 ，conf  > db_undo_log.sql）
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1621764081994-1621764081991.png "")
```java
@GlobalTransactional(name = "fsp-create-order",rollbackFor = Exception.class)
```
````
