# K8S-記

## 目录

*   [記——](#記)

    *   *   [1.1 Kubernetes 说明](#11-kubernetes-说明)

        *   [1.2 部署的演变](#12-部署的演变)

        *   [1.3 要记住的命令](#13-要记住的命令)

        *   [1.4 配置](#14-配置)

# 記——

### 1.1 Kubernetes 说明

Borg系统的一个开源版本，kubernetes的本质是**一组服务器集群**，它可以在集群的每个节点上运行特定的程序，来对节点中的容器进行管理。目的是实现资源管理的自动化，主要提供

*   **自我修复**：一旦某一个容器崩溃，能够在1秒中左右迅速启动新的容器

*   **弹性伸缩**：可以根据需要，自动对集群中正在运行的容器数量进行调整

*   **服务发现**：服务可以通过自动发现的形式找到它所依赖的服务

*   **负载均衡**：如果一个服务起动了多个容器，能够自动实现请求的负载均衡

*   **版本回退**：如果发现新发布的程序版本有问题，可以立即回退到原来的版本

*   **存储编排**：可以根据容器自身的需求自动创建存储卷

### 1.2 部署的演变

传统部署——虚拟化部署——容器化部署

### 1.3 要记住的命令

```bash
#查看pod日记输出
kubectl logs  gateway-0  -c gateway  #加 -f 持续输出
#进入容器
kubectl exec -it gateway-0  -n default  /bin/sh
 
kubectl run nginx --image=nginx:1.17.1 --replicas 5 -n dev #创建容器
kubectl create deploy nginx --image=nginx:1.17.1  -n dev #创建一个无状态的控制器
kubectl scale deployment nginx --replicas 10 -n dev
#暴露服务
kubectl expose deploy nginx --port=80 --target-port=80 --type=NodePort -n dev
#查看之前版本，可回退版本
kubectl rollout status deploy pc-deployment -n dev
#回退到指定版本  
kubectl rollout undo deployment pc-deployment --to-revision=1 -n dev

#金丝雀发布
#升级到指定版本，然后立即暂停
kubectl set image deploy pc-deployment nginx=nginx:1.17.4 -n dev && kubectl rollout pause deployment pc-deployment  -n dev
#观察~
#继续更新
kubectl rollout resume deploy pc-deployment -n dev
 
```

### 1.4 配置

Pod常用模板：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-imagepullpolicy
  namespace: dev
spec:
  nodeName: node1 # 指定调度到node1节点上，还有亲和性，这里不就不写出了
  initContainers: #初始化容器
  - name: test-mysql
    image: busybox:1.30
    command: ['sh', '-c', 'until ping 192.168.90.14 -c 1 ; do echo waiting for mysql...; sleep 2; done;']
  - name: test-redis
    image: busybox:1.30
    command: ['sh', '-c', 'until ping 192.168.90.15 -c 1 ; do echo waiting for reids...; sleep 2; done;'] 
  containers:
  - name: nginx
    image: nginx:1.17.1
    imagePullPolicy: Never # 用于设置镜像拉取策略
    ports: # 设置容器暴露的端口列表
    - name: nginx-port
      containerPort: 80
      protocol: TCP
    resources: # 资源配额
      limits:  # 限制资源（上限）
        cpu: "2" # CPU限制，单位是core数
        memory: "10Gi" # 内存限制,可以使用Gi、Mi、G、M等形式
      requests: # 请求资源（下限）
        cpu: "1"  # CPU限制，单位是core数
        memory: "10Mi"  # 内存限制
  - name: busybox
    image: busybox:1.30
    command: ["/bin/sh","-c","touch /tmp/hello.txt;while true;do /bin/echo $(date +%T) >> /tmp/hello.txt; sleep 3; done;"]
    env: # 设置环境变量列表
    - name: "username"
      value: "admin"
    - name: "password"
      value: "123456"
```

控制器常用模板：

```yaml
apiVersion: apps/v1
kind: Deployment      
metadata:
  name: pc-deployment
  namespace: dev
spec: 
  replicas: 3
  strategy: # 更新策略：重建更新、滚动更新（先更新一部分）
    type: RollingUpdate # 滚动更新策略
    rollingUpdate:
      maxSurge: 25% 
      maxUnavailable: 25%
  selector:
    matchLabels:
      app: nginx-pod
  template:
    metadata:
      labels:
        app: nginx-pod
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.1
```

HPA控制器

> HPA插件需要安装，**创建指定的deploy的HPA**, 下面的deploy为nginx，当cpu使用率超过3%时，就会创建pod副本，副本最多是10个，最少1个

```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: pc-hpa
  namespace: dev
spec:
  minReplicas: 1  #最小pod数量
  maxReplicas: 10 #最大pod数量
  targetCPUUtilizationPercentage: 3 # CPU使用率指标
  scaleTargetRef:   # 指定要控制的nginx信息
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
```

kubectl create -f hpa-nginx.yaml &#x20;

测试：我们可以使用测压工具，如 `JMeter` 进行测试。

查看hpa上显示的资源占用：

kubectl get hpa -n dev -w

Service的yaml配置：&#x20;

```yaml
kind: Service  # 资源类型
apiVersion: v1  # 资源版本
metadata: # 元数据
  name: service # 资源名称
  namespace: dev # 命名空间
spec: # 描述
  selector: # 标签选择器，用于确定当前service代理哪些pod
    app: nginx
  type: # Service类型，指定service的访问方式
  clusterIP:  # 虚拟服务的ip地址
  sessionAffinity: # session亲和性，支持ClientIP、None两个选项
  ports: # 端口信息
    - protocol: TCP 
      port: 3017  # service端口
      targetPort: 5003 # pod端口
      nodePort: 31122 # 主机端口
```
