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



### 如何设置线程数

```
（1）CPU密集型任务：
	- 主要消耗CPU资源，而不涉及IO操作，因此线程数的设置应该尽量与CPU核心数保持一致。
	- 一般推荐将核心线程数设置为CPU核心数 + 1，
	- 可以可以充分利用CPU的计算能力，并且提供一个额外的线程用于防止CPU饥饿
	
（2）IO密集型任务：
	- 这类任务在进行IO操作时会占用比较多时间。因此可以适当增加线程池的核心线程数。
	- 一般推荐将核心线程数设置为CPU核心数 x 2.
	- 这样可以让CPU在等待IO的时候有其他线程去处理别的任务，充分利用CPU的时间
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

shutdown()
(1) 它将使执行器停止接受新任务，但它将继续执行所有已提交的任务
(2) 所有在调用shutdown()方法时在执行器中排队但尚未开始执行的任务也将执行。
(3) 所有在调用shutdown()方法时在执行器中排队但尚未开始执行的任务也将执行。

shutdownNow()
(1) 它将尝试停止所有正在执行的活动任务、暂停处理尚未开始执行的任务，并返回一个包含那些未开始执行的任务的列表。
(2) 它不保证能够停止正在处理的任务，但会尽最大努力尝试这样做。


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







# Executor框架

## 概述

### 是什么？

```
Executor 框架是 Java 并发编程中提供的一个高级工具，用于简化多线程编程中线程的管理和任务的执行。它提供了一组接口和类，用于创建和管理线程池，提交任务，执行任务，并处理任务的完成结果。
```

### 已经有了线程池，为什么还需要Executor？

```
我们知道线程池就是线程的集合，线程池集中管理线程，以实现线程的重用，降低资源消耗，提高响应速度等。线程用于执行异步任务，单个的线程既是工作单元也是执行机制，从JDK1.5开始，为了把工作单元与执行机制分离开，Executor框架诞生了，他是一个用于统一创建与运行的接口。Executor框架实现的就是线程池的功能。
```

## Executor框架的结构

```
Executor框架包括3大部分：
（1）任务。也就是工作单元，包括被执行任务需要实现的接口：Runnable接口或者Callable接口；
（2）任务的执行。也就是把任务分派给多个线程的执行机制，包括Executor接口及继承自Executor接口的ExecutorService接口。
（3）异步计算的结果。包括Future接口及实现了Future接口的FutureTask类。

```

### Executor框架的成员及其关系

![Java并发——Executor框架详解_Java并发](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/07/15515716940731171694073117712dRkPoT-22181516840738951684073895234TFvjIo-resize,m_fixed,w_1184-20230514221815144.jpg)

### Executor框架的使用示意图

![Java并发——Executor框架详解_线程池_02](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/07/15515716940731171694073117988YSmcyg-22184616840739261684073926767ZzkXVL-resize,m_fixed,w_1184-20230514221846665.jpg)

### 使用步骤

1.**创建 Executor 实例**：

根据需要选择合适的 Executor 实现类来创建 Executor 实例。常见的实现类有 `ThreadPoolExecutor`、`ScheduledThreadPoolExecutor` 等。可以使用它们的构造函数或者工厂方法来创建 Executor 实例。

```java
// 创建ThreadPoolExecutor示例。 ThreadPoolExecutor可以替换为其父类ExecutorService 或 Executor
ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
    2,  // 核心线程数
    5,  // 最大线程数
    1,  // 空闲线程存活时间
    TimeUnit.SECONDS,  // 时间单位
    new LinkedBlockingQueue<>() // 任务队列
);


// 创建 ScheduledExecutorService 实例
ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);
```

2.**创建任务**：创建待执行的任务，可以实现 `Runnable` 接口或 `Callable` 接口，具体根据业务需求来定义任务的逻辑。

```java
// Runnable 无返回值
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Hello")
    }
}

// Callable 有返回值
class callableTest implements Callable<String >{
  	@Override
  	public String call() {
      return "Hello";
   }
}
```

3.**提交任务**：使用 Executor 实例的 `execute(Runnable)` 方法或 `submit(Callable)` 方法将任务提交给 Executor 执行。`execute` 方法适用于不需要获取任务执行结果的情况，而 `submit` 方法适用于需要获取任务执行结果的情况。

```java
// 提交Runnable任务
executor.execute(runnaleTask);

// 提交Callable任务
executor.submit(callableTask);
```

4.**等待任务执行完成**（可选）：根据需要，可以使用 `Future` 对象来等待任务执行完成并获取任务的执行结果。`submit` 方法返回一个 `Future` 对象，可以使用它的 `get()` 方法来阻塞等待任务执行完成并获取结果。

```java
// 提交任务给 Executor 执行，并获取 Future 对象
Future<String> future = executor.submit(callableTask);

