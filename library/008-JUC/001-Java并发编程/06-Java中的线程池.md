# Java中的线程池

## 线程池概述

### 是什么？

```
Java中的线程池是一种用于管理和复用线程的机制，它可以有效地管理线程的创建、销毁和复用，从而提高应用程序的性能和资源利用率。

Java中的线程池是通过Executor框架来实现的，主要包括以下几个核心组件：
1.Executor接口：
	定义了线程池的执行方法，用于提交任务。
2.ExecutorService接口：
	继承自Executor接口，提供了更丰富的线程池操作方法，例如任务提交、任务执行状态管理、线程池的关闭等。
2.ThreadPoolExecutor类：
	是Java中默认的线程池实现类，实现了ExecutorService接口。它提供了可配置的线程池，可以根据需要自定义线程池的核心线程数、最大线程数、线程空闲时间等参数。
```

### 优点

```
（1）减少线程创建和销毁开销：线程池可以重用已创建的线程，避免了频繁创建和销毁线程的开销。
（2）控制并发度：线可以限制并发线程的数量，通过控制核心线程数、最大线程数和任务队列的大小来控制线程池的并发度，避免系统资源被过度占用。
（3）提高响应速度：可以更快地获取到可用线程，从而更快地处理任务。
（4）统一管理：线程池可以统一管理线程的生命周期、状态和执行结果，方便任务的提交、取消和获取执行结果。
```



## 实现原理

![image-20230513125820492](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/13/12582016839539001683953900698IOTwhM-image-20230513125820492.png)

![image-20230513125913452](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/13/12591316839539531683953953567PnBFMg-image-20230513125913452.png)

工作流程：
```
1 创建线程池时，线程池中线程数为0
2 调用execute()添加一个请求任务时：
	2.1 当前运行线程数 < corePoolSize   ==> 创建新线程执行任务（执行这一步需要获取全局锁）
	2.2 当前运行线程数 >= corePoolSize  ==> 将任务加入BlockingQueue
	2.3 如果BlockingQueue已满 & 正在运行线程数 < maximumPoolSize	 ==> 创建非核心线程处理任务（执行这一步需要获取全局锁）
	2.4 如果BlockingQueue已满 & 正在运行线程数 >= maximumPoolSize  ==> 按照饱和拒绝策略执行
3 当工作线程执行完任务后，会从队列中取出任务执行；如果没有待执行的任务，则线程进入空闲状态，等待新的任务分配。
4 当一个线程空闲超过一定时间（keepAliveTime）：
	4.1 当前运行线程数 >= corePoolSize		==> 停掉线程
	4.2 线程池的所有任务执行完成，会收缩到corePoolSize的大小
```

## 线程池的使用

### 拒绝策略

```
（1）CallerRunsPolicy: 使用调用者所在线程直接运行任务。一般并发比较小，性能要求不高，不允许失败。但是由于调用者自己运行任务，如果任务提交速度过快，可能导致程序阻塞，性能上损失较大。
（2）AbortPolicy（默认）: 抛出拒绝执行RejectedExecutionException异常来拒绝任务。必须处理好抛出的异常，否则会打断当前执行流程，影响后续的任务执行
（3）DiscardPolicy: 直接丢弃。
（4）DiscardOldestPolicy: 丢弃阻塞队列中等待时间最久的任务，并加入新任务
```

### 线程池的创建

方式一：通过`ThreadPoolExecutor`构造函数来创建（推荐）

```java
new ThreadPoolExecutor (
    corePoolSize, 		// 线程池的核心线程数
    maximumPoolSize,  // 能容纳的最大线程数
    keepAliveTime, 		// 空闲线程存活时间
    unit, 						// 时间单位
    workQueue, 				// 任务队列，用来储存等待执行任务的队列
    threadFactory, 		// 创建线程的工厂类
    handler						// 等待队列满后的拒绝策略
  );
```

方式二：通过 `Executor` 框架的工具类 `Executors` 来创建。

```
（1）SingleThreadExecutor：只有一个线程
（2）FixedThreadPool：固定线程数量
（3）CachedThreadPool：可根据实际情况调整线程数量
（4）ScheduledThreadPool：该方法返回一个用来在给定的延迟后运行任务或者定期执行任务的线程池。
```

