# Spring

## 目录

#### \[\_1\_] ioc管理Bean

*   创建对象

    1、创建一个多实例的Bean

    ```java
    <!--默认是单实例，加上属性 scope="prototype" 是多实例的，即上一下返回的对象与下一次返回的对象不相同-->
        <bean name="user" class="com.scl.spring._2_ioc管理bean._1_xml方式._1_创建对象._2_创建多实例对象.User"
            scope="prototype">
            <property name="name" value="小庄"></property>
            <property name="age" value="22"></property>
        </bean>
    ```

    2、测试

    ```java
    package com.scl.spring._2_ioc管理bean._1_xml方式._1_创建对象._2_创建多实例对象;

    import org.springframework.context.ApplicationContext;
    import org.springframework.context.support.ClassPathXmlApplicationContext;

    public class main {
        public static void main(String[] args) {
            ApplicationContext context = new ClassPathXmlApplicationContext("com/scl/spring/_2_ioc管理bean/_1_xml方式/_1_创建对象/_2_创建多实例对象/_Bean作用域_单多实例.xml");
            User user1 = context.getBean("user", User.class);
            User user2 = context.getBean("user", User.class);
            System.out.println(user1 == user2);
        }
    }

    ```

    > \+如何自定义FactoryBean？

    答：继承FactoryBean  并重写getObject方法，这个方法的返回值类型，就是Bean的类型。

    > \+ Bean的生命周期是？

    当我们在Bean中配置init-method 与destroy-method 来指定该类哪个方法作为init、destroy方法。

    有五步：

    ```bash
    第一步 执行构造方法创建Bean实例
    第二步执行set方法设置属性值
    第三步 执行初始化方法
    com.scl.spring._2_ioc管理bean._1_xml方式._1_创建对象._Bean的生命周期.Life@7791a895
    第四步 获取到了Bean实例
    第五步 执行销毁方法
    ```

    如何我们实现BeanPostProcessor 并重写里面的两个方法，再配置这个类的Bean的话，就有七步。分别是初始化方法执行前、后。

*   注入属性

    构造方法时：

    ```xml
    <bean id="book" class="com.scl.spring._2_ioc管理bean._1_xml方式._2_注入属性._2_构造方法注入.Book">
            <constructor-arg name="name" value="《西游记》"></constructor-arg>
            <constructor-arg name="author" value="吴承恩"></constructor-arg>
        </bean>
    ```

    set方法时：

    ```xml
    <bean id="book" class="com.scl.spring._2_ioc管理bean._1_xml方式._2_注入属性._1_set方法注入.Book">
            <property name="name" value="西游记" ></property>
            <property name="author" value="吴承恩" ></property>
    </bean>
    ```

    > 如何自动注入属性？

    在Bean标签上，加authWire属性，可以设置根据名称或类型进行注入。

    > 如何注入空值？

    在property或constructor-arg下加一个子标签 \<null />

    ```java
    <bean id="book" class="com.scl.spring._2_ioc管理bean._1_xml方式._2_注入属性._1_set方法注入.Book">
            <property name="name" value="西游记" ></property>
            <property name="author" >
                <null />
            </property>
    </bean>
    ```

*   使用注解的方式：

    在类上加以下任意一个注解：

    ```java
    /**
     * （1）@Component
     * （2）@Service
     * （3）@Controller
     * （4）@Repository
     * * 上面四个注解功能是一样的，都可以用来创建bean实例
     */
     而属性注入：
     引用：@AutoWired
     基本类型：@Value
    ```

    然后，在xml中配置扫描的注解：

    ```xml
    <context:component-scan base-package="com.scl.spring._2_ioc管理bean._2_注解方式._1_创建对象._1_原始方式" />
    ```

#### \[\_2\_] AOP切面编程

*   开始

    加某个类某个方法的运算进行切面操作，配置扫描（xml/配置类），扫描到以下类，然后被增强类方法执行\~

    在xml 开启

    ```xml
     <!--开启Aspect生成代理对象-->
        <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
    ```

    配置增强

    ```java
    package com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式;

    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.*;
    import org.springframework.stereotype.Component;

    //增强

    @Component
    @Aspect //生成代理对象
    public class UserProxy {

        @Before(value = "execution(* com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式.User.add(..))")
        public void before() {//前置通知
            System.out.println("前置通知 before....");
        }

        @AfterReturning(value = "execution(* com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式.User.add(..))")
        public void afterReturning() {//后置通知
            System.out.println("后置通知 afterReturning....");
        }
        @After(value = "execution(* com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式.User.add(..))")
        public void after() {//后置通知
            System.out.println("最终通知 after....");
        }
        @AfterThrowing(value = "execution(* com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式.User.add(..))",throwing = "e")
        public void afterThrowing(JoinPoint joinPoint, Exception e) {//异常通知
            System.out.println("异常通知 afterThrowing...."+e.getMessage());
        }
        @Around(value = "execution(* com.scl.spring._3_aop切面编程._1_注解的方式._1_普通注解方式.User.add(..))")
        public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
            System.out.println("环绕之前........."); //被增强的方法执行
            proceedingJoinPoint.proceed();
            System.out.println("环绕之后.........");
        }




    }

    ```

#### - 如何完全注解

*   完全注解？

    使用一个类替换配置文件

    ```java
    @Configuration//作为配置类，替代xml配置文件
    //设置扫描路径
    @ComponentScan(basePackages = {"com.scl.spring._2_ioc管理bean._2_注解方式._1_创建对象._2_完全注解"})
    public class SpringConfig {
    }
    ```

    测试时使用：

    &#x20;ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);

#### + JdbcTemplate

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16520875496061652087549457.png)

#### + 事务

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16520877606191652087760531.png)

#### - 去看代码

因为代码比笔记还好，所以这里就把未写完的笔记放在了[这里](https://github.com/18476305640/fileBox/raw/master/杂项/Spring.zip "这里"), 然后需要看的话，可以直接去看代码仓库。

[跳转>>](https://github.com/18476305640/ssm/tree/master/src/com/scl/spring "跳转>>")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16515592218781651559221719.png)
