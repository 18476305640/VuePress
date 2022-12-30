# Redis数据库缓存

## 目录

### -介绍

### \[\_1\_] Redis安装

基本环境准备

```bash
#安装基本环境
yum install gcc & gcc -v
yum -y install gcc-c++ & g++ -v

```

安装Redis (安装后密码是3333)

```bash
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
tar -zvxf redis-5.0.7.tar.gz
#编译与安装
cd redis-5.0.7
make
cd src
make install PREFIX=/usr/local/redis
#移动配置文件到安装目录下
cd ../
mkdir /usr/local/redis/etc
mv redis.conf /usr/local/redis/etc
#配置redis为后台启动
#将daemonize no 改成daemonize yes
sed -i '/daemonize/s/daemonize no/daemonize yes/g' /usr/local/redis/etc/redis.conf
#将redis加入到开机启动
cat << EOF >>/etc/rc.local
#开机启动redis
/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
EOF
redis-server /usr/local/redis/etc/redis.conf 
#将redis-cli,redis-server拷贝到bin下，让redis-cli指令可以在任意目录下直接使用
cp /usr/local/redis/bin/redis-server /usr/local/bin/
cp /usr/local/redis/bin/redis-cli /usr/local/bin/
#设置密码
redis-cli
config get requirepass
config set requirepass 3333
exit
#登录测试
redis-cli
auth 3333
#其它操作


```

### + 基本命令

```bash
redis-cli  #进入
auth 密码  #认证
select 1 #进入1数据库
set <key> <value> #设置值
get <key>  #获取值
expire <key> 过期时间单元为秒  #设置过期时间
ttl <key> #查看过期时间
keys * #查看所以
move <key>  <db> #将指定的记录的移动到指定库
exists <key> #查看是否存在指定的key记录
type <key> #查看指定key记录的类型


```

#### 键（Key）命令

我们知道 Redis 是 key-value 型数据库，使用 key 对 value 进行存储，因此，键（Key）命令是 Redis 中经常使用的一类命令。常用的键命令如下所示： &#x20;

