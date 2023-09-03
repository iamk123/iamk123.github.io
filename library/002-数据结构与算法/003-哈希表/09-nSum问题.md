# [一个函数秒杀 2Sum 3Sum 4Sum 问题](https://mp.weixin.qq.com/s/fSyJVvggxHq28a0SdmZm6Q)



### [1. 两数之和](https://leetcode.cn/problems/two-sum/)

```
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

#### 哈希表

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < nums.length; i++) {
          	int need = target - nums[i]);
            if(map.containsKey(need) {
                return new int[]{i, map.get(need};
            } else {
                map.put(nums[i], i);
            }
        }
        return new int[]{};
    }
}
```



### 1.两数之和改编

```
改题：
1 返回元素，不返回下标
2 数组中可能出现多组答案，要求答案去重	nums = [1,1,1,2,2,3,3], target = 4
```

```java
vector<vector<int>> twoSumTarget(vector<int>& nums, int target) {
    // nums 数组必须有序
    sort(nums.begin(), nums.end());
    int lo = 0, hi = nums.size() - 1;
    vector<vector<int>> res;
    while (lo < hi) {
        int sum = nums[lo] + nums[hi];
        int left = nums[lo], right = nums[hi];
        if (sum < target) {
            while (lo < hi && nums[lo] == left) lo++;
        } else if (sum > target) {
            while (lo < hi && nums[hi] == right) hi--;
        } else {
            res.push_back({left, right});
            while (lo < hi && nums[lo] == left) lo++;
            while (lo < hi && nums[hi] == right) hi--;
        }
    }
    return res;
}
```



### [15. 三数之和](https://leetcode.cn/problems/3sum/)

```
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```



```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        Arrays.sort(nums);
        for(int i = 0; i < n; i++) {
            // 排序后第一个值大于0，一定找不到和为0的解
            if(nums[i] > 0) return res;
            
            if (i > 0 && nums[i] == nums[i - 1]) {  // 去重第一个数
                continue;
            }

            // 两数之和
            int l = i + 1, r = n - 1;
            while(l < r) {
                if(nums[i] + nums[l] + nums[r] < 0) {
                    l++;
                } else if(nums[i] + nums[l] + nums[r] > 0) {
                    r--;
                } else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    // 对第2、3个数去重
                    while(l < r && nums[l] == nums[l+1]) l++;
                    while(l < r && nums[r] == nums[r-1]) r--;
                    
                    l++;
                    r--;
                }
            }
        }

        return res;
    }
}

代码随想录：https://programmercarl.com/0015.三数之和.html#双指针
```



### [18. 四数之和](https://leetcode.cn/problems/4sum/)

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        for(int i = 0; i < n; i++) {
            if (nums[i] > 0 && nums[i] > target) {  // 理论上已经不存在解
                return res;
            }

            if(i > 0 && nums[i] == nums[i - 1]) continue;

            for(int j = i + 1; j < n; j++) {
                if(j > i + 1 && nums[j] == nums[j - 1]) continue;

                int l = j + 1, r = n - 1;
                while(l < r) {
                    long sum = (long)nums[i] + nums[j] + nums[l] + nums[r];
                    if(sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));
                        while(l < r && nums[l] == nums[l + 1]) l++;
                        while(l < r && nums[r] == nums[r - 1]) r--;

                        l++;
                        r--;
                    } else if(sum < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }

        return res;
    }
}

代码随想录：https://programmercarl.com/0018.四数之和.html#其他语言版本
```

写法二

```java
class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        // [-2 -1 0 0 1 2]
        for(int i = 0; i < n; i++) {
            
            if (nums[i] > 0 && nums[i] > target) {  // 理论上已经不存在解
                return res;
            }
            
            if(i > 0 && nums[i] == nums[i - 1]) continue;   // 第一个数去重

            // 找三数和
            long target1 = (long)target - nums[i];
            for(int j = i + 1; j < n; j++) {
                if(j > i + 1 && nums[j] == nums[j - 1]) continue;   // 第二个数去重
                
                // 找两数和
                long target2 = target1 - nums[j];
                int l = j + 1, r = n - 1;
                while(l < r) {
                    long sum = (long)nums[l] + nums[r];
                    if(sum == target2) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));
                        while(l < r && nums[l] == nums[l + 1]) l++;     // 第三个数去重
                        while(l < r && nums[r] == nums[r - 1]) r--;     // 第四个数去重

                        l++;
                        r--;
                    } else if(sum < target2) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }

        return res;
    }
}
```

