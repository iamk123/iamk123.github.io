

# Java中的锁

## Lock接口

### 什么是Lock接口

```java
public interface Lock {
    void lock(); 
    void lockInterruptibly() throws InterruptedException; 
    boolean tryLock(); 
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException; 
    void unlock(); Condition newCondition();
}
```

```
Lock是Java中提供的一个接口，用于实现【线程同步机制】，它可以替代Synchronized关键字。
Lock接口提供了比Synchronized更灵活、更强大的线程同步功能，可以用于解决多线程中的资源竞争和死锁等问题。
Lock接口的实现类有很多种，其中最常用的是ReentrantLock。

Lock接口提供了以下主要方法：
- lock()：获取锁，如果锁已经被其他线程获取，则当前线程进入等待状态。
- unlock()：释放锁，如果当前线程持有锁，则释放锁并唤醒等待的线程。
- tryLock()：尝试获取锁，如果锁没有被其他线程获取，则获取锁并返回true，否则立即返回false。
- tryLock(long time, TimeUnit unit)：尝试获取锁，如果锁没有被其他线程获取，则获取锁并返回true，否则等待指定时间后返回false。
- newCondition()：创建一个Condition对象，用于实现等待/通知机制。

需要注意的是，在使用Lock接口时，需要在finally代码块中释放锁，以确保锁一定会被释放，避免死锁的发生。
```

#### 什么是线程同步机制？

```
- 是什么？
线程同步机制是多线程编程中常用的一种机制，用于控制多个线程对共享资源的访问。

- 为什么？
在多线程环境中，多个线程同时访问共享资源可能会导致竞争条件和数据不一致等问题，因此需要使用线程同步机制来避免这些问题的发生

- 怎么样？
1.synchronized
2.Lock接口

- 基本原理
线程同步机制的基本原理是在共享资源的访问前获取锁，只有获取锁的线程才能访问共享资源，其他线程需要等待锁的释放。
在共享资源访问完成后，释放锁，让其他线程可以继续访问共享资源。这样就保证了共享资源在任何时刻只能被一个线程访问，避免了竞争条件和数据不一致等问题的发生。

- 使用时注意的问题
1.使用线程同步机制时，应该避免死锁、饥饿等问题的发生，以确保程序的正常运行
2.同时，在使用synchronized关键字时，应该尽量减小同步块的范围，以提高程序的性能。
3.在使用Lock接口时，需要在finally代码块中释放锁，以确保锁一定会被释放，避免死锁的发生。
```

##### 在使用synchronized关键字时，为什么要减小同步块的范围？

```
1.提高性能
范围越大，需要等待获取锁的线程越多，导致在获取锁的过程中需要等待其他线程释放锁，而其他线程释放锁的时间也会比较长，这就会造成线程的等待时间过长，降低程序的运行效率。
2.避免死锁
不同的线程可能会竞争多个锁，释放锁的时间也会比较长，导致相互等待，形成死锁。

因此，为了避免以上问题的发生，应该尽量减小同步块的范围，只在必要的地方进行同步，这样可以提高程序的性能，同时也可以降低出现死锁等问题的概率。
```

##### 为什么使用lock接口需要在finally代码块中释放锁

```
- 为什么？
在使用Lock接口进行线程同步时，需要手动获取和释放锁，这是两个独立的操作，如果在获取锁之后发生异常，就有可能导致锁没有被释放，从而导致死锁等问题的发生。
- 怎么样？
因此，将释放锁的操作放在finally代码块中，这样可以确保在任何情况下都会释放锁，避免死锁等问题的发生。
```

### Lock和Synchronized的区别？

```
- 是什么 & 作用
Lock和Synchronized都是Java中用于实现线程同步的机制，它们的目的是为了避免线程间的竞争条件和数据不一致等问题。它们的区别如下：

- 区别
1.锁的获取方式：
	Synchronized是在进入同步代码块或同步方法时，自动获取锁，退出同步代码块或方法时自动释放锁；而Lock需要手动获取锁，并且必须手动释放锁。
2.锁的粒度：
	Synchronized只能对整个方法或代码块进行加锁，而Lock可以对代码块进行更细粒度的控制。
3.可中断性：
	在获取锁时，Synchronized是不可中断的，即使该线程在等待锁的过程中被中断，也不会释放锁；而Lock可以根据需要设置锁的可中断性。
4.公平锁：
	Synchronized是非公平锁，不保证等待时间最长的线程最先获取锁；而Lock可以通过参数指定为公平锁或非公平锁。
5.性能：
	相比较而言，Lock的性能比Synchronized好，在高并发的情况下，Lock的吞吐量比Synchronized更高。

需要注意的是，Lock是在JDK 5中引入的，而Synchronized是Java早期就提供的同步机制。由于Lock相比Synchronized更灵活和高效，因此在实际开发中，使用Lock的场景会更多。
```

### Lock的使用方式

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
  ...
} finally {
  lock.unlock();
}
```



## 队列同步器AQS



## 重入锁ReentrantLock

### 什么是重入锁？

```
- 是什么？
可重入锁是指同一个线程在持有某个锁的情况下，可以继续获取该锁而不会出现死锁的情况

- synchronized关键字实现原理
每个对象都有一个监视器锁（monitor），线程进入同步块时获取该对象的监视器锁，并在同步块结束时释放该锁，当一个线程在持有该锁的情况下再次进入同步块时，会自动获取该锁，而不会被阻塞。

