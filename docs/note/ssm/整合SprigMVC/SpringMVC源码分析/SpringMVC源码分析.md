# SpringMVC源码分析

## 目录

### \[\_1\_] 进入doDispatcher前

### \[\_2\_] doDispatcher的执行流程

（1）调用mappedHandler = this.getHandler(processedRequest);  获取能够处理当前请求的执行链 HandlerExecutionChain （handler+拦截器）。

如何获取handler的？会遍历handlerMappings数组，对应的是不同的Mapper对象。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16518867643421651886763638.png)

（2）HandlerAdapter ha = this.getHandlerAdapter(mappedHandler.getHandler()); 从执行链中获取handler调用getHandlerAdapter方法获取 HandlerAdapter 。

如何获取的handlerAdapter？会遍历handlerAdapters数组，对应的是不同的adapter对象。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16518930253451651893025237.png)

（3）mv = ha.handle(processedRequest, response, mappedHandler.getHandler()); 调用HandlerAdapter 的handle方法去执行那个handler得到ModelAndView。

（4）this.processDispatchResult(processedRequest, response, mappedHandler, mv, (Exception)dispatchException); 调用processDispatchResult方法结合mv完成视图渲染与跳转。

### \[\_3\_] 九大组件&#x20;

```java
    //多部件解析器
    @Nullable
    private MultipartResolver multipartResolver;
    //国际化解析器
    @Nullable
    private LocaleResolver localeResolver;
    //主题解析器
    @Nullable
    private ThemeResolver themeResolver;
    //处理器映射器组件 
    @Nullable
    private List<HandlerMapping> handlerMappings;
    //处理器适配器组件 
    @Nullable
    private List<HandlerAdapter> handlerAdapters;
    //异常解析器组件
    @Nullable
    private List<HandlerExceptionResolver> handlerExceptionResolvers;
    //默认视图名转换器组件 
    @Nullable
    private RequestToViewNameTranslator viewNameTranslator;
    //flash属性管理组件
    @Nullable
    private FlashMapManager flashMapManager;
    //视图解析器
    @Nullable
    private List<ViewResolver> viewResolvers;
```

### \[\_4\_] 组件的初始化

tomcat启动后，会有事件触发DisplayServlet调用onRefresh 方法，然后进行调用方法进行初始化。
