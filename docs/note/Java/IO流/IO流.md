# IO流

## 目录

学习写下的代码：[https://github.com/18476305640/fileBox/raw/master/杂项/java-io.7z](https://github.com/18476305640/fileBox/raw/master/杂项/java-io.7z "https://github.com/18476305640/fileBox/raw/master/杂项/java-io.7z")

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533106930771653310692241.png)

### \[\_1\_] 文件与流

文件是存储数据的地方

流：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533959737001653395973495.png)

### \[\_2\_] 文件的操作

*   创建文件的三种方式

    ```java
    package com.zhuangjie.io;

    import org.junit.Test;

    import java.io.File;
    import java.io.IOException;

    public abstract class _1_文件的创建 {
        /**
         * 文件创建的三种方式
         */
        @Test
        public void test01() {
            File file = new File("D:\\system\\文档\\file01.txt");
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("第一种方式：文件创建成功！");


            File parentFile = new File("D:\\system\\文档");
            File file02 = new File(parentFile, "file02.txt");
            try {
                file02.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("方式二创建文件成功！");

            File file03 = new File("D:\\system\\文档", "file03.txt");
            try {
                file03.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("第三种方式文件创建成功！");
        }



    }
    ```

*   对文件与文件夹的操作

    ```java
    package com.zhuangjie.io;

    import org.junit.Test;

    import java.io.File;
    import java.io.IOException;

    public class _2_文件的操作 {
        @Test
        public void test() throws IOException {
            File file = new File("D:\\system\\文档\\file0.txt");
            File file_parent = new File(file.getParent());
            if (! file_parent.isDirectory()) {
                file_parent.mkdirs();  //创建文件夹
            }
            if (! file.isFile()) {
                file.createNewFile(); //创建文件
            }
            System.out.println(file.getName()); //获取文件名
            System.out.println(file.getAbsolutePath());//获取文件的绝对路径
            System.out.println(file.getParent()); //获取父目录绝对路径
            if (file.isFile()) {
                System.out.println(file.length()); //文件大小
            }
            System.out.println(file.exists()); //文件是否存在，文件不存在返回false
            System.out.println(file.isFile()); //是否是文件，文件不存在返回falsee
            System.out.println(file.isDirectory()); //是否是文件夹,文件不存在返回false
            file.delete(); //删除空文件夹或文件

        }
    }

    ```

### \[\_3\_] 流与流的分类

**流的分类**
按操作数据单位不同分为：字节流（8 bit)二进制文件，字符流（编码字符大小）文本文件
按数据流的流向不同分为：输入流，输出流
按流的角色的不同分为：节点流，处理流/包装流

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16533968780031653396877916.png)

1）Java的IO流共涉及40多个类，实际上非常规则，都是从如上4个抽象基类派生的
2）由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534870130111653487012886.png)

### \[\_4\_] 文件字节流：FileInputStream/FileOutputStream

*   读操作：read() 返回一个字节， read(byte\[]) 返回读到(已存到byte\[] )的字节长度

    ```java
    package com.zhuangjie.io;

    import org.junit.Test;

    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.IOException;

    public class _3_流操作文件_读操作 {
        @Test
        public void read01() {
            //使用read()文件读取文件
            File file = new File("D:\\system\\文档\\Hello.txt");
            FileInputStream fileInputStream = null;
            int byteData = 0;
            try {
                fileInputStream = new FileInputStream(file);
                while ((byteData = fileInputStream.read()) != -1) {
                    System.out.print((char)byteData);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        @Test
        public void read02() {
            //使用read()文件读取文件
            File file = new File("D:\\system\\文档\\Hello.txt");
            FileInputStream fileInputStream = null;
            byte[] bytes = new byte[8];
            int readLen = 0;
            try {
                fileInputStream = new FileInputStream(file);
                while ((readLen = fileInputStream.read(bytes)) > 0) {
                    System.out.print(new String(bytes, 0, readLen));
                }
            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    ```