- ReentrantLock重入锁实现原理
它使用一个计数器来记录线程获取锁的次数。当一个线程第一次获取锁时，计数器的值为1，当同一个线程再次获取锁时，计数器的值会递增，当线程退出同步块时，计数器的值递减，直到计数器的值为0时，锁被释放。这种机制保证了线程可以多次获取同一个锁而不会出现死锁的情况。
```

### 什么是ReentrantLock & 特点

```
- 是什么？
ReentrantLock是Java中实现Lock接口的一个类，它提供了与synchronized关键字类似的线程同步机制

- 特点
1.可重入性：
	与synchronized关键字一样，ReentrantLock支持可重入锁，即同一个线程可以多次获取同一个锁而不会死锁
2.公平锁与非公平锁：
	ReentrantLock提供了两种锁的实现方式，即公平锁和非公平锁。公平锁会按照线程的请求顺序来分配锁，而非公平锁则允许线程在竞争时插队，可能会导致某些线程长时间等待。
3.条件变量：
	ReentrantLock提供了Condition接口的实现类Condition，它可以将一个锁分为多个条件，使得线程可以在指定条件下等待和唤醒。这使得线程间的通信变得更加灵活。
3.可中断性：
	与synchronized关键字不同，ReentrantLock提供了可中断锁的机制。即当一个线程等待获取锁时，可以通过中断等待的线程来结束等待。

ReentrantLock相对于synchronized关键字来说，具有更强的灵活性和可定制性，但需要手动获取和释放锁，使用时也需要注意避免死锁、饥饿等问题的发生。
```



### 公平锁与非公平锁



## 读写锁

### 什么是读写锁？

```
读写锁（ReadWriteLock）是Java中的一种同步机制，允许多个线程同时读共享资源，但只允许一个线程写共享资源。它是一种悲观锁，因为它默认情况下假设写操作比读操作更加耗时，因此优先考虑写操作的互斥。

读写锁的主要特点是：
1.在同一时刻可以允许多个线程进行读操作。
2.写操作时独占锁，只有一个线程可以进行写操作。
3.写操作和读操作之间互斥，即在一个线程进行写操作的时候，其他线程无法进行读和写操作，直到写操作完成。

读写锁通常分为两种类型：读锁和写锁，写锁是独占锁，读锁是共享锁。在读锁被获取的情况下，其他线程仍然可以获取读锁，但不能获取写锁，因为写锁需要排除所有的读锁和其他的写锁。
```



### 读写锁的使用方式

例子：非线程安全的HashMap作为缓存的实现

```java
public class Cache {
    private static final Map<String, Object>    map = new HashMap<String, Object>();
    private static final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
    private static final Lock                   r   = rwl.readLock();
    private static final Lock                   w   = rwl.writeLock();

    public static final Object get(String key) {
        r.lock();	// 获取读锁，并发访问该方法时不会被阻塞
        try {
            return map.get(key);
        } finally {
            r.unlock();
        }
    }

    public static final Object put(String key, Object value) {
        w.lock();	// 获取写锁，其他线程获取读、写锁会被阻塞，只有该写锁释放后才能继续操作
        try {
            return map.put(key, value);
        } finally {
            w.unlock();
        }
    }

    public static final void clear() {
        w.lock();
        try {
            map.clear();
        } finally {
            w.unlock();
        }
    }
}
```



### 读写锁的实现

#### 读写状态的设计

#### 写锁的获取与释放

#### 读锁的获取与释放

#### 锁降级



### Condition接口

#### 使用方式

##### 例子1

```java
public class ConditionUseCase {
    Lock      lock      = new ReentrantLock();
    Condition condition = lock.newCondition();

    public void conditionWait() throws InterruptedException {
        lock.lock();
        try {
            condition.await();
        } finally {
            lock.unlock();
        }
    }

    public void conditionSignal() throws InterruptedException {
        lock.lock();
        try {
            condition.signal();
        } finally {
            lock.unlock();
        }
    }
}
```

##### 例子2： 有界队列

有界队列：是一种特殊的队列，当队列为空时，队列的获取操作将会阻塞获取线程，直到队列中有新增元素；

当队列已满时，队列的插入操作将会阻塞插入线程，直到队列出现“空位”

```java
package Lock;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BoundedQueue <T> {
    private Object[] items;
    // 添加的下标，删除的下标和数组当前数量
    private int       addIndex, removeIndex, count;
    private Lock      lock      = new ReentrantLock();
    private Condition notEmpty  = lock.newCondition();
    private Condition notFull   = lock.newCondition();

    public BoundedQueue(int size) {
        items = new Object[size];
    }

    // 添加一个元素，如果数组满，则添加线程进入等待状态，直到有“空位”
    public void add(T t) throws InterruptedException{
        lock.lock();
        try {
            while(count  == items.length) {
                notFull.await();
            }
            items[addIndex] = t;
            if(++addIndex == items.length) {
                addIndex = 0;
            }
            ++count;
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    // 由头部删除一个元素，如果数组空，则删除线程进入等待状态，直到有新添加元素
    // @SuppressWarnings("unchecked")注解告诉编译器忽略类型转换时的警告信息。Object类型的对象x强制转换为了泛型类型T
    @SuppressWarnings("unchecked")
    public T remove() throws InterruptedException {
        lock.lock();
        try {
            while(count == 0) {
                notEmpty.await();
            }
            Object x = items[removeIndex];
            if(++removeIndex == items.length) {
                removeIndex = 0;
            }
            --count;
            notFull.signal();
            return (T) x;
        } finally {
            lock.unlock();
        }
    }
}

```



### Condition的实现原理

TODO
