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

## 5 线程应用实例
