# 自定义mvc

## 目录

### +基本流程

SpringMVC执⾏的⼤致原理，后续根据这个模仿⼿写⾃⼰的mvc框架

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16518039193031651803918613.png)

全部代码：[https://github.com/18476305640/fileBox/raw/master/杂项/springmvc.zip](https://github.com/18476305640/fileBox/raw/master/杂项/springmvc.zip "https://github.com/18476305640/fileBox/raw/master/杂项/springmvc.zip")

### \[\_1\_] 搭建基本框架

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16518159368001651815936654.png)

*   pom.xml 依赖

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <groupId>com.zhuangjie</groupId>
      <artifactId>springmvc</artifactId>
      <version>1.0-SNAPSHOT</version>
      <packaging>war</packaging>

      <name>springmvc Maven Webapp</name>
      <!-- FIXME change it to the project's website -->
      <url>http://www.example.com</url>

      <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
      </properties>

      <dependencies>
        <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>4.11</version>
          <scope>test</scope>
        </dependency>

        <!--引入spring webmvc的依赖-->
        <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
          <version>5.1.12.RELEASE</version>
        </dependency>
        <!--不引入，HttpServletRequest , HttpServletResponse , HttpSession 都不能引入，项目可以运行，是因为这个依赖在tomcat中有 -->
        <dependency>
          <groupId>javax.servlet</groupId>
          <artifactId>javax.servlet-api</artifactId>
          <version>3.1.0</version>
          <scope>provided</scope>
        </dependency>


        <!--json数据交互所需jar，start-->
        <dependency>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-core</artifactId>
          <version>2.9.0</version>
        </dependency>
        <dependency>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-databind</artifactId>
          <version>2.9.0</version>
        </dependency>
        <dependency>
          <groupId>com.fasterxml.jackson.core</groupId>
          <artifactId>jackson-annotations</artifactId>
          <version>2.9.0</version>
        </dependency>






      <build>
        <!--不写报错，指定一些目录或文件文件的位置-->
        <resources>
          <resource>
            <directory>src/main/java</directory>
            <includes>
              <include>**/*.properties</include>
              <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
          </resource>
          <resource>
            <directory>src/main/resources</directory>
            <includes>
              <include>**/*.properties</include>
              <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
          </resource>
        </resources>
        <!--    <finalName>demo</finalName> 自定义打包名-->
        <plugins>
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>2.2</version>
          </plugin>

          <!--编译插件定义编译细节 “自定义mvc框架“加入的-->
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.1</version>
            <configuration>
              <source>1.8</source>
              <target>1.8</target>
              <encoding>utf-8</encoding>
              <!--告诉编译器，编译的时候记录下形参的真实名称-->
              <compilerArgs>
                <arg>-parameters</arg>
              </compilerArgs>
            </configuration>
          </plugin>
        </plugins>





      </build>

    </project>

    ```

创建一个`LgDispatcherServlet`类, 替代DispatcherServlet类：

LgDispatcherServlet.java ：继承HttpServlet 重写doGet、doPost、init三个方法（里面的内容后面补充）。

```java
package com.zhuangjie.springmvc.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class LgDispatcherServlet extends HttpServlet {
    private Properties properties = new Properties();

    @Override
    public void init(ServletConfig config) throws ServletException {
       
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求
    }


}

