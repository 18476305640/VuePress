# RabbitMQ消息中间件

## 目录

教学视频：[https://www.bilibili.com/video/BV1K44y177Eb](https://www.bilibili.com/video/BV1K44y177Eb "https://www.bilibili.com/video/BV1K44y177Eb")

### - 什么是消息中间件

消息中间件基于队列模型实现异步/同步传输数据

作用/为什么要使用MQ：可以实现支撑高并发、异步解耦、流量削峰、降低耦合度。

### - 传统HTTP请求存在的缺点

1、大量请求到达服务器时，会导致服务器端处理请求堆积。所以一般都会在nginx入口实现限流，整合服务保护框架。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533568329981653356832958.png)

2、http请求处理业务逻辑如果比较耗时的情况下，容易造成客户端一直等待，阻塞等待过程中会导致客户端超时发生重试策略，有可能会引发幂等性问题。所以最好不要处理比较耗时的业务逻辑，耗时的业务逻辑应该进行异步操作，比如交给多线程或者是mq处理。多线程会消耗CPU，导致上下文切换，适合小项目。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533576048051653357604746.png)

```markdown
客户端发送请求到达服务器端，服务器端实现会员注册业务逻辑，
1.insertMember() --插入会员数据  1s
2.sendSms()----发送登陆短信提醒 3s
3.sendCoupons()----发送新人优惠券  3s
总共响应需要6s时间，可能会导致客户端阻塞6s时间，对用户体验
不是很好。
```

### - MQ应用场景

1.  异步发送短信

2.  异步发送新人优惠券

3.  处理一些比较耗时的操作

### - 多线程与MQ方式实现异步？

客户端 安卓/IOS：多线程

服务器端：php/java：最好使用mq实现异步

### - Mq消息中间件名词

Producer 生产者：投递消息到MQ服务器端；

Consumer  消费者：从MQ服务器端获取消息处理业务逻辑；

Broker   MQ服务器端

Topic 主题：分类业务逻辑发送短信主题、发送优惠券主题

Queue 存放消息模型 队列 先进先出 后进后出原则 数组/链表

Message 生产者投递消息报文：json

### - 主流mq  & 区别对比

