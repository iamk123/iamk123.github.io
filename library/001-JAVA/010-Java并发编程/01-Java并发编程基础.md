# Java并发编程基础

## 1 线程基础

### 什么是线程

### 为什么要使用多线程

### 线程的优先级

### 线程的状态

* New：新创建的线程，尚未执行；
* Runnable：运行中的线程，正在执行 `run()`方法的Java代码；
* Blocked：运行中的线程，因为某些操作被阻塞而挂起；
* Waiting：运行中的线程，因为某些操作在等待中；
* Timed Waiting：运行中的线程，因为执行 `sleep()`方法正在计时等待；
* Terminated：线程已终止，因为 `run()`方法执行完毕。

![image-20230503132121863](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/04/13042416831766641683176664243erV4pC-13212216830912821683091282100jSyioP-image-20230503132121863-20230504130424144.png)

### 线程终止的原因

- 线程正常终止：`run()`方法执行到 `return`语句返回；
- 线程意外终止：`run()`方法因为未捕获的异常导致线程终止；
- 对某个线程的 `Thread`实例调用 `stop()`方法强制终止（强烈不推荐使用）。

## 2 创建线程的方式

```
1.继承Tread类
2.实现Runnable接口
3.实现Callable接口
4.使用线程池
```

### 继承Tread类

```java
public class Main {
    public static void main(String[] args) {
        Thread t = new Thread();
        t.start(); // 启动新线程
    }
}
```

执行指定代码

```java
public class Main {
    public static void main(String[] args) {
        Thread t = new MyThread();
        t.start(); // 启动新线程
    }
}

class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("start new thread!");
    }
}
```

