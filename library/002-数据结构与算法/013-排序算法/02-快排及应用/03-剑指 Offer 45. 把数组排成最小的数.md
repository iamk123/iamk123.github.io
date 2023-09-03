### [剑指 Offer 45. 把数组排成最小的数](https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/)

```
输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
输入: [3,30,34,5,9]
输出: "3033459"
```

使用Arrays.sort算法

```java
class Solution {
    public String minNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for(int i = 0; i < nums.length; i++) {
            strs[i] = Integer.toString(nums[i]);
        }

        Arrays.sort(strs, (a, b)->{
            return (a + b).compareTo(b + a);
        });

        return String.join("", strs);
    }
}
```

快排

```java
class Solution {
    public String minNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for(int i = 0; i < nums.length; i++) {
            strs[i] = Integer.toString(nums[i]);
        }

        quickSort(strs, 0, strs.length - 1);

        return String.join("", strs);
    }

    public void quickSort(String[] strs, int l, int r) {
        if(l >= r) return;
        int pivot = paritition(strs, l, r);
        quickSort(strs, l, pivot - 1);
        quickSort(strs, pivot + 1, r);
    }

    public int paritition(String[] strs, int l, int r) {
        int index = new Random().nextInt(r - l + 1) + l;
        swap(strs, l, index);

        String pivot = strs[l];
        while(l < r) {
            while(l < r && (strs[r] + pivot).compareTo(pivot + strs[r]) >= 0) r--;
            strs[l] = strs[r];

            while(l < r && (strs[l] + pivot).compareTo(pivot + strs[l]) <= 0) l++;
            strs[r] = strs[l];
        }
        strs[l] = pivot;

        return l;
    }

    public void swap(String[] strs, int i, int j) {
        String tmp = strs[i];
        strs[i] = strs[j];
        strs[j] = tmp;
    }
}
```

[参考](https://leetcode.cn/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/solution/mian-shi-ti-45-ba-shu-zu-pai-cheng-zui-xiao-de-s-4/)