### 线程池常用的阻塞队列有哪些？

```

```



### 向线程池提交任务

#### 方式一：execute()

```java
// 用于提交不需要返回值的任务，无法判断任务是否被线程池执行成功
threadsPool.execute(new Runnable() {
  public void run() {
    
  }
})
```

#### 方式二：submit()

```java
// 用于提交需要返回值的任务。
// 线程池会返回一个future类型的对象，通过这个对象可以判断任务是否执行成功，并且可以通过future的get()方法来获取返回值，get()方法会阻塞当前线程知道任务完成; 通过get(long timeout, TimeUnit unit)方法则会阻塞当前线程一段时间后立即返回，这时候任务可能没有执行完。
Future(Object) future = executor.submit(harReturnValuetask);
try {
	Object s- future.get();
} catch (InterruptedExeception e) {
  // 处理中断异常
} catch(ExecutionException e) {
  // 处理无法执行任务异常
} finally {
  // 关闭线程池
  executor.shutdown();
}

```

### 关闭线程池

```
可以调用线程池的shutdown或shutdownNow方法来关闭线程池。

原理：
它们的原理都是遍历线程池中工作线程，逐个调用线程中的interrupt方法来中断，所以无法响应中断的任务可能永远无法停止。

区别：
shutdownNow先将线程池的状态设置为STOP，然后尝试停止所有正在执行或暂停任务的线程，并返回等待执行任务的列表。
shutdown只是将线程池的状态设置为SHUTDOWN状态，然后中断所有没有正在执行任务的线程

共同点：
调用任意一个关闭方法，isShutdown方法就会返回true。
当所有的任务都已经关闭后，才表示线程池关闭成功，调用isTerminaed方法会返回true。

如何选择：
通常调用shutdown来关闭线程池，如果任务不一定要执行完，则可以选择shutdownNow方法。
```



### 为什么不允许 Executors.的方式手动创建线程池

![image-20230514202727417](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/14/20272716840672471684067247591WgZgej-image-20230514202727417.png)

```
（1）通过ThreadPoolExecutor创建及其七个参数，可以让其他人能更加明确线程池的运行规则，规避资源耗尽的风险
（2）通过Executors创建的线程池会存在一些隐患
		- FixedThreadPool和SingleThreadPool:允许「请求队列长度」为Integer.MAX_VALUE, 可能会堆积大量请求，导致OOM
		- CachedThreadPool和ScheduledThreadPool：允许「创建线程数量」为Integer.MAX_VALUE, 可能会创建大量的线程，从而导致OOM
```



### 入门案例

```
场景：火车站3个售票口，10个用户买票
```

```java
package ThreadPool;

import java.util.concurrent.*;

public class ThreadPoolDemo1 {

    public static void main(String[] args) {
        // 定义线程池，线程数量为3，模拟3个窗口
        ExecutorService threadService = new ThreadPoolExecutor(
                3,
                3,
                60L,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.DiscardOldestPolicy()
        );

        // 10个人买票
        try {
            for(int i = 1; i <= 10; i++) {
                threadService.execute(()->{
                    try {
                        System.out.println(Thread.currentThread().getName() + "窗口，开始卖票");
                        Thread.sleep(5000);
                        System.out.println(Thread.currentThread().getName() + "窗口，买票结束");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 完成后结束
            threadService.shutdown();
        }
    }
}

// 输出
pool-1-thread-1窗口，开始卖票
pool-1-thread-3窗口，开始卖票
pool-1-thread-2窗口，开始卖票
pool-1-thread-3窗口，买票结束
pool-1-thread-1窗口，买票结束
pool-1-thread-3窗口，开始卖票
pool-1-thread-1窗口，开始卖票
pool-1-thread-2窗口，买票结束
pool-1-thread-2窗口，开始卖票
pool-1-thread-3窗口，买票结束
pool-1-thread-3窗口，开始卖票
pool-1-thread-1窗口，买票结束
pool-1-thread-1窗口，开始卖票
pool-1-thread-2窗口，买票结束
pool-1-thread-2窗口，开始卖票
pool-1-thread-1窗口，买票结束
pool-1-thread-1窗口，开始卖票
pool-1-thread-2窗口，买票结束
pool-1-thread-3窗口，买票结束
pool-1-thread-1窗口，买票结束
```

