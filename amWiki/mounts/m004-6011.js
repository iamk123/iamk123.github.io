if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m004']=[{"name":"01-kafka.md","path":"004-kafka/01-kafka.md","content":"https://www.yuque.com/snailclimb/mbs9wn?密码：nqdq\n\n [消息队列经典十连问](https://juejin.cn/post/7067322260511522823)\n\n\n\n## Kafka基础\n\n### kafka是什么？\n\n```\nKafka 是一个分布式流式处理平台。\n\n两大应用场景：\n1. 消息队列：建立实时流数据管道，以可靠地在系统或应用程序之间获取数据。\n2. 数据处理： 构建实时的流数据处理程序来转换或处理数据流。\n```\n\n### 队列模型？\n\n![image-20230821194531482](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/21/19453116926183311692618331573eNDnVF-image-20230821194531482.png)\n\n```\n（1）是早期的消息模型\n（2）使用队列作为消息通信载体，满足生产者与消费者模式，一条消息只能被一个消费者使用，未被消费的消息在队列中保留知道被消费或超时。\n```\n\n存在的问题\n\n```\n一条消息只能被一小消费者消费，消息无法分发给多个消费者\n```\n\n### Kafka 的消息模型？\n\n![image-20230821194821392](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/21/194821169261850116926185015059MBzaN-image-20230821194821392.png)\n\n```\n（1）使用发布-订阅模型\n（2）使用「主题（Topic）」作为消息通信载体，类似于广播模式。\n```\n\n\n\n### kakfa架构\n\n![image-20230821195338597](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/21/19533816926188181692618818707WyqS9r-image-20230821195338597.png)\n\nkafka重要概念\n\n```\n（1）Producer（生产者）: 产生消息的一方。\n（2）Consumer（消费者）: 消费消息的一方。\n（3）Broker（代理）: 可以看作是一个独立的 Kafka 实例。多个 Kafka Broker 组成一个 Kafka Cluster。\n```\n\nbroker中的重要概念\n\n```\n（1）Topic（主题）: Producer 将消息发送到特定的主题，Consumer 通过订阅特定的 Topic(主题) 来消费消息。\n（2）Partition（分区）: Partition 属于 Topic 的一部分。一个 Topic 可以有多个 Partition ，并且同一 Topic 下的 Partition 可以分布在不同的 Broker 上，这也就表明一个 Topic 可以横跨多个 Broker 。这正如我上面所画的图一样。\n```\n\nKafka 中的 Partition（分区） 实际上可以对应成为消息队列中的队列。\n\n### 多分区的好处\n\n```\n一个Topic可以有多个分区，同一个topic的分区可以分布在不同的broker下（topic2的分区1在broker1，分区2在broker2），这样可以提供更好的并发能力（负载均衡）\n```\n\n\n\n### 多副本机制 & 好处？\n\n```\n副本机制可以理解为集群\n分区（partition）会有多个副本（Replica），多个副本之间会有一个leader，其他副本成为follower。\n发送消息时会发送到leader副本，然后follower副本才能从leader副本中拉取消息进行同步。\n```\n\n优点\n\n```\nPartition 可以指定对应的 Replica 数, 这也极大地提高了消息存储的安全性, 提高了容灾能力，leader副本故障时，会从follower副本中选举出一个leader\n```\n\n缺点\n\n```\n增加了所需要的存储空间。\n```\n\n\n\n\n\n## Kafka 如何保证消息的消费顺序？\n\n业务场景\n\n```\n两条消息对应不同的操作\n1. 更改用户会员等级。\n2. 根据会员等级计算订单价格。\n这两条消息的消费顺序不一样造成的最终结果就会截然不同\n```\n\n解决办法\n\n```\n（1）1 个 Topic 只对应一个 Partition：可以解决问题，但是破坏了 Kafka 的设计初衷。\n（2）【推荐】发送消息的时候指定 key/Partition。\nKafka 中发送 1 条消息的时候，可以指定 topic, partition, key,data（数据） 4 个参数。\n如果你发送消息的时候指定了 Partition 的话，所有消息都会被发送到指定的 Partition。\n并且，同一个 key 的消息可以保证只发送到同一个 partition，这个我们可以采用表/对象的 id 来作为 key \n```\n\npartition已经能指定分区了，为什么还需要key？\n\n```\n开发者并不直接指定分区，因为这会导致不均匀的数据分布和其他管理问题\n同一个 key 的消息可以保证只发送到同一个 partition，\nkey 的哈希算法能够确保消息被均匀地分布到不同的分区，这有助于负载均衡。\n```\n\n## 如何保证Kafka不丢失消息?\n\n### 消息丢失的情况\n\n```\n丢失消息有 3 种不同的情况：\n（1）生产者丢失消息的情况\n（2）消费者丢失消息的情况\n（3）Kafka 弄丢了消息\n```\n\n#### 生产者丢失消息\n\n描述\n\n```\n生产者(Producer) 调用send方法发送消息之后，消息可能因为网络问题并没有发送过去。所以，我们不能默认在调用 send() 方法发送消息之后消息消息发送成功了。\n为了确定消息是发送成功，我们要判断消息发送的结果。\n```\n\n解决方法\n\n```\n（1）回调监听：Producer使用send（）发送消息是异步操作，可以添加回调函数的形式监听消息是否发送成功\n（2）重试：Producer 的 retries（重试次数）设置一个比较合理的值，一般是 3\n```\n\n#### 消费者丢失消息\n\n描述\n\n```\n我们知道消息在被追加到 Partition(分区)的时候都会分配一个特定的偏移量（offset）。\noffset 表示 Consumer 当前消费到的 Partition(分区)的所在的位置。\nKafka 通过偏移量（offset）可以保证消息在分区内的顺序性。\n\n当消费者拉取到了分区的某个消息之后，消费者会自动提交了 offset。\n自动提交的话会有一个问题，当消费者刚拿到这个消息准备进行真正消费的时候，突然挂掉了，消息实际上并没有被消费，但是 offset 却被自动提交了。\n```\n\n解决方法\n\n```\n关闭自动提交 offset，每次在真正消费完消息之后之后再自己手动提交 offset\n```\n\n问题 TODO\n\n```\n会带来消息被重新消费的问题。比如你刚刚消费完消息之后，还没提交 offset，结果自己挂掉了，那么这个消息理论上就会被消费两次。\n```\n\n#### Kafka 弄丢了消息\n\n描述\n\n```\n分区引入了多副本机制，当leader所在的borker挂掉，需要从follower副本中重新选出一个leader，\n但是leader的数据还没有被follower副本同步的话，就会造成消息丢失。\n```\n\n解决方法\n\n```\n（1）设置acks=all（默认是1）。表示只有所有ISR列表的副本（与leader保持同步的副本）全部收到消息时，broker才会发送一个确认响应给生产者\n（2）设置「副本数」 >= 3 (replication.factor >= 3): 副本能同步消息，虽然造成数据冗余，但带来了数据的安全性\n（3）设置「最小同步副本数」> 1（min.insync.replicas > 1）：表示消息至少写入到2个副本才算是被发送成功。\n（4）发生故障时，不从「同步程度低」的副本选取leader副本。（unclean.leander.election.enable=false）\n```\n\n\n\n\n\n## Kafka如何保证高可用\n\n### 什么是高可用\n\n```\n指系统无间断地执行其功能的能力，代表系统的可用性程度\n```\n\n### 备份机制\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/22/10371516926718351692671835169FIU3Lu-1623850423453-c4ba8b8a-337f-49f4-9d84-ae9375cf6a92.png\" alt=\"img\" style=\"zoom:50%;\" />\n\n```\n（1）分区可以存在多个副本，通常包含一个leader副本和若干和follower副本，生产者将消息发送给leader副本，follower会周期地向leader发送同步请求。\n（2）相同分区的不同副本存在不同的broker上，保证broker宕机时其它broker能继续提供服务。\n```\n\n### ISR机制\n\n```\nISR（In-Sync Replicas）：即同步副本集，表示分区中的副本中，leader副本同步的那些副本。\n当leader副本所在的broker宕机后，可以从那些同步副本集中选取一个新的leader副本\n```\n\n### ACK机制\n\n```\nack机制用于生产者确定其发送到broker的消息能否被成功接收。\nacks可以设置三种值：\n（1）acks=0：\n\t\t- 生产者发送消息不需要等待任何确认\n\t\t- 吞吐量很高，但会存在丢失消息的风险\n（2）acks=1:\n\t\t- 只要分区的主副本收到消息，就会给生产者回复一个ack\n\t\t- 降低了丢失风险，但是如果主副本收到消息后broker发生了宕机，从副本还没来得及同步，就会丢失消息\n（3）acks=-1 或 all：\n\t\t- 需要所有「同步副本」接收后才给生产者回复一个ack\n\t\t- 可以很好的避免消息丢失，但吞吐量低\n```\n\n### 故障恢复机制\n\n```\n（1）kakfa会在所有的broker中选出一个controller，负责各分区的leader选举，以及replica的重新分配\n（2）当broker发生故障后，由controller负责选举受影响的分区的新leader，并通知相关的borker。\n（3）controller发生故障：kafka的所有broker都在zookeeper的controller节点上注册一个watcher，controller发生故障时对应的controller临时节点会自动删除，此时注册在其上的watcher会被触发，所有活着的broker会去竞选成为新的controller。\n```\n\n\n\n\n\n## kafka速度为什么快？TODO\n\n```\n（1）顺序写入磁盘：：Kafka使用了日志结构的存储方式，数据总是追加到文件的末尾，而不是随机写入。顺序的磁盘I/O比随机I/O具有更好的性能，这使得Kafka能够实现高速的数据写入。\n（2）分区和多副本：通过将数据分为不同的分区，并将这些分区放在不同的服务器上，Kafka可以并行地处理多个读/写操作。此外，使用多个副本可以确保在broker发生故障时不会影响到数据的读写。\n（3）零拷贝技术：Kafka利用了现代操作系统提供的零拷贝技术，这允许数据从文件系统缓存直接发送到网络，避免了不必要的数据拷贝和系统调用，从而减少了CPU的使用\n\nhttps://www.yuque.com/snailclimb/mbs9wn/sk6gzc\n```\n\n\n\n##  如何处理消息队列的消息积压问题\n\n```\n消息积压是因为生产者的生产速度，大于消费者的消费速度。我们需要排查原因\n\n非bug导致\n（1）消费者数量太少：调整消费者的数量\n（2）分区数量太少：水平扩容，调整分区数量\n（3）消息key不均匀：导致消息都发送到某个分区，\n\nbug导致宕机 -> 修复bug -> 处理积压\n（1）积压程度较小：修复消费者的问题，以确保其恢复消费速度，然后将现有的有问题的consumer都停掉。\n（2）积压程度较大：先解决积压问题再分析原因，保证系统的可用性\n\n如何解决积压？\n创建一个新的topic，并配置更多数量的分区，比如原来的10倍，将积压的消息全部打入新的topic中，\n消费者直接消费新topic，处理完后再恢复原来的架构，解决问题\n```\n\n参考\n\n\t- [消息队列经典十连问](https://juejin.cn/post/7067322260511522823#heading-14)\n\t-  [一文理解如何解决Kafka消息积压问题](https://blog.51cto.com/u_12827626/3318063)\n\n\n\n\n\n## 重复消费问题\n\n```\n\n```\n\n","timestamp":1693014705186}]