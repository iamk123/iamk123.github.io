# Java中的并发工具类

## CountDownLatch

### 是什么？有什么用？

```

```



### 使用案例：模拟解析Excel里的多个sheel的数据

join()实现

```java
public class JoinCountDownLatchTest {

    public static void main(String[] args) throws InterruptedException {
        Thread parser1 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });

        Thread parser2 = new Thread(()->{
            System.out.println(Thread.currentThread().getName());
        }, "parser2");

        parser1.start();
        parser2.start();
        parser1.join();
        parser2.join();
    }
}
```

CountDownLatch实现

```java
public class CountDownLatchTest {

    static CountDownLatch c = new CountDownLatch(2);

    public static void main(String[] args) throws InterruptedException {
        new Thread(()->{
            System.out.println(1);
            c.countDown();
            System.out.println(2);
            c.countDown();
        }).start();

        c.wait();
        System.out.println(3);
    }
}
```



## 同步屏障CyclicBarrier

### 是什么？

```
CyclicBarrier是Java中的一个同步辅助类，它可以让一组线程在某个屏障点处相互等待，然后同时继续执行。
它的主要作用是实现线程间的同步，确保多个线程在某个点上达到同步状态后再同时执行后续操作。

CyclicBarrier的构造函数可以指定一个参与同步的线程数量，当有足够数量的线程调用了CyclicBarrier的await()方法后，所有线程都会被释放，并继续执行后续的任务。

CyclicBarrier适用于需要等待所有线程都到达某个状态后再同时执行后续操作的场景，常见的应用包括多线程计算任务的结果合并、分布式系统中任务的协调与等待等。
```

### 使用方法

`CyclicBarrier(int parties)`

`parties表示屏障拦截的线程数量`

```java
public class CyclicBarrierTest {

    static CyclicBarrier c = new CyclicBarrier(2);	

    public static void main(String[] args) {
        new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    c.await();		// 调用await告诉CyclicBarrier已经到达屏障，然后阻塞；两个线程执行c.await()才继续执行
                } catch (Exception e) {

                }
                System.out.println(1);
            }
        }).start();

        try {
            c.await();
        } catch (Exception e) {

        }
        System.out.println(2);
    }
}
```

`CyclicBarrier(int parties, Runnable barrierAction)`

`barrierAction表示到达屏障时优先执行的线程`

```java
public class CyclicBarrierTest2 {

    static CyclicBarrier c = new CyclicBarrier(2, new A());

    public static void main(String[] args) {
        new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    c.await();
                } catch (Exception e) {

                }
                System.out.println(1);
            }
        }).start();

        try {
            c.await();
        } catch (Exception e) {

        }
        System.out.println(2);
    }

    static class A implements Runnable {

        @Override
        public void run() {
            System.out.println(3);
        }

    }

}
```

### 应用场景

```
CyclicBarrier适用于需要等待所有线程都到达某个状态后再同时执行后续操作的场景，常见的应用包括多线程计算任务的结果合并、分布式系统中任务的协调与等待等。
```

```
例子：用一个Excel保存了用户的所有银行流水，每个Sheet保存一个账户近一年的每笔银行流水，现在需要统计用户的日均银行流水：
1 先用多线程处理每个sheet里的银行流水，都执行完后，得到每个sheet的日均银行流水
2 barrierAction用这些线程的计算结果，计算出整个Excel的日均银行流水
```

```java
import java.util.concurrent.*;
import java.util.Map.Entry;

public class BankWaterService implements Runnable {

    /* 创建4个屏障，处理完之后执行当前类的run方法 */
    private CyclicBarrier c = new CyclicBarrier(4, this);

    /* 假设有4个sheet， 所以只需要启动4个线程 */
    private Executor executor = Executors.newFixedThreadPool(4);

    /* 保存每个sheet计算出的银流结果 */
    private ConcurrentHashMap<String, Integer> sheetBankWaterCount = new ConcurrentHashMap<>();

    private void count() {
        for(int i = 0; i < 4; i++) {
            executor.execute(()->{
                // 计算当前sheet的银流数据，计算代码省略
                sheetBankWaterCount.put(Thread.currentThread().getName(), 1);

                // 银流计算完成，插入一个屏障
                try {
                    c.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            });
        }
    }

    public void run() {
        int result = 0;
        // 汇总每个sheet计算出的结果
        for(Entry<String, Integer> sheet : sheetBankWaterCount.entrySet()) {
            result += sheet.getValue();
        }

        // 将结果输出
        sheetBankWaterCount.put("result: ", result);
        System.out.println(result);
    }

    public static void main(String[] args) {
        BankWaterService bankWaterService = new BankWaterService();
        bankWaterService.count();
    }
}
```

## CountDownLatch和CyclicBarrier的区别

```
1.使用方式：CyclicBarrier用于一组线程中的多个线程等待彼此达到一个共同的屏障点后再同时继续执行；而CountDownLatch用于一个线程或多个线程等待其他线程完成某个操作后再继续执行。

2.循环使用性：CyclicBarrier是可重用的，可以在多个循环中使用。当所有参与线程都到达屏障点后，CyclicBarrier会重置并可以再次使用；而CountDownLatch是一次性的，一旦计数器归零，就不能再次使用。

3.参与线程数量：CyclicBarrier可以在创建时指定参与同步的线程数量，可以灵活地适应不同的场景需求；而CountDownLatch的计数器是固定的，一旦创建就无法修改。

4.屏障动作：CyclicBarrier可以指定在所有线程到达屏障点时执行一个可选的屏障动作（Runnable）；而CountDownLatch没有提供屏障动作的功能。

5.同步点的性质：CyclicBarrier是同步点，所有线程在此等待，直到所有线程都达到同步点才能继续执行；而CountDownLatch只是一个等待点，线程等待计数器变为0后就可以继续执行。
```

