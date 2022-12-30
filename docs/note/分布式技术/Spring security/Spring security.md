# Spring security

## 目录

[OAuth2.0](OAuth2.0/OAuth2.0.md "OAuth2.0")

[Http](Http/Http.md "Http")

本内容学习资源

视频：

[https://www.bilibili.com/video/BV1vt4y1i7zA?from=search\&seid=2356952015557502242\&spm\_id\_from=333.337.0.0](https://www.bilibili.com/video/BV1vt4y1i7zA?from=search\&seid=2356952015557502242\&spm_id_from=333.337.0.0 "https://www.bilibili.com/video/BV1vt4y1i7zA?from=search\&seid=2356952015557502242\&spm_id_from=333.337.0.0")

链接: [https://pan.baidu.com/s/1NNSHI\_FsryRwBaz41Qez3g](https://pan.baidu.com/s/1NNSHI_FsryRwBaz41Qez3g "https://pan.baidu.com/s/1NNSHI_FsryRwBaz41Qez3g") 提取码: u637

### - 认证与授权的概述

**认证**：通过用户名和密码成功登陆系统后，让系统得到当前用户的角色身份。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533510746731653351074473.png)

**授权**：系统根据当前用户的角色（返回该用户有哪些权限），给其授予对应可以操作的权限资源。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533511071401653351107032.png)

**完成认证与授权需要的三个对象：**

用户：主要包含用户名，密码和当前用户的角色信息，可实现认证操作。 &#x20;

角色：主要包含角色名称，角色描述和当前角色拥有的权限信息，可实现授权操作。 &#x20;

权限：权限也可以称为菜单，主要包含当前权限名称，url地址等信息，可实现动态展示菜单。 &#x20;

> 注：这三个对象中，用户与角色是多对多的关系，角色与权限是多对多的关系，用户与权限没有直接关系，  二者是通过角色来建立关联关系的。

### \[\_1-1\_] 整合到springmvc

*   依赖

    需要的jar:

    Spring Security主要jar包功能介绍 &#x20;

    `spring-security-core.jar `

    核心包，任何Spring Security功能都需要此包。 &#x20;

    `spring-security-web.jar  `

    web工程必备，包含过滤器和相关的Web安全基础结构代码。 &#x20;

    `spring-security-config.jar  `

    用于解析xml配置文件，用到Spring Security的xml配置文件的就要用到此包。 &#x20;

    `spring-security-taglibs.jar  `

    Spring Security提供的动态标签库，jsp页面可以用。

    pom.xml：maven由于依赖传递，我们只需要引入下面两个依赖即可。

    ```xml
            <!--追加security依赖-->
            <!--spring-security-taglibs 还包含了spring-security-web.jar、pring-security-core.jar   -->
             <dependency>
                <groupId>org.springframework.security</groupId>
                <artifactId>spring-security-taglibs</artifactId>
                <version>5.1.5.RELEASE</version>
            </dependency>
            <!--spring-security-config也包含了spring-security-core.jar -->
            <dependency>
                <groupId>org.springframework.security</groupId>
                <artifactId>spring-security-config</artifactId>
                <version>5.1.5.RELEASE</version>
            </dependency>
    ```

*   web.xml

    ```xml
        <!--springsecurity配置
        Spring Security过滤器链，注意过滤器名称必须叫springSecurityFilterChain
        “springSecurityFilterChain” 是固定的。
        -->
        <filter>
            <filter-name>springSecurityFilterChain</filter-name>
            <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
        </filter>
        <filter-mapping>
            <filter-name>springSecurityFilterChain</filter-name>
            <url-pattern>/*</url-pattern>
        </filter-mapping>
    ```

