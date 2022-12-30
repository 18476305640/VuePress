# Javascrit

## 目录

*   [基础](#基础)

    *   [基本知识](#基本知识)

    *   [内置对象](#内置对象)

    *   [DOM](#dom)

    *   [BOM](#bom)

*   [高级](#高级)

    *   [对基础知识的深入了解](#对基础知识的深入了解)

    *   [高级部分](#高级部分)

## 基础

### 基本知识

*   数据类型

    *   数据类型
        在js中有六种数据类型
        （基本数据类型）
        String ：在双引放单引
        Number :包括整数与浮点数；
        如何数值超过Number.Max\_value则会返回infinity(无穷的数值类型)；NaN也是一个数值类型。但他想表示这不是一个数值类型；对于精确度比较高的，千万不要使用JS运算，比如0.1+0.2得到的结果不准确。
        Boolean
        Null :使用typeof检查是Object类型
        Undefined 未定义，当我们声明一个变量，但没有赋值，输出时就会返加Undefined
        （引用数据类型）
        Object	对象

    *   数据类型的判断函数
        1-1、typeof 不可以判断null Object
        1-2、instanceof 对typeof进行补充，用来判定Object(具体)
        语法： 目标 instanceof  类型 ----判断左边是否是右边的实例
           1-3、“===” 对typeof进行补充, 可以用来判断 null undefined

    *   数据类型的转换
        1、a.toString()与String(a)函数转字符串
        \---前者有局限性，当a是null或Undefined类型时，会出现错误。
        2、Number(a)函数转为数值类型
        \--null、boolean比较特别，他在一定方面代表的是数字，会转为数字。而不是NaN;
        3、转布尔值的Boolean(a)函数(比较重要)
        \--【数字类型】0，NaN【字符类型】空串 ""以及【null】【Undefined】【Object】上面除了Object都转为false

*   转意字符
    \n 换行   对应HTML &#x20;

      \t 制表(tab)   对应HTML   

*   数值解析

    *   数字解析
        parseInt(a)，parseFloat(a)两个函数
        列举：0.123.4c.123
        \---parseInt(a),解析得0，原理是从左到右只解析数字，遇非数字结束。除此还可以用来解析进制数parseInt(123,8)
        深入应用：
        如何获取var i=134;的百十个位数呢？
        答：var bai=parseInt(i/100);
        var shi=parseInt((i%100)/10);
        var ge=i%10;
        快速理解：先% 后parseInt()+"/"

        ```纯文本
                ---parseFloat(a)，解析得0.123,从左到右解析数值，包括第一个小数点。
        ```

    *   字符解析
        以0x、0、0b开头分别代表什么进制数，分别是十六进制、八进制、十进制。
        '\u + 16进制的unicode编码'
        '\&# + 10进制的unicode编码 + 英文分号;'

*   运算

    *   运算符+
        不同数据类型进行加法运算, 主要看一对运算中是否有String、NaN.且优先级String>NaN,
        举例：1+null+"abc"=1abc

    *   非加运算符-\*%
        不管是何类型都转为Number运算。结果不是数字就是NaN; 
        \--原理是，从左到右将非数字类型转为数字类型如果转换失败，得到NaN,因为所有数值与NaN运算都是NaN,所以结束是NaN.

    *   等号与自增自减运算
        等号运算，“==”与“===”的区别在于是否会作转换，“===”是作全等运算。而“==”转换数据类型转换后进行全等运算。
        自增有a++，++a 区别在于第一次代表的值。而后面他的值是一样的，都是自增后的值。
        例举： var a=1;
        var b=1;
         	console.log(a++,++b);//第一次，*1 2*
        console.log(a,b);//第二次，*2 2*
        （-- 略）

    *   三目运算
        Boolean  ? A区：B区;三目运算符可以是语句块，也可以是某个值。
        \--补充：如果区是代码块最终变量是没能得到值的。

    *   赋值运算
        a=4与a\[+-\*/%]=b
        \--前者是单纯的赋值运算，而后者是表达式赋值。
        \--后者：a+=b  ==> a=a+b;

    *   逻辑运算
        首先将两边代码结果进行 ”布尔化“，根据&& （||），
        进行从左到右找false(true)。如果找到返回位置上对应的内容，如果没找到返回最后一位的内容。

    *   关系运算
        a>b,类似运算中，会将他们数值化，如果都是字符类型则不会数值化，而是比较他们的Unicode编码。如果在数值化过程中转为了NaN,则最后结束是false.

*   语句

    *   条件语句
        if语句： 完整语句体
        if(Boolean){
        switch语句
        switch(i){
        case a:
        代码体1
        break;
        case b:
        代码体2
        break;
        default:
        代码块3
        break;
        }

        ```纯文本
             }else if(Boolean){

            }else{

            }
        ```

    *   循环语句
        共性：初始化表达式、条件表达式、更新表达式。
        【循环语句while】while的结构是分散的。写法是从死循环到标准。
        【循环语句for】for循环语句与while相比，for的结构是在一起的。而执行的顺序如下：
        for(1初始化表达式;2,5/,8/...条件表达式;4,7,...更新表达式){
        3,6,...代码块
        }

    *   补充
        break(switch || 循环) ，continue专门用于循环

*   对象

    *   认识
        存储不同数据类型的容器，
        可以向里面添加任意的数据类型，包括对象，函数，数组与其它对象。

    *   工厂创建
        工厂模式
        将公共方法存到原型对象中，从而避免每创建一个对象就创建一个属性，来节省内存空间。
        function Pro(name,age){
        this.name=name;
        this.age=age;
        Pro.prototype.setName=function (newName){
        this.name=newName;
        }
        }
        var pro=new Pro("小庄",23);
        补充：
        this代表新创建的对象
        new就是调用了构造函数进行创建，其执行流程：
        1、立刻创建一个新的对象，
        2、将新建的对象设置为函数中this,在构造函数中可以使用this来引用新建的对象
        3、逐行执行函数中的代码//由我们书写，其它步骤不可见
        4、将新建的对象作为返回值返回
        使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类。通过一个构造函数创建的对象，称为是该类的实例。

    *   添加
        用方法添加
        \--obj.nama  ="";
        obj\["name"]="";
        用快捷表达法添加
        {
        name:123,
        "123":345
        }
        注意向对象添加的属性名可以不用符合标签符命名规则，但添加的方式需要用引号括起。

    *   读取
        普通
        obj.element
        特殊（对应添加）
        obj\["123"]

    *   查找
        检查obj是否包含有element属性
        var  ifs=("element" in obj);

    *   删除
        删除obj中的element属性
        dellete  obj.element

    *   遍历
        枚举
        for(var n in obj){
        console.log(n+":"+obj\[n]);
        //如果obj.n是在obj中找属性名为n 的属性值，但肯定是没有的，我们需要《样做。
        }

*   原型对象

    *   认识
        原型对象：
        不管在Object对象，函数(包括Function函数)，还是实例对象中，都有原型对象。且他们是存在有关系的。（请看附件）

    *   属性的查找
        关于检查：
        hasOwProperty：用来检查对象本身是否含有指定的属性
        pro.hasOwnProperty("name")
        "属性" in 对象.用来检查本身及其原型是否包含指定属性。
        举例：
        function Pro(name){
        this.name=name;
        }
        var pro=new Pro("孙悟空");
        pro.**proto**.age=23;
        console.log(pro.hasOwnProperty("name"));
        console.log("age" in pro);

*   函数

    *   认识
        函数本身也是对象，里面包含了可执行的代码。函数用来实现特定的功能。
        分类：
        (函数本身也是对象)
        var at3=new Function("console.log('原始');");
        at3();
         （有函数名）
        function fun1(){
        对象中的函数
        \--方法

        ```纯文本
            }
          (无函数名)
            有接收:
            var fun=function(){
              
            }
            无接收（立即执行函数）:
            (function(a){
              
            })("a")
        ```

    *   作用域
        全局变量作用域生命周期是由网页打开到关闭。
        而函数变量（局部）作用域从调用到调用结束。

    *   this
        在函数中，用对象调用，this就是该对象。
        在函数中，用函数的返回值调用，this是Window.
        在构造函数中，this代表的是新创建的对象。
        改变this:
        Per.call(obj,2,3);//依次传参
        Per.apply(obj,\[2,3]);//以数组的形式传参

    *   类数组arguments
        arguments，在函数中arguments包含了传进来的所以参数，而不限于形参。
        arguments是一个类数组，我们可以获取里面的包含的参数。
        我们也可以将这个类数据转为真正的数组。
        var args = Array.prototype.slice.call(arguments);
        除此
        我们还可以利用其cellee属性得到最近最近外围的函数。来实现递归。
        var num=1;
        function fu(){
        console.log(num++);
        arguments.callee();//相当于fu()
        }
        fu();

*   垃圾回收
    当一个对象，没有变量指向它的时候，js垃圾回收器就会自动 回收这些内存资源。

### 内置对象

*   数组

    *   认识
        数组是用来存储数据的，可以存储任意的数据类型。可以将其看作一个容器。

    *   基本使用
        数组是Array对象，快速用\[]快速创建。
        向后添加数据
        arr\[arr.length]="new 
        替换方法
        arr.splice(开始索引 , 向后数量 ,"新数组属性");

    *   数组的遍历
        两种方法：
        var arr=\[1,2,3,4];
        专门用于遍历数组的forEach方法（不可中途终止遍历）
        arr.forEach(function(val,ind){
        console.log("索引="+ind+",值="+val);
        });
        使用性更广的for循环遍历（可中途终止遍历）
        for(var i=0;i\<arr.length;i++){
        console.log("索引="+i+",值="+arr\[i]);
        if(i==2){
        break;
        }
        }

*   时间对象Date
    获取时间对象
    var auto=new Date();//获取当前时间
    var din=new Date("05/20/2020 13:14:00");//自定义一个时间
    时间对象的一些方法
    getDate()	以数值返回天（1-31）
    getDay()	以数值获取周名（0-6）
    getFullYear()	获取四位的年（yyyy）
    getHours()	获取小时（0-23）
    getMilliseconds()	获取毫秒（0-999）
    getMinutes()	获取分（0-59）
    getMonth()	获取月（0-11）
    getSeconds()	获取秒（0-59）
    getTime()	获取时间（从 1970 年 1 月 1 日至今）
    console.log(auto.getTime());//获取指定时间的时间戳
    var start=Date.now();//获取现在的时间戳。

*   数学对象Math
    Math对象（数学工具类）
    Math.floor(x) 的返回值是 x 下舍入最接近的整数：
    Math.ceil(x) 的返回值是 x 上舍入最接近的整数：
    Math.round(x) 的返回值是 x 四舍五入为最接近的整数：
    Math.random() 返回 0（包括） 至 1（不包括） 之间的随机数：
    获取X到Y的随机整数
    Math.round( Math.random()\*(y-x)+x )

*   包装类
    这个内容只需要理解即可，因为它是由底层使用的。
    关于包装类：
    为什么基本数据类型也可以用toString方法？
    为什么我们可以基本数据类赋值，却调用不了？
    因为当我们用基本数据类型调用一些方法时，底层会自动将基本数据类型转为对象。
    a.toString()====
    var b=new Number(a);
    console.log(b.toString());

*   操作字符的一些方法
    根据索引获取指定字符     ut.charAt(1);
    连接字符串           			 ut.concat("567","890");
    截取字符串中的内容     	 ut.slice(1,-1); \[起来s]
    将字符串进行拆分为数组    name.split(","); \[cplit]

*   正则表达式
    test方法：检查右边的字符是否符合左边的正则
    RegExp对象：动态修改正则表达式， new RegExp("\b"+cn+"\b");,会返回一个正则表达式对象
    str.match(/\[a-z]/ig); match方法将在左边满足的字符，装箱为一个数组。所以需要用全局g.
    (ig免忽略大小写且进行全局匹配，还有m执行多行匹配。)
    "".replace(//,"")利用正则进行替换字符

    ```纯文本
            （对字符的描述）
               [abc]、[A-z0-9]，
               \w 查找数字、字母、_
               \d  查找数字。
               \s  查找空白字符。
               \b  匹配单词边界。
             （字符量词）
              {n,m}左边一个字符或一个（）组出现n到m次，{m}出现m次，{m,}出现m次以上。
              +至少一个==={1,}
              *有没有都可以{0,}
              ?有或没有
             （字符位置）
              /^n/前面不能再有字符，
              /n$/后面不能再有字符
              /^n$/完全符合正则表达式，即：只能是str="n";才满足。
    ```

### DOM

*   事件

    *   认识
        我们给某个对象绑定事件，我们可以写触发后要执行的代码。
        有点击，双击，移入，移出，键盘，滚轮等事件。

    *   加载事件
        onload事件：由于文档加载自上而下的原因，我们需要用到这个事件，以免当我们对文档进行操作时，其对象不存在（还未加载 ）
        应用
        window\.onload=function(){
        //当文档加载完成后，会自动触发执行
        }

    *   焦点事件
        【焦点事件】
            onfocus得到焦点
            onblur失去焦点事件

    *   键盘事件
        键盘事件
        onkeydown键按下事件
            onkeyup键松开事件
            识别按下是哪个键：
              在键盘事件触发后，获取传入的参数event,可以根据event.keyCode==键码，根据特殊的
              event.altKey,event.shiftKey等，
              多键识别：我们可识别特殊键+非特殊键
            取消默认键盘行为
              键盘事件触发后，return false;时，在输入框时输入将无法正常使用。

    *   单击/双击事件
        单击事件
        up.onclick=function(){
        //要执行的代码
        };
        双击事件
        up.ondbclick=function(){
        //要执行的代码
        }

    *   滚动条事件
        onscroll 事件：当我们滑动滚动条时触发
        使用： info.onscroll=function(){}
        获取滚动条的一些信息：
        //info.scrollHeight是总高度
        //info.scrollTop当前滚动条到top的长度
        //info.clientHeight可见页面高度
        扩展：
        组件可用性：disabled=true|false;

    *   滚轮事件
        滚轮事件
        box.onmousewheel = function(event) {//滚动触发
          event = event || window\.event;
          if (event.wheelDelta > 0 || event.detail < 0) {//判断是否是下滚动且兼容
            box.style.height = box.clientHeight - 10 + "px";
          } else {
            box.style.height = box.clientHeight + 10 + "px";
        }
          event.preventDefault && event.preventDefault(); //解决连带滚动条滚动问题,&&当可用时执行
          return false; //取消默认行为（滚动默认连动总页面滚动）
        }
        //解决滚轮事件浏览器兼容问题，如果是火狐，它是不支持onmousewheel事件的，
        bind(box, "DOMMouseScroll", box.onmousewheel);
        function bind(obj, eventStr, callback) { //事件监听兼容函数
          if (obj.addEventListener) {
            obj.addEventListener(eventStr, callback, false);
          } else {
            obj.attachEvent("on" + eventStr, function() {
              callback.call(obj);
            });
          }
        }

*   节点

    *   获取节点
        【获取节点】
        （document）
        document.getElementById("bt");//根据Id获取节点
        getElementsByTagName("li");//演示根据标签名获取组属性
        document.getElementsByName("user");//演示根据name的属性获取组属性
        var bufu=document.querySelectorAll("#imgbox"); //根据css选择器获取组节点
        【获取关系节点】
        fu.children;//获取全部子属性节点
        down.parentNode;//获取父节点
        down.previousElementSibling;//获取前一个兄弟节点
        down.nextSibling;//获取后一个兄弟节点

    *   创建节点
        【创建节点与节点关系】
        var but=document.createElement("button");//创建一个属性节点
        var btext=document.createTextNode("最后一张"); //创建一个文本节点（可在父节点用innerHTML代替）
        but.appendChild(btext);//将新节点插入指定节点下
        bufu.insertBefore(but,down);//将新的节点插入指定的子节点之前。
        bufu.replaceChild(but,down);//将新节点代替旧节点
        but.parentNode.removeChild(but);//删除子节点

    *   读取节点
        读取节点的属性与内部HTML代码
        bt.value;//读节点属性。
        （class属性是保留字，需要.className去读取）
        bt.innerHTML;//读内部HTML代码 
        bt.innerText;//获取除标签外的全部内部文本

    *   应用

        *   修改样式
            为属性设置内部样式属性
            obj.style.backgroundColor="red";
            除此，我们还可以通过修改Class值来添加或删除一组样式。

        *   读取样式
            利用下面的方法可以读取现在正在显示的样式
            function getStyle(obj,name){//读取现在的样式属性值
            if(window\.getComputedStyle){
              //大部分浏览器支持
              return getComputedStyle(obj,null)\[name];
            }else{
              //只有IE8支持
              return obj.currentStyle\[name];
            }
            }

*   捕获与冒泡
    如果以父子关系依次相关联的，当子事件被触发时，以W3C的标准，分为从document到目标的捕获阶段，再到从目标向外的冒泡阶段。如果我们想在捕获时执行，需要在事件监听器
    obj.addEventListener(eventStr,callback,false);

    *   事件的冒泡
        子元素事件被触发会自动触发相同事件的父元素。
        取消冒泡
        var maot = document.getElementById("maoTest"); //取消冒泡
            maot.onmousemove = function(event) {
                event.cancelBubble = true; //隔板生效
            }

    *   事件的委派
        每个事件被触发后执行的函数都可以接收一个参数，他封装了一些信息，如由于事件的冒泡，我们不确定是谁触发的自己，这时参数对象有一个target属性，可以得到最先被触发的那个对象。

*   自定义方法

    *   拖拽函数
        使用方法：只需传入要移动对象即可。
        function Tuo(box){ //拖拽函数
        //给box添加一个鼠标按下事件
        box.onmousedown=function(event){
        //获取点击时在box中的相对位置x2,y2
        var  x2=event.clientX-box.offsetLeft;//
        var  y2=event.clientY-box.offsetTop;
        //给document添加一个拖拽事件
        document.onmousemove=function(event){
        //将传进来的event参数加强兼容性
        event=event || window\.event;
        //获取鼠标在document中的位置
        var  x=event.clientX;
        var  y=event.clientY;
        //修改box中的top与left属性
        box.style.top=y-y2+"px";
        box.style.left=x-x2+"px";
        }
        }

        ```纯文本
          }
          document.onmouseup=function(){//当松下后，关闭移动与松下事件
              document.onmousemove=null;
              document.onmouseup=null;
          }
          return false; //解决全选后拖拽不了的问题
          
          
        ```

    *   方向键移动函数
        box ：是要移动的对象
        a ：是物体移动的速度
        function boxmove(box, a){
        var fan;//移动的方向
        //当按下一个键时，改变方向变量fan的值。松开时设置为空。
        //即我们按下时就朝着设置好的方向移动，松开后没有移动方向。
        document.onkeydown=function(event){
        fan=event.keyCode;
        document.onkeyup=function(){
        fan=null;
        }
        }

        ```纯文本
          }
          
          var  yidon=setInterval(function(){
            switch(fan){
              case 37:
                box.style.left=box.offsetLeft-a+"px";
                break;
              case 38:
                box.style.top=box.offsetTop-a+"px";
                break;
                
              case 39:
                box.style.left=box.offsetLeft+a+"px";
                break;
              case 40:
                box.style.top=box.offsetTop+a+"px";
                break;
          }            
          },30);    
        ```

### BOM

*   认识BOM
    浏览器对象模型BOM

*   Navigator
    【Navigator】
    \--获取浏览的信息，识别不同浏览器
    var  ua=navigator.userAgent;
    if(/firefox/i.test(ua)){
      alert("你是火狐");
    }else if(/chrome/i.test(ua)){
      alert("你是谷歌");
    }else if(/msie/i.test(ua)){
      alert("你是IE");
    }else if("ActiveXObject" in window){
      alert("你是IE11，枪毙了你\~");
    }

*   Location
    【Location】
    \--代表浏览的地址栏
    //执行后会跳转到指定链接上
    location.assign("[http://www.baidu.com](http://www.baidu.com "http://www.baidu.com")");
    //执行后会清除缓存
    location.reload(true);
    //执行后会替换当前，且不可逆。
    location.replace("[http://www.baidu.com](http://www.baidu.com "http://www.baidu.com")");

*   History
    【History】
    \--当前容器的历史记录
    history.back();//当前窗口的上一个页面
    history.go(-2);//跳转到前第二个页面
    history.forward();//当前窗口的下一个页面

*   screen
    【screen】
    \--获取显示器的相关信息

*   定时器&超时调用
    定时器
    setInterval(function(){
    },<循环调用时间>);
    clearInterval( );//关闭指定的定时器
    超时调用
    setTimeout（function(){
    },<调用时间>);
    clearTimeou //关闭指定的超时调用

    *   自定义的方法
        /\*
        1、动画函数
        obj：目标属性
        speed：改变的速度
        target:改变的幅度
        type:top\left\width\height
        fun:回调函数，动画执行完时调用
        \*/
        function move(obj, speed,target,type,fun){
        console.log("你调用了jsTools中的move动画函数\~");
        function  getStyle(obj , name){//根据样式名获取样式值
        if(window\.getComputedStyle){
        return getComputedStyle(obj,null)\[name];
        }else{
        return obj.currentStyle\[name];
        }
        }
        //函数主体
        clearInterval(obj.ding);
        if(parseInt(getStyle(obj,type))>target){
        speed=-speed;
        }
        obj.ding=setInterval(function(){
        var oldValue=parseInt(getStyle(obj,type));
        var newValue=oldValue+speed;
        if((speed<0 && newValue < target ) ||( speed>0 && newValue > target) ){
        newValue=target;
        obj.style\[type]=newValue+"px";
        clearInterval(obj.ding);
        fun ?fun(): console.log("未传入回调函数");//执行回调函数
        }else{
        obj.style\[type]=newValue+"px";
        }
        }
        /\*
        2、添加或删除指定Class值
        obj：目标属性
        cn:是要添加或移除的Class值
        \*/
        function hasClass(obj,cn){//有添加，无删除Class指定值
        var ze=new RegExp("\b"+cn+"\b");
        if(ze.test(obj.className)){
        obj.className=obj.className.replace(ze,"");
        console.log("已替换");
        }else{
        obj.className+=" "+cn;
        console.log("已添加");
        }
        }
        function AddClass(obj,cn){//没有添加 
        var ze=new RegExp("\b"+cn+"\b");
        if(! ze.test(obj.className)){
        obj.className+=" "+cn;
        }
        }
        function RemoveClass(obj,cn){//有移除
        var ze=new RegExp("\b"+cn+"\b");
        obj.className=obj.className.replace(ze,"");
        }
        /\*
        3、二级菜单伸缩动画函数
        使用说明：给具有指定结构的二级菜单栏添加伸缩动画效果
        \<div id="my\_menu" class="sdmenu">
        \<div class="collapsed">
        在线工具图像优化
        ...
        支持我们图像优化收藏夹图标
        ....

        */
        function mocc(boxId){
        var box=document.getElementById(boxId);
        //获取二级菜单主体下的span
        var title=box.getElementsByTagName("span");
        var index;
        //遍历span
        for(var i=0;i\<title.length;i++){
        title\[i].index=i;
        title\[i].ofno=false;
        //为每个span绑定一个单击响应函数
        title\[i].onclick=function(){
        //得到当前span的父节点,与其下一个兄弟
        var Tparent=this.parentNode;
        var Tsibling=this.nextElementSibling;
        if(Tsibling){
        //分别得到展开前后的动态值
        var init=Tparent.querySelector("span").offsetHeight;
        var end=Tparent.querySelectorAll("a").length*(Tsibling.offsetHeight)+init;
        //根据现在的状态，给等下要操作的目标长度赋值 后修改操作后的状态
        var mo=this.ofno ? init :end;
        this.ofno ? (this.ofno=false) : (this.ofno=true);
        move(Tparent,6, mo,"height",function(){
        });
        }

        ```纯文本
                  },30);
                  
        ```

        ```纯文本
                  }
                }
              }
        ```

## 高级

### 对基础知识的深入了解

*   函数参数
    我们给函数传入参数时，就相当于在函数作用域中声明了一个变量。

*   资源的回收
    自动释放：生命周期完后
    回收:没有变量指定这个内存地址后，这块内存就会被回收器回收。

*   \[]在对象中的应用
    var obj={
    "a-b":123,
    "123":"ab"
     }
    console.log(obj\["a-b"]); //特殊属性名时
    var  name="a-b";//属性名不确定时
    console.log(obj\[name]);

*   回调函数
    什么是回调函数？
    \---你定义了，没有调用，但最后执行了。
    比如：事件 、定时器

*   IIFE
    IIFE ——立即执行函数的作用
    \---不会污染全局命名空间，隐藏实现。

*   isAdd分号?
    关于加不加分号问题
    \---小括号、中括号 前不加就会报错。
    var a=3
    (function(){alert(123)})()
    或
    var a=3
    \[1,2]forE....

### 高级部分

*   原型对象

    *   再认识
        函数的原型对象默认指向一个空对象，里面默认有下面这两个属性。
                    constructor //指向自己this
                    **proto** //原型的原型对象

    *   显式原型与隐式原型
        显式原型对象与隐式原型对象
        函数prototype 显式原型对象====对应实例的 **proto** 隐式原型对象
                  创建函数时，Fn.prototype={}
                  创建实例时，this.**proto**=Fn.prototype

    *   原型链

    *   原型链的继承

*   变量提升与函数提升
    \*变量提升与函数提升
    变量提升，执行之前先声明，但未赋值
    函数提升，在语句之前已声明，完整存在

    ```纯文本
        理解：在变量执行之前，就可以访问到了，但它的值是undefined。在函数执行之前，就可以调用到了。因为存到了上下文中栈中了。
        且先执行变量提升再执行函数提升！！
        注意：就算是if语句中的变量，也是会自动进行变量提升的。
    ```

*   作用域
    \*作用域 ——迷惑型题目
    题1：
    var a=4;
    function fun1(){
    console.log(a);
    }
    function fun2(){
    var a=6;
    fun1();
    }
    fun2();
    结果： 4 ，是根据自己身所在位置进行查找的，而不是根据关系查找。
    题2
    var obj={
    tet:function (){
    console.log(tet);
    }
    }
    obj.tet();
    结果是：报错，找不到
    总结：是根据上下文栈块逐层查找的。

*   执行上下文

    *   分类
        JavaScript 中有三种执行上下文类型。
        全局执行上下文 — 这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。
        函数执行上下文 — 每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。
        Eval 函数执行上下文 — 执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它。

    *   执行上下文栈

        *   执行上下文栈.jpg

*   闭包

    *   产生的条件
        函数内嵌套有函数，
        内函数引用了外函数的属性（变量或函数),
        并且外部函数被调用执行;
        (function Pro(){
        var a=Math.random();
        window\.mm=function (x,y){
        return Math.floor(y-a\*(y-x));
        }
        })()//外部函数调用

    *   自定义JS模块
        js自定义模块
        将代码封装在一个JS文件中，有特定功能。向外暴露一些行为函数。
        1、私有数据
        2、操作数据的函数
        3、向外暴露对象（给外部使用的方法）
        var myModule = (function(){
        var var1 = 1;
        var var2 = 2;
        function func1(){
        ...
        }
        function func2(){
        ...
        }
        return {
        func1: func1,
        func2: func2
        };
        })();

    *   终极面试题
        终极面试题
        function fun(n,o){
        console.log(o);
        return {
        fun:function (m) {
        return fun(m, n);
        }
        }
        }
        var a=fun(0).fun(1).fun(2).fun(3);
        解析：a=fun(0) 时，它的返回值中含有闭光，值为0
        ...fun(1) 时，它的返回值中含有闭光，值为1
        .....f

*   内存的溢出与泄露
    \*内存溢出与内存泄露
    你需要的内存大于剩余的内存空间，就会导致内存溢出。从而报错。
    内存泄露：不合理地占用内存资源，而不及时地释放
    ，如，定时器、函数中变量的错误声明为全局变量等，都会导致内存泄露从而使内存溢出。

*   借用构造函数
    构造函数借用构造函数：得到属性
    function Fun1(age){
    this.age=age;
    }
    function Fun2(name,age){
    this.name=name;
    Fun1.call(this,age);//开始借用
    }

*   单线程与多线程

    *   认识
        \*单线程与多线程
        有的程序是单进程有的是多进程的，而多进程数据一般是不共享的，且每一个进程可能有多个线程。
        JS是单线程的：警告框可以暂停主线程的执行，如果是多线程会带来很复杂的同步问题。

    *   Web worker多线程技术
        \*Web Worker
        Web Worker，作为JS中的多线程技术，主要用来处理耗时较长的程序。
        主线程（老板）---调用\*.js文件
        var wo=new Worker("fine.js");
        wo.postMessage(1);//向分线程发送数据
        wo.onmessage=function (e){
        //接收分线程传过来的数据
        console.log(e.data);
        }
        分线程（工人）---\* .js
        var onmessage=function(event){
        var jout=++(event.data); //接收主线程传过来的数据
        postMessage(jout );//向主线程发送数据
        }

*   回调队列

    *   认识
        回调队列
         	初始化代码执行完后，才会执行回调代码，而执行回调代码时先将它们添加到对应的模块中，当条件满足时，如点击了，定时器的时间到了，就会将其添加到回调队列后面进行排队,然后先进先出。
        \*Web Worker

        ```纯文本
          var yfd=document.getElementById("yfd");
          yfd.onclick=function (){//点击后，会在后面添加到回调队列中。
            console.log("点击事件:进入回调队列并执行了~");
          }
          setTimeout(function (){
            console.log("外部定时器已开始");
            setTimeout(function (){console.log("内部定时器结束了")},3000);//会添加对应模块中，3秒条件满足后，会在后面添加到回调队列中。
            console.log("外部定时器已结束,此时如果你不点击回调队列中没有东西。但已新添加了一个定时器，等下不管你有没有点击，3秒后都会添加到事件队列中");
          },20);
          console.log("初始化执行完了。。");
        ```

    *   图解

*XMind: ZEN - Trial Version*
