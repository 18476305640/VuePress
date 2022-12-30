# Jenkins

## 目录

*   [【环境的安装】](#环境的安装)

    *   [【GitLab安装】](#gitlab安装)

    *   [【Jenkins安装】](#jenkins安装)

*   [从gitlab上拉取代码](#从gitlab上拉取代码)

*   [加入Maven进行自动构建打包](#加入maven进行自动构建打包)

*   [【Web服务器】项目部署服务器的创建与配置](#web服务器项目部署服务器的创建与配置)

*   [【构建】实现自由风格的项目构建](#构建实现自由风格的项目构建)

*   [改动后持续集成](#改动后持续集成)

*   [【构建】使用Maven进行项目构建](#构建使用maven进行项目构建)

*   [【构建】使用流水线进行项目构建](#构建使用流水线进行项目构建)

    *   [改为项目本地：](#改为项目本地)

*   [【触发】项目构建触发器](#触发项目构建触发器)

    *   [1、触发远程构建](#1触发远程构建)

    *   [2、其它工程构建后触发](#2其它工程构建后触发)

    *   [3、定时构建](#3定时构建)

    *   [4、轮询 SCM](#4轮询-scm)

    *   [5、代码仓库触发构建](#5代码仓库触发构建)

*   [【副加】参数化构建](#副加参数化构建)

*   [【邮箱】邮箱功能](#邮箱邮箱功能)

*   [【Sonar代码审查】](#sonar代码审查)

    *   [安装](#安装)

    *   [Sonar与Jenkins整合](#sonar与jenkins整合)

    *   [应用到项目构建中](#应用到项目构建中)

*   [【分布式项目部署】](#分布式项目部署)

    *   [【Docker安装】](#docker安装)

    *   [【docker命令】](#docker命令)

    *   [【镜像的制作】](#镜像的制作)

    *   [【Harbor安装】](#harbor安装)

    *   [【项目与用户】](#项目与用户)

    *   [【推送镜像到Harbor】](#推送镜像到harbor)

    *   [【从Harbor拉取镜像】](#从harbor拉取镜像)

*   [【微服务持续集成】](#微服务持续集成)

    *   [【将代码上传到GitLab】](#将代码上传到gitlab)

    *   [【Jenkins拉取与构建】](#jenkins拉取与构建)

    *   [【加入代码审查】](#加入代码审查)

    *   [【编译打包】](#编译打包)

    *   [【镜像制作】](#镜像制作)

    *   [【应用部署】](#应用部署)

*   [【后端代码部署优化】](#后端代码部署优化)

    *   [【代码的修改】](#代码的修改)

    *   [【jenkins中创建项目】](#jenkins中创建项目)

    *   [【代码审查】](#代码审查)

    *   [【上传镜像到Harbor】](#上传镜像到harbor)

    *   [【应用部署】](#应用部署-1)

    *   [【高可用的nginx】](#高可用的nginx)

## 【环境的安装】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626248340612-1626248340557.png)

以下步骤：创建Gitlab服务器与配置-> 创建Jenkins服务与配置

上面两个步骤请参考：[https://blog.csdn.net/hancoder/article/details/118233786](https://blog.csdn.net/hancoder/article/details/118233786 "https://blog.csdn.net/hancoder/article/details/118233786")

### 【GitLab安装】

Gitlab安装

1.  安装相关依赖

yum -y install policycoreutils openssh-server openssh-clients postﬁx

1.  启动ssh服务&设置为开机启动

systemctl enable sshd && sudo systemctl start sshd

1.  设置postﬁx开机自启，并启动，postﬁx支持gitlab发信功能

systemctl enable postﬁx && systemctl start postﬁx

1.  开放ssh以及http服务，然后重新加载防火墙列表 ﬁrewall-cmd --add-service=ssh --permanent ﬁrewall-cmd --add-service=http --permanent ﬁrewall-cmd --reload

如果关闭防火墙就不需要做以上配置

1.  下载gitlab包，并且安装在线下载安装包：

wget [https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x "https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x") 86\_64.rpm

安装：

rpm -i gitlab-ce-12.4.2-ce.0.el6.x86\_64.rpm

1.  修改gitlab配置

```bash
vi /etc/gitlab/gitlab.rb
#修改gitlab访问地址和端口，默认为80，我们改为82 external_url ‘http://192.168.66.100:82’
#nginx[‘listen_port’] = 82
```

1.  重载配置及启动gitlab

```bash
gitlab-ctl reconﬁgure
gitlab-ctl restart
```

1.  把端口添加到防火墙

```bash
ﬁrewall-cmd --zone=public --add-port=82/tcp --permanent 
ﬁrewall-cmd --reload
```

启动成功后，看到以下修改管理员root密码的页面，修改密码后，然后登录即可

### 【Jenkins安装】

这里介绍两种方法，一种方法将最新版jenkins加入到yum源，另外一种是下载指定版本的rpm包

1）安装JDK

2）安装jenkins

wget -O ：下载并以不同的文件名保存

yum的repo中默认没有Jenkins，需要先将Jenkins存储库添加到yum repos，执行下面的命令：

```bash
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install -y jenkins #默认安装最新的
systemctl enable jenkins  #开机自启
vim /etc/sysconfig/jenkins   #修改内容： JENKINS_USER=“root” JENKINS_PORT=“8888”
service jenkins start  #启动
```

打开浏览器访问 [http://电脑ip:8888](http://电脑ip:8888 "http://电脑ip:8888")

创建一个管理员用户 ->  实例配置  -> 可以安装推荐的插件或另一种。

3）配置为国内插件下载地址：

```纯文本
cd /var/lib/jenkins/updates
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json
sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

Manage Plugins点击Advanced，把Update Site改为国内插件下载地址：

[https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json "https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json")

Sumbit后，在浏览器输入： [http://101机器ip:8888/restart](http://101机器ip:8888/restart "http://101机器ip:8888/restart") ，重启Jenkins

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627721279406-1627721279398.png)

4）安装中文插件

安装插件的插件后，会帮我们安装中文插件，如果没有搜索"Chinese"，安装

## 从gitlab上拉取代码

以下步骤：使用普通凭证从gitlab上拉取代码 ->  使用ssh凭证从gitlab上拉取代码

`实现在Jenkins上拉取Gitlab上的代码`

在Kenkins上安装Credentials Binding ,安装 Git插件 、在Kenkins服务器上安装git (yum install git -y  && git --version)

1、创建普通凭证

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626250522291-1626250522234.png)

2、创建一个项目，从gitlab上拉取代码

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626251037486-1626251037450-image-20210714162315906.png)

3、拉取

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626251148690-1626251148679.png)

`使用ssh凭证来拉取`

1、使用ssh-keygen生成ssh，打开/root/.ssh/下cat公钥  复制到gitlab设置中的ssh：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626251665628-1626251665529.png)

2、配置ssh凭证

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626252147796-1626252147756-image-20210714164202919.png)

3、在Jenkins项目中

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626252294465-1626252294427.png)

4、拉取

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626251148690-1626251148679.png)

## 加入Maven进行自动构建打包

就是可以在Jenkins对拉取的代码进行打包

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626258766265-1626258766237.png)

以下步骤：服务器上配置需要的环境   -->  Jenkins上配置 -->  对项目进行打包

1、在jenkins的服务器上安装java 、 maven配置环境；

```bash
export JAVA_HOME=/usr/local/jdk/jdk1.8.0_291
export PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib

#maven
export MAVEN_HOME=/usr/local/maven
export PATH=$PATH:$MAVEN_HOME/bin
```

2、Jenkins上配置

配置1：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626259189981-1626259189950.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626259391664-1626259391644.png)

配置2：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627725746059-1627725746011.png)

3、对项目进行打包

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626259620762-1626259620743.png)

## 【Web服务器】项目部署服务器的创建与配置

就是创建项目运行所需的环境，即安装有tomcat服务器，然后配置tomcat

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626248340612-1626248340557.png)

1、创建服务器在服务器上安装与配置tomcat

下载 ：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626317633809-1626317633802.png)

启动tomcat:

```bash
[root@localhost bin]# pwd
/usr/local/tomcat/apache-tomcat-8.5.69/bin
[root@localhost bin]# ./startup.sh
```

开放tomcat的8080端口：

```bash
firewall-cmd --zone=public --add-port=8080/tcp --permanent  #开放8080端口
firewall-cmd --reload  #重启防火墙
```

访问服务器的8080端口，进入指定页面：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626316981745-1626316981736.png)

配置1（配置了登录信息）:

vim  /usr/local/tomcat/apache-tomcat-8.5.69/conf/tomcat-users.xml

```xml
<tomcat-users>
   <role rolename="tomcat"/>
   <role rolename="role1"/>
   <role rolename="manager-script"/>
   <role rolename="manager-gui"/>
   <role rolename="manager-status"/>
   <role rolename="admin-gui"/>
   <role rolename="admin-script"/>
   <user username="tomcat" password="tomcat" roles="manager-gui,manager-script,tomcat,admin-gui,admin-script"/>
</tomcat-users>
```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626317427813-1626317427807.png)

配置2：

vim   /usr/local/tomcat/apache-tomcat-8.5.69/webapps/manager/META-INF/context.xml

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626317357259-1626317357234.png)

重启

```bash
./shutdown.sh #停止
./startup.sh #启动
```

再次访问或刷新刚才的403页面（上面配置了登录信息是：tomcat  tomcat）：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626317528836-1626317528820.png)

显示：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626317555591-1626317555588.png)

## 【构建】实现自由风格的项目构建

就是jenkins服务器向gitlab服务器获取代码后进行构建，然后将构建好生成的war包部署到tomcat服务器上。我们要做的是设置构建过程。

以下步骤：gitlab服务器项目的准备 ->  jenkins构建环境的准备  -> 开始构建部署

**1、gitlab服务器项目的准备**

项目准备：[https://github.com/18476305640/web\_dome](https://github.com/18476305640/web_dome "https://github.com/18476305640/web_dome")

在gitlab上创建一个项目，提交上传，得到：[git@192.168.208.136](mailto:git@192.168.208.136 "git@192.168.208.136"):zhuangjie/web\_demo\_freestyle.git

**2、jenkins构建环境的准备**

​	1）安装插件

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626409798823-1626409798816.png)

​	2）源码管理

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626410689844-1626410689829.png)

​	3）构建

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626409915126-1626409915107.png)

​	4）构建后操作（新内容）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626410192277-1626410192254-image-20210716123603979.png)

​	**3、开始构建**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626410540606-1626410540586.png)

## 改动后持续集成

我们能实现三个服务器的联动工作后，我们日常只需要使用git push 将代码上传到gitlab上，然后在jenkins中进行构建即可。

## 【构建】使用Maven进行项目构建

上面我们使用的是自由风格进行了项目构建，现在我们要进行maven风格来进行项目构建，与之不同的地方并不多。下面就来演示一下：

以下步骤：安装插件  ->  构建项目  -> 查看

`1、安装插件`

Maven Integration插件，不用重启也可用。

`2、构建项目`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626417502304-1626417502240.png)

部署：

修改代码，push后，点击构建项目

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626417981588-1626417981549.png)

`3、查看`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626418094970-1626418094944.png)

## 【构建】使用流水线进行项目构建

流水线构建项目，构建项目由之前的流程式转为了脚本（Pipeline）,我们创建一个流水线项目后，我们只需编写/生成一个Pipeline 即可完成对项目的拉取、构建、部署等操作。

以下步骤：安装插件（Pipeline，安装推荐的插件中包含）  -> 进行项目构建脚本（Pipeline）书写  ->  查看

`1、安装插件`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626419582840-1626419582796.png)

2、创建一个流水线的项目

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626425094651-1626425094634.png)

3、编写/生成 Pipeline脚本实现项目的拉取、构建、部署

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626425126026-1626425126010.png)

来自：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626424995322-1626424995301.png)

### 改为项目本地：

1、在流水线项目上修改：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626426369402-1626426369370.png)

2、项目中，添加一个文件：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626426478007-1626426477966.png)

## 【触发】项目构建触发器

### 1、触发远程构建

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626459590220-1626459590214.png)

### 2、其它工程构建后触发

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626459881414-1626459881392.png)

### 3、定时构建

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626489980663-1626489980633.png)

```纯文本
每30分钟构建一次：H代表形参 H/30 * * * * 10:02 10:32

每2个小时构建一次: H H/2 * * *

每天的8点，12点，22点，一天构建3次： (多个时间点中间用逗号隔开) 0 8,12,22 * * *

每天中午12点定时构建一次 H 12 * * *

每天下午18点定时构建一次 H 18 * * *

在每个小时的前半个小时内的每10分钟 H(0-29)/10 * * * *

每两小时一次，每个工作日上午9点到下午5点(也许是上午10:38，下午12:38，下午2:38，下午4:38) H H(9-16)/2 * * 1-5
```

### 4、轮询 SCM

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626490561413-1626490561372.png)

### 5、代码仓库触发构建

前面的几种构建触发器都不够好，就算是轮询SCM也会消耗我们的系统资源，拖慢jenkins的运行速度。下面我们就演示如果让gitlab来触发jenkins的项目构建。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626493715277-1626493715263.png)

需要安装GitlabHook插件：需要安装两个插件： Gitlab Hook和GitLab

​	1）项目触发器（复制下面图片首行的那个链接，备用）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626492610080-1626492610030.png)

​	2）在Jenkins中，Manage Jenkins->Conﬁgure System

不取消勾选，jenkins将不能正常接收gitlab发送的触发信息。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626492754499-1626492754469-382093cee2597d9990ee111babc36b21.jpg)

3）gitlab：使用root管理员帐号登录，开启对应服务

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626493399071-1626493399029.png)

4）使用项目账号登录，进入项目

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626493574213-1626493574200.png)

进行如下 测试，回到jenkins发现触发了项目构建！

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626493633032-1626493633021.png)

## 【副加】参数化构建

1、jenkins项目中设置参数

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626510691515-1626510691500.png)

2、在pipelish脚本中使用该参数

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626510755563-1626510755554.png)

3、执行参数化构建项目 （已测试）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626510632687-1626510632683.png)

## 【邮箱】邮箱功能

以下步骤：邮箱服务开启  ->   jenkins配置

`邮箱服务开启  `

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626516270004-1626516269977.png)

比如得到的授权码：CAPOTZETCGUFSOVC

`jenkins配置`

安装插件：Email Extension插件 template

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626515704616-1626515704587.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626516328030-1626516328027.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626516132502-1626516132500.png)

> 配置好上面后，现在我们开始应用到项目中。
> 现在流程是这样的，现在我们在jenkins项目中，该项目是一个流水线+参数化的构建项目，在jenkins中需要设置拉取构建流程的"jenkinsfile" 的pipelish脚本文件。它可以不是项目本身：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626699189512-1626699189503.png)

> 具体的项目构建由该脚本决定的\~

```java
pipeline {
   agent any

   stages {
      stage('pull code') {
         steps {
            checkout([$class: 'GitSCM', branches: [[name: '*/${branch}']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'b632ed00-fc81-43c8-a746-5aa0673b2658', url: 'git@192.168.208.149:zhuangjie/web_demo_freestyle.git']]])
         }
      }
      stage('build project') {
         steps {
            sh 'mvn clean package'
         }
      }
      stage('publish project') {
         steps {
            deploy adapters: [tomcat8(credentialsId: '54dea36f-c9ed-4925-9d25-ea4ba77d7b78', path: '', url: 'http://192.168.208.151:8080')], contextPath: null, war: 'target/*.war'
         }
      }

   }
   post {
         always {
             emailext(
                 subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} -${BUILD_STATUS}!',
                 body: '${FILE,path="email.html"}',
                 to: '2119299531@qq.com'
             )
         }
   }
}
```

分析：pipeline  {stages...   post... }  其中stages是构建流程，`post`是构建成功后的操作。我们在此下的always（不管成功或失败，当然也可以是成功或失败）中发送邮件。

该脚本使用了以下作为邮件模板，位于项目的根目录下：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626699623460-1626699623452.png)

email.html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>
</head>

<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"
      offset="0">
<table width="95%" cellpadding="0" cellspacing="0"
       style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">
  <tr>
    <td>(本邮件是程序自动下发的，请勿回复！)</td>
  </tr>
  <tr>
    <td><h2>
      <font color="#0000FF">构建结果 - ${BUILD_STATUS}</font>
    </h2></td>
  </tr>
  <tr>
    <td><br />
      <b><font color="#0B610B">构建信息</font></b>
      <hr size="2" width="100%" align="center" /></td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>项目名称&nbsp;：&nbsp;${PROJECT_NAME}</li>
        <li>构建编号&nbsp;：&nbsp;第${BUILD_NUMBER}次构建</li>
        <li>触发原因：&nbsp;${CAUSE}</li>
        <li>构建日志：&nbsp;<a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
        <li>构建&nbsp;&nbsp;Url&nbsp;：&nbsp;<a href="${BUILD_URL}">${BUILD_URL}</a></li>
        <li>工作目录&nbsp;：&nbsp;<a href="${PROJECT_URL}ws">${PROJECT_URL}ws</a></li>
        <li>项目&nbsp;&nbsp;Url&nbsp;：&nbsp;<a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><b><font color="#0B610B">Changes Since Last
      Successful Build:</font></b>
      <hr size="2" width="100%" align="center" /></td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>历史变更记录 : <a href="${PROJECT_URL}changes">${PROJECT_URL}changes</a></li>
      </ul> ${CHANGES_SINCE_LAST_SUCCESS,reverse=true, format="Changes for Build #%n:<br />%c<br />",showPaths=true,changesFormat="<pre>[%a]<br />%m</pre>",pathFormat="&nbsp;&nbsp;&nbsp;&nbsp;%p"}
    </td>
  </tr>
  <tr>
    <td><b>Failed Test Results</b>
      <hr size="2" width="100%" align="center" /></td>
  </tr>
  <tr>
    <td><pre
            style="font-size: 11pt; font-family: Tahoma, Arial, Helvetica, sans-serif">$FAILED_TESTS</pre>
      <br /></td>
  </tr>
  <tr>
    <td><b><font color="#0B610B">构建日志 (最后 100行):</font></b>
      <hr size="2" width="100%" align="center" /></td>
  </tr>
  <tr>
    <td><textarea cols="80" rows="30" readonly="readonly"
                  style="font-family: Courier New">${BUILD_LOG, maxLines=100}</textarea>
    </td>
  </tr>
</table>
</body>
</html>
```

除此，还需要设置邮箱这html格式进行发送：（在这下面搜索html,好像没有，但教程是这样的）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626704078478-1626704078470-image-20210719221412626.png)

## 【Sonar代码审查】

### 安装

> **注意，sonar6.7版本需要一个mysql5.7的数据库，jdk1.8以上比如8.5** ，然后再创建一个名为`sonar` 的数据库。然后再开始安装Sonar，启动后再开放端口且登录获取token ：

以下步骤：保证存在名为sonar的数据库 ->  安装Conar  -> 余下工作

`保证存在名为sonar的数据库`

`安装Conar`

下载sonar压缩包： [https://www.sonarqube.org/downloads/](https://www.sonarqube.org/downloads/ "https://www.sonarqube.org/downloads/")

```bash
yum install unzip
unzip sonarqube-6.7.4.zip #解压
mkdir /opt/sonar #创建目录
mv sonarqube-6.7.4/* /opt/sonar #移动文件

useradd sonar #创建sonar用户，必须sonar用于启动，否则报错
chown -R sonar. /opt/sonar #更改sonar目录及文件权限修改sonar配置文件
chown -R sonar. /usr/local/jdk/  #不确定是否需要这个授权！！！
vi  /opt/sonarqube-6.7.4/conf/sonar.properties
#编辑内容：四个地方设置username  passowrd  url  端口（不理默认9000）

sonar.jdbc.username=root
sonar.jdbc.password=Root@123  
sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConﬁgs= maxPerformance&useSSL=false

cd /opt/sonarqube-6.7.4

#su sonar 不能使用root用户启动！！！所以下面在root用户下使用如下使用启动
su sonar ./bin/linux-x86-64/sonar.sh start #启动
su sonar ./bin/linux-x86-64/sonar.sh status #查看状态
su sonar ./bin/linux-x86-64/sonar.sh stop #停止

tail -f logs/sonar.logs #查看日志访问sonar http://192.168.66.101:9000
```

`余下工作`

1\)开放端口：

```bash
firewall-cmd --zone=public --add-port=9000/tcp --permanent #永久开放该端口
firewall-cmd --reload  #重启防火墙
```

2\)登录：默认  admin/admin

​	获取token:

​	输入admin , 得到如下信息,需要摘取保存token

​	admin: **30ab099e4edef87ef92ca6217da084c0260de47c**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626709303395-1626709303372.png)

### Sonar与Jenkins整合

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925229389-1626925229368.png)

1、在Jenkins安装Sonar-Scanner工具

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925200244-1626925200242-image-20210720211841704.png)

2、整合

​	1)在Jenkins中安装SonarQube Scanner插件，用于连接ConarQube

​	2)、Manage Jenkins->Global Tool Conﬁguration  添加一个凭证

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925096630-1626925096623-image-20210720211228770.png)

​	3)在jenkins“系统配置”中，作如下配置

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925064354-1626925064346-image-20210720211416805.png)

### 应用到项目构建中

**JAVA\_HOME等环境变量需要设置好！** 我们应用在流水线的项目构建中，而其它的构建方式会相对简单。

以下步骤： 在项目中加入sonar-project.properties审查文件  ->  在pipelish脚本加入代码审查步骤

`1、在项目中加入sonar-project.properties审查文件`

在根目录下加入：

sonar-project.properties

```.properties
# must be unique in a given SonarQube instance
sonar.projectKey=web_demo_pipline
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=web_demo_pipline
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
# This property is optional if sonar.modules is set.
sonar.sources=.
sonar.exclusions=**/test/**,**/target/**

sonar.java.source=1.8
sonar.java.target=1.8

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8
```

`2、在pipelish脚本加入代码审查步骤`

在代码构建打包好后（生成target后），进行代码的审查

```纯文本
pipeline {
   agent any

   stages {
      stage('pull code') {
         steps {
            checkout([$class: 'GitSCM', branches: [[name: '*/${branch}']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'b632ed00-fc81-43c8-a746-5aa0673b2658', url: 'git@192.168.208.149:zhuangjie/web_demo_freestyle.git']]])
         }
      }
      stage('code checking') {
          steps {
              script {
                   //引入SonarQubeScanner工具
                  scannerHome = tool 'SonarQube-Scanner'   //第二步整合中安装Sonar-Scanner工具起的名字
              }
              //引入SonarQube的服务器环境
              withSonarQubeEnv('ConarQube6.7') {  //第二步整合中配置进Jenkins中起的服务的名字
                  sh "${scannerHome}/bin/sonar-scanner"
              }
          }
      }
      stage('build project') {
         steps {
            sh 'mvn clean package'
         }
      }
      stage('publish project') {
         steps {
            deploy adapters: [tomcat8(credentialsId: '54dea36f-c9ed-4925-9d25-ea4ba77d7b78', path: '', url: 'http://192.168.208.153:8080')], contextPath: null, war: 'target/*.war'
         }
      }

   }
   post {
         always {
             emailext(
                 subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} -${BUILD_STATUS}!',
                 body: '${FILE,path="email.html"}',
                 to: '2119299531@qq.com'
             )
         }
   }
}
```

然后进行代码的构建！首次会进行下载安装SonarQube Scanner

加入异常代码后进行构建，SonarQube中：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925023961-1626925023954-image-20210720223752856.png)

## 【分布式项目部署】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627046616524-1627046616423.png)

大致流程说明：
1）开发人员每天把代码提交到Gitlab代码仓库
2）Jenkins从Gitlab中拉取项目源码，编译并打成jar包，然后构建成Docker镜像，将镜像上传到
Harbor私有仓库。
3）Jenkins发送SSH远程命令，让生产部署服务器到Harbor私有仓库拉取镜像到本地，然后创建容器。
4）最后，用户可以访问到容器

【Docker环境】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627046771291-1627046771238.png)

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。
Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流
行的 Linux 机器上，也可以实现虚拟化。
容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销
极低。

Docker容器技术 vs 传统虚拟机技术

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627046966863-1627046966759.png)

|        | 虚拟机             | 容器          |
| ------ | --------------- | ----------- |
| 占用磁盘空间 | 非常大,GB级         | 小，MB甚至KB级   |
| 启动速度   | 慢，分钟级           | 快，秒级        |
| 对运行形态  | 运行在Hypervisor上  | 直接运行在宿主机内核上 |
| 并发性    | 一台宿主机上十几个，最多几十个 | 上百个，甚至数百上千个 |
| 性能     | 逊于宿主机           | 接近宿主机本地进程   |
| 资源利用率  | 低               | 高           |

简单一句话总结：Docker**技术就是让我们更加高效轻松地将任何应用在**Linux**服务器部署和使用**

### 【Docker安装】

1）卸载旧版本

```bash
yum list installed | grep docker #列出当前所有docker的包
yum -y remove docker-*  #的包名称 卸载docker包
rm -rf /var/lib/docker #删除docker的所有镜像和容器
```

2）安装必要的软件包

```bash
sudo yum install -y yum-utils  device-mapper-persistent-data  lvm2
```

3）设置下载的镜像仓库

```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
#或使用加速镜像:  yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

4）列出需要安装的版本列表

```bash
yum list docker-ce --showduplicates | sort -r  
```

5）安装指定版本（这里使用18.0.1版本）

```bash
sudo yum install docker-ce-18.06.1.ce
```

6）查看版本&设置开机自启

```bash
docker -v
sudo systemctl enable docker #设置开机启动  
systemctl is-enabled docker  #查看是否设置为开机自启
```

7）启动Docker

```bash
sudo systemctl start docker #启动
```

8）添加阿里云镜像下载地址

```bash
vi /etc/docker/daemon.json
```

内容如下：

```json
{ 
  "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"]
}
```

9）重启Docker

```bash
sudo systemctl restart docker  
systemctl status docker  #查看docker状态
```

离线安装方式请参考：[https://www.cnblogs.com/kingsonfu/p/11576797.html](https://www.cnblogs.com/kingsonfu/p/11576797.html "https://www.cnblogs.com/kingsonfu/p/11576797.html")

### 【docker命令】

1）镜像命令：

镜像：相当于应用的安装包，在Docker部署的任何应用都需要先构建成为镜像

```bash
docker search 镜像名称 #搜索镜像
docker pull 镜像名称 #拉取镜像 示例：docker pull nginx
docker images #查看本地所有镜像
docker rmi -f 镜像名称 #删除镜像(即使在运行)
docker rmi -f $(docker images -qa) #删除所有镜像
```

2）容器命令

容器：容器是由镜像创建而来。容器是Docker运行应用的载体，每个应用都分别运行在Docker的每个
容器中。

```bash
docker run -di -p 对应宿主机那个端口:开放应用端口  镜像名称:标签 #运行容器（默认是前台运行），di:i是运行，d是后台;  -p是public的意思;
docker ps #查看运行的容器
docker ps -a #查询所有容器

docker exec -it 容器ID/容器名称 /bin/bash #进入容器内部
docker start/stop/restart 容器名称/ID #启动/停止/重启容器
docker rm -f 容器名称/ID #删除容器
docker rm `docker ps -a -q` #删除所有容器
```

### 【镜像的制作】

下面将 "ttensquare\_eureka\_server-1.0-SNAPSHOT.jar" enreka微服务制作成一个docker镜像

1）上传Eureka的微服务jar包到linux
2）编写Dockerfile

```bash
FROM openjdk:8-jdk-alpine
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
EXPOSE 10086
ENTRYPOINT ["java","-jar","/app.jar"]
```

3）构建镜像

```bash
docker build --build-arg JAR_FILE=tensquare_eureka_server-1.0-SNAPSHOT.jar -t eureka:v1 .
```

4）查看镜像是否创建成功

```bash
docker images
```

5）创建容器

```bash
docker run -i --name=eureka -p 10086:10086 eureka:v1
```

6）访问容器
[http://192.168.66.101:10086](http://192.168.66.101:10086 "http://192.168.66.101:10086")

### 【Harbor安装】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627212945189-1627212945174.png)

简介：

Harbor（港口，港湾）是一个用于存储和分发Docker镜像的企业级Registry服务器。
除了Harbor这个私有镜像仓库之外，还有Docker官方提供的Registry。相对Registry，Harbor具有很
多优势：

1.  提供分层传输机制，优化网络传输 Docker镜像是是分层的，而如果每次传输都使用全量文件(所以
    用FTP的方式并不适合)，显然不经济。必须提供识别分层传输的机制，以层的UUID为标识，确定
    传输的对象。

2.  提供WEB界面，优化用户体验 只用镜像的名字来进行上传下载显然很不方便，需要有一个用户界
    面可以支持登陆、搜索功能，包括区分公有、私有镜像。

3.  支持水平扩展集群 当有用户对镜像的上传下载操作集中在某服务器，需要对相应的访问压力作分
    解。

4.  良好的安全机制 企业中的开发团队有很多不同的职位，对于不同的职位人员，分配不同的权限，
    具有更好的安全性。

1）先安装Docker并启动Docker（已完成）

参考之前的安装过程
2）先安装docker-compose

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.27.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose  #安装
sudo chmod +x /usr/local/bin/docker-compose  
docker-compose --version  #查看版本
```

3）下载Harbor的压缩包（本课程版本为：v1.9.2）
[https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases "https://github.com/goharbor/harbor/releases")
4）上传压缩包到linux，并解压

```bash
tar -xzf harbor-offline-installer-v1.9.2.tgz
mkdir /opt/harbor
mv harbor/* /opt/harbor
cd /opt/harbor
```

5）修改Harbor的配置

```bash
vi harbor.yml
#修改内容1:   hostname: 192.168.66.102
#修改内容2:   port: 85
```

6）安装Harbor

```bash
./prepare
./install.sh
```

7）启动Harbor

```bash
docker-compose up -d #启动
#docker-compose down -v #停止
```

8）访问Harbor
[http://192.168.66.102:85](http://192.168.66.102:85 "http://192.168.66.102:85")
默认账户密码：admin/Harbor12345

你可能会遇到的问题：[https://www.cnblogs.com/hallejuayahaha/p/13926575.html](https://www.cnblogs.com/hallejuayahaha/p/13926575.html "https://www.cnblogs.com/hallejuayahaha/p/13926575.html") （参考）博主遇到了docker-compose过低找不到，导致启动报错：

```纯文本
[root@localhost zhuangjie]# docker-compose up -d #启动
ERROR: 
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml
        
```

```bash
#解决
sudo curl -L https://github.com/docker/compose/releases/download/1.27.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

./install.sh #注意还要cd到Harbor根目录执行
```

### 【项目与用户】

登录后：

1）创建私有项目（项目分为公开项目与私有项目）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627218066729-1627218066687.png)

2）创建用户

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627217685972-1627217685963.png)

3）为项目添加成员：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627217922413-1627217922383.png)

| 角色    | 权限说明                      |
| ----- | ------------------------- |
| 访客    | 对于指定项目拥有只读权限              |
| 开发人员  | 对于指定项目拥有读写权限              |
| 维护人员  | 对于指定项目拥有读写权限，创建 Webhooks  |
| 项目管理员 | 除了读写权限，同时拥有用户管理/镜像扫描等管理权限 |

### 【推送镜像到Harbor】

1）给镜像打上标签

```bash
docker tag eureka:v1 192.168.208.157:85/uplog/eureka:v1
```

2）推送镜像(会遇到二个问题，请解决)

1.  问题1：需要把Harbor地址加入到Docker信任列表,不解决，推送会提示：
    vi /etc/docker/daemon.json
    需要重启Docker

    ```纯文本
    The push refers to repository [192.168.66.102:85/tensquare/eureka]
    Get https://192.168.66.102:85/v2/: http: server gave HTTP response to HTTPS
    client
    ```

    ```bash
    { 
     "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"],
     "insecure-registries": ["192.168.87.102:85"]
    }
    ```

2.  问题2：权限不足，不解决，推送会提示：“denied: requested access to the resource is denied”

    ```bash
    #docker login -u 用户名 -p 密码 192.168.87.102:85

    [root@localhost 桌面]# docker login -u zhuangjie  -p gkmzjaznH21  192.168.87.102:85
    Login Succeeded
    ```

3.  推送

    ```bash
    docker push 192.168.208.157:85/uplog/eureka
    ```

3）登录Harbor查看

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627219857216-1627219857185.png)

### 【从Harbor拉取镜像】

存在Docker后，我们做以下准备，这样才能确保我们能从Harbor中拉取镜像：

1.  需要把Harbor地址加入到Docker信任列表,不解决，推送会提示：
    vi /etc/docker/daemon.json
    需要重启Docker

    ```纯文本
    The push refers to repository [192.168.66.102:85/tensquare/eureka]
    Get https://192.168.66.102:85/v2/: http: server gave HTTP response to HTTPS
    client
    ```

    ```bash
    { 
     "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"],
     "insecure-registries": ["192.168.208.157:85"]  
    }
    ```

2.  准备拉取

    ```bash
    docker login -u zhuangjie -p zhuangJIE3333 192.168.208.157:85  #登录
    docker pull 192.168.208.157:85/uplog/eureka:v1  #拉取，该拉取命令直接从Harbor上一键复制
    docker images  #查看本地镜像
    ```

## 【微服务持续集成】

### 【将代码上传到GitLab】

后端代码：注意要代码要添加打包的插件

```xml
<build>
     <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
      </plugins>
</build>
```

前端代码：

```powershell
npm run dev  #测试启动项目
```

在GitLab上分别创建两个项目，分别是前端的 **tensquare\_front**  与后端的 **tensquare\_back**  ，然后将代码分别上传到对应的项目仓库上去。

### 【Jenkins拉取与构建】

在jenkins上创建一个流水线的项目 “tensquare\_back”  ，项目使用参数化（字符参数）构建：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627527217960-1627527217853.png)

使用本地脚本进行构建：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627527398196-1627527398130.png)

项目根目录“Jenkinsfile” 脚本文件：

```javascript
//git凭证ID
def git_auth = "3b3eca2f-e2d7-44e5-8e11-e98ee29953dc"
//git的url地址
def git_url = "git@192.168.87.128:zhuangjie/tensquare_back.git"
node {
   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
}
```

然后进行构建！

### 【加入代码审查】

在jenkins中加入一个构建参数（选项参数）：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627542931380-1627542931219.png)

在项目代码中，编辑“Jenkinsfile” 文件加入代码审查的脚本代码：

```javascript
//git凭证ID(ssh)
def git_auth = "3b3eca2f-e2d7-44e5-8e11-e98ee29953dc"
//git的url地址
def git_url = "git@192.168.87.128:zhuangjie/tensquare_back.git"
node {
   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        def scannerHome=tool 'SonarQube-Scanner'//jenkins>系统管理>全局工具配置>SonarQube Scanner>"Name"
        withSonarQubeEnv('ConarQube6.7'){ //jenkins>系统管理>系统配置>SonarQube servers>"Name"
                sh """
    cd ${project_name}
    ${scannerHome}/bin/sonar-scanner
  """
        }


   }
}
```

同时我们在每个微服务模块的根目录下加入“sonar-project.properties”  文件(注意模块间的该文件内容是不同的)：

tensquare\_eureka\_server模块：

```.properties
# must be unique in a given SonarQube instance
sonar.projectKey=tensquare_eureka_server
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=tensquare_eureka_server
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
# This property is optional if sonar.modules is set.
sonar.sources=.
sonar.exclusions=**/test/**,**/target/**
sonar.java.binaries=.

sonar.java.source=1.8
sonar.java.target=1.8
#sonar.java.libraries=**/target/classes/**

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8
```

tensquare\_zuul模块：

```.properties
# must be unique in a given SonarQube instance
sonar.projectKey=tensquare_zuul
# this is the name and version displayed in the SonarQube UI. Was mandatory prior to SonarQube 6.1.
sonar.projectName=tensquare_zuul
sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Replace "\" by "/" on Windows.
# This property is optional if sonar.modules is set.
sonar.sources=.
sonar.exclusions=**/test/**,**/target/**
sonar.java.binaries=.

sonar.java.source=1.8
sonar.java.target=1.8
#sonar.java.libraries=**/target/classes/**

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8
```

其它模块也是一样。然后进行代码构建，构建完后，我们可以访问Sonar来查看审查结果。

### 【编译打包】

我们需要将公共依赖进行安装，所以需要编辑项目根目录下 “Jenkinsfile”  脚本,加入“编译，安装公共子工程” 这个 阶段：

```javascript
//git凭证ID
def git_auth = "3b3eca2f-e2d7-44e5-8e11-e98ee29953dc"
//git的url地址
def git_url = "git@192.168.87.133:zhuangjie/tensquare_back.git"

   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
        withSonarQubeEnv('ConarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
    cd ${project_name}
    ${scannerHome}/bin/sonar-scanner
  """
        }
   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
    
}
```

然后在确保各个模块"pom.xml" 存在打包插件(父工程的该插件可以删除了)：

```xml
  <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

这样就能确保依赖安装能完成了。下面我们就进行对可运行的微服务进行打包：

编辑项目根目录下 “Jenkinsfile”  脚本,加入“编译，打包微服务工程” 这个 阶段：

```javascript
//git凭证ID
def git_auth = "3b3eca2f-e2d7-44e5-8e11-e98ee29953dc"
//git的url地址
def git_url = "git@192.168.87.133:zhuangjie/tensquare_back.git"


node {

   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
        withSonarQubeEnv('ConarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
    cd ${project_name}
    ${scannerHome}/bin/sonar-scanner
  """
        }


   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
   stage('编译，打包微服务工程') {
     sh "mvn -f ${project_name}  clean package"
   }

}
```

因为zull这个模块时依赖了父模块，所以我们需要确保服务器的本地仓库有父工程：

```bash
[root@localhost tensquare]# pwd
/root/.m2/repository/com/tensquare
[root@localhost tensquare]# mv /home/zhuangjie/桌面/tensquare_parent/ ./
[root@localhost tensquare]# ll
drwxr-xr-x. 3 root      root      58 7月  29 01:18 tensquare_common
drwxrwxrwx. 3 zhuangjie zhuangjie 58 7月  29 01:37 tensquare_parent
```

我们移动的文件目录：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627549375224-1627549375170.png)

然后再进行构建。这样我们在拉取的代码目录中就打包好了该模块的jar文件（测试jar可正常运行）。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627549978651-1627549978565.png)

### 【镜像制作】

在每个模块中加入“Dockerfile” 文件（common不需要)：

```bash
#FROM java:8
FROM openjdk:8-jdk-alpine
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
EXPOSE 10020
ENTRYPOINT ["java","-jar","/app.jar"]
```

在模块pom.xml中加入插件(common不需要)：

```xml
      <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>dockerfile-maven-plugin</artifactId>
                <version>1.3.6</version>
                <configuration>
                    <repository>${project.artifactId}</repository>
                    <buildArgs>
                        <JAR_FILE>target/${project.build.finalName}.jar</JAR_FILE>
                    </buildArgs>
                </configuration>
            </plugin>
```

然后编辑 “Jenkinsfile” (加入：**dockerfile:build** 来触发制作镜像)：

```javascript
//git凭证ID
def git_auth = "3b3eca2f-e2d7-44e5-8e11-e98ee29953dc"
//git的url地址
def git_url = "git@192.168.87.133:zhuangjie/tensquare_back.git"

node {
    
   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
        withSonarQubeEnv('ConarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
    cd ${project_name}
    ${scannerHome}/bin/sonar-scanner
  """
        }


   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
   stage('编译，打包微服务工程') {
     sh "mvn -f ${project_name}  clean package dockerfile:build"
   }
    
}
```

然后在jenkins点击构建。完成后：

```bash
docker images  #查看镜像，就会发现多出一个镜像文件，查看时间是刚刚制作的
```

### 【应用部署】

以下步骤：

1）在jenkins安装 Publish Over SSH插件

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628080915258-1628080915249.png)

2）确保jenkins（101）服务器有.ssh如果没有使用命令 "ssh-keygen" 生成。然后使用命令 "ssh-copy-id 192.168.87.103" 将公钥copy到web（103）服务器中

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628082119907-1628082119768.png)

3）在jenkins 的”全局配置“中配置"Publish over SSH" 的内容。怎么配置？

【Passphrse】密码，好像没有设置，如果设置了，需要填写。
【Path to key】key文件的路径（私钥）/root/.ssh/id\_rsa
【Key】为空，也 可以测试成功\*\*。注意如果 “/root/.ssh/id\_rsa” 文件找不到需要将.ssh的私钥粘贴到文本框中，至于是root还是其它用户，要看使用copy命令时用的是哪个用户执行的了。\*\*

【SSH Server Name】标识的名字，随便你取什么名字
【Hostname】需要连接ssh的主机名或ip地址，此处填写应用服务器IP（建议ip）
【Username】用户名
【Remote Directory】远程目录(根据需要填写文件传到此目录下)
【Test Configuration】配置完成，点击test会显示Success!\[]

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628093028483-1628093028472.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628083784632-1628083784445.png)

4）在jenkins项目配置中添加一个"字符参数" + 在项目代码中修改 "Jenkinsfile" 文件 + 上传部署脚本到web服务器中（需要授于执行权限 chmod +x deploy.sh ）

steps1:

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628093531296-1628093531286.png)

steps2:  加入“应用部署”

```纯文本
//git凭证ID
def git_auth = "da1d1333-c35f-415a-903c-b8d58c870c56"
//git的url地址
def git_url = "git@192.168.87.100:zhuangjie/tensquare_back.git"

//镜像的版本号
def tag = "latest"
//Harbor的url地址
def harbor_url = "192.168.87.102:85"
//镜像库项目名称
def harbor_project = "uplog"
//Harbor的登录凭证ID
def harbor_auth = "ef2651c8-92a7-4edb-b4ca-4e182fadf0ca"

node {
//    //获取当前选择的项目名称
//    def selectedProjectNames = "${project_name}".split(",")
//    //获取当前选择的服务器名称
//    def selectedServers = "${publish_server}".split(",")

   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
        withSonarQubeEnv('SonarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
    cd ${project_name}
    ${scannerHome}/bin/sonar-scanner
  """
        }


   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
   stage('编译，打包微服务工程，上传镜像') {
   sh "echo '开始制作镜像'"
     sh "mvn -f ${project_name}  clean package dockerfile:build"
    sh "echo '镜像制作好了'"
      //定义镜像名称
                    def imageName = "${project_name}:${tag}"
                   //对镜像打上标签
                   sh "docker tag ${imageName} ${harbor_url}/${harbor_project}/${imageName}"
                   //把镜像推送到Harbor
               withCredentials([usernamePassword(credentialsId: "${harbor_auth}", passwordVariable: 'password', usernameVariable: 'username')]) {

                       //登录到Harbor
                       sh "docker login -u ${username} -p ${password} ${harbor_url}"
                       //镜像上传
                       sh "docker push ${harbor_url}/${harbor_project}/${imageName}"
                       sh "echo 镜像上传成功"
              }
              sh "echo '应用部署开始'"
                sshPublisher(publishers: [
                            sshPublisherDesc(configName: 'master_server',
                            transfers: [
                                sshTransfer(cleanRemote: false,
                                excludes: '',
                                // 触发的命令，deploy.sh
                                execCommand: "/opt/jenkins_shell/deploy.sh $harbor_url $harbor_project $project_name $tag $port",
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[ , ]+',
                                remoteDirectory: '',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false)
                ])
                sh "echo '应用部署结束'"
   }

}
```

与之前相比添加了：

```纯文本
....

sh "echo '应用部署开始'"
                sshPublisher(publishers: [
                            sshPublisherDesc(configName: 'master_server',
                            transfers: [
                                sshTransfer(cleanRemote: false,
                                excludes: '',
                                // 触发的命令，deploy.sh
                                execCommand: "/opt/jenkins_shell/deploy.sh $harbor_url $harbor_project $project_name $tag $port",
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[ , ]+',
                                remoteDirectory: '',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false)
                ])
                sh "echo '应用部署结束'"
                
....
```

5）上传部署脚本到指定目录下（上面的Jenkinsfile部署代码中指定的路径）

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628085614649-1628085614604.png)

注意：需要确保我们jenkins（101服务器）与web（103）服务器能正常登录Harbor（102）服务器

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628094317092-1628094317018.png)

6）执行部署

在web(103)服务器中，执行“docker ps -a”命令就会发现我们构建的项目正在运行：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628093983955-1628093983885.png)

访问：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628094028736-1628094028724.png)

## 【后端代码部署优化】

### 【代码的修改】

主要是注册中心，其它微服务模块的修改是一样的。

*   Eureka 的 application.yml：

```yaml
# 集群版
server:
  port: 10086
spring:
  application:
    name: EUREKA-HA

---
server:
  port: 10086
spring:
  # 指定profile=eureka-server1
  profiles: eureka-server1
eureka:
  instance:
    # 指定当profile=eureka-server1时，主机名是eureka-server1
    hostname: 192.168.87.103
  client:
    service-url:
     # 将自己注册到eureka-server1、eureka-server2这个Eureka上面去
      defaultZone: http://192.168.87.103:10086/eureka/,http://192.168.87.104:10086/eureka/

---
server:
  port: 10086
spring:
  profiles: eureka-server2
eureka:
  instance:
    hostname: 192.168.87.104
  client:
    service-url:
      defaultZone: http://192.168.87.103:10086/eureka/,http://192.168.87.104:10086/eureka/
```

在启动微服务的时候，加入参数: spring.profiles.active 来读取对应的配置，使不同的机器应用不同的配置。

*   除了Eureka注册中心以外，其他微服务配置都需要加入所有Eureka服务

```yaml
# Eureka配置
eureka:
  client:
    service-url:
      defaultZone: http://192.168.87.103:10086/eureka/,http://192.168.87.104:10086/eureka/ # Eureka访问地址
  instance:
    prefer-ip-address: true
```

### 【jenkins中创建项目】

创建一个名为 "tensquare\_back\_cluster" 的流水线项目，并

进行参数化构建：

tensquare\_eureka\_server\@10086,tensquare\_zuul\@10020,tensquare\_admin\_service\@9001,tensquare\_gathering\@9002

注册中心,服务网关,权限服务,活动服务

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628517339350-1628517339044.png)

此时的构建效果：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628517441217-1628517441081.png)

### 【代码审查】

修改项目“**Jenkinsfile**” 文件

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628521417094-1628521416987-持续集成todo.png)

此时的完整Jenkinsfile内容：

```纯文本
//git凭证ID
def git_auth = "da1d1333-c35f-415a-903c-b8d58c870c56"
//git的url地址
def git_url = "git@192.168.87.100:zhuangjie/tensquare_back.git"

//镜像的版本号
def tag = "latest"
//Harbor的url地址
def harbor_url = "192.168.87.102:85"
//镜像库项目名称
def harbor_project = "uplog"
//Harbor的登录凭证ID
def harbor_auth = "ef2651c8-92a7-4edb-b4ca-4e182fadf0ca"

node {
    //获取当前选择的项目名称
    def selectedProjectNames = "${project_name}".split(",")


   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        for (int i=0; i<selectedProjectNames.length; i++) {
            //tensquare_eureka_server@10086
            def projectInfo = selectedProjectNames[i];
            //当前遍历的项目名称
            def currentProjectName = "${projectInfo}".split("@")[0]
            //当前遍历的项目端口
            def currentProjectPort = "${projectInfo}".split("@")[1]
            def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
            withSonarQubeEnv('SonarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
                cd ${currentProjectName}
                ${scannerHome}/bin/sonar-scanner
              """
            }

        }


   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
   stage('编译，打包微服务工程，上传镜像') {
   sh "echo '开始制作镜像'"
     sh "mvn -f ${project_name}  clean package dockerfile:build"
    sh "echo '镜像制作好了'"
      //定义镜像名称
                    def imageName = "${project_name}:${tag}"
                   //对镜像打上标签
                   sh "docker tag ${imageName} ${harbor_url}/${harbor_project}/${imageName}"
                   //把镜像推送到Harbor
               withCredentials([usernamePassword(credentialsId: "${harbor_auth}", passwordVariable: 'password', usernameVariable: 'username')]) {

                       //登录到Harbor
                       sh "docker login -u ${username} -p ${password} ${harbor_url}"
                       //镜像上传
                       sh "docker push ${harbor_url}/${harbor_project}/${imageName}"
                       sh "echo 镜像上传成功"
              }
              sh "echo '应用部署开始'"
                sshPublisher(publishers: [
                            sshPublisherDesc(configName: 'master_server',
                            transfers: [
                                sshTransfer(cleanRemote: false,
                                excludes: '',
                                // 触发的命令，deploy.sh
                                execCommand: "/opt/jenkins_shell/deploy.sh $harbor_url $harbor_project $project_name $tag $port",
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[ , ]+',
                                remoteDirectory: '',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false)
                ])
                sh "echo '应用部署结束'"
   }

}
```

### 【上传镜像到Harbor】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628648447700-1628648447686-image-20210810234710355.png)

如果想要构建成功还需要修改jenkinsfile“应用部署“中的（项目名称与端口）：

```纯文本
 ....
execCommand: "/opt/jenkins_shell/deployCluster.sh $harbor_url $harbor_project $currentProjectName $tag $currentProjectPort",
 ....
```

### 【应用部署】

分布式应用部署，我们需要再加入一台web服务器：

1）需要在jenkins服务器中执行  ssh-copy-id 192.168.66.104 到新的web的服务器

2）在新的web服务器中： vi /etc/docker/daemon.json

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628605176931-1628605176910.png)

3）系统配置->添加远程服务器

在jenkins（Publish over SSH）中配置一台web服务器

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628611001560-1628611001547.png)

1.  修改流水线项目

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628648405698-1628648405683-image-20210811001519165.png)

部署效果：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628648388613-1628648388594-image-20210811002247011.png)

5）修改项目"Jenkinsfile" 文件配置：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628648377303-1628648377290-image-20210811001121364.png)

完整”Jenkinsfile“:

```纯文本
//git凭证ID
def git_auth = "da1d1333-c35f-415a-903c-b8d58c870c56"
//git的url地址
def git_url = "git@192.168.87.100:zhuangjie/tensquare_back.git"

//镜像的版本号
def tag = "latest"
//Harbor的url地址
def harbor_url = "192.168.87.102:85"
//镜像库项目名称
def harbor_project = "uplog"
//Harbor的登录凭证ID
def harbor_auth = "ef2651c8-92a7-4edb-b4ca-4e182fadf0ca"

node {
    //获取当前选择的项目名称
    def selectedProjectNames = "${project_name}".split(",")
    //把选择的服务器信息转为数组
    def selectedServers = "${publish_server}".split(',')

   stage('拉取代码') {
      checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
   }
   stage('代码审查') {
        for (int i=0; i<selectedProjectNames.length; i++) {
            //tensquare_eureka_server@10086
            def projectInfo = selectedProjectNames[i];
            //当前遍历的项目名称
            def currentProjectName = "${projectInfo}".split("@")[0]
            //当前遍历的项目端口
            def currentProjectPort = "${projectInfo}".split("@")[1]
            def scannerHome=tool 'SonarQube-Scanner'//根据自己的Jenkinssonarqube-scanner环境修改
            withSonarQubeEnv('SonarQube6.7'){ //引入Jenkinssonarqube环境
                sh """
                cd ${currentProjectName}
                ${scannerHome}/bin/sonar-scanner
              """
            }

        }


   }
   stage('编译，安装公共子工程') {
     sh "mvn -f tensquare_common clean install"
   }
   stage('编译，打包微服务工程，上传镜像') {
        for (int i=0; i<selectedProjectNames.length; i++) {
            //tensquare_eureka_server@10086
            def projectInfo = selectedProjectNames[i];
            //当前遍历的项目名称
            def currentProjectName = "${projectInfo}".split("@")[0]
            //当前遍历的项目端口
            def currentProjectPort = "${projectInfo}".split("@")[1]
            sh "echo '开始制作镜像'"
            sh "mvn -f ${currentProjectName}  clean package dockerfile:build"
            sh "echo '镜像制作好了'"
            //定义镜像名称
            def imageName = "${currentProjectName}:${tag}"
            //对镜像打上标签
            sh "docker tag ${imageName} ${harbor_url}/${harbor_project}/${imageName}"
            //把镜像推送到Harbor
            withCredentials([usernamePassword(credentialsId: "${harbor_auth}", passwordVariable: 'password', usernameVariable: 'username')]) {
                    //登录到Harbor
                    sh "docker login -u ${username} -p ${password} ${harbor_url}"
                    //镜像上传
                    sh "docker push ${harbor_url}/${harbor_project}/${imageName}"
                    sh "echo 镜像上传成功"
            }
           //=====以下为远程调用进行项目部署========
           for(int j=0; j<selectedServers.size(); j++){
               //每个服务名称
               def currentServer = selectedServers[j]
               //添加微服务运行时的参数：spring.profiles.active
               def activeProfile = "--spring.profiles.active="
               if(currentServer=="master_server"){
                    activeProfile = activeProfile+"eureka-server1"
               }else if(currentServer=="slave_server1"){
                    activeProfile = activeProfile+"eureka-server2"
               }
                sh "echo '应用部署开始'"
                sshPublisher(publishers: [
                       sshPublisherDesc(configName: "${currentServer}",
                       transfers: [
                           sshTransfer(cleanRemote: false,
                           excludes: '',
                           // 触发的命令，deploy.sh
                           execCommand: "/opt/jenkins_shell/deployCluster.sh $harbor_url $harbor_project $currentProjectName $tag $currentProjectPort",
                           execTimeout: 120000,
                           flatten: false,
                           makeEmptyDirs: false,
                           noDefaultExcludes: false,
                           patternSeparator: '[ , ]+',
                           remoteDirectory: '',
                           remoteDirectorySDF: false,
                           removePrefix: '',
                           sourceFiles: '')
                       ],
                       usePromotionTimestamp: false,
                       useWorkspaceInPromotion: false,
                       verbose: false)
                ])
                sh "echo '应用部署结束'"
            }
        }
   }

}
```

6）在两个生产服务器中 "/opt/jenkins\_shell" 目录下加入 "deployCluster.sh" 脚本，并授予执行权限；

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628648361824-1628648361791-image-20210811001811353.png)

deployCluster.sh

```bash
#! /bin/sh
#接收外部参数
harbor_url=$1
harbor_project_name=$2
project_name=$3
tag=$4
port=$5
profile=$6

imageName=$harbor_url/$harbor_project_name/$project_name:$tag

echo "$imageName"

#查询容器是否存在，存在则删除
containerId=`docker ps -a | grep -w ${project_name}:${tag}  | awk '{print $1}'`

if [ "$containerId" !=  "" ] ; then
    #停掉容器
    docker stop $containerId

    #删除容器
    docker rm $containerId
  
  echo "成功删除容器"
fi

#查询镜像是否存在，存在则删除
imageId=`docker images | grep -w $project_name  | awk '{print $3}'`

if [ "$imageId" !=  "" ] ; then
      
    #删除镜像
    docker rmi -f $imageId
  
  echo "成功删除镜像"
fi


# 登录Harbor
docker login -u zhuangjie -p gkmzjaznH21 $harbor_url

# 下载镜像
docker pull $imageName

# 启动容器
docker run -di -p $port:$port $imageName $profile

echo "容器启动成功"
```

注意：需要修改 Harbor 登录信息。

### 【高可用的nginx】

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1628686966488-1628686966378.png)

1）安装Nginx（已完成）

2）配置nginx

```纯文本
upstream zuulServer {
        server 192.168.87.103:10020 weight=1;
        server 192.168.87.104:10020 weight=1;
}
server {
        listen       9090;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
           proxy_pass http://zuulServer/;
    }
...

```

3）重启nginx

```bash
systemctl restart nginx
```

[Jenkins实战](Jenkins实战/Jenkins实战.md "Jenkins实战")