*   写操作：write(byte) / write(byte\[])

    ```java
    package com.zhuangjie.io;

    import org.junit.Test;

    import java.io.File;
    import java.io.FileOutputStream;
    import java.io.IOException;

    public class _4_流操作文件_写操作 {
        @Test
        public void write01() {
            File file = new File("D:\\system\\文档\\mf.txt");
            FileOutputStream fileOutputStream = null;
            try {
                fileOutputStream = new FileOutputStream(file,true);
                String msg = "在干啥？";
                fileOutputStream.write(msg.getBytes());
                fileOutputStream.flush();
            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    ```

*   文件拷贝 : 只需会用读的read(byte\[]) 方法与写write(byte)即可（流没关，你写的都是追加的，第二次追加到第一次写的内容后）

    ```java
    package com.zhuangjie.io;

    import org.junit.Test;

    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.IOException;

    public class _5_文件的拷贝 {
        /**
         * 文件拷贝
         * @param args
         */
        public static void main(String[] args) {
            FileInputStream fileInputStream = null;
            FileOutputStream fileOutputStream = null;
            byte[] bytes = new byte[1024];
            int readLen = 0;
            try {
                fileInputStream = new FileInputStream("D:\\system\\图片\\uToolsWallpapers\\美女.png");
                fileOutputStream = new FileOutputStream("D:\\system\\图片\\美女_clone.png");

                while ((readLen = fileInputStream.read(bytes)) > 0) {
                    fileOutputStream.write(bytes, 0, readLen);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                try {
                    fileInputStream.close();
                    fileOutputStream.close();
                }catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }


    }

    ```

### \[\_5\_] 文件字符流：FileRead/FileWrite

*   读操作： read() 返回一个字符（大小根据编码）， read(char\[] ) 返回读到(已存到char\[] )的字符长度

    ```java
     @Test
        public void write01() {
            String sourceFilePath = "D:\\system\\文档\\文件拷贝.java";
            FileReader fileReader = null;
            try {
                fileReader = new FileReader(sourceFilePath);
                int data = 0;
                while (( data = fileReader.read()) != -1) {
                    System.out.print((char) data);
                }

            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                if (sourceFilePath != null) {
                    sourceFilePath.getClass();
                }
            }
        }
        //使用数组作缓冲
        @Test
        public void read02() {
            String sourceFilePath = "D:\\system\\文档\\文件拷贝.java";
            FileReader fileReader = null;
            try {
                fileReader = new FileReader(sourceFilePath);
                int readLen = 0;
                char[] chars = new char[128];
                while (( readLen = fileReader.read(chars)) != -1) {
                    System.out.print(new String(chars,0,readLen));
                }

            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                if (sourceFilePath != null) {
                    sourceFilePath.getClass();
                }
            }
        }
    ```

*   写操作：主要是write(char) 、write(char\[])

    ```java
    @Test
        public void write() {
            FileWriter fileWriter = null;
            String sourceFilePath = "D:\\system\\文档\\test.txt";
            try {
                fileWriter = new FileWriter(sourceFilePath,true); //true为追加写
                //参数可以是char 、char[]、String
                fileWriter.write("&Hello,world!",1,5);
                fileWriter.flush();
            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                try {
                    fileWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    ```

### \[\_6\_] 处理流BufferedWriter/BufferedReader

BfferedReader 里有Reader的属性，BufferedWriter里有Write的属性

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16534845323611653484532175.png)

*   使用BufferedWriter/BufferedReader 对**文本文件**进行拷贝

    ```java
    public static void main(String[] args) {
            String sourceFilePath = "D:\\system\\文档\\文件拷贝.java";
            String newFilePath = "D:\\system\\文档\\buffer拷贝文件.java";
            BufferedReader bufferedReader = null;
            BufferedWriter bufferedWriter = null;
            try {
                bufferedReader = new BufferedReader(new FileReader(sourceFilePath));
                bufferedWriter = new BufferedWriter(new FileWriter(newFilePath));
                String line_data = "";
                while ((line_data = bufferedReader.readLine()) != null) {
                    bufferedWriter.write(line_data);
                    bufferedWriter.newLine();
                }
            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                try {
                    bufferedReader.close();
                    bufferedWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }
    ```