*   resource > spring-security.xml

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:context="http://www.springframework.org/schema/context"
           xmlns:aop="http://www.springframework.org/schema/aop"
           xmlns:tx="http://www.springframework.org/schema/tx"
           xmlns:security="http://www.springframework.org/schema/security"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/security
    http://www.springframework.org/schema/security/spring-security.xsd">

        <!--设置可以用spring的el表达式配置Spring Security并自动生成对应配置组件（过滤器）-->
        <security:http auto-config="true" use-expressions="true">
            <!--使用spring的el表达式来指定项目所有资源访问都必须有ROLE_USER或ROLE_ADMIN角色-->
            <security:intercept-url pattern="/**" access="hasAnyRole('ROLE_USER','ROLE_ADMIN')"/>
        </security:http>


    <!--    &lt;!&ndash;设置Spring Security认证用户信息的来源-->
    <!--        用来暂时免去数据库配置-->
    <!--    &ndash;&gt;-->
    <!--    <security:authentication-manager>-->
    <!--        <security:authentication-provider>-->
    <!--            <security:user-service>-->
    <!--                <security:user name="user" password="{noop}user"-->
    <!--                               authorities="ROLE_USER" />-->
    <!--                <security:user name="admin" password="{noop}admin"-->
    <!--                               authorities="ROLE_ADMIN" />-->
    <!--            </security:user-service>-->
    <!--        </security:authentication-provider>-->
    <!--    </security:authentication-manager>-->


      
    </beans>
    ```

*   resource > applicationContext.xml

    ```xml
        <!--spring-security.xml主配置文件 需要被加载-->
        <import resource="classpath:spring-security.xml"/>
    ```

*   测试

    随便访问一个页面，会跳到springsecurity自带的登录页，需要注意的，也是我们想自定义登录页，排查问题的一条重要线索！

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526895842641652689583497.png)

### - 过滤器链

我们在启动项目时，会经过很多过滤器

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526899385561652689938462.png)

*   springsecurity有哪些过滤器？

    过滤器是一种典型的AOP思想，关于什么是过滤器，就不赘述了，谁还不知道凡是web工程都能用过滤器？ &#x20;

    接下来咱们就一起看看Spring Security中这些过滤器都是干啥用的，源码我就不贴出来了，有名字，大家可以自 &#x20;

    己在idea中Double Shift去。我也会在后续的学习过程中穿插详细解释。 &#x20;

    1.  org.springframework.security.web.context.SecurityContextPersistenceFilter &#x20;

    首当其冲的一个过滤器，作用之重要，自不必多言。 &#x20;

    SecurityContextPersistenceFilter主要是使用SecurityContextRepository在session中保存或更新一个 &#x20;

    SecurityContext，并将SecurityContext给以后的过滤器使用，来为后续filter建立所需的上下文。 &#x20;

    SecurityContext中存储了当前用户的认证以及权限信息。 &#x20;

    1.  org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter &#x20;

    此过滤器用于集成SecurityContext到Spring异步执行机制中的WebAsyncManager &#x20;

    1.  org.springframework.security.web.header.HeaderWriterFilter &#x20;

    向请求的Header中添加相应的信息,可在http标签内部使用security:headers来控制 &#x20;

    1.  org.springframework.security.web.csrf.CsrfFilter &#x20;

    csrf又称跨域请求伪造，SpringSecurity会对所有post请求验证是否包含系统生成的csrf的token信息， &#x20;

    如果不包含，则报错。起到防止csrf攻击的效果。 &#x20;

    1.  org.springframework.security.web.authentication.logout.LogoutFilter

    匹配URL为/logout的请求，实现用户退出,清除认证信息。 &#x20;

    1.  org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter &#x20;

    认证操作全靠这个过滤器，默认匹配URL为/login且必须为POST请求。 &#x20;

    1.  org.springframework.security.web.authentication.ui.DefaultLoginPageGeneratingFilter &#x20;

    如果没有在配置文件中指定认证页面，则由该过滤器生成一个默认认证页面。 &#x20;

    1.  org.springframework.security.web.authentication.ui.DefaultLogoutPageGeneratingFilter &#x20;

    由此过滤器可以生产一个默认的退出登录页面 &#x20;

    1.  org.springframework.security.web.authentication.[www.BasicAuthenticationFilter](http://www.BasicAuthenticationFilter) &#x20;

    此过滤器会自动解析HTTP请求中头部名字为Authentication，且以Basic开头的头信息。 &#x20;

    1.  org.springframework.security.web.savedrequest.RequestCacheAwareFilter &#x20;

    通过HttpSessionRequestCache内部维护了一个RequestCache，用于缓存HttpServletRequest &#x20;

    1.  org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter &#x20;

    针对ServletRequest进行了一次包装，使得request具有更加丰富的API &#x20;

    1.  org.springframework.security.web.authentication.AnonymousAuthenticationFilter &#x20;

    当SecurityContextHolder中认证信息为空,则会创建一个匿名用户存入到SecurityContextHolder中。 &#x20;

    spring security为了兼容未登录的访问，也走了一套认证流程，只不过是一个匿名的身份。 &#x20;

    1.  org.springframework.security.web.session.SessionManagementFilter &#x20;

    SecurityContextRepository限制同一用户开启多个会话的数量 &#x20;

    1.  org.springframework.security.web.access.ExceptionTranslationFilter &#x20;

    异常转换过滤器位于整个springSecurityFilterChain的后方，用来转换整个链路中出现的异常 &#x20;

    1.  org.springframework.security.web.access.intercept.FilterSecurityInterceptor &#x20;

    获取所配置资源访问的授权信息，根据SecurityContextHolder中存储的用户信息来决定其是否有权限。 &#x20;

    好了！这一堆排山倒海的过滤器介绍完了。 &#x20;

    那么，是不是spring security一共就这么多过滤器呢？答案是否定的！随着spring-security.xml配置的添加，还  会出现新的过滤器。  那么，是不是spring security每次都会加载这些过滤器呢？答案也是否定的！随着spring-security.xml配置的修改，有些过滤器可能会被去掉。

*   过滤器链，在哪里装载的？

    DelegatingFilterProxy：

    ```java
    public class DelegatingFilterProxy extends GenericFilterBean {
      @Nullable
      private String contextAttribute;
      @Nullable
      private WebApplicationContext webApplicationContext;
      @Nullable
      private String targetBeanName;
      private Boolean targetFilterLifecycle;
      @Nullable
      private volatile Filter delegate;
      //注：这个过滤器才是真正加载的过滤器
      private final Object delegateMonitor;
      //注：doFilter才是过滤器的入口，直接从这看！
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain
      filterChain) throws ServletException, IOException {
        Filter delegateToUse = this.delegate;
        if (delegateToUse == null) {
          synchronized(this.delegateMonitor) {
            delegateToUse = this.delegate;
            if (delegateToUse == null) {
              WebApplicationContext wac = this.findWebApplicationContext();
              if (wac == null) {
                throw new IllegalStateException("No WebApplicationContext found: no
    ContextLoaderListener or DispatcherServlet registered?");
              }
              //第一步：doFilter中最重要的一步，初始化上面私有过滤器属性delegate
              delegateToUse = this.initDelegate(wac);
            }
            this.delegate = delegateToUse;
          }
        }
        /
        /第三步：执行FilterChainProxy过滤器
        this.invokeDelegate(delegateToUse, request, response, filterChain);
      }
      /
      /第二步：直接看最终加载的过滤器到底是谁
      protected Filter initDelegate(WebApplicationContext wac) throws ServletException {
        //debug得知targetBeanName为：springSecurityFilterChain
        String targetBeanName = this.getTargetBeanName();
        Assert.state(targetBeanName != null, "No target bean name set");
        //debug得知delegate对象为：FilterChainProxy
        Filter delegate = (Filter)wac.getBean(targetBeanName, Filter.class);
        if (this.isTargetFilterLifecycle()) {
          delegate.init(this.getFilterConfig());
        }
        return delegate;
      }
      protected void invokeDelegate(Filter delegate, ServletRequest request, ServletResponse
      response, FilterChain filterChain) throws ServletException, IOException {
        delegate.doFilter(request, response, filterChain);
      }
    }
    ```

    FilterChainProxy：

    ```java
    public class FilterChainProxy extends GenericFilterBean {
      private static final Log logger = LogFactory.getLog(FilterChainProxy.class);
      private static final String FILTER_APPLIED =
      FilterChainProxy.class.getName().concat(".APPLIED");
      private List<SecurityFilterChain> filterChains;
      private FilterChainProxy.FilterChainValidator filterChainValidator;
      private HttpFirewall firewall;
      //咿！？可以通过一个叫SecurityFilterChain的对象实例化出一个FilterChainProxy对象
      //这FilterChainProxy又是何方神圣？会不会是真正的过滤器链对象呢？先留着这个疑问！
      public FilterChainProxy(SecurityFilterChain chain) {
        this(Arrays.asList(chain));
      }
      //又是SecurityFilterChain这家伙！嫌疑更大了！
      public FilterChainProxy(List<SecurityFilterChain> filterChains) {
        this.filterChainValidator = new FilterChainProxy.NullFilterChainValidator();
        this.firewall = new StrictHttpFirewall();
        this.filterChains = filterChains;
      }
      /
      /注：直接从doFilter看
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
        Boolean clearContext = request.getAttribute(FILTER_APPLIED) == null;
        if (clearContext) {
          try {
            request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
            this.doFilterInternal(request, response, chain);
          }
          finally {
            SecurityContextHolder.clearContext();
            request.removeAttribute(FILTER_APPLIED);
          }
        } else {
          //第一步：具体操作调用下面的doFilterInternal方法了
          this.doFilterInternal(request, response, chain);
        }
      }
      private void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain
      chain) throws IOException, ServletException {
        FirewalledRequest fwRequest =
        this.firewall.getFirewalledRequest((HttpServletRequest)request);
        HttpServletResponse fwResponse =
        this.firewall.getFirewalledResponse((HttpServletResponse)response);
        //第二步：封装要执行的过滤器链，那么多过滤器就在这里被封装进去了！
        List<Filter> filters = this.getFilters((HttpServletRequest)fwRequest);
        if (filters != null && filters.size() != 0) {
          FilterChainProxy.VirtualFilterChain vfc = new
          FilterChainProxy.VirtualFilterChain(fwRequest, chain, filters);
          //第四步：加载过滤器链
          vfc.doFilter(fwRequest, fwResponse);
        } else {
          if (logger.isDebugEnabled()) {
            logger.debug(UrlUtils.buildRequestUrl(fwRequest) + (filters == null ? " has no
    matching filters" : " has an empty filter list"));
          }
          fwRequest.reset();
          chain.doFilter(fwRequest, fwResponse);
        }
      }
      private List<Filter> getFilters(HttpServletRequest request) {
        Iterator var2 = this.filterChains.iterator();
        //第三步：封装过滤器链到SecurityFilterChain中！
        SecurityFilterChain chain;
        do {
          if (!var2.hasNext()) {
            return null;
          }
          chain = (SecurityFilterChain)var2.next();
        }
        while(!chain.matches(request));
        return chain.getFilters();
      }
    }
    ```

    过滤器还真是都被封装进SecurityFilterChain中了。

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526952933701652695293281.png)

### \[\_1-2\_] 自定义登录与登出页面

*   去配置spring-security.xml

    原来的这点配置：

    ```xml
        <!--设置可以用spring的el表达式配置Spring Security并自动生成对应配置组件（过滤器）-->
        <security:http auto-config="true" use-expressions="true">
            <!--使用spring的el表达式来指定项目所有资源访问都必须有ROLE_USER或ROLE_ADMIN角色-->
            <security:intercept-url pattern="/**" access="hasAnyRole('ROLE_USER','ROLE_ADMIN')"/>
        </security:http>
    ```

    变为现在的：

    ```xml
        <!--【4】直接释放无需经过SpringSecurity过滤器的静态资源-->
        <security:http pattern="/css/**" security="none"/>
        <security:http pattern="/img/**" security="none"/>
        <security:http pattern="/plugins/**" security="none"/>
        <security:http pattern="/failer.jsp" security="none"/>
        <security:http pattern="/favicon.ico" security="none"/>

        <!--设置可以用spring的el表达式配置Spring Security并自动生成对应配置组件（过滤器）-->
        <security:http auto-config="true" use-expressions="true">
            <!--【3】指定login.jsp页面可以被匿名访问-->
            <security:intercept-url pattern="/login.jsp" access="permitAll()"/>

            <!--使用spring的el表达式来指定项目所有资源访问都必须有ROLE_USER或ROLE_ADMIN角色-->
            <security:intercept-url pattern="/**" access="hasAnyRole('ROLE_ADMIN')"/>

            <!--【1】指定自定义的认证页面
                    自定义登录页面
                    处理器
                    登录成功跳转的页面
                    登录失败跳转的页面
                    账号/密码 input名
            -->
            <security:form-login login-page="/login.jsp"
                                 login-processing-url="/login"
                                 default-target-url="/index.jsp"
                                 authentication-failure-url="/failer.jsp"
                                 username-parameter="username" password-parameter="password"/>
            <!--【2】指定退出登录后跳转的页面
                    登出页面
                    拿出后跳转的页面
            -->
            <security:logout logout-url="/logout"
                             logout-success-url="/login.jsp"/>


        </security:http>
    ```

*   我们自定义的登录页面

    login.jsp：要注意的是提交到/login

    ```.properties
        <form action="${pageContext.request.contextPath}/login" method="post">
            <div class="form-group has-feedback">
              <input type="text" name="username" class="form-control"
                placeholder="用户名"> <span
                class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input type="password" name="password" class="form-control"
                placeholder="密码"> <span
                class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-8">
                <div class="checkbox icheck">
                  <label><input type="checkbox" name="remember-me" value="true"> 记住 下次自动登录</label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
    ```

启动后跳转到我们自定义的登录页面，我们提交登录信息，但提交后：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526962771681652696277098.png)

原因是因为我们自定义的表单没有`_csrf` 项。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16526895842641652689583497.png)

*   SpringSecurity中CsrfFilter过滤器说明(代码注释说明)

    ```java
    //
    // Source code recreated from a .class file by IntelliJ IDEA
    // (powered by FernFlower decompiler)
    //

    package org.springframework.security.web.csrf;

    import java.io.IOException;
    import java.util.Arrays;
    import java.util.HashSet;
    import javax.servlet.FilterChain;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.springframework.security.web.access.AccessDeniedHandler;
    import org.springframework.security.web.access.AccessDeniedHandlerImpl;
    import org.springframework.security.web.util.UrlUtils;
    import org.springframework.security.web.util.matcher.RequestMatcher;
    import org.springframework.util.Assert;
    import org.springframework.web.filter.OncePerRequestFilter;

    public final class CsrfFilter extends OncePerRequestFilter {
        public static final RequestMatcher DEFAULT_CSRF_MATCHER = new CsrfFilter.DefaultRequiresCsrfMatcher();
        private final Log logger = LogFactory.getLog(this.getClass());
        private final CsrfTokenRepository tokenRepository;
        private RequestMatcher requireCsrfProtectionMatcher;
        private AccessDeniedHandler accessDeniedHandler;

        public CsrfFilter(CsrfTokenRepository csrfTokenRepository) {
            this.requireCsrfProtectionMatcher = DEFAULT_CSRF_MATCHER;
            this.accessDeniedHandler = new AccessDeniedHandlerImpl();
            Assert.notNull(csrfTokenRepository, "csrfTokenRepository cannot be null");
            this.tokenRepository = csrfTokenRepository;
        }
        
        //通过这里可以看出SpringSecurity的csrf机制把请求方式分成两类来处理
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            request.setAttribute(HttpServletResponse.class.getName(), response);
            CsrfToken csrfToken = this.tokenRepository.loadToken(request);
            boolean missingToken = csrfToken == null;
            if (missingToken) {
                csrfToken = this.tokenRepository.generateToken(request);
                this.tokenRepository.saveToken(csrfToken, request, response);
            }

            request.setAttribute(CsrfToken.class.getName(), csrfToken);
            request.setAttribute(csrfToken.getParameterName(), csrfToken);
            //第一类："GET", "HEAD", "TRACE", "OPTIONS"四类请求可以直接通过
            if (!this.requireCsrfProtectionMatcher.matches(request)) {
                filterChain.doFilter(request, response);
            } else {
                //第二类：除去上面四类，包括POST都要被验证携带token才能通过
                String actualToken = request.getHeader(csrfToken.getHeaderName());
                if (actualToken == null) {
                    actualToken = request.getParameter(csrfToken.getParameterName());
                }

                if (!csrfToken.getToken().equals(actualToken)) {
                    if (this.logger.isDebugEnabled()) {
                        this.logger.debug("Invalid CSRF token found for " + UrlUtils.buildFullRequestUrl(request));
                    }

                    if (missingToken) {
                        this.accessDeniedHandler.handle(request, response, new MissingCsrfTokenException(actualToken));
                    } else {
                        this.accessDeniedHandler.handle(request, response, new InvalidCsrfTokenException(csrfToken, actualToken));
                    }

                } else {
                    filterChain.doFilter(request, response);
                }
            }
        }

        public void setRequireCsrfProtectionMatcher(RequestMatcher requireCsrfProtectionMatcher) {
            Assert.notNull(requireCsrfProtectionMatcher, "requireCsrfProtectionMatcher cannot be null");
            this.requireCsrfProtectionMatcher = requireCsrfProtectionMatcher;
        }

        public void setAccessDeniedHandler(AccessDeniedHandler accessDeniedHandler) {
            Assert.notNull(accessDeniedHandler, "accessDeniedHandler cannot be null");
            this.accessDeniedHandler = accessDeniedHandler;
        }

        private static final class DefaultRequiresCsrfMatcher implements RequestMatcher {
            private final HashSet<String> allowedMethods;

            private DefaultRequiresCsrfMatcher() {
                this.allowedMethods = new HashSet(Arrays.asList("GET", "HEAD", "TRACE", "OPTIONS"));
            }

            public boolean matches(HttpServletRequest request) {
                return !this.allowedMethods.contains(request.getMethod());
            }
        }
    }

    ```

*   解决方案

    **方法一：**

    spring-security.xml > `<security:http>` 标签下写 : 禁用csrf，这会导致我们失去csrf防护。

    ```xml
            <!--禁用csrf防护机制-->
            <security:csrf disabled="true"/>
    ```

    **方法二：**

    在登录页面需要有`_csrf` 这项，且value的值是服务器生成的。

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527066732051652706672419.png)

    ```.properties
    ...
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
    ...
        <security:csrfInput/>
        ...

    ```

    那么页面就有了，注意在`form`下写! , `post` 请求,否则都是没有意义的！

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527067253111652706725237.png)

*   登出

    要注意的是  `url`，且因为开启了csrf所以请求也需要是`post`，否则会报404，还需要加`_csrf的input` 否则会找403 权限不够。

    登出页面。

    ```.properties
    <%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

    ...
    <form action="${pageContext.request.contextPath}/logout" method="POST">
          <security:csrfInput/>
          <input type="submit" value="注销">
    </form>
     ....
    ```

### \[\_1-3\_] 连接数据库认证

*   重写 UserDetailsService

    在一个能被扫描的目录下，创建一个类

    MyUserDetailsService.java

    ```java
    package com.itheima.config.security;

    import com.itheima.dao.UserDao;
    import com.itheima.domain.SysRole;
    import com.itheima.domain.SysUser;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.stereotype.Component;

    import java.util.ArrayList;
    import java.util.List;

    @Component
    public class MyUserDetailsService implements UserDetailsService {
        @Autowired
        UserDao userDao;
        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            try {
                //根据用户名查询数据库
                SysUser sysUser = userDao.findByName(username);
                //如果为空返回null,返回null表达认证失败
                if (sysUser == null) {
                    return null;
                }
                //将用户拥有的role依次封装成SimpleGrantedAuthority对象加入在SimpleGrantedAuthority集合中
                List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                List<SysRole> roles = sysUser.getRoles();
                for (SysRole role:roles) {
                    authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
                }
                //分为将username 、password信息、封装好的 role 信息的SimpleGrantedAuthority数组
                return new User(sysUser.getUsername(), "{noop}"+sysUser.getPassword(),authorities);
            }catch (Exception e) {
                System.out.println(e.getMessage());
                //如果出现异常，返回null,null表达认证失败
                return null;
            }
        }
    }

    ```

*   resources > spring-security.xml：将我们重写UserDetailsService的类进行配置

    ```xml
        <!--设置Spring Security认证用户信息的来源 -->
        <security:authentication-manager>
            <security:authentication-provider user-service-ref="myUserDetailsService">
            </security:authentication-provider>
        </security:authentication-manager>
    ```

注意，如果我们要操作一些修改的操作，会触发csrf，需要csrf的input

### \[\_1-4\_] 加密认证

*   resources > spring-security.xml：之前的security:authentication-manager 标签变为以下，并添加一个BCryptPasswordEncoder 的bean。

    ```xml
        <!--设置Spring Security认证用户信息的来源
            用来暂时免去数据库配置
        -->
        <security:authentication-manager>
            <security:authentication-provider user-service-ref="myUserDetailsService">
                <!--指定认证使用的加密对象-->
                <security:password-encoder ref="passwordEncoder"/>
            </security:authentication-provider>
        </security:authentication-manager>

        <!--加密对象-->
        <bean id="passwordEncoder" class="org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder"/>
    ```

*   config > MyUserDetailsService.java：去掉 的{noop}

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527547566221652754756359.png)

    变为

    ```java
    return new User(sysUser.getUsername(), sysUser.getPassword(),authorities);
    ```

*   数据库密码的明文需要修改为BCryptPasswordEncoder 加密的。

    test > test.java

    ```java
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

    public class test {
        public static void main(String[] args) {
            String password = "3333";
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            System.out.println(bCryptPasswordEncoder.encode(password));
        }
    }


    ```

*   在创建用户时，需要将密码进行加密，再存到数据库

    示例：

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527545819321652754581800.png)

### \[\_1-5\_] 用户状态

*   数据库表的要求：需要有status这一列

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527566846201652756684088.png)

    1 代表用户状态正常

    0 代表用户不可用

*   config > MyUserDetailsService.java > loadUserByUsername方法：返回值改变, 加入了红框的内容

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16527567550881652756755026.png)

    *   这些参数是什么?

        可以看到，这个构造方法里多了四个布尔类型的构造参数，其实我们使用的三个构造参数的构造方法里这四个布尔 &#x20;

        值默认都被赋值为了true，那么这四个布尔值到底是何意思呢？ &#x20;

        boolean enabled 是否可用 &#x20;

        boolean accountNonExpired 账户是否失效 &#x20;

        boolean credentialsNonExpired 秘密是否失效 &#x20;

        boolean accountNonLocked 账户是否锁定

### \[\_1-6\_] remember me 记住我

*   源码分析

    还记得前面咱们分析认证流程时，提到的记住我功能吗？ &#x20;

    现在继续跟踪找到AbstractRememberMeServices对象的loginSuccess方法：

    ```java
    public abstract class AbstractRememberMeServices implements RememberMeServices,
    InitializingBean, LogoutHandler {
      public final void loginSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication successfulAuthentication) {
        // 判断是否勾选记住我
        // 注意：这里this.parameter点进去是上面的private String parameter = "remember-me";
        if (!this.rememberMeRequested(request, this.parameter)) {
          this.logger.debug("Remember-me login not requested.");
        } else {
          //若勾选就调用onLoginSuccess方法
          this.onLoginSuccess(request, response, successfulAuthentication);
        }
      }
    }
    ```

    再点进去上面if判断中的rememberMeRequested方法，还在当前类中：

    ```java
    protected Boolean rememberMeRequested(HttpServletRequest request, String parameter) {
      if (this.alwaysRemember) {
        return true;
      } else {
        // 从上面的字parameter的值为"remember-me"
        // 也就是说，此功能提交的属性名必须为"remember-me"
        String paramValue = request.getParameter(parameter);
        // 这里我们看到属性值可以为：true，on，yes，1。
        if (paramValue != null && (paramValue.equalsIgnoreCase("true") ||
        paramValue.equalsIgnoreCase("on") || paramValue.equalsIgnoreCase("yes") ||
        paramValue.equals("1"))) {
          //满足上面条件才能返回true
          return true;
        } else {
          if (this.logger.isDebugEnabled()) {
            this.logger.debug("Did not send remember-me cookie (principal did not set
    parameter '" + parameter + "')");
          }
          return false;
        }
      }
    }

    ```

    如果上面方法返回true，就表示页面勾选了记住我选项了。 &#x20;

    继续顺着调用的方法找到PersistentTokenBasedRememberMeServices的onLoginSuccess方法：

    ```java
    public class PersistentTokenBasedRememberMeServices extends AbstractRememberMeServices {
      protected void onLoginSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication successfulAuthentication) {
        // 获取用户名
        String username = successfulAuthentication.getName();
        this.logger.debug("Creating new persistent login for user " + username);
        //创建记住我的token
        PersistentRememberMeToken persistentToken = new PersistentRememberMeToken(username,
        this.generateSeriesData(), this.generateTokenData(), new Date());
        try {
          //将token持久化到数据库
          this.tokenRepository.createNewToken(persistentToken);
          //将token写入到浏览器的Cookie中
          this.addCookie(persistentToken, request, response);
        }
        catch (Exception var7) {
          this.logger.error("Failed to save persistent token ", var7);
        }
      }
    }
    ```

*   login.jsp

    通过分析源码，我们知道，多选框的name必须是`remember-me` 值必须是 `true，on，yes，1` 其中一个。

    ```html
    <label><input type="checkbox" name="remember-me" value="true"> 记住 下次自动登录</label>
    ```

*   resources > spring-security.xml > \<security:http> 标签下加入以下，开启remember me过滤器

    ```xml
            <!--开启remember me过滤器，设置token存储时间为60秒-->
            <security:remember-me token-validity-seconds="60"/>
    ```

*   测试

    这样登录成功后，浏览器就会生成一个cookie

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16528353033741652835302458.png)

    我退出浏览器，重新打开些网页，发现不用登录。

### \[\_1-7\_] 加强remember me的安全性

*   说明

    记住我功能方便是大家看得见的，但是安全性却令人担忧。因为Cookie毕竟是保存在客户端的，很容易盗取，而且cookie的值还与用户名、密码这些敏感数据相关，虽然加密了，但是将敏感信息存在客户端，还是不太安全。那么这就要提醒喜欢使用此功能的，用完网站要及时手动退出登录，清空认证信息。此外，SpringSecurity还提供了remember me的另一种相对更安全的实现机制 :在客户端的cookie中，仅保存一个无意义的加密串（与用户名、密码等敏感数据无关），然后在db中保存该加密串-用户信息的对应关系，自动登录时，用cookie中的加密串，到db中验证，如果通过，自动登录才算通过。

*   &#x20;创建一个数据库

    ```sql
    CREATE TABLE `persistent_logins` (
    `username` varchar(64) NOT NULL,
    `series` varchar(64) NOT NULL,
    `token` varchar(64) NOT NULL,
    `last_used` timestamp NOT NULL,
    PRIMARY KEY (`series`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    ```

*   resources → spring-security.xml > \<security:http>标签下需存在以下内容

    ```xml
    <!--
    开启remember me过滤器，
    data-source-ref="dataSource" 引用了数据库连接池
    token-validity-seconds="60" 设置token存储时间为60秒 可省略
    remember-me-parameter="remember-me" 指定记住的参数名 可省略
    -->
    <security:remember-me data-source-ref="dataSource"
    token-validity-seconds="60"
    remember-me-parameter="remember-me"/>
    ```

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16528369160241652836915940.png)

### \[\_1-8\_] 显示用户名

*   jsp获取

    ```html
    <%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
    ...
    <!--这代表登录的用户名-->
    <security:authentication property="principal.username" />
    <!--方式二 -->
    <!-- <security:authentication property="name" /> -->
    ...


    ```

*   后端控制器获取

    ```java
     //方式一
     String name = SecurityContextHolder.getContext().getAuthentication().getName();
     //方式二 ：强转为我们的用户对象SysUser来获取
     String username = ((SysUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            
    ```

### \[\_1-8\_] 权限管理 :: 让能显示的显示

XXX.jsp

```html
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

....                      
            <!-- 唯有超级管理员可以操作权限-->
            <security:authorize access="hasAnyRole('ROLE_ADMIN')">
                <!--当拥有ROLE_ADMIN权限时，显示标签里面的内容-->
              
            </security:authorize>
            
....
```

注意：存在的问题是，用户可以通过url来访问用户不具体权限的页面，所以这还不是真正地控制住。请往下看\~

### - Spring IOC容器的说明

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16528557519711652855751055.png)

被`ContextLoaderListener`类加载的是父容器，而`DispatcherServlet` 加载的配置文件对应的容器是上面父容器的子容器，一般父容器负责加载service、dao层，而子容器springmvc.xml对应的容器加载controller层。由于子容器能访问父窗口的对象，所以controller中能访问service与dao层。

### \[\_1-9\_] 权限管理 :: 对后端访问的权限管理

*   resources > springmvc.xml ：开启授权的注解支持

    下面加入约束头、与配置信息

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:context="http://www.springframework.org/schema/context"
            xmlns:aop="http://www.springframework.org/schema/aop"
            xmlns:tx="http://www.springframework.org/schema/tx"
            xmlns:mvc="http://www.springframework.org/schema/mvc"
            xmlns:security="http://www.springframework.org/schema/security"
            xsi:schemaLocation="http://www.springframework.org/schema/beans
              http://www.springframework.org/schema/beans/spring-beans.xsd
              http://www.springframework.org/schema/context
              http://www.springframework.org/schema/context/spring-context.xsd
              http://www.springframework.org/schema/aop
              http://www.springframework.org/schema/aop/spring-aop.xsd
              http://www.springframework.org/schema/tx
              http://www.springframework.org/schema/tx/spring-tx.xsd
              http://www.springframework.org/schema/mvc
              http://www.springframework.org/schema/mvc/spring-mvc.xsd
                    http://www.springframework.org/schema/security
              http://www.springframework.org/schema/security/spring-security.xsd">
        
    ...
        
        <!--
        开启权限控制注解支持
        jsr250-annotations="enabled"表示支持jsr250-api的注解，需要jsr250-api的jar包
        pre-post-annotations="enabled"表示支持spring表达式注解
        secured-annotations="enabled"这才是SpringSecurity提供的注解
        -->
        <security:global-method-security jsr250-annotations="enabled"
                                         pre-post-annotations="enabled"
                                         secured-annotations="enabled"/>
    ...
                                         
    </bean>                                     
    ```

    解惑：为什么在springmvc.xml上加, 为什么不在applicationContext.xml上加呢？

    因为我们下面要放注解是在Controller层，而Controller是被springmvc.xml扫描的，所以我们要放在springmvc.xml上，而applicationContext.xml扫描的是service、dao的。

*   在注解支持对应类或者方法上添加注解

    因为上面我们开启了三个，所以对应有三个方式，对应三个注解，任意一个都是可以的。

    XXXController.java：

    ```java
    @Controller
    @RequestMapping("/order")

    //@RolesAllowed({"ROLE_ADMIN","ROLE_ORDER"})//JSR-250注解
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ORDER')")//spring表达式注解
    //@Secured({"ROLE_ADMIN","ROLE_ORDER"})//SpringSecurity注解

    public class OrderController {
        @RequestMapping("/findAll")
        public String findAll(){
            return "order-list";
        }
    }
    ```

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16528592113201652859211241.png)

### + 优雅地显示异常

*   方式一：通过配置spring-security.xml ，只能处理403

    spring-security.xml：

    ```xml
    <!--设置可以用spring的el表达式配置Spring Security并自动生成对应配置组件（过滤器）-->
    <security:http auto-config="true" use-expressions="true">
        <!--省略其它配置-->
        <!--403异常处理-->
        <security:access-denied-handler error-page="/403.jsp"/>
    </security:http>
    ```

*   方式二：通过配置web.xml

    web.xml：

    ```xml
    <error-page>
        <error-code>403</error-code>
        <location>/403.jsp</location>
    </error-page>
    ```

*   方式三：编写异常处理器

    ControllerExceptionAdvice.java：可以放在可以被 applicationContext.xml 、spring-mvc.xml 扫描的目录下。

    ```java
    package com.itheima.config.error;

    import org.springframework.security.access.AccessDeniedException;
    import org.springframework.web.bind.annotation.ControllerAdvice;
    import org.springframework.web.bind.annotation.ExceptionHandler;

    @ControllerAdvice
    public class ControllerExceptionAdvice {

        @ExceptionHandler(AccessDeniedException.class)
        public String exceptionAdvice01() {
            return "forward:/403.jsp";

        }
        @ExceptionHandler(RuntimeException.class)
        public String exceptionAdvice02() {
            return "forward:/500.jsp";

        }

    }

    ```

### - springboot + jsp + security

完成后全部的代码：[https://github.com/18476305640/fileBox/raw/master/杂项/springsecurity-springboot.zip](https://github.com/18476305640/fileBox/raw/master/杂项/springsecurity-springboot.zip "https://github.com/18476305640/fileBox/raw/master/杂项/springsecurity-springboot.zip")

*   springboot

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <groupId>com.zhuangjie</groupId>
            <artifactId>springsecurity-springboot</artifactId>
            <version>1.0-SNAPSHOT</version>
            <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.1.3.RELEASE</version>
                <relativePath/>
            </parent>
            <packaging>war</packaging>

            <dependencies>
                <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web -->
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>

            </dependencies>

            <build>
                <resources>
                    <resource>
                        <!--源文件位置-->
                        <directory>src/main/webapp</directory>
                        <!--指定编译到META-INF/resources，该目录不能随便写-->
                        <targetPath>META-INF/resources</targetPath>
                        <!--指定要把哪些文件编译进去，**表示webapp目录及子目录，*.*表示所有文件-->
                        <includes>
                            <include>**/*.*</include>
                        </includes>
                    </resource>
                    <resource>
                        <directory>src/main/resources</directory>
                        <includes>
                            <include>**/*.*</include>
                        </includes>
                    </resource>
                </resources>
            </build>

        </project>

        ```

    *   启动类

        ```java
        @SpringBootApplication
        public class GoApplication {
            public static void main(String[] args) {
                SpringApplication.run(GoApplication.class);
            }

        }
        ```

*   整合springsecurity

    *   pom.xml

        ```xml
               <!--springsecurity依赖 3 个-->
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-security</artifactId>
                </dependency>

        <!--        <dependency>-->
        <!--            <groupId>org.springframework.boot</groupId>-->
        <!--            <artifactId>spring-boot-starter-tomcat</artifactId>-->
        <!--        </dependency>-->
                <dependency>
                    <groupId>org.apache.tomcat.embed</groupId>
                    <artifactId>tomcat-embed-jasper</artifactId>
                </dependency>

                <dependency>
                    <groupId>org.springframework.security</groupId>
                    <artifactId>spring-security-taglibs</artifactId>
                </dependency>
        ```

    *   加入web资源&#x20;

        创建目录 main > webapp&#x20;

        在pom上加入`<packaging>war</packaging>`&#x20;

        因为springboot是不打包webapp的资源的，所以在pom.xml加入

        ```xml
        <build>
                <resources>
                    <resource>
                        <!--源文件位置-->
                        <directory>src/main/webapp</directory>
                        <!--指定编译到META-INF/resources，该目录不能随便写-->
                        <targetPath>META-INF/resources</targetPath>
                        <!--指定要把哪些文件编译进去，**表示webapp目录及子目录，*.*表示所有文件-->
                        <includes>
                            <include>**/*.*</include>
                        </includes>
                    </resource>
                    <resource>
                        <directory>src/main/resources</directory>
                        <includes>
                            <include>**/*.*</include>
                        </includes>
                    </resource>
                </resources>
            </build>
        ```

        在main > webapp 目录下加入web资源文件

        [https://github.com/18476305640/fileBox/raw/master/杂项/webapp.zip](https://github.com/18476305640/fileBox/raw/master/杂项/webapp.zip "https://github.com/18476305640/fileBox/raw/master/杂项/webapp.zip")

        在resources > application.yml 下加入

        ```yaml
        spring:
          mvc:
            view:
              prefix: /pages/
              suffix: .jsp
          datasource:
        ```

        XXXController.java

        ```java
        @Controller
        @RequestMapping("/product")
        public class ProductController {

            @RequestMapping("/findAll")
            public  String findAll() {
                return "product-list";
            }
        }

        ```

    *   创建security的配置类

        与controller同级的config > SecurityConfig.java

        ```java
        package com.zhuangjie.ssb.config;

        import com.zhuangjie.ssb.service.UserService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.beans.factory.annotation.Configurable;
        import org.springframework.context.annotation.Bean;
        import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
        import org.springframework.security.config.annotation.web.builders.HttpSecurity;
        import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
        import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
        import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

        @Configurable
        @EnableWebSecurity
        public class SecurityConfig extends WebSecurityConfigurerAdapter {

            @Override
            protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                //auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
            }

            @Override
            protected void configure(HttpSecurity http) throws Exception {
                http.authorizeRequests()
                        .antMatchers("/login.jsp","/failer.jsp","/css/**","/img/**","/js/**","/plugins/**").permitAll()
                        .antMatchers("/**").hasAnyRole("USER")
                        .anyRequest()
                        .authenticated()
                        .and()
                        .formLogin()
                        .loginPage("/login.jsp")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/index.jsp")

                        .failureForwardUrl("/failer.jsp")
                        .permitAll()
                        .and()
                        .logout()
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .logoutSuccessUrl("/login.jsp")
                        .permitAll()
                        .and()
                        .csrf()
                        .disable();


            }
        }

        ```

*   整合mybaties 进行认证

    *   导入数据库

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16529448640431652944863958.png)

        [security\_authority.sql](https://github.com/18476305640/fileBox/blob/ea04d31a95876dacaa243766f8cf9f69aff381f3/%E6%9D%82%E9%A1%B9/security_authority.sql "security_authority.sql")

    *   pom.xml

        ```xml
                <!--连接数据库认证-->
                <dependency>
                    <groupId>org.mybatis.spring.boot</groupId>
                    <artifactId>mybatis-spring-boot-starter</artifactId>
                    <version>2.1.2</version>
                </dependency>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <scope>runtime</scope>
                </dependency>


                <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
                <dependency>
                    <groupId>org.projectlombok</groupId>
                    <artifactId>lombok</artifactId>
                    <version>1.18.10</version>
                    <scope>provided</scope>
                </dependency>
        ```

    *   domain 目录他去实体

        SysRole.java

        ```java
        package com.zhuangjie.ssb.domain;

        import com.fasterxml.jackson.annotation.JsonIgnore;
        import lombok.Data;
        import org.springframework.security.core.GrantedAuthority;
        @Data
        public class SysRole implements GrantedAuthority {
            private Integer id;
            private String roleName;
            private String roleDesc;

            //标记此属性不做json处理
            @JsonIgnore
            @Override
            public String getAuthority() {
                return roleName;
            }
        }

        ```

        SysUser.java

        ```java
        package com.zhuangjie.ssb.domain;

        import com.fasterxml.jackson.annotation.JsonIgnore;
        import lombok.Data;
        import org.springframework.security.core.GrantedAuthority;
        import org.springframework.security.core.userdetails.UserDetails;

        import java.util.ArrayList;
        import java.util.Collection;
        import java.util.List;

        @Data
        public class SysUser implements UserDetails {

            private Integer id;
            private String username;
            private String password;
            private Integer status;

            private List<SysRole> roles = new ArrayList<>();

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return roles;
            }

            @Override
            public String getPassword() {
                return password;
            }

            @Override
            public String getUsername() {
                return username;
            }

            @JsonIgnore
            @Override
            public boolean isAccountNonExpired() {
                return status == 1;
            }

            @JsonIgnore
            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @JsonIgnore
            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @JsonIgnore
            @Override
            public boolean isEnabled() {
                return true;
            }
        }

        ```

    *   mapper

        mapper > RoleMapper.java接口

        ```java
        package com.zhuangjie.ssb.mapper;

        import com.zhuangjie.ssb.domain.SysRole;
        import org.apache.ibatis.annotations.Mapper;
        import org.apache.ibatis.annotations.Select;

        import java.util.List;
        @Mapper //标记为mapper类
        public interface RoleMapper {
            @Select("SELECT r.id, r.role_name roleName, r.role_desc roleDesc " +
                    "FROM sys_role r, sys_user_role ur " +
                    "WHERE r.id=ur.rid AND ur.uid=#{uid}")
            List<SysRole> findByUid(Integer uid);

        }

        ```

        mapper > UserMapper.java

        ```java
        package com.zhuangjie.ssb.mapper;

        import com.zhuangjie.ssb.domain.SysUser;
        import org.apache.ibatis.annotations.*;


        import java.util.List;
        @Mapper
        public interface UserMapper {
            @Select("select * from sys_user where username=#{username}")
            @Results({
                    @Result(id = true, property = "id", column = "id"),
                    @Result(property = "roles", column = "id", javaType = List.class,
                            many = @Many(select = "com.zhuangjie.ssb.mapper.RoleMapper.findByUid"))
            })
            SysUser findByUsername(String username);

        }

        ```

    *   service

        service > UserService.java 接口

        ```java
        package com.zhuangjie.ssb.service;

        import org.springframework.security.core.userdetails.UserDetailsService;

        public interface UserService extends UserDetailsService {

        }

        ```

        service > impl > UserServiceImpl.java

        ```java
        package com.zhuangjie.ssb.service.impl;

        import com.zhuangjie.ssb.mapper.UserMapper;
        import com.zhuangjie.ssb.service.UserService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.security.core.userdetails.UserDetails;
        import org.springframework.security.core.userdetails.UsernameNotFoundException;
        import org.springframework.stereotype.Service;
        import org.springframework.transaction.annotation.Transactional;

        @Service
        @Transactional
        public class UserServiceImpl implements UserService {
            @Autowired
            private UserMapper userMapper;

            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userMapper.findByUsername(username);
            }
        }

        ```

    *   接入security ：让springsecurity可以查询数据库的用户信息进行认证

        config > SecurityConfig.java：加入的东西，请看代码中的【】标记

        ```java
        package com.zhuangjie.ssb.config;

        import com.zhuangjie.ssb.service.UserService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.beans.factory.annotation.Configurable;
        import org.springframework.context.annotation.Bean;
        import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
        import org.springframework.security.config.annotation.web.builders.HttpSecurity;
        import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
        import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
        import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

        @Configurable
        @EnableWebSecurity
        public class SecurityConfig extends WebSecurityConfigurerAdapter {
            //【2】
            @Bean
            public BCryptPasswordEncoder passwordEncoder(){
                return new BCryptPasswordEncoder();
            }
            //【1】
            @Autowired
            private UserService userService;


            @Override
            protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                //【3】
                auth.userDetailsService(userService).passwordEncoder(passwordEncoder()); 
            }

            @Override
            protected void configure(HttpSecurity http) throws Exception {
                http.authorizeRequests()
                        .antMatchers("/login.jsp","/failer.jsp","/css/**","/img/**","/js/**","/plugins/**").permitAll()
                        .antMatchers("/**").hasAnyRole("USER")
                        .anyRequest()
                        .authenticated()
                        .and()
                        .formLogin()
                        .loginPage("/login.jsp")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/index.jsp")

                        .failureForwardUrl("/failer.jsp")
                        .permitAll()
                        .and()
                        .logout()
                        .logoutUrl("/logout")
                        .invalidateHttpSession(true)
                        .logoutSuccessUrl("/login.jsp")
                        .permitAll()
                        .and()
                        .csrf()
                        .disable();


            }
        }

        ```

*   授权

    在启动类上：

    XXXApplication.java

    ```java
    //类上加
    @EnableGlobalMethodSecurity(securedEnabled = true)

    ```

    在Controller类上或方法上加：

    ```java
    @Secured("ROLE_PRODUCT") //只有拥有ROLE_PRODUCT权限的用户才可以访问
    ```

*   美化错误页面

    能被扫描的目录下创建，比如

    controller > ErrorController.java

    ```java
    package com.zhuangjie.ssb.controller;

    import org.springframework.security.access.AccessDeniedException;
    import org.springframework.web.bind.annotation.ControllerAdvice;
    import org.springframework.web.bind.annotation.ExceptionHandler;


    @ControllerAdvice
    public class ErrorController {
        @ExceptionHandler(RuntimeException.class)
        public String exceptionHandle(RuntimeException e) {
            if (e instanceof AccessDeniedException) {
                return "redirect:/403.jsp";
            }
            return "redirect:/500.jsp";

        }
    }

    ```

### - 对称加密与非对称加密

对称加密（HSA250）：加密与解密用的是同一个密钥

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16529659130491652965912999.png)

非对称加密 (RSA250)：

**如果加密与解密：**那肯定是不希望别人知道我的消息，所以只有我才能解密，所以可得出**公钥负责加密，私钥负责解密**；

**如果是签名与验证**：既然是签名，那肯定是不希望有人冒充我发消息，只有我才能发布这个签名，所以可得出**私钥负责签名，公钥负责验证**。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16529658923321652965892116.png)

总结：RSA比HSA安全，但HSA比RSA快。

私钥加密，持有私钥或公钥才可以解密
公钥加密，持有私钥才可解密

### - JWT

jwt有三部分，Header（头部）、Payload（负载）、Signature（签名），JWT第一部、第二部分分是头部进行base64Url加密的（因为要考虑放在url上，而普通的base64放在url是有问题的，冲突了“= ?...”），头部保存的主要是加密的算法（HSA250/RSA250）, 负载是存储的信息、签名如果是对称加密HSA250，会将header +plyload + 密钥 来进行签名，验证是再一次加密，如果加密结果与jwt的Signature一致则没有修改的。  如果是非对称加密（RSA250）那么是将headler+plyload进行hash，然后使用私钥对hash进行签名得到Signature，客户端收到后使用公钥进行Signature解密 得到hash，再看headler+plyload进行hash，两者是否相等，如果相等则是没有修改的。

### - accessToken、refreshToken

accessToken：是我们访问资源要token，如果只有accessToken会出现，我们正在访问页面时（用户活跃中），突然就要我们登录了，这使得用户体验很不好，一般accessToken的有效时间（et）小于refreshToken的有效时间，这样当accessToken过期时而refreshToken没有过期时，就会使用refreshToken刷新accessToken，避免用户活跃时就突然要登录了。

```text
  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+
               Figure 2: Refreshing an Expired Access Token

