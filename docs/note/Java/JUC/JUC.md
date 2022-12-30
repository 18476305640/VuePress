# JUC

## 目录

视频教程地址：[https://www.bilibili.com/video/BV1ar4y1x727](https://www.bilibili.com/video/BV1ar4y1x727 "https://www.bilibili.com/video/BV1ar4y1x727")

你可能要先了解以下内容：

[线程池](线程池/线程池.md "线程池")

### +为什么要学JUC

> 核心越多，处理器的并行处理能力越强，换句话说，就是能够同时处理任务的数量多。 主频越高，说明在处理单个任务的时候更快。 大家可以把核心数量看作“手”的数量——数量越多，同时搬起的东西就越多； 而主频就相当于“手”的力量——力量越大，就能胜任更繁重的工作。

可是从2003年开始CPU主频已经不再翻倍，而是采用多核而不是更快的主频。
在主频不再提高且核数在不断增加的情况下，要想让程序更快就要用到**并行或并发**编程。

并发：也称为上下文切换

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541615051161654161505064.png)

并行：

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541613930711654161392909.png)

### - 并发相关Java包

*   涉及到的`包`内容

    *   `java.util.concurrent`

    *   `java.util.concurrent.atomic`

    *   `java.util.concurrent.locks`

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541523218951654152321022.png)

### - 并发始祖

*   并发始祖Doug Lea

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541524388841654152438521.png)

### + start线程解读

初始程序

```java
public static void main(String[] args) {
        Thread t1 = new Thread(() ->{
        },"t1");
        t1.start();
    }

```

```java
//start
    public synchronized void start() {
        /**
         * This method is not invoked for the main method thread or "system"
         * group threads created/set up by the VM. Any new functionality added
         * to this method in the future may have to also be added to the VM.
         *
         * A zero status value corresponds to state "NEW".
         */
        if (threadStatus != 0)
            throw new IllegalThreadStateException();

        /* Notify the group that this thread is about to be started
         * so that it can be added to the group's list of threads
         * and the group's unstarted count can be decremented. */
        group.add(this);

        boolean started = false;
        try {
            start0();
            started = true;
        } finally {
            try {
                if (!started) {
                    group.threadStartFailed(this);
                }
            } catch (Throwable ignore) {
                /* do nothing. If start0 threw a Throwable then
                  it will be passed up the call stack */
            }
        }
    }

```

```java
private native void start0();//start0是一个native方法

```

`native`调用了本地方法，我们可以通过下载官网OpenJDK查看其源码

*   thread.c

    java线程是通过start的方法启动执行的，主要内容在native方法start0中

    Openjdk的写JNI一般是一一对应的，`Thread.java`对应的就是`Thread.c`

    `start0`其实就是`JVM_StartThread`。此时查看源代码可以看到在jvm.h中找到了声明，jvm.cpp中有实现。

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541526688891654152668784.png)

*   jvm.cpp

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541527258861654152725119.png)

*   thread.cpp

    终于在这里调用了**操作系统的线程启动**，`os::start_thread（thread);`

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541527748851654152774497.png)

### + Java多线程相关概念

*   1把锁

*   2个并（并发和并行）

    ①并发

    是在同一实体上的多个事件，是在同一台处理器上“同时”处理多个任务，同一时刻，其实是只有一个事件在发生。

    ②并行

    是在不同实体上的多个事件，是在多台处理器上同时处理多个任务，同一时刻，大家都真的在做事情，你做你的，我做我的

    **并发VS并行**

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541529318851654152931584.png)

*   3个程（进程 线程 管程）

    通过上面start线程的案例，其实进程线程都来源于操作系统。

    ①进程

    系统中运行的一个应用程序就是一个进程，每一个进程都有它自己的内存空间和系统资源。

    ②线程

    也被称为轻量级进程，在同一个进程内基本会有1一个或多个线程，是大多数操作系统进行调度的基本单元。

    ③管程

    Monitor（监视器），也就是我们平时说的**锁**

    Monitor其实是一种同步机制，他的义务是保证（同一时间）只有一个线程可以访问被保护的数据和代码。

    JVM中同步是基于进入和退出监视器对象(Monitor,管程对象)来实现的，每个对象实例都会有一个Monitor对象，

    Monitor对象会和Java对象一同创建并销毁，它底层是由C++语言来实现的。

    \>>>**进程VS线程**<<<

    进程是…，线程是…，进程和线程的最大不同在于进程基本上是独立的，而线程不一定，线程共享**方法区**和**堆**，线程私有**栈**、**本地方法栈**和**程序计数器**

    \>>>**用户线程和守护线程**<<<

    Java线程分为用户线程和守护线程

    线程的daemon属性为

    *   true表示是守护线程。

    *   false表示是用户线程。

    <!---->

    *   用户线程

        是系统的工作线程，它会完成这个程序需要完成的业务操作。main线程 也是用户线程。

    *   守护线程

        是一种特殊的线程，为其他线程服务的，在后台默默地完成一些系统性的服务，比如垃圾回收线程，会随着用户线程的关闭而关闭。

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541550448771654155044807.png)

    ![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541551798861654155179286.png)

