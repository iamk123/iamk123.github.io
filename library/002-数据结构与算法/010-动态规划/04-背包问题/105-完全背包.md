-   完全背包用一维好写一点
-   完全背包的内层是正序，区分01背包的倒叙
-   分析过程： 属于01背包 or 完全背包 => 属于组合问题 or 排列问题 => 确定排列顺序



### 一维dp

完全背包的物品是可以添加多次的，所以要从小到大去遍历

#### 先遍历物品，后遍历背包

```java
public class Test {

    public static void main(String[] args) {
        int[] weight = {1, 3, 4};
        int[] value = {15, 20, 30};
        int bagWight = 4;
        testWeightBagProblem(weight, value, bagWight);
    }

    public static void testWeightBagProblem(int[] weight, int[] value, int bagWeight) {
        int wLen = weight.length;
        //定义dp数组：dp[j]表示背包容量为j时，能获得的最大价值
        int[] dp = new int[bagWeight + 1];
        //遍历顺序：先遍历物品，再遍历背包容量
        for (int i = 0; i < wLen; i++){
            for (int j = weight[i]; j <= bagWeight; j++){
                dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
            }
          
            System.out.println("===weight: " + weight[i] + "; value: " + value[i] + "===");
            for (int j = 0; j <= bagWeight; j++){
                System.out.print(dp[j] + " ");
            }
            System.out.println();
            System.out.println();
        }
    }
}
```



```
===weight: 1; value: 15===
0 15 30 45 60 

===weight: 3; value: 20===
0 15 30 45 60 

===weight: 4; value: 30===
0 15 30 45 60 
```

##### 问题1: **为什么遍历物品在外层循环，遍历背包容量在内层循环？**

##### 问题2: 代码怎么体现选多次？

正序遍历背包容量时，会重复选取，以物品0遍历背包为例，weight: 1;  value: 15

```
j=1时，dp[j]=15, 可选物品0，价值为15
j=2时, dp[j]=30, 只有物品0可选，所以是选了两次物品0
```





#### 先遍历背包，后遍历物品

```java
public class Test {

    public static void main(String[] args) {
        int[] weight = {1, 3, 4};
        int[] value = {15, 20, 30};
        int bagWight = 4;
        testWeightBagProblem(weight, value, bagWight);
    }

    public static void testWeightBagProblem(int[] weight, int[] value, int bagWeight) {

        int[] dp = new int[bagWeight + 1];

        for(int i = 1; i <= bagWeight; i++) {       // 遍历背包
            for(int j = 0; j < weight.length; j++) {    // 遍历物品
                if(i - weight[j] >= 0) {
                    dp[i] = Math.max(dp[i], dp[i - weight[j]] + value[j]);
                }
            }

            System.out.println("======");
            for (int j = 0; j <= bagWeight; j++){
                System.out.print(dp[j] + " ");
            }
            System.out.println();
            System.out.println();
        }
    }
}
```

```
======
0 15 0 0 0 

======
0 15 30 0 0 

======
0 15 30 45 0 

======
0 15 30 45 60 
```