*   ActiveMQ

    优点：单机吞吐量万级，时效性 ms 级，可用性高，基于主从架构实现高可用性，消息可靠性较 低的概率丢失数据 缺点:官方社区现在对 ActiveMQ 5.x 维护越来越少，高吞吐量场景较少使用。 尚硅谷官网视频: [http://www.gulixueyuan.com/course/322](http://www.gulixueyuan.com/course/322 "http://www.gulixueyuan.com/course/322")

*   Kafka

    大数据的杀手锏，谈到大数据领域内的消息传输，则绕不开 Kafka，这款为大数据而生的消息中间件，
    以其百万级 TPS 的吞吐量名声大噪，迅速成为大数据领域的宠儿，在数据采集、传输、存储的过程中发挥着举足轻重的作用。目前已经被 LinkedIn，Uber, Twitter, Netflix 等大公司所采纳。
    优点: 性能卓越，单机写入 TPS 约在百万条/秒，最大的优点，就是吞吐量高。时效性 ms 级可用性非
    常高，kafka 是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用,消费者采用 Pull 方式获取消息, 消息有序, 通过控制能够保证所有消息被消费且仅被消费一次;有优秀的第三方
    Kafka Web 管理界面 Kafka-Manager；在日志领域比较成熟，被多家公司和多个开源项目使用；功能支持：
    功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及日志采集被大规模使用
    缺点：

    Kafka 单机超过 64 个队列/分区，Load 会发生明显的飙高现象，队列越多，load 越高，发送消
    息响应时间变长，使用短轮询方式，实时性取决于轮询间隔时间，消费失败不支持重试；支持消息顺序，但是一台代理宕机后，就会产生消息乱序，社区更新较慢；

*   RocketMQ

    RocketMQ 出自阿里巴巴的开源产品，用 Java 语言实现，在设计时参考了 Kafka，并做出了自己的一
    些改进。被阿里巴巴广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，binglog 分发等场景。
    优点:

    单机吞吐量十万级,可用性非常高，分布式架构,消息可以做到 0 丢失,MQ 功能较为完善，还是分
    布式的，扩展性好,支持 10 亿级别的消息堆积，不会因为堆积导致性能下降,源码是 java 我们可以自己阅读源码，定制自己公司的 MQ
    缺点：

    支持的客户端语言不多，目前是 java 及 c++，其中 c++不成熟；社区活跃度一般,没有在 MQ
    核心中去实现 JMS 等接口,有些系统要迁移需要修改大量代码

*   RabbitMQ

    2007 年发布，是一个在 AMQP(高级消息队列协议)基础上完成的，可复用的企业消息系统，是当前最 主流的消息中间件之一。 优点:由于 erlang 语言的高并发特性，性能较好；吞吐量到万级，MQ 功能比较完备,健壮、稳定、易 用、跨平台、支持多种语言 如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP 等，支持 AJAX 文档齐全；开源提供的管理界面非常棒，用起来很好用,社区活跃度高；更新频率相当高 [https://www.rabbitmq.com/news.html](https://www.rabbitmq.com/news.html "https://www.rabbitmq.com/news.html") 缺点：商业版需要收费,学习成本较高

|       |                                 |                                       |               |                                                      |
| ----- | ------------------------------- | ------------------------------------- | ------------- | ---------------------------------------------------- |
| 特性    | ActiveMQ                        | RabbitMQ                              | RocketMQ      | kafka                                                |
| 开发语言  | java                            | erlang                                | java          | scala                                                |
| 单机吞吐量 | 万级                              | 万级                                    | 10万级          | 10万级                                                 |
| 时效性   | ms级                             | us级                                   | ms级           | ms级以内                                                |
| 可用性   | 高（主从架构）                         | 高（主从架构）                               | 非常高（分布式架构）    | 非常高（分布式架构）                                           |
| 功能特性  | 成熟的产品，在很多公司得到应用；有较多的文档；各种协议支持较好 | 基于erlang开发，所以并发能力很强，性能极其好，延时很低管理界面较丰富 | MQ功能比较完备，扩展性佳 | 只支持主要的MQ功能，像一些消息查询，消息回溯等功能没有提供，毕竟是为大数据准备的，在大数据领域应用广。 |

&#x20;

### - MQ 的选择

1、Kafka Kafka 主要特点是基于 Pull 的模式来处理消息消费，追求高吞吐量，一开始的目的就是用于日志收集 和传输，适合产生大量数据的互联网服务的数据收集业务。大型公司建议可以选用，如果有日志采集功能， 肯定是首选 kafka 了。尚硅谷官网 kafka 视频连接 [http://www.gulixueyuan.com/course/330/tasks](http://www.gulixueyuan.com/course/330/tasks "http://www.gulixueyuan.com/course/330/tasks")&#x20;

2、RocketMQ 天生为金融互联网领域而生，对于可靠性要求很高的场景，尤其是电商里面的订单扣款，以及业务削 峰，在大量交易涌入时，后端可能无法及时处理的情况。RoketMQ 在稳定性上可能更值得信赖，这些业务 场景在阿里双 11 已经经历了多次考验，如果你的业务有上述并发场景，建议可以选择 RocketMQ。&#x20;

3、RabbitMQ 结合 erlang 语言本身的并发优势，性能好时效性微秒级，社区活跃度也比较高，管理界面用起来十分 方便，如果你的数据量没有那么大，中小型公司优先选择功能比较完备的 RabbitMQ。

### - 基于多线程实现简单的mq

*   pom.xml依赖

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.zhuangjie</groupId>
        <artifactId>my01</artifactId>
        <version>1.0-SNAPSHOT</version>

        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <source>8</source>
                        <target>8</target>
                    </configuration>
                </plugin>
            </plugins>
        </build>
        <dependencies>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>1.2.62</version>
            </dependency>

            <dependency>
                <groupId>io.netty</groupId>
                <artifactId>netty-all</artifactId>
                <version>4.0.23.Final</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>1.2.62</version>
            </dependency>
            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-lang3</artifactId>
                <version>3.11</version>
            </dependency>


            <dependency>
                <groupId>com.rabbitmq</groupId>
                <artifactId>amqp-client</artifactId>
                <version>3.6.5</version>
            </dependency>

        </dependencies>

    </project>
    ```

*   mq01.java

    ```java
    package com.zhuangjie.mq;

    import com.alibaba.fastjson.JSONObject;

    import java.util.concurrent.LinkedBlockingDeque;

    public class mq01 {
        private static LinkedBlockingDeque<JSONObject> broker = new LinkedBlockingDeque<>();

        public static void main(String[] args) {

            new Thread(new Runnable() {
                @Override
                public void run() {
                    while (true) {
                        JSONObject data = new JSONObject();
                        data.put("msg","hello");
                        broker.offer(data);
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            },"producer").start();


            new Thread(new Runnable() {
                @Override
                public void run() {
                    while (true) {
                        JSONObject block = broker.poll();
                        if (block != null) {
                            System.out.println("取出数据："+block.toJSONString());
                        }
                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }

                    }
                }
            },"consumer").start();

        }
    }


    ```

### - MQ常见解决方案（面试问题）

**1、MQ如何避免消息堆积**

消费者集群、消息者批量获取消息

**2、MQ如何避免消费者重复消费（幂等问题）**

消费者要做幂等性处理。而幂等性处理最简单高效的处理是插表时根据唯一性字段判断，如订单号等。

**3、MQ如何保证消息不丢失？**

消息确认机制
持久化
消息ack

**4、MQ如何保证消息顺序一致性**

绑定同一个消费者和队列

**5、生产者如何获取消费结果**

异步返回一个全局id,前端使用ajax定时主动查询

### - 为什么要用MQ

*   1.流量消峰

    举个例子，如果订单系统最多能处理一万次订单，这个处理能力应付正常时段的下单时绰绰有余，正
    常时段我们下单一秒后就能返回结果。但是在高峰期，如果有两万次下单操作系统是处理不了的，只能限制订单超过一万后不允许用户下单。使用消息队列做缓冲，我们可以取消这个限制，把一秒内下的订单分散成一段时间来处理，这时有些用户可能在下单十几秒后才能收到下单成功的操作，但是比不能下单的体验要好。

*   2.应用解耦

    以电商应用为例，应用中有订单系统、库存系统、物流系统、支付系统。用户创建订单后，如果耦合
    调用库存系统、物流系统、支付系统，任何一个子系统出了故障，都会造成下单操作异常。当转变成基于消息队列的方式后，系统间调用的问题会减少很多，比如物流系统因为发生故障，需要几分钟来修复。在这几分钟的时间里，物流系统要处理的内存被缓存在消息队列中，用户的下单操作可以正常完成。当物流系统恢复后，继续处理订单信息即可，中单用户感受不到物流系统的故障，提升系统的可用性。

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536493450021653649344172.png)

*   3.异步处理

    有些服务间调用是异步的，例如 A 调用 B，B 需要花费很长时间执行，但是 A 需要知道 B 什么时候可
    以执行完，以前一般有两种方式，A 过一段时间去调用 B 的查询 api 查询。或者 A 提供一个 callback api，B 执行完之后调用 api 通知 A 服务。这两种方式都不是很优雅，使用消息总线，可以很方便解决这个问题，A 调用 B 服务后，只需要监听 B 处理完成的消息，当 B 处理完成后，会发送一条消息给 MQ，MQ 会将此消息转发给 A 服务。这样 A 服务既不用循环调用 B 的查询 api，也不用提供 callback api。同样 B 服务也不用做这些操作。A 服务还能及时的得到异步处理成功的消息。

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536493962841653649396211.png)

### - RabbitMQ的工作原理

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536512870051653651286914.png)

**Broker：** 接收和分发消息的应用，RabbitMQ Server 就是 Message Broker
**Virtual host：** 出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似
于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个 vhost，每个用户在自己的 vhost 创建 exchange／queue 等
**Connection：** publisher／consumer 和 broker 之间的 TCP 连接**Channel**：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP ，Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的
Connection 极大减少了操作系统建立 TCP connection 的开销
**Exchange：** message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到 queue 中去。常用的类型有：direct (point-to-point), topic (publish-subscribe) and fanout (multicast)
**Queue：** 消息最终被送到这里等待 consumer 取走
**Binding：** exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，Binding 信息被保
存到 exchange 中的查询表中，用于 message 的分发依据

### \[\_1\_] RabbitMQ环境安装

*   linux安装

    1、安装包

    ```yaml
    【erlang下载地址】：https://hub.fastgit.org/rabbitmq/erlang-rpm/releases
           el6：CentOS 6.x 的下载
           el7：CentOS 7.x 的下载
           el8：CentOS 8.x 的下载
     #可以直接使用命令安装  【socat下载地址】：http://www.rpmfind.net/linux/rpm2html/search.php?query=socat(x86-64)
    【rabbitmq下载地址】：https://github.com/rabbitmq/rabbitmq-server/releases
    ```

    2、安装：

    基本环境：

    ```bash
    #C++依赖
    yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz
    #安装 socat
    yum install socat -y
    #安装erlang
    rpm -ivh  *.rpm
    #安装rabbitmq
    rpm -ivh  *.rpm

    ```

    添加开机启动 RabbitMQ 服务
    chkconfig rabbitmq-server on
    启动服务
    /sbin/service rabbitmq-server start&#x20;
    查看服务状态
    /sbin/service rabbitmq-server status

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536522428701653652242800.png)

    停止服务(选择执行) /sbin/service rabbitmq-server stop&#x20;

    开启 web 管理插件 rabbitmq-plugins enable rabbitmq\_management&#x20;

    用默认账号密码(guest)访问地址 [http://47.115.185.244:15672/出现权限问题](http://47.115.185.244:15672/出现权限问题 "http://47.115.185.244:15672/出现权限问题")

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536522810081653652280347.png)

    .添加一个新的用户 创建账号 rabbitmqctl add\_user admin 123&#x20;

    设置用户角色 rabbitmqctl set\_user\_tags admin administrator&#x20;

    设置用户权限&#x20;

    \#rabbitmqctl  set\_permissions \[-p \<vhostpath>] \<user> \<conf> \<write> \<read>

    rabbitmqctl set\_permissions -p "/" admin ".*" ".*" ".\*"

    \#用户 user\_admin 具有/vhost1 这个 virtual host 中所有资源的配置、写、读权限

    当前用户和角色 rabbitmqctl list\_users

    再次利用 admin 用户登录

*   windows安装

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533860169891653386016865.png)

    *   1、安装：RabbitMQ 它依赖于Erlang,

        需要先安装Erlang：[https://www.rabbitmq.com/install-windows.html](https://www.rabbitmq.com/install-windows.html "https://www.rabbitmq.com/install-windows.html")

    *   2、配置erlang环境变量信息

        新增环境变量ERLANG\_HOME=erlang的安装地址

        将%ERLANG\_HOME%\bin加入到path中

    *   3、安装RabbitMQ，

        下载地址：[http://www.rabbitmq.com/download.html](http://www.rabbitmq.com/download.html "http://www.rabbitmq.com/download.html")

    *   4、启动RabbitMQ服务

        请保证设备名称为英文

        1\)进入RabbitMQ安装目录的sbin目录下，cmd执行 (先不要关掉)：

        ```bash
        rabbitmq-plugins enable rabbitmq_management

        rabbitmqctl start_app
        ```

        在win右下角菜单中选择点击 RabbitMQ Service - start

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/1620184338340-1620184338339.png)

        访问地址，查看是否成功： [http://localhost:15672/](http://localhost:15672/ "http://localhost:15672/")

        ```markdown
        15672端口: rabbitmq Web控制台管理台 http协议
         5672端口：rabbitmq 内部通信的一个端口号
        25672端口：rabbitmq 集群通信端口号

        ```

    *   \#5、在Web管理界面进行配置

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533877947031653387794665.png)

        *   **RabbitMQ**常见名词

            /Virtual Hosts---分类

            /队列 存放我们消息

            Exchange 分派我们消息在那个队列存放起来 类似于nginx

        1、创建一个VirtualHosts

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533871244551653387124401.png)

        2、创建一个用户来关联

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533873143661653387314329.png)

        3、让用户可以操作该VirtualHosts

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533874340321653387433992.png)

        4、给VirtualHosts创建一个Queues

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533875027431653387502704.png)

        综上得到以下，可用于连接操作。

        用户:**zhuangjie**/**3333**

        VirtualHosts：**/myvh**

        Queues：**mqu**

    *   \#6、程序测试

        pom.xml

        ```xml
                <!--rabbit依赖-->
                <dependency>
                    <groupId>com.rabbitmq</groupId>
                    <artifactId>amqp-client</artifactId>
                    <version>3.6.5</version>
                </dependency>
        ```

        RabbitMQConnection.java：负责创建连接对象

        ```java
        package com.zhuangjie.mq.config;

        import com.rabbitmq.client.Connection;
        import com.rabbitmq.client.ConnectionFactory;

        import java.io.IOException;
        import java.util.concurrent.TimeoutException;

        public class RabbitMQConnection {

            /**
             * 获取连接
             *
             * @return
             */
            public static Connection getConnection() throws IOException, TimeoutException {
                // 1.创建连接
                ConnectionFactory connectionFactory = new ConnectionFactory();
                // 2.设置连接地址
                connectionFactory.setHost("127.0.0.1");
                // 3.设置端口号:
                connectionFactory.setPort(5672);
                // 4.设置账号和密码
                connectionFactory.setUsername("zhuangjie");
                connectionFactory.setPassword("3333");
                // 5.设置VirtualHost
                connectionFactory.setVirtualHost("/myvh");
                return connectionFactory.newConnection();
            }
        }

        ```

        Test.java：生产者与消费者，先对push方法进行单元测试，再对poll单元测试

        ```java
            //队列
            private static final String QUEUE = "mqu";

            @Test
            public void push() throws Exception {

                Connection connection = null;
                Channel channel = null;
                try {
                    //建立新连接
                    connection = RabbitMQConnection.getConnection();
                    //创建会话通道,生产者和mq服务所有通信都在channel中完成
                    channel = connection.createChannel();
                    //声明队列String queue, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments
                    //参数名称:
                    // 1.队列名称
                    // 2.是否持久化mq重启后队列还在
                    // 3.是否独占连接,队列只允许在该连接中访问,如果连接关闭后就会自动删除了,设置true可用于临时队列的创建
                    // 4.自动删除,队列不在使用时就自动删除,如果将此参数和exclusive参数设置为true时,就可以实现临时队列
                    // 5.参数,可以设置一个队列的扩展参数,比如可以设置队列存活时间
                    channel.queueDeclare(QUEUE, true, false, false, null);
                    // 发送消息String exchange, String routingKey, boolean mandatory, BasicProperties props, byte[] body
                    //参数名称:
                    // 1.交换机,如果不指定将会使用mq默认交换机
                    // 2.路由key,交换机根据路由key来将消息转发至指定的队列,如果使用默认的交换机,routingKey设置为队列名称
                    // 3.消息属性
                    // 4.消息内容
                    String message = "HelloWorld2";
                    channel.basicPublish("", QUEUE, null, message.getBytes());
                    System.out.println("Send to mq: " + message);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    try {
                        if (channel != null) {
                            channel.close();
                        }
                        if (connection != null) {
                            connection.close();
                        }
                    } catch (IOException  e) {
                        e.printStackTrace();
                    }
                }
            }

            @Test
            public void poll() throws Exception{
                Connection connection = RabbitMQConnection.getConnection();
                Channel channel = connection.createChannel();
                DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                    @Override
                    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                        String msg = new String(body, "UTF-8");

                        System.out.println("消费者获取消息:" + msg);
                    }
                };
                channel.basicConsume(QUEUE, true, defaultConsumer);

            }
        ```

### \[\_2\_] 如何确保消息不丢失

*   RabbitMQConnection.java：用于获取连接源

    ```java
    package com.zhuangjie.mq.config;

    import com.rabbitmq.client.Connection;
    import com.rabbitmq.client.ConnectionFactory;

    import java.io.IOException;
    import java.util.concurrent.TimeoutException;

    public class RabbitMQConnection {

        /**
         * 获取连接
         *
         * @return
         */
        public static Connection getConnection() throws IOException, TimeoutException {
            // 1.创建连接
            ConnectionFactory connectionFactory = new ConnectionFactory();
            // 2.设置连接地址
            connectionFactory.setHost("127.0.0.1");
            // 3.设置端口号:
            connectionFactory.setPort(5672);
            // 4.设置账号和密码
            connectionFactory.setUsername("zhuangjie");
            connectionFactory.setPassword("3333");
            // 5.设置VirtualHost
            connectionFactory.setVirtualHost("/myvh");
            return connectionFactory.newConnection();
        }
    }

    ```

*   RabbitMQ：开启持久化，关闭自动删除

    1、RabbitMQ默认创建是持久化的

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534428020481653442801816.png)

    durable是否持久化 durable为持久化、 Transient 不持久化

    2、autoDelete 是否自动删除，当最后一个消费者断开连接之后队列是否自动被删除，可以通过RabbitMQ Management，查看某个队列的消费者数量，当consumers = 0时队列就会自动删除

*   生产端：Ack消息确认 同步或者异步的形式）

    ```java
    private static final String QUEUE_NAME = "myqu";

        //1）确认机制
        @Test
        public void vpush() throws IOException, TimeoutException, InterruptedException {
            Connection connection = null;
            Channel channel = null;
            try {
                connection = RabbitMQConnection.getConnection();
                channel = connection.createChannel();
                channel.confirmSelect();
                String msg = "天天开心联盟~";
                channel.basicPublish("", QUEUE_NAME, null, msg.getBytes());
                boolean result = channel.waitForConfirms();
                if (result) {
                    System.out.println("消息投递成功！");
                } else {
                    System.out.println("消息投递失败！");
                }
            }  catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                channel.close();
                connection.close();
            }


        }

        //事务演示
        @Test
        public void vpoll() throws Exception{
            Connection connection = null;
            Channel channel = null;
            try {
                connection = RabbitMQConnection.getConnection();
                channel = connection.createChannel();
                channel.txSelect();
                String msg = "tx天天开心联盟~";
                channel.basicPublish("", QUEUE_NAME, null, msg.getBytes());
                int i = 1/0;
                channel.txCommit();
            } catch (IOException e) {
                channel.txRollback();
            }finally {
                channel.close();
                connection.close();
            }


        }
    ```

*   消费端：Ack消息应答。必须要将消息消费成功之后，才会将该消息从mq服务器端中移除

    在kafka中的情况下：
    不管是消费成功还是消费失败，该消息都不会立即从mq服务器端移除, 而是使用offset

    ```java
        //消费者不能是 @Test修饰的类
        public static void main(String[] args)throws Exception {
            //【1】
            Connection connection = RabbitMQConnection.getConnection();
            //【2】
            Channel channel = connection.createChannel();
            //【4】
            DefaultConsumer callback = new DefaultConsumer(channel) {
                @Override
                public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                    String msg = new String(body, "UTF-8");

                    System.out.println("消费者获取消息:" + msg);
                    //false 仅确认当前消息已消费
                    channel.basicAck(envelope.getDeliveryTag(), false);
                }
            };
            //【3】
            // false 队列不会自动刪除
            channel.basicConsume(QUEUE_NAME, false, callback);
        }
    ```

### \[\_3\_] 五种消息模型

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536504879011653650487825.png)

pom.xml：依赖

```java
        <!--rabbit依赖-->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>3.6.5</version>
        </dependency>
