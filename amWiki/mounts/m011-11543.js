if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m011']=[{"name":"01-死锁.md","path":"011-操作系统/01-场景题/01-死锁.md","content":"## 死锁的例子\n\n```java\npublic class DeadLockDemo {\n    private static Object resource1 = new Object();//资源 1\n    private static Object resource2 = new Object();//资源 2\n\n    public static void main(String[] args) {\n        new Thread(() -> {\n            synchronized (resource1) {\n                System.out.println(Thread.currentThread() + \"get resource1\");\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println(Thread.currentThread() + \"waiting get resource2\");\n                synchronized (resource2) {\n                    System.out.println(Thread.currentThread() + \"get resource2\");\n                }\n            }\n        }, \"线程 1\").start();\n\n        new Thread(() -> {\n            synchronized (resource2) {\n                System.out.println(Thread.currentThread() + \"get resource2\");\n                try {\n                    Thread.sleep(1000);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n                System.out.println(Thread.currentThread() + \"waiting get resource1\");\n                synchronized (resource1) {\n                    System.out.println(Thread.currentThread() + \"get resource1\");\n                }\n            }\n        }, \"线程 2\").start();\n    }\n}\n\nThread[线程 1,5,main]get resource1\nThread[线程 2,5,main]get resource2\nThread[线程 1,5,main]waiting get resource2\nThread[线程 2,5,main]waiting get resource1\n```\n\n","timestamp":1694516098320},{"name":"04-内存管理.md","path":"011-操作系统/04-内存管理.md","content":"\n\n## 内存管理的作用\n\n```\n（1）内存的分配与回收：对进程所需的内存进行分配和释放，malloc 函数：申请内存，free 函数：释放内存。\n（2）地址转换：将程序中的虚拟地址转换成内存中的物理地址。\n（3）内存扩充：当系统没有足够的内存时，利用虚拟内存技术或自动覆盖技术，从逻辑上扩充内存。\n（4）内存映射：将一个文件直接映射到进程的进程空间中，这样可以通过内存指针用读写内存的办法直接存取文件内容，速度更快。\n（5）内存优化：通过调整内存分配策略和回收算法来优化内存使用效率。\n（6）内存安全：保证进程之间使用内存互不干扰，避免一些恶意程序通过修改内存来破坏系统的安全性。\n\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-02.html\n```\n\n\n\n## 什么是内存碎片？\n\n```\n内部内存碎片：\n（1）定义：已经分配给进程使用但未被使用的内存。\n（2）原因：导致内部内存碎片的主要原因是，当采用固定比例比如 2 的幂次方进行内存分配时，进程所分配的内存可能会比其实际所需要的大。举个例子，一个进程只需要 65 字节的内存，但为其分配了 128（2^7） 大小的内存，那 63 字节的内存就成为了内部内存碎片。\n\n外部内存碎片：\n（1）指的是那些并未分配给进程但又不能使用的内存\n```\n\n\n\n## 常见的内存管理方式有哪些？\n\n```\n内存管理方式可以简单分为下面两种：\n连续内存管理：\n（1）块式管理：\n\t- 将内存划分为固定大小的块，每个块中只包含一个进程。如果进程运行需要内存的话就给它分配一块。\n\t- 问题：容易产生内存碎片。如果只需要很小的一块内存，分配的这块内存一大部分就就会浪费\n\n非连续内存管理：允许一个程序使用的内存分布在离散或者说不相邻的内存，相对更加灵活一些。\n\t\t- 段式管理\n\t\t- 页式管理\n\t\t- 段页式管理机制\n```\n\n\n\n## 虚拟内存\n\n### 是什么？作用\n\n```\n是操作系统内存管理的一种技术，本质上来说它只是逻辑存在的，是一个假想出来的内存空间。\n每个进程启动时，操作系统都会提供一个独立的虚拟地址空间，这个地址是连续的。通常通过分段或分页的方法来实现，从而将虚拟内存上虚拟地址映射到物理内存上。\n\n作用\n（1）内存拓展：可以让程序使用更多的内存空间，超出实际物理内存的限制。这是因为当物理内存不够用时，可以利用磁盘充当，将物理内存页（通常大小为 4 KB）保存到磁盘文件（会影响读写速度），数据或代码页会根据需要在物理内存与磁盘之间移动。\n（2）隔离进程：每个进程都有独立的虚拟地址空间，进程之间彼此隔离，一个进程中的代码无法更改正在由另一进程或操作系统使用的物理内存。解决了多进程之间地址冲突的问题。\n（3）提高内存使用安全性：控制进程对物理内存的访问，隔离不同进程的访问权限，提高系统的安全性。\n```\n\n\n\n## 内存分段\n\n### 是什么\n\n```\n（1）是一种内存管理技术,在内存分段管理中，应用程序的虚拟地址空间被分成多个独立的段，每个段可以包含代码、数据或堆栈信息。\n\n分段机制中包含三个重要部分：虚拟地址、段表、物理地址\n（2）虚拟地址：由「段号」和「段内偏移量」组成。\n（3）段表：用于虚拟地址和物理地址的映射，主要包括「段号」、「段基地值」、「段界限」。\n（4）虚拟地址中的「段内偏移量」应该位于0～段界限之间，如果段内偏移量是合法的，就将段的基地址 + 段内偏移量 => 物理内存地址\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/09/14122016942399401694239940403d5982h-os-075df152-7b77-40c7-abdb-1aa0280d958b.png\" alt=\"虚拟地址、段表、物理地址\" style=\"zoom:50%;\" />\n\n映射示例\n\n```\n虚拟地址：段3、段偏移量500 ----> 段基地址7000+段偏移量500 ----> 物理地址：8700+。\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/09/14312916942410891694241089551YiCEoa-os-a57baf1c-9612-49dd-8b23-8b00a0c63cef.png\" alt=\"段虚拟地址映射\" style=\"zoom: 67%;\" />\n\n### 作用 & 问题\n\n作用\n\n```\n解决了程序本身不需要关心具体的物理内存地址的问题，能产生连续的内存空间\n```\n\n问题\n\n```\n（1）外部内存碎片。\n\t- 解决办法，内存交换\n（2）内存交换的效率低。\n\t- 内存交换时，需要将内存数据写到磁盘，然后\n```\n\n#### 会导致内部碎片吗？\n\n```\n内存分段管理可以做到段根据实际需求分配内存，所以有多少需求就分配多大的段，所以不会出现内部内存碎片。\n```\n\n#### 什么是内存交换？\n\n```\n\n```\n\n\n\n## 内存分页\n\n### 是什么\n\n```\n分⻚是把整个虚拟内存和物理内存空间切成固定大小的单元，称为⻚（Page）。每⼀⻚的⼤⼩一般为 4KB 。\n目的是为了「简化内存管理」和「实现虚拟内存系统」。\n```\n\n### 为什么\n\n```\n内存分段中，会出现「外部内存碎片」和「内存交换的空间太大」的问题。\n要解决这些问题，那么就要想出能少出现一些内存碎片的办法。另外，当需要进行内存交换的时候，让需要交换写入或者从磁盘装载的数据更少一点，这样就可以解决问题了。这个办法，也就是内存分页（Paging）。\n```\n\n### 虚拟地址和物理地址是如何映射的？\n\n```\n分页机制下，通过页表来进行映射\n虚拟地址包含「页号」和「页内偏移」。\n页表中包含「虚拟页号」和「物理页号」\n通过「页号」找到页表中对应的「物理页号」（即物理内存基地址），加上「页内偏移」就是物理内存地址\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/09/17121716942507371694250737047Xwzp0v-7884f4d8db4949f7a5bb4bbd0f452609.png\" alt=\"img\" style=\"zoom:50%;\" />\n\n\n\n### 多级页表\n\n```\n为什么？\n操作系统是可以同时运行非常多的进程的，就意味着页表会非常的庞大。一页是4kb，4GB的虚拟地址空间就需要100w个页\n\n是什么？\n就是把我们原来的单级页表再次分页。\n\n优点\n利用了局部性原理，除了顶级页表，其它级别的页表可以在需要的时候才被创建。\n在内存紧张的时候还可以被置换到磁盘中。\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/09/17204216942512421694251242835nddWeF-19296e249b2240c29f9c52be70f611d5.png\" alt=\"img\" style=\"zoom:50%;\" />\n\n\n\n## 段页式内存管理\n\n```\n就是将内存分段和内存分页组合起来在一个系统中使用\n\n段页式内存管理实现方式：\n（1）先将程序划分成多个有逻辑意义的段，也就是分段机制\n（2）接着把每个段划分成多个页，也就是对分段划分出来的连续空间，再划分固定大小的页\n\n这样地址结构就由「段号」+「段内页号」+「页内偏移」三部分构成\n每个程序对应一张段表，每个段又对应一张页表，段表中的地址是页表的起始地址，而页表中的地址则为某页的物理页号\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/09/20280316942624831694262483622agQCGK-8904fb89ae0c49c4b0f2f7b5a0a7b099.png\" alt=\"img\" style=\"zoom:50%;\" />\n\n## 页面置换算法有哪些？\n\n```\n在分页系统里，一个虚拟的页面可能在主存里，也可能在磁盘中，如果CPU发现要访问的虚拟地址对应的物理页不在主存里，就会产生一个缺页中断，然后从磁盘中把该页调入主存中。\n如果内存里没有空间，就需要从主存里选择一个页面来置换。\n\n常见的页面置换算法：\n（1）FIFO（先进先出）：在这种策略下，第一个进入内存的页面将是第一个被替换出去的页面。\n（2）LRU（最近最久未使用）：这种策略替换最长时间未被使用的页面。\n（3）LFU（最少使用）：替换最少使用的页面。\n（4）LOCK（时钟页面置换算法）：它是最近最少使用（LRU）页面置换算法的一种近似实现\n（5）OPT（最佳页面置换算法）：置换在未来最⻓时间不访问的⻚⾯\n```\n\n### FIFO（先进先出）\n\n```\n在这种策略下，第一个进入内存的页面将是第一个被替换出去的页面。\n```\n\n实现机制\n\n```\nFIFO的实现机制是使用链表将所有在内存的页面按照进入时间的早晚链接起来，然后每次置换链表头上的页面就行了，新加进来的页面则挂在链表的末端。\n```\n\n### LRU（最近最久未使用）\n\n```\n发⽣缺⻚时，选择最⻓时间没有被访问的⻚⾯进⾏置换，也就是说，该算法假设已经很久没有使⽤的⻚⾯很有可能在未来较⻓的⼀段时间内仍然不会被使⽤。\n```\n\n实现机制\n\n```\n理论上是可以实现的，但代价很⾼。\n为了完全实现 LRU，需要在内存中维护⼀个所有⻚⾯的链表，最近最多使⽤的⻚⾯在表头，最近最少使⽤的⻚⾯在表尾。\n困难的是，在每次访问内存时都必须要更新整个链表。在链表中找到⼀个⻚⾯，删除它，然后把它移动到表头是⼀个⾮常费时的操作。\n```\n\n### LFU（最少使用）\n\n```\n当发⽣缺⻚中断时，选择访问次数最少的那个⻚⾯，将其置换。\n```\n\n实现方式\n\n```\n对每个⻚⾯设置⼀个「访问计数器」，每当⼀个⻚⾯被访问时，该⻚⾯的访问计数器就累加 1。在发⽣缺⻚中断时，淘汰计数器值最⼩的那个⻚⾯。\n```\n\n### LOCK（时钟页面置换算法）\n\n```\n它是最近最少使用（LRU）页面置换算法的一种近似实现\n```\n\n实现方式\n\n```\n维护一个类似时钟的循环链表结构，其中每个页面条目都有一个关联的“引用位”或“时钟位”。\n初始化：初始时所有页面的引用位都被设置为0，一个指针（称为时钟指针或手针）指向列表中的第一个元素。\n页面访问: 当一个页面被访问时，其对应的引用位被设置为1，表示该页面最近被访问过。\n页面置换: 当需要替换一个页面时（例如，在发生页面错误时），算法检查当前指针指向的页面的引用位。\n\t- 如果引用位为0，表示该页面最近没有被访问，因此它被选择为要被置换的页面。\n\t- 如果引用位为1，则将其重置为0，并将指针移动到循环列表中的下一个页面。\n```\n\n### OPT（最佳页面置换算法）\n\n```\n是一个理想的算法，基本思路是，置换在未来最⻓时间不访问的⻚⾯。\n```\n\n实现方式\n\n```\n无法实现\n该算法实现需要计算内存中每个逻辑⻚⾯的下⼀次访问时间，然后⽐较，选择未来最⻓时间不访问的⻚⾯。\n但这个算法是无法实现的，因为当缺页中断发生时，操作系统无法知道各个页面下一次将在什么时候被访问。\n```\n\n\n\n\n\n## 参考\n\n-   [二哥的java进阶之路：面渣逆袭-操作系统](https://javabetter.cn/sidebar/sanfene/os.html#%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86)\n-   [小林coding](https://xiaolincoding.com/os/3_memory/vmem.html#linux-%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80)\n","timestamp":1694516098320},{"name":"05-进程管理.md","path":"011-操作系统/05-进程管理.md","content":"## 进程和线程\n\n### 进程和线程的区别\n\n```\n（1）定义\n\t- 进程是计算机程序的执行实例，是资源分配和调度的基本单位。\n\t- 轻量级进程，是进程中的一个执行单元，是操作系统调度的最小单位。\n（2）系统资源\n\t- 进程：每个进程拥有独立的内存空间、系统资源等。\n\t- 线程：一个进程可以包含多个线程，它们共享同一进程的内存空间和资源。\n（3）创建销毁\n\t- 进程创建和销毁消耗的系统资源比线程要多\n（4）上下文切换：\n\t- 进程：进程间的上下文切换会有较大的开销，涉及到整个当前进程状态的保存以及新进程状态的加载。\n\t- 线程：线程间的上下文切换开销小，仅涉及到保存和加载少量寄存器和程序计数器。\n```\n\n### 有了进程为什么还需要线程?\n\n```\n（1）创建：每个进程拥有独立的内存空间，创建和销毁的开销很大；线程共享同一进程的内存空间，创建和销毁的开销很小。\n（2）切换：进程之间切换开销很大，线程开销很大。\n（3）多个线程可以并发处理不同任务，进程只能在一个时间干一件事。\n```\n\n### 为什么线程切换开销小\n\n```\n（1）轻量级：线程是轻量级的，创建和销毁的开销很小\n（2）上下文切换简单：进程切换需要保存和恢复完整的进程上下文信息；线程只需要保存和恢复部分上下文信息\n（3）调度开销低：线程的调度是由操作系统内核完成的，由于线程切换涉及的数据较少，所以调度器能够更快地作出调度决策。\n（4）共享资源：线程在同一进程中共享内存、文件描述符等资源，不需要像进程切换一样涉及内存保护和资源迁移的开销。\n```\n\n### 为什么要使用多线程?\n\n```\n主要目的是提高程序的性能和资源利用率\n\n（1）并发性： 多线程可以让程序同时执行多个任务，从而实现并发性。\n（2）提高性能： 在多核处理器上，多线程可以实现并行处理，提高程序的性能。不同的线程可以在不同的处理器核心上执行，从而充分利用硬件资源。\n```\n\n### 线程间的同步的方式有哪些？\n\n```\n（1）互斥锁(Mutex)：\n\t采用互斥对象机制，只有拥有互斥对象的线程才有访问公共资源的权限。因为互斥对象只有一个，所以可以保证公共资源不会被多个线程同时访问。比如 Java 中的 synchronized 关键词和各种 Lock 都是这种机制。\n\t\n（2）读写锁（Read-Write Lock）：\n\t允许多个线程同时读取共享资源，但只有一个线程可以对共享资源进行写操作。\n\t\n（3）信号量(Semaphore)：\n\t它允许同一时刻多个线程访问同一资源，但是需要控制同一时刻访问此资源的最大线程数量。\n\t\n（4）屏障（Barrier）：\n\t屏障是一种同步原语，用于等待多个线程到达某个点再一起继续执行。当一个线程到达屏障时，它会停止执行并等待其他线程到达屏障，直到所有线程都到达屏障后，它们才会一起继续执行。比如 Java 中的 CyclicBarrier 是这种机制。\n\n（5）事件(Event) :Wait/Notify：\n\t通过通知操作的方式来保持多线程同步，还可以方便的实现多线程优先级的比较操作。\n```\n\n### 进程有哪几种状态?\n\n```\n（1）创建状态(new)：进程正在被创建，尚未到就绪状态。\n（2）就绪状态(ready)：进程已处于准备运行状态，即进程获得了除了处理器之外的一切所需资源，一旦得到处理器资源(处理器分配的时间片)即可运行。\n（3）运行状态(running)：进程正在处理器上运行(单核 CPU 下任意时刻只有一个进程处于运行状态)。\n（4）阻塞状态(waiting)：又称为等待状态，进程正在等待某一事件而暂停运行如等待某资源为可用或等待 IO 操作完成。即使处理器空闲，该进程也不能运行。\n（4）结束状态(terminated)：进程正在从系统中消失。可能是进程正常结束或其他原因中断退出运行。\n```\n\n![进程状态图转换图](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/14/15050016919967001691996700622uoyTCP-state-transition-of-process.png)\n\n### 线程的状态\n\n```\n* 创建 New：新创建的线程，尚未执行；\n* 运行 Runnable：运行中的线程，正在执行 `run()`方法的Java代码；\n* 阻塞 Blocked：运行中的线程，因为某些操作被阻塞而挂起；\n* 等待 Waiting：运行中的线程，因为某些操作在等待中；\n* 超时等待 Timed Waiting：运行中的线程，因为执行 `sleep()`方法正在计时等待；\n* 终止 Terminated：线程已终止，因为 `run()`方法执行完毕。\n```\n\n\n\n### 进程间的通信方式有哪些？ TODO\n\n```\n（1）管道/匿名管道(Pipes)：\n\t用于具有亲缘关系的父子进程间或者兄弟进程之间的通信。\n（2）消息队列(Message Queuing)：\n\n（3）信号量(Semaphores)：\n\t信号量是一个计数器，用于多进程对共享数据的访问，信号量的意图在于进程间同步。这种通信方式主要用于解决与同步相关的问题并避免竞争条件。\n\t\n（4）共享内存(Shared memory)：\n\t使得多个进程可以访问同一块内存空间，不同进程可以及时看到对方进程中对共享内存中数据的更新。这种方式需要依靠某种同步操作，如互斥锁和信号量等。可以说这是最有用的进程间通信方式。\n\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-01.html#进程间的通信方式有哪些\n```\n\n### 进程的调度算法有哪些?\n\n![常见进程调度算法](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/14/15214316919977031691997703371xS8YPO-scheduling-algorithms-of-process.png)\n\n```\n（1）先到先服务：从就绪队列中选择一个最先进入该队列的进程为之分配资源，使它立即执行并一直执行到完成或发生某事件而被阻塞放弃占用 CPU 时再重新调度。\n（2）短作业优先：估计运行时间最短的进程\n（3）时间片轮转调度算法：时间片轮转调度是一种最古老，最简单，最公平且使用最广的算法。每个进程被分配一个时间段，称作它的时间片，即该进程允许运行的时间。\n（4）多级反馈队列调度算法：它的主要思想是将进程分为多个队列，并且每个队列都有不同的优先级。进程首先进入最高优先级的队列，如果在这个队列中运行的时间过长，它的优先级会逐渐下降，使得其他队列中的进程也有机会运行。这种方式可以在保证高优先级进程及时响应的同时，兼顾了低优先级进程的执行，从而提高了系统的吞吐量和公平性。\n（5）优先级调度算法：为每个流程分配优先级，首先执行具有最高优先级的进程，依此类推。具有相同优先级的进程以 FCFS 方式执行。可以根据内存要求，时间要求或任何其他资源要求来确定优先级。\n```\n\n### 并发与并行\n\n```\n（1）并发：指多个任务交替执行，它们之间可能在时间上有重叠，但在某个具体时刻只有一个任务在执行。\n（2）并行：多个任务同时执行\n```\n\n### 同步和异步的区别\n\n```\n（1）同步：发出一个调用之后，在没有得到结果之前， 该调用就不可以返回，一直等待。\n（2）异步：调用在发出之后，不用等待返回结果，该调用直接返回。\n```\n\n\n\n## 死锁\n\n### 什么是死锁？\n\n```\n两个或两个以上的进程，在执行过程中，由于竞争资源而相互等待的情况，如果无外力作用，它们将无法推进下去。\n```\n\n### 能列举一个操作系统发生死锁的例子吗？\n\n```\n两个进程 A 和 B，以及两个资源 X 和 Y\nA持有X而等待Y，B持有Y而等待X\n```\n\n### 产生死锁的四个必要条件是什么?\n\n```\n（1）互斥：资源必须处于非共享模式，即一次只有一个进程可以使用。如果另一进程申请该资源，那么必须等待直到该资源被释放为止。\n（2）占有并等待： 进程持有至少一个资源，并且在等待获取其他资源时，不释放已持有的资源。\n（3）不可剥夺： 进程已获得的资源不能被强制性地剥夺，只能由持有资源的进程自己释放。\n（4）循环等待： 一组进程之间形成一个循环等待资源的链，每个进程都在等待下一个进程所占有的资源。\n```\n\n\n\n### 解决死锁的方法\n\n```\n解决死锁的方法可以从多个角度去分析，一般的情况下，有预防，避免，检测和解除四种。\n（1）预防 是采用某种策略，限制并发进程对资源的请求，从而使得死锁的必要条件在系统执行的任何时间上都不满足。\n\t\t- 资源可共享\n\t\t- 采用剥夺式调度算法\n（2）避免 则是系统在分配资源时，根据资源的使用情况提前做出预测，从而避免死锁的发生\n（3）检测 是指系统设有专门的机构，当死锁发生时，该机构能够检测死锁的发生，并精确地确定与死锁有关的进程和资源。\n（4）解除 是与检测相配套的一种措施，用于将进程从死锁状态下解脱出来。\n\nhttps://javaguide.cn/cs-basics/operating-system/operating-system-basic-questions-01.html#解决死锁的方法\n```\n\n","timestamp":1694516098320}]