// 等待任务执行完成并获取结果
try {
    String result = future.get();		// get会阻塞等人任务完成
    System.out.println("Task Result: " + result);
} catch (Exception e) {
    e.printStackTrace();
}
```

5.**关闭 Executor**：在不再需要执行新任务时，需要显式地关闭 Executor。可以调用 Executor 的 `shutdown()` 方法来平滑地关闭 Executor，它会等待所有已提交的任务执行完成后再关闭 Executor。也可以调用 `shutdownNow()` 方法来立即关闭 Executor，它会尝试中断正在执行的任务并返回尚未执行的任务列表。

```java
// 方式1
executor.shutdown();

// 方式2
executor.shutdownNow();
```

### Executor框架成员

<img src="https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/07/15515816940731181694073118285HcH1eD-131438168412767816841276789411OIKxd-20180318215737261.jpeg" alt="img" style="zoom: 67%;" />

#### ThreadPoolExecutor

```
SingleThreadExecutor
FixedThreadPool
CachedThreadPool
```



##### SingleThreadExecutor

作用 & 场景

```
（1）这是一个只有一个线程的线程池。这可以确保所有任务都在一个线程中按顺序完成

创建一个使用单个worker线程的 Executor，以无界队列方式来运行该 线程。
（注意，如果因为在关闭前的执行期间出现失败而终止了此单个线程， 那么如果需要，一个新线程将代替它执行后续的任务）。
可保证顺序地执行各 个任务，并且在任意给定的时间不会有多个线程是活动的。
与其他等效的 newFixedThreadPool 不同，可保证无需重新配置此方法所返回的执行程序即可使用其他的线程。

适用于需要保证顺序执行各个任务，并且在任意时间点，不会同时有多个 线程的场景
```

特点

```
线程池中最多执行 1 个线程，之后提交的线程活动将会排在队列中以此 执行
```

创建方式

```java
ExecutorService executor = Executors.newSingleThreadExecutor();
```

源码

```java
public static ExecutorService newSingleThreadExecutor() { 
    return new ThreadPoolExecutor(
        1, 
        1, 
        0L, 
        TimeUnit.SECONDS, 
        new LinkedBlockingQueue<>(), 
        Executors.defaultThreadFactory(), 
        new ThreadPoolExecutor.AbortPolicy()
    );
}
```



##### FixedThreadPool

作用 & 场景

```
（1）该线程池在创建时就固定了线程的数量，即使某些线程当前没有任务执行，它们也会被保持活跃状态。
（2）如果提交的任务数少于线程池的线程数量，那么每个任务将立刻由一个独立的线程来执行。
（3）如果任务数超过线程数量，额外的任务将被放在一个队列中等待，一旦有线程空闲就会从队列中取出任务来执行。


适用于可以预测线程数量的业务中，或者服务器负载较重，对线程数有严 格限制的场景
```

特点

```
特征：
（1）线程池中的线程处于一定的量，可以很好的控制线程的并发量
（2）线程可以重复被使用，在显示关闭之前，都将一直存在
（3）超出一定量的线程被提交时候需在队列中等待
```

创建方式

```java
ExecutorService executor = Executors.newFixedThreadPool(nThreads);
```

源码

```java
public static ExecutorService newFixedThreadPool() { 
    return new ThreadPoolExecutor(
      10, 
      10, 
      0L, 
      TimeUnit.SECONDS, 
      new LinkedBlockingQueue<>(), 
      Executors.defaultThreadFactory(), 
      new ThreadPoolExecutor.AbortPolicy()
    );
}
```



##### CachedThreadPool

作用 & 场景

```
（1）创建一个可缓存线程池，该线程池最初没有任何线程。
（2）当一个任务被提交时，线程池会尝试使用现有的空闲线程来执行该任务。
（3）如果所有线程都在执行任务（或没有线程），它将创建一个新的线程来执行这个任务。
（4）如果某个线程在一段时间内没有执行任何任务，它将被回收，从而减少系统资源的占用。
```

特点

```
线程池中数量没有固定，可达到最大值（Interger. MAX_VALUE）
线程池中的线程可进行缓存重复利用和回收（回收默认时间为 1 分钟）
当线程池中，没有可用线程，会重新创建一个线程
```

创建方式

```
ExecutorService executor = Executors.newCachedThreadPool();
```

源码

```java
public static ExecutorService newCachedThreadPool(){ 
  return new ThreadPoolExecutor(
    0, 
    Integer.MAX_VALUE, 
    60L, 
    TimeUnit.SECONDS, 
    new SynchronousQueue<>(), 
    Executors.defaultThreadFactory(), 
    new ThreadPoolExecutor.AbortPolicy()
  );
}
```



#### ScheduledThreadPoolExecutor

##### ScheduledThreadPoolExecutor

##### SingleThreadScheduledExecutor



#### ForkJoinPool

```
这是一个支持大规模并发任务的线程池，它主要用于“分而治之”的任务，即任务可以分解为更小的子任务并行执行。
```