```

*   **simple模式（即最简单的收发模式）**- HelloWorld

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537071157711653707115095.png)

    1.消息产生消息，将消息放入队列

    2.消息的消费者(consumer) 监听 消息队列,如果队列中有消息,就消费掉,消息被拿走后,自动从队列中删除(隐患 消息可能没有被消费者正确处理,已经从队列中消失了,造成消息的丢失，这里可以设置成手动的ack,但如果设置成手动ack，处理完后要及时发送ack消息给队列，否则会造成内存溢出)。\\

    *   RabbitMQConnection.java :　连接源工具类

        ```java
        package com.zhuangjie.mq.config;

        import com.rabbitmq.client.Connection;
        import com.rabbitmq.client.ConnectionFactory;

        import java.io.IOException;
        import java.util.concurrent.TimeoutException;

        public class RabbitMQConnection {

            /**
             * 获取连接
             *
             * @return
             */
            public static Connection getConnection() throws IOException, TimeoutException {
                // 1.创建连接
                ConnectionFactory connectionFactory = new ConnectionFactory();
                // 2.设置连接地址
                connectionFactory.setHost("127.0.0.1");
                // 3.设置端口号:
                connectionFactory.setPort(5672);
                // 4.设置账号和密码
                connectionFactory.setUsername("zhuangjie");
                connectionFactory.setPassword("3333");
                // 5.设置VirtualHost
                connectionFactory.setVirtualHost("/test_vh");
                return connectionFactory.newConnection();
            }
        }

        ```

    *   producer.java : 生产者

        ```java
        import com.rabbitmq.client.Channel;
        import com.rabbitmq.client.Connection;
        import com.rabbitmq.client.ConnectionFactory;
        import com.zhuangjie.mq.config.RabbitMQConnection;

        import java.io.IOException;
        import java.util.concurrent.TimeoutException;

        public class producer {
            private static String QUEUE_NAME = "test_queue";
            public static void main(String[] args) throws IOException, TimeoutException {
                    //从连接源工具类中获取获取连接
                    Connection connection = RabbitMQConnection.getConnection();
                    //从连接中获取获取信道
                    Channel channel = connection.createChannel();
                    //指定队列（因为没有exchange，所以routingKey参数，直接是队列名），发送信息
                    channel.basicPublish("",QUEUE_NAME,null,"Hello,test Consumer~".getBytes());
                    channel.close();
                    connection.close();
            }
        }

        ```

    *   consumer01.java：消费者

        ```java
        package com.zhuangjie.mq.mqtext.consumer;

        import com.rabbitmq.client.*;
        import com.zhuangjie.mq.config.RabbitMQConnection;

        import java.io.IOException;
        import java.util.concurrent.TimeoutException;

        public class consumer01 {
            private static String QUEUE_NAME = "test_queue";
            public static void main(String[] args) throws IOException, TimeoutException {
                //从连接源中获取连接
                Connection connection = RabbitMQConnection.getConnection();
                //从连接中获取信道
                Channel channel = connection.createChannel();
                System.out.println("Consumer01正在等待接收消息...");
                DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                    @Override
                    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                        System.out.println(new String(body,"UTF-8"));
                    }
                };
                //true是自动签收，指定队列，获取信息
                channel.basicConsume(QUEUE_NAME,true,defaultConsumer);
            }
        }

        ```

*   **work工作模式(资源的竞争)** -- 使用的是默认交换机（无名exchange）

    默认的传统队列是为均摊消费，存在不公平性；如果每个消费者速度不一样的情况下，均摊消费是不公平的，应该是能者多劳。

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534456623361653445662273.png)

    采用工作队列&#x20;

    在通道中只需要设置basicQos为1即可，表示MQ服务器每次只会给消费者推送1条消息必须手动ack确认之后才会继续发送。

    **示例：在简单模式下，再加一个消费者即可。在不指定exchange下（为""），走的是默认的无名      exchange 即"AMQP default" 的exchange，而" routing key" 填的是queue的名字。**

    *   不公平分发/消息的分发

        两个消费者在同一队列，是以轮询的方式消费消息的，我们可以通过设置channel.basicQos(<预取值>); 来改变消费数量。

        默认是以轮询的方式发送信息的消费者，不管你前面的有没有消费完成，我们通过设置basicQos 后，表示当前最多只能处理2条信息，如果超过了（可能该消费者处理的比较慢），就不要放消息了，给别的消息者。

        总之处理地快，接收消息快，处理地慢接收消息就慢。qos也可以表示为最多堆积的数量，满了就流向别的消费者。

        ```java
            //消费者不能是 @Test修饰的类
            public static void main(String[] args)throws Exception {
                //【1】
                Connection connection = RabbitMQConnection.getConnection();
                //【2】
                Channel channel = connection.createChannel();
                //【3】设置最多堆积的数量
                channel.basicQos(2);
                //【4】
                DefaultConsumer callback = new DefaultConsumer(channel) {
                    @Override
                    public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                        String msg = new String(body, "UTF-8");

                        System.out.println("消费者获取消息:" + msg);
                        //false 仅确认当前消息已消费
                        channel.basicAck(envelope.getDeliveryTag(), false);
                    }
                };
                //【3】
                // false 队列不会自动刪除
                channel.basicConsume(QUEUE_NAME, false, callback);
            }
        ```

    *   生产者  消息应答

        1、应答的方法说明

        ```java
        A.Channel.basicAck(用于肯定确认)
          RabbitMQ 已知道该消息并且成功的处理消息，可以将其丢弃了
        B.Channel.basicNack(用于否定确认)
        C.Channel.basicReject(用于否定确认)
          与 Channel.basicNack 相比少一个参数
          不处理该消息了直接拒绝，可以将其丢弃了
        ```

        2、我们在代码中这样写

        ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537227063501653722706297.png)

        3、multiple 参数说明： true 和 false 代表不同意思

        ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537221810121653722180960.png)

        *   4、消息自动重新入队说明

            如果消费者由于某些原因失去连接(其通道已关闭，连接已关闭或 TCP 连接丢失)，导致消息未发送 ACK 确认，RabbitMQ 会将该信道轮询得到的消息的未正常消费的消息进行重新入队。如果此时其他消费者可以处理，它将很快将其重新分发给另一个消费者。这样，即使某个消费者偶尔死亡，也可以确保不会丢失任何消息。

            （或说：该消费者当不能再获取信息，Mq等待消费者提交确认信息，如果此时该消费者挂了，会将该消费 者未确认的信息交给其它消费者消费。）

    *   队列与消息的持久化

        在生产者代码中：

        ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537251457621653725144809.png)

        在执行“队列持久化”的代码时，如果没有这个队列，会进行创建，如果有且我们没有对方法参数进行修改时会报错！需要先在rabbitmq web控制台中删掉，再执行代码让其自动创建。

        上面我们只是对队列进行了持久化，但这还是不行的，我们还需要对消息进行持久化。

    *   消息者 发布确认机制

        1、我们需要开始，消息持久化

        2、开启消息确认

        3、消息确认，**单个确认、批量确认、异步确认**

        单个确认与批量确认： ` channel.waitForConfirms();` 可以确认多个消息，所以单个确认与批量确认，确认代码是相同的。

        *   单次确认：同步等待确认，简单，但吞吐量非常有限。

            ```java
                private static String QUEUE_NAME = "test_queue";
                
                // 单次确认消费1000个消息，耗时：2033ms!
                public static void A() throws IOException, TimeoutException {
                    Connection connection = RabbitMQConnection.getConnection();
                    Channel channel = connection.createChannel();
                    try {

                        //创建消息队列，会创建当前连接上的VertualHosts中
                        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
                        //开启发布确认
                        channel.confirmSelect();
                        long begin = System.currentTimeMillis();
                        int sumCount = 1000;
                        for (int i = 0; i < sumCount; i++) {
                            String msg = i + "";
                            //MessageProperties.PERSISTENT_TEXT_PLAIN 开启发布的消息进行持久化
                            channel.basicPublish("", QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, msg.getBytes());
                            channel.waitForConfirms();
                        }
                        long end = System.currentTimeMillis();
                        System.out.println("单次确认消费" + sumCount + "个消息，耗时：" + (end - begin) + "ms!");
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    } finally {
                        channel.close();
                        connection.close();
                    }
                }
            ```

        *   批量确认：批量同步等待确认，简单，合理的吞吐量，一旦出现问题但很难推断出是那条
            消息出现了问题。

            ```java
                private static String QUEUE_NAME = "test_queue";
                
                // 单次确认消费1000个消息，耗时：2033ms!
                public static void B() throws IOException, TimeoutException {
                    Connection connection = RabbitMQConnection.getConnection();
                    Channel channel = connection.createChannel();
                    try {

                        //创建消息队列，会创建当前连接上的VertualHosts中
                        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
                        //开启发布确认
                        channel.confirmSelect();
                        long begin = System.currentTimeMillis();
                        //总发布消息数
                        int sumCount = 1000;
                        //批量确认消息大小
                        int batchSize = 100;
                        //未确认消息个数
                        int outstandingMessageCount = 0;
                        for (int i = 0; i < sumCount; i++) {
                            String msg = i + "";
                            //MessageProperties.PERSISTENT_TEXT_PLAIN 开启发布的消息进行持久化
                            channel.basicPublish("", QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, msg.getBytes());
                            outstandingMessageCount++;
                            if (outstandingMessageCount % batchSize == 0 || i == sumCount - 1) {
                                channel.waitForConfirms();
                                outstandingMessageCount = 0;
                            }
                        }
                        long end = System.currentTimeMillis();
                        System.out.println("批量确认消费" + sumCount + "个消息，耗时：" + (end - begin) + "ms!");
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    } finally {
                        channel.close();
                        connection.close();
                    }
                }
            ```

        *   异步确认：最佳性能和资源使用，在出现错误的情况下可以很好地控制，但是实现起来稍微难些

            ```java
                private static String QUEUE_NAME = "test_queue";
                
                // 异步确认
                public static void C() throws IOException, TimeoutException, InterruptedException {
                    Connection connection = RabbitMQConnection.getConnection();
                    Channel channel = connection.createChannel();

                    /**
                     * 线程安全有序的一个哈希表，适用于高并发的情况
                     * 1.轻松的将序号与消息进行关联
                     * 2.轻松批量删除条目 只要给到序列号
                     * 3.支持并发访问
                     */
                    ConcurrentSkipListMap<Long, String> outstandingConfirms = new
                            ConcurrentSkipListMap<>();
                    //创建消息队列，会创建当前连接上的VertualHosts中
                    channel.queueDeclare(QUEUE_NAME, true, false, false, null);
                    //开启发布确认
                    channel.confirmSelect();
                    /**
                     * 确认收到消息的一个回调
                     * 1.消息序列号
                     * 2.true 可以确认小于等于当前序列号的消息
                     * false 确认当前序列号消息
                     */
                    ConfirmCallback ackCallback = (sequenceNumber, multiple) -> {
                        if (multiple) {
                            //返回的是小于等于当前序列号的未确认消息 是一个 map
                            ConcurrentNavigableMap<Long, String> confirmed =
                                    outstandingConfirms.headMap(sequenceNumber, true);
                            //清除该部分未确认消息
                            confirmed.clear();
                        } else {
                            //只清除当前序列号的消息
                            outstandingConfirms.remove(sequenceNumber);
                        }

                    };
                    ConfirmCallback nackCallback = (sequenceNumber, multiple) -> {
                        String message = outstandingConfirms.get(sequenceNumber);
                        System.out.println("发布的消息" + message + "未被确认，序列号" + sequenceNumber);
                    };

                    channel.addConfirmListener(ackCallback, nackCallback);
                    long begin = System.currentTimeMillis();
                    //总发布消息数
                    int sumCount = 5;
                    for (int i = 0; i < sumCount; i++) {
                        String msg = "消息" + i;
                        //MessageProperties.PERSISTENT_TEXT_PLAIN 开启发布的消息进行持久化
                        channel.basicPublish("", QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, msg.getBytes());
                        outstandingConfirms.put(channel.getNextPublishSeqNo(), msg);
                    }
                    long end = System.currentTimeMillis();
                    System.out.println("异步发布确认消费" + sumCount + "个消息，耗时：" + (end - begin) + "ms!");

                }
            ```

        ```java
        import com.rabbitmq.client.*;
        import com.zhuangjie.mq.config.RabbitMQConnection;

        import java.io.IOException;
        import java.util.Scanner;
        import java.util.concurrent.ConcurrentNavigableMap;
        import java.util.concurrent.ConcurrentSkipListMap;
        import java.util.concurrent.TimeoutException;

        public class producer {

            //单次消费耗时  ：
            public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
        //        producer.A(); //单次确认消费1000个消息，耗时：2033ms!
        //        producer.B(); //批量确认消费1000个消息，耗时：220ms!
                producer.C(); //异步发布确认消费1000个消息，耗时：89ms!


            }
        }


        ```

*   **Fanout  发布订阅(共享资源)** - 需要加入交换机

    与简单模式和工作模式不同，\*\*Fanout  \*\*模式需要用到交换机，因为一条消息想被两个不同的队列的消费者消费，注意每个队列连接的消费者，不管有多少个，最终只能消费一次。

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534475677001653447567663.png)

    生产者发送一条消息，经过交换机转发到多个不同的队列（只要关联都会匹配上），每一个队列的只会被下面的消费者消费一次。

    *   示例：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534478503171653447850276.png)

        1、在web管理平台上，创建一个交换机

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534479754921653447975434.png)

        2、创建两个队列&#x20;

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534479060121653447905967.png)

        3、写生产者与消费者

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534480293261653448029277.png)

        *   \_4\_交换机.java

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.Channel;
            import com.rabbitmq.client.Connection;
            import com.zhuangjie.mq.config.RabbitMQConnection;
            import org.junit.Test;

            public class _4_交换机 {
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "my_exchange";

                @Test
                public  void producer() throws Exception{
                    //  创建Connection
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建Channel
                    Channel channel = connection.createChannel();
                    // 通道关联交换机
                    channel.exchangeDeclare(EXCHANGE_NAME, "fanout", true);
                    String msg = "交换机与两个队列！";
                    channel.basicPublish(EXCHANGE_NAME, "", null, msg.getBytes());
                    channel.close();
                    connection.close();
                }

            }

            ```

        *   \_4\_交换机的短信消费端.java

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.sun.corba.se.impl.orbutil.threadpool.TimeoutException;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;

            public class _4_交换机的短信消费端 {
                /**
                 * 定义短信队列
                 */
                private static final String QUEUE_NAME = "my_email_sms";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "my_exchange";

                public static void main(String[] args) throws Exception {
                    System.out.println("短信消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("短信消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }

            ```

        *   \_4\_交换机的邮件消费端.java

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;
            import java.util.concurrent.TimeoutException;

            public class _4_交换机的邮件消费端 {
                /**
                 * 定义邮件队列
                 */
                private static final String QUEUE_NAME = "my_email_queue";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "my_exchange";

                public static void main(String[] args) throws IOException, TimeoutException {
                    System.out.println("邮件消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("邮件消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }

            ```

        *   4、测试

            启动两个消费端，然后启动交换机的消费者方法

            然后发现两个消费端都收到了消息

            ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534481573671653448157328.png)

            ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534481673541653448167316.png)