```

### \[\_2-1\_] springsecurity分布式 单点登录

本示例代码：[https://github.com/18476305640/fileBox/raw/master/当冲突时/spring-parent.zip](https://github.com/18476305640/fileBox/raw/master/当冲突时/spring-parent.zip "https://github.com/18476305640/fileBox/raw/master/当冲突时/spring-parent.zip")

数据库：[https://github.com/18476305640/fileBox/blob/master/当冲突时/security\_authority.sql](https://github.com/18476305640/fileBox/blob/master/当冲突时/security_authority.sql "https://github.com/18476305640/fileBox/blob/master/当冲突时/security_authority.sql")

*   父工程模块 spring-parent

    新建一个maven模块 spring-parent

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <groupId>com.zhuangjie</groupId>
            <artifactId>spring-parent</artifactId>
            <packaging>pom</packaging>
            <version>1.0-SNAPSHOT</version>
            <modules>
                <module>spring-common</module>
                <module>spring-auth</module>
                <module>spring-resource-web</module>
            </modules>
            <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.1.3.RELEASE</version>
                <relativePath/>
            </parent>
            <dependencies>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                    <groupId>com.zhuangjie</groupId>
                    <artifactId>spring-common</artifactId>
                    <version>1.0-SNAPSHOT</version>
                </dependency>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>5.1.47</version>
                </dependency>
                <dependency>
                    <groupId>org.mybatis.spring.boot</groupId>
                    <artifactId>mybatis-spring-boot-starter</artifactId>
                    <version>2.1.0</version>
                </dependency>
            </dependencies>

        </project>
        ```