| 命令                                                                    | 说明                                                   |
| --------------------------------------------------------------------- | ---------------------------------------------------- |
| [DEL](http://c.biancheng.net/redis2/del.html "DEL")                   | 若键存在的情况下，该命令用于删除键                                    |
| [DUMP](http://c.biancheng.net/redis2/dump.html "DUMP")                | 用于序列化给定 key ，并返回被序列化的值                               |
| [EXISTS](http://c.biancheng.net/redis2/exists.html "EXISTS")          | 用于检查键是否存在，若存在则返回 1，否则返回 0                            |
| [EXPIRE](http://c.biancheng.net/redis2/expire.html "EXPIRE")          | 设置 key 的过期时间，以秒为单位                                   |
| [EXPIREAT](http://c.biancheng.net/redis2/expireat.html "EXPIREAT")    | 该命令与 EXPIRE 相似，用于为 key 设置过期时间，不同在于，它的时间参数值采用的是时间戳格式。 |
| [KEYS](http://c.biancheng.net/redis2/keys.html "KEYS")                | 此命令用于查找与指定 pattern 匹配的 key                           |
| [MOVE](http://c.biancheng.net/redis2/move.html "MOVE")                | 将当前数据库中的 key 移动至指定的数据库中（默认存储为 0 库，可选 1-15中的任意库）      |
| [PERSIST](http://c.biancheng.net/redis2/persist.html "PERSIST")       | 该命令用于删除 key 的过期时间，然后 key 将一直存在，不会过期                  |
| [PEXPIRE](http://c.biancheng.net/redis2/pexpire.html "PEXPIRE")       | 设置 key 的过期，以毫秒为单位                                    |
| [RANDOMKEY](http://c.biancheng.net/redis2/randomkey.html "RANDOMKEY") | 从当前数据库中随机返回一个 key                                    |
| [RENAME](http://c.biancheng.net/redis2/rename.html "RENAME")          | 修改 key 的名称                                           |
| [SCAN](http://c.biancheng.net/redis2/scan.html "SCAN")                | 基于游标的迭代器，用于迭代数据库中存在的所有键，cursor 指的是迭代游标               |
| [TTL](http://c.biancheng.net/redis2/ttl.html "TTL")                   | 用于检查 key 还剩多长时间过期，以秒为单位                              |
| [TYPE](http://c.biancheng.net/redis2/type.html "TYPE")                | 该命令用于获取 value 的数据类型。                                 |

#### Hash 命令

Hash（哈希散列）是 Redis 基本数据类型之一，它以字符串映射表的形式来进行存储。Hash 特别适合用于存储对象。常用的命令如下所示： &#x20;

| 命令                                                              | 说明                        |
| --------------------------------------------------------------- | ------------------------- |
| [HDEL](http://c.biancheng.net/redis2/hdel.html "HDEL")          | 用于删除一个或多个哈希表字段            |
| [HEXISTS](http://c.biancheng.net/redis2/hexists.html "HEXISTS") | 用于确定哈希字段是否存在              |
| [HGET](http://c.biancheng.net/redis2/hget.html "HGET")          | 获取存储在 key 中的哈希字段的值        |
| [HGETALL](http://c.biancheng.net/redis2/hgetall.html "HGETALL") | 获取存储在 key 中的所有哈希字段值       |
| [HINCRBY](http://c.biancheng.net/redis2/hincrby.html "HINCRBY") | 为存储在 key 中的哈希表指定字段做整数增量运算 |
| [HKEYS](http://c.biancheng.net/redis2/hkeys.html "HKEYS")       | 获取存储在 key 中的哈希表的所有字段      |
| [HLEN](http://c.biancheng.net/redis2/hlen.html "HLEN")          | 获取存储在 key 中的哈希表的字段数量      |
| [HSET](http://c.biancheng.net/redis2/hset.html "HSET")          | 用于设置存储在 key 中的哈希表字段的值     |
| [HVALS](http://c.biancheng.net/redis2/hvals.html "HVALS")       | 用于获取哈希表中的所有值              |

#### String 命令

Strings（字符串）结构是 Redis 的基本数据类型之一，我们可以通过相关字符串命令对其进行操作，比如设置、检索、删除等等。字符串类型有诸多的应用场景，比如微博粉丝的关注与取消等。 &#x20;

下面介绍了 Redis 中常营的字符串命令： &#x20;

| 命令                                                                          | 说明                                                |
| --------------------------------------------------------------------------- | ------------------------------------------------- |
| [APPEND](http://c.biancheng.net/redis2/append.html "APPEND")                | 该命令将 value 追加到 key 所存储值的末尾                        |
| [BITCOUNT](http://c.biancheng.net/redis2/bitcount.html "BITCOUNT")          | 该命令用于计算字符串中，被设置为 1 的比特位的数量。                       |
| [DECR](http://c.biancheng.net/redis2/decr.html "DECR")                      | 将 key 所存储的整数值减 1                                  |
| [DECRBY](http://c.biancheng.net/redis2/decrby.html "DECRBY")                | 将 key 所储存的值减去给定的递减值（decrement）                    |
| [GET](http://c.biancheng.net/redis2/get.html "GET")                         | 用于检索指定键的值                                         |
| [GETBIT](http://c.biancheng.net/redis2/getbit.html "GETBIT")                | 对 key 所存储的字符串值，获取其指定偏移量上的位（bit）                   |
| [GETRANGE](http://c.biancheng.net/redis2/getrange.html "GETRANGE")          | 返回 key 中字符串值的子字符                                  |
| [GETSET](http://c.biancheng.net/redis2/getset.html "GETSET")                | 将给定 key 的值设置为 value，并返回 key 的旧值                   |
| [INCR](http://c.biancheng.net/redis2/incr.html "INCR")                      | 将 key 所存储的整数值加 1                                  |
| [INCRBY](http://c.biancheng.net/redis2/incrby.html "INCRBY")                | 将 key 所储存的值加上给定的递增值（increment）                    |
| [INCRBYFLOAT](http://c.biancheng.net/redis2/incrbyfloat.html "INCRBYFLOAT") | 将 key 所储存的值加上指定的浮点递增值（increment）                  |
| [MGET](http://c.biancheng.net/redis2/mget.html "MGET")                      | 一次性获取一个或多个 key 所存储的值                              |
| [MSET](http://c.biancheng.net/redis2/mset.html "MSET")                      | 该命令允许同时设置多个键值对                                    |
| [MSETNX](http://c.biancheng.net/redis2/msetnx.html "MSETNX")                | 当指定的 key 都不存在时，用于设置多个键值对                          |
| [SET](http://c.biancheng.net/redis2/set.html "SET")                         | 用于设定指定键的值                                         |
| [SETBIT](http://c.biancheng.net/redis2/setbit.html "SETBIT")                | 对 key 所储存的字符串值，设置或清除指定偏移量上的位(bit)                 |
| [SETEX](http://c.biancheng.net/redis2/setex.html "SETEX")                   | 将值 value 存储到 key中 ，并将 key 的过期时间设为 seconds (以秒为单位) |
| [STRLEN](http://c.biancheng.net/redis2/strlen.html "STRLEN")                | 返回 key 所储存的字符串值的长度                                |
| [SETNX](http://c.biancheng.net/redis2/setnx.html "SETNX")                   | 当 key 不存在时设置 key 的值                               |
| [SETRANGE](http://c.biancheng.net/redis2/setrange.html "SETRANGE")          | 从偏移量 offset 开始，使用指定的 value 覆盖的 key 所存储的部分字符串值     |

#### List 命令

List 是 Redis 中最常用数据类型之一。Redis 提供了诸多用于操作列表类型的命令，通过这些命令你可以实现将一个元素添加到列表的头部，或者尾部等诸多操作。 &#x20;

List 常用的命令如下所示： &#x20;

| 命令                                                                       | 说明                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [BLPOP](http://c.biancheng.net/redis2/blpop.html "BLPOP")                | 用于删除并返回列表中的第一个元素（头部操作），如果列表中没有元素，就会发生阻塞，直到列表等待超时或发现可弹出元素为止   |
| [BRPOP](http://c.biancheng.net/redis2/brpop.html "BRPOP")                | 用于删除并返回列表中的最后一个元素（尾部操作），如果列表中没有元素，就会发生阻塞，直到列表等待超时或发现可弹出元素为止  |
| [BRPOPLPUSH](http://c.biancheng.net/redis2/brpoplpush.html "BRPOPLPUSH") | 从列表中取出最后一个元素，并插入到另一个列表的头部。如果列表中没有元素，就会发生阻塞，直到等待超时或发现可弹出元素时为止 |
| [LINDEX](http://c.biancheng.net/redis2/lindex_command.html "LINDEX")     | 通过索引获取列表中的元素                                                 |
| [LINSERT](http://c.biancheng.net/redis2/linsert.html "LINSERT")          | 指定列表中一个元素在它之前或之后插入另外一个元素                                     |
| [LLEN](http://c.biancheng.net/redis2/llen.html "LLEN")                   | 用于获取列表的长度                                                    |
| [LPOP](http://c.biancheng.net/redis2/lpop.html "LPOP")                   | 从列表的头部弹出元素，默认为第一个元素                                          |
| [LPUSH](http://c.biancheng.net/redis2/lpush.html "LPUSH")                | 在列表头部插入一个或者多个值                                               |
| [LPUSHX](http://c.biancheng.net/redis2/lpushx.html "LPUSHX")             | 当储存列表的 key 存在时，用于将值插入到列表头部                                   |
| [LRANGE](http://c.biancheng.net/redis2/lrange.html "LRANGE")             | 获取列表指定范围内的元素                                                 |
| [LREM](http://c.biancheng.net/redis2/lrem.html "LREM")                   | 表示从列表中删除元素与 value 相等的元素。count 表示删除的数量，为 0 表示全部移除             |
| [LSET](http://c.biancheng.net/redis2/lset.html "LSET")                   | 表示通过其索引设置列表中元素的值                                             |
| [LTRIM](http://c.biancheng.net/redis2/ltrim.html "LTRIM")                | 保留列表中指定范围内的元素值                                               |

#### Set 命令

Redis set 数据类型由键值对组成，这些键值对具有无序、唯一的性质，这与 Python 的 set 相似。当集合中最后一个元素被移除之后，该数据结构也会被自动删除，内存也同样会被收回。 &#x20;

由于 set 集合可以实现去重，因此它有很多适用场景，比如用户抽奖活动，使用 set 集合可以保证同一用户不被第二次选中。 &#x20;

Redis set 常用的命令如下所示：

| 命令                                                                           | 说明                               |
| ---------------------------------------------------------------------------- | -------------------------------- |
| [SADD](http://c.biancheng.net/redis2/sadd.html "SADD")                       | 向集合中添加一个或者多个元素，并且自动去重            |
| [SCARD](http://c.biancheng.net/redis2/scard.html "SCARD")                    | 返回集合中元素的个数                       |
| [SDIFF](http://c.biancheng.net/redis2/sdiff.html "SDIFF")                    | 求两个或对多个集合的差集                     |
| [SDIFFSTORE](http://c.biancheng.net/redis2/sdiffstore.html "SDIFFSTORE")     | 求两个集合或多个集合的差集，并将结果保存到指定的集合(key)中 |
| [SINTER](http://c.biancheng.net/redis2/sinter.html "SINTER")                 | 求两个或多个集合的交集                      |
| [SINTERSTORE](http://c.biancheng.net/redis2/sinterstore.html "SINTERSTORE")  | 求两个或多个集合的交集，并将结果保存到指定的集合(key)中   |
| [SMEMBERS](http://c.biancheng.net/redis2/smembers.html "SMEMBERS")           | 查看集合中所有元素                        |
| [SMOVE](http://c.biancheng.net/redis2/smove.html "SMOVE")                    | 将集合中的元素移动到指定的集合中                 |
| [SPOP](http://c.biancheng.net/redis2/spop.html "SPOP")                       | 弹出指定数量的元素                        |
| [SRANDMEMBER](http://c.biancheng.net/redis2/srandmember.html "SRANDMEMBER")  | 随机从集合中返回指定数量的元素，默认返回 1个          |
| [SREM](http://c.biancheng.net/redis2/srem.html "SREM")                       | 删除一个或者多个元素，若元素不存在则自动忽略           |
| [SUNION](http://c.biancheng.net/redis2/sunion.html "SUNION")                 | 求两个或者多个集合的并集                     |
| [SUNIONSTORE](http://c.biancheng.net/redis2/sunsionstore.html "SUNIONSTORE") | 求两个或者多个集合的并集，并将结果保存到指定的集合(key)中  |

#### Zset 命令

zset 是 Redis 提供的最具特色的数据类型之一，首先它是一个 set，这保证了内部 value 值的唯一性，其次它给每个 value 添加了一个 score（分值）属性，通过对分值的排序实现了有序化。比如用 zset 结构来存储学生的成绩，value 值代表学生的 ID，score 则是的考试成绩。我们可以对成绩按分数进行排序从而得到学生的的名次。 &#x20;

下面列出了 zset 的常用命令，如下所示：

| 命令                                                                                         | 说明                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------- |
| [ZADD](http://c.biancheng.net/redis2/zadd.html "ZADD")                                     | 用于将一个或多个成员添加到有序集合中，或者更新已存在成员的 score 值 |
| [ZCARD](http://c.biancheng.net/redis2/zcard.html "ZCARD")                                  | 获取有序集合中成员的数量                          |
| [ZCOUNT](http://c.biancheng.net/redis2/zcount.html "ZCOUNT")                               | 用于统计有序集合中指定 score 值范围内的元素个数           |
| [ZINCRBY](http://c.biancheng.net/redis2/zincrby.html "ZINCRBY")                            | 用于增加有序集合中成员的分值                        |
| [ZINTERSTORE](http://c.biancheng.net/redis2/zinterstore.html "ZINTERSTORE")                | 求两个或者多个有序集合的交集，并将所得结果存储在新的 key 中      |
| [ZRANGE](http://c.biancheng.net/redis2/zrange.html "ZRANGE")                               | 返回有序集合中指定索引区间内的成员数量                   |
| [ZRANGEBYLEX](http://c.biancheng.net/redis2/zrangebylex.html "ZRANGEBYLEX")                | 返回有序集中指定字典区间内的成员数量                    |
| [ZRANGEBYSCORE](http://c.biancheng.net/redis2/zrangebyscore.html "ZRANGEBYSCORE")          | 返回有序集合中指定分数区间内的成员                     |
| [ZRANK](http://c.biancheng.net/redis2/zrank.html "ZRANK")                                  | 返回有序集合中指定成员的排名                        |
| [ZREM](http://c.biancheng.net/redis2/zrem.html "ZREM")                                     | 移除有序集合中的一个或多个成员                       |
| [ZREMRANGEBYRANK](http://c.biancheng.net/redis2/zremrangebyrank.html "ZREMRANGEBYRANK")    | 移除有序集合中指定排名区间内的所有成员                   |
| [ZREMRANGEBYSCORE](http://c.biancheng.net/redis2/zremrangebyscore.html "ZREMRANGEBYSCORE") | 移除有序集合中指定分数区间内的所有成员                   |
| [ZREVRANGE](http://c.biancheng.net/redis2/zrevrange.html "ZREVRANGE")                      | 返回有序集中指定区间内的成员，通过索引，分数从高到低            |
| [ZREVRANK](http://c.biancheng.net/redis2/zrevrank.html "ZREVRANK")                         | 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序    |
| [ZSCORE](http://c.biancheng.net/redis2/zscore.html "ZSCORE")                               | 返回有序集中，指定成员的分数值                       |
| [ZUNIONSTORE](http://c.biancheng.net/redis2/zunionstore.html "ZUNIONSTORE")                | 求两个或多个有序集合的并集，并将返回结果存储在新的 key 中       |

### + 配置redis.conf

`安装> etc> redis.conf` 配置项说明如下：

**注意**，下面配置项说明并不全，了解更多请检阅 redis.conf。

| 序号                                          | 配置项                                                                | 说明                                                                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1                                           | `daemonize no`                                                     | Redis 默认不是以守护进程的方式运行，可以通过该配置项修改，使用 yes 启用守护进程（Windows 不支持守护线程的配置为 no ）                                                                                                       |
| 2                                           | `pidfile /var/run/redis.pid`                                       | 当 Redis 以守护进程方式运行时，Redis 默认会把 pid 写入 /var/run/redis.pid 文件，可以通过 pidfile 指定                                                                                                   |
| 3                                           | `port 6379`                                                        | 指定 Redis 监听端口，默认端口为 6379，作者在自己的一篇博文中解释了为什么选用 6379 作为默认端口，因为 6379 在手机按键上 MERZ 对应的号码，而 MERZ 取自意大利歌女 Alessia Merz 的名字                                                           |
| 4                                           | `bind 127.0.0.1`                                                   | 绑定的主机地址                                                                                                                                                                      |
| 5                                           | `timeout 300`                                                      | 当客户端闲置多长秒后关闭连接，如果指定为 0 ，表示关闭该功能                                                                                                                                              |
| 6                                           | `loglevel notice`                                                  | 指定日志记录级别，Redis 总共支持四个级别：debug、verbose、notice、warning，默认为 notice                                                                                                              |
| 7                                           | `logfile stdout`                                                   | 日志记录方式，默认为标准输出，如果配置 Redis 为守护进程方式运行，而这里又配置为日志记录方式为标准输出，则日志将会发送给 /dev/null                                                                                                    |
| 8                                           | `databases 16`                                                     | 设置数据库的数量，默认数据库为 0，可以使用 SELECT 命令在连接上指定数据库 id                                                                                                                                 |
| 9                                           | \`save <seconds> <changes>                                         |                                                                                                                                                                              |
| \`Redis 默认配置文件中提供了三个条件：                     |                                                                    |                                                                                                                                                                              |
| \`save 900 1                                |                                                                    |                                                                                                                                                                              |
| save 300 10                                 |                                                                    |                                                                                                                                                                              |
| save 60 10000\`                             | 分别表示 900 秒（15 分钟）内有 1 个更改，300 秒（5 分钟）内有 10 个更改以及 60 秒内有 10000 个更改。 |                                                                                                                                                                              |
|  指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合     |                                                                    |                                                                                                                                                                              |
| 10                                          | `rdbcompression yes`                                               | 指定存储至本地数据库时是否压缩数据，默认为 yes，Redis 采用 LZF 压缩，如果为了节省 CPU 时间，可以关闭该选项，但会导致数据库文件变的巨大                                                                                                |
| 11                                          | `dbfilename dump.rdb`                                              | 指定本地数据库文件名，默认值为 dump.rdb                                                                                                                                                     |
| 12                                          | `dir ./`                                                           | 指定本地数据库存放目录                                                                                                                                                                  |
| 13                                          | `slaveof <masterip> <masterport>`                                  | 设置当本机为 slave 服务时，设置 master 服务的 IP 地址及端口，在 Redis 启动时，它会自动从 master 进行数据同步                                                                                                      |
| 14                                          | `masterauth <master-password>`                                     | 当 master 服务设置了密码保护时，slav 服务连接 master 的密码                                                                                                                                     |
| 15                                          | `requirepass foobared`                                             | 设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 AUTH \<password> 命令提供密码，默认关闭                                                                                                      |
| 16                                          | `maxclients 128`                                                   | 设置同一时间最大客户端连接数，默认无限制，Redis 可以同时打开的客户端连接数为 Redis 进程可以打开的最大文件描述符数，如果设置 maxclients 0，表示不作限制。当客户端连接数到达限制时，Redis 会关闭新的连接并向客户端返回 max number of clients reached 错误信息                |
| 17                                          | `maxmemory <bytes>`                                                | 指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会先尝试清除已到期或即将到期的 Key，当此方法处理 后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis 新的 vm 机制，会把 Key 存放内存，Value 会存放在 swap 区               |
| 18                                          | `appendonly no`                                                    | 指定是否在每次更新操作后进行日志记录，Redis 在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为 redis 本身同步数据文件是按上面 save 条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为 no                                           |
| 19                                          | `appendfilename appendonly.aof`                                    | 指定更新日志文件名，默认为 appendonly.aof                                                                                                                                                 |
| 20                                          | `appendfsync everysec`                                             | 指定更新日志条件，共有 3 个可选值：                                                                                                                                                          |
| no：表示等操作系统进行数据缓存同步到磁盘（快）                    |                                                                    |                                                                                                                                                                              |
| always：表示每次更新操作后手动调用 fsync () 将数据写到磁盘（慢，安全） |                                                                    |                                                                                                                                                                              |
| everysec：表示每秒同步一次（折中，默认值）                   |                                                                    |                                                                                                                                                                              |
|                                             |                                                                    |                                                                                                                                                                              |
| 21                                          | `vm-enabled no`                                                    | 指定是否启用虚拟内存机制，默认值为 no，简单的介绍一下，VM 机制将数据分页存放，由 Redis 将浏览量较少的页即冷数据 swap 到磁盘上，浏览多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析 Redis 的 VM 机制）                                                       |
| 22                                          | `vm-swap-file /tmp/redis.swap`                                     | 虚拟内存文件路径，默认值为 /tmp/redis.swap，不可多个 Redis 实例共享                                                                                                                                |
| 23                                          | `vm-max-memory 0`                                                  | 将所有大于 vm-max-memory 的数据存入虚拟内存，无论 vm-max-memory 设置多小，所有索引数据都是内存存储的 (Redis 的索引数据 就是 keys)，也就是说，当 vm-max-memory 设置为 0 的时候，其实是所有 value 都存在于磁盘。默认值为 0                             |
| 24                                          | `vm-page-size 32`                                                  | Redis swap 文件分成了很多的 page，一个对象可以保存在多个 page 上面，但一个 page 上不能被多个对象共享，vm-page-size 是要根据存储的 数据大小来设定的，作者建议如果存储很多小对象，page 大小最好设置为 32 或者 64bytes；如果存储很大大对象，则可以使用更大的 page，如果不确定，就使用默认值 |
| 25                                          | `vm-pages 134217728`                                               | 设置 swap 文件中的 page 数量，由于页表（一种表示页面空闲或使用的 bitmap）是在放在内存中的，，在磁盘上每 8 个 pages 将消耗 1byte 的内存。                                                                                       |
| 26                                          | `vm-max-threads 4`                                                 | 设置连接 swap 文件的线程数，最好不要超过机器的核数，如果设置为 0, 那么所有对 swap 文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为 4                                                                                             |
| 27                                          | `glueoutputbuf yes`                                                | 设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启                                                                                                                                             |
| 28                                          | \`hash-max-zipmap-entries 64                                       |                                                                                                                                                                              |
| hash-max-zipmap-value 512\`                 | 指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法                              |                                                                                                                                                                              |
| 29                                          | `activerehashing yes`                                              | 指定是否激活重置哈希，默认为开启（后面在介绍 Redis 的哈希算法时具体介绍）                                                                                                                                     |
| 30                                          | `include /path/to/local.conf`                                      | 指定包含其它的配置文件，可以在同一主机上多个 Redis 实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件                                                                                                               |

### +\* 持久化

RDB

*   什么是RDB？

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16524213809671652421380286.png)

    *   在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的 Snapshot 快照，它恢复时是将快照文件直接读到内存里

    *   Redis 会单独创建（fork）一个子进程来进行持久化，会先将数据写入到 一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。 整个过程中，主进程是不进行任何 IO 操作的，这就确保了极高的性能。如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那 RDB 方式要比 AOF 方式更加的高效。RDB 的缺点是最后一次持久化后的数据可能丢失。

    > Fork

    Fork 的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等） 数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程

*   怎么配置？

    安装目录 > etc > redis.conf 的 快照部分（SNAPSHOTTING ） 作如下配置，其中触发 `save <秒> <改的次数>`

    ```java
    ################################ SNAPSHOTTING  ################################
    # 如果满足以下策略，就会将数据同步到磁盘
    # 900 秒内有 1 次修改、300 秒内有 10 次修改、60 秒内有 10000 次修改
    # 任何一个条件满足，都会将文件写入到磁盘上，当然这数值我们是可以修改的
    # 如果想立刻备份，那么直接在命令行输入 save 即可，会立刻备份，此时会处于阻塞状态，其他所有命令都会阻塞
    # 也可以输入 bgsave 命令进行备份，和 save 不同的是，bgsave 是在后台异步进行快照。
    # 并且还可以通过 lastsave 命令获取最后一次成功执行快照的时间
    save 900 1
    save 300 10
    save 60 10000

    # 当快照操作出错时停止写数据到磁盘，这样后面写操作均会失败。
    # 比如内存 4GB，但是当前主进程使用的 3GB
    # 那么将数据写入磁盘、fork 一份主进程的时候就又需要额外的 3GB，显然内存不够了，因此保存到硬盘的数据也就失败了
    # 为了不影响后续写操作，可以将该项值改为 no
    stop-writes-on-bgsave-error yes

    # 是否压缩，默认是 yes，采用 lzf 方式压缩。
    # 如果不想消耗 CPU 性能来进行文件压缩的话，可以设置为 no，缺点是需要更多的空间来存储文件
    rdbcompression yes

    # 对 rdb 数据进行校验, 表示表示写入文件和读取文件时是否开启 RDB 文件检查
    # 检查是否有无损坏，如果在启动是检查发现损坏，则停止启动。
    # 这个过程耗费 CPU 资源，会大概增加 10% 的性能损耗，默认为 yes
    rdbchecksum yes

    # rdb 文件名，所以默认是 rdb，并且也是默认开启 rdb 持久化
    # 如果把上面所有的 save 给注释掉，那么就相当于关闭 rdb
    dbfilename dump.rdb

    # 路径，这里的路径，如果你不单独指定，那么默认是 redis 的启动路径
    # 也就是你是在哪个目录下启动的 redis-server，那么 dir 就是哪里，但同时这也是 rdb 文件的所在路径
    # 比如我是在 /root 下面执行的 redis-server，那么 dir 就是 /root，同时 rdb 文件的路径也是 /root/dump.rdb
    dir ./

    ```

*   如何手动触发？

    1.  除了配置文件的"save  多少秒  修改次数" &#x20;

        ```bash
        save 900 1
        save 300 10
        save 60 10000
        ```

    2.  命令 save 或者是 bgsave

        *   Save：save 时只管保存，其它不管，全部阻塞

        *   BGSAVE：Redis 会在后台异步进行快照操作， 快照同时还可以响应客户端请求。可以通过 lastsave 命令获取最后一次成功执行快照的时间

*   保存在哪里？

    rdb 保存的是 dump.rdb 文件\*\*，\*\* 生成在`安装 > etc` 下。

    要进行冷备份，将这个配置文件备份在别的机器，出现问题时进行恢复。

*   如何恢复？

    将备份的dump.rdb文件放在`安装目录 > etc` 下启动服务 `redis-service /usr/local/redis/etc/redis.conf`  会自动恢复

*   如何关闭rdb?

    **命令**：config set save ""

    **配置文件：**

    进入配置文件关闭触发策略即可：

    Save 900 1      

    Save 300 10    

    Save 60 10000   

    注释掉，并打开save "" 的注释，使得  **save ""**  生效，即可关闭rdb；)

*   rdb优势与劣势

    *   优势

        *   适合大规模的数据恢复

        *   对数据完整性和一致性要求不高

    *   劣势

        *   在一定间隔时间做一次备份，所以如果 redis 意外 down 掉的话，就 会丢失最后一次快照后的所有修改

        *   Fork 的时候，内存中的数据被克隆了一份，大致 2 倍的膨胀性需要考虑

AOF

*   什么是AOF？

    由于 RDB 文件的写入并**不是实时的**，通过 RDB 文件仅仅能将数据库状态恢复到**上一次 RDB 持久化的状态**，在此之后所做的改动将会被丢失，因此，RDB 持久化比较适用于对数据丢失不敏感的场合。

    为了应对对数据丢失比较敏感的场合，Redis 提供了另外一种持久化的方式，也就是本文要提到的 **AOF 持久化**。

    与 RDB 持久化通过保存数据库中的键值对来记录数据库状态的方式不同，AOF 持久化是通过**保存 Redis 服务所执行的写命令**来记录数据库状态的。

*   如何配置AOF？

    ```bash
    ############################## APPEND ONLY MODE ###############################
    # aof 意思是 append only file，我们看到默认是 no，表示关闭，因此持久化默认使用 rdb
    appendonly no


    # 正如 dump.rdb，aof 方式持久化也就一个文件名，默认叫appendonly.aof
    appendfilename "appendonly.aof"
    # 另外 aof 和 rdb 持久化方式是可以同时指定的，后面会说
    # 另外我们知道当 redis 启动的时候，会加载文件，读进缓存。
    # 但如果既有 rdb 文件又有 aof 文件，那 redis 会读取哪个呢？实际上会读取 aof 文件
    # 如果 aof 被人乱搞了一通，那么会发现 redis 无法启动，启动了也连接不上。
    # 这个时候有两种办法，一种是删除相应的 aof 文件，但是这样数据就丢了
    # 还有一种方法，就是 redis-server 所在路径 (一般是/usr/local/bin) 中，有一个 redis-check-aof
    # 通过 redis-check-aof --fix appendonly.aof 可以进行修复，同理还有一个 redis-check-rdb，用来修复 rdb 文件。


    # appendfsync：同步策略，支持三个参数
    # 1.always：同步持久化，每次发生数据变更会被立即记录到磁盘，并完成同步，性能较差但是数据完整性较好
    # 2.everysec：默认设置，异步操作，每秒记录，并完成同步，如果1s内宕机，只丢失1s内的数据
    # 3.no：always 和 everysec 都会和磁盘保持同步，而 no 表示写入 aof 文件但并不等待磁盘同步，也就是写入缓冲区，Linux 中 30s 后自动同步到磁盘
    # appendfsync always
    appendfsync everysec
    # appendfsync no


    # 子进程重写 aof 文件时是否不使用 appendfsync（开启子进程重写），用默认 no 即可，也就是使用，可以保证数据安全性
    # 注意这个参数前面有一个 no 了，设置为 yes，才表示不使用 appendfsync，因此这个参数有点绕
    # 如果设置为 yes，此时不会写入磁盘，只是写入缓冲区，因此不会造成阻塞。
    # 但如果 redis 挂掉，在 linux 系统默认设置下，会丢失 30s 的数据
    # 使用 no，表示使用 appendfsync，表示会由子进程重写，这时候和主进程之间会有资源上的竞争，因为都要操作磁盘，所以会有阻塞的情况，但是不会丢失数据。
    no-appendfsync-on-rewrite no


    # aof 文件增长比例，指当前 aof 文件比上次重写的增长比例大小。
    # aof 重写即在 aof 文件在一定大小之后，重新将整个内存写到 aof 文件当中，以反映最新的状态(相当于bgsave)。
    # 这样就避免了，aof 文件过大而实际内存数据小的问题 (频繁修改数据问题).
    auto-aof-rewrite-percentage 100


    # aof 文件重写最小的文件大小，即最开始 aof 文件必须要达到这个文件时才触发，后面的每次重写就不会根据这个变量了(根据上一次重写完成之后的大小)
    # 此变量仅初始化启动 redis 有效，如果是 redis 恢复时，则 lastSize 等于初始 aof 文件大小.
    auto-aof-rewrite-min-size 64mb


    # 指 redis 在恢复时，会忽略最后一条可能存在问题的指令。
    # 默认值 yes。即在 aof 写入时，可能存在指令写错的问题(突然断电，写了一半)
    # 这种情况下，yes 会继续，而 no 会直接恢复失败，用户必须手动修复 AOF 文件才能正常启动 Redis 服务。
    aof-load-truncated yes


    # 4.0 开始允许使用 RDB-AOF 混合持久化的方式，结合了两者的优点，通过 aof-use-rdb-preamble 配置项可以打开混合开关
    aof-use-rdb-preamble yes

    ```

    **其中比较重要的是 appendfsync 参数，用它来设置 AOF 的持久化策略，可以选择按时间间隔或者操作次数来存储 AOF 文件，这个参数的三个值在文章开头有说明，这里就不再复述了。**

*   如何修复aof文件？

    使用 `redis → bin → redis-check-aof ` 进行修复

    示例 ./redis-check-aof --fix  ../etc/appendonly.aof&#x20;

    就会删掉不符合的行

总结：RDB性能好，但一旦出现问题，可能就会丢去很长时间的数据，用于对数据丢失不敏感的场景。而AOF 通过配置，AOF最多不超过1秒的数据。但要求硬盘大，也会影响性能。

### + 事务

*   redis事务的介绍

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16524324064831652432406347.png)

    **「 Redis 事务中没有像 MySQL 关系型数据库事务隔离级别的概念，不能保证原子性操作，也没有像 MySQL 那样执行事务失败时可以进行回滚的操作。 」**

    **Redis 事务是一组命令的集合，将多个命令进行打包，然后这些命令会被顺序地添加到队列中，并按照添加的顺序依次执行。**

    **这个与 Redis 的特点：「 快速、高效 」有着紧密的联系，因为回滚操作、以及像事务隔离级别那样的加锁解锁，是非常消耗性能的。所以，Redis 中执行事务的流程只需要以下简单的三个步骤：**

    1\. MULTI：「 表示开启一个事务 」，执行此命令后，后面执行的所有对 Redis 数据类型的操作命令「都会被顺序地放入队列中」。当执行 EXEC 命令后，队列中的命令会被依次执行。

    2\. DISCARD：「 放弃执行队列中的命令 」，可以类比为 MySQL 的回滚操作，「 并且将当前的状态从事务状态改为非事务状态」。

    3\. EXEC：该命令表示要「 顺序执行队列中的命令 」，执行完之后并将结果显示在客户端，「 同时将当前状态从事务状态改为非事务状态 」。若是执行该命令之前，有 key 被执行 WATCH 命令并且又被其它客户端修改，那么就会放弃执行队列中的所有命令，并在客户端显示报错信息；如果没有被修改，那么会继续执行队列中的所有命令。

*   如何使用事务

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16524302794101652430279129.png)

    **正常执行**：在事务中执行没有问题的，每一步都是正常的，直接事务完成。

    ```bash
    127.0.0.1:6379> MULTI
    OK
    127.0.0.1:6379> set k1 v1
    QUEUED
    127.0.0.1:6379> set k2 v2
    QUEUED
    127.0.0.1:6379> exec
    1) OK
    2) OK
    127.0.0.1:6379> keys *
    1) "k2"
    2) "k1"

    ```

    **放弃事务：** 我们在执行`MULTI` 后发现命令有问题，想放弃当前这个事务，就执行`DISCARD`

    ```bash
    127.0.0.1:6379> MULTI
    OK
    127.0.0.1:6379> set xv1 xv1
    QUEUED
    127.0.0.1:6379> DISCARD
    OK
    127.0.0.1:6379> keys *
    (empty array)

    ```

    **全体边坐：** 开启事务后，加入队列的命令不对时，然后执行EXEC后，这整个事务的命令都失效。

    ```.properties
    127.0.0.1:6379> MULTI
    OK
    127.0.0.1:6379> set k1 v1
    QUEUED
    127.0.0.1:6379> set k2 v2
    QUEUED
    127.0.0.1:6379> setfsffs
    (error) ERR unknown command `setfsffs`, with args beginning with:
    127.0.0.1:6379> exec
    (error) EXECABORT Transaction discarded because of previous errors.

    ```

    **冤头债主：** 开启事务后，命令正常加入队列 （但执行时会导致错误时），然后执行EXEC后，有问题的命令失效，其它正常执行。

    ```bash
    127.0.0.1:6379> MULTI
    OK
    127.0.0.1:6379> set k1 v1
    QUEUED
    127.0.0.1:6379> set f f f
    QUEUED
    127.0.0.1:6379> exec
    1) OK
    2) (error) ERR syntax error

    ```

*   监控

    *   介绍

        **Redis 的监控会使用到锁机制，而锁分为悲观锁和乐观锁。**

        **类似于 MySQL 里面的 "表锁" 和 "行锁"。"表锁" 就是为了保证数据的一致性，将整张表锁上，这样就只能一个人修改，好比进卫生间，进去之后就把大门锁上了，但这样的结果也可想而知，虽然数据的一致性、安全性好，但是并发性会极差，因为其他人进不去了。比如一张有 20 万条记录的表，但是你只修改第 520 行，而另一个哥们修改第 250 行，本来两者不冲突，但是你把整个表都锁了，那就意味这后面的老铁只能排队了，这样显然效率不高。于是就出现了 "行锁"，"行锁" 在 MySQL 中，就类似于表中有一个版本号的字段，假设有一条记录的版本号为 1，A 和 B 同时修改这条记录，那么一旦提交，就会改变那个版本号，假设变为 2。如果 A 先提交了，那么数据库中对应记录的版本号已经变了，但是 B 对应的版本号还是之前的，那么提交之后会立即报错，这样就知道这条记录被人修改了，需要重新获取对应版本号的记录。**

    *   悲观锁与乐观锁

        **悲观锁：**

        pessimistic lock，顾名思义，就是很悲观，每次拿数据的时候都会认为别人会修改，所以每次拿数据的时候都会上锁，这样别人想拿到这个数据就会 block 住，直到拿到锁。

        **乐观锁：**

        optimistic lock，顾名思义，就是很乐观，每次拿数据的时候都会认为别人不会修改，所以每次拿数据的时候都不会上锁。但是在更新数据的时候会判断一下在此期间别人有没有去更新这条数据，可以使用版本号等机制。乐观锁使用于多读的应用类型，这样可以提高吞吐量。乐观锁策略就是：提交版本必须大于记录的当前版本才能更新。

        而 watch 命令则是用于客户端并发情况下，为事务提供一个乐观锁（CAS，Check And Set），也就是可以用 watch 命令来监控一个或多个变量，如果在事务的过程中，某个监控项被修改了，那么整个事务就会终止执行。

    *

    > redis会监控监控项是否被修改，如果修改了，会关闭事务，使事务命令无效。

    **WATCH <表>  #开启监控**

    **UNWATCH  #取消监控，在MULTI命令执行前**

    监控演示：下面就来演示一下，首先 watch 是需要搭配 multi 事务来使用的。一般是先 watch key，然后开启事务对 key 操作。

    ```bash
    127.0.0.1:6379> keys *
    1) "user"

    ```

    命令窗口1：

    ```bash
    127.0.0.1:6379> WATCH user   #开启监控
    OK
    # UNWATCH  #取消监控
    127.0.0.1:6379> MULTI       #开启事务，开启事务后取消监控无效
    OK
    127.0.0.1:6379> set user 50  #在这里另一个窗口修改了user的值
    QUEUED
    127.0.0.1:6379> exec         #会执行无效
    (nil)                       

    ```

    &#x20;

### - 消息订阅与发布

订阅：SUBSCRIBE&#x20;

```bash
127.0.0.1:6379> SUBSCRIBE xvideos
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "xvideos"
3) (integer) 1
1) "message"
2) "xvideos"

```

发布：PUBLISH

```bash
127.0.0.1:6379> PUBLISH xvideos 69
(integer) 1
```

此时订阅窗口：加一行 `3) "69"`

### +\* 主从复制

**复制原理**

*   slave 启动成功连接到 master 后会发送一个 sync 命令

*   master 接到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令， 在后台进程执行完毕之后，master 将传送整个数据文件到 slave, 以完成一次完全同步

*   全量复制：而 slave 服务在接收到数据库文件数据后，将其存盘并加载到内存中。

*   增量复制：Master 继续将新的所有收集到的修改命令依次传给 slave, 完成同步

*   但是只要是重新连接 master，一次完全同步（全量复制) 将被自动执行

**复制延时**

由于所有的写操作都是先在 Master 上操作，然后同步更新到 slave 上，所以从 Master 同步到 Slave 机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave 机器数量的增加也会使这个问题更加严重。

*   一主二仆

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16524487311761652448731077.png)

    *   如何配置？

        将`安装目录 > etc` 的`redis.conf` 文件克隆三份，第三有所区别，要配置的项示例如下：打开以下文件搜索6380即可知道配置点，就是文件生成的名要不同，启动的端口不同，等等。

        [https://github.com/18476305640/fileBox/blob/master/杂项/redis6380.conf](https://github.com/18476305640/fileBox/blob/master/杂项/redis6380.conf "https://github.com/18476305640/fileBox/blob/master/杂项/redis6380.conf")

        然后分别启动：

        redis-server /usr/local/redis/etc/redis6379.conf

        redis-server /usr/local/redis/etc/redis6380.conf

        redis-server /usr/local/redis/etc/redis6381.conf

        启动后，分别在不同窗口执行以下命令进入redis操作命令：

        redis-cli -p 6379  #master

        redis-cli -p 6380  #slave

        redis-cli -p 6381  #slave

        在这些窗口执行 `INFO replication` 查看当前信息，发现都是master，我们要让6380、6381作为slave，那么在这两个窗口执行：

        slaveof 主库IP 主库端口

        即：slaveof 127.0.0.1 6379

    &#x20; **主从问题演示**

    1.  切入点问题？slave1、slave2 是从头开始复制还是从切入点开始复制？比如从 k4 进来，那之前的 123 是否也可以复制？

        答：从头开始复制；123 也可以复制

    2.  从机是否可以写？set 可否？

        答：从机不可写，不可 set，主机可写

    3.  主机 shutdown 后情况如何？从机是上位还是原地待命

        答：从机还是原地待命（咸鱼翻身，还是咸鱼）

    4.  主机又回来了后，主机新增记录，从机还能否顺利复制？

        答：能

    5.  其中一台从机 down 后情况如何？依照原有它能跟上大部队吗？

        答：不能跟上，每次与 master 断开之后，都需要重新连接，除非你配置进 redis.conf 文件（具体位置：redis.conf 搜寻`#### REPLICATION ####`）

*   薪火相传

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16524490471251652449046262.png)

    6379是6380的master , 6380是6381的master。&#x20;

    slaveof 主库IP 主库端口

*   反客为主

    `SLAVEOF no one`

    退出slave，使当前数据库停止与其他数据库的同步，转成主数据库

*   哨兵模式

    1.  调整结构，6379 带着 6380、6381

    2.  配置：加一个配置文件`安装目录 > etc >  sentinel.conf` (名字绝不能错)，内容是:

        ```bash
        #一个哨兵可以监控多个master
        sentinel monitor 被监控数据库名字(自己起名字) 127.0.0.1 6379 1
        ```

    3.  启动哨兵&#x20;

        ```bash
        redis-sentinel /usr/local/redis/etc/sentinel.conf 
        ```

    4.  测试

        在master上即6379上执行`SHUTDOWN` 那么观察sentinel窗口，会进行投票，先一个新的slave作为master。 再次启动6379发现，6379不再是master而是作为新体系下的slave。

redis-sentinel /sentinel.conf&#x20;

### + jedis

*   准备

    1\) 配置

    redis.conf 配置为任何主机可访问（远程访问）。`0.0.0.0`表示 任何主机可访问

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/16525129593471652512959212.png)

    2）依赖

    ```xml
    <dependency>
      <groupId>redis.clients</groupId>
      <artifactId>jedis</artifactId>
      <version>2.1.0</version>
    </dependency>
    ```

*   测试连通

    test1.java

    ```java
    package com.zjazn.redis;
    import redis.clients.jedis.Jedis;
    public class test1 {
        public static void main(String[] args)
        {

            Jedis jedis = new Jedis("124.222.229.234",6379);
            //输出PONG，redis连通成功
            System.out.println(jedis.ping());
        }
    }
    ```

*   基本操作

    ```java

    import redis.clients.jedis.Jedis;
    import redis.clients.jedis.Response;
    import redis.clients.jedis.Transaction;

    public class Test03 {
      public static void main(String[] args) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);

        // 监控key，如果该动了事务就被放弃
        /*
         * 3 jedis.watch("serialNum"); jedis.set("serialNum","s#####################");
         * jedis.unwatch();
         */

        Transaction transaction = jedis.multi();// 被当作一个命令进行执行
        Response<String> response = transaction.get("serialNum");
        transaction.set("serialNum", "s002");
        response = transaction.get("serialNum");
        transaction.lpush("list3", "a");
        transaction.lpush("list3", "b");
        transaction.lpush("list3", "c");

        transaction.exec();
        // 2 transaction.discard();
        System.out.println("serialNum***********" + response.get());

      }
    }
    ```

*   事务

    [TestTX.java](https://gitee.com/jallenkwong/LearnRedis/blob/master/src/main/java/com/lun/shang/TestTX.java "TestTX.java")

    ```java
    import redis.clients.jedis.Jedis;
    import redis.clients.jedis.Transaction;

    public class TestTX {
      public boolean transMethod() throws InterruptedException {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        int balance;// 可用余额
        int debt;// 欠额
        int amtToSubtract = 10;// 实刷额度

        jedis.watch("balance");
        // jedis.set("balance","5");//此句不该出现，讲课方便。模拟其他程序已经修改了该条目
        Thread.sleep(7000);
        balance = Integer.parseInt(jedis.get("balance"));
        if (balance < amtToSubtract) {
          jedis.unwatch();
          System.out.println("modify");
          return false;
        } else {
          System.out.println("***********transaction");
          Transaction transaction = jedis.multi();
          transaction.decrBy("balance", amtToSubtract);
          transaction.incrBy("debt", amtToSubtract);
          transaction.exec();
          balance = Integer.parseInt(jedis.get("balance"));
          debt = Integer.parseInt(jedis.get("debt"));

          System.out.println("*******" + balance);
          System.out.println("*******" + debt);
          return true;
        }
      }

      /**
       * 通俗点讲，watch命令就是标记一个键，如果标记了一个键， 在提交事务前如果该键被别人修改过，那事务就会失败，这种情况通常可以在程序中 重新再尝试一次。
       * 首先标记了键balance，然后检查余额是否足够，不足就取消标记，并不做扣减； 足够的话，就启动事务进行更新操作，
       * 如果在此期间键balance被其它人修改， 那在提交事务（执行exec）时就会报错， 程序中通常可以捕获这类错误再重新执行一次，直到成功。
       * 
       * @throws InterruptedException
       */
      public static void main(String[] args) throws InterruptedException {
        TestTX test = new TestTX();
        boolean retValue = test.transMethod();
        System.out.println("main retValue-------: " + retValue);
      }
    }
    ```

*   主从复制

    [TestMS.java](https://gitee.com/jallenkwong/LearnRedis/blob/master/src/main/java/com/lun/shang/TestMS.java "TestMS.java")

    ```java

    import redis.clients.jedis.Jedis;

    public class TestMS {
      public static void main(String[] args) {
        Jedis jedis_M = new Jedis("127.0.0.1", 6379);
        Jedis jedis_S = new Jedis("127.0.0.1", 6380);

        jedis_S.slaveof("127.0.0.1", 6379);

        jedis_M.set("class", "1122V2");

        String result = jedis_S.get("class");//可能有延迟，需再次启动才能使用
        System.out.println(result);
      }
    }
    ```

*   JedisPoolUtil

    JedisPoolUtil

    1.  获取Jedis实例需要从JedisPool中获取

    2.  用完Jedis实例需要返还给JedisPool

    3.  如果Jedis在使用过程中出错，则也需要还给JedisPool

    [JedisPoolUtil.java](https://gitee.com/jallenkwong/LearnRedis/blob/master/src/main/java/com/lun/shang/JedisPoolUtil.java "JedisPoolUtil.java")

    ```java
    import redis.clients.jedis.Jedis;
    import redis.clients.jedis.JedisPool;
    import redis.clients.jedis.JedisPoolConfig;

    public class JedisPoolUtil {
      private static volatile JedisPool jedisPool = null;

      private JedisPoolUtil() {
      }

      public static JedisPool getJedisPoolInstance() {
        if (null == jedisPool) {
          synchronized (JedisPoolUtil.class) {
            if (null == jedisPool) {
              JedisPoolConfig poolConfig = new JedisPoolConfig();
              poolConfig.setMaxActive(1000);
              poolConfig.setMaxIdle(32);
              poolConfig.setMaxWait(100 * 1000);
              poolConfig.setTestOnBorrow(true);

              jedisPool = new JedisPool(poolConfig, "127.0.0.1", 6379);
            }
          }
        }
        return jedisPool;
      }

      public static void release(JedisPool jedisPool, Jedis jedis) {
        if (null != jedis) {
          jedisPool.returnResourceObject(jedis);
        }
      }

    }
    ```