“一组线程中的多个线程等待彼此达到一个共同的屏障点后再同时继续执行” 和 “一个线程或多个线程等待其他线程完成某个操作后再继续执行”有啥区别

```
这两个描述之间的区别在于等待的对象和等待的条件。

在CyclicBarrier中，一组线程中的多个线程等待彼此达到一个共同的屏障点后再同时继续执行。这意味着每个线程在达到屏障点之前都会阻塞等待其他线程的到来。只有当所有线程都到达屏障点后，它们才会同时继续执行后续操作。

而在CountDownLatch中，一个线程或多个线程等待其他线程完成某个操作后再继续执行。这意味着某个线程或多个线程会调用CountDownLatch的await()方法进行等待，直到其他线程完成特定操作并调用CountDownLatch的countDown()方法将计数器减少到0，等待的线程才会被唤醒并继续执行。

总的来说，CyclicBarrier用于多个线程之间相互等待达到一个共同的屏障点，而CountDownLatch用于一个或多个线程等待其他线程完成某个操作。CyclicBarrier是多线程间的同步，而CountDownLatch是线程间的等待和通信。
```

## 控制并线程数的semaphore

### 是什么？使用场景？

```
Semaphore（信号量）是Java中的一个同步工具类，用于控制同时访问某个资源的线程数量。

Semaphore维护了一组许可（permits），线程在访问资源之前必须先获取许可，如果许可数大于0，则线程可以获取许可并继续执行；如果许可数等于0，则线程必须等待，直到有其他线程释放许可。
```

### 主要特点

```
Semaphore的主要特点包括：

1.许可数量：Semaphore可以指定初始化时的许可数量，表示可以同时访问某个资源的线程数量。

2.许可获取和释放：线程可以通过acquire()方法获取许可，如果许可数大于0，则线程可以继续执行；否则，线程会被阻塞等待。线程在使用完资源后，需要通过release()方法释放许可，以供其他线程使用。

3.公平性：Semaphore可以选择是否使用公平的获取许可的策略。如果设置为公平模式，那么等待时间最长的线程将优先获得许可。
```

### 使用场景

```
Semaphore适用于控制对某个资源的并发访问数量，例如限制数据库连接数、限制线程池的线程数等场景。通过合理地控制许可数量，可以避免资源过度竞争和线程的过度并发，从而保证系统的稳定性和性能。
```

### 使用方式

```java
public class SemaphoreTest {

    private static final int       THREAD_COUNT = 30;		// 线程数

    private static ExecutorService threadPool   = Executors.newFixedThreadPool(THREAD_COUNT);

    private static Semaphore       s            = new Semaphore(10);		// 最大并发数

    public static void main(String[] args) {
        for (int i = 0; i < THREAD_COUNT; i++) {
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        s.acquire();	// 获取许可证
                        System.out.println("save data");
                        s.release();	// 释放许可证
                    } catch (InterruptedException e) {
                    }
                }
            });
        }

        threadPool.shutdown();
    }
}

```



## 线程间交换数据的Exchanger

### 是什么？

```
Exchanger（交换器）是Java中的一个同步工具类，用于两个线程之间进行数据交换。

Exchanger提供一个点，两个线程可以通过该点交换数据。其中，一个线程会调用exchange()方法来等待另一个线程到达交换点，并将自己的数据传递给另一个线程。当两个线程都到达交换点时，它们会交换数据，并继续执行后续操作。
```

### 主要特点

```
1.数据交换：两个线程可以在交换点交换数据，通过exchange()方法来进行数据的发送和接收。

2.线程同步：交换操作是同步的，即当一个线程调用exchange()方法时，如果另一个线程未到达交换点，则会阻塞等待，直到另一个线程到达交换点为止。

3.数据一致性：通过Exchanger交换的数据可以保证在两个线程之间是一致的，即发送方线程传递的数据会被接收方线程接收到。
```

### 应用场景

```
Exchanger适用于需要两个线程之间进行数据交换的场景，例如线程间的数据传递、协作计算等。通过Exchanger，可以实现线程之间的数据共享和协作，从而提高并发编程的灵活性和效率。
```

### 使用方式

例子：将纸质银行流水通过人工方式录入成电子银行流水，为了避免错误，采用AB岗两人进行录入，录入到Excel后，系统需要加载这两个Excel，并对数据进行校对，看录入是否一致。

```java
public class ExchangerTest {

    private static final Exchanger<String> exgr       = new Exchanger<String>();

    private static ExecutorService         threadPool = Executors.newFixedThreadPool(2);

    public static void main(String[] args) {

        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String A = "银行流水A";// A录入银行流水数据
                    exgr.exchange(A);
                } catch (InterruptedException e) {
                }
            }
        });

        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String B = "银行流水B";// B录入银行流水数据
                    String A = exgr.exchange("B");
                    System.out.println("A和B数据是否一致：" + A.equals(B) + "，A录入的是：" + A + "，B录入是：" + B);
                } catch (InterruptedException e) {
                }
            }
        });

        threadPool.shutdown();

    }
}
```