*   公共模块 spring-common

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <parent>
                <artifactId>spring-parent</artifactId>
                <groupId>com.zhuangjie</groupId>
                <version>1.0-SNAPSHOT</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>

            <artifactId>spring-common</artifactId>


            <dependencies>
                <dependency>
                    <groupId>io.jsonwebtoken</groupId>
                    <artifactId>jjwt-api</artifactId>
                    <version>0.10.7</version>
                </dependency>
                <dependency>
                    <groupId>io.jsonwebtoken</groupId>
                    <artifactId>jjwt-impl</artifactId>
                    <version>0.10.7</version>
                    <scope>runtime</scope>
                </dependency>
                <dependency>
                    <groupId>io.jsonwebtoken</groupId>
                    <artifactId>jjwt-jackson</artifactId>
                    <version>0.10.7</version>
                    <scope>runtime</scope>
                </dependency>
                <!--jackson包-->
                <dependency>
                    <groupId>com.fasterxml.jackson.core</groupId>
                    <artifactId>jackson-databind</artifactId>
                    <version>2.9.9</version>
                </dependency>
                <!--日志包-->
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-logging</artifactId>
                </dependency>
                <dependency>
                    <groupId>joda-time</groupId>
                    <artifactId>joda-time</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.projectlombok</groupId>
                    <artifactId>lombok</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-test</artifactId>
                </dependency>
            </dependencies>

        </project>
        ```

    *   源代码 java

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16530297145561653029714370.png)

        *   JsonUtils.java

            ```java
            package com.zhuangjie.common;

            import com.fasterxml.jackson.core.JsonProcessingException;
            import com.fasterxml.jackson.core.type.TypeReference;
            import com.fasterxml.jackson.databind.ObjectMapper;
            import org.slf4j.Logger;
            import org.slf4j.LoggerFactory;

            import java.io.IOException;
            import java.util.List;
            import java.util.Map;

            /**
             * @author: 黑马程序员
             **/
            public class JsonUtils {

                public static final ObjectMapper mapper = new ObjectMapper();

                private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

                public static String toString(Object obj) {
                    if (obj == null) {
                        return null;
                    }
                    if (obj.getClass() == String.class) {
                        return (String) obj;
                    }
                    try {
                        return mapper.writeValueAsString(obj);
                    } catch (JsonProcessingException e) {
                        logger.error("json序列化出错：" + obj, e);
                        return null;
                    }
                }

                public static <T> T toBean(String json, Class<T> tClass) {
                    try {
                        return mapper.readValue(json, tClass);
                    } catch (IOException e) {
                        logger.error("json解析出错：" + json, e);
                        return null;
                    }
                }

                public static <E> List<E> toList(String json, Class<E> eClass) {
                    try {
                        return mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(List.class, eClass));
                    } catch (IOException e) {
                        logger.error("json解析出错：" + json, e);
                        return null;
                    }
                }

                public static <K, V> Map<K, V> toMap(String json, Class<K> kClass, Class<V> vClass) {
                    try {
                        return mapper.readValue(json, mapper.getTypeFactory().constructMapType(Map.class, kClass, vClass));
                    } catch (IOException e) {
                        logger.error("json解析出错：" + json, e);
                        return null;
                    }
                }

                public static <T> T nativeRead(String json, TypeReference<T> type) {
                    try {
                        return mapper.readValue(json, type);
                    } catch (IOException e) {
                        logger.error("json解析出错：" + json, e);
                        return null;
                    }
                }
            }

            ```

        *   JwtUtils.java

            ```java
            package com.zhuangjie.common;

            import com.zhuangjie.domain.Payload;
            import io.jsonwebtoken.Claims;
            import io.jsonwebtoken.Jws;
            import io.jsonwebtoken.Jwts;
            import io.jsonwebtoken.SignatureAlgorithm;
            import org.joda.time.DateTime;

            import java.security.PrivateKey;
            import java.security.PublicKey;
            import java.util.Base64;
            import java.util.UUID;

            /**
             * @author: 黑马程序员
             * 生成token以及校验token相关方法
             */
            public class JwtUtils {

                private static final String JWT_PAYLOAD_USER_KEY = "user";

                /**
                 * 私钥加密token
                 *
                 * @param userInfo   载荷中的数据
                 * @param privateKey 私钥
                 * @param expire     过期时间，单位分钟
                 * @return JWT
                 */
                public static String generateTokenExpireInMinutes(Object userInfo, PrivateKey privateKey, int expire) {
                    return Jwts.builder()
                            .claim(JWT_PAYLOAD_USER_KEY, JsonUtils.toString(userInfo))
                            .setId(createJTI())
                            .setExpiration(DateTime.now().plusMinutes(expire).toDate())
                            .signWith(privateKey, SignatureAlgorithm.RS256)
                            .compact();
                }

                /**
                 * 私钥加密token
                 *
                 * @param userInfo   载荷中的数据
                 * @param privateKey 私钥
                 * @param expire     过期时间，单位秒
                 * @return JWT
                 */
                public static String generateTokenExpireInSeconds(Object userInfo, PrivateKey privateKey, int expire) {
                    return Jwts.builder()
                            .claim(JWT_PAYLOAD_USER_KEY, JsonUtils.toString(userInfo))
                            .setId(createJTI())
                            .setExpiration(DateTime.now().plusSeconds(expire).toDate())
                            .signWith(privateKey, SignatureAlgorithm.RS256)
                            .compact();
                }

                /**
                 * 公钥解析token
                 *
                 * @param token     用户请求中的token
                 * @param publicKey 公钥
                 * @return Jws<Claims>
                 */
                private static Jws<Claims> parserToken(String token, PublicKey publicKey) {
                    return Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token);
                }

                private static String createJTI() {
                    return new String(Base64.getEncoder().encode(UUID.randomUUID().toString().getBytes()));
                }

                /**
                 * 获取token中的用户信息
                 *
                 * @param token     用户请求中的令牌
                 * @param publicKey 公钥
                 * @return 用户信息
                 */
                public static <T> Payload<T> getInfoFromToken(String token, PublicKey publicKey, Class<T> userType) {
                    Jws<Claims> claimsJws = parserToken(token, publicKey);
                    Claims body = claimsJws.getBody();
                    Payload<T> claims = new Payload<>();
                    claims.setId(body.getId());
                    claims.setUserInfo(JsonUtils.toBean(body.get(JWT_PAYLOAD_USER_KEY).toString(), userType));
                    claims.setExpiration(body.getExpiration());
                    return claims;
                }

                /**
                 * 获取token中的载荷信息
                 *
                 * @param token     用户请求中的令牌
                 * @param publicKey 公钥
                 * @return 用户信息
                 */
                public static <T> Payload<T> getInfoFromToken(String token, PublicKey publicKey) {
                    Jws<Claims> claimsJws = parserToken(token, publicKey);
                    Claims body = claimsJws.getBody();
                    Payload<T> claims = new Payload<>();
                    claims.setId(body.getId());
                    claims.setExpiration(body.getExpiration());
                    return claims;
                }
            }
            ```

        *   RsaUtils.java

            ```java
            package com.zhuangjie.common;

            import java.io.File;
            import java.io.IOException;
            import java.nio.file.Files;
            import java.security.*;
            import java.security.spec.InvalidKeySpecException;
            import java.security.spec.PKCS8EncodedKeySpec;
            import java.security.spec.X509EncodedKeySpec;
            import java.util.Base64;

            /**
             * @author 黑马程序员
             */
            public class RsaUtils {


                private static final int DEFAULT_KEY_SIZE = 2048;
                /**
                 * 从文件中读取公钥
                 *
                 * @param filename 公钥保存路径，相对于classpath
                 * @return 公钥对象
                 * @throws Exception
                 */
                public static PublicKey getPublicKey(String filename) throws Exception {
                    byte[] bytes = readFile(filename);
                    return getPublicKey(bytes);
                }

                /**
                 * 从文件中读取密钥
                 *
                 * @param filename 私钥保存路径，相对于classpath
                 * @return 私钥对象
                 * @throws Exception
                 */
                public static PrivateKey getPrivateKey(String filename) throws Exception {
                    byte[] bytes = readFile(filename);
                    return getPrivateKey(bytes);
                }

                /**
                 * 获取公钥
                 *
                 * @param bytes 公钥的字节形式
                 * @return
                 * @throws Exception
                 */
                private static PublicKey getPublicKey(byte[] bytes) throws Exception {
                    bytes = Base64.getDecoder().decode(bytes);
                    X509EncodedKeySpec spec = new X509EncodedKeySpec(bytes);
                    KeyFactory factory = KeyFactory.getInstance("RSA");
                    return factory.generatePublic(spec);
                }

                /**
                 * 获取密钥
                 *
                 * @param bytes 私钥的字节形式
                 * @return
                 * @throws Exception
                 */
                private static PrivateKey getPrivateKey(byte[] bytes) throws NoSuchAlgorithmException, InvalidKeySpecException {
                    bytes = Base64.getDecoder().decode(bytes);
                    PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(bytes);
                    KeyFactory factory = KeyFactory.getInstance("RSA");
                    return factory.generatePrivate(spec);
                }

                /**
                 * 根据密文，生存rsa公钥和私钥,并写入指定文件
                 *
                 * @param publicKeyFilename  公钥文件路径
                 * @param privateKeyFilename 私钥文件路径
                 * @param secret             生成密钥的密文
                 */
                public static void generateKey(String publicKeyFilename, String privateKeyFilename, String secret, int keySize) throws Exception {
                    checkPathExist(publicKeyFilename);
                    checkPathExist(privateKeyFilename);

                    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
                    SecureRandom secureRandom = new SecureRandom(secret.getBytes());
                    keyPairGenerator.initialize(Math.max(keySize, DEFAULT_KEY_SIZE), secureRandom);
                    KeyPair keyPair = keyPairGenerator.genKeyPair();
                    // 获取公钥并写出
                    byte[] publicKeyBytes = keyPair.getPublic().getEncoded();
                    publicKeyBytes = Base64.getEncoder().encode(publicKeyBytes);
                    writeFile(publicKeyFilename, publicKeyBytes);
                    // 获取私钥并写出
                    byte[] privateKeyBytes = keyPair.getPrivate().getEncoded();
                    privateKeyBytes = Base64.getEncoder().encode(privateKeyBytes);
                    writeFile(privateKeyFilename, privateKeyBytes);
                }

                /**
                 * 该方法确保文件父级目录或目录存在
                 * @param init_path 文件父级目录或目录
                 *
                 */
                public static void checkPathExist(String init_path) {
                    //系统路径分隔符
                    String sepa = java.io.File.separator;
                    //文件根目录或目录
                    String path = "";

                    if (init_path.lastIndexOf(sepa) == init_path.length()- 1) {
                        //如果传的是文件夹路径 D:\system\下载\
                        System.out.println("你传的是一个目录");
                        path = init_path;
                    }else {
                        //如果传的是一个文件的路径 D:\system\下载\mk.pub ，要获取文件的父级目录路径
                        path = init_path.substring(0,init_path.lastIndexOf(sepa));
                    }
                    File file = new File(path);
                    if (file.mkdirs()) {
                        System.out.println("目录不存在，已成功创建！");
                    }


                }

                private static byte[] readFile(String fileName) throws Exception {
                    return Files.readAllBytes(new File(fileName).toPath());
                }

                private static void writeFile(String destPath, byte[] bytes) throws IOException {
                    File dest = new File(destPath);
                    if (!dest.exists()) {
                        dest.createNewFile();
                    }
                    Files.write(dest.toPath(), bytes);
                }
            }
            ```

        &#x20;

        *   Payload.java

            ```java
            package com.zhuangjie.domain;

            import lombok.Data;

            import java.util.Date;

            /**
             * @author 黑马程序员
             * 为了方便后期获取token中的用户信息，将token中载荷部分单独封装成一个对象
             */
            @Data
            public class Payload<T> {
                private String id;
                private T userInfo;
                private Date expiration;
            }
            ```

        还没完，我们需要在指定的位置调用RsaUtils的方法生成公钥与私钥，不然项目无法跑

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16530299410321653029940997.png)

        *   MyTest.java

            ```java
            import com.zhuangjie.common.RsaUtils;
            import org.junit.Test;

            public class MyTest {
                private String publicFilePath = "C:\\Users\\zhuangjie\\auth_key\\id_key_rsa.pub";
                private String privateFilePath = "C:\\Users\\zhuangjie\\auth_key\\id_key_rsa";


                @Test
                public void generateKey() throws Exception {
                    RsaUtils.generateKey(publicFilePath, privateFilePath, "zjazn", 2048);
                }

                @Test
                public void getPublicKey() throws Exception {
                    System.out.println(RsaUtils.getPublicKey(publicFilePath));
                }

                @Test
                public void getPrivateKey() throws Exception {
                    System.out.println(RsaUtils.getPrivateKey(privateFilePath));
                }

            //    @Test
            //    public void test() {
            //        try {
            //            RsaUtils.generateKey(publicFilePath,privateFilePath,"zjazn",2048);
            //        } catch (Exception e) {
            //            System.out.printf("Gen errored~");
            //            e.printStackTrace();
            //        }
            //    }
            //    @Test
            //    public void test02 () {
            //        String sepa = java.io.File.separator;
            ////        System.out.println(sepa);
            ////        System.out.println(publicKeyPathAndName);
            //
            ////        String path = publicKeyPathAndName.substring(0,publicKeyPathAndName.lastIndexOf(sepa));
            ////        System.out.println(path);
            //        RsaUtils.checkPathExist(publicKeyPathAndName);
            //
            //
            //    }



            }

            ```

*   认证模块 spring-auth

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16530315085141653031508067.png)

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <parent>
                <artifactId>spring-parent</artifactId>
                <groupId>com.zhuangjie</groupId>
                <version>1.0-SNAPSHOT</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>

            <artifactId>spring-auth</artifactId>


            <dependencies>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                    <groupId>com.zhuangjie</groupId>
                    <artifactId>spring-common</artifactId>
                    <version>1.0-SNAPSHOT</version>
                </dependency>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>5.1.47</version>
                </dependency>
                <dependency>
                    <groupId>org.mybatis.spring.boot</groupId>
                    <artifactId>mybatis-spring-boot-starter</artifactId>
                    <version>2.1.0</version>
                </dependency>
            </dependencies>
        </project>
        ```

    *   resources > application.yml

        ```yaml
        server:
          port: 9001
        spring:
          datasource:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql:///security_authority
            username: root
            password: 3333
        mybatis:
          type-aliases-package: com.zhuangjie.auth.domain
          configuration:
            map-underscore-to-camel-case: true
        logging:
          level:
            com.itheima: debug
        rsa:
          key:
            pubKeyFile: C:\Users\zhuangjie\auth_key\id_key_rsa.pub
            priKeyFile: C:\Users\zhuangjie\auth_key\id_key_rsa
        ```

    *   AuthApplication.java ：启动类

        ```java
        package com.zhuangjie.auth;

        import com.zhuangjie.auth.config.RsaKeyProperties;
        import org.mybatis.spring.annotation.MapperScan;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.boot.context.properties.EnableConfigurationProperties;

        @SpringBootApplication
        @MapperScan("com.zhuangjie.auth.mapper")
        @EnableConfigurationProperties(RsaKeyProperties.class)
        public class AuthApplication {
            public static void main(String[] args) {
                SpringApplication.run(AuthApplication.class,args);
            }
        }


        ```

    *   domain下

        *   SysRole.java

            ```java
            package com.zhuangjie.auth.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;

            public class SysRole implements GrantedAuthority {

                private Integer id;
                private String roleName;
                private String roleDesc;

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public String getRoleName() {
                    return roleName;
                }

                public void setRoleName(String roleName) {
                    this.roleName = roleName;
                }

                public String getRoleDesc() {
                    return roleDesc;
                }

                public void setRoleDesc(String roleDesc) {
                    this.roleDesc = roleDesc;
                }

                @JsonIgnore
                @Override
                public String getAuthority() {
                    return roleName;
                }
            }

            ```

        *   SysUser.java

            ```java
            package com.zhuangjie.auth.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;
            import org.springframework.security.core.userdetails.UserDetails;

            import java.util.Collection;
            import java.util.List;

            public class SysUser implements UserDetails {

                private Integer id;
                private String username;
                private String password;
                private Integer status;
                private List<SysRole> roles;

                public List<SysRole> getRoles() {
                    return roles;
                }

                public void setRoles(List<SysRole> roles) {
                    this.roles = roles;
                }

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public void setUsername(String username) {
                    this.username = username;
                }

                public void setPassword(String password) {
                    this.password = password;
                }

                public Integer getStatus() {
                    return status;
                }

                public void setStatus(Integer status) {
                    this.status = status;
                }

                @JsonIgnore
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return roles;
                }

                @Override
                public String getPassword() {
                    return password;
                }

                @Override
                public String getUsername() {
                    return username;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonLocked() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isCredentialsNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isEnabled() {
                    return true;
                }
            }

            ```

    *   mapper下

        *   RoleMapper.java 接口

            ```java
            package com.zhuangjie.auth.mapper;

            import com.zhuangjie.auth.domain.SysRole;
            import org.apache.ibatis.annotations.Select;

            import java.util.List;

            public interface RoleMapper{

                @Select("SELECT r.id, r.role_name roleName, r.role_desc roleDesc " +
                        "FROM sys_role r, sys_user_role ur " +
                        "WHERE r.id=ur.rid AND ur.uid=#{uid}")
                public List<SysRole> findByUid(Integer uid);
            }

            ```

        *   UserMapper.java 接口

            ```java
            package com.zhuangjie.auth.mapper;

            import com.zhuangjie.auth.domain.SysUser;
            import org.apache.ibatis.annotations.Many;
            import org.apache.ibatis.annotations.Result;
            import org.apache.ibatis.annotations.Results;
            import org.apache.ibatis.annotations.Select;

            import java.util.List;

            public interface UserMapper{

                @Select("select * from sys_user where username = #{username}")
                @Results({
                        @Result(id = true, property = "id", column = "id"),
                        @Result(property = "roles", column = "id", javaType = List.class,
                            many = @Many(select = "com.zhuangjie.auth.mapper.RoleMapper.findByUid"))
                })
                public SysUser findByName(String username);

            }

            ```

    *   service下

        *   UserService.java 接口

            ```java
            package com.zhuangjie.auth.service;

            import org.springframework.security.core.userdetails.UserDetailsService;

            public interface UserService extends UserDetailsService {
            }

            ```

        *   impl > UserServiceImpl.java&#x20;

            ```java
            package com.zhuangjie.auth.service.impl;


            import com.zhuangjie.auth.mapper.UserMapper;
            import com.zhuangjie.auth.service.UserService;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.security.core.userdetails.UserDetails;
            import org.springframework.security.core.userdetails.UsernameNotFoundException;
            import org.springframework.stereotype.Service;
            import org.springframework.transaction.annotation.Transactional;

            @Service
            @Transactional
            public class UserServiceImpl implements UserService {

                @Autowired
                private UserMapper userMapper;

                @Override
                public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                    return userMapper.findByName(username);
                }

            }

            ```

    *   filter下

        *   JwtLoginFilter.java：认证过滤器

            ```java
            package com.zhuangjie.auth.filter;

            import com.fasterxml.jackson.databind.ObjectMapper;
            import com.zhuangjie.auth.config.RsaKeyProperties;
            import com.zhuangjie.auth.domain.SysRole;
            import com.zhuangjie.auth.domain.SysUser;
            import com.zhuangjie.common.JwtUtils;
            import org.springframework.security.authentication.AuthenticationManager;
            import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
            import org.springframework.security.core.Authentication;
            import org.springframework.security.core.AuthenticationException;
            import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

            import javax.servlet.FilterChain;
            import javax.servlet.ServletException;
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            import java.io.IOException;
            import java.io.PrintWriter;
            import java.util.HashMap;
            import java.util.List;
            import java.util.Map;

            /**
             * 用户认证过滤器
             */
            public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

                private AuthenticationManager authenticationManager;
                private RsaKeyProperties prop;

                public JwtLoginFilter(AuthenticationManager authenticationManager, RsaKeyProperties prop) {
                    this.authenticationManager = authenticationManager;
                    this.prop = prop;
                }

                public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
                    try {
                        SysUser sysUser = new ObjectMapper().readValue(request.getInputStream(), SysUser.class);
                        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(sysUser.getUsername(), sysUser.getPassword());
                        return authenticationManager.authenticate(authRequest);
                    }catch (Exception e){
                        try {
                            response.setContentType("application/json;charset=utf-8");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            PrintWriter out = response.getWriter();
                            Map resultMap = new HashMap();
                            resultMap.put("code", HttpServletResponse.SC_UNAUTHORIZED);
                            resultMap.put("msg", "用户名或密码错误！");
                            out.write(new ObjectMapper().writeValueAsString(resultMap));
                            out.flush();
                            out.close();
                        }catch (Exception outEx){
                            outEx.printStackTrace();
                        }
                        throw new RuntimeException(e);
                    }
                }

                public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
                    SysUser user = new SysUser();
                    user.setUsername(authResult.getName());
                    user.setRoles((List<SysRole>) authResult.getAuthorities());
                    String token = JwtUtils.generateTokenExpireInMinutes(user, prop.getPrivateKey(), 24 * 60);
                    response.addHeader("Authorization", "Bearer "+token);
                    try {
                        response.setContentType("application/json;charset=utf-8");
                        response.setStatus(HttpServletResponse.SC_OK);
                        PrintWriter out = response.getWriter();
                        Map resultMap = new HashMap();
                        resultMap.put("code", HttpServletResponse.SC_OK);
                        resultMap.put("msg", "认证通过！");
                        out.write(new ObjectMapper().writeValueAsString(resultMap));
                        out.flush();
                        out.close();
                    }catch (Exception outEx){
                        outEx.printStackTrace();
                    }
                }

            }

            ```

        *   JwtVerifyFilter.java：验证过滤器

            ```java
            package com.zhuangjie.auth.filter;

            import com.fasterxml.jackson.databind.ObjectMapper;
            import com.zhuangjie.auth.config.RsaKeyProperties;
            import com.zhuangjie.auth.domain.SysUser;
            import com.zhuangjie.common.JwtUtils;
            import com.zhuangjie.domain.Payload;
            import org.springframework.security.authentication.AuthenticationManager;
            import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
            import org.springframework.security.core.context.SecurityContextHolder;
            import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

            import javax.servlet.FilterChain;
            import javax.servlet.ServletException;
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            import java.io.IOException;
            import java.io.PrintWriter;
            import java.util.HashMap;
            import java.util.Map;

            /**
             * token验证过滤器
             */
            public class JwtVerifyFilter extends BasicAuthenticationFilter {

                private RsaKeyProperties prop;

                public JwtVerifyFilter(AuthenticationManager authenticationManager, RsaKeyProperties prop) {
                    super(authenticationManager);
                    this.prop = prop;
                }

                public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
                    String header = request.getHeader("Authorization");
                    if (header == null || !header.startsWith("Bearer ")) {
                        //如果携带错误的token，则给用户提示请登录！
                        chain.doFilter(request, response);
                        response.setContentType("application/json;charset=utf-8");
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        PrintWriter out = response.getWriter();
                        Map resultMap = new HashMap();
                        resultMap.put("code", HttpServletResponse.SC_FORBIDDEN);
                        resultMap.put("msg", "请登录！");
                        out.write(new ObjectMapper().writeValueAsString(resultMap));
                        out.flush();
                        out.close();
                    } else {
                        //如果携带了正确格式的token要先得到token
                        String token = header.replace("Bearer ", "");
                        //验证tken是否正确
                        Payload<SysUser> payload = JwtUtils.getInfoFromToken(token, prop.getPublicKey(), SysUser.class);
                        SysUser user = payload.getUserInfo();
                        if(user!=null){
                            UsernamePasswordAuthenticationToken authResult = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authResult);
                            chain.doFilter(request, response);
                        }
                    }
                }




            }

            ```

    *   config下

        *   RsaKeyProperties.java

            ```java
            package com.zhuangjie.auth.config;

            import com.zhuangjie.common.RsaUtils;
            import lombok.Data;
            import org.springframework.boot.context.properties.ConfigurationProperties;
            import org.springframework.stereotype.Component;

            import javax.annotation.PostConstruct;
            import java.security.PrivateKey;
            import java.security.PublicKey;

            @Data
            @ConfigurationProperties(prefix = "rsa.key")
            public class RsaKeyProperties {

                private String pubKeyFile;
                private String priKeyFile;

                private PublicKey publicKey;
                private PrivateKey privateKey;

                @PostConstruct
                public void createRsaKey() throws Exception {
                    publicKey = RsaUtils.getPublicKey(pubKeyFile);
                    privateKey = RsaUtils.getPrivateKey(priKeyFile);
                }

                public String getPubKeyFile() {
                    return pubKeyFile;
                }

                public void setPubKeyFile(String pubKeyFile) {
                    this.pubKeyFile = pubKeyFile;
                }

                public String getPriKeyFile() {
                    return priKeyFile;
                }

                public void setPriKeyFile(String priKeyFile) {
                    this.priKeyFile = priKeyFile;
                }

                public PublicKey getPublicKey() {
                    return publicKey;
                }

                public void setPublicKey(PublicKey publicKey) {
                    this.publicKey = publicKey;
                }

                public PrivateKey getPrivateKey() {
                    return privateKey;
                }

                public void setPrivateKey(PrivateKey privateKey) {
                    this.privateKey = privateKey;
                }
            }

            ```

        *   WebSecurityConfig.java

            ```java
            package com.zhuangjie.auth.config;


            import com.zhuangjie.auth.filter.JwtLoginFilter;
            import com.zhuangjie.auth.filter.JwtVerifyFilter;
            import com.zhuangjie.auth.service.UserService;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.context.annotation.Bean;
            import org.springframework.context.annotation.Configuration;
            import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
            import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
            import org.springframework.security.config.annotation.web.builders.HttpSecurity;
            import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
            import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
            import org.springframework.security.config.http.SessionCreationPolicy;
            import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

            @Configuration
            @EnableWebSecurity
            @EnableGlobalMethodSecurity(securedEnabled=true)
            public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

                @Autowired
                private UserService userService;

                @Autowired
                private RsaKeyProperties prop;

                @Bean
                public BCryptPasswordEncoder passwordEncoder(){
                    return new BCryptPasswordEncoder();
                }

                //指定认证对象的来源
                public void configure(AuthenticationManagerBuilder auth) throws Exception {
                    auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
                }
                //SpringSecurity配置信息
                public void configure(HttpSecurity http) throws Exception {
                    http.csrf()
                        .disable()
                        .authorizeRequests()
                        .antMatchers("/product").hasAnyRole("USER")
                        .anyRequest()
                        .authenticated()
                        .and()
                        .addFilter(new JwtLoginFilter(super.authenticationManager(), prop))
                        .addFilter(new JwtVerifyFilter(super.authenticationManager(), prop))
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                }
            }

            ```

    *   controller下

        *   UserController.java ：测试使用

            ```java
            package com.zhuangjie.auth.controller;

            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.bind.annotation.RestController;

            @RestController
            @RequestMapping("/user")
            public class UserController {
                @RequestMapping("/test")
                public String test() {
                    return "success";
                }
            }

            ```