```

*   本步最终

    LgDispatcherServlet.java

    ```java
    package com.zhuangjie.springmvc.servlet;

    import javax.servlet.ServletConfig;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.io.IOException;
    import java.io.InputStream;
    import java.util.Properties;

    public class LgDispatcherServlet extends HttpServlet {

        @Override
        public void init(ServletConfig config) throws ServletException {
            //1.加载配置文件 springmvc.properties
            String contextConfigLocation = config.getInitParameter("contextConfigLocation");
            doLoadConfig(contextConfigLocation);
            //2.扫描相关的类，扫描注解
             doScan(properties.getProperty("scanPackage"));
            //3。初始化bean对象（实现ioc容器，基于注解）
            doInstance();
            //4.实现依赖注入
            doAutoWired();
            //5.构造一个HandlerMapping处理器映射器，将配置好的url和Method建立映射关系
            initHandlerMapping();

            System.out.println("lagou mvc初始化完成....");
            //等待请求进入，处理请求
        }

        //构造一个HandlerMapping处理器映射器，将配置好的url和Method建立映射关系。
        private void initHandlerMapping() {

        }

        //实现依赖注入
        private void doAuthWired() {

        }

        //ioc容器
        private void doInstance() {

        }

        //扫描类
        private void doScan(String scanPackage) {

        }
        //加载配置文件
        private void doLoadConfig(String contextConfigLocation) {

        }

        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            super.doPost(req, resp);
        }

        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            //处理请求
        }


    }

    ```

springmvc.properties：在资源包resources中创建springmvc.properties文件，里面配置要扫描的包

```.properties
scanPackage=com.zhuangjie.springmvc.demo
```

web.xml：配置LgDispatcherServlet, 并在servlet中配置`init-param`标签。

```xml
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>

  <servlet>
    <servlet-name>lgmvc</servlet-name>
    <servlet-class>com.zhuangjie.springmvc.servlet.LgDispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>springmvc.properties</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>lgmvc</servlet-name>
    <url-pattern>/*</url-pattern>
  </servlet-mapping>


</web-app>


```

创建三个注解：

*   LagouAutowired.java

    ```java
    package com.zhuangjie.springmvc.annotations;

    import java.lang.annotation.*;

    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface LagouAutowired {
        String value() default "";
    }

    ```

*   LagouController.java

    ```java
    package com.zhuangjie.springmvc.annotations;

    import java.lang.annotation.*;

    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface LagouController {
        String value() default "";
    }

    ```

*   LagouRequestMapping.java

    ```java
    package com.zhuangjie.springmvc.annotations;

    import java.lang.annotation.*;

    @Documented
    @Target({ElementType.TYPE,ElementType.METHOD})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface LagouRequestMapping {
        String value() default "";

    }

    ```

*   LagouService.java

    ```java
    package com.zhuangjie.springmvc.annotations;

    import java.lang.annotation.*;

    @Documented
    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface LagouService {
        String value() default "";
    }

    ```

### \[\_2\_] doLoadConfig扫描类的完善

以下操作的是：LgDispatcherServlet.java

```java
//在成员变量中加入
private Properties properties = new Properties();
//完善 加载配置文件
    private void doLoadConfig(String contextConfigLocation) {
        InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream(contextConfigLocation);
        try {
            properties.load(resourceAsStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


```

### \[\_3\_] 完善doScan

```java
private List<String> clashNames = new ArrayList<>(); //缓存扫描到的全限定类名
    //扫描类
    private void doScan(String scanPackage) {
        String scanPackagePath = Thread.currentThread().getContextClassLoader().getResource("").getPath() + scanPackage.replaceAll("\\.", "/");
        File pack = new File(scanPackagePath);
        File[] files = pack.listFiles();
        for (File file: files) {
            if (file.isDirectory()) { //子package
                // 递归
                doScan(scanPackage+"."+file.getName());
            }else if (file.getName().endsWith(".class")) {
                String clashName = scanPackage + "." + file.getName().replaceAll(".class", "");
                clashNames.add(clashName);
            }
        }
    }
```

### \[\_4\_] 完善doInstance　

```java
// ioc容器
private Map<String,Object> ioc = new HashMap<String,Object>();

// ioc容器
// 基于classNames缓存的类的全限定类名，以及反射技术，完成对象创建和管理
  private void doInstance()  {

      if(classNames.size() == 0) return;

      try{

          for (int i = 0; i < classNames.size(); i++) {
              String className =  classNames.get(i);  // com.lagou.demo.controller.DemoController

              // 反射
              Class<?> aClass = Class.forName(className);
              // 区分controller，区分service'
              if(aClass.isAnnotationPresent(LagouController.class)) {
                  // controller的id此处不做过多处理，不取value了，就拿类的首字母小写作为id，保存到ioc中
                  String simpleName = aClass.getSimpleName();// DemoController
                  String lowerFirstSimpleName = lowerFirst(simpleName); // demoController
                  Object o = aClass.newInstance();
                  ioc.put(lowerFirstSimpleName,o);
              }else if(aClass.isAnnotationPresent(LagouService.class)) {
                  LagouService annotation = aClass.getAnnotation(LagouService.class);
                  //获取注解value值
                  String beanName = annotation.value();

                  // 如果指定了id，就以指定的为准
                  if(!"".equals(beanName.trim())) {
                      ioc.put(beanName,aClass.newInstance());
                  }else{
                      // 如果没有指定，就以类名首字母小写
                      beanName = lowerFirst(aClass.getSimpleName());
                      ioc.put(beanName,aClass.newInstance());
                  }


                  // service层往往是有接口的，面向接口开发，此时再以接口名为id，放入一份对象到ioc中，便于后期根据接口类型注入
                  Class<?>[] interfaces = aClass.getInterfaces();
                  for (int j = 0; j < interfaces.length; j++) {
                      Class<?> anInterface = interfaces[j];
                      // 以接口的全限定类名作为id放入
                      ioc.put(anInterface.getName(),aClass.newInstance());
                  }
              }else{
                  continue;
              }

          }
      }catch (Exception e) {
          e.printStackTrace();
      }






  }


  // 首字母小写方法
  public String lowerFirst(String str) {
      char[] chars = str.toCharArray();
      if('A' <= chars[0] && chars[0] <= 'Z') {
          chars[0] += 32;
      }
      return String.valueOf(chars);
  }
```

### \[\_5\_] doAutoWired自动注入

```java
//  实现依赖注入
    private void doAutoWired() {
        if(ioc.isEmpty()) {return;}

        // 有对象，再进行依赖注入处理

        // 遍历ioc中所有对象，查看对象中的字段，是否有@LagouAutowired注解，如果有需要维护依赖注入关系
        for(Map.Entry<String,Object> entry: ioc.entrySet()) {
            // 获取bean对象中的字段信息
            Field[] declaredFields = entry.getValue().getClass().getDeclaredFields();
            // 遍历判断处理
            for (int i = 0; i < declaredFields.length; i++) {
                Field declaredField = declaredFields[i];   //  @LagouAutowired  private IDemoService demoService;
                if(!declaredField.isAnnotationPresent(LagouAutowired.class)) {
                    continue;
                }


                // 有该注解
                LagouAutowired annotation = declaredField.getAnnotation(LagouAutowired.class);
                String beanName = annotation.value();  // 需要注入的bean的id
                if("".equals(beanName.trim())) {
                    // 没有配置具体的bean id，那就需要根据当前字段类型注入（接口注入）  IDemoService
                    beanName = declaredField.getType().getName();
                }

                // 开启赋值
                declaredField.setAccessible(true);

                try {
                    declaredField.set(entry.getValue(),ioc.get(beanName));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }

            }


        }




    }
```

### \[\_6\_] initHandlerMapping

创建一个Handler类：

```java
package com.zhuangjie.springmvc.pojo;

import javax.sound.midi.MetaEventListener;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;


/**
 * 封装handler方法相关的信息
 */
