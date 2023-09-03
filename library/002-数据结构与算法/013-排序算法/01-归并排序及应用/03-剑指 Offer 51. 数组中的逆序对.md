### [剑指 Offer 51. 数组中的逆序对](https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

```
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

输入: [7,5,6,4]
输出: 5
```

解法同：[315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)

#### 解法1

```
归并过程中，左边的临时数组元素赋值到nums时更新计数
```

写法1

```java
class Solution {
    int res = 0;

    public int reversePairs(int[] nums) {
        sort(nums, 0, nums.length - 1);
        // System.out.println(Arrays.toString(nums));
        return res;
    }

    public void sort(int[] nums, int l, int r) {
        if(l >= r) return;
        int mid = l + ((r - l) >> 1);
        sort(nums, l, mid);
        sort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }

    public void merge(int[] nums, int l, int mid, int r) {
        int[] tmp = new int[nums.length];
        for(int i = l; i <= r; i++) tmp[i] = nums[i];

        int p1 = l, p2 = mid + 1;
        int index = l;
        while(p1 <= mid && p2 <= r) {
            if(tmp[p1] <= tmp[p2]) {
                nums[index++] = tmp[p1++];
                res += p2 - (mid + 1);		// // 57和468合并，5小于6，说明6的左边都小于5
            } else {
                nums[index++] = tmp[p2++];
            }
        }

        while(p1 <= mid) {
            nums[index++] = tmp[p1++];
            res += p2 - (mid + 1);
        }
        while(p2 <= r) nums[index++] = tmp[p2++];
    }
}
```

写法2 (为主，解法2更优)

```java
class Solution {
    int res;
    int[] tmp;

    public int reversePairs(int[] nums) {
        res = 0;
        tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1);
        return res;
    }

    public void sort(int[] nums, int l, int r) {
        if(l >= r) return;
        int mid = l + ((r - l) >> 1);
        sort(nums, l, mid);
        sort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }

    public void merge(int[] nums, int l, int mid, int r) {
        for(int i = l; i <= r; i++) tmp[i] = nums[i];
        
        int i = l, j = mid + 1;
        for(int p = l; p <= r; p++) {
            if(i == mid + 1) {
                nums[p] = tmp[j++];
            } else if(j == r + 1) {
                nums[p] = tmp[i++];
                res += j - mid  - 1;        // 计数1    // 57和468合并，5小于6，说明6的左边都小于5
            } else if(tmp[i] <= tmp[j]) {
                nums[p] = tmp[i++];
                res += j - mid  - 1;        // 计数2
            } else {
                nums[p] = tmp[j++];
            }
        }
    }
}
```

#### 解法2 (为主，可优化)

```
归并过程中，右边的临时数组元素赋值到nums时更新计数
```

```java
class Solution {
    int res;
    int[] tmp;

    public int reversePairs(int[] nums) {
        res = 0;
        tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1);
        return res;
    }

    public void sort(int[] nums, int l, int r) {
        if(l >= r) return;
        int mid = l + ((r - l) >> 1);
        sort(nums, l, mid);
        sort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }

    public void merge(int[] nums, int l, int mid, int r) {
        for(int i = l; i <= r; i++) tmp[i] = nums[i];
        
        int i = l, j = mid + 1;
        for(int p = l; p <= r; p++) {
            if(i == mid + 1) {
                nums[p] = tmp[j++];
            } else if(j == r + 1) {
                nums[p] = tmp[i++];
            } else if(tmp[i] <= tmp[j]) {
                nums[p] = tmp[i++];
            } else {
                nums[p] = tmp[j++];

                res += (mid - i + 1);   // 579与468合并，5大于4 => 579都大于4
            }
        }
    }
}
```

#### 优化

写法1

```java
class Solution {
    int res;
    int[] tmp;

    public int reversePairs(int[] nums) {
        res = 0;
        tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1);
        return res;
    }

    public void sort(int[] nums, int l, int r) {
        if(l >= r) return;
        int mid = l + ((r - l) >> 1);
        sort(nums, l, mid);
        sort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }

    public void merge(int[] nums, int l, int mid, int r) {
        for(int i = l; i <= r; i++) tmp[i] = nums[i];

        // 计数。记录上一次比较的结果，即为下一次的开始
        // 579和468合并，5比较完end就在6，6之前的数都是比7小的，不用每次都从4开始找
        int end = mid + 1;
        for(int i = l; i <= mid; i++) {
            while(end <= r && nums[i] > nums[end]) end++;

            res += (end - mid - 1);
        }
        
        int i = l, j = mid + 1;
        for(int p = l; p <= r; p++) {
            if(i == mid + 1) {
                nums[p] = tmp[j++];
            } else if(j == r + 1) {
                nums[p] = tmp[i++];
            } else if(tmp[i] <= tmp[j]) {
                nums[p] = tmp[i++];
            } else {
                nums[p] = tmp[j++];
            }
        }
    }

}
```
写法2
```java
class Solution {
    int res = 0;
    int[] tmp;
    public int reversePairs(int[] nums) {
        tmp = new int[nums.length];
        sort(nums, 0, nums.length - 1);
        // System.out.println(Arrays.toString(nums));
        return res;
    }

    public void sort(int[] nums, int l, int r) {
        if(l >= r) return;
        int mid = l + ((r - l) >> 1);
        sort(nums, l, mid);
        sort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }

    public void merge(int[] nums, int l, int mid, int r) {
        for(int i = l; i <= r; i++) tmp[i] = nums[i];

        int p1 = l, p2 = mid + 1;
        for(; p1 <= mid; p1++) {
            while(p2 <= r && nums[p1] > nums[p2]) p2++;
            res += p2 - (mid + 1);
        }

        p1 = l;
        p2 = mid + 1;
        for(int index = l; index <= r; index++) {
            if(p1 == mid + 1) {  // 左边遍历完
                nums[index] = tmp[p2++];
            } else if(p2 == r + 1) {     // 右边遍历完
                nums[index] = tmp[p1++];
            } else if(tmp[p1] <= tmp[p2]) {
                nums[index] = tmp[p1++];
            } else {
                nums[index] = tmp[p2++];
            }
        }
    }
}
```

