# Jquery

总结1：

1、初识

jQuery是一个js文件，下载后引用即可使用。

jQuery压缩包，有两个文件，压缩与未压缩的。未压缩在写代码时用的，当发布时用压缩的js文件。

jQuery的顶级对象：

我们知道DOM的顶级对象是document,BOM的顶级对象是window,而jQuery的顶级对象是\$。

且它们之间存在window\.document.\$这样的关系。

jQuery入口函数的写法

第一种：\$(douement).ready(function(){

});

第二种(推荐)：\$(function(){

})

还有...

入口函数加载的区别：

原生与jQuery会等页面DOM对象加载完成，但jQuery入口函数不会等待页面的图片的加载。

解决jQuery的\$符号冲突问题：

释放$的使用权：var yy=$.noConflict();//用yy代替了\$,其它不变。

2、核心函数--\$()

使用：

1、接收函数--入口函数

2、接收字符串，作为选择器或生成DOM对象（如果字符串内是html代码）

3、接收DOM--包装为jquery对象

扩展：jQuery对象的本质是一个伪数组。验证：输出\$("<选择器>")，（如果有0\~length-1的属性，并且有length属性就是一个伪数组）

3、(回顾JS)静态方法与实例方法

function AClass(){

}

静态方法:

直接添加在类中，AClass.staticMethod=function (){} [//用函数名调用AClass.staticMethod](//xn--AClass-hh3ji0lsw5cx36ada5231e.staticMethod "//用函数名调用AClass.staticMethod")();

实例方法：

添加在类的原型中，AClass.prototype.instanceMethod=function (){};//用类的实例调用 new AClass().instanceMethod();

4、jQuery的静态方法

遍历的方法each与map

说明:jQuery的each与map方法既可以遍历数组与字典，特别字典——伪数组，可以它有一个length属性，可以像数组一样进行遍历。两者遍历方法不同的是map可以接收其返回值来返回一个新数组，且两者回调函数参数位置颠倒。

伪数组是一个字典,具有正确的index:value,..与length:Num属性，遍历方法会根据length来检查index:value如果在此长度内有不合法的就会判断为字典，而不是伪数组。（\$.isArray(v)静态方法 可判断是否是一个真数组,即真数组与伪数组间的判断）      使用：

var vei={0:2,1:2,2:3,3:4,length:3};

//单纯的遍历用each

\$.each(vei,function (index,value){

});

\=====================================

//想通过处理遍历数组并返回新数组用map

var reArr=

\$.map(vei,function(value, index){

return value;

});

元素的大小：

使用及说明：

width()或height()获取的是元素实际大小。

innerWidth()或innerHeight()包括内边距

outerWidth()或outerHeight()包括边框//若传入true参数,包括外边距

jQery常用的几个静态方法

（1）holdReady(boolean);//是jQuery入口函数的开关。在jQuery入口函数前传入true暂停jQery，false是恢复。

（2）val();//获取value属性值。特别地，应用在select中，子标签option的value值就是select的value值。

（3）index();//获取在兄弟元素中对应的索引值

（4）trim(str);//返回str去除两边空格的字符串。

5、使用WS编写代码的两个技能

生成死代码：打开设置搜索live左边加号添加一个Live  Template，记得设置应用的“场景”。

默认打开的浏览器：在Keymap下搜索default openn这项，为其添加一个快捷键即可（可在设置中直接搜索）。

6、jQuery选择器

选择器：

默认已会的：

普通选择器：id、class、标签选择器

常用复合选择器：标签+类选择器

多条件选择器：\$("div,p,h2");

层级选择器：“x p”与“x>p”，前者是后代的，后者是子代的。

特定选择器：

索引选择器：\$("ul>li:eq(4)"):索引为4的。如果"大于4"的（多个）:gt(4),"小于4"的（多个）:lt(4)。

\##奇偶选择器：$("ul>li:even")偶，$("ul>li:odd")奇；

首尾选择器：\$('li:last')最后面的; first最前面的。

属性选择器：$(".comment>li[index=1]")。// [index^=1][index$=1]\[index\*=1]

\##显示与隐藏选择器：:hidden获取display=none的元素，:visible"获取可见元素//补充：display（隐藏）与visibility（隐形）

排除选择器：not('#beng\_3')，''内是选择器，排除选择器内的。

查找：

关系选择器：

父对象：parent("li")//括号内是父类的特征

兄弟：

next() //下一位兄弟，nextAll()下面的全部兄弟元素

prev() //上一位兄弟，prevAll()上面的全部兄弟元素

siblings("li") //选择全部li兄弟元素。

子元素：children(".menu\_head")//选择class="menu\_head"的子对象。

再寻选择器：\$("p").find("#live") //find参数是一个选择器，借选择器来帮我们查找。

表单子属性选中选择器:

下拉列表select\[name=?]>option\[value?]：（multiple="multiple" 加入该属性可多选）选择器":selected" 匹配所有选中的option元素 (使用示例：\$("select option:selected") ) 。

复选框（input:checkbox && name相同）或单选按钮(input:radio && name相同才是一组单选组)\[方圆选框]：":checked"  匹配所有选中的被选中元素  (使用示例：\$("input:checked") )

7、属性与属性节点:

介绍：任何对象都有属性，但只有DOM对象才有属性节点，因为DOM对象存在attributes属性，里面的属性就是属性节点。

jQuery:

prop：用于操作对象的属性（id,class,name...）。

查增：\<jQuery对象>.prop(..);//一个参数查找，二个参数设置。

删除：\<jQuery对象>.removeProp(..);//只有一个参数，想删除多个只需用空格隔开。

attr：操作方法同上。用于操作属性节点，也可以操作属性，但特别的属性如checked等属性，attr得到的是undefined。这个是我们不想看到的。这时我们需要用prop来代替。

8、jQuery操作样式

通过添加类单元

addClass("class1 class2");//添加类名\[可链式]

removeClass("class2");//删除类名，什么都不写，移除目标的所有class单元

toggleClass("class1");//有删除，没有添加

hasClass(<检测的类名单元>); //查看有没有此类名

通过css属性：

\<jquery对象>.css("width","100px").css(..)..;//单链单参数为读取

批量设置：\<jquery对象>.css({//介意使用

width:"100px", //如果”值“改为函数，可以得到两个函数参数，顺序是index与现在的属性的大小，而index是选择器中自己所在的索引

backgroundColor:"red"

});

9、操作文本值属性

\<jQuery对象>.html(v);//赋入值就设置，没有就获取

\<jQuery对象>.text(v);//同上

\<jQuery对象>.val(v);//同上，且可获取/设置文本框的value属性值。

总结2：

1、位置　

点击的点位置　　　　　　

clientX、clientY: 点击位置距离当前可视区域的x，y坐标\[已验证]

pageX、pageY :对于整个页面来说，包括了被卷去的body部分的长度

相对距离：在定位的基础上，即子元素跟最近定位的祖先元素的距离。

获取：position();//输出是与最近定位元素的距离（自身的定位量属性）{top:"",left:""}

设置：jquery不支持这种方式进行设置，可以通过设置其css设置。

## 另外offsetParent可以获取最近的祖先定位元素

绝对距离：该元素在窗口边框的距离。\[已验证：并不是相对含有定位的父元素的值]

获取：offset().left;

设置：offset({

left:300,

top:200

});

滚动条：首先对目标设置overflow,变成滚动状态，然后用下面的方法获取滚动条的滚动距离，如果有值则设置（设置式滚动）

hidden    内容会被修剪，并且其余内容是不可见的。

scroll    内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。

auto  如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。

垂直：$("#scroll").scrollTop()+$("#scroll").height() > \$("#scroll")\[0].scrollHeight

水平：$("#scroll").scrollLeft()+$("#scroll").width() > \$("#scroll")\[0].scrollWidth

事件:如果是页面滚动条，要给window绑定事件

\$(window).scroll(function(){

//水平/垂直滑动会触发

});

2、几个重要的css属性

元素的隐藏与隐形：

隐藏:display:none/bolck

隐形：visibility:hidden/visible

\#扩展：通过为父元素添加class,使子元素指定样式生效。（内部用到父元素的class）。

\$("li").mousemove(function (){

\$(this).addClass("c1");

});

3、链式编程

条件：在jquery中，大部分都是返回jQuery对象的，链式编程就是把jquery方法且返回jquery对象的方法连在一直。

常用方法：

end():如果返回的是jquery对象但已不是头部的对象(断链)，我们可以用此方法返回到最近的一个"破坏性"操作之前。

4、动画

（1）显示与隐藏

show(900);//参数还可以是特定的字符串

hide(900);//参数还可以是特定的字符串

（2）滑入与滑出

slideUp(800);//收起

slideDown(800);//拉下

slideToggle(800);//切换

（3）淡入与淡出

fadeIn(2000) //淡入

fadeOut(2000) //淡出

fadeToggle(2000) //切换

fadeTo(2000,0.4) //透明度

（4）属性动画效果

\$("#box").animate({

"":"",

"":"",

"":""

},<改变的时间>,\[过渡效果'linear'是匀速],\[回

（5）停止当前的动画，执行后面的动

delay(ms): \$("#ul1").animate({},700).delay(2000).animate({},700) //delay不马上执行链后面的，而是等待指定的时间后执行。

stop(): (boolean,boolean)==第一个参数：是否停止后续的动画，第二个参数：是否立即完成当前动画（为flase或无参代表立即停止当前动画）。　　

(6)实现无限滚动的方法

1、利用外边距实现：如果向左无限滚动

offSet = 0;

var tt;

function autoPlay(){

tt = setInterval(function () {

offSet -= 10;

\$("ul").css({

"marginLeft": offSet

});

if (offSet <= -800) {

offSet = 0;//一下子换过来

}

}, 50);

}

关闭：clearInterval(tt);

继续：autoPlay();

2、利用动画animate实现无限滚动

var m=-800;

function autoPlay(){

\$("ul").animate({

left:m

},4000,function (){

\$(this).css({

left:"0px"  //一下子换过来

});

autoPlay();//递归式

});

}

autoPlay();

关闭：stop();//停止当前的动画，

4、关于节点

外前：在指定元素前面添加一个兄弟元素 \$("div").before(\<new>);

内前：在指定元素中所以元素前添加一个子元素 \$("div").prepend(\<new>);//被动添加（相反）用prependTo

内后： 在指定元素中所以元素后添加一个子元素 \$("div").append(\<new>); //append是被动添加，而appendTo是主动添加

外后：在指定元素后面添加一个兄弟元素 \$("div").after(\<new>);

除此，我们还可以用html添加元素，但如果不处理，不同的是html方法是在元素内进行替换原有元素的。

数据的遍历添加，示例：

var att=\$.map(datas,function (value,index){

return "\<tr>\<td>\<a href='"+value.url+"'>"+value.name+"\</a>\</td>   \<td> "+value.type+"\</td>\</tr>";

});

\$("#tbd").html(att);

删除元素

1、\$("div.box:eq(0)").empty();清除

2、\$("div.box:eq(0)").html("");

3、\$("div.box:eq(0)").remove();自决

4、元素保留式删除

\$(".box3").click(function (){

//删除元素的标签的事件

alert("Hello!");

});

\$("button:eq(3)").click(function (){

//删除-保留

var rb=\$("div").detach(".box3");//左参数大致，右才是真正，如没是大致

\$("button:eq(4)").click(function (){

//恢复

\$("#box1").append(rb);//

});

});

元素的克隆

var obj=\$("div.box:eq(0)").clone();

\$("div.box:eq(1)").append(obj);

元素的包裹：

将指定元素进行包裹： \$("p").wrap({function(){ return "\<div>\</div>"}});

批指定元素的父元素删除（拆包）\$("p").unwrap();

\##\$(",").wrapAll(function(){ return "\<div>\</div>"});将选中的元素用一个元素包裹起来。

## ## \$("").wraplnner(function(){ return "\<div>\</div>"});将每一个匹配的元素的子内容(文本节点也会包裹起来)用一个HTML结构包裹起来

元素的替换：\$("p").replaceWith("<新标签>");

6、案例

（1）全选与全不选(逻辑)

\$(function () {

//当点击全选/全不选时

\$("#j\_cbAll").click(function (){

$("#j_tb").find(":checkbox").prop("checked",$(this).prop("checked"));

});

//当点击下面的时，会获取checkbox的数量与已选中（checked=true）的checkbox的数量，如果相等，改变全选/全不选为打勾，否则设置为不打勾状态。

\$("#j\_tb").find(":checkbox").click(function (){

var sum=\$("#j\_tb").find(":checkbox").length;

var issum=\$("#j\_tb").find(":checked").length;

if(sum==issum){

\$("#j\_cbAll").prop("checked",true);

}else{

\$("#j\_cbAll").prop("checked",false);

}

});

});

（2）固定导航栏（逻辑）

\$(function () {

//滚动条事件：只要全局文档的滚动条滚动就会被触发

\$(document).scroll(function (){

\\\如果垂直方向滚动的距离大于导航栏以上的距离,...

if($(document).scrollTop()>=$(".top").height()){

\$(".nav").css({

position:"fixed",

top:"0px"

});

$(".main").css("marginTop",$(".nav").height());

}else{

//将导航栏还原

\$(".nav").css("position","static");

\$(".main").css("marginTop",0);

}

});

});

7、事件的绑定

介绍：事件的绑定除了以eventName(function(){});这种外，还有以下这些，它们绑定相同或不同事件都是不会覆盖的。这有点像css({})模式一样，css是为元素批量设置样式，而在事件on({})，我们可以用元素设置批量绑定事件。

使用：

（1）为自己绑定多个事件

\$("#box").on({

"click":function(){alert("点击了")},

"mouseover":function (){alert("滑入")}

});

\#代替此功能的方法：bind方法，除此bind还可以一次为元素绑定多个行为相同的事件。

\$("#but1").bind("click mouseover",function (){

//为一个元素绑定多个事件，但事件行为是一样的。

});

（2）事件的委托

说明：委托的元素一般是其外层元素（祖父），子元素被点击后，通过事件的冒泡，委托的元素监听到点击了谁，然后回调函数的this指向它，而在表面看来是为其子元素绑定了事件。

\$("#box").on("click","p",function (){

//this是动态的

});

代替此功能的方法：delegate，它也可以为子元素绑定事件（注意参数不同）。

\$("#box").delegate("p","click",function (){

//this是动态的

});

（3）事件的解绑

\$("#自身").off("事件名","子代");//off无参自身及子代，有一参为自身解除指定事件（子代delegate绑定的事件被解绑），有两参为子代解除

## ## \$("#a").unbind("click");//为指定元素解除指定的事件

\$("#parend").undelegate("#child","click");//还有删除由delegate()方法绑定的事件

（4）事件的触发

\$("#but1").click();//不能写参数，触发 \$("#but1")的click事件。

\#其它触发方法

\$("#but1").trigger("click");//需要写参数（事件名），会触发默认行为与事件冒泡。

\$("#but1").triggerHandler("click");//不会触发默认行为与事件冒泡

# 默认行为：只输数字案例

//用return false;或：

\$("#key").keydown(function(e){

e=e||window\.e;

var key=e.keyCode;

if((key<48 && key!=8) || (key>57 &\&key<96 )|| key>105 ){

e.preventBubble(); //主动取消默认行为

}

});

\#事件的冒泡：如果子父级有相同的元素，如果子级的事件触发了，会向外（根级）冒泡，即外面的相同事件也会被触发，如果在回调函数中返回false，就可以取消事件的冒泡与默认行为（比如点击超链接会默认跳转）。

\$("#a3").click(function(e){

e=e||window\.e;

//return false; //停止事件的冒泡，且结束函数

e.stopPropagation();//停止事件的冒泡行为，并且不会结束函数

});

（5）自定义事件

意义：可以在一种条件下进行触发，而这就是自定义事件的触发条件。

设置：以on进行设置如\$("..").<自定义的事件名>(function(){...});

触发：用trigger（"\<eventName>"）;来触发自定义的事件。

（6）事件的命名空间

说明：如果我们想设置有命名空间的事件，要用on设置，比如\$("...").on("click.zjazn",function(){...})

使用：上面定义的也是click事件，但要触发它，如果单纯触发click，那么范围小的click.zjazn一就会被触发，如果触发的是范围小的click.zjazn，则不会触发范围大的click，冒泡也只会触发“外元素”的指定命名空间的事件。

（6）具体事件的说明

1、移入移出事件：mouseover\mouseout与mouseenter\mouseleave（推荐）的区别是后者不受子元素的干扰，在子元素内不会受子元素干扰而触发。

移入移出强大的方法:hover(function(){//移入},function(){//移出})，两个参数分别包含移入与移出，一个参数既是移入也是移出。

8、jQuery UI

说明：jQuery主要分为 3个部分：交互、小部件、效果库

9、jQuery插件开发

（1）扩展方法

示例：　　　　

\$.fn.myPlugin = function() {

//在这里面,this指的是用jQuery选中的元素

//example :$('a'),则this=$('a')

this.css('color', 'red');

}&#x20;

使用：

\<ul>

\<li>

\<a href="[http://www.webo.com/liuwayong](http://www.webo.com/liuwayong "http://www.webo.com/liuwayong")">我的微博\</a>

\</li>

\<li>

\<a href="[http://http](http://http "http://http")://[www.cnblogs.com/Wayou/">我的博客\</a](http://www.cnblogs.com/Wayou/">我的博客</a)>

\</li>

\<li>

\<a href="[http://wayouliu.duapp.com/](http://wayouliu.duapp.com/ "http://wayouliu.duapp.com/")">我的小站\</a>

\</li>

\</ul>

\<p>这是p标签不是a标签，我不会受影响\</p>

\<script src="jquery-1.11.0.min.js">\</script>

\<script src="jquery.myplugin.js">\</script>

\<script type="text/javascript">

\$(function(){

\$('a').myPlugin();

})

\</script>

（2）扩展jQuery对象本身

```javascript
//扩展jQuery对象本身
jQuery.extend({
    "minValue": function (a, b) {
        ///<summary>
        /// 比较两个值，返回最小值
        ///</summary>
        return a < b ? a : b;
    },
    "maxValue": function (a, b) {
        ///<summary>
        /// 比较两个值，返回最大值
        ///</summary>
        return a > b ? a : b;
    }
});
//调用
var i = 100; j = 101;
var min_v = $.minValue(i, j); // min_v 等于 100
var max_v = $.maxValue(i, j); // max_v 等于 101
```

```javascript
案例1：展开与关闭
结构：
<div id="box">
    <div>
        <a href="javascript:;">用户热评</a>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
    <div>
        <a href="javascript:;">我的动态</a>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
    <div>
        <a href="javascript:;">我的粉丝</a>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
</div>

逻辑：
$("div>a").click(function () {
    if($(this).next().height()==0){
        //是关的状态
        $(this).parent().siblings().children("ul").animate({height:"0px"},1000);
        var num=$(this).next().children().length;
        $(this).next().stop().animate({
            height:num*30+"px"
        },1000);
    }else{
        //是开的状态
        $(this).next().stop().animate({
            height:"0px"
        },1000);
    }
});

案例2：元素的拖拽
　　//拖拽函数的实现
   1、给元素绑定一个点击事件，此时获取鼠标在box中的相对位置（调用jQuery元素对象的offset方法获取偏移量信息分别用来减去事件参数e.pageX/Y）.
   2、再给元素绑定移动事件与松下事件，移动时获取e.pageX/Y分别减去相对位置（向上移动，保持在box中的相对位置不变）作为offset新的偏移量。
   3、松开时，解绑移动与松下事件。

扩展内容:
图片懒加载：
            1、引入jquery-1.12.2.min.js 与lazyload.min.js。
            图片<img class="lazy" data-original="img/01.png"> .
            js: $("img.lazy").lazyload();jquery自定义插件：          
             (function($){
                 $.fn.tableColor=function(){
                     this[0].style.color="red";
                     console.log(this);//一般调用this是$("xxx"),它是一个伪数组
                 }
             })(jQuery);
             $("p").tableColor();
             对象合并：           
             var G=$.extend({},obj1,obj2);//最外层属性相同obj2会覆盖与obj1的相同的属性。
             var G2=$.extend(true,obj1,obj2);//真合并，相同属性内容也会进行合并
```
