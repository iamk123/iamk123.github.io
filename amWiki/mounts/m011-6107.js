if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m011']=[{"name":"04-内存管理.md","path":"011-操作系统/04-内存管理.md","content":"### 常见的内存管理方式有哪些？\n\n```\n（1）内存的分配与回收：对进程所需的内存进行分配和释放，malloc 函数：申请内存，free 函数：释放内存。\n（2）地址转换：将程序中的虚拟地址转换成内存中的物理地址。\n（3）内存扩充：当系统没有足够的内存时，利用虚拟内存技术或自动覆盖技术，从逻辑上扩充内存。\n（4）内存映射：将一个文件直接映射到进程的进程空间中，这样可以通过内存指针用读写内存的办法直接存取文件内容，速度更快。\n（5）内存优化：通过调整内存分配策略和回收算法来优化内存使用效率。\n（6）内存安全：保证进程之间使用内存互不干扰，避免一些恶意程序通过修改内存来破坏系统的安全性。\n\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-02.html#内存管理主要做了什么\n```\n\n\n\n### 常见的内存管理方式有哪些？\n\n```\n内存管理方式可以简单分为下面两种：\n（1）连续内存管理：将内存划分为固定大小的块，然后根据程序的需要分配和释放内存。这种方式容易产生内存碎片问题，包括外部碎片和内部碎片。\n（2）非连续内存管理：允许一个程序使用的内存分布在离散或者说不相邻的内存，相对更加灵活一些。\n\t\t- 段式管理\n\t\t- 页式管理\n\t\t- 段页式管理机制\n```\n\n","timestamp":1692282363931},{"name":"05-进程管理.md","path":"011-操作系统/05-进程管理.md","content":"## 进程和线程\n\n### 什么是进程和线程？\n\n```\n进程（Process）： 是计算机程序的执行实例，是资源分配和调度的基本单位，每个进程拥有独立的内存空间、代码、数据、系统资源等\n线程（Thread）： 也被称为轻量级进程，是进程中的一个执行单元，是操作系统调度的最小单位。一个进程可以包含多个线程，它们共享同一进程的内存空间和资源。\n```\n\n### 有了进程为什么还需要线程?\n\n```\n（1）创建：每个进程拥有独立的内存空间，创建和销毁的开销很大；线程共享同一进程的内存空间，创建和销毁的开销很小\n（2）切换：进程之间切换开销很大，线程开销很大\n（3）多个线程可以并发处理不同任务，进程只能在一个时间干一件事。\n```\n\n### 为什么线程切换开销小\n\n```\n（1）轻量级：线程是轻量级的，创建和销毁的开销很小\n（2）上下文切换简单：进程切换需要保存和恢复完整的进程上下文信息；线程只需要保存和恢复部分上下文信息\n（3）调度开销低：线程的调度是由操作系统内核完成的，由于线程切换涉及的数据较少，所以调度器能够更快地作出调度决策。\n（4）共享资源：线程在同一进程中共享内存、文件描述符等资源，不需要像进程切换一样涉及内存保护和资源迁移的开销。\n```\n\n### 为什么要使用多线程?\n\n```\n主要目的是提高程序的性能和资源利用率\n\n（1）并发性： 多线程可以让程序同时执行多个任务，从而实现并发性。\n（2）提高性能： 在多核处理器上，多线程可以实现并行处理，提高程序的性能。不同的线程可以在不同的处理器核心上执行，从而充分利用硬件资源。\n```\n\n### 线程间的同步的方式有哪些？\n\n```\n（1）互斥锁(Mutex)：采用互斥对象机制，只有拥有互斥对象的线程才有访问公共资源的权限。因为互斥对象只有一个，所以可以保证公共资源不会被多个线程同时访问。比如 Java 中的 synchronized 关键词和各种 Lock 都是这种机制。\n（2）读写锁（Read-Write Lock）：允许多个线程同时读取共享资源，但只有一个线程可以对共享资源进行写操作。\n（3）信号量(Semaphore)：它允许同一时刻多个线程访问同一资源，但是需要控制同一时刻访问此资源的最大线程数量。\n（4）屏障（Barrier）：屏障是一种同步原语，用于等待多个线程到达某个点再一起继续执行。当一个线程到达屏障时，它会停止执行并等待其他线程到达屏障，直到所有线程都到达屏障后，它们才会一起继续执行。比如 Java 中的 CyclicBarrier 是这种机制。\n（5）事件(Event) :Wait/Notify：通过通知操作的方式来保持多线程同步，还可以方便的实现多线程优先级的比较操作。\n```\n\n### 进程有哪几种状态?\n\n```\n（1）创建状态(new)：进程正在被创建，尚未到就绪状态。\n（2）就绪状态(ready)：进程已处于准备运行状态，即进程获得了除了处理器之外的一切所需资源，一旦得到处理器资源(处理器分配的时间片)即可运行。\n（3）运行状态(running)：进程正在处理器上运行(单核 CPU 下任意时刻只有一个进程处于运行状态)。\n（4）阻塞状态(waiting)：又称为等待状态，进程正在等待某一事件而暂停运行如等待某资源为可用或等待 IO 操作完成。即使处理器空闲，该进程也不能运行。\n（4）结束状态(terminated)：进程正在从系统中消失。可能是进程正常结束或其他原因中断退出运行。\n```\n\n![进程状态图转换图](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/14/15050016919967001691996700622uoyTCP-state-transition-of-process.png)\n\n### 线程的状态\n\n```\n\n```\n\n\n\n### 进程间的通信方式有哪些？ TODO\n\n```\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-01.html#进程间的通信方式有哪些\n```\n\n### 进程的调度算法有哪些?\n\n![常见进程调度算法](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/14/15214316919977031691997703371xS8YPO-scheduling-algorithms-of-process.png)\n\n```\n（1）先到先服务：从就绪队列中选择一个最先进入该队列的进程为之分配资源，使它立即执行并一直执行到完成或发生某事件而被阻塞放弃占用 CPU 时再重新调度。\n（2）短作业优先：估计运行时间最短的进程\n（3）时间片轮转调度算法：时间片轮转调度是一种最古老，最简单，最公平且使用最广的算法。每个进程被分配一个时间段，称作它的时间片，即该进程允许运行的时间。\n（4）多级反馈队列调度算法：它的主要思想是将进程分为多个队列，并且每个队列都有不同的优先级。进程首先进入最高优先级的队列，如果在这个队列中运行的时间过长，它的优先级会逐渐下降，使得其他队列中的进程也有机会运行。这种方式可以在保证高优先级进程及时响应的同时，兼顾了低优先级进程的执行，从而提高了系统的吞吐量和公平性。\n（5）优先级调度算法：为每个流程分配优先级，首先执行具有最高优先级的进程，依此类推。具有相同优先级的进程以 FCFS 方式执行。可以根据内存要求，时间要求或任何其他资源要求来确定优先级。\n```\n\n### 并发与并行\n\n```\n（1）并发：指多个任务交替执行，它们之间可能在时间上有重叠，但在某个具体时刻只有一个任务在执行。\n（2）并行：多个任务同时执行\n```\n\n### 同步和异步的区别\n\n```\n（1）同步：发出一个调用之后，在没有得到结果之前， 该调用就不可以返回，一直等待。\n（2）异步：调用在发出之后，不用等待返回结果，该调用直接返回。\n```\n\n\n\n## 死锁\n\n### 什么是死锁？\n\n```\n两个或两个以上的进程，在执行过程中，由于竞争资源而相互等待的情况，如果无外力作用，它们将无法推进下去。\n```\n\n### 能列举一个操作系统发生死锁的例子吗？\n\n```\n两个进程 A 和 B，以及两个资源 X 和 Y\nA持有X而等待Y，B持有Y而等待X\n```\n\n### 产生死锁的四个必要条件是什么?\n\n```\n（1）互斥：资源必须处于非共享模式，即一次只有一个进程可以使用。如果另一进程申请该资源，那么必须等待直到该资源被释放为止。\n（2）占有并等待： 进程持有至少一个资源，并且在等待获取其他资源时，不释放已持有的资源。\n（3）不可剥夺： 进程已获得的资源不能被强制性地剥夺，只能由持有资源的进程自己释放。\n（4）循环等待： 一组进程之间形成一个循环等待资源的链，每个进程都在等待下一个进程所占有的资源。\n```\n\n### 能写一个模拟产生死锁的代码吗？\n\n![线程死锁示意图 ](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/14/15495216919993921691999392205gtgU0D-2019-4%E6%AD%BB%E9%94%811.png)\n\n```java\npublic class DeadLockDemo {\n    private static Object resource1 = new Object();//资源 1\n    private static Object resource2 = new Object();//资源 2\n\n    public static void main(String[] args) {\n        new Thread(() -> {\n            synchronized (resource1) {\n                System.out.println(Thread.currentThread() + \"get resource1\");\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println(Thread.currentThread() + \"waiting get resource2\");\n                synchronized (resource2) {\n                    System.out.println(Thread.currentThread() + \"get resource2\");\n                }\n            }\n        }, \"线程 1\").start();\n\n        new Thread(() -> {\n            synchronized (resource2) {\n                System.out.println(Thread.currentThread() + \"get resource2\");\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println(Thread.currentThread() + \"waiting get resource1\");\n                synchronized (resource1) {\n                    System.out.println(Thread.currentThread() + \"get resource1\");\n                }\n            }\n        }, \"线程 2\").start();\n    }\n}\n\nThread[线程 1,5,main]get resource1\nThread[线程 2,5,main]get resource2\nThread[线程 1,5,main]waiting get resource2\nThread[线程 2,5,main]waiting get resource1\n```\n\n\n\n### 解决死锁的方法\n\n```\n解决死锁的方法可以从多个角度去分析，一般的情况下，有预防，避免，检测和解除四种。\n（1）预防 是采用某种策略，限制并发进程对资源的请求，从而使得死锁的必要条件在系统执行的任何时间上都不满足。\n\t\t- 资源可共享\n\t\t- 采用剥夺式调度算法\n（2）避免 则是系统在分配资源时，根据资源的使用情况提前做出预测，从而避免死锁的发生\n（3）检测 是指系统设有专门的机构，当死锁发生时，该机构能够检测死锁的发生，并精确地确定与死锁有关的进程和资源。\n（4）解除 是与检测相配套的一种措施，用于将进程从死锁状态下解脱出来。\n\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-01.html#解决死锁的方法\n```\n\n","timestamp":1692282363931}]