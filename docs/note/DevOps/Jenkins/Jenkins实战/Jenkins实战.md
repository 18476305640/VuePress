# Jenkins实战

## 目录

*   [持续集成实战](#持续集成实战)

    *   [【GitLab仓库 192.168.87.100】](#gitlab仓库-19216887100)

    *   [【Jenkins安装 192.168.87.101】](#jenkins安装-19216887101)

        *   *   [1、配置Jenkins](#1配置jenkins)

            *   [2、创建与GitLab的关联](#2创建与gitlab的关联)

            *   [3、构建流水线环境](#3构建流水线环境)

            *   [4、Extended Choice Parameter参数构建](#4extended-choice-parameter参数构建)

            *   [5、注意事项](#5注意事项)

            *   [6、代码审查](#6代码审查)

            *   [Sonar与Jenkins整合](#sonar与jenkins整合)

            *   [7、编译打包](#7编译打包)

            *   [8、Docker环境](#8docker环境)

            *   [9、镜像制作](#9镜像制作)

    *   [【Harbor环境 192.168.87.102】](#harbor环境-19216887102)

        *   *   [【项目与用户】](#项目与用户)

            *   [1、推送镜像到Harbor](#1推送镜像到harbor)

            *   [2、拉取镜像从Harbor](#2拉取镜像从harbor)

    *   [【Web服务器 192.168.87.103】](#web服务器-19216887103)

        *   *   [1、应用部署](#1应用部署)

            *   [2、高可用的nginx](#2高可用的nginx)

# 持续集成实战

## 【GitLab仓库 192.168.87.100】

1.  安装相关依赖

yum -y install policycoreutils openssh-server openssh-clients postﬁx

1.  启动ssh服务&设置为开机启动

systemctl enable sshd && sudo systemctl start sshd

1.  设置postﬁx开机自启，并启动，postﬁx支持gitlab发信功能

yum install postfix
systemctl enable postﬁx && systemctl start postﬁx

1.  开放ssh以及http服务，然后重新加载防火墙列表

firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --reload

如果关闭防火墙就不需要做以上配置

1.  下载gitlab包，并且安装在线下载安装包：

wget [https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x "https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x") 86\_64.rpm

1.  安装：

rpm -i gitlab-ce-12.4.2-ce.0.el6.x86\_64.rpm

1.  修改gitlab配置

```bash
vi /etc/gitlab/gitlab.rb
###修改gitlab访问地址和端口，默认为80，我们改为82 
#修改external_url 'http://192.168.87.100'
#加入nginx['listen_port'] = 82
```

1.  重载配置及启动gitlab

```bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

1.  把端口添加到防火墙

```bash
firewall-cmd --zone=public --add-port=82/tcp --permanent 
firewall-cmd --reload
```

启动成功后，看到以下修改管理员root密码的页面，修改密码后，然后登录即可
9\. 卸载gitlab
\[教程][https://www.cnblogs.com/peteremperor/p/10837551.html](https://www.cnblogs.com/peteremperor/p/10837551.html "https://www.cnblogs.com/peteremperor/p/10837551.html")

10、使用：
先创建一个组，然后创建一个用户，在组中创建一个项目，为项目添加成员，切换到成员，进行日常开发！
`创建组后向组中加入成员`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16346538723901634653872219.png)

## 【Jenkins安装 192.168.87.101】

这里介绍两种方法，一种方法将最新版jenkins加入到yum源，另外一种是下载指定版本的rpm包

1）安装JDK

2）安装jenkins

wget -O ：下载并以不同的文件名保存

yum的repo中默认没有Jenkins，需要先将Jenkins存储库添加到yum repos，执行下面的命令：

```bash
#准备
yum  -y install epel-release
yum -y install daemonize
#正式安装
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install -y jenkins #默认安装最新的
systemctl enable jenkins  #开机自启
#vim /etc/sysconfig/jenkins   #修改内容： JENKINS_USER=“root” JENKINS_PORT=“8888”
sed -i  "s/JENKINS_PORT=\"8080\"/JENKINS_PORT=\"8888\"/" /etc/sysconfig/jenkins
service jenkins start  #启动

#开放端口
firewall-cmd --zone=public --add-port=8888/tcp --permanent
firewall-cmd --reload #重载防火墙

```

打开浏览器访问 [http://192.168.87.101:8888](http://192.168.87.101:8888 "http://192.168.87.101:8888")

#### 1、配置Jenkins

创建一个管理员用户 ->  实例配置  -> 可以安装推荐的插件或另一种。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16345225884471634522588357.png)

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

#### 2、创建与GitLab的关联

以下步骤：使用普通凭证从gitlab上拉取代码 ->  使用ssh凭证从gitlab上拉取代码

`实现在Jenkins上拉取Gitlab上的代码`

在Jenkins上安装Credentials Binding ,安装 Git插件 、在Jenkins服务器上安装git (yum install git -y  && git --version)

1、创建普通凭证

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626250522291-1626250522234.png)

`使用ssh凭证来拉取`

2、使用ssh-keygen生成ssh，打开/root/.ssh/下cat公钥  复制到gitlab设置中的ssh：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626251665628-1626251665529.png)

3、配置ssh凭证

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626252147796-1626252147756-image-20210714164202919.png)

#### 3、构建流水线环境

流水线构建项目，构建项目由之前的流程式转为了脚本（Pipeline）,我们创建一个流水线项目后，我们只需编写/生成一个Pipeline 即可完成对项目的拉取、构建、部署等操作。

以下步骤：安装插件（Pipeline，安装推荐的插件中包含）  -> 进行项目构建脚本（Pipeline）书写  ->  查看

`1、安装插件`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626419582840-1626419582796.png)

#### 4、Extended Choice Parameter参数构建

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16345284507411634528450683.png)

示例：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/163453960961759d3f8f4632c99f1cb0ca9307497e741.png)

#### 5、注意事项

1\)拉取代码时，Jenkins脚本中的git凭证是ssh

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16345397889081634539788897.png)

#### 6、代码审查

`安装`

> **注意，sonar6.7版本需要一个mysql5.7的数据库，jdk1.8以上比如8.5** ，然后再创建一个名为`sonar` 的数据库。然后再开始安装Sonar，启动后再开放端口且登录获取token ：

以下步骤：保证存在名为sonar的数据库 ->  安装Conar  -> 余下工作

`保证存在名为sonar的数据库`

`安装Conar`

下载sonar压缩包： [https://www.sonarqube.org/downloads/](https://www.sonarqube.org/downloads/ "https://www.sonarqube.org/downloads/")

```bash
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-6.7.4.zip
yum install unzip
unzip sonarqube-6.7.4.zip #解压
mv sonarqube-6.7.4/* /usr/local/ #移动文件

useradd sonar #创建sonar用户，必须sonar用于启动，否则报错
chown -R sonar. /usr/local/sonarqube-6.7.4 #更改sonar目录及文件权限修改sonar配置文件

vim /usr/local/sonarqube-6.7.4/conf/sonar.properties
#直接将下面粘贴到配置上去，而端口不作修改（默认9000）

sonar.jdbc.username=root
sonar.jdbc.password=3333  
sonar.jdbc.url=jdbc:mysql://localhost:3306/sonar?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useConﬁgs= maxPerformance&useSSL=false

cd /usr/local/sonarqube-6.7.4

#su sonar 不能使用root用户启动！！！所以下面在root用户下使用如下使用启动
su sonar ./bin/linux-x86-64/sonar.sh start #启动
su sonar ./bin/linux-x86-64/sonar.sh status #查看状态
su sonar ./bin/linux-x86-64/sonar.sh stop #停止

tail -f logs/sonar.logs #查看日志访问sonar http://192.168.66.101:9000
#开放端口
firewall-cmd  --zone=public --add-port=9000/tcp --permanent
firewall-cmd --reload

```

`余下工作`

2\)登录：默认  admin/admin

​	获取token:

​	输入admin , 得到如下信息,需要摘取保存token

​	admin: **d6065dbc1e1cfcd3a9714614b16d6bd816246d29**

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626709303395-1626709303372.png)

#### Sonar与Jenkins整合

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925229389-1626925229368.png)

`安装插件`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16345655278061634565527688.png)

`在Jenkins安装Sonar-Scanner工具`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925200244-1626925200242-image-20210720211841704.png)

`Manage Jenkins->Global Tool Conﬁguration  添加一个凭证`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925096630-1626925096623-image-20210720211228770.png)

`在jenkins“系统配置”中，作如下配置`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626925064354-1626925064346-image-20210720211416805.png)

`在项目Jenkins脚本中`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16345668961331634566895867.png)

#### 7、编译打包

`环境准备`

需要确保，jenkin主机安装了jdk、maven（配置好阿里云镜像，然后再看下面）
2、Jenkins上配置

配置1：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626259189981-1626259189950.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1626259391664-1626259391644.png)

配置2：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627725746059-1627725746011.png)

`对于公共模块`

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

`父模块上传到服务`

这样就能确保依赖安装能完成了。下面我们就进行对可运行的微服务进行打包：

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

#### 8、Docker环境

简单一句话总结：Docker**技术就是让我们更加高效轻松地将任何应用在**Linux**服务器部署和使用**

\`【Docker安装】\`\`

1）卸载旧版本

```bash
yum list installed | grep docker #列出当前所有docker的包
yum -y remove docker  #的包名称 卸载docker包
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

8）添加阿里云镜像下载地址（除此还是拉取与推送的信任列表）

vi /etc/docker/daemon.json

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

`【docker命令】`

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
docker logs -f -t --tail 行数 容器名  #查看容器运行日志
```

`【镜像的制作】`

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

#### 9、镜像制作

在这个过程中不需要在Jenkins中安装插件来辅助，假如jenkins所在机器要向harbor机器推送容器，只需要jenkins对docker配置将harbor加入信任列表且能登录到Harbor服务器即可，Harbor能被登录成功即可！
而对于项目内部，需要加入"Dockerfile" 文件

当程序在项目根目录下执行“mvn -f \${currentProjectName}  clean package dockerfile:build” 时，就会进行编译打包，制作成镜像！

## 【Harbor环境 192.168.87.102】

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
#加速版 curl -L "https://get.daocloud.io/docker/compose/releases/download/1.27.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose  
docker-compose --version  #查看版本
```

3）下载Harbor的压缩包（本课程版本为：v1.9.2）
[https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases "https://github.com/goharbor/harbor/releases")

4）安装开始

```bash
tar -xzf harbor-offline-installer-v1.9.2.tgz -C /usr/local/
cd /usr/local/harbor

vim harbor.yml
#修改内容1:   hostname: 192.168.87.102
#修改内容2:   port: 85
#还可以修改登录密码，这里不作配置，下面使用的是默认的密码进行登录

./install.sh
docker-compose up -d #启动
#docker-compose down -v #停止

```

5）添加为开机自启
vim /lib/systemd/system/harbor.service

```shell=
[Unit]
Description=Harbor
After=docker.service systemd-networkd.service systemd-resolved.service
Requires=docker.service
Documentation=http://github.com/vmware/harbor

[Service]
Type=simple
Restart=on-failure
RestartSec=5
ExecStart=/usr/local/bin/docker-compose -f  /usr/local/harbor/docker-compose.yml up
ExecStop=/usr/local/bin/docker-compose -f /usr/local/harbor/docker-compose.yml down

[Install]
WantedBy=multi-user.target

```

systemctl enable harbor
systemctl is-enabled harbor

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
#方法一重启

#方法二：
sudo curl -L https://github.com/docker/compose/releases/download/1.27.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

./install.sh #注意还要cd到Harbor根目录执行
```

#### 【项目与用户】

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

#### 1、推送镜像到Harbor

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
     "insecure-registries": ["192.168.208.157:85"]
    }
    ```

2.  问题2：权限不足，不解决，推送会提示：“denied: requested access to the resource is denied”

    ```bash
    #docker login -u 用户名 -p 密码 192.168.66.102:85

    [root@localhost 桌面]# docker login -u zhuangjie  -p gkmzjaznH21  192.168.87.102:85
    Login Succeeded
    ```

3.  推送

    ```bash
    docker push 192.168.208.157:85/uplog/eureka
    ```

3）登录Harbor查看

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627219857216-1627219857185.png)

#### 2、拉取镜像从Harbor

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

## 【Web服务器 192.168.87.103】

#### 1、应用部署

分布式应用部署，我们需要再加入一台web服务器：
环境初始化：

```纯文本
systemctl enable sshd && sudo systemctl start sshd

firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
```

环境：必须安装jdk, docker（然后将harbor加入信任列表：），

vi /etc/docker/daemon.json

```纯文本
{
 "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"],
 "insecure-registries": ["192.168.87.102:85"]
}
```

sudo systemctl restart docker   #重启
systemctl status docker  #查看docker状态

jenkins安装 “Publish over SSH” 插件，现在的问题是如何通过ssh控制一web服务器了。

1）需要在jenkins服务器中执行  ssh-copy-id 192.168.87.104 到新的web的服务器，然后再到jenkins配置一下，就可以使用这个web服务器进行部署了

2）在jenkins 的”全局配置“中配置"Publish over SSH" 的内容。怎么配置？

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

3）在两个生产服务器中 "/opt/jenkins\_shell" 目录下加入 "deployCluster.sh" 脚本，并授予执行权限；

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

#### 2、高可用的nginx

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