*   使用BufferedOutputStream/BufferedInputStream 对**文件**进行拷贝

    ```java
    @Test
        public void BufferInputStream拷贝文件() {
            String sourceFilePath = "D:\\system\\下载\\VMware-workstation-full-16.2.3-19376536.exe";
            String newFilePath = "D:\\system\\文档\\VM_Clone.exe";
            BufferedInputStream bufferedInputStream = null;
            BufferedOutputStream bufferedOutputStream = null;
            try {
                bufferedInputStream = new BufferedInputStream(new FileInputStream(sourceFilePath));
                bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(newFilePath));
                byte[] bytes = new byte[1024];
                int readLen = 0;
                while ((readLen = bufferedInputStream.read(bytes)) > 0) {
                    bufferedOutputStream.write(bytes,0 ,readLen);
                }
            }catch (IOException e) {
                System.out.println(e.getMessage());
            }finally {
                try {
                    bufferedInputStream.close();
                    bufferedOutputStream.close();
                }catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }

        }
    ```

### \[\_7\_] 处理流 ObjectOutputStream/ObjectInputStream

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16535741728751653574172065.png)

*   序列化与反序列化

    *   \_Dog.java

        ```java
        package com.zhuangjie.io;

        import java.io.Serializable;

        public class _Dog implements Serializable {
            private String name;
            private int age;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public int getAge() {
                return age;
            }

            public void setAge(int age) {
                this.age = age;
            }

            public _Dog(String name, int age) {
                this.name = name;
                this.age = age;
            }

            @Override
            public String toString() {
                return "_Dog{" +
                        "name='" + name + '\'' +
                        ", age=" + age +
                        '}';
            }
        }

        ```

    *   序列化与反序列化

        序列化与反序列化要用的是ObjectOutputStream/ObjectInputStream， 且我们只能序列化对象，基本对象会自动装箱为包装类型。

        我们自定义的对象需要实现Serializable 接口，这样我们才能进行序列化。在序列端需要必须要声明自定义类，在反序列化端，读取为Object,如果要转为自定义类，也需要写该类。且类路径要相同，否则报错（异常：ClassCastException）；

        1）读写顺序要一致（可以看以下示例）。
        2）对象能否序列化或反序列化对象，看祖父类是否有实现Serializable  ，具有继承性。
        3）序列化的类中建议添加SerialVersionUID,为了提高版本的兼容性
        4）序列化对象时，默认将里面所有属性都进行序列化，但除了static或transient修饰的成员
        ，且属性的类型也需要实现序列化接口。

        ```java
        package com.zhuangjie.io;

        import org.junit.Test;

        import java.io.*;

        public class _9_ObjectInputStream与ObjectOutputStream {
            @Test
            public void serialize() {
                ObjectOutputStream oos =  null;
                String sourceFilePath = "D:\\system\\文档\\o.dat";
                try {
                    oos = new ObjectOutputStream(new FileOutputStream(sourceFilePath));
                    oos.writeUTF("小庄");
                    oos.writeBoolean(true);
                    oos.writeInt(123); //自动装箱
                    oos.writeObject(new _Dog("旺财",2));
                    System.out.println("序列化完成~");
                }catch (IOException e) {
                    System.out.println(e.getMessage());
                }finally {
                    try {
                        oos.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Test
            public void unserialize() {
                ObjectInputStream ois =  null;
                String sourceFilePath = "D:\\system\\文档\\o.dat";
                try {
                    ois = new ObjectInputStream(new FileInputStream(sourceFilePath));
                    String sv = ois.readUTF();
                    boolean b = ois.readBoolean();
                    int i = ois.readInt();
                    _Dog dog = (_Dog) ois.readObject();
                    
                    System.out.println(sv);
                    System.out.println(b);
                    System.out.println(i);
                    System.out.println(dog);
                }catch (IOException e) {
                    System.out.println(e.getMessage());
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                } finally {
                    try {
                        ois.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }


        ```

### \[\_9\_] 标准输入输出流 System.in与System.out

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16536629670041653662966015.png)