*   **routing路由模式** - Direct 路由模式

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534656368151653465636755.png)

    客户端会绑定队列，当交换机类型为direct类型时，首先根据生产者的key，匹配队列的路由表（消费者），每个匹配成功的队列都会接收到消息，而每个队列的消费者会以轮询的方式消费消息（A队列匹配上了，A队列下有a,b两个消费者，如果来一次是a消费,那么下一条消息是b来消费，在消费上ab没区别，且为队列提供路由信息）

    *   示例：

        1、创建路由：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534685242081653468523997.png)

        2、创建队列：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534684622991653468462255.png)

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534659051161653465905086.png)

        *   \_4\_交换机.java：生产者绑定了direct路由，并向指定的客户端key进行发送消息，只能匹配上路由key对应的消息队列,对应的消费者才能消费消息;  如果这个key有多个客户端，只会消费一次（只选择一个客户端发送消息）

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.Channel;
            import com.rabbitmq.client.Connection;
            import com.zhuangjie.mq.config.RabbitMQConnection;
            import org.junit.Test;

            public class _4_交换机 {
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "direct_exchange";

                @Test
                public  void producer() throws Exception{
                    // 创建Connection
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建Channel
                    Channel channel = connection.createChannel();
                    // 通道关联交换机
                    channel.exchangeDeclare(EXCHANGE_NAME, "direct", true);
                    String msg = "Hello!";
                    channel.basicPublish(EXCHANGE_NAME, "email_v", null, msg.getBytes());
                    channel.close();
                    connection.close();
                }

            }

            ```

        *   \_4\_交换机的短信消费端.java : 设置key，并绑定队列（路由）、队列绑定direct路由。&#x20;

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.sun.corba.se.impl.orbutil.threadpool.TimeoutException;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;

            public class _4_交换机的短信消费端 {
                /**
                 * 定义短信队列
                 */
                private static final String QUEUE_NAME = "direct_email_sms";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "direct_exchange";

                public static void main(String[] args) throws Exception {
                    System.out.println("短信消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "sms");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("短信消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }

            ```

        *   \_4\_交换机的邮件消费端.java :  设置key，并绑定队列（路由）、队列绑定direct路由。

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;
            import java.util.concurrent.TimeoutException;

            public class _4_交换机的邮件消费端 {
                /**
                 * 定义邮件队列
                 */
                private static final String QUEUE_NAME = "direct_email_queue";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "direct_exchange";

                public static void main(String[] args) throws IOException, TimeoutException {
                    System.out.println("邮件消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "email_v");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("邮件消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }

            ```

        *   测试&#x20;

            启动上面写的两个消费者，然后再启动生产者， 然后只有匹配的队列的消费者才能消费

            ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16536164366501653616436568.png)

            ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16536164481711653616447490.png)

*   **topic 主题模式(路由模式的一种)**

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534678082181653467807610.png)

    topic主题模式是路由模式的一种，当交换机类型为topic类型时，根据队列绑定的路由建模糊转发到具体的队列中存放。

    \#号表示支持匹配多个**词**；a.\* 可以匹配a.b 还可以匹配a.b.c

    \*号表示只能匹配一个**词**；a.\* 可以匹配a.b 但匹配不了a.b.c

    *   示例：

        1、创建路由：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534687012221653468701174.png)

        2、创建队列

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534687332071653468732760.png)

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534678772101653467876991.png)

        *   \_4\_交换机.java：生产者绑定了topic路由，设置发送的主题key（如“xiaozhuang.abc”），进行发送消息，只要匹配上的客户端，客户端都会收到该消息。

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.Channel;
            import com.rabbitmq.client.Connection;
            import com.zhuangjie.mq.config.RabbitMQConnection;
            import org.junit.Test;

            public class _4_交换机 {
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "topic_exchange";

                @Test
                public  void producer() throws Exception{
                    //  创建Connection
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建Channel
                    Channel channel = connection.createChannel();
                    // 通道关联交换机
                    channel.exchangeDeclare(EXCHANGE_NAME, "topic", true);
                    String msg = "Hello!";
                    channel.basicPublish(EXCHANGE_NAME, "xiaozhuang.abc", null, msg.getBytes());
                    channel.close();
                    connection.close();
                }

            }


            ```

        *   \_4\_交换机的短信消费端.java : 设置模糊的key （xiaozhuang.\*）

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.sun.corba.se.impl.orbutil.threadpool.TimeoutException;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;

            public class _4_交换机的短信消费端 {
                /**
                 * 定义短信队列
                 */
                private static final String QUEUE_NAME = "topic_queue_sms";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "topic_exchange";

                public static void main(String[] args) throws Exception {
                    System.out.println("短信消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "xiaozhuang.*");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("短信消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }


            ```

        *   \_4\_交换机的邮件消费端.java :  设置模糊的key （zhuangjie.\*）

            ```java
            package com.zhuangjie.mq.controller;

            import com.rabbitmq.client.*;
            import com.zhuangjie.mq.config.RabbitMQConnection;

            import java.io.IOException;
            import java.util.concurrent.TimeoutException;

            public class _4_交换机的邮件消费端 {
                /**
                 * 定义邮件队列
                 */
                private static final String QUEUE_NAME = "topic_queue_email";
                /**
                 * 定义交换机的名称
                 */
                private static final String EXCHANGE_NAME = "topic_exchange";

                public static void main(String[] args) throws IOException, TimeoutException {
                    System.out.println("邮件消费者...");
                    // 创建我们的连接
                    Connection connection = RabbitMQConnection.getConnection();
                    // 创建我们通道
                    final Channel channel = connection.createChannel();
                    // 关联队列消费者关联队列
                    channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, "zhuangjie.*");
                    DefaultConsumer defaultConsumer = new DefaultConsumer(channel) {
                        @Override
                        public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                            String msg = new String(body, "UTF-8");
                            System.out.println("邮件消费者获取消息:" + msg);
                        }
                    };
                    // 开始监听消息 自动签收
                    channel.basicConsume(QUEUE_NAME, true, defaultConsumer);

                }
            }


            ```

### \[\_4\_] 整合到springboot

*   父工程

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <groupId>com.zhuangjie</groupId>
            <artifactId>springboot-mq</artifactId>
            <packaging>pom</packaging>
            <version>1.0-SNAPSHOT</version>
            <modules>
                <module>mq-producer</module>
                <module>mq-consumer</module>
            </modules>
            <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.1.3.RELEASE</version>
                <relativePath/>
            </parent>

            <dependencies>
                <!-- springboot-web组件 -->
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <!-- 添加springboot对amqp的支持 -->
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-amqp</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.apache.commons</groupId>
                    <artifactId>commons-lang3</artifactId>
                </dependency>
                <!--fastjson -->
                <dependency>
                    <groupId>com.alibaba</groupId>
                    <artifactId>fastjson</artifactId>
                    <version>1.2.49</version>
                </dependency>

                <dependency>
                    <groupId>org.projectlombok</groupId>
                    <artifactId>lombok</artifactId>
                </dependency>
            </dependencies>

        </project>
        ```

*   生产者子模块

    *   resources > application.yml

        ```yaml
        spring:
          rabbitmq:
            ####连接地址
            host: 127.0.0.1
            ####端口号
            port: 5672
            ####账号
            username: guest
            ####密码
            password: guest
            ### 地址
            virtual-host: /zhuangjie_vh
        server:
          port: 9001


        ```

    *   启动类

        ProducerApplication.java

        ```java
        package com.zhuangjie.mq;

        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;

        @SpringBootApplication
        public class ProducerApplication {
            public static void main(String[] args) {
                SpringApplication.run(ProducerApplication.class,args);
            }
        }


        ```

    *   包目录 > config > RabbitMQConfig.java：配置类

        ```java
        package com.zhuangjie.mq.config;

        import org.springframework.amqp.core.Binding;
        import org.springframework.amqp.core.BindingBuilder;
        import org.springframework.amqp.core.FanoutExchange;
        import org.springframework.amqp.core.Queue;
        import org.springframework.context.annotation.Bean;
        import org.springframework.stereotype.Component;

        @Component
        public class RabbitMQConfig {
            /**
             * 定义交换机
             */
            private String EXCHANGE_SPRINGBOOT_NAME = "/springboot-exchange";


            /**
             * 短信队列
             */
            private String FANOUT_SMS_QUEUE = "fanout_queue_sms";
            /**
             * 邮件队列
             */
            private String FANOUT_EMAIL_QUEUE = "fanout_queue_email";

            /**
             * 配置smsQueue
             *
             * @return
             */
            @Bean
            public Queue smsQueue() {
                return new Queue(FANOUT_SMS_QUEUE);
            }

            /**
             * 配置emailQueue
             *
             * @return
             */
            @Bean
            public Queue emailQueue() {
                return new Queue(FANOUT_EMAIL_QUEUE);
            }

            /**
             * 配置fanoutExchange
             *
             * @return
             */
            @Bean
            public FanoutExchange fanoutExchange() {
                return new FanoutExchange(EXCHANGE_SPRINGBOOT_NAME);
            }

            // 绑定交换机 sms
            @Bean
            public Binding bindingSmsFanoutExchange(Queue smsQueue, FanoutExchange fanoutExchange) {
                return BindingBuilder.bind(smsQueue).to(fanoutExchange);
            }

            // 绑定交换机 email
            @Bean
            public Binding bindingEmailFanoutExchange(Queue emailQueue, FanoutExchange fanoutExchange) {
                return BindingBuilder.bind(emailQueue).to(fanoutExchange);
            }

        }

        ```

    *   包目录 > msgs > Email.java :  接收的消息类

        ```java
        package com.zhuangjie.mq.msgs;

        import lombok.Data;
        import lombok.ToString;

        import java.io.Serializable;

        @Data
        @ToString
        public class Email implements Serializable {
            private String addresseeEmail;
            private String msg;


        }

        ```

    *   包目录下 > controller > FanoutProducer.java : 生产者核心配置类

        ```java
        package com.zhuangjie.mq.controller;

        import com.zhuangjie.mq.msgs.Email;
        import org.springframework.amqp.core.AmqpTemplate;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;

        /**
         * @ClassName FanoutProducer
         * @Author 蚂蚁课堂余胜军 QQ644064779 www.mayikt.com
         * @Version V1.0
         **/
        @RestController
        public class FanoutProducer {

            @Autowired
            private AmqpTemplate amqpTemplate;

            /**
             * 发送消息
             *
             * @return
             */
            @RequestMapping("/sendMsg")
            public String sendMsg(String email) {
                /**
                 * 1.交换机名称
                 * 2.路由key名称
                 * 3.发送内容
                 */
                Email em = new Email();
                em.setAddresseeEmail(email);
                em.setMsg("登录成功！");
                amqpTemplate.convertAndSend("/springboot-exchange", "", em);
                return "success";
            }
        }

        ```

*   消费者子模块

    *   resources > application.yml

        ```yaml
        spring:
          rabbitmq:
            ####连接地址
            host: 127.0.0.1
            ####端口号
            port: 5672
            ####账号
            username: guest
            ####密码
            password: guest
            ### 地址
            virtual-host: /zhuangjie_vh

        server:
          port: 9002

        ```

    *   启动类

        ```java
        package com.zhuangjie.mq;

        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;

        @SpringBootApplication
        public class ConsumerEmailApplication {
            public static void main(String[] args) {
                SpringApplication.run(ConsumerEmailApplication.class,args);
            }
        }

        ```

    *   包目录 > config > RabbitMQConfig.java：配置类

        ```java
        package com.zhuangjie.mq.config;

        import org.springframework.amqp.core.Binding;
        import org.springframework.amqp.core.BindingBuilder;
        import org.springframework.amqp.core.FanoutExchange;
        import org.springframework.amqp.core.Queue;
        import org.springframework.context.annotation.Bean;
        import org.springframework.stereotype.Component;

        @Component
        public class RabbitMQConfig {
            /**
             * 定义交换机
             */
            private String EXCHANGE_SPRINGBOOT_NAME = "/springboot-exchange";


            /**
             * 短信队列
             */
            private String FANOUT_SMS_QUEUE = "fanout_queue_sms";
            /**
             * 邮件队列
             */
            private String FANOUT_EMAIL_QUEUE = "fanout_queue_email";

            /**
             * 配置smsQueue
             *
             * @return
             */
            @Bean
            public Queue smsQueue() {
                return new Queue(FANOUT_SMS_QUEUE);
            }

            /**
             * 配置emailQueue
             *
             * @return
             */
            @Bean
            public Queue emailQueue() {
                return new Queue(FANOUT_EMAIL_QUEUE);
            }

            /**
             * 配置fanoutExchange
             *
             * @return
             */
            @Bean
            public FanoutExchange fanoutExchange() {
                return new FanoutExchange(EXCHANGE_SPRINGBOOT_NAME);
            }

            // 绑定交换机 sms
            @Bean
            public Binding bindingSmsFanoutExchange(Queue smsQueue, FanoutExchange fanoutExchange) {
                return BindingBuilder.bind(smsQueue).to(fanoutExchange);
            }

            // 绑定交换机 email
            @Bean
            public Binding bindingEmailFanoutExchange(Queue emailQueue, FanoutExchange fanoutExchange) {
                return BindingBuilder.bind(emailQueue).to(fanoutExchange);
            }

        }

        ```

    *   包目录 > msgs > Email.java :  接收的消息类

        ```java
        package com.zhuangjie.mq.msgs;

        import lombok.Data;
        import lombok.ToString;

        import java.io.Serializable;

        @Data
        @ToString
        public class Email implements Serializable {
            private String addresseeEmail;
            private String msg;


        }

        ```

    *   消费者mq核心类

        FanoutEmailConsumer.java

        ```java
        package com.zhuangjie.mq;

        import com.zhuangjie.mq.msgs.Email;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.amqp.rabbit.annotation.RabbitHandler;
        import org.springframework.amqp.rabbit.annotation.RabbitListener;
        import org.springframework.stereotype.Component;

        /**
         * @ClassName FanoutEmailConsumer
         * @Author 蚂蚁课堂余胜军 QQ644064779 www.mayikt.com
         * @Version V1.0
         **/
        @Slf4j
        @Component
        @RabbitListener(queues = "fanout_queue_email")
        public class FanoutEmailConsumer {

            @RabbitHandler
            public void process(Email email) {
                log.info(">>邮件消费者消息msg:{}<<", email);
            }
        }

        ```

*   测试

    1、需要在web管理平台创建有上面配置的vertualHosts ，就是“zhuangjie\_vh”

    2、启动消费者，启动生产者

    3、浏览器访问：[http://127.0.0.1:9001/sendMsg?email=2119299531@qq.com](http://127.0.0.1:9001/sendMsg?email=2119299531@qq.com "http://127.0.0.1:9001/sendMsg?email=2119299531@qq.com")

    4、查看消费者控制台

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535296130271653529612851.png)

### \[\_5\_] 生产者如何获取消费结果

RabbitMQ:

**消费者消费成功能够在数据库中插入一条数据,** 异步返回一个全局id，前端使用ajax定时主动查询；

```markdown
Rocketmq 自带全局消息id，能够根据该全局消息获取消费结果
原理： 生产者投递消息到mq服务器，mq服务器端在这时候返回一个全局的消息id，
当我们消费者消费该消息成功之后，消费者会给我们mq服务器端发送通知标记该消息消费成功。
生产者获取到该消息全局id，每隔2s时间调用mq服务器端接口查询该消息是否有被消费成功

在rocketmq中，自带根据消息id查询是否消费成功

```

### \[\_6\_] 死信队列

1.  消息投递到MQ中存放 消息已经过期 消费者没有及时的获取到我们消息，消息如果存放到mq服务器中过期之后，会转移到备胎死信队列存放。

2.  队列达到最大的长度 （队列容器已经满了）

3.  消费者消费多次消息失败，就会转移存放到死信队列中

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535454258421653545424999.png)

*   **死信队列的**架构原理

    死信队列和普通队列区别不是很大普通与死信队列都有自己独立的交换机和路由key、队列和消费者。

    区别：

    1.生产者投递消息先投递到我们普通交换机中，普通交换机在将该消息投到

    普通队列中缓存起来，普通队列对应有自己独立普通消费者。

    2.如果生产者投递消息到普通队列中，普通队列发现该消息一直没有被消费者消费

    的情况下，在这时候会将该消息转移到死信（备胎）交换机中，死信（备胎）交换机

    对应有自己独立的 死信（备胎）队列 对应独立死信（备胎）消费者。

*   **死信队列**应用场景

    1.30分钟订单超时设计

    A. Redis过期key ：

    B. 死信延迟队列实现：

    采用死信队列，创建一个普通队列没有对应的消费者消费消息，在30分钟过后

    就会将该消息转移到死信备胎消费者实现消费。

    备胎死信消费者会根据该订单号码查询是否已经支付过，如果没有支付的情况下

    则会开始回滚库存操作。

*   **应用示例**

    *   父模块

        *   pom.xml

            ```xml
            <?xml version="1.0" encoding="UTF-8"?>
            <project xmlns="http://maven.apache.org/POM/4.0.0"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
                <modelVersion>4.0.0</modelVersion>

                <groupId>com.zhuangjie</groupId>
                <artifactId>springboot-mq</artifactId>
                <packaging>pom</packaging>
                <version>1.0-SNAPSHOT</version>
                <modules>
                    <module>mq-producer</module>
                    <module>mq-consumer</module>
                </modules>
                <parent>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-parent</artifactId>
                    <version>2.1.3.RELEASE</version>
                    <relativePath/>
                </parent>

                <dependencies>
                    <!-- springboot-web组件 -->
                    <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                    </dependency>
                    <!-- 添加springboot对amqp的支持 -->
                    <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-amqp</artifactId>
                    </dependency>
                    <dependency>
                        <groupId>org.apache.commons</groupId>
                        <artifactId>commons-lang3</artifactId>
                    </dependency>
                    <!--fastjson -->
                    <dependency>
                        <groupId>com.alibaba</groupId>
                        <artifactId>fastjson</artifactId>
                        <version>1.2.49</version>
                    </dependency>

                    <dependency>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                    </dependency>
                </dependencies>

            </project>
            ```

    *   生产者子模块

        *   application.yml

            ```yaml
            spring:
              rabbitmq:
                ####连接地址
                host: 127.0.0.1
                ####端口号
                port: 5672
                ####账号
                username: guest
                ####密码
                password: guest
                ### 地址
                virtual-host: /zhuangjie_vh
            server:
              port: 9001


            ###模拟演示死信队列
            mq:
              dlx:
                exchange: order_dlx_exchange
                queue: order_dlx_queue
                routingKey: dlx
              ###备胎交换机
              order:
                exchange: order_exchange
                queue: order_queue
                routingKey: xinke.order
            ```

        *   ProducerApplication.java : 启动类

            ```java
            package com.zhuangjie.mq;

            import org.springframework.boot.SpringApplication;
            import org.springframework.boot.autoconfigure.SpringBootApplication;

            @SpringBootApplication
            public class ProducerApplication {
                public static void main(String[] args) {
                    SpringApplication.run(ProducerApplication.class,args);
                }
            }

            ```

        *   包目录 > config > DeadLetterMQConfig.java

            ```java
            package com.zhuangjie.mq.config;

            import org.springframework.amqp.core.Binding;
            import org.springframework.amqp.core.BindingBuilder;
            import org.springframework.amqp.core.DirectExchange;
            import org.springframework.amqp.core.Queue;
            import org.springframework.beans.factory.annotation.Value;
            import org.springframework.context.annotation.Bean;
            import org.springframework.stereotype.Component;

            import java.util.HashMap;
            import java.util.Map;

            @Component
            public class DeadLetterMQConfig {
                /**
                 * 订单交换机
                 */
                @Value("${mq.order.exchange}")
                private String orderExchange;

                /**
                 * 订单队列
                 */
                @Value("${mq.order.queue}")
                private String orderQueue;

                /**
                 * 订单路由key
                 */
                @Value("${mq.order.routingKey}")
                private String orderRoutingKey;
                /**
                 * 死信交换机
                 */
                @Value("${mq.dlx.exchange}")
                private String dlxExchange;

                /**
                 * 死信队列
                 */
                @Value("${mq.dlx.queue}")
                private String dlxQueue;
                /**
                 * 死信路由
                 */
                @Value("${mq.dlx.routingKey}")
                private String dlxRoutingKey;

                /**
                 * 声明死信交换机
                 *
                 * @return DirectExchange
                 */
                @Bean
                public DirectExchange dlxExchange() {
                    return new DirectExchange(dlxExchange);
                }

                /**
                 * 声明死信队列
                 *
                 * @return Queue
                 */
                @Bean
                public Queue dlxQueue() {
                    return new Queue(dlxQueue);
                }

                /**
                 * 声明订单业务交换机
                 *
                 * @return DirectExchange
                 */
                @Bean
                public DirectExchange orderExchange() {
                    return new DirectExchange(orderExchange);
                }

                /**
                 * 声明订单队列
                 *
                 * @return Queue
                 */
                @Bean
                public Queue orderQueue() {
                    // 订单队列绑定我们的死信交换机
                    Map<String, Object> arguments = new HashMap<>(2);
                    arguments.put("x-dead-letter-exchange", dlxExchange);
                    arguments.put("x-dead-letter-routing-key", dlxRoutingKey);
                    return new Queue(orderQueue, true, false, false, arguments);
                }

                /**
                 * 绑定死信队列到死信交换机
                 *
                 * @return Binding
                 */
                @Bean
                public Binding binding() {
                    return BindingBuilder.bind(dlxQueue())
                            .to(dlxExchange())
                            .with(dlxRoutingKey);
                }


                /**
                 * 绑定订单队列到订单交换机
                 *
                 * @return Binding
                 */
                @Bean
                public Binding orderBinding() {
                    return BindingBuilder.bind(orderQueue())
                            .to(orderExchange())
                            .with(orderRoutingKey);
                }
            }
            ```

        *   生产者: 这里它属性Controller层

            FanoutProducer.java

            ```java
            package com.zhuangjie.mq.controller;

            import com.zhuangjie.mq.msgs.Email;
            import org.springframework.amqp.core.AmqpTemplate;
            import org.springframework.amqp.rabbit.core.RabbitTemplate;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.beans.factory.annotation.Value;
            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.bind.annotation.RestController;

            /**
             * @ClassName FanoutProducer
             * @Author 蚂蚁课堂余胜军 QQ644064779 www.mayikt.com
             * @Version V1.0
             **/
            @RestController
            public class FanoutProducer {

                @Autowired
                private RabbitTemplate rabbitTemplate;
                /**
                 * 订单交换机
                 */
                @Value("${mq.order.exchange}")
                private String orderExchange;
                /**
                 * 订单路由key
                 */
                @Value("${mq.order.routingKey}")
                private String orderRoutingKey;

                @RequestMapping("/sendOrder")
                public String sendOrder() {
                    String msg = "每特教育牛逼";
                    rabbitTemplate.convertAndSend(orderExchange, orderRoutingKey, msg, message -> {
                        // 设置消息过期时间 10秒过期
                        message.getMessageProperties().setExpiration("8000");
                        return message;
                    });
                    return "success";
                }
            }

            ```

    *   消费者子模块

        *   application.yml

            ```yaml
            spring:
              rabbitmq:
                ####连接地址
                host: 127.0.0.1
                ####端口号
                port: 5672
                ####账号
                username: guest
                ####密码
                password: guest
                ### 地址
                virtual-host: /zhuangjie_vh

            server:
              port: 9002

            ###模拟演示死信队列
            mq:
              dlx:
                exchange: order_dlx_exchange
                queue: order_dlx_queue
                routingKey: dlx
              ###备胎交换机
              order:
                exchange: order_exchange
                queue: order_queue
                routingKey: xinke.order
            ```

        *   ConsumerEmailApplication.java : 启动类

            ```java
            package com.zhuangjie.mq;

            import org.springframework.boot.SpringApplication;
            import org.springframework.boot.autoconfigure.SpringBootApplication;

            @SpringBootApplication
            public class ConsumerEmailApplication {
                public static void main(String[] args) {
                    SpringApplication.run(ConsumerEmailApplication.class,args);
                }
            }

            ```

        *   包目录 > config > DeadLetterMQConfig.java

            ```java
            package com.zhuangjie.mq.config;

            import org.springframework.amqp.core.Binding;
            import org.springframework.amqp.core.BindingBuilder;
            import org.springframework.amqp.core.DirectExchange;
            import org.springframework.amqp.core.Queue;
            import org.springframework.beans.factory.annotation.Value;
            import org.springframework.context.annotation.Bean;
            import org.springframework.stereotype.Component;

            import java.util.HashMap;
            import java.util.Map;

            @Component
            public class DeadLetterMQConfig {
                /**
                 * 订单交换机
                 */
                @Value("${mq.order.exchange}")
                private String orderExchange;

                /**
                 * 订单队列
                 */
                @Value("${mq.order.queue}")
                private String orderQueue;

                /**
                 * 订单路由key
                 */
                @Value("${mq.order.routingKey}")
                private String orderRoutingKey;
                /**
                 * 死信交换机
                 */
                @Value("${mq.dlx.exchange}")
                private String dlxExchange;

                /**
                 * 死信队列
                 */
                @Value("${mq.dlx.queue}")
                private String dlxQueue;
                /**
                 * 死信路由
                 */
                @Value("${mq.dlx.routingKey}")
                private String dlxRoutingKey;

                /**
                 * 声明死信交换机
                 *
                 * @return DirectExchange
                 */
                @Bean
                public DirectExchange dlxExchange() {
                    return new DirectExchange(dlxExchange);
                }

                /**
                 * 声明死信队列
                 *
                 * @return Queue
                 */
                @Bean
                public Queue dlxQueue() {
                    return new Queue(dlxQueue);
                }

                /**
                 * 声明订单业务交换机
                 *
                 * @return DirectExchange
                 */
                @Bean
                public DirectExchange orderExchange() {
                    return new DirectExchange(orderExchange);
                }

                /**
                 * 声明订单队列
                 *
                 * @return Queue
                 */
                @Bean
                public Queue orderQueue() {
                    // 订单队列绑定我们的死信交换机
                    Map<String, Object> arguments = new HashMap<>(2);
                    arguments.put("x-dead-letter-exchange", dlxExchange);
                    arguments.put("x-dead-letter-routing-key", dlxRoutingKey);
                    return new Queue(orderQueue, true, false, false, arguments);
                }

                /**
                 * 绑定死信队列到死信交换机
                 *
                 * @return Binding
                 */
                @Bean
                public Binding binding() {
                    return BindingBuilder.bind(dlxQueue())
                            .to(dlxExchange())
                            .with(dlxRoutingKey);
                }


                /**
                 * 绑定订单队列到订单交换机
                 *
                 * @return Binding
                 */
                @Bean
                public Binding orderBinding() {
                    return BindingBuilder.bind(orderQueue())
                            .to(orderExchange())
                            .with(orderRoutingKey);
                }
            }
            ```

        *   普通消费者与死信消费者

            OrderConsumer.java

            ```java
            package com.zhuangjie.mq.consumer;//package com.mayikt.consumer;

            import lombok.extern.slf4j.Slf4j;
            import org.springframework.amqp.rabbit.annotation.RabbitListener;
            import org.springframework.stereotype.Component;

            /**
             * 订单消费者
             */
            @Component
            @Slf4j
            public class OrderConsumer {

                /**
                 * 监听队列回调的方法
                 *
                 * @param msg
                 */
                @RabbitListener(queues = "order_queue")
                public void orderConsumer(String msg) {
                    log.info(">>正常订单消费者消息MSG:{}<<", msg);
                }
            }
            ```

            OrderDlxConsumer.java

            ```java
            package com.zhuangjie.mq.consumer;

            import lombok.extern.slf4j.Slf4j;
            import org.springframework.amqp.rabbit.annotation.RabbitListener;
            import org.springframework.stereotype.Component;

            @Slf4j
            @Component
            public class OrderDlxConsumer {

                /**
                 * 死信队列监听队列回调的方法
                 *
                 * @param msg
                 */
                @RabbitListener(queues = "order_dlx_queue")
                public void orderConsumer(String msg) {
                    log.info(">死信队列消费订单消息:msg{}<<", msg);
                }
            }
            ```

    *   创建我们配置的VirtualHosts

        由于在springboot上，路由与队列，我们只需要配置，如果没有就会帮我们创建，但VirtualHosts必须要有。上面我们写的VirtualHosts是zhuangjie\_vh，所以我们需要创建有，且配置的用户需要有操作的权限。

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535479438091653547943755.png)

    *   测试

        在没注释普通消费者类时，由于我们在生产者那边配置了过期时间，当在这个时间内没有消费时，会将该消息转到死信队列中，让死信消费者消费。

        1、只启动生产者模块，发起请求，触发生产者：[http://localhost:9001/sendOrder](http://localhost:9001/sendOrder "http://localhost:9001/sendOrder")

        然后在web管理中看普通队列 与死信队列的消费状态。会发现刚开始在普通队列中，消息过期（普通消费者没启动，无法消费）后，进入在死信队列中。

        2、启动生产者模块，注释普通消费者，启动消费者模块，触发生产者：[http://localhost:9001/sendOrder](http://localhost:9001/sendOrder "http://localhost:9001/sendOrder")

        消息过期后，在消费者控制台中输出死信消费者消费的日志。

        3、启动生产者模块，启动消费者模块，触发生产者：[http://localhost:9001/sendOrder](http://localhost:9001/sendOrder "http://localhost:9001/sendOrder")

        在消费者控制台中输出普通消费者消费的日志。

### \[\_7\_] 如何开启重试机制

*   使用重试机制

    默认消费报错是会自动重试的，且是无线重试，我们可以通过配置重试次数。

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535501648451653550164448.png)

    application.yml：

    ```yaml
    spring:
      rabbitmq:
        ####连接地址
        host: 127.0.0.1
        ####端口号
        port: 5672
        ####账号
        username: guest
        ####密码
        password: guest
        ### 地址
        virtual-host: /zhuangjie_vh
        listener:
          simple:
            retry:
              ####开启消费者（程序出现异常的情况下会）进行重试
              enabled: true
              ####最大重试次数
              max-attempts: 5
              ####重试间隔时间
              initial-interval: 3000
    server:
      port: 9002

    ###模拟演示死信队列
    mq:
      dlx:
        exchange: order_dlx_exchange
        queue: order_dlx_queue
        routingKey: dlx
      ###备胎交换机
      order:
        exchange: order_exchange
        queue: order_queue
        routingKey: xinke.order
    ```

*   什么情况不需要重试？

    代码出现bug而导致出错下，或说不管重试多少都不可以成功的情况下是不需要作重试的，我们可以通过try捕获，存放到死信队列或者是数据库表记录、后期人工实现补偿。

*   **消费者重试过程中，如何避免幂等性问题**

    首先重试最好配置间隔时间与重试次数，在重试的过程中，为了避免业务逻辑重复执行，建议提前全局**id提前查询，如果存在的情况下，就无需再继续做该流程。**

### \[\_8\_] 消费者开启消息确认机制

1、application.yml 加入以下配置

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535507228421653550722541.png)

2、开启手动签收后，我们需要在消费完成后，进行签收代码：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535514947151653551494655.png)