*   资源模块 spring-web

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16530315565141653031556032.png)

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <parent>
                <artifactId>spring-parent</artifactId>
                <groupId>com.zhuangjie</groupId>
                <version>1.0-SNAPSHOT</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>

            <artifactId>spring-resource-web</artifactId>


        </project>
        ```

    *   resources > application.yml

        ```yaml
        server:
          port: 9002
        spring:
          datasource:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql:///security_authority
            username: root
            password: 3333
        mybatis:
          type-aliases-package: com.zhuangjie.auth.domain
          configuration:
            map-underscore-to-camel-case: true
        logging:
          level:
            com.itheima: debug
        rsa:
          key:
            pubKeyFile: C:\Users\zhuangjie\auth_key\id_key_rsa.pub

        ```

    *   WebApplication.java : 启动类

        ```java
        package com.zhuangjie.web;

        import com.zhuangjie.web.config.RsaKeyProperties;
        import org.mybatis.spring.annotation.MapperScan;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.boot.context.properties.EnableConfigurationProperties;

        @SpringBootApplication
        @MapperScan("com.zhuangjie.web.mapper")
        @EnableConfigurationProperties(RsaKeyProperties.class)
        public class WebApplication {
            public static void main(String[] args) {
                SpringApplication.run(WebApplication.class, args);
            }
        }
        ```

    *   domain下

        *   SysRole.java

            ```java
            package com.zhuangjie.auth.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;

            public class SysRole implements GrantedAuthority {

                private Integer id;
                private String roleName;
                private String roleDesc;

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public String getRoleName() {
                    return roleName;
                }

                public void setRoleName(String roleName) {
                    this.roleName = roleName;
                }

                public String getRoleDesc() {
                    return roleDesc;
                }

                public void setRoleDesc(String roleDesc) {
                    this.roleDesc = roleDesc;
                }

                @JsonIgnore
                @Override
                public String getAuthority() {
                    return roleName;
                }
            }

            ```

        *   SysUser.java

            ```java
            package com.zhuangjie.auth.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;
            import org.springframework.security.core.userdetails.UserDetails;

            import java.util.Collection;
            import java.util.List;

            public class SysUser implements UserDetails {

                private Integer id;
                private String username;
                private String password;
                private Integer status;
                private List<SysRole> roles;

                public List<SysRole> getRoles() {
                    return roles;
                }

                public void setRoles(List<SysRole> roles) {
                    this.roles = roles;
                }

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public void setUsername(String username) {
                    this.username = username;
                }

                public void setPassword(String password) {
                    this.password = password;
                }

                public Integer getStatus() {
                    return status;
                }

                public void setStatus(Integer status) {
                    this.status = status;
                }

                @JsonIgnore
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return roles;
                }

                @Override
                public String getPassword() {
                    return password;
                }

                @Override
                public String getUsername() {
                    return username;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonLocked() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isCredentialsNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isEnabled() {
                    return true;
                }
            }

            ```

    *   filter下

        *   JwtVerifyFilter.java：验证过滤器

            ```java
            package com.zhuangjie.web.filter;

            import com.fasterxml.jackson.databind.ObjectMapper;
            import com.zhuangjie.common.JwtUtils;
            import com.zhuangjie.domain.Payload;
            import com.zhuangjie.web.config.RsaKeyProperties;
            import com.zhuangjie.web.domain.SysUser;
            import org.springframework.security.authentication.AuthenticationManager;
            import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
            import org.springframework.security.core.context.SecurityContextHolder;
            import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

            import javax.servlet.FilterChain;
            import javax.servlet.ServletException;
            import javax.servlet.http.HttpServletRequest;
            import javax.servlet.http.HttpServletResponse;
            import java.io.IOException;
            import java.io.PrintWriter;
            import java.util.HashMap;
            import java.util.Map;

            /**
             * token验证过滤器
             */
            public class JwtVerifyFilter extends BasicAuthenticationFilter {

                private RsaKeyProperties prop;

                public JwtVerifyFilter(AuthenticationManager authenticationManager, RsaKeyProperties prop) {
                    super(authenticationManager);
                    this.prop = prop;
                }

                public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
                    String header = request.getHeader("Authorization");
                    if (header == null || !header.startsWith("Bearer ")) {
                        //如果携带错误的token，则给用户提示请登录！
                        chain.doFilter(request, response);
                        response.setContentType("application/json;charset=utf-8");
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        PrintWriter out = response.getWriter();
                        Map resultMap = new HashMap();
                        resultMap.put("code", HttpServletResponse.SC_FORBIDDEN);
                        resultMap.put("msg", "请登录！");
                        out.write(new ObjectMapper().writeValueAsString(resultMap));
                        out.flush();
                        out.close();
                    } else {
                        //如果携带了正确格式的token要先得到token
                        String token = header.replace("Bearer ", "");
                        //验证tken是否正确
                        Payload<SysUser> payload = JwtUtils.getInfoFromToken(token, prop.getPublicKey(), SysUser.class);
                        SysUser user = payload.getUserInfo();
                        if(user!=null){
                            UsernamePasswordAuthenticationToken authResult = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authResult);
                            chain.doFilter(request, response);
                        }
                    }
                }




            }

            ```

    *   config下

        *   RsaKeyProperties.java

            ```java
            package com.zhuangjie.web.config;

            import com.zhuangjie.common.RsaUtils;
            import lombok.Data;
            import org.springframework.boot.context.properties.ConfigurationProperties;

            import javax.annotation.PostConstruct;
            import java.security.PublicKey;

            @Data
            @ConfigurationProperties(prefix = "rsa.key")
            public class RsaKeyProperties {
                private String pubKeyFile;
                private PublicKey publicKey;
                @PostConstruct
                public void loadKey() throws Exception {
                    publicKey = RsaUtils.getPublicKey(pubKeyFile);
                }
            }
            ```

        *   WebSecurityConfig.java

            ```java
            package com.zhuangjie.web.config;

            import com.zhuangjie.web.filter.JwtVerifyFilter;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.context.annotation.Configuration;
            import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
            import org.springframework.security.config.annotation.web.builders.HttpSecurity;
            import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
            import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
            import org.springframework.security.config.http.SessionCreationPolicy;

            @Configuration
            @EnableWebSecurity
            @EnableGlobalMethodSecurity(securedEnabled=true)
            public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

                @Autowired
                private RsaKeyProperties prop;

                //SpringSecurity配置信息
                public void configure(HttpSecurity http) throws Exception {
                    http.csrf()
                            .disable()
                            .authorizeRequests()
                            .antMatchers("/web").hasAnyRole("USER")
                            .anyRequest()
                            .authenticated()
                            .and()
                            .addFilter(new JwtVerifyFilter(super.authenticationManager(), prop))
                            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                }
            }

            ```

    *   controller下

        *   WebController.java：用于测试

            ```java
            package com.zhuangjie.web.controller;

            import org.springframework.web.bind.annotation.GetMapping;
            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.bind.annotation.RestController;

            @RestController
            @RequestMapping("/web")
            public class WebController{
                @GetMapping("/test")
                public String test() {
                    return "web server: success!!";
                }
            }

            ```

*   测试

    ```http
    POST http://127.0.0.1:9001/login HTTP/1.1
    Content-Type: application/json

    {
        "username":"admin",
        "password":"3333"
    }
    ###
    GET http://127.0.0.1:9001/user/test HTTP/1.1
    Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1wiaWRcIjpudWxsLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJwYXNzd29yZFwiOm51bGwsXCJzdGF0dXNcIjpudWxsLFwicm9sZXNcIjpbe1wiaWRcIjo2LFwicm9sZU5hbWVcIjpcIlJPTEVfQURNSU5cIixcInJvbGVEZXNjXCI6XCLnrqHnkIblkZhcIn0se1wiaWRcIjo5LFwicm9sZU5hbWVcIjpcIlJPTEVfVVNFUlwiLFwicm9sZURlc2NcIjpcIuaZrumAmueUqOaIt1wifV19IiwianRpIjoiTkdZeVpUQmlZV1V0TURneE55MDBNRE5oTFdJMk1UUXROVFpsWm1ZeE5tWTFORGMxIiwiZXhwIjoxNjUzMTAyMjgwfQ.lckgMqQ4AxQ2JabsKYK6J5M3qHghWbuw7tFkTi-faqqqlBrvdAa2m5EQ9b0CfRrhr6iTb5OgXHBULq42wYDQbpS-l6kt406wpLW5ZtoPWPKoemyg6CRjc2XD4zFYA6eGhpBnZ418RbrY0y_RsIiTqBzOTXHjs4-NKal8V6qiqkXb4M8AzdO19JVbueBY4OFGLTLqypxqbhRTR3OiYdFPW2RPGUgZK7JpJGz1cfa3M2dZ-q4eFXQlbtu4zek1CrARcgZb88Oja-7F1cPWpTjEDRHnsG--cjjEW2665Emdl8ePuxVY-aFI4kBcSip-GocYVk7Un-k64a-Jzl7tj_kaNw

    ###
    GET http://127.0.0.1:9002/web/test HTTP/1.1
    Authorization: Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1wiaWRcIjpudWxsLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJwYXNzd29yZFwiOm51bGwsXCJzdGF0dXNcIjpudWxsLFwicm9sZXNcIjpbe1wiaWRcIjo2LFwicm9sZU5hbWVcIjpcIlJPTEVfQURNSU5cIixcInJvbGVEZXNjXCI6XCLnrqHnkIblkZhcIn0se1wiaWRcIjo5LFwicm9sZU5hbWVcIjpcIlJPTEVfVVNFUlwiLFwicm9sZURlc2NcIjpcIuaZrumAmueUqOaIt1wifV19IiwianRpIjoiTkdZeVpUQmlZV1V0TURneE55MDBNRE5oTFdJMk1UUXROVFpsWm1ZeE5tWTFORGMxIiwiZXhwIjoxNjUzMTAyMjgwfQ.lckgMqQ4AxQ2JabsKYK6J5M3qHghWbuw7tFkTi-faqqqlBrvdAa2m5EQ9b0CfRrhr6iTb5OgXHBULq42wYDQbpS-l6kt406wpLW5ZtoPWPKoemyg6CRjc2XD4zFYA6eGhpBnZ418RbrY0y_RsIiTqBzOTXHjs4-NKal8V6qiqkXb4M8AzdO19JVbueBY4OFGLTLqypxqbhRTR3OiYdFPW2RPGUgZK7JpJGz1cfa3M2dZ-q4eFXQlbtu4zek1CrARcgZb88Oja-7F1cPWpTjEDRHnsG--cjjEW2665Emdl8ePuxVY-aFI4kBcSip-GocYVk7Un-k64a-Jzl7tj_kaNw

    ```

*   优化（将公钥与私钥放在模块的resources下读取）

    [https://github.com/18476305640/fileBox/raw/master/杂项/spring-parent.zip](https://github.com/18476305640/fileBox/raw/master/杂项/spring-parent.zip "https://github.com/18476305640/fileBox/raw/master/杂项/spring-parent.zip")

    你需要修改模块的resources >application.yml  与common模块的 RsaUtils ，在common模块中新加入了 utils > ReadClassPathTextFile.java

### \[\_3-1\_] OAuth

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16531872563351653187256167.png)

演示的项目代码：[https://github.com/18476305640/fileBox/raw/master/杂项/spring-security-oauth.zip](https://github.com/18476305640/fileBox/raw/master/杂项/spring-security-oauth.zip "https://github.com/18476305640/fileBox/raw/master/杂项/spring-security-oauth.zip")

sql：[https://github.com/18476305640/fileBox/raw/master/杂项/security\_authority.sql](https://github.com/18476305640/fileBox/raw/master/杂项/security_authority.sql "https://github.com/18476305640/fileBox/raw/master/杂项/security_authority.sql")

*   父工程

    工程名：spring-security-oauth

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <modelVersion>4.0.0</modelVersion>

            <groupId>com.zhuangjie</groupId>
            <artifactId>spring-security-oauth</artifactId>
            <packaging>pom</packaging>
            <version>1.0-SNAPSHOT</version>
            <modules>
                <module>spring-oauth-source</module>
                <module>spring-oauth-auth</module>
            </modules>

            <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.1.3.RELEASE</version>
                <relativePath/>
            </parent>
            <properties>
                <spring-cloud.version>Greenwich.RELEASE</spring-cloud.version>
            </properties>

            <dependencyManagement>
                <dependencies>
                    <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-dependencies</artifactId>
                        <version>${spring-cloud.version}</version>
                        <type>pom</type>
                        <scope>import</scope>
                    </dependency>
                </dependencies>
            </dependencyManagement>

            <repositories>
                <repository>
                    <id>spring-snapshots</id>
                    <name>Spring Snapshots</name>
                    <url>https://repo.spring.io/snapshot</url>
                    <snapshots>
                        <enabled>true</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>spring-milestones</id>
                    <name>Spring Milestones</name>
                    <url>https://repo.spring.io/milestone</url>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
                </repository>
            </repositories>


        </project>
        ```