[参考](https://www.liaoxuefeng.com/wiki/1252599548343744/1306580710588449)

### 实现Runnable接口

```java
public class Main {
    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start(); // 启动新线程
    }
}

class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("start new thread!");
    }
}
```

简写

```java
new Thread(new Runnable() {
  	@Override
  	public void run() {
    	//调用卖票方法
    	for (int i = 0; i < 40; i++) {
      	ticket.sale();
    	}
  	}
},"Thread Name").start();
```

使用Java8的lambda语法简写

```java
public class Main {
    public static void main(String[] args) {
        Thread t = new Thread(() -> {
            System.out.println("start new thread!");
        });
        t.start(); // 启动新线程
    }
}
```

[参考](https://www.liaoxuefeng.com/wiki/1252599548343744/1306580710588449)

## 3 中断线程



## 4 线程间通信

### volatile和synchronized关键字



### 通知/等待机制

#### 通知和等待的相关方法

等待

```
wait(): 等待无限长的时间，直到其他线程唤醒它。
wait(long timeout): 等待一定的时间后，自动唤醒当前线程。
wait(long timeout, int nanos): 等待指定的时间和纳秒数后自动唤醒当前线程。
```

通知

```
notify()方法用于唤醒一个正在等待的线程，如果有多个线程等待，则唤醒其中一个线程。
notifyAll()方法则唤醒所有等待的线程。
```

#### 等待/通知的经典范式

等待方

```java
1.获取对象的锁
2.如果条件不满足，则调用对象的wait()方法，被通知后仍要检查条件（即使用wile而不能使用if）
3.条件满足时则执行对应的逻辑

synchronized(对象) {
	while(条件不满足时) {
    对象.wait();
  }
  // 处理逻辑
}
```

通知方

```java
1.获取对象的锁
2.改变条件
3.通知所有等待在对象上的线程
  
synchronized(对象) {
	改变条件
  对象.notifyAll();
}
```

#### 例子

**例子1**

```java
public class WaitNotify {
    static boolean flag = true;
    static Object  lock = new Object();

    public static void main(String[] args) throws Exception {
        Thread waitThread = new Thread(new Wait(), "WaitThread");
        waitThread.start();
        TimeUnit.SECONDS.sleep(1);

        Thread notifyThread = new Thread(new Notify(), "NotifyThread");
        notifyThread.start();
    }

    static class Wait implements Runnable {
        public void run() {
            // 加锁，拥有lock的Monitor
            synchronized (lock) {
                // 当条件不满足时，继续wait，同时释放了lock的锁
                while (flag) {
                    try {
                        System.out.println(Thread.currentThread() + " flag is true. wait @ "
                                           + new SimpleDateFormat("HH:mm:ss").format(new Date()));
                        lock.wait();
                    } catch (InterruptedException e) {
                    }
                }
                // 条件满足时，完成工作
                System.out.println(Thread.currentThread() + " flag is false. running @ "
                                   + new SimpleDateFormat("HH:mm:ss").format(new Date()));
            }
        }
    }

    static class Notify implements Runnable {
        public void run() {
            // 加锁，拥有lock的Monitor
            synchronized (lock) {
                // 获取lock的锁，然后进行通知，通知时不会释放lock的锁，
                // 直到当前线程释放了lock后，WaitThread才能从wait方法中返回
                System.out.println(Thread.currentThread() + " hold lock. notify @ " + new SimpleDateFormat("HH:mm:ss").format(new Date()));
                lock.notifyAll();
                flag = false;
                SleepUtils.second(5);
            }
            // 再次加锁
            synchronized (lock) {
                System.out.println(Thread.currentThread() + " hold lock again. sleep @ "
                                   + new SimpleDateFormat("HH:mm:ss").format(new Date()));
                SleepUtils.second(5);
            }
        }
    }
```

**例子2**

通过使用多个线程对0这个值操作，一个线程加1，一个线程减1，交替实现多次

```java
//第一步 创建资源类，定义属性和操作方法
class Share {
    //初始值
    private int number = 0;
    //+1的方法
    public synchronized void incr() throws InterruptedException {
        //第二步 判断 干活 通知
       // 错误写法：
       // if(number != 0) { //判断number值是否是0，如果不是0，等待		注意：此处写法会导致虚假换新问题，用while
            // this.wait(); //在哪里睡，就在哪里醒
        // }
      
        // 正确写法
      	while(number != 0) { //判断number值是否是0，如果不是0，等待
            this.wait(); //在哪里睡，就在哪里醒
        }
        //如果number值是0，就+1操作
        number++;
        System.out.println(Thread.currentThread().getName()+" :: "+number);
        //通知其他线程
        this.notifyAll();
    }

    //-1的方法
    public synchronized void decr() throws InterruptedException {
        //判断
        if(number != 1) {
            this.wait();
        }
        //干活
        number--;
        System.out.println(Thread.currentThread().getName()+" :: "+number);
        //通知其他线程
        this.notifyAll();
    }
}

public class ThreadDemo1 {
    //第三步 创建多个线程，调用资源类的操作方法
    public static void main(String[] args) {
        Share share = new Share();
        //创建线程
        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.incr(); //+1
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"AA").start();

        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.decr(); //-1
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"BB").start();
    }
}

// 结果
AA :: 1
BB :: 0
AA :: 1
BB :: 0
...
```

不能用if的原因

```
主要是虚拟唤醒导致：如果一个线程执行完毕后，通知其他线程，该线程又进入等待睡眠，可能会因为某些原因被唤醒后，if结构的语句就不会判断了，一直往下执行，所以需要将if换成while结构，每次都判断。因为wait在哪里睡眠就在哪里被唤醒，结果被某个异常唤醒了后回不去了，if结构不会在判断了，需要更改为while
```



### Condition

```java
package com.atguigu.lock;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

//第一步 创建资源类，定义属性和操作方法
class Share {
    private int number = 0;

    //创建Lock
    private Lock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    //+1
    public void incr() throws InterruptedException {
        //上锁
        lock.lock();
        try {
            //判断
            while (number != 0) {
                condition.await();
            }
            //干活
            number++;
            System.out.println(Thread.currentThread().getName()+" :: "+number);
            //通知
            condition.signalAll();
        }finally {
            //解锁
            lock.unlock();
        }
    }

    //-1
    public void decr() throws InterruptedException {
        lock.lock();
        try {
            while(number != 1) {
                condition.await();
            }
            number--;
            System.out.println(Thread.currentThread().getName()+" :: "+number);
            condition.signalAll();
        }finally {
            lock.unlock();
        }
    }
}

public class ThreadDemo2 {

    public static void main(String[] args) {
        Share share = new Share();
        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.incr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"AA").start();
        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.decr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"BB").start();

        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.incr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"CC").start();
        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    share.decr();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"DD").start();
    }

}
```



### 线程间定制化通信

**所谓定制化通信，需要让线程进行一定的顺序操作**

**案列**：启动三个线程，按照如下要求：
AA打印5此，BB打印10次，CC打印15次，一共进行10轮

**具体思路**：
每个线程添加一个标志位，是该标志位则执行操作，并且修改为下一个标志位，通知下一个标志位的线程

```java
//第一步 创建资源类
class ShareResource {
    //定义标志位
    private int flag = 1;  // 1 AA     2 BB     3 CC

    //创建Lock锁
    private Lock lock = new ReentrantLock();

    //创建三个condition
    private Condition c1 = lock.newCondition();
    private Condition c2 = lock.newCondition();
    private Condition c3 = lock.newCondition();

    //打印5次，参数第几轮
    public void print5(int loop) throws InterruptedException {
        //上锁
        lock.lock();
        try {
            //判断
            while(flag != 1) {
                //等待
                c1.await();
            }
            //干活
            for (int i = 1; i <=5; i++) {
                System.out.println(Thread.currentThread().getName()+" :: "+i+" ：轮数："+loop);
            }
            //通知
            flag = 2; //修改标志位 2
            c2.signal(); //通知BB线程
        }finally {
            //释放锁
            lock.unlock();
        }
    }

    //打印10次，参数第几轮
    public void print10(int loop) throws InterruptedException {
        lock.lock();
        try {
            while(flag != 2) {
                c2.await();
            }
            for (int i = 1; i <=10; i++) {
                System.out.println(Thread.currentThread().getName()+" :: "+i+" ：轮数："+loop);
            }
            //修改标志位
            flag = 3;
            //通知CC线程
            c3.signal();
        }finally {
            lock.unlock();
        }
    }

    //打印15次，参数第几轮
    public void print15(int loop) throws InterruptedException {
        lock.lock();
        try {
            while(flag != 3) {
                c3.await();
            }
            for (int i = 1; i <=15; i++) {
                System.out.println(Thread.currentThread().getName()+" :: "+i+" ：轮数："+loop);
            }
            //修改标志位
            flag = 1;
            //通知AA线程
            c1.signal();
        }finally {
            lock.unlock();
        }
    }
}

public class ThreadDemo3 {
    public static void main(String[] args) {
        ShareResource shareResource = new ShareResource();
        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    shareResource.print5(i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"AA").start();

        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    shareResource.print10(i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"BB").start();

        new Thread(()->{
            for (int i = 1; i <=10; i++) {
                try {
                    shareResource.print15(i);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        },"CC").start();
    }
}

```



### Thread.join()

#### 是什么？

```
Thread.join()是一个线程等待的方法，调用该方法的线程会等待目标线程执行完毕后再继续执行

join()方法通常用于等待其他线程执行完毕后再继续执行，例如在主线程中启动多个子线程，然后使用join()方法等待所有子线程执行完毕后再统一进行处理。
```

#### 怎么用？

例子: B等待A执行完后再执行

还可以使用CountDownLatch来实现

```java
// 创建线程A
Thread threadA = new Thread(() -> {
    // 线程A要执行的代码
});

// 创建线程B
Thread threadB = new Thread(() -> {
    // 等待线程A执行完毕
    try {
        threadA.join();
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    
    // 线程B要执行的代码
});

// 启动线程A和线程B
threadA.start();
threadB.start();

```

### ThreadLocal

#### 是什么？

```
ThreadLocal，即线程变量，表示线程的“局部变量”, 是一个以ThreadLocal对象为键、任意对象为值的存储结构。
它确保每个线程的ThreadLocal变量都是各自独立的；
ThreadLocal适合在一个线程的处理流程中保持上下文（避免了同一参数在所有方法中传递）；
```

#### 怎么用？

```java
static ThreadLocal<User> threadLocalUser = new ThreadLocal<>(); // 通常总是以静态字段初始化

void processUser(user) {
    try {
        threadLocalUser.set(user);
        step1();
        step2();
    } finally {
      	// 一定要在finally中清除
      	// 因为当前线程执行完相关代码后，很可能会被重新放入线程池中，如果ThreadLocal没有被清除，该线程执行其他代码时，会把上一次的状态带进去。
        threadLocalUser.remove();
    }
}

void step1() {
    User u = threadLocalUser.get();
    log();
    printUser();
}

void log() {
    User u = threadLocalUser.get();
    println(u.name);
}

void step2() {
    User u = threadLocalUser.get();
    checkUser(u.id);
}
```

**优化：自动释放**

例子：一个保存了当前用户名的`ThreadLocal`可以封装为一个`UserContext`对象：

```java
public class UserContext implements AutoCloseable {

    static final ThreadLocal<String> ctx = new ThreadLocal<>();

    public UserContext(String user) {
        ctx.set(user);
    }

    public static String currentUser() {
        return ctx.get();
    }

    @Override
    public void close() {
        ctx.remove();
    }
}
```

使用

```java
try (var ctx = new UserContext("Bob")) {
    // 可任意调用UserContext.currentUser():
    String currentUser = UserContext.currentUser();
} // 在此自动调用UserContext.close()方法释放ThreadLocal关联对象
```



## 5 线程应用实例

### 等待超时模式

调用一个方法时等待一段时间，如果该方法能够在给定的时间之内得到结果，直接返回；反之，超时返回默认结果。

```java
    public synchronized Object get(long mills) {
        long future = System.currentTimeMillis() + mills;
        long remaining = mills;
        while(result == null && remaining > 0) {
            wait(remaining);
            remaining = future - System.currentTimeMillis();
        }

        return result;
    }
```



### 数据库连接池示例

描述

```
使用等待超时模式构建一个简单的数据库连接池，模拟从连接池中获取、使用和释放连接的过程。
客户端获取连接的过程被设定为等待超时的模式，1000ms内无法获取可用连接返回null。
连接池大小为10，通过调用客户端的连线数来模拟无法获取连接的场景。
```

连接池 `ConnectionPool.java`

```java
package ConnectionPool;

import java.sql.Connection;
import java.util.LinkedList;

public class ConnectionPool {

    private LinkedList<Connection> pool = new LinkedList<>();

    public ConnectionPool(int initialSize) {
        if(initialSize <= 0) return;
        for(int i = 0; i < initialSize; i++) {
            pool.addLast(ConnectionDriver.createConnection());
        }
    }

    public void releaseConnection(Connection connection) {
        if(connection == null) return;
        synchronized(pool) {
            // 添加后需要进行通知，这样其他消费者能够感知到链接池中已经归还了一个链接
            pool.addLast(connection);
            pool.notifyAll();
        }
    }

    // 在mills内无法获取到连接，将会返回null
    public Connection fetchConnection(long mills) throws InterruptedException {
        synchronized(pool) {
            // 完全超时
            if(mills <= 0) {
                while(pool.isEmpty()) {
                    pool.wait();
                }

                return pool.removeFirst();
            } else {
                long future = System.currentTimeMillis() + mills;
                long remaining = mills;
                while(pool.isEmpty() && remaining > 0) {
                    pool.wait(remaining);
                    remaining = future - System.currentTimeMillis();
                }

                Connection result = null;
                if(!pool.isEmpty()) {
                    result = pool.removeFirst();
                }
                return result;
            }
        }
    }
}
```

数据库连接驱动器

```java
package ConnectionPool;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.util.concurrent.TimeUnit;

/**
 * 这段代码主要实现了一个Connection的代理类。在Connection的代理类中，如果调用的方法是commit方法，就会休眠100毫秒。最后，代理类返回的结果是null。
 *
 * 这段代码的作用是模拟一个数据库连接的commit操作，以及在commit操作时的休眠效果。
 * 通常情况下，数据库的commit操作需要一定的时间才能完成，因此在实际应用中需要通过代理类来模拟commit操作的耗时。
 * 这样就能更好地测试代码在多线程环境下的可靠性。
 *
 * 这段代码的关键在于使用了代理类来实现Connection的commit操作。
 * 在代理类中，如果调用的方法是commit方法，就会休眠100毫秒。
 * 这种方式可以模拟commit操作需要一定的时间才能完成的情况。
 * 同时，由于代理类返回的结果是null，因此在测试时需要根据实际情况进行判断。
 */
public class ConnectionDriver {

    static class ConnectionHandler implements InvocationHandler {
        // @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            if (method.getName().equals("commit")) {
                TimeUnit.MILLISECONDS.sleep(100);
            }
            return null;
        }
    }


    // 创建一个Connection的代理，在commit时休眠1秒
    public static final Connection createConnection() {
        return (Connection) Proxy.newProxyInstance(
                ConnectionDriver.class.getClassLoader(),
                new Class<?>[]{Connection.class},
                new ConnectionHandler()
        );
    }
}

```

测试

```java
package ConnectionPool;

import java.sql.Connection;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;


public class ConnectionPoolTest {
    static ConnectionPool pool = new ConnectionPool(10);
    static CountDownLatch start = new CountDownLatch(1);    // 相当于一个总开关，线程开启后阻塞在同一个地方，开启后所有线程统一执行
    static CountDownLatch end;      // 打印日志的总开关，待所有线程执行解释后，再输出日志

    static class ConnetionRunner implements Runnable {
        int count;                  // 要起的线程数
        AtomicInteger got;          // 记录获取到连接的数量
        AtomicInteger notGot;       // 记录获取不到连接的数量

        public ConnetionRunner(int count, AtomicInteger got, AtomicInteger notGot) {
            this.count = count;
            this.got = got;
            this.notGot = notGot;
        }

        public void run() {
            try {
                start.await();  // 线程启动时先统一阻塞到该处，start.countDown();后统一执行
            } catch (Exception ex) {

            }
            while (count > 0) {
                try {
                    // 从线程池中获取连接，如果1000ms内无法获取到，将会返回null
                    // 分别统计连接获取的数量got和未获取到的数量notGot
                    Connection connection = pool.fetchConnection(1000);
                    if (connection != null) {
                        try {
                            connection.createStatement();
                            connection.commit();
                        } finally {
                            pool.releaseConnection(connection);
                            got.incrementAndGet();
                        }
                    } else {
                        notGot.incrementAndGet();
                    }
                } catch (Exception ex) {
                } finally {
                    count--;
                }
            }
            end.countDown();
        }
    }

    public static void main(String[] args) throws Exception {
        // 线程数量，可以线程数量进行观察
        int threadCount = 50;
        end = new CountDownLatch(threadCount);
        int count = 20;
        AtomicInteger got = new AtomicInteger();
        AtomicInteger notGot = new AtomicInteger();
        for (int i = 0; i < threadCount; i++) {
            Thread thread = new Thread(new ConnetionRunner(count, got, notGot), "ConnectionRunnerThread");
            thread.start();
        }
        start.countDown();
        end.await();        // 50个线程执行完之后，才开始输出日志
        System.out.println("total invoke: " + (threadCount * count));
        System.out.println("got connection:  " + got);
        System.out.println("not got connection " + notGot);
    }

}

```

运行结果

```
total invoke: 1000
got connection:  826
not got connection 174
```