```java
package com.zhuangjie.io;

import org.junit.Test;

import java.io.IOException;
import java.util.Scanner;

public class _10_标准输入输出流 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入:");
        String next = scanner.next();
        System.out.println("你输入的是："+next);
        scanner.close();
    }
}

```

### \[\_10\_] 转换流

要说的转换流是：InputStreamReader 与 OutputStreamWriter

InputStreamReader 可以将字节输入流转为字符输入流，且InputStreamReader 本身是Reader的字类。

OutputStreamWriter可以将字符输出流转为字符输出流，且OutputStreamWriter是Writer的子类。

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537421111441653742111040.png)

一个文本文件是以GBK编码的，如果直接用读取，默认是以utf-8读取的，那么就会导致乱码，

```java
        String sourceFilePath = "D:\\system\\文档\\test.txt";
        BufferedReader br = new BufferedReader(new FileReader(sourceFilePath));
        String s = br.readLine();
        System.out.println(s);
```

我们可以先用InputStream读取，然后使用InputStreamReader指定编码为gbk的字符流进行读取即可。

```java
import sun.nio.cs.ext.GBK;
import java.io.*;

public class _11_转换流 {
    public static void main(String[] args) throws IOException {
        String sourceFilePath = "D:\\system\\文档\\test.txt";
        InputStreamReader isr = new InputStreamReader(new FileInputStream(sourceFilePath), "GBK");
        BufferedReader br = new BufferedReader(isr);
        String content = br.readLine();
        System.out.println(content);



    }
}

```

使用指定格式写：

```java
    @Test
    public void main_() throws IOException {
        String sourceFilePath = "D:\\system\\文档\\test.txt";
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(sourceFilePath),"GBK");
        osw.write("-你好，使用的是UTF-8！");
        osw.close();
    }
```

### \[\_11\_] 打印流 PrintStream/PrintWriter

打印流，只有输入流，所以分别是字节输出流PrintStream与字符输入流PrintWriter

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537466095441653746609348.png)

**1、PrintStream**

PrintStream是字节输出流OutputStream的子类，System.out属性就是PrintStream，调用print方法默认是输出到控制台，

![](https://fastly.jsdelivr.net/gh/18476305640/typora@master/image/16537468517621653746851581.png)

我们可以通过System.setOut传入一个PrintStream，在PrintStream中你可以指定输出在哪里。

```java
        PrintStream printStream = new PrintStream("D:\\system\\文档\\hello.txt");
        System.setOut(printStream);
        System.out.println("你好，主人 ！"); //输出到上面的设置的文件中

```

\*\*2、PrintWriter \*\*

PrintWriter是字符输出流，是Writer的子类，也可以接收字节输出流PrintStream，以下是PrintWriter的应用示例：

```java
import org.junit.Test;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;

public class _12_打印流 {
    @Test
    public void main_() throws IOException {

        PrintStream out = System.out;
        PrintWriter printWriter = new PrintWriter(out);
        printWriter.println("写在控制台");
        printWriter.close();


        PrintWriter pw = new PrintWriter(new FileWriter("D:\\system\\文档\\test.txt"));
        pw.write("你好，女人");
        pw.close();


    }
}

```

### \[\_12\_] Properties读与写

以下演示的是Properties的读与写示例

```java
package com.zhuangjie.io;

import org.junit.Test;

import java.io.*;
import java.util.Properties;

public class _13_properties {
    //properties读
    @Test
    public void test01() throws IOException {
        Properties properties = new Properties();
        properties.load(new FileReader("src\\mysql.properties"));
        String user = properties.getProperty("username");
        System.out.println("用户名："+user);
        String password = properties.getProperty("password");
        System.out.println("密码："+password);

    }
    //写
    @Test
    public void test02() throws IOException {
        Properties properties = new Properties();
        properties.setProperty("charset","utf-8");
        properties.setProperty("nb","牛逼");
        properties.setProperty("zhuangjie","庄杰");
        properties.store(new FileOutputStream("src\\mysql.properties"),"在最上面的注释");
        System.out.println("保存到文件成功！");
    }
}

```