*   认证工程子模块：spring-oauth-auth

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <parent>
                <artifactId>spring-security-oauth</artifactId>
                <groupId>com.zhuangjie</groupId>
                <version>1.0-SNAPSHOT</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>

            <artifactId>spring-oauth-auth</artifactId>

            <dependencies>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-starter-oauth2</artifactId>
                    <version>2.1.0.RELEASE</version>
                </dependency>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>5.1.47</version>
                </dependency>
                <dependency>
                    <groupId>org.mybatis.spring.boot</groupId>
                    <artifactId>mybatis-spring-boot-starter</artifactId>
                    <version>2.1.0</version>
                </dependency>
            </dependencies>

        </project>
        ```

    *   resources > application.yml

        ```yaml
        server:
          port: 9001
        spring:
          datasource:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql:///security_authority
            username: root
            password: 3333
          main:
            allow-bean-definition-overriding: true
        mybatis:
          type-aliases-package: com.zhuangjie.xinke.domain
          configuration:
            map-underscore-to-camel-case: true
        logging:
          level:
            com.zhuangjie: debug
        ```

    *   包名：com.zhuangjie.xinke

        这很重要!!! 要和下一个模块的包名一致！！！，虽然不报错，但是不行的

    *   包名 > OauthServerApplication.java ：启动类

        ```java
        package com.zhuangjie.xinke;

        import org.mybatis.spring.annotation.MapperScan;
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;

        @SpringBootApplication
        @MapperScan("com.zhuangjie.xinke.mapper")
        public class OauthServerApplication {
            public static void main(String[] args) {
                SpringApplication.run(OauthServerApplication.class, args);
            }
        }

        ```

    *   包名 > domain

        *   SysRole.java

            ```java
            package com.zhuangjie.xinke.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;

            public class SysRole implements GrantedAuthority {

                private Integer id;
                private String roleName;
                private String roleDesc;

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public String getRoleName() {
                    return roleName;
                }

                public void setRoleName(String roleName) {
                    this.roleName = roleName;
                }

                public String getRoleDesc() {
                    return roleDesc;
                }

                public void setRoleDesc(String roleDesc) {
                    this.roleDesc = roleDesc;
                }

                @JsonIgnore
                @Override
                public String getAuthority() {
                    return roleName;
                }
            }

            ```

        *   SysUser.java

            ```java
            package com.zhuangjie.xinke.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;
            import org.springframework.security.core.userdetails.UserDetails;

            import java.util.Collection;
            import java.util.List;

            public class SysUser implements UserDetails {

                private Integer id;
                private String username;
                private String password;
                private Integer status;
                private List<SysRole> roles;

                public List<SysRole> getRoles() {
                    return roles;
                }

                public void setRoles(List<SysRole> roles) {
                    this.roles = roles;
                }

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public void setUsername(String username) {
                    this.username = username;
                }

                public void setPassword(String password) {
                    this.password = password;
                }

                public Integer getStatus() {
                    return status;
                }

                public void setStatus(Integer status) {
                    this.status = status;
                }

                @JsonIgnore
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return roles;
                }

                @Override
                public String getPassword() {
                    return password;
                }

                @Override
                public String getUsername() {
                    return username;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonLocked() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isCredentialsNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isEnabled() {
                    return true;
                }
            }

            ```

    *   包名 > mapper

        *   RoleMapper.java

            ```java
            package com.zhuangjie.xinke.mapper;

            import com.zhuangjie.xinke.domain.SysRole;
            import org.apache.ibatis.annotations.Select;

            import java.util.List;

            public interface RoleMapper {

                @Select("SELECT r.id, r.role_name roleName, r.role_desc roleDesc " +
                        "FROM sys_role r, sys_user_role ur " +
                        "WHERE r.id=ur.rid AND ur.uid=#{uid}")
                List<SysRole> findByUid(Integer uid);
            }

            ```

        *   UserMapper.java

            ```java
            package com.zhuangjie.xinke.mapper;

            import com.zhuangjie.xinke.domain.SysUser;
            import org.apache.ibatis.annotations.Many;
            import org.apache.ibatis.annotations.Result;
            import org.apache.ibatis.annotations.Results;
            import org.apache.ibatis.annotations.Select;

            import java.util.List;

            public interface UserMapper{

                @Select("select * from sys_user where username = #{username}")
                @Results({
                        @Result(id = true, property = "id", column = "id"),
                        @Result(property = "roles", column = "id", javaType = List.class,
                            many = @Many(select = "com.zhuangjie.xinke.mapper.RoleMapper.findByUid"))
                })
                SysUser findByName(String username);

            }

            ```

    *   包名 > service

        *   UserService.java 接口

            ```java
            package com.zhuangjie.xinke.service;

            import org.springframework.security.core.userdetails.UserDetailsService;

            public interface UserService extends UserDetailsService {
            }

            ```

        *   impl > UserServiceImpl.java

            ```java
            package com.zhuangjie.xinke.service.impl;


            import com.zhuangjie.xinke.mapper.UserMapper;
            import com.zhuangjie.xinke.service.UserService;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.security.core.userdetails.UserDetails;
            import org.springframework.security.core.userdetails.UsernameNotFoundException;
            import org.springframework.stereotype.Service;
            import org.springframework.transaction.annotation.Transactional;

            @Service
            @Transactional
            public class UserServiceImpl implements UserService {

                @Autowired
                private UserMapper userMapper;

                @Override
                public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
                    return userMapper.findByName(s);
                }

            }

            ```

    *   包名 > config

        *   OauthServerConfig.java

            ```java
            package com.zhuangjie.xinke.config;

            import com.zhuangjie.xinke.service.UserService;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.context.annotation.Bean;
            import org.springframework.context.annotation.Configuration;
            import org.springframework.security.authentication.AuthenticationManager;
            import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
            import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
            import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
            import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
            import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
            import org.springframework.security.oauth2.provider.approval.ApprovalStore;
            import org.springframework.security.oauth2.provider.approval.JdbcApprovalStore;
            import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
            import org.springframework.security.oauth2.provider.code.AuthorizationCodeServices;
            import org.springframework.security.oauth2.provider.code.JdbcAuthorizationCodeServices;
            import org.springframework.security.oauth2.provider.token.TokenStore;
            import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

            import javax.sql.DataSource;

            @Configuration
            @EnableAuthorizationServer
            public class OauthServerConfig extends AuthorizationServerConfigurerAdapter {

                //数据库连接池对象
                @Autowired
                private DataSource dataSource;

                //认证业务对象
                @Autowired
                private UserService userService;

                //授权模式专用对象
                @Autowired
                private AuthenticationManager authenticationManager;

                //客户端信息来源
                @Bean
                public JdbcClientDetailsService jdbcClientDetailsService(){
                    return new JdbcClientDetailsService(dataSource);
                }

                //token保存策略
                @Bean
                public TokenStore tokenStore(){
                    return new JdbcTokenStore(dataSource);
                }

                //授权信息保存策略
                @Bean
                public ApprovalStore approvalStore(){
                    return new JdbcApprovalStore(dataSource);
                }

                //授权码模式数据来源
                @Bean
                public AuthorizationCodeServices authorizationCodeServices(){
                    return new JdbcAuthorizationCodeServices(dataSource);
                }

                //指定客户端信息的数据库来源
                @Override
                public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
                    clients.withClientDetails(jdbcClientDetailsService());
                }

                //检查token的策略
                @Override
                public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
                    security.allowFormAuthenticationForClients();
                    security.checkTokenAccess("isAuthenticated()");
                }

                //OAuth2的主配置信息
                @Override
                public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
                    endpoints
                            .approvalStore(approvalStore())
                            .authenticationManager(authenticationManager)
                            .authorizationCodeServices(authorizationCodeServices())
                            .tokenStore(tokenStore());
                }





            }


            ```

        *   WebSecurityConfig.java

            ```java
            package com.zhuangjie.xinke.config;

            import com.zhuangjie.xinke.service.UserService;
            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.context.annotation.Bean;
            import org.springframework.context.annotation.Configuration;
            import org.springframework.security.authentication.AuthenticationManager;
            import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
            import org.springframework.security.config.annotation.web.builders.HttpSecurity;
            import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
            import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
            import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

            @Configuration
            @EnableWebSecurity
            public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

                @Autowired
                private UserService userService;

                @Bean
                public BCryptPasswordEncoder passwordEncoder(){
                    return new BCryptPasswordEncoder();
                }

                @Override
                public void configure(AuthenticationManagerBuilder auth) throws Exception {
                    auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
                }

                @Override
                protected void configure(HttpSecurity http) throws Exception {
                    http.authorizeRequests()
                            .anyRequest().authenticated()
                            .and()
                            .formLogin()
                            .loginProcessingUrl("/login")
                            .permitAll()
                            .and()
                            .csrf()
                            .disable();
                }

                //AuthenticationManager对象在OAuth2认证服务中要使用，提前放入IOC容器中
                @Override
                @Bean
                public AuthenticationManager authenticationManagerBean() throws Exception {
                    return super.authenticationManagerBean();
                }







            }

            ```

*   资源工程子模块：spring-oauth-source

    *   pom.xml

        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <project xmlns="http://maven.apache.org/POM/4.0.0"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
            <parent>
                <artifactId>spring-security-oauth</artifactId>
                <groupId>com.zhuangjie</groupId>
                <version>1.0-SNAPSHOT</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>

            <artifactId>spring-oauth-source</artifactId>

            <dependencies>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-web</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-security</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-starter-oauth2</artifactId>
                    <version>2.1.0.RELEASE</version>
                </dependency>
                <dependency>
                    <groupId>mysql</groupId>
                    <artifactId>mysql-connector-java</artifactId>
                    <version>5.1.47</version>
                </dependency>
                <dependency>
                    <groupId>org.mybatis.spring.boot</groupId>
                    <artifactId>mybatis-spring-boot-starter</artifactId>
                    <version>2.1.0</version>
                </dependency>
            </dependencies>

        </project>
        ```

    *   resources > application.yml

        ```yaml
        server:
          port: 9002
        spring:
          datasource:
            driver-class-name: com.mysql.jdbc.Driver
            url: jdbc:mysql:///security_authority
            username: root
            password: 3333
          main:
            allow-bean-definition-overriding: true #允许我们自己覆盖spring放入到IOC容器的对象
        mybatis:
          type-aliases-package: com.zhuangjie.xinke.domain
          configuration:
            map-underscore-to-camel-case: true
        logging:
          level:
            com.zhuangjie: debug
        ```

    *   包名：com.zhuangjie.xinke

        这很重要!!! 要和auth模块的包名一致！！！，虽然不报错，但是不行的

    *   包名 > OauthSourceApplication.java : 启动类

    *   包名 > domain

        *   SysRole.java

            ```java
            package com.zhuangjie.xinke.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;

            public class SysRole implements GrantedAuthority {

                private Integer id;
                private String roleName;
                private String roleDesc;

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public String getRoleName() {
                    return roleName;
                }

                public void setRoleName(String roleName) {
                    this.roleName = roleName;
                }

                public String getRoleDesc() {
                    return roleDesc;
                }

                public void setRoleDesc(String roleDesc) {
                    this.roleDesc = roleDesc;
                }

                @JsonIgnore
                @Override
                public String getAuthority() {
                    return roleName;
                }
            }

            ```

        *   SysUser.java

            ```java
            package com.zhuangjie.xinke.domain;

            import com.fasterxml.jackson.annotation.JsonIgnore;
            import org.springframework.security.core.GrantedAuthority;
            import org.springframework.security.core.userdetails.UserDetails;

            import java.util.Collection;
            import java.util.List;

            public class SysUser implements UserDetails {

                private Integer id;
                private String username;
                private String password;
                private Integer status;
                private List<SysRole> roles;

                public List<SysRole> getRoles() {
                    return roles;
                }

                public void setRoles(List<SysRole> roles) {
                    this.roles = roles;
                }

                public Integer getId() {
                    return id;
                }

                public void setId(Integer id) {
                    this.id = id;
                }

                public void setUsername(String username) {
                    this.username = username;
                }

                public void setPassword(String password) {
                    this.password = password;
                }

                public Integer getStatus() {
                    return status;
                }

                public void setStatus(Integer status) {
                    this.status = status;
                }

                @JsonIgnore
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return roles;
                }

                @Override
                public String getPassword() {
                    return password;
                }

                @Override
                public String getUsername() {
                    return username;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isAccountNonLocked() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isCredentialsNonExpired() {
                    return true;
                }

                @JsonIgnore
                @Override
                public boolean isEnabled() {
                    return true;
                }
            }

            ```

    *   包名 > controller

        *   ProductController.java

            ```java
            package com.zhuangjie.xinke.controller;

            import org.springframework.web.bind.annotation.GetMapping;
            import org.springframework.web.bind.annotation.RequestMapping;
            import org.springframework.web.bind.annotation.RestController;

            @RestController
            @RequestMapping("/product")
            public class ProductController {

                @GetMapping("/findAll")
                public String findAll(){
                    return "22产品列表查询成功！";
                }

            }

            ```

    *   包名 > config

        *   OauthSourceConfig.java

            ```java
            package com.zhuangjie.xinke.config;

            import org.springframework.beans.factory.annotation.Autowired;
            import org.springframework.context.annotation.Bean;
            import org.springframework.context.annotation.Configuration;
            import org.springframework.http.HttpMethod;
            import org.springframework.security.config.annotation.web.builders.HttpSecurity;
            import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
            import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
            import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
            import org.springframework.security.oauth2.provider.token.TokenStore;
            import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

            import javax.sql.DataSource;

            @Configuration
            @EnableResourceServer
            public class OauthSourceConfig extends ResourceServerConfigurerAdapter {

                @Autowired
                private DataSource dataSource;

                /**
                 * 指定token的持久化策略
                 * InMemoryTokenStore表示将token存储在内存
                 * Redis表示将token存储在redis中
                 * JdbcTokenStore存储在数据库中
                 * @return
                 */
                @Bean
                public TokenStore jdbcTokenStore(){
                    return new JdbcTokenStore(dataSource);
                }

                /**
                 * 指定当前资源的id和存储方案
                 * @param resources
                 * @throws Exception
                 */
                @Override
                public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
                    resources.resourceId("product_api").tokenStore(jdbcTokenStore());
                }

                @Override
                public void configure(HttpSecurity http) throws Exception{
                    http.authorizeRequests()
                            //指定不同请求方式访问资源所需要的权限，一般查询是read，其余是write。
                            .antMatchers(HttpMethod.GET, "/**").access("#oauth2.hasScope('read')")
                            .antMatchers(HttpMethod.POST, "/**").access("#oauth2.hasScope('write')")
                            .antMatchers(HttpMethod.PATCH, "/**").access("#oauth2.hasScope('write')")
                            .antMatchers(HttpMethod.PUT, "/**").access("#oauth2.hasScope('write')")
                            .antMatchers(HttpMethod.DELETE, "/**").access("#oauth2.hasScope('write')")
                            .and()
                            .headers().addHeaderWriter((request, response) -> {
                        response.addHeader("Access-Control-Allow-Origin", "*");//允许跨域
                        if (request.getMethod().equals("OPTIONS")) {//如果是跨域的预检请求，则原封不动向下传达请求头信息
                            response.setHeader("Access-Control-Allow-Methods", request.getHeader("Access-Control-Request-Method"));
                            response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
                        }
                    });
                }


            }

            ```

