# JVM

学习视频：[https://www.bilibili.com/video/BV1PJ411n7xZ?p=16\&spm\_id\_from=333.880.my\_history.page.click](https://www.bilibili.com/video/BV1PJ411n7xZ?p=16\&spm_id_from=333.880.my_history.page.click "https://www.bilibili.com/video/BV1PJ411n7xZ?p=16\&spm_id_from=333.880.my_history.page.click")

JVM译为Java虚拟机。

*   作用
    Java虚拟机就是二进制字节码的运行环境，负责装载字节码到其内部，解释/
    编译为对应平台上的机器指令执行。每一条Java指令，Java虚拟机规范中都
    有详细定义，如怎么取操作数，怎么处理操作数，处理结果放在哪里。

*   特点
    一次编译，到处运行
    自动内存管理
    自动垃圾回收功能

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16539571974841653957197317.png)

javac.exe文件负责将java的源代码编译为字节码文件，javac是前端编译器，字节码是跨语言的。

JVM的架构模型，指令

*   Java的重大事件

    *   1990年，在Sun计算机公司中，由Patrick Naughton、MikeSheridan及James Gosling领导的小组Green Team，开发出的新的程序语言，命名为Oak，后期命名为Java

    *   1995年，Sun正式发布Java和HotJava产品，Java首次公开亮相。

    *   1996年1月23日Sun Microsystems发布了JDK 1.0。

    *   1998年，JDK1.2版本发布。同时，Sun发布了JSP/Servlet、EJB规范，以及将Java分成了J2EE、J2SE和J2ME。这表明了Java开始向企业、桌面应用和移动设备应用3大领域挺进。

    *   2000年，JDK1.3发布，Java HotSpot Virtual Machine正式发布，成为Java的默认虚拟机。

    *   2002年，JDK1.4发布，古老的Classic虚拟机退出历史舞台。

    *   2003年年底，Java平台的scala正式发布，同年Groovy也加入了Java阵营。

    *   2004年，JDK1.5发布。同时JDK1.5改名为JavaSE5.0。

    *   2006年，JDK6发布。同年，Java开源并建立了OpenJDK。顺理成章，Hotspot虚拟机也成为了OpenJDK中的默认虚拟机。

    *   2007年，Java平台迎来了新伙伴Clojure。

    *   2008年，oracle收购了BEA，得到了JRockit虚拟机。

    *   2009年，Twitter宣布把后台大部分程序从Ruby迁移到Scala，这是Java平台的又一次大规模应用。

    *   2010年，Oracle收购了Sun，获得Java商标和最真价值的HotSpot虚拟机。此时，Oracle拥有市场占用率最高的两款虚拟机HotSpot和JRockit，并计划在未来对它们进行整合：HotRockit

    *   2011年，JDK7发布。在JDK1.7u4中，正式启用了新的垃圾回收器G1。

    *   2017年，JDK9发布。将G1设置为默认GC，替代CMS

    *   同年，IBM的J9开源，形成了现在的Open J9社区

    *   2018年，Android的Java侵权案判决，Google赔偿Oracle计88亿美元

    *   同年，Oracle宣告JavagE成为历史名词JDBC、JMS、Servlet赠予Eclipse基金会

    *   同年，JDK11发布，LTS版本的JDK，发布革命性的ZGC，调整JDK授权许可

    *   2019年，JDK12发布，加入RedHat领导开发的Shenandoah GC

*   jvm的整体结构

    *   `HotSpot VM`是目前市面上高性能虚拟机的代表作之一。

    *   它采用解释器与即时编译器并存的架构。

    *   在今天，Java程序的运行性能早已脱胎换骨，已经达到了可以和C/C++程序一较高下的地步。

    *   执行引擎包含三部分：`解释器`，`即时编译器`，`垃圾回收器`

    *

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16539575142841653957514226.png)

    *   java的指令架构：

        Java编译器输入的指令流基本上是一种`基于栈的指令集架构`，指令多，但指令集更小，可移植性更好，更好实现跨平台。另外一种指令集架构则是`基于寄存器的指令集架构。`

        *   基于栈式架构的特点

            *   设计和实现更简单，适用于资源受限的系统

            *   避开了寄存器的分配难题：使用零地址指令方式分配

            *   指令流中的指令大部分是零地址指令，其执行过程依赖于`操作栈`。`指令集更小，编译器容易实现`

            *   不需要硬件支持，可移植性更好，更好`实现跨平台`

        *   基于寄存器架构的特点

            *   典型的应用是x86的二进制指令集：比如传统的PC以及Android的Davlik虚拟机。

            *   指令集架构则`完全依赖硬件`，与硬件的耦合度高，`可移植性差`

            *   `性能优秀和执行更高效`

            *   花费更少的指令去完成一项操作

            *   在大部分情况下，`基于寄存器架构的指令集往往都以一地址指令、二地址指令和三地址指令为主`，而基于栈式架构的指令集却是以零地址指令为主

*   jvm生命周期

    *   虚拟机的启动

        *   Java虚拟机的启动是通过`引导类加载器`（bootstrap class loader）创建一个初始类（initial class）来完成的，这个类是由虚拟机的具体实现指定的。

    *   虚拟机的执行

        *   一个运行中的Java虚拟机有着一个清晰的任务：执行Java程序

        *   程序开始执行时他才运行，程序结束时他就停止

        *   `执行一个所谓的Java程序的时候，真真正正在执行的是一个叫做Java虚拟机的进程`

    *   虚拟机的退出

        *   程序正常执行结束

        *   程序在执行过程中遇到了异常或错误而异常终止

        *   由于操作系统用现错误而导致Java虚拟机进程终止

        *   某线程调用Runtime类或`System类的exit( )`方法，或`Runtime类的halt( )`方法，并且Java安全管理器也允许这次exit( )或halt( )操作。

        *   除此之外，JNI（Java Native Interface）规范描述了用JNI Invocation API来加载或卸载 Java虚拟机时，Java虚拟机的退出情况。
