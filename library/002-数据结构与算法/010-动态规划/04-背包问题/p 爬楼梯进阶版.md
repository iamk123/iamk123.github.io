```
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
一次可以一步一个台阶，两个台阶，三个台阶，.......，直到 m个台阶。问有多少种不同的方法可以爬到楼顶呢？
```

如果我来面试的话，我就会先给候选人出一个 本题原题，看其表现，如果顺利写出来，进而在要求每次可以爬[1 - m]个台阶应该怎么写。

顺便再考察一下两个for循环的嵌套顺序，为什么target放外面，nums放里面。



分析过程：属于完全背包 => 排列问题 => 完全同377. 组合问题403

```
n=4, m=3

[1, 0, 0, 0, 0]
[1, 1, 0, 0, 0]
[1, 1, 2, 0, 0]
[1, 1, 2, 4, 0]
[1, 1, 2, 4, 7]
```

一维

```java
class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        int[] weight = {1,2,3};
        dp[0] = 1;

        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < weight.length; j++) {
                if (i >= weight[j]) dp[i] += dp[i - weight[j]];
            }
            System.out.println(Arrays.toString(dp));
        }

        return dp[n];
    }
}
```

二维

```java
class Solution {
    public int climbStairs(int target) {
        int[] weight = {1, 2, 3};
        int[][] dp = new int[weight.length + 1][target + 1];
        for(int i = 0; i <= weight.length; i++) dp[i][0] = 1;

        for(int j = 0; j <= target; j++) {
            for(int i = 1; i <= weight.length; i++) {
                for(int k = 1; k <= i; k++) {
                    if(j - weight[k - 1] >= 0) dp[i][j] += dp[i][j - weight[k - 1]];
                }
            }
        }

        for(int[] d : dp) {
            System.out.println(Arrays.toString(d));
        }


        return dp[weight.length][target];
    }
}
```