public class Handler {

    private Object controller; // method.invoke(obj,)

    private Method method;

    private Pattern pattern; // spring中url是支持正则的

    private Map<String,Integer> paramIndexMapping; // 参数顺序,是为了进行参数绑定，key是参数名，value代表是第几个参数 <name,2>


    public Handler(Object controller, Method method, Pattern pattern) {
        this.controller = controller;
        this.method = method;
        this.pattern = pattern;
        this.paramIndexMapping = new HashMap<>();
    }

    public Object getController() {
        return controller;
    }

    public void setController(Object controller) {
        this.controller = controller;
    }

    public Method getMethod() {
        return method;
    }

    public void setMethod(Method method) {
        this.method = method;
    }

    public Pattern getPattern() {
        return pattern;
    }

    public void setPattern(Pattern pattern) {
        this.pattern = pattern;
    }

    public Map<String, Integer> getParamIndexMapping() {
        return paramIndexMapping;
    }

    public void setParamIndexMapping(Map<String, Integer> paramIndexMapping) {
        this.paramIndexMapping = paramIndexMapping;
    }
}

```

继续完善LgDispatcherServlet.java: 加入了一个成员变量`handlerMapping ` , 实现了方法initHandlerMapping方法。

```java
 // handlerMapping
    //private Map<String,Method> handlerMapping = now HashMap<>(); // 存储url和Method之间的映射关系
    private List<Handler> handlerMapping = new ArrayList<>(); 

    
    //构造一个HandlerMapping处理器映射器，将配置好的url和Method建立映射关系。
    /*
        构造一个HandlerMapping处理器映射器
        最关键的环节
        目的：将url和method建立关联
     */

    /*
        构造一个HandlerMapping处理器映射器
        最关键的环节
        目的：将url和method建立关联
     */
    private void initHandlerMapping() {
        if(ioc.isEmpty()) {return;}

        for(Map.Entry<String,Object> entry: ioc.entrySet()) {
            // 获取ioc中当前遍历的对象的class类型
            Class<?> aClass = entry.getValue().getClass();


            if(!aClass.isAnnotationPresent(LagouController.class)) {continue;}


            String baseUrl = "";
            if(aClass.isAnnotationPresent(LagouRequestMapping.class)) {
                LagouRequestMapping annotation = aClass.getAnnotation(LagouRequestMapping.class);
                baseUrl = annotation.value(); // 等同于/demo
            }


            // 获取方法
            Method[] methods = aClass.getMethods();
            for (int i = 0; i < methods.length; i++) {
                Method method = methods[i];

                //  方法没有标识LagouRequestMapping，就不处理
                if(!method.isAnnotationPresent(LagouRequestMapping.class)) {continue;}

                // 如果标识，就处理
                LagouRequestMapping annotation = method.getAnnotation(LagouRequestMapping.class);
                String methodUrl = annotation.value();  // /query
                String url = baseUrl + methodUrl;    // 计算出来的url /demo/query

                // 把method所有信息及url封装为一个Handler
                Handler handler = new Handler(entry.getValue(),method, Pattern.compile(url));


                // 计算方法的参数位置信息  // query(HttpServletRequest request, HttpServletResponse response,String name)
                Parameter[] parameters = method.getParameters();
                for (int j = 0; j < parameters.length; j++) {
                    Parameter parameter = parameters[j];

                    if(parameter.getType() == HttpServletRequest.class || parameter.getType() == HttpServletResponse.class) {
                        // 如果是request和response对象，那么参数名称写HttpServletRequest和HttpServletResponse
                        handler.getParamIndexMapping().put(parameter.getType().getSimpleName(),j);
                    }else{
                        handler.getParamIndexMapping().put(parameter.getName(),j);  // <name,2>
                    }

                }


                // 建立url和method之间的映射关系（map缓存起来）
                handlerMapping.add(handler);

            }


        }

    }
