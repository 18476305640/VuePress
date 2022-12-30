# Java基础

## 目录

JDK文档：[https://www.matools.com/api/java8](https://www.matools.com/api/java8 "https://www.matools.com/api/java8")

#### 1.1 Java的数据类型

*   字符串常量："123","abc"

*   字符常量：'a','1'(单引号内没有任何东西会报错，且有仅只有一个字符)

*   整数常量：1，200

*   浮点数常量：1.23,65.1

*   布尔常量：true,false

*   空常量：null (不能直接输出null)

#### 1.2 基本数据类型与引用数据类型

*   \[基本数据类型]

    *   整数型 byte short int(默认) long

    *   浮点型 float(数后需加F)  double(默认)

    *   字符型 char

    *   布尔型 boolean

*   \[引用数据类型]

*   字符串、数组、类、接口、Lambda

#### 1.3 变量的声明与注意事项

成员变量声明后有默认值，如果是在方法内声明后是没有默认值的，且要知道变量声明时可以没有值，但在使用时一定要有值。

#### 1.4 自动类型转换与强制类型转换

*   【自动类型转换】A:byte,short,char --» int --» long --» float --» double。

    *   在int类型“之下”的变量进行运算时，会转为int进行运算，就算是同一类型，也是要转为int的。

*   【强制类型转换】

    *   在自动类型转换下，进行逆向转换时，即小范围转大范围，如果大范围的超过也小范围，数据会溢出，转换得到的结果是已损值。

#### 1.5 字符编码

是一套自然语言与电脑二进制的转换规则，而字符集就是一套编码规则，编码与解码是规则的使用,而蓄编码与解码不同就会出现乱码。

*   编码介绍：ASCII字符集是各字符集的原始祖先，它是最基本的字符编码，其它字符集都兼容它，CBKxxx有GB2312（简体）-GBK（简繁）-GB18030（简繁和和民族文字）是我囯的编码规则。

    Unicode字符集，是万国码，兼容各国家的文字，有UTF-8,UTF-16,UTF-32而UTF-8是最常用，UTF-8是可变长度的：

    \#128个US-ASCII字符，只需一个字节编码。

    \#拉丁文等字符，需要二个字节编码。

    \#大部分常用字（含中文），使用三个字节编码。其他极少使用Unicode辅助字符，使用四字节编码。

#### 1.6 运算符

一元运算符：自增自减运算符

二元运算符：赋值运算符、比较运算符、逻辑运算符

三元运算符：a>b?a:b;三元运算符结果必须被使用。

加法运算符：

char、byte、short-->int-->float-->double-->String

两个数据类型进行相加时，遵循从小转大运算，如果是与String进行运算，会转为String再和String进行运算

如果是多位相加，则从左到右进行一次两位且逐位运算。

等号“==”运算符：

基本数据类型：比较值。

引用数值类型：比较地址值。

其它运算。

#### 1.7 编译器的常量优化

short s=5+7时，在编译后，相当于short s=12，而不会5+7运算后转int再赋值给short而报错。

#### 1.8 控制语句

#### 1.9 数组的方法

*   初始化后长度固定&#x20;

*   常见异常：数组异常：Exception:ArrayIndexOutOfBoundsException(越界异常）--超出定义的数组长度、NullPointerException（空指针异常）--访问的数组没有指向堆;

#### 2.0 方法

*   方法的组成：方法修饰符+\[static或final]+方法返回值+方法名称(参数列表){\[方法体]+\[返回语句]};

*   方法重载（Overload）:方法名相同，参数列表不同的一系列方法，若在一个类中写了多个这类的方法，就是方法重载了。

#### 2.1 栈与堆

*   栈：当调用方法时，就进栈

    堆：当new时就创建一块空间

    方法区：本身运行的类与运行中涉及的类

#### 2.2 构造方法

用来创建类的实例对象。

#### 2.3 静态方法与成员方法

静态方法不需要创建对象，用的是类对象

#### 2.4 方法中的this

this就是要创建出来的对象，所以调用的是对象的成员变量，而右边的是根据最近原则得到的name，即传入的name

```java
public class Son{
       private String name;
       public void setName(String name){
           this.name=name;
       }
     }
```

#### 2.5 构造方法与普通方法

没有static与返回值这两个位置，且要求方法与类名一致。

#### 2.6 构造方法的调用&#x20;

我们用new调用类的构造方法时，构造方法可能会调用其它构造方法，但不管最后是哪个构造方法，最先执行的是super()，用来创建父类对象，然后再原路返回执行构造方法。

#### 2.7 JDK文档的查看方法

&#x20;在左边索引中进行搜索类名或接口名，两次次回车打开详情，首先要看的是这个所属的包、看这个是类、抽象类还是接口。再看其构造方法与方法。Ctrl+R可进行查找。

#### 2.8 匿名对象

new 出来直接使用

#### 2.9 ArrayList集合

理解：ArrayList集合叫数组集合，与数组不同的是，它是不定长的且只能存储引用数据类型。

基本使用：ArrayList\<String> arrayList=new ArrayList<>();//数组有\[],集合有<>泛型。JDK1.7开始，右侧的泛型就不用写了，即只写<>即可。

问题1：虽然ArrayList只能存储引用数据类型，如果想使用基本数据类型，我们可以用数据类型的包装类，它们是引用数据类型的，

由于从java1.5开始支持包装类的自动拆装箱，所以我们可以把包装类当然基本类型使用，它们是兼容的。

byte       Byte

short      Short

boolean    Boolean

char       Charset【特殊】

int        Integer【特殊】

long       Long

float      Float

double     Double

包装类的自动拆箱与装箱

ArrayList\<Integer> arrayList=new ArrayList<>();

arrayList.add(11);//装箱，默认new Integer(11);

int num=arrayList.get(0);//拆箱,默认arrayList.get(0).intValue();

ArrayList方法：

add(E e) :向后添加指定泛型的一个元素。

remove(int index) :删除指定索引位置的元素。

get(int index) :返回此列表中指定位置上的元素。

size() ：返回此列表中的元素数。

sort()//重写Comparator接口里的compar抽象方法，通过返回对象属性的差值进行升降排序。

用for循环遍历集合：

for (int i = 0; i < arrayList.size(); i++) { }

2、ArrayList集合与数组的简要说明

我们可以把ArrayList集合当作可不停向里面添加东西的容器，而数组就像已径打包密封好的集装箱

#### 3.0 字符串String

```java
额外要记的单词：suffix（后缀）

构建方法：
  通过byte、字符串、数组
接口方法：
  判断两个字符串是否相等：equalsIgnoreCase、equals
  查看是否以什么字符串结尾：endsWith(".txt");
  转为byte数组：getBytes()
  获取hashCode()
  获取第一次出现的index : indexOf("txt");
  从字符串池中获取："" ， new String("") ，
  如果改变，就不是池中的了，想要从指向池中的，需要用：intern() 从池中获取
  判断length的length是否为0：isEmpty()
  从后面开始的：lastIndexOf(".");
  获取字符串长度：length()
  利用正则匹配，判断是否包含：matches("(.*)txt(.*)");
  字符替换：  replace(char oldChar, char newChar)
  测试此字符串是否以指定的前缀开头：startsWith(String prefix)
  截取字符串子集：substring(int beginIndex, int endIndex)
  转小写：toLowerCase()
  转大写：toUpperCase()
  删除任何前导和尾随空格：trim()
  
  
静态方法：
  将一些类型值转为字符串类型：String.valueOf(可以是很多类型值);
    
扩展：
  StringBuffer： 用于经常性的字符串的变化  

```

字符串：jdk1.8及以前String使用的是char数组作为底层，因为每一个char占用两个字节而拉丁字符只需要一个字节就可以存储。所以从jdk1.9后用byte数组作为底层。

内存：

String a="HelloWorld!";//底层byte数组的内存地址存放在字符串常量池中。可重复利用

String b=new String("HelloWorld!");//不用池子中已存在的，而总是自己创建。

底层：

byte\[] by={97,98,99};//新字符串底层

char\[] ch={'A','B','C'};//旧字符串底层

方法

判断：public boolean equals(Object anObject)：//对字符串的内容进行比较。而"=="是进行对象地址的比较。\[一定要确保左边是字符串]

判断：public boolean equalsIgnoreCase(String anotherString)：忽略大小写，进行比较字符串中的内容。\[一定要确保左边是字符串]

长度：public int length():返回此字符串的长度。

截取：public String substring(int beginIndex,int endIndex):返回一个新字符串\[a,b)，它是此字符串的一个子字符串。

一个参数，代表起始位置，截取到末尾。

转char数组：char\[] chars = ab.toCharArray();

获取底层byte数组：byte\[] bytes = ab.getBytes();

内容替换： String tm = "你会不会玩啊？你大爷的！".replace("你大爷的", "\*\*\*\*");

分割：String\[] split = "123,456,789".split(",");//特别地如果用"."进行分割，那么就会失败，原因是分割的底层是用了正则，所以我们需要用"\\\\."对"."

进行转意;

类型转换：利用包装类的方法进行字符串转数值方法

字符转Integer或说int: Integer.parseInt("100");

字符转Double或说double: Double.parseDouble("100");

#### 3.1 修饰符static

内存：用static修饰的变量，存在于内存的方法区（Method Area）中的，是该类所有实例对象的"共有"属性，与类的实例对象无关。

#### 3.2 Arrays数组工具类

#### 3.3 Math数字工具类

说明：Math类是数学相关的工具类，里面提供了大量进行数学运算的静态方法。

方法：public static double abs(..)：取绝对值;

public static double ceil(double a):向上取整

public static double floor(double a):向下取整

public static final double PI:代表圆周率的值。

#### 3.4 继承

子类构造方法调用 ，就会调用 super，super代表父类。

重写是方法名相同，参数列表也相同。//可重写为访问修饰扩大，返回值类型缩小。

#### 3.5 抽象类

类声明上，由calss转为abstract class

方法声明上，声明上由public 转为public abstract

跟接口一样，不能创建对象 。

\[(顶层抽象类)]--\[（抽象子类）--(普通子类)]--普通类

#### 3.6 接口

\[public] \[static] \[final] 数据类型 常量名称 =数据值; //介意常量名称这样写，“"MNUM\_OF\_DEF”。

\[public] \[abstract] 返回值类型 方法名称(参数列表);//接口中最重要的内容

#### 3.7 单继承多实现

#### 3.8 父类优先于接口

、如果一个类继承了一个类与实现了一个接口，若有冲突，父类优先。

#### 3.9 当两个父接口冲突时

一个接口继承了多个接口，如果默认方法有冲突，如果这时子接口不覆盖掉父接口的冲突方法，是会报错的，因为两父接口间没有优先级的。

#### 4.0 多态

态(向上转型)：

说明：父类  对象=new 子类(参数列表);

用多态对象需遵循：编译（+属性）父类，运行子类。

多态的好处与弊端

好处：只有父类方法存在有的，才能调用，且成员方法运行看右边（子类）;

弊端：无法调用子类特有的内容（变量+方法），“解决方法：向下转型”;

向下转型（“还原”解决弊端）

理解：向下转型，将子类还原回来了，就不存在多态的特征了。

注意：如果还原回原来的，如果是猫转成了狗，会出现类转换异常（介意转换前用instanceof作判

#### 4.1 final修饰

用final关键字来修饰类，则这个类不能有子类，即太监类。

用final关键字来修饰方法，那么这个方法是不能被子类重写的。

用final关键字来局部变量，首先要知道局部变量如果不赋值是没有默认值的，所以声明时没有赋值，则会给予一次赋值的机会。

用final关键字来成员变量，首先要知道成员变量是有默认值的，如果在初始化时不设置，必须保证所有构造方法都能给其赋值。

#### 4.2四种权限修饰符

private :类外不能访问

(default):包外不能访问

protected :包外非子类不能访问

public :都可访问

#### 4.3 内部类

类的权限修饰符

外部类：public/(default)  //因为那两种是无意义的。

成员内部类：全部可用 //像成员方法的权限修饰一样

局部内部类：全不可用 //因为只能给所在方法使用。

分类说明：

成员内部类：跟成员方法同等位置，我们在调用时分可见调用与不可见调用，可见直接new即可，不可见调用（外部与本类静态方法）格式：

外部类.内部类 内部类对象名 = new 外部类().内部类();

局部内部类：跟局部变量同等位置，只能给所在方法使用。若用到其局部变量，该变量必须是final,因为生命周期不同。

但从java 8+开始，只要保证该局部变量不变，可以省略final不写。

匿名内部类：我们可以将运用多态得到的实现类或子类的对象看作成员变量或局部变量。只使用一次或代码比较少才推荐使用，

格式：接口 对象名 = new 接口(){..需要重写接口的全部内部..};

父类 对象名= new 父类(){ ..匿名子类体.. };

注意：匿名内部类与匿名对象不同，匿名对象忽略的是对象名，而匿名内部类忽略的是实现类或子类（用{}代替。）

#### 4.4 接口变量

定义接口后，即可拿来当作类型使用。运用多态设置值。(多态，匿名内部类，匿名内部类+匿名对象)

#### 4.5 根类Object

继承Object类，Object 是类层次结构的根类。每个类都直接或间接使用Object作为父类，所有对象（包括数组）都实现这个类的方法。

方法：

toString：不重写toString方法默认打印的是类的包名+地址值。一般重写为对类属性的打印输出。[可快速生成](输出引用对象时，默认调用其toString\(\)方法 "可快速生成")。

equals:重写父类Object方法，注意this代表左边。看传入是否与this相等或是否为其类的实例，若为null，直接返回false;\[可快速生成]

Objects工具类

public boolean equals(String a,String b)方法：可避免Object的equals方法的空指针异常问题。

String a=null;a.equals("abc");//就会出现空指针异常。

String a=null;Objects.equals(a,"abc");//返回false

#### 4.6时间对象-Date

构造方法：

Date( \[long time] );根据传入的毫秒值创建日期对象//无参数默认当前系统时间的毫秒值创建对象

方法：

getTime(); 返回Date对象对应的毫秒值。

toString(); 输出默认调用，示例"Fri Sep 25 11:08:36 CST 2020"

工具：

（1）文本生成&文本解析

介绍：SimpleDateFormat-->DateFormat（该抽象类实现了Serializable, Cloneable这两个接口）;

我们要想获取指定的日期格式，必不可少的是格式,我们可以利用SimpleDateFormat创建一个想要的格式。

示例：SimpleDateFormat sm=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//之间可用一些字符隔开来美化生成的文本。

y  年

M  月

d  日

H  时

m  分

s  秒

SimpleDateFormat方法：

传入Date对象转为指定文本。// String format = sdf.format(date);

传入文本，按照模式生成Date对象。// Date parse = sdf.parse("2020年09月16日 10时07分58秒");

（2）日期自定义--日历对象

介绍：Calendar是一个日历抽象类，我们可以利用其静态方法获取其子类来创建对象。

Calendar c = Calendar.getInstance();

使用：

基本操作方法：

c.set(Calendar.MONTH,2);//指定（左边参数）设置值（右边）。\[年月日可重载设置]

c.add(Calendar.MONTH,2);//指定（左边参数）设置值（this+右边）

c.get(Calendar.MONTH)+1;//获取指定的量（外国月份从0月开始），年日类同。

#### 4.7 集合

```java
单列集合：
  ArrayList（有序、线程安全）、LinkedList（有序、线程安全）
    主要遍历：size() 、 get()
  HashSet（无序、线程不安全）、LinkHashSet（有序、线程不安全）
    主要遍历：迭代器 hasNext(),next() （或增强for(类型 变量:集合) ）
    
双列集合：
  HashMap<k-v>
  LinkedHashMap<k-v>
 
  方法：put(k,v);//添加一个键值对
       get(k);//根据key值获取value值。
       remove(k);//删除指定键值对
       containsKey(k);//查找是否存在
       
  遍历：keySet() && get(k)
    
  

```

相关介绍

栈：先进后出; 队列：先进先出;

数组：查询快，修改慢，因为数组的长度是固定的，如果你改变了数组长度，则前后就不是同一数组了。

链表：与数组相反//链表有两种，单向链表与双向链表。

（1）Collection: 单列集合。其子接口 List\<E>与Set\<E>它们的实现类才是我们要使用的。

List集合：有索引，可重复。原始集合是Vector集合：单线程-->线程安全-->速度慢，jdk1.2后被更先进的集合取代了。

ArrayList集合：底层用的是数组（数组长度是固定-->读取快，增删慢）。

LinkedList集合：底层用的是链表结构（双向），其特点是增删快，查找慢。

Set集合：无索引，不重复。底层都有哈希表（数组+链表/红黑树）

HashSet集合:底层用的是哈希表。之所以不能存储重复的值是因为在存储时会进行哈希值与equals的判断，两者只要两个都不为true就可存入。\[自定义类型元素要重写hashCode和equals方法]

LinkedHashSet:与HashSet集合不同的是，在底层多了一条链表，用于记录元素存入顺序，即怎么添加就怎么存，所以LinkedHashSet集合是有序不重复的集合。

（2）Map\<k,v>集合：Map集合是一个双列（key-value），key不能重复，但值可以重复。//原始集合是:Hashtable集合：从JDK1.0开始就出现了，和Vector集合一样，jdk1.2后被更先进的集合取代了，底层是一张哈希表，是单线程的（所以线程安全且慢），该集合的特点是不能存储空(key或value)。

HashMap\<k-v>集合: 1.8之后，底层用的是哈希表（数组+单向链表/红黑数（链表长度超8时启用）），是一个无序的集合。

LinkedHashMap\<k,v>集合: 与HashMap\<k,v>不同的是,在底层多了一条链表，使其存取有序，且LinkedHashMap继承了HashMap集合。

方法：put(k,v);//添加一个键值对

get(k);//根据key值获取value值。

remove(k);//删除指定键值对

containsKey(k);//查找是否存在

java单列集合的遍历：我们知道List集合是有索引的，所以可以用普通for循环来进行遍历，但Set是没有索引的，那我们用什么方式遍历它呢？这时我们就需要用迭代器了。

迭代器

介绍：集合有一个iterator() 方法，这个方法调用了Iterator实现类的构造方法。即返回了一个迭代器实现类的对象。

HashSet\<String> str = new HashSet<>();

Iterator\<String> it = str.iterator();//多态

方法：boolean hasNext() 用来判断集合中是否有下一个元素。

E next():返回上面说有下一个元素的下个元素，并把指针向后移一位，准备作下一次的判断。

原理：返回集合对应的Iterator对象后，指针指向-1索引（首位是0），如果用hasNext方法，会判断下一个元素即0索引位置是否有元素。如果有next方法可以取出这个元素（方法执行捂指针向后移一位）。

增强for循环：

介绍：可用来遍历数组与集合，底层是迭代器，下面就用迭代器来理解增强for循环。

使用：

格式：for(下一个元素的类型 下个元素的名称：数组或集合对象){}

原理：在增强for第三个量中,第三个变量位置会判断是否有下个元素（hasNext()），而第二个变量则代表这"下一个元素"的元素(next())。

java双列集合的遍历：

思路：1、如果我们能将全部元素的key转为一个集合，那么我们就通过遍历key来遍历集合的value了。

2、利用key-value的映射表（entry）来遍历。

实现：1、通过用keySet()方法将集合的key转为一个Set集合。然后遍历存储key的Set集合来间接遍历value。

2、Entry对象在Map建立时也随之创建了（结婚证，哈哈），存储着Map的key-value值。

用map.entrySet();获取存储entry对象的Set集合，然后遍历存储entry对象的Set集合，entry对象提供了解析的方法getKey()与getValue()。

其它共有方法：

of:JDK9对集合添加的优化

of是List、Set、Map集合接口的静态方法，我们可以直接调用其of方法然后添加其元素，对应地返回一个“固定长度”的集合（不能再使用改变长度的方法）。

#### 4.8泛型

好处：无需做类型转换且把运行期异常提升到了编译时异常。在使用集合时如果不写泛型，默认是Object，就需要向下转型使用。//instanceof判断左边是否是右边的实例。

内容：当一个方法我们不确定要传入什么类型的值时，就可以使用泛型。

全泛型

（1）泛型类与泛型方法：

让类替方法问是什么类型。//public class test07\<T>{

public void getData(T t){

System.out.println(t);

}

}

如何不需要用类帮忙问，方法自己解决这个问题（如果是单方法使用泛型时），可以参考以下写法：

public \<T> void show(ArrayList\<T> arr){

//方法内部

}

再特别地：使用通配符， 进行简化。（注意：上面的T是可以用来代表对象类型的，而通配符"?"是不能的，它表示任意类型。）

public void show(ArrayList\<?> arr){

}

（2）泛型接口的实现类

介绍：接口的实现类需要这样写：//或将下面的T改为具体的类

public class Mee\<T> implements Fu\<T>{

@Override

public void showData(T t) {

//方法内部

}

}

半泛型

（1）上限限定<？ extends E>

说明：上面意为，E类的子孙类（泛型限制）

使用：

public interface test07\<T extends Number>{

public void show(T t);

}

\=========================================================

public class test06\<T extends  Number> implements test07\<T> {

@Override

public void show(T t) {

}

}

（2）下限限定<？ super E>

说明：E类的父祖类（泛型限制）

使用：参考上面

#### 4.9可变参数：

说明：可变参数是一个参数，如果要写多个不同类型的参数，可变参数必须写在最后。

底层：可变参数是一个参数，实质是个数组。当我们调用传入参数后，这个可变参数的底层数组的长度就确定了。

参数写法：(\[其它参数],<数据类型>...<变量>)注意中间是三个点,这个变量就是数组变量，相当于"int \[] a={传入参数后确定}"，、

#### 5.0异常

分类：Exception包括Error错误(编译期异常)与RuntimeException(运行期异常：当出现异常时，没有处理逻辑下，方法会将这个异常传递到调用者，进行依次传递，当抛到JVM虚拟机时，控制台打印红色字体错误信息并终止当前执行的java程序。)

过程分析：

产生异常：

捕获：参考下面“捕获处理异常”

主动产生：用throw关键字，示例：throw new ArrayIndexOutOfBoundException("越界异常");//new的是RuntimeException（运行期异常）的子类。

抛出异常(处理异常)：在方法参数列表后写："throws \<Exception或其子类>,..{} ", 调用者必须处理这个异常，当然也可以选择抛出或try..catch...;

捕获处理异常（处理异常）：

try{

//可能会出现异常的代码

}eatch(\<Exception或其子类> e){

//捕获到后如何处理异常（一般在工作中，将错误信息写入日志中）

//Throwable 类是 Java 语言中所有错误或异常的超类,定义有三个方法：e.getMessage();-->e.toString()-->printStackTrace();（信息详细程度向右增强）

}finally{

//不管是否出现错误，都会执行的代码

//这里一般放释放close语句（在释放时，检查资源是否为null，为null无需释放,JDK1.7,1.9有了新的处理方案，来简化资源的释放操作）

}

注意：1、可一次捕获多次处理，但要注意异常的顺序（子异常类写在上面）。

2、如果finally有return，"会覆盖掉其它地方的return语句"。

3、重写父类方法时，需要与父类方法同步，父类没有抛出异常，子类也是不能抛出的，如果有不能抛出比父类范围大的异常。

自定义异常：一般重写Exception与RuntimeException(出错不会报错),且分别写一个无参构造方法与有参（String 的错误提示信息）构造方法。

书写：

public class  MyException extends Exception{

public MyException(){ }

public MyException(String ErrorString){

super(ErrorString);//信息的传递：自定义--->Exception-->Throwable,来覆盖超类toString（）原有的错误信息。

}

}

主动抛出异常：

用法：throw new MyException("出现了\*\*异常");

#### 5.1 多线程

相关介绍：

并发与并行：并发是一个人吃两个馒头左一口右一口地吃着，并行是两个人同时吃着自己手里的馒头（所以并行速度更快）。

进程：进入内存中的程序，如果进程是多进程的，就等于开启了多个线程入口。

线程：线程是工具，谁需要就会分配给谁，但切换的时间非常快//线程分两种：分时调度与抢占式调度

开启线程：在内存中就开辟了一个栈空间，cpu根据线程优先级执行各线程。

介绍：一般都是通过实现Runnable或继承Thread来实现多线程的，且Thread类实现了Runnable接口，并且Runnable只有一个run抽象方法。

（1）继承Thread实现线程：

写线程：继承Thread类，\[创建一个有参（线程名参数）、无参构造方法]。然后重写run方法作为线程的方法体。

用线程：在主线程中创建实现类对象（传入参数），"点"start方法(父类的方法)来启动线程。

(2)通过实现Runnable接口实现多线程

写线程：我们可以通过实现Runable接口来实现多线程，重写接口的run方法（线程体）。

用线程：我们在main方法中创建Runnable实现类对象runnable，然后传入:

new Thread(runable, <线程名>).start();//线程开启了

优点：扩展性强（n实现>1继承），且设置线程与启动线程进行了分离。

常用方法：

获取线程名:获取线程名的方法是在Thread类中的，实现Runnable接口的线程要想获取线程名，需要先调用Thread的静态方法currentThread来获取当前正在执行的线程（得到的是一个对象），然后再调用getName方法获取。

Thread.currentThread().getName();//getName兄弟方法setName方法可以修改线程名。

休眠方法：sleep(ms);可以让线程睡眠指定时间。它是Thread的一个静态方法。

线程安全问题：

如果多个线程共用相同资源（下面的num变量），那么就会出现一些错误，比如下面的抢票系统:

public class MyRunnable implements Runnable {

private int num=100;//注意，不能将num变量放到run内，不然就不是公共变量了。

@Override

public void run() {

while(num>0){

try {

Thread.sleep(10);

} catch (InterruptedException e) {

e.printStackTrace();

}

System.out.println("正在卖第"+num+"张票！");

num--;

}

}

}

\=============================================

//启动线程

public static void main(String\[] args) {

MyRunnable myRunnable = new MyRunnable();

Thread thread01 = new Thread(myRunnable);

Thread thread02 = new Thread(myRunnable);

Thread thread03 = new Thread(myRunnable);

thread01.start();

thread02.start();

thread03.start();

}

出错的问题：多个线程同时打印输出，都在卖同一张票问题；多个线程同时进行入if内，但此时票数为1，那么后面线程打印输出0，-1不存在的问题。

解决线程安全问题：

之所以会出现线程安全问题，是共享资源在多个线程的操作下，就会出现程序混乱的问题。只要我们让共享的资源从头到尾只有一个线程在操作即可（同步技术）。

同步技术:

synchronized介绍:

(1) synchronized(锁对象){...}，这个锁对象可以你是随便创建的一个对象，但多个线程间用的必须是“同一个实例对象”。因为一个实例对象只有一把锁。谁拿到锁谁就可以执行这个锁对象对应的synchronized包围的代码块（不同的锁对象，不能实例同步）。

(2)synchronized(类锁){...}，除了对类实例对象进行锁来实例同步外，我们还可以用某个普通类（类名.class）来作为锁，也可以实现同步。

内容：有三种方法可实现同步技术。

同步代码：synchronized (\<this/.class>) {...} //同步块，锁的是 () 中的对象。

同步修饰：public synchronized void isok(){...}//同步普通方法，锁的是当前对象。同步静态方法，锁的是当前 Class 对象。

Lock工具: Lock是接口，它的实现类是ReentrantLock。我们需要创建对象(可多态)。然后使用方法来实现同步功能。

lock();//获取锁

unlock();//释放锁

线程的状态:

叙述：new 后是初始化状态，start后是可运行状态，可运行状态抢到"时间片"后是运行状态，时间片用完后是阻塞状态，

如果运行中没拿到锁就会进入锁池队列中，如果运行中调用了wait方法就进入了等待队列，程序运行完后是死亡状态。

线程间的通信：两个具有合作关系的线程，就需要进行通信，那么就要用到同一个Object对象的wait()与notify()方法，但这两个必须要在“锁”中使用。

//包子类

public class BaoZi {

String pi;

String xian;

boolean flag=false;

}

//包子铺线程

public class BaoZiPu extends Thread {

private BaoZi bz;

public BaoZiPu(BaoZi bz){

this.bz=bz;

}

@Override

public void run(){

synchronized (bz) {

//此处对公共资源进行锁住操作//Object的wait()与notify()

}

}

}

//吃货线程

public class ChiHuo extends Thread{

private BaoZi bz;

public ChiHuo(BaoZi bz){

this.bz=bz;

}

@Override

public void run(){

synchronized (bz){

//此处对公共资源进行锁住操作//Object的wait()与notify()

}

}

}

线程池

原理：创建一个线程池，可以用LinkedList集合用来存储线程(泛型为Thread)，

add（new Thread(XXX)）方法添加，

Thread t=list.remove(0);获取，

使用list.add(t)归还。

但从JDK1.5之后，JDK就内置了线程池供我们使用了。

使用介绍：

说明：Executors线程池工具类有一个newFixedThreadPool方法，可以创建Executor的子接口ExecutorService的对象，它就是我们要的线程池。

使用：

ExecutorService es = Executors.newFixedThreadPool(2);//创建线程池

es.submit(\<RunnableImpl>);//submit(Runnable task)利用线程池的方法，执行线程任务。

es.shutdown();//销毁线程池，一般不用这个方法。

6、Lambda表达式

简化匿名内部类的写法：

介绍：要求接口必须只有一个抽象类，满足就可以用Lambda对接口进行重写来作为参数传递。

()->{}表示的是接口实现类中要唯一要重写的抽象方法，且括号内是抽象方法的形参（不能是实参）。

两种常见写法如下：

new Thread(runnable).start();==>new Thread(()->{}).start();

Runnable s=()->{};//多态

关于Lambda的精简:

左边：()中可以不写数据类型，但不能一个写一个不写。

左边：()中如果只有一个参数，可以省略小括号。

右边：{}中如果只有一条语句，可以忽略大括号。

右边：{}中如果只有一条返回语句，可以忽略return与大括号；

再优化，方法的引用 ：

接口 x=<方法隶属者>::方法名;//如果有重载方法，会自动选择与接口抽象方法的参数、返回值一致的方法来作为重写方法，要注意的是如果是构造方法方法名要改为new，即<方法隶属者>::new。

注意事项：如果在在Lambda表达式中引用了 方法的变量（闭包），那么这个变量需要被final修饰这常量，这像局部内部类一样。

#### 5.2 File类

构造方法

File(参数列表) //里面可以有两个参数（头尾关系），File与String，String与String,如果是单参数那就是String.

静态方法

File.pathSeparator 他是一个与系统有关的路径分隔符，为了方便，它被表示为一个字符串。

成员方法

File解析

getAbsolutePath()  会判断是否相对还是绝对路径，如果是相对路径转为以项目路径为parent来组装

getPath()  将此File转换为路径名字符串,类似于toString()方法

getName()  返回File表示的文件或目录的名称

length() 返回由此File表示的文件的字节大小

判断File表示的内容

exist()  判断文件或文件夹是否存在

isDirectory()  断判当前路径代表的是文件还是文件夹,是文件夹返回true，如果不存在，返回false

isFile() 断判当前路径代表的是文件还是文件夹,是文件返回true,如果不存在，返回false

根据File创建文件或文件夹

createNewFile() 当且仅当，路径正确，要创建路径代表文件，返回true;

mkdir() 当且仅当，路径正确，且只要创建一个文件夹时，返回true;

mkdirs() 当且仅当，路径正确，且可创建文件夹，返回true

根据File遍历文件夹下的文件与文件夹

list() 返回当前文件夹下的所以文件与文件夹名称，是一个List\<String>集合

listFiles() 返回当前文件夹下的所以文件与文件夹的绝对路径，是一个List\<File>集合

#### 5.3 IO流

概述：I（input）O(Output),由硬盘到内存是输入流，反之是输出流。且分为两种：字节流与字符流。但不管是什么流，数据写入与写出时，jvm虚拟机都要与操作系统进行通信，才能进行操作。

字节流：

构造方法：输出流（FileOutStream）与输入流（FileInputStream）都要传入文件（File对象或String）这个参数，如果是输出流，还可以写布尔值，它表示写入的内容是否追加。

方法：

输出流：

write(int b) :一次写一个字节

write(byte\[] b) :向File中写入字符串，可以用String的getBytes()方法来获取底部Byte数组来作为参数。如果单纯写入数字，要注意是负数会和后面的一个参数结合查找系统码表。如果是正数且0-127会查找ASCII表。

write(byte\[] b, int off, int len) :定入一个字节数组的部分。off是开始索引，len字节长度。

一般用来获取输入流的缓冲器读取的有效字节，而len参数是有效的缓冲器byte数组存储的有效字节数。

\[案例]：

FileOutputStream fos = new FileOutputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\a.txt");

byte\[] bytes ={-65,-66,-67,68};//要写入的数据

fos.write(bytes);//将数据写入

fos.close();/关闭输出流，释放内存

输入流：

read(byte\[]b)：read方法可以读取输入流fis对象中指定文件，参数byte数据也称为缓冲器（一次读取的字节数，用来提高输入效率）

并返回真正有效读取的字节数。

read() :一次读取一个字节，且返回此字节的十进制数。

\[案例]：

FileInputStream fis = new FileInputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\a.txt");

byte\[] bt=new byte\[2];//缓冲器

int len=0;//一次读取到的有效的字节数量

while((len=fis.read(bt))!=-1){//比如读取"1234567",如果缓冲器容器是3，可以读取三次分别是"123","456","756",最后一次只有7有效，返回1，下一次返回-1。

System.out.print(new String(bt,0,len));

}

fis.close();

案例：文件的复制（复制是两个容器数据的传输，不要怕，这只是输入输出流的紧密结合）

long start = System.currentTimeMillis();//开始计时

FileInputStream fis = new FileInputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\jQuery.zip");

FileOutputStream fos = new FileOutputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\复制\\\jQuery.zip");//输出流1

byte \[] bt=new byte\[1024\*10];//输入与输出的“结点”2

int len=0;

while ((len=fis.read(bt))!=-1){

fos.write(bt,0,len);//输出流3

}

fos.close();//输出流4

fis.close();

long end = System.currentTimeMillis();//计时end

System.out.println("共耗时"+(end-start)+"毫秒");

使用字节流读取中文的问题：因为在GBK中一个中文占两个字节，但在UTF-8中一个中文占三个字节，如果我们用字节来读取，是会出现中文乱码的，使用字符流可以解决此问题。

字符流:字符流不能复制非文本文件，复制了也就是损坏状态，一般复制用字节流就可以了。

读取：FileReader类继承了Reader接口，下面我们就用FileReader类与其read方法来读取文件。

FileReader fr = new FileReader("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\a.txt");//与字节流的FileInputStream一样。

char\[] chars = new char\[1024]; \\\字符缓冲器

int len=0; \\\读取到的有效字符数

while ((len=fr.read(chars))!=-1){

System.out.println(new String(chars,0,len));

}

fr.close();

写入：FileWriter类继承了Writer类，下面我们就用FileWriter类与其write方法将数据定入文件。

FileWriter fw = new FileWriter("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\a.txt",true);

fw\.write("一只喵zjazn"+"\r\n");//可以传入字符数组，还可以选择数组的点长。字符数组也可以改为字符串。

fw\.close();// fw\.flush();这两个方法都会把write写入内存中的数据写入到文件中，但close会释放掉该内存资源。

缓冲流:一个新手送餐员，一次送一份，老手一次送N份。这里的份数是我们定义的"缓冲器(byte或char数组)"，装满后JVM才去向操作系统请求。

缓冲流：

字节流：BufferedInputStream(字节输入流)，BufferedOutputStream(字节输出流)。

字符流：BufferedReader(字符输入流)，BufferedWriter(字符输出流)。

缓冲流的使用：(比如字符输入流)

FileReader fe = new FileReader("C:\\\a.txt");

BufferedReader bfe=new BufferedReader(fe);//fe被bfe替换，后面代码一致。

\##对于字符输入流有一方法相区别于read的readLine方法，没有行后返回null，有返回行中的内容，但存在一个问题--“无法换行”，只需再调用newLinky方法即可，它会根据系统自动添加换行符。

转换流：

介绍：

InputStreamReader与OutputStreamWriter转换流是为字节流服务的流，可以将字节流转为指定字符集的字符流，相区别于FileReader与FileWrite（默认字符流），它更灵活。

示例：文件编码的转换

InputStreamReader isr = new InputStreamReader(new FileInputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\a.txt"),"UTF-8");//读取UTF-8文本文件

OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\b.txt"),"GBK");//写为GBK编码文本

char \[] ca=new char\[1024\*5];

int len =0;

if((len=isr.read(ca))!=-1){

osw\.write(ca,0,len);

}

osw\.close();

isr.close();

序列化流与反序列化流

介绍：将对象写入文件中，写入用到ObjectOutputStream序列化流的OutputObject方法，读取用ObjectInputStream反序列化流的InputObject方法。

使用：

序列化流把对象写入

\##被序列化的对象对应的类必须有特定的标记或继承有标记的类（类实现Serializable类就有标记），如果没有，该类的实例对象就不能被序列化（报NotSerializableException异常）。

ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\c.txt"));

oos.writeObject(new BiaoJi("我的小美女",12));

oos.close();

反序列化读取存储在文件中的对象

\##反序列化的条件是，类的seriaVersionUID与文件中的对象的相等，假如序列化后对类进行了小改动，导致了seriaVersionUID发生了改变，这是我们不希望的，这时我们可以在类中进行固定seriaVersionUID值。

\##private static final long serialVersionUID=<固定数值>L; //如果该类继承了该类，子类的UID默认是父类的;

ObjectInputStream ois = new ObjectInputStream(new FileInputStream("C:\\\Users\\\Admin\_yfdsou\\\Desktop\\\c.txt"));

BiaoJi o = (BiaoJi)ois.readObject();

ois.close();

\##我们知道成员变量被static修饰后，就不属于该类实例对象的了，而是共享的，属于类。那么将实例对象进行序列化是不存在这些静态变量或方法的。除此被transient（瞬态）关键字修饰也是，但它只起不被序列化的作用。

序列化集合

将对象存储在一个集合中，然后将这个集合对象进行序列化，注意在反序列对象的强转时，以这个的格式转换(示例)：ArrayList\<Person> list=(ArrayList\<Person>)o;

打印流PrintStream

介绍：PrintStream继承了字节输出流FilterOutputStream，构造方法可以是文件对象/文件路径（String）。

成员变量：

print/println(...)：//相当于\<PrintStream对象>.write("要在控制台输出的内容".getBytes());

\##"System.out.println()" ：System.out是一个PrintStream对象，指定了控制台，我们可以用System的静态方法setOut(PrintStream out) 来改变输出位置（可在输出到文件中）。
