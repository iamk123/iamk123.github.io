if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m001']=[{"name":"001-JUC.md","path":"001-JAVA/001-JUC/001-JUC.md","content":"# JUC高并发编程\n\n## 1 JUC概述\n\n## 2 LOCK接口\n\n### 什么是Lock接口\n\n```java\npublic interface Lock {\n    void lock(); \n    void lockInterruptibly() throws InterruptedException; \n    boolean tryLock(); \n    boolean tryLock(long time, TimeUnit unit) throws InterruptedException; \n    void unlock(); Condition newCondition();\n}\n```\n\n```\nLock是Java中提供的一个接口，用于实现【线程同步机制】，它可以替代Synchronized关键字。\nLock接口提供了比Synchronized更灵活、更强大的线程同步功能，可以用于解决多线程中的资源竞争和死锁等问题。\nLock接口的实现类有很多种，其中最常用的是ReentrantLock。\n\nLock接口提供了以下主要方法：\n- lock()：获取锁，如果锁已经被其他线程获取，则当前线程进入等待状态。\n- unlock()：释放锁，如果当前线程持有锁，则释放锁并唤醒等待的线程。\n- tryLock()：尝试获取锁，如果锁没有被其他线程获取，则获取锁并返回true，否则立即返回false。\n- tryLock(long time, TimeUnit unit)：尝试获取锁，如果锁没有被其他线程获取，则获取锁并返回true，否则等待指定时间后返回false。\n- newCondition()：创建一个Condition对象，用于实现等待/通知机制。\n\n需要注意的是，在使用Lock接口时，需要在finally代码块中释放锁，以确保锁一定会被释放，避免死锁的发生。\n```\n\n#### 什么是线程同步机制？\n\n```\n- 是什么？\n线程同步机制是多线程编程中常用的一种机制，用于控制多个线程对共享资源的访问。\n\n- 为什么？\n在多线程环境中，多个线程同时访问共享资源可能会导致竞争条件和数据不一致等问题，因此需要使用线程同步机制来避免这些问题的发生\n\n- 怎么样？\n1.synchronized\n2.Lock接口\n\n- 基本原理\n线程同步机制的基本原理是在共享资源的访问前获取锁，只有获取锁的线程才能访问共享资源，其他线程需要等待锁的释放。\n在共享资源访问完成后，释放锁，让其他线程可以继续访问共享资源。这样就保证了共享资源在任何时刻只能被一个线程访问，避免了竞争条件和数据不一致等问题的发生。\n\n- 使用时注意的问题\n1.使用线程同步机制时，应该避免死锁、饥饿等问题的发生，以确保程序的正常运行\n2.同时，在使用synchronized关键字时，应该尽量减小同步块的范围，以提高程序的性能。\n3.在使用Lock接口时，需要在finally代码块中释放锁，以确保锁一定会被释放，避免死锁的发生。\n```\n\n##### 在使用synchronized关键字时，为什么要减小同步块的范围？\n\n```\n1.提高性能\n范围越大，需要等待获取锁的线程越多，导致在获取锁的过程中需要等待其他线程释放锁，而其他线程释放锁的时间也会比较长，这就会造成线程的等待时间过长，降低程序的运行效率。\n2.避免死锁\n不同的线程可能会竞争多个锁，释放锁的时间也会比较长，导致相互等待，形成死锁。\n\n因此，为了避免以上问题的发生，应该尽量减小同步块的范围，只在必要的地方进行同步，这样可以提高程序的性能，同时也可以降低出现死锁等问题的概率。\n```\n\n##### 为什么使用lock接口需要在finally代码块中释放锁\n\n```\n- 为什么？\n在使用Lock接口进行线程同步时，需要手动获取和释放锁，这是两个独立的操作，如果在获取锁之后发生异常，就有可能导致锁没有被释放，从而导致死锁等问题的发生。\n- 怎么样？\n因此，将释放锁的操作放在finally代码块中，这样可以确保在任何情况下都会释放锁，避免死锁等问题的发生。\n```\n\n### Lock和Synchronized的区别？\n\n```\n- 是什么 & 作用\nLock和Synchronized都是Java中用于实现线程同步的机制，它们的目的是为了避免线程间的竞争条件和数据不一致等问题。它们的区别如下：\n\n- 区别\n1.锁的获取方式：\n\tSynchronized是在进入同步代码块或同步方法时，自动获取锁，退出同步代码块或方法时自动释放锁；而Lock需要手动获取锁，并且必须手动释放锁。\n2.锁的粒度：\n\tSynchronized只能对整个方法或代码块进行加锁，而Lock可以对代码块进行更细粒度的控制。\n3.可中断性：\n\t在获取锁时，Synchronized是不可中断的，即使该线程在等待锁的过程中被中断，也不会释放锁；而Lock可以根据需要设置锁的可中断性。\n4.公平锁：\n\tSynchronized是非公平锁，不保证等待时间最长的线程最先获取锁；而Lock可以通过参数指定为公平锁或非公平锁。\n5.性能：\n\t相比较而言，Lock的性能比Synchronized好，在高并发的情况下，Lock的吞吐量比Synchronized更高。\n\n需要注意的是，Lock是在JDK 5中引入的，而Synchronized是Java早期就提供的同步机制。由于Lock相比Synchronized更灵活和高效，因此在实际开发中，使用Lock的场景会更多。\n```\n\n### Synchronized实现卖票例子\n\n```java\npackage com.atguigu.sync;\n\n//第一步  创建资源类，定义属性和和操作方法\nclass Ticket {\n    //票数\n    private int number = 10;\n    //操作方法：卖票\n    public synchronized void sale() {\n        //判断：是否有票\n        if(number > 0) {\n            System.out.println(Thread.currentThread().getName()+\" : 卖出：\"+(number--)+\" 剩下：\"+number);\n        }\n    }\n}\n\npublic class SaleTicket {\n    //第二步 创建多个线程，调用资源类的操作方法\n    public static void main(String[] args) {\n        //创建Ticket对象\n        Ticket ticket = new Ticket();\n        //创建三个线程\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                //调用卖票方法\n                for (int i = 0; i < 40; i++) {\n                    ticket.sale();\n                }\n            }\n        },\"AA\").start();\n\n        new Thread(new Runnable() {\n            @Override\n            public void run() {\n                //调用卖票方法\n                for (int i = 0; i < 40; i++) {\n                    ticket.sale();\n                }\n            }\n        },\"BB\").start();\n\n        // lambda表达式写法\n        new Thread(() -> {\n            //调用卖票方法\n            for (int i = 0; i < 40; i++) {\n                ticket.sale();\n            }\n        },\"CC\").start();\n    }\n}\n\n// 输出\nAA : 卖出：30 剩下：29\n...\nAA : 卖出：7 剩下：6\nBB : 卖出：6 剩下：5\n...\nBB : 卖出：1 剩下：0\n```\n\n### Lock实现卖票例子\n\n```java\n\n//第一步  创建资源类，定义属性和和操作方法\nclass LTicket {\n    //票数量\n    private int number = 30;\n\n    //创建可重入锁\n    private final ReentrantLock lock = new ReentrantLock(true);\n    //卖票方法\n    public void sale() {\n        //上锁\n        lock.lock();\n        try {\n            //判断是否有票\n            if(number > 0) {\n                System.out.println(Thread.currentThread().getName()+\" ：卖出\"+(number--)+\" 剩余：\"+number);\n            }\n        } finally {\n            //解锁\n            lock.unlock();\n        }\n    }\n}\n\npublic class LSaleTicket {\n    //第二步 创建多个线程，调用资源类的操作方法\n    //创建三个线程\n    public static void main(String[] args) {\n\n        LTicket ticket = new LTicket();\n\n        new Thread(()-> {\n            for (int i = 0; i < 40; i++) {\n                ticket.sale();\n            }\n        },\"AA\").start();\n\n        new Thread(()-> {\n            for (int i = 0; i < 40; i++) {\n                ticket.sale();\n            }\n        },\"BB\").start();\n\n        new Thread(()-> {\n            for (int i = 0; i < 40; i++) {\n                ticket.sale();\n            }\n        },\"CC\").start();\n    }\n}\n\n```\n\n\n\n### 什么是可重入锁\n\n```\n- 是什么？\n可重入锁是指同一个线程在持有某个锁的情况下，可以继续获取该锁而不会出现死锁的情况\n\n- synchronized关键字实现原理\n每个对象都有一个监视器锁（monitor），线程进入同步块时获取该对象的监视器锁，并在同步块结束时释放该锁，当一个线程在持有该锁的情况下再次进入同步块时，会自动获取该锁，而不会被阻塞。\n\n- ReentrantLock重入锁实现原理\n它使用一个计数器来记录线程获取锁的次数。当一个线程第一次获取锁时，计数器的值为1，当同一个线程再次获取锁时，计数器的值会递增，当线程退出同步块时，计数器的值递减，直到计数器的值为0时，锁被释放。这种机制保证了线程可以多次获取同一个锁而不会出现死锁的情况。\n```\n\n### 什么是ReentrantLock & 特点\n\n```\n- 是什么？\nReentrantLock是Java中实现Lock接口的一个类，它提供了与synchronized关键字类似的线程同步机制\n\n- 特点\n1.可重入性：\n\t与synchronized关键字一样，ReentrantLock支持可重入锁，即同一个线程可以多次获取同一个锁而不会死锁\n2.公平锁与非公平锁：\n\tReentrantLock提供了两种锁的实现方式，即公平锁和非公平锁。公平锁会按照线程的请求顺序来分配锁，而非公平锁则允许线程在竞争时插队，可能会导致某些线程长时间等待。\n3.条件变量：\n\tReentrantLock提供了Condition接口的实现类Condition，它可以将一个锁分为多个条件，使得线程可以在指定条件下等待和唤醒。这使得线程间的通信变得更加灵活。\n3.可中断性：\n\t与synchronized关键字不同，ReentrantLock提供了可中断锁的机制。即当一个线程等待获取锁时，可以通过中断等待的线程来结束等待。\n\nReentrantLock相对于synchronized关键字来说，具有更强的灵活性和可定制性，但需要手动获取和释放锁，使用时也需要注意避免死锁、饥饿等问题的发生。\n```\n\n### ReentrantLock和synchronized例子\n\n```java\n// 可重入锁\npublic class SyncLockDemo {\n\n    public synchronized void add() {\n        add();\n    }\n\n    public static void main(String[] args) {\n        //Lock演示可重入锁\n        Lock lock = new ReentrantLock();\n        //创建线程\n        new Thread(()->{\n            try {\n                //上锁\n                lock.lock();\n                System.out.println(Thread.currentThread().getName()+\" 外层\");\n\n                try {\n                    //上锁\n                    lock.lock();\n                    System.out.println(Thread.currentThread().getName()+\" 内层\");\n                }finally {\n                    //释放锁\n                    lock.unlock();\n                }\n            }finally {\n                //释放做\n                lock.unlock();\n            }\n        },\"t1\").start();\n\n        //创建新线程\n        new Thread(()->{\n            lock.lock();\n            System.out.println(\"aaaa\");\n            lock.unlock();\n        },\"aa\").start();\n\n       // new SyncLockDemo().add();\n       // synchronized\n       Object o = new Object();\n       new Thread(()->{\n           synchronized(o) {\n               System.out.println(Thread.currentThread().getName()+\" 外层\");\n\n               synchronized (o) {\n                   System.out.println(Thread.currentThread().getName()+\" 中层\");\n\n                   synchronized (o) {\n                       System.out.println(Thread.currentThread().getName()+\" 内层\");\n                   }\n               }\n           }\n\n       },\"t1\").start();\n    }\n}\n\n// 输出\nt1 外层\nt1 内层\naaaa\nt1 外层\nt1 中层\nt1 内层\n```\n\n### 创建线程的多种方式\n\n```\n1.继承Tread类\n2.实现Runnable接口\n3.实现Callable接口\n4.使用线程池\n```\n\n#### 继承Tread类\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread();\n        t.start(); // 启动新线程\n    }\n}\n```\n\n执行指定代码\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        Thread t = new MyThread();\n        t.start(); // 启动新线程\n    }\n}\n\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        System.out.println(\"start new thread!\");\n    }\n}\n```\n\n[参考](https://www.liaoxuefeng.com/wiki/1252599548343744/1306580710588449)\n\n#### 实现Runnable接口\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(new MyRunnable());\n        t.start(); // 启动新线程\n    }\n}\n\nclass MyRunnable implements Runnable {\n    @Override\n    public void run() {\n        System.out.println(\"start new thread!\");\n    }\n}\n```\n简写\n```java\nnew Thread(new Runnable() {\n  \t@Override\n  \tpublic void run() {\n    \t//调用卖票方法\n    \tfor (int i = 0; i < 40; i++) {\n      \tticket.sale();\n    \t}\n  \t}\n},\"Thread Name\").start();\n```\n\n使用Java8的lambda语法简写\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n        Thread t = new Thread(() -> {\n            System.out.println(\"start new thread!\");\n        });\n        t.start(); // 启动新线程\n    }\n}\n```\n\n[参考](https://www.liaoxuefeng.com/wiki/1252599548343744/1306580710588449)\n\n## \n\n\n\n## 3 线程间通信\n\n线程间通信的模型有两种：共享内存和消息传递\n\n**线程间的通信具体步骤：**\n\n1.  创建资源类，在资源类中创建属性和操作方法\n\n2.  在资源类操作方法：判断、操作、通知\n\n3.  创建多个线程，调用资源类的操作方法\n\n4.  防止虚拟唤醒问题\n\n    \n\n**案例**\n\n假设有两个线程，该线程在执行过程中，判断值（不是该值等待，让其他线程抢），操作值，通知另外一个线程的调度\n\n通过使用两个线程对0这个值操作，一个线程加1，一个线程减1，交替实现多次\n\n#### synchronized实现\n\n```java\n//第一步 创建资源类，定义属性和操作方法\nclass Share {\n    //初始值\n    private int number = 0;\n    //+1的方法\n    public synchronized void incr() throws InterruptedException {\n        //第二步 判断 干活 通知\n       if(number != 0) { //判断number值是否是0，如果不是0，等待\t\t注意：此处写法会导致虚假换新问题，用while\n            this.wait(); //在哪里睡，就在哪里醒\n        }\n        //如果number值是0，就+1操作\n        number++;\n        System.out.println(Thread.currentThread().getName()+\" :: \"+number);\n        //通知其他线程\n        this.notifyAll();\n    }\n\n    //-1的方法\n    public synchronized void decr() throws InterruptedException {\n        //判断\n        if(number != 1) {\n            this.wait();\n        }\n        //干活\n        number--;\n        System.out.println(Thread.currentThread().getName()+\" :: \"+number);\n        //通知其他线程\n        this.notifyAll();\n    }\n}\n\npublic class ThreadDemo1 {\n    //第三步 创建多个线程，调用资源类的操作方法\n    public static void main(String[] args) {\n        Share share = new Share();\n        //创建线程\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.incr(); //+1\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"AA\").start();\n\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.decr(); //-1\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"BB\").start();\n    }\n}\n\n// 结果\nAA :: 1\nBB :: 0\nAA :: 1\nBB :: 0\n...\n```\n\n问题：线程数多了之后，使用if来判断标志位会出现虚假唤醒问题\n\n```java\n// 在上述代码的基础上再添加线程\nnew Thread(()->{\n    for (int i = 1; i <=10; i++) {\n        try {\n            share.incr(); //+1\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n},\"CC\").start();\n\nnew Thread(()->{\n    for (int i = 1; i <=10; i++) {\n        try {\n            share.decr(); //-1\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }\n},\"DD\").start();\n\n// 结果\nAA :: 1\nBB :: 0\nAA :: 1\nBB :: 0\n...\nCC :: 1\nBB :: 0\nCC :: 1\nBB :: 0\nDD :: -1\n```\n\n主要是虚拟唤醒导致：如果一个线程执行完毕后，通知其他线程，该线程又进入等待睡眠，可能会因为某些原因被唤醒后，if结构的语句就不会判断了，一直往下执行，所以需要将if换成while结构，每次都判断。因为wait在哪里睡眠就在哪里被唤醒，结果被某个异常唤醒了后回不去了，if结构不会在判断了，需要更改为while\n\n```java\nwhile(number != 0) { //判断number值是否是0，如果不是0，等待\n    this.wait(); //在哪里睡，就在哪里醒\n}\n```\n\n#### lock实现\n\n```java\npackage com.atguigu.lock;\n\nimport java.util.concurrent.locks.Condition;\nimport java.util.concurrent.locks.Lock;\nimport java.util.concurrent.locks.ReentrantLock;\n\n//第一步 创建资源类，定义属性和操作方法\nclass Share {\n    private int number = 0;\n\n    //创建Lock\n    private Lock lock = new ReentrantLock();\n    private Condition condition = lock.newCondition();\n\n    //+1\n    public void incr() throws InterruptedException {\n        //上锁\n        lock.lock();\n        try {\n            //判断\n            while (number != 0) {\n                condition.await();\n            }\n            //干活\n            number++;\n            System.out.println(Thread.currentThread().getName()+\" :: \"+number);\n            //通知\n            condition.signalAll();\n        }finally {\n            //解锁\n            lock.unlock();\n        }\n    }\n\n    //-1\n    public void decr() throws InterruptedException {\n        lock.lock();\n        try {\n            while(number != 1) {\n                condition.await();\n            }\n            number--;\n            System.out.println(Thread.currentThread().getName()+\" :: \"+number);\n            condition.signalAll();\n        }finally {\n            lock.unlock();\n        }\n    }\n}\n\npublic class ThreadDemo2 {\n\n    public static void main(String[] args) {\n        Share share = new Share();\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.incr();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"AA\").start();\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.decr();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"BB\").start();\n\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.incr();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"CC\").start();\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    share.decr();\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"DD\").start();\n    }\n\n}\n\n```\n\n\n\n## 4 线程间定制化通信\n\n**所谓定制化通信，需要让线程进行一定的顺序操作**\n\n**案列**：启动三个线程，按照如下要求：\nAA打印5此，BB打印10次，CC打印15次，一共进行10轮\n\n**具体思路**：\n每个线程添加一个标志位，是该标志位则执行操作，并且修改为下一个标志位，通知下一个标志位的线程\n\n```java\n//第一步 创建资源类\nclass ShareResource {\n    //定义标志位\n    private int flag = 1;  // 1 AA     2 BB     3 CC\n\n    //创建Lock锁\n    private Lock lock = new ReentrantLock();\n\n    //创建三个condition\n    private Condition c1 = lock.newCondition();\n    private Condition c2 = lock.newCondition();\n    private Condition c3 = lock.newCondition();\n\n    //打印5次，参数第几轮\n    public void print5(int loop) throws InterruptedException {\n        //上锁\n        lock.lock();\n        try {\n            //判断\n            while(flag != 1) {\n                //等待\n                c1.await();\n            }\n            //干活\n            for (int i = 1; i <=5; i++) {\n                System.out.println(Thread.currentThread().getName()+\" :: \"+i+\" ：轮数：\"+loop);\n            }\n            //通知\n            flag = 2; //修改标志位 2\n            c2.signal(); //通知BB线程\n        }finally {\n            //释放锁\n            lock.unlock();\n        }\n    }\n\n    //打印10次，参数第几轮\n    public void print10(int loop) throws InterruptedException {\n        lock.lock();\n        try {\n            while(flag != 2) {\n                c2.await();\n            }\n            for (int i = 1; i <=10; i++) {\n                System.out.println(Thread.currentThread().getName()+\" :: \"+i+\" ：轮数：\"+loop);\n            }\n            //修改标志位\n            flag = 3;\n            //通知CC线程\n            c3.signal();\n        }finally {\n            lock.unlock();\n        }\n    }\n\n    //打印15次，参数第几轮\n    public void print15(int loop) throws InterruptedException {\n        lock.lock();\n        try {\n            while(flag != 3) {\n                c3.await();\n            }\n            for (int i = 1; i <=15; i++) {\n                System.out.println(Thread.currentThread().getName()+\" :: \"+i+\" ：轮数：\"+loop);\n            }\n            //修改标志位\n            flag = 1;\n            //通知AA线程\n            c1.signal();\n        }finally {\n            lock.unlock();\n        }\n    }\n}\n\npublic class ThreadDemo3 {\n    public static void main(String[] args) {\n        ShareResource shareResource = new ShareResource();\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    shareResource.print5(i);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"AA\").start();\n\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    shareResource.print10(i);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"BB\").start();\n\n        new Thread(()->{\n            for (int i = 1; i <=10; i++) {\n                try {\n                    shareResource.print15(i);\n                } catch (InterruptedException e) {\n                    e.printStackTrace();\n                }\n            }\n        },\"CC\").start();\n    }\n}\n\n```\n\n\n\n## 5 集合的线程安全\n\n","timestamp":1683011973504}]