### \[\_1\_] 引出FutureTask

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16541586940911654158694029.png)

这个类实现了Runnable与Future，有一个构造方法，传入Callable。集**多线程/有返回/异步任务** 于一身。&#x20;

### \[\_2\_] FutureTask结合线程池提高性能

*   使用示例

    \_3\_FutureTask结合线程池提高性能.java：直接看main方法，就能顺着看懂

    ```java
    package com.zhuangjie.javaJUC;

    import java.util.concurrent.*;

    public class _3_FutureTask结合线程池提高性能 {
        public static void main(String[] args) throws ExecutionException, InterruptedException {
            new _3_FutureTask结合线程池提高性能().A(); //不使用FutureTask  耗时：928ms!
            new _3_FutureTask结合线程池提高性能().B(); //只使用FutureTask  耗时：359ms!
            new _3_FutureTask结合线程池提高性能().C(); //使用 FutureTask + 线程性 耗时：304ms!
        }

        public void A() {
            long begin = System.currentTimeMillis();
            try { Thread.sleep(300);}catch (Exception e) {}
            try { Thread.sleep(300);}catch (Exception e) {}
            try { Thread.sleep(300);}catch (Exception e) {}
            long end = System.currentTimeMillis();
            System.out.println("==> main线程执行三个任务，耗时："+(end - begin)+"ms!");

        }
        public void B() throws ExecutionException, InterruptedException {
            long begin = System.currentTimeMillis();
            FutureTask<String> sft1 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });
            new Thread(sft1).start();

            FutureTask<String> sft2 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });
            new Thread(sft2).start();

            FutureTask<String> sft3 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });
            new Thread(sft3).start();


            String s1 = sft1.get();
            String s2 = sft2.get();
            String s3 = sft3.get();
            long end = System.currentTimeMillis();
            System.out.println("==> FutureTask 线程执行三个任务，耗时："+(end - begin)+"ms!");
            System.out.println(s1+"-"+s2+"-"+s3);

        }
        public void C() throws ExecutionException, InterruptedException {
            FutureTask<String> sft1 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });

            FutureTask<String> sft2 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });

            FutureTask<String> sft3 = new FutureTask<String>(() -> {
                try { Thread.sleep(300);}catch (Exception e) {}
                return "sft1:返回的结果！";
            });


            ExecutorService threadPool = Executors.newFixedThreadPool(3); //创建一个线程池

            long begin = System.currentTimeMillis();
            threadPool.submit(sft1);
            threadPool.submit(sft2);
            threadPool.submit(sft3);

            String s1 = sft1.get();
            String s2 = sft2.get();
            String s3 = sft3.get();

            long end = System.currentTimeMillis();
            threadPool.shutdown(); //关闭线程池
            System.out.println("==> FutureTask-threadPool  线程执行三个任务，耗时："+(end - begin)+"ms!");
            System.out.println(s1+"-"+s2+"-"+s3);


        }
    }



    ```

### \[\_3\_] CompletableFuture的引入

Future存在的缺点：

1）一旦调用get()方法求结果，如果计算没有完成容易导致程序阻塞，0(T---T)0

2）用isDone轮询，会耗费无谓的CPU资源

\_4\_FutureTask的缺点.java

```java
package com.zhuangjie.javaJUC;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class _4_FutureTask的缺点 {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        FutureTask<String> stringFutureTask = new FutureTask<>(() -> {
            Thread.sleep(3000);
            return "Hello,world!";
        });
        Thread t = new Thread(stringFutureTask);
        t.start();
        //1）一旦调用get()方法求结果，如果计算没有完成容易导致程序阻塞，0(T---T)0
        //System.out.println(stringFutureTask.get(1, TimeUnit.SECONDS)); //只愿意等待1s,如果获取不到，报错。
        
        //2）使用isDone轮询，会耗费无谓的CPU资源
        while (true) {
            if (stringFutureTask.isDone()) {
                System.out.println(stringFutureTask.get());
                return;
            }else {
                System.out.println("别再催了，越催越慢！");
                Thread.sleep(500);
            }
        }


    }

}

```

