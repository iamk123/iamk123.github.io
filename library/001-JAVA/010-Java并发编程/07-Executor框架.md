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

![Java并发——Executor框架详解_Java并发](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/14/22181516840738951684073895234TFvjIo-resize,m_fixed,w_1184-20230514221815144.jpg)

### Executor框架的使用示意图

![Java并发——Executor框架详解_线程池_02](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/14/22184616840739261684073926767ZzkXVL-resize,m_fixed,w_1184-20230514221846665.jpg)

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

<img src="https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/15/131438168412767816841276789411OIKxd-20180318215737261.jpeg" alt="img" style="zoom: 67%;" />

#### ThreadPoolExecutor

##### FixedThreadPool

作用 & 场景

```
创建一个可重用固定线程数的线程池，以共享的无界队列方式来运行这 些线程。在任意点，在大多数线程会处于处理任务的活动状态。如果在所有线 程处于活动状态时提交附加任务，则在有可用线程之前，附加任务将在队列中 等待。如果在关闭前的执行期间由于失败而导致任何线程终止，那么一个新线 程将代替它执行后续的任务（如果需要）。在某个线程被显式地关闭之前，池 中的线程将一直存在。

适用于可以预测线程数量的业务中，或者服务器负载较重，对线程数有严 格限制的场景
```

特点

```
特征：
• 线程池中的线程处于一定的量，可以很好的控制线程的并发量
• 线程可以重复被使用，在显示关闭之前，都将一直存在
• 超出一定量的线程被提交时候需在队列中等待
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

##### SingleThreadExecutor

作用 & 场景

```
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



##### CachedThreadPool

作用 & 场景

```
创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空 闲线程，若无可回收，则新建线程

适用于创建一个可无限扩大的线程池，服务器负载压力较轻，执行时间较短，任务多的场景
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



#### Future接口 & FutureTask类



#### Runnable接口和Callable接口



#### Executors工厂类

```
提供了常见配置线程池的方法，因为ThreadPoolExecutor的参数众多且意义重大，为了避免配置出错，才有了Executors工厂类。
```

