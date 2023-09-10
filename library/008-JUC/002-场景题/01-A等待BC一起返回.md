### **一个请求A，需要得到B和C的返回结果**。

```java
使用wait和notify

public class WaitNotifyExample {
    private Object lock = new Object();
    private boolean isBCompleted = false;
    private boolean isCCompleted = false;

    public void requestA() {
        Thread thread = new Thread(() -> {
            synchronized (lock) {
                while (!isBCompleted || !isCCompleted) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Request A is processed after B and C.");
            }
        });
        thread.start();
    }

    public void completeB() {
        new Thread(() -> {
            // Simulating some work
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock) {
                isBCompleted = true;
                System.out.println("Request B is completed.");
                lock.notifyAll();
            }
        }).start();
    }

    public void completeC() {
        new Thread(() -> {
            // Simulating some work
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock) {
                isCCompleted = true;
                System.out.println("Request C is completed.");
                lock.notifyAll();
            }
        }).start();
    }

    public static void main(String[] args) {
        WaitNotifyExample example = new WaitNotifyExample();
        example.requestA();
        example.completeB();
        example.completeC();
    }
}

```