```

### \[\_7\_]  请求处理——完善doGet/doPost

在pom.xml中加入的依赖（因为要使用StringUtils）：

```xml
    <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-lang3</artifactId>
      <version>3.9</version>
    </dependency>
```

继续完善LgDispatcherServlet.java：加入getHandler方法，实现补充doGet/doPost方法

```java
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理请求：根据url，找到对应的Method方法，进行调用
        // 获取uri
//        String requestURI = req.getRequestURI();
//        Method method = handlerMapping.get(requestURI);// 获取到一个反射的方法
        // 反射调用，需要传入对象，需要传入参数，此处无法完成调用，没有把对象缓存起来，也没有参数！！！！改造initHandlerMapping();
//        method.invoke() //


        // 根据uri获取到能够处理当前请求的hanlder（从handlermapping中（list））
        Handler handler = getHandler(req);

        if(handler == null) {
            resp.getWriter().write("404 not found");
            return;
        }

        // 参数绑定
        // 获取所有参数类型数组，这个数组的长度就是我们最后要传入的args数组的长度
        Class<?>[] parameterTypes = handler.getMethod().getParameterTypes();


        // 根据上述数组长度创建一个新的数组（参数数组，是要传入反射调用的）
        Object[] paraValues = new Object[parameterTypes.length];

        // 以下就是为了向参数数组中塞值，而且还得保证参数的顺序和方法中形参顺序一致

        Map<String, String[]> parameterMap = req.getParameterMap();

        // 遍历request中所有参数  （填充除了request，response之外的参数）
        for(Map.Entry<String,String[]> param: parameterMap.entrySet()) {
            // name=1&name=2   name [1,2]
            String value = StringUtils.join(param.getValue(), ",");  // 如同 1,2

            // 如果参数和方法中的参数匹配上了，填充数据
            if(!handler.getParamIndexMapping().containsKey(param.getKey())) {continue;}

            // 方法形参确实有该参数，找到它的索引位置，对应的把参数值放入paraValues
            Integer index = handler.getParamIndexMapping().get(param.getKey());//name在第 2 个位置

            paraValues[index] = value;  // 把前台传递过来的参数值填充到对应的位置去

        }


        int requestIndex = handler.getParamIndexMapping().get(HttpServletRequest.class.getSimpleName()); // 0
        paraValues[requestIndex] = req;


        int responseIndex = handler.getParamIndexMapping().get(HttpServletResponse.class.getSimpleName()); // 1
        paraValues[responseIndex] = resp;




        // 最终调用handler的method属性
        try {
            handler.getMethod().invoke(handler.getController(),paraValues);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }


    }

    private Handler getHandler(HttpServletRequest req) {
        if(handlerMapping.isEmpty()){return null;}

        String url = req.getRequestURI();

        for(Handler handler: handlerMapping) {
            Matcher matcher = handler.getPattern().matcher(url);
            if(!matcher.matches()){continue;}
            return handler;
        }

        return null;

    }
```

### +测试

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16518312565951651831256352.png)

创建dome目录，在该目录下创建类

LgController.java

```java
package com.zhuangjie.springmvc.demo;

import com.zhuangjie.springmvc.annotations.LagouController;
import com.zhuangjie.springmvc.annotations.LagouRequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@LagouController
@LagouRequestMapping("/demo")
public class LgController {
   
    @LagouRequestMapping("/zjazn")
     //这里如果不写方法参数的话，是不行，会出现问题
    public void lgdemo(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("执行了~");
    }
}

```

然后启动tomcat.访问：[http://localhost:8080/demo/zjazn](http://localhost:8080/demo/zjazn "http://localhost:8080/demo/zjazn")

然后查看后台输出。
