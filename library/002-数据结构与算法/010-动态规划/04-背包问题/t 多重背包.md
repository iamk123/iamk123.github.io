## 多重背包

-   不同的物品数量不同
-   可以转为01背包来求解

### 方法一：

![image-20221213194558790](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2022/12/13/19455816709319581670931958897GjKXNX-image-20221213194558790.png)

![image-20221213194543915](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2022/12/13/19454416709319441670931944023AzMTvY-image-20221213194543915.png)

```java
    public static void multiPackage() {
        List<Integer> weight = new ArrayList<>(Arrays.asList(1, 3, 4));
        List<Integer> value = new ArrayList<>(Arrays.asList(15, 20, 30));
        List<Integer> nums = new ArrayList<>(Arrays.asList(2, 3, 2));
        int bagWeight = 10;

      	// 改造为01背包
        for(int i = 0; i < nums.size(); i++) {
            while(nums.get(i) > 1) {
                weight.add(weight.get(i));
                value.add(value.get(i));
                nums.set(i, nums.get(i) - 1);
            }
        }

        // 01背包
        int[] dp = new int[bagWeight + 1];
        for(int i = 0; i < weight.size(); i++) {  // 遍历物品
            for(int j = bagWeight; j >= weight.get(i); j--) {   // 遍历背包
                dp[j] = Math.max(dp[j], value.get(i) + dp[j - weight.get(i)]);
            }
            System.out.println(Arrays.toString(dp));
        }
    }
```



### 方法二：

```java
    public static void multiPackage() {
        int[] weight = new int[] { 1, 3, 4 };
        int[] value = new int[] { 15, 20, 30 };
        int[] nums = new int[] { 2, 3, 2 };
        int bagWeight = 10;

        int[] dp = new int[bagWeight + 1];
        for (int i = 0; i < weight.length; i++) { // 遍历物品
            for (int j = bagWeight; j >= weight[i]; j--) { // 遍历背包
                // 遍历相同物品个数
                for (int k = 1; k <= nums[i] && (j - k * weight[i]) >= 0; k++) {
                    dp[j] = Math.max(dp[j], value[i] * k + dp[j - k * weight[i]]);
                }

                System.out.println(Arrays.toString(dp));
            }
        }
    }
```

