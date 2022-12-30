# 整合Mybates

## 目录

### \[\_1\_] 依赖分析

*   整合所需的Jar分析

    。Junit测试jar(4.12版本）
    。 Mybatis的jar (3.4.5)
    。Spring相关jar(spring-context、spring-test、spring-jdbc、spring-tx、spring-aop、aspectjweaver)
    。Mybatis/Spring整合包jar(mybatis-spring-xx.jar)
    。Mysql数据库驱动jar
    。Druid数据库连接池的jar

创建一个maven webapp 项目，编辑以下文件

*   pom.xml

    ```xml
        <!--junit-->
        <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>4.12</version>
          <scope>test</scope>
        </dependency>
        <!--mybatis-->
        <dependency>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis</artifactId>
          <version>3.4.5</version>
        </dependency>
        <!--spring相关-->
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-context</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-test</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-jdbc</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-tx</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-aop</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <dependency>
          <groupId>org.aspectj</groupId>
          <artifactId>aspectjweaver</artifactId>
          <version>1.8.9</version>
        </dependency>
        <!--mybatis与spring的整合包-->
        <dependency>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis-spring</artifactId>
          <version>2.0.3</version>
        </dependency>
        <!--数据库驱动jar-->
        <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <version>5.1.46</version>
        </dependency>
        <!--druid连接池-->
        <dependency>
          <groupId>com.alibaba</groupId>
          <artifactId>druid</artifactId>
          <version>1.1.21</version>
        </dependency>
    ```

### \[\_2\_] 三个整合目标

当前

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16519093304791651909330376.png)

*   整合目标

    *   数据库连接池以及事务管理都交给Spring容器来完成

        在`resources` 目录下创建

        jdbc.properties：

        ```.properties
        jdbc.driver=com.mysql.jdbc.Driver
        jdbc.url=jdbc:mysql://localhost:3306/user_db
        jdbc.username=root
        jdbc.password=3333
        ```

        applicationContext.xml：

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <beans xmlns="http://www.springframework.org/schema/beans"
               xmlns:context="http://www.springframework.org/schema/context"
               xmlns:tx="http://www.springframework.org/schema/tx"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
               http://www.springframework.org/schema/beans
               http://www.springframework.org/schema/beans/spring-beans.xsd
               http://www.springframework.org/schema/context
               http://www.springframework.org/schema/context/spring-context.xsd
               http://www.springframework.org/schema/tx
               http://www.springframework.org/schema/tx/spring-tx.xsd
        ">


            <!--引入外部资源文件-->
            <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
            <!--第三方jar中的bean定义在xml中-->
            <!--第三方jar中的bean定义在xml中-->
            <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
                <property name="driverClassName" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </bean>


            <!--事务管理-->
            <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
                <property name="dataSource" ref="dataSource"/>
            </bean>

            <!--事务管理注解驱动-->
            <tx:annotation-driven transaction-manager="transactionManager"/>

            <!--SqlSessionFactory对象应该放到Spring容器中作为单例对象管理
                原来mybaits中sqlSessionFactory的构建是需要素材的：SqlMapConfig.xml中的内容
            -->
            <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
                <!--别名映射扫描-->
                <property name="typeAliasesPackage" value="com.zhuangjie.ssm.pojo"/>
                <!--数据源dataSource-->
                <property name="dataSource" ref="dataSource"/>

            </bean>


        </beans>
        ```

    *   SqlSessionFactory对象应该放到Spring容器中作为单例对象管理

        编辑 applicationContext.xml： 追加

        ```xml
            <!--SqlSessionFactory对象应该放到Spring容器中作为单例对象管理
                原来mybaits中sqlSessionFactory的构建是需要素材的：SqlMapConfig.xml中的内容
            -->
            <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
                <!--别名映射扫描-->
                <property name="typeAliasesPackage" value="com.zhuangjie.ssm.pojo"/>
                <!--数据源dataSource-->
                <property name="dataSource" ref="dataSource"/>
            </bean>
        ```

    *   Mapper动态代理对象交给Spring管理，我们从Spring容器中直接获得Mapper的代理对象

        编辑 applicationContext.xml： 追加

        ```xml
           <!--Mapper动态代理对象交给Spring管理，我们从Spring容器中直接获得Mapper的代理对象-->
            <!--扫描mapper接口，生成代理对象，生成的代理对象会存储在ioc容器中-->
            <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
                <!--mapper接口包路径配置-->
                <property name="basePackage" value="com.zhuangjie.ssm.mapper"/>
                <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
            </bean>
        ```

\<!--Mapper动态代理对象交给Spring管理，我们从Spring容器中直接获得Mapper的代理对象-->

\<!--扫描mapper接口，生成代理对象，生成的代理对象会存储在ioc容器中-->

\<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">

\<!--mapper接口包路径配置-->

\<property name="basePackage" value="com.zhuangjie.ssm.mapper"/>

\<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>

\</bean>

\<!--Mapper动态代理对象交给Spring管理，我们从Spring容器中直接获得Mapper的代理对象-->

\<!--扫描mapper接口，生成代理对象，生成的代理对象会存储在ioc容器中-->

\<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">

\<!--mapper接口包路径配置-->

\<property name="basePackage" value="com.zhuangjie.ssm.mapper"/>

\<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>

\</bean>

### \[\_3\_] 加入代码

1.  在指定位置加入项目代码：

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16519139076011651913907454.png)

2.  编辑 applicationContext.xml： 追加

    ```xml
        <!--包扫描-->
        <context:component-scan base-package="com.zhuangjie.ssm" />
    ```

### -测试

在test/java 目录下创建一个类：

```java
import com.zhuangjie.ssm.pojo.Book;
import com.zhuangjie.ssm.service.impl.BookServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:application*.xml"}) //指定bean的配置文件
public class mybaties_test{
    @Autowired
    public BookServiceImpl bookService;
    @Test
    public  void testMybaties() throws Exception{
        List<Book> books = bookService.queryAllBook();
        for (int i = 0; i < books.size(); i++) {
            Book book = books.get(i);
            System.out.println(book);
        }

    }
}

```

### \[\_4\_] 在web.xml 中加载

web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">


    <display-name>Archetype Created Web Application</display-name>

    <!--启动spring+mybaties-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:applicationContext.xml</param-value>
    </context-param>
    <!--spring框架启动-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

</web-app>
```

### +Mybaties学习
