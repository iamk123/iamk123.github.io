# Java并发容器和框架

## ConcurrentHashMap

### HashMap为什么不是线程安全的？

```java
HashMap 不是线程安全的主要原因是它在进行 put 和 resize 操作时，没有进行同步处理。
具体来说，在进行 resize 操作时，需要重新计算每个元素的索引位置，并且重新分配数组，如果多个线程同时进行 resize 操作，会导致多个线程在操作同一个数组，产生冲突，进而导致数据丢失或死循环等问题。
另外，在进行 put 操作时，由于 HashMap 不是线程安全的，因此多个线程可能同时修改同一个链表，从而导致链表数据不一致或链表出现环等问题。

public class Test {
    public static void main(String[] args) {
        final HashMap<String, String> map = new HashMap<String, String>(2);
        Thread t = Thread(new Runnable() {
            public void run() {
                for(int i = 0; i < 10000; i++) {
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            map.put(UUID.randomUUID().toString(), "");
                        }
                    }, "ftf" + i).start();
                }
            }
        }, "ftf");
        t.start();
        t.join();
    }
}
```

### HashMap的put操作为什么会出现环？原理是什么？

```
在 HashMap 内部，每个元素都是一个 Entry 对象，包含了键、值以及指向下一个 Entry 的指针，它们被存储在一个数组中。在执行 put 操作时，首先会计算 key 的哈希值，然后根据这个哈希值定位到数组中的一个索引位置。如果该索引位置为空，那么就将 Entry 对象放入该位置；如果该位置已经有了 Entry 对象，那么就顺着链表一直往下遍历，直到找到一个空的位置，并将 Entry 对象放入该位置。

在多线程环境下，如果多个线程同时对 HashMap 进行 put 操作，可能会出现多个线程定位到了同一个索引位置，并且同时在链表头插入新的 Entry 对象，此时就会出现多个线程并发修改同一个链表的情况。这时就有可能出现覆盖的情况，即一个线程的修改被另一个线程覆盖了，导致数据丢失和死循环等问题。
```



### 为什么要使用ConcurrentHashMap？优势？

```
- 现有技术存在的问题
1.【HashMap是线程非安全的】。
	在多线程环境下，使用hashMap进行put操作会引起死循环，导致CPU利用率接近100%，所以在并发情况下不能使用HashMap
2.【HashTable线程安全，但效率低下】
  1）HashTable容器使用synchronized来保证线程安全，同一时刻只有一个线程能够访问哈希表，其他线程会被阻塞。一个线程put时其他线程不能put、get。
  2）HashTable 在进行扩容时，需要将整个哈希表重新计算，并将数据复制到新的哈希表中，这也会导致性能的下降。
  
- ConcurrentHashMap的优势
1.【线程安全】：ConcurrentHashMap是线程安全的，多个线程可以同时访问和修改ConcurrentHashMap中的元素，而不会导致数据结构的损坏或数据的丢失。
2.【更高的并发性能】：ConcurrentHashMap的实现采用了分段锁的机制，对不同的数据段采用不同的锁，因此可以支持更高的并发性能，多个线程可以同时读取ConcurrentHashMap中的不同元素，而不会产生锁竞争。
3.【更高的扩展性】：ConcurrentHashMap在扩容时可以分段进行扩容，只需要锁住当前需要扩容的数据段，而不需要锁住整个HashMap，因此扩容时可以支持更高的并发性能。
4.【更好的迭代性能】：ConcurrentHashMap提供了一个专门的迭代器ConcurrentHashMap.KeySetView，可以在迭代过程中保证线程安全性和数据的一致性。
```



### 实现原理

Todo



## ConcurrentLinkedQueue

### 实现安全队列的方法

```
1.使用阻塞算法
  用一个锁（入队和出队用同一把锁）或两个锁（入队和出队用不同的锁）来实现
2.使用非阻塞算法
  使用循环CAS的方式实现。即ConcurrentLinkedQueue的实现方式
```

### 是什么？

```
ConcurrentLinkedQueue是Java中的一个线程安全的队列数据结构，可以被多个线程同时访问，支持高并发场景下的高效数据存储和访问。

- 实现方式
ConcurrentLinkedQueue是基于链表实现的，它采用了一种叫做"无锁并发编程"的技术，利用CAS（Compare And Swap）操作和volatile关键字实现了线程安全。
- 主要特点
它的主要特点是在高并发情况下性能比较好，因为它没有使用锁，而是采用了一些比较高级的技术来实现并发控制，避免了因为锁竞争而导致的性能问题。

- 基本操作
ConcurrentLinkedQueue支持队列的基本操作，包括入队（offer()）、出队（poll()）、获取队首元素（peek()）等。除此之外，它还提供了一些扩展操作，如批量添加元素（addAll()）、元素替换（replace()）等。
- 主要缺点
它的主要缺点是不支持随机访问，因为它是基于链表实现的，所以无法像ArrayList那样根据下标随机访问元素。
```

### 实现原理

TODO



## Java中的阻塞队列

### 什么是阻塞队列？

```

```



### 为什么使用？使用场景

### Java中的阻塞队列

```
ArrayBlockingQueue: 一个由数组结构组成的有界阻塞队列
LinkedBlockingQueue: 链表、无界队列
PriorityBlockingQueue: 优先级排序、无界队列
DelayQueue: 优先级队列实现的无界阻塞队列
SynchronousQueue: 不存储元素的阻塞队列
LinkedTransferQueue: 链表、无界阻塞队列
LinkedBlockingQUeue: 链表、双向组设队列
```

### 实现原理

TODO



## Fork/Join框架

### 是什么？

```
是Java7提供的一个用于并行执行任务的框架，是一个把大任务分割成若干小任务，最终汇总每个小任务结果后得到大任务结果的框架。
```

### 工作窃取算法

### Fork/Join框架设计

### 如何使用？

### 实现原理



## Java中的12个原子操作类