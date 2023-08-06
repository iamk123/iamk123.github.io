### [剑指 Offer 40. 最小的k个数](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/)

```
输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
```
#### 方法1: 排序

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        int[] res = new int[k];
        Arrays.sort(arr);
        for(int i = 0; i < k; i++) {
            res[i] = arr[i];
        }

        return res;
    }
}
```



#### 方法2: 大根堆

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b)->{
            return b - a;
        });

        for(int i = 0; i < arr.length; i++) {
            pq.add(arr[i]);
            if(pq.size() > k) {
                pq.poll();
            }
        }


        int[] res = new int[k];
        for(int i = 0; i < k; i++) {
            res[i] = pq.poll();
        }

        return res;
    }
}
```



#### 方法3: 快排

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        if(k >= arr.length) return arr;
        return quickSort(arr, 0, arr.length - 1, k);
    }

    public int[] quickSort(int[] nums, int l, int r, int k) {
        int pivot = partition(nums, l, r);
        if(pivot > k) return quickSort(nums, l, r - 1, k);
        if(pivot < k) return quickSort(nums, l + 1, r, k);
        return Arrays.copyOf(nums, k);
    }

    public int partition(int[] nums, int l, int r) {
        int index = new Random().nextInt(r - l + 1) + l;
        int pivot = nums[index];
        swap(nums, index, l);

        int i = l, j = r;
        while(i < j) {
            while(i < j && nums[j] >= pivot) j--;
            nums[i] = nums[j];

            while(i < j && nums[i] <= pivot) i++;
            nums[j] = nums[i];
        }
        nums[i] = pivot;

        return i;
    }

    public void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