### \[\_9\_] 生产者开启ACK confirm机制

在生产模块：

*   1、resources > application.yml

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535583898421653558389207.png)

*   2、包目录＞config > AckPublisher.java：主要看里面的confirm方法。

    ```java
    package com.zhuangjie.mq.config;

    import org.springframework.amqp.core.Message;
    import org.springframework.amqp.rabbit.connection.CorrelationData;
    import org.springframework.amqp.rabbit.core.RabbitTemplate;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import javax.annotation.PostConstruct;

    @Service
    public class AckPublisher implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {
        @Autowired
        private RabbitTemplate rabbitTemplate;

        @PostConstruct
        public void init() {
            //设置回退消息交给谁处理
            rabbitTemplate.setReturnCallback(this);
            rabbitTemplate.setConfirmCallback(this);
            /**
             * true：
             * 交换机无法将消息进行路由时，会将该消息返回给生产者
             * false：
             * 如果发现消息无法进行路由，则直接丢弃
             */
            rabbitTemplate.setMandatory(true); //yml:publisher-returns: true配置true同等效果，二选一

        }

        /**
         * 接收发送后确认信息
         * @param correlationData 回调消息id及其余信息
         * @param ack  是否发送成功，交换机是否收到消息，true 成功 false 失败
         * @param cause 原因，ack为true则cause为空，ack为false则cause为失败原因
         */
        @Override
        public void confirm(CorrelationData correlationData, boolean ack, String cause) {
            //如果发送的是延迟消息（测试使用的插件延迟消息）correlationData是null，b是true
            if (ack) {
                System.out.println("[ _ ] ACK消息：MQ已接收");
            } else {
                System.out.println(">_<ACK消息：MQ未接收: " + correlationData + "|" + cause);
                //可以在此处写入对失败消息的处理逻辑，重新发送，还是存入数据库，等待后续发送
            }
        }

        /**
         * 发送失败的回调
         *
         * @param message
         * @param replyCode
         * @param replyText
         * @param exchange
         * @param routingKey
         */
        @Override
        public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
            System.out.println("ack " + message + " 发送失败");
        }




    }
    ```

下载代码：[https://github.com/18476305640/fileBox/raw/master/杂项/springboot-mq.zip](https://github.com/18476305640/fileBox/raw/master/杂项/springboot-mq.zip "https://github.com/18476305640/fileBox/raw/master/杂项/springboot-mq.zip")