### \[\_4\_] CompletableFuture的说明

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16542476431571654247642588.png)

CompletableFuture：代表异步计算过程中的某一个阶段，一个阶段完成以后可能会触发另外一个阶段，有些类似Linux系统的管道分隔符传参数。

*   在Java8中，CompletableFuture提供了非常强大的Future的扩展功能，可以帮助我们简化异步编程的复杂性，并且提供了函数式编程的能力，可以通过回调的方式处理计算结果，也提供了转换和组合CompletableFuture的方法。

*   它可能代表一个明确完成的Future,也有可能代表一个完成阶段（CompletionStage),它支持在计算完成以后触发一些函数或执行某些动作。

*   它实现了Future和CompletionStage接口

### \[\_5\_] CompletableFuture的四大静态方法

1）**集线程池：**

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16542594796581654259478862.png)

```java
package com.zhuangjie.javaJUC;

import sun.nio.ch.ThreadPool;

import java.util.concurrent.*;

public class _5_CompletableFuture的四大静态方法 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> cf1 = CompletableFuture.runAsync(() -> {
            try { Thread.sleep(1000);  }catch (Exception e) { }
            System.out.println(Thread.currentThread().getName());
        });
        System.out.println(cf1.get());


        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture<Void> cf2 = CompletableFuture.runAsync(() -> {
            try { Thread.sleep(1000);  }catch (Exception e) { }
            System.out.println(Thread.currentThread().getName());
        },threadPool);
        
        System.out.println(cf2.get());
        threadPool.shutdown();


    }
}

```

执行输出：

```java
ForkJoinPool.commonPool-worker-1
null
pool-1-thread-1
null

```

```java
package com.zhuangjie.javaJUC;

import sun.nio.ch.ThreadPool;

import java.util.concurrent.*;

public class _5_CompletableFuture的四大静态方法 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<String> cf1 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000);  }catch (Exception e) { }
            System.out.println(Thread.currentThread().getName());
            return "不指定线程池！";
        });
        System.out.println(cf1.get());


        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(1000);  }catch (Exception e) { }
            System.out.println(Thread.currentThread().getName());
            return "指定了线程池！";
        },threadPool);

        System.out.println(cf2.get());
        threadPool.shutdown();


    }
}

```

执行输出：

```java
ForkJoinPool.commonPool-worker-1
不指定线程池！
pool-1-thread-1
指定了线程池！
```

### \[\_6\_] CompletableFuture异步编程

```java
package com.zhuangjie.javaJUC;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class _6_CompletableFuture通用异步编程 {
    public static void main(String[] args) {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);

        try {
            CompletableFuture<String> exceptionally = CompletableFuture.supplyAsync(() -> { //Supplier,当没有返回值时是Runable
                try {
                    Thread.sleep(2000);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
                int i = 1 / 0;
                return "OK";
            }, threadPool).whenComplete((v, e) -> { //BiComsumer  ，当是一个参数时是Comsumer
                //不管程序是否出错，这个都会执行
                if (e == null) {
                    System.out.println("1");
                }
            }).exceptionally(e -> { //Function
                //只有e != null (有异常)时这个方法才会执行
                System.out.println("2");
                return null;
            });
            System.out.println(exceptionally.get());
            System.out.println("主线程先去忙其它事情了~");

        } catch (Exception e) {
            System.out.println("使用Completable异常");
        } finally {
            threadPool.shutdown();
        }
    }
}

```

函数式接口复习：

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16543892117121654389210944.png)

### \[\_7\_] 实战前扫盲

1）链式设置类的参数值

```java
package com.zhuangjie.javaJUC;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

public class _7_实战前学习 {
    public static void main(String[] args) {
        ABC abc = new ABC();
        abc.setName("小庄").setAge(22).setOccupation("IT");
        System.out.println(abc);
    }

}
@AllArgsConstructor
@NoArgsConstructor
@Data
@Accessors(chain = true) //开启链式编程，由一行一行地set通过链式编程，合成一行
@ToString
class ABC{
    private String name;
    private int age;
    private String occupation;



}

```

2）我们在使用get获取CompletableFuture时，会进行在编译期间，会做检查异常，即要做异常的处理try或放在方法上。

而jon就不做编译期间异常检查，不会进行异常处理，但出现异常该抛还是要抛的。
