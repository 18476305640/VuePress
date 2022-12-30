# DevOps

## 目录

*   [DevOps](#devops-1)

    *   *   [1.1虚拟机的准备](#11虚拟机的准备)

        *   [2.1Gitlab代码仓库的准备](#21gitlab代码仓库的准备)

        *   [3.1Harbor仓库](#31harbor仓库)

            *   [\[1\] 安装](#1-安装)

            *   [\[2\] 项目与用户](#2-项目与用户)

        *   [4.1安装K8S集群](#41安装k8s集群)

            *   [1）基本环境](#1基本环境)

            *   [2）Docker的安装](#2docker的安装)

            *   [3）开始安装K8S](#3开始安装k8s)

            *   [4）master节点的初始化](#4master节点的初始化)

            *   [5）给集群安装通信组件](#5给集群安装通信组件)

            *   [6）查看节点的状态](#6查看节点的状态)

        *   [5.1安装Jenkins](#51安装jenkins)

        *   [6.1整合工作](#61整合工作)

        *   [7.1 流水线](#71-流水线)

# DevOps

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1646539691709641.png)

`总揽`

你需要学过Kubernetes，否则当不容易理解本教程！

我们需要有Gitlab，用户内部开发的仓库，开发的代码push到上面，还有要Harbor Docker镜像的私有仓库（私服），作为我们项目镜像的拉取部署。

然后搭建K8S集群（k8s-master，k8s-node01），将Jenkins部署在k8s上。然后进行各种准备工作，就可以对Gitlab的项目进行打包部署了。

资料：[https://github.com/18476305640/fileBox/tree/main](https://github.com/18476305640/fileBox/tree/main "https://github.com/18476305640/fileBox/tree/main")  > DevOps

其它学习参考：

[Kubernetes](Kubernetes/Kubernetes.md "Kubernetes")

[Jenkins](Jenkins/Jenkins.md "Jenkins")

### 1.1虚拟机的准备

推荐：[http://mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86\_64/CentOS-7-x86\_64-Minimal-2009.iso](http://mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso "http://mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso")

虚拟机：192.168.87.100 、192.168.87.101，192.168.87.102，192.168.87.103 。注意安装好虚拟机后，设置好静态ip（用nmtui命令）。

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16465422477121646542246944.png)

### 2.1Gitlab代码仓库的准备

1）基本环境

```bash
#安装相关依赖
yum -y install policycoreutils openssh-server openssh-clients postﬁx
#启动ssh服务&设置为开机启动
systemctl enable sshd && sudo systemctl start sshd
#设置postﬁx开机自启，并启动，postﬁx支持gitlab发信功能
yum install postfix
systemctl enable postﬁx && systemctl start postﬁx
#开放ssh以及http服务，然后重新加载防火墙列表
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
#如果关闭防火墙就不需要做以上配置
#下载gitlab包，并且安装在线下载安装包：
wget [https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el6/gitlab-ce-12.4.2-ce.0.el6.x) 86_64.rpm
#安装：
rpm -i gitlab-ce-12.4.2-ce.0.el6.x86_64.rpm
```

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
#开放gitlab的82端口
firewall-cmd --zone=public --add-port=82/tcp --permanent 
firewall-cmd --reload
```

启动成功后，看到以下修改管理员root密码的页面，修改密码后，然后登录即可

1.  卸载gitlab

\[教程][https://www.cnblogs.com/peteremperor/p/10837551.html](https://www.cnblogs.com/peteremperor/p/10837551.html "https://www.cnblogs.com/peteremperor/p/10837551.html")

10、使用：
先创建一个组，然后创建一个用户，在组中创建一个项目，为项目添加成员，切换到成员，进行日常开发！
`创建组后向组中加入成员`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16346538723901634653872219.png)

### 3.1Harbor仓库

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/1627212945189-1627212945174.png)

简介：

Harbor（港口，港湾）是一个用于存储和分发Docker镜像的企业级Registry服务器。
除了Harbor这个私有镜像仓库之外，还有Docker官方提供的Registry。相对Registry，Harbor具有很
多优势：

1.  提供分层传输机制，优化网络传输 Docker镜像是是分层的，而如果每次传输都使用全量文件(所以

用FTP的方式并不适合)，显然不经济。必须提供识别分层传输的机制，以层的UUID为标识，确定

传输的对象。

1.  提供WEB界面，优化用户体验 只用镜像的名字来进行上传下载显然很不方便，需要有一个用户界

面可以支持登陆、搜索功能，包括区分公有、私有镜像。

1.  支持水平扩展集群 当有用户对镜像的上传下载操作集中在某服务器，需要对相应的访问压力作分

解。

1.  良好的安全机制 企业中的开发团队有很多不同的职位，对于不同的职位人员，分配不同的权限，

具有更好的安全性。

#### \[1] 安装

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
#修改内容3：有http与https，就在前面，先一个，注释另一个。
#还可以修改登录密码，这里不作配置，下面使用的是默认的密码进行登录

./install.sh
docker-compose up -d #启动
#docker-compose down -v #停止

```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16467492401271646749239917.png)

5）添加为开机自启
vim /lib/systemd/system/harbor.service

```text
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

```text
[root@localhost zhuangjie]# docker-compose up -d #启动
ERROR: 
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml
        
```

```bash
#方法一重启!!

#方法二：
sudo curl -L https://github.com/docker/compose/releases/download/1.27.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

./install.sh #注意还要cd到Harbor根目录执行
```

#### \[2] 项目与用户

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

### 4.1安装K8S集群

要用到2台机器,一台用于master节点，一台用于node节点。K8S集群至少两台。

#### 1）基本环境

**以下三条命令分别在对应的机器执行**
hostnamectl set-hostname k8s-master
hostnamectl set-hostname k8s-node01

**全k8s节点执行以下！**

```bash
#将下面映射规则加入到hosts文件中
cat >>/etc/hosts <<EOF
192.168.87.101 k8s-master
192.168.87.103 k8s-node01
192.168.87.104 k8s-node02 
EOF

yum install vim wget -y    #安装必要软件
cat /etc/redhat-release   #查看版本，版本不要小于Centos Linux 7.5.1804 (Core) 这个版本

#kubernetes要求集群中的节点时间必须精确一直，这里使用chronyd服务从网络同步时间
systemctl start chronyd
systemctl enable chronyd
yum install ntpdate -y
ntpdate ntp.aliyun.com
cp -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
date
# 1 关闭firewalld服务
systemctl stop firewalld
systemctl disable firewalld
# 2 关闭iptables服务
systemctl stop iptables
systemctl disable iptables
#  禁用selinux：编辑 /etc/selinux/config 文件，修改SELINUX的值为disable
sed -i '/SELINUX/s/enforcing/disable/g' /etc/selinux/config
#禁用swap：编辑分区配置文件/etc/fstab，注释掉swap分区一行
sed -i '/swap/s/^\//\#\//' /etc/fstab
swapoff -a  #临时关闭，否则master初始化报错
#修改linux的内核参数
# 修改linux的内核采纳数，添加网桥过滤和地址转发功能
# 编辑/etc/sysctl.d/kubernetes.conf文件，添加如下配置：
cat <<EOF > /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
sysctl -p  #重新加载
modprobe br_netfilter  # 加载网桥过滤模块
lsmod | grep br_netfilter  # 查看网桥过滤模块是否加载成功
# 1.安装ipset和ipvsadm
yum install ipset ipvsadmin -y
# 2.添加需要加载的模块写入脚本文件
cat <<EOF> /etc/sysconfig/modules/ipvs.modules
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
# 3.为脚本添加执行权限
chmod +x /etc/sysconfig/modules/ipvs.modules
# 4.执行脚本文件
/bin/bash /etc/sysconfig/modules/ipvs.modules
# 5.查看对应的模块是否加载成功
lsmod | grep -e ip_vs -e nf_conntrack_ipv4


```

#### 2）Docker的安装

两台机器都要安装docker！

```bash
#安装必要的软件包
sudo yum install -y yum-utils  device-mapper-persistent-data  lvm2
#设置下载镜像的仓库
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
#列出docker包列表
yum list docker-ce --showduplicates | sort -r
#安装指定版本  
sudo yum install docker-ce-18.06.1.ce -y
#查看版本
docker -v
sudo systemctl enable docker #设置开机启动  
systemctl is-enabled docker  #查看是否设置为开机自启
sudo systemctl start docker #启动
#加入docker从国内拉取镜像
cat <<EOF>/etc/docker/daemon.json
{ 
  "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"]
}
EOF
#重启docker
sudo systemctl restart docker  
systemctl status docker  #查看docker状态

```

#### 3）开始安装K8S

安装k8s组件，以下K8S全节点执行！

```bash
#清空yum缓存
yum clean all  
# 新增kubeadm yum 源
cat << EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes Repo
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

#使用yum下载安装包，进行本地安装，以免安装失败重新安装麻烦
yum -y install kubelet-1.18.20 kubectl-1.18.20 kubeadm-1.18.20 --downloadonly --downloaddir=./  #下载到当前目录，下载的版本是1.18.8

#安装
yum localinstall -y ./*.rpm
#kubelet设置开机启动（注意：先不启动，现在启动的话会报错）
systemctl enable kubelet

#查看版本
kubelet --version
#查看需要的镜像 
kubeadm config images list
#![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16383719466961638371946651.png)

#可配置设置拉取k8s的源 
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 在安装kubernetes集群之前，必须要提前准备好集群需要的镜像，所需镜像可以通过下面命令查看
kubeadm config images list

# 下载镜像
# 此镜像kubernetes的仓库中，由于网络原因，无法连接，下面提供了一种替换方案
images=(
  kube-apiserver:v1.18.20
  kube-controller-manager:v1.18.20
  kube-scheduler:v1.18.20
  kube-proxy:v1.18.20
  pause:3.2
  etcd:3.4.3-0
  coredns:1.6.7
)

for imageName in ${images[@]};do
  docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
  docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
  docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName 
done
#查看下载好的镜像
docker images


```

#### 4）master节点的初始化

k8s中的k8s-master节点初始化操作！

```bash

#开始初始化
kubeadm init --kubernetes-version=1.18.20 \
--apiserver-advertise-address=192.168.87.101 \
--service-cidr=10.1.0.0/16 \
--pod-network-cidr=10.222.0.0/16
#初始化 ，本质就是安装需要的组件的过程（可能要修改两处，版本与192.168.87.101）,特别感谢:https://blog.csdn.net/weixin_41831919/article/details/119790356
#初始化失败？ 运行：
# kubeadm reset 
# rm -rf $HOME/.kube/config  & rm -rf $HOME/.kube; 
# rm -rf /etc/cni/net.d   & ipvsadm --clear  
#再执行初始化命令 
```

初始化成功后，会输出以下内容：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16383721743291638372174304.png)

第一块（红色）的作用是给k8s-master执行，执行完后就可以在k8s-master上操作k8s集群了。

第二块是给k8s-node01进行注册成为集群的node节点的，需要保存这个！！

忘记加入集群链接？ ( 执行以下重新获取 )>>&#x20;

openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.\* //'

[想要卸载，还原成普通的主机？>>](https://www.cnblogs.com/zjazn/p/15971466.html "想要卸载，还原成普通的主机？>>")

kubectl join 192.168.87.101:6443 --token 386k91.uao9n9hvhd52wqoz --discovery-token-ca-cert-hash sha256:c8d5cd5e82311f4e3d76473d6a03487fc26cea84a3a22c19737b12090e502f06&#x20;

#### 5）给集群安装通信组件

```bash
mkdir Calico
cd Calico
wget wget https://d
ocs.projectcalico.org/manifests/calico.yaml  --no-check-certificate
#搜索# no effect. This should fall within `--cluster-cidr`.  解注释下面的两行
            # no effect. This should fall within `--cluster-cidr`.
            - name: CALICO_IPV4POOL_CIDR
              value: "192.168.0.0/16"

#然后：
sed -i 's/192.168.0.0/10.222.0.0/g' calico.yaml
kubectl apply -f calico.yaml
#查看是否运行正常
kubectl get pod -n kube-system  | grep calico

```

#### 6）查看节点的状态

```bash
[root@k8s-master ~]# kubectl get nodes
NAME         STATUS   ROLES    AGE   VERSION
k8s-master   Ready    master   34h   v1.18.20
k8s-node01   Ready    <none>   34h   v1.18.20

```

Ready   说明节点正常，NoReady  要等了。

实在不行，你可以尝试重装calico\~

kubectl delete -f calico.yaml

kubectl create -f calico.yaml

### 5.1安装Jenkins

```bash
#在master节点上安装nfs服务器，开放
yum install -y nfs-utils #也需要安装这个！！！！
#准备公开一个目录，供jenkins存储
mkdir -p /opt/nfs/jenkins
#*代表对所有IP都开放此目录，rw是读写
cat <<EOF >> /etc/exports
/opt/nfs/jenkins *(rw,no_root_squash)
EOF
#设置nfs开机自启动与现在启动
systemctl enable nfs
systemctl start nfs
#去node节点上，查看是否共享成功
showmount -e 192.168.87.101


```

下载需要的资料(拿到DevOps目录下的文件)：[https://github.com/18476305640/fileBox.git](https://github.com/18476305640/fileBox.git "https://github.com/18476305640/fileBox.git")

`nfs-client`

先安装资料中的nfs-client，注意需要修改“deployment.yaml”文件中的nfs服务器地址，然后就安装nfs-client

kubectl create -f ./

`创建kube-ops名称空间`

kubectl create ns kube-ops #需要创建一个名称空间

`正式安装jenkins-master`

在安装jenkins-master中需要，然后就去资料中的"jenkins-master"中进行安装

kubectl create -f ./

kubectl get pod,svc -n kube-ops #查看分配的jenkins端口

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304110307461.png)

\#然后利用<http://192.168.87.101:32053/> 打开即可。

`获取token进行登录`

但登录要token，那么我们就去nfs中拿，注意不是页面提示的那个路线去，因为我们将jenkins部署在容器中，所以要到我们公开的nfs> jenkins中获取：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304110531229.png)

先不要安装插件，我们先进入，再自己安装用到的插件！

`安装插件`

[在安装插件前，我们需要切换为国内镜像>>](https://www.cnblogs.com/zjazn/p/15972044.html "在安装插件前，我们需要切换为国内镜像>>")

然后安装插件：

[Localization: Chinese](https://plugins.jenkins.io/localization-zh-cn "Localization: Chinese")

Git

Pipeline

Extended Choice Parameter

Kubernetes

`将jenkins与k8s整合`

需要插件：Kubernetes

进入Jenkins的 [http://..../configureClouds/](http://192.168.87.101:32053/configureClouds/ "http://..../configureClouds/")

新建云：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304131836140.png)

要填写的信息如下：

kubernetes

[https://kubernetes.default.svc.cluster.local](https://kubernetes.default.svc.cluster.local "https://kubernetes.default.svc.cluster.local")

kube-ops

[http://jenkins.kube-ops.svc.cluster.local:8080](http://jenkins.kube-ops.svc.cluster.local:8080 "http://jenkins.kube-ops.svc.cluster.local:8080")

`安装jenkins-slave`

再公开一个目录maven:

```bash
#公开一个目录给jenkin-slave 用于存储maven包，追加的方式！
cat <<EOF >> /etc/exports
/opt/nfs/maven *(rw,no_root_squash)
EOF
#重启
systemctl restart nfs
#解决权限问题！！！这很重要！！！！
chmod -R 777 /opt/nfs/maven
chmod 777 /var/run/docker.sock

```

`安装jenkins-slave`

从资料中拿到这三个文件（[https://github.com/18476305640/fileBox/tree/main](https://github.com/18476305640/fileBox/tree/main "https://github.com/18476305640/fileBox/tree/main")  > DevOps > ）：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304142538695.png)

需要修改Dockerfile中的“harbor”维护者的名字（zhuangjie）。

在推送前，我们需要整合Harbor：

在K8S的第个节点都执行，将私服的Harbor加入信任镜像中！

vi /etc/docker/daemon.json #你可能要修改下面私服Harbor的信息

```json
{ 
 "registry-mirrors": ["https://zydiol88.mirror.aliyuncs.com"],
 "insecure-registries": ["192.168.87.102:85"]
}
```

systemctl restart docker &#x20;
systemctl status docker  #查看docker状态

这样就将我们的私服加入了信任仓库中，我们就可以把镜像推送到Harbor上了

开始制作镜像：

```bash
docker build -t jenkins-slave-maven:latest . #制作镜像
docker tag jenkins-slave-maven:latest 192.168.87.102:85/library/jenkins-slave-maven:latest #打标
docker login -u admin -p gkmzjaznH21 192.168.87.102:85 #先登录，使用admin账号才能推送到library上，这里我密码改了，如何没改admin密码是Harbor12345
docker push 192.168.87.102:85/library/jenkins-slave-maven:latest #开始推送
```

### 6.1整合工作

`获取k8s凭证(整合K8S)`

然后安装Kubernetes Continuous Deploy插件。

创建K8S凭证：

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304133757790.png)

博主的：119251a2-c90b-456b-914b-04bf084ecb8a

**创建secret**

能不能拉取镜像 部署看这个了，如果Harbor改变了,这里删掉重新创建，名字不改，其它的都是不用改的。

```bash
docker login -u zhuangjie -p gkmzjaznH21 192.168.87.102:85
kubectl create secret docker-registry registry-auth-secret --docker-server=192.168.87.102:85 --docker-username=zhuangjie --docker-password=gkmzjaznH21# [--docker-email=2119299531@qq.com](mailto:--docker-email=2119299531@qq.com)
kubectl get secret #存在即可“ registry-auth-secret”
#删除：kubectl delete secret registry-auth-secret
```

\*\*\*\*`(整合gitlab)`

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/04/20220304144622119.png)

在Jenkins中添加普通账号-密码凭证：

zhuangjie gkmzjazn

博主的凭证：ea7e5a47-3e95-4575-82ff-5a97ac2f956f

***

在Jenkins中添加普通账号-密码凭证：

**（zhuangjie/ gkmzjaznH21）：**

博主的凭证：b9b2f427-94d6-4001-b004-33f8489cf0dc

### 7.1 流水线

**流水线：**

构建时需要两个，项目project\_name（多选），与分支branch（字符）

请选择需要构建的项目

6

,

cart-service\@53024,product-service\@53022,store-service\@53023,user-service\@53021,uaa-service\@53020,gateway-service\@53010

branch

master

请输入分支名称

```yaml
“”def git_address = "http://192.168.87.100:82/zhuangjie/smallarea.git"
def git_auth = "ea7e5a47-3e95-4575-82ff-5a97ac2f956f"
//构建版本的名称
def tag = "latest"
//Harbor私服地址
def harbor_url = "192.168.87.102:85"
//Harbor的项目名称
def harbor_project_name = "smallarea"
//Harbor的凭证
def harbor_auth = "b9b2f427-94d6-4001-b004-33f8489cf0dc"
def secret_name = "registry-auth-secret"
//k8s凭证
def k8s_auth = "119251a2-c90b-456b-914b-04bf084ecb8a";
//自定义内容
def find_block = [
    "gateway-service":"distributed-smallarea-security",
    "uaa-service":"distributed-smallarea-security",
    "cart-service":"distributed-smallarea-service",
    "product-service":"distributed-smallarea-service",
    "store-service":"distributed-smallarea-service",
    "user-service":"distributed-smallarea-service"
]
//自定义内容：common's install ，下面要install的以“,”隔开！  
def commons_block = "./".split(',')

podTemplate(label: 'jenkins-slave', cloud: 'kubernetes', containers: [
    containerTemplate(
        name: 'jnlp', 
        image: "192.168.87.102:85/library/jenkins-slave-maven:latest"
    ),
    containerTemplate(
        name: 'docker', 
        image: "docker:stable",
        ttyEnabled: true,
        command: 'cat'
    ),
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
    nfsVolume(mountPath: '/usr/local/apache-maven/repo', serverAddress: '192.168.87.101' , serverPath: '/opt/nfs/maven'),
  ],
) 
{
  node("jenkins-slave"){
      // 第一步
      stage('拉取代码'){
         checkout([$class: 'GitSCM', branches: [[name: '${branch}']], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_address}"]]])
      }
      // 第二步
      stage('代码编译'){
         //编译并安装公共工程
         //自定义内容！！！
         for (int i=0; i<commons_block.length; i++) {
            def install_path = commons_block[i]
            sh "mvn -f ${install_path} clean install"
         }
      }
      // 第三步
      stage('构建镜像，部署项目'){
          //把选择的项目信息转为数组
      def selectedProjects = "${project_name}".split(',')
      
            for(int i=0;i<selectedProjects.size();i++){
                //取出每个项目的名称和端口
                def currentProject = selectedProjects[i];
                //项目名称
                def currentProjectName = currentProject.split('@')[0]
                //项目启动端口
                def currentProjectPort = currentProject.split('@')[1]

                 //定义镜像名称
                 def imageName = "${currentProjectName}:${tag}"
                 //自定义内容
                 //因为maven中的项目名与代码的项目名不同，如果不修改，找的是代码的项目名来打标签的，但实际是pom中定义的名称
                 def _currentProjectName = currentProjectName.split('-')[0]
                 def _imageName = "${_currentProjectName}:${tag}"
         //编译，构建本地镜像
         def parents = find_block[currentProjectName]
         sh "mvn -f ${parents}/${currentProjectName}  clean package dockerfile:build"
         container('docker') {
           
           //给镜像打标签
           //!!!!!!!!!! 已修改 将“imageName” 替换为 “_imageName”
           sh "docker tag ${_imageName} ${harbor_url}/${harbor_project_name}/${imageName}"

           //登录Harbor，并上传镜像
           withCredentials([usernamePassword(credentialsId: "${harbor_auth}", passwordVariable: 'password', usernameVariable: 'username')]) {
              //登录
              sh "docker login -u ${username} -p ${password} ${harbor_url}"
              //上传镜像
              sh "docker push ${harbor_url}/${harbor_project_name}/${imageName}"
           }

           //删除本地镜像
           //!!!!!!!!!! 已修改 将“imageName” 替换为 “_imageName”
           sh "docker rmi -f ${_imageName}"
           sh "docker rmi -f ${harbor_url}/${harbor_project_name}/${imageName}"
         }
         
         def deploy_image_name = "${harbor_url}/${harbor_project_name}/${imageName}"
         
         //部署到K8S
         //!!!!!!!!!! 已修改 加入了->parents
           sh """
                        sed -i 's#\$IMAGE_NAME#${deploy_image_name}#' ${parents}/${currentProjectName}/deploy.yml
            sed -i 's#\$SECRET_NAME#${secret_name}#' ${parents}/${currentProjectName}/deploy.yml
                 """
                      
                 kubernetesDeploy configs: "${parents}/${currentProjectName}/deploy.yml", kubeconfigId: "${k8s_auth}"
         } 
      }
  }
}
```

`解决遇到的问题`

1.  请确保内容充足，否则jenkins-slave在帮jenkins做编译时，会因内存不足下线！！

2.  当遇到：INFO: Retrying request to {}->unix://localhost:80

    在K8S各集群节点中执行：**chmod 777 /var/run/docker.sock**

3.  如果你的项目名与代码的项目名相同，你需要修改上面的脚本，注释\_imageName变量，且将脚本 中的"\_ imageName" 改为“imageName”