### \[\_3-2\_] 授权码模式测试&#x20;

启动auth、source模块

*   1、访问

    [http://localhost:9001/oauth/authorize?response\_type=code\&client\_id=heima\_one](http://localhost:9001/oauth/authorize?response_type=code\&client_id=heima_one "http://localhost:9001/oauth/authorize?response_type=code\&client_id=heima_one")

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16531855251231653185524919.png)

    从url中得到“授权码”

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16531855777661653185577104.png)

*   2、使用授权码发送请求获取token (授权码放在url的“code=<授权码>”)

    ```http
    ###
    POST http://127.0.0.1:9001/oauth/token?grant_type=authorization_code&client_id=heima_one&client_secret=123&code=jNOrPg HTTP/1.1
    Content-Type: application/x-www-form-urlencoded
    ```

*   3、使用access\_token 去请求资源

    注意，如果你auth与source模块的包名不同，这里将测试失败！！

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16531858287661653185828725.png)

    ```http
    ###
    GET http://localhost:9002/product/findAll?access_token=da48cb8f-7455-4a1f-8cb9-8cf708c2c0de HTTP/1.1

    ```

### +简化模式

1、访问[http://localhost:9001/oauth/authorize?response\_type=token\&client\_id=heima\_one](http://localhost:9001/oauth/authorize?response_type=token\&client_id=heima_one "http://localhost:9001/oauth/authorize?response_type=token\&client_id=heima_one")

2、登录，然后：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16531938213411653193821170.png)

### + 密码模式

```http
###
POST http://127.0.0.1:9001/oauth/token?grant_type=password&username=admin&password=3333&client_id=heima_one&client_secret=123 HTTP/1.1


```

响应就有access\_token了

### + 客户端模式

```http
###
POST http://127.0.0.1:9001/oauth/token?grant_type=client_credentials&client_id=heima_one&client_secret=123 HTTP/1.1


```

响应就有access\_token了
