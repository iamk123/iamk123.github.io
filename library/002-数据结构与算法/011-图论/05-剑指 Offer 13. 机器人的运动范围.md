#### [剑指 Offer 13. 机器人的运动范围](https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

错误思想

```
遍历二维数组，求每个位置的和，统计小于k的个数

问题：部分位置虽然满足小于k的条件，但并不可达
```



#### 方法1： dfs

```
class Solution {

    int m, n, k;
    boolean[][] visited;

    public int movingCount(int m, int n, int k) {
        visited = new boolean[m][n];    // 记录是否走过
        this.m = m;
        this.n = n;
        this.k = k;
        return dfs(0, 0);
    }

    public int dfs(int r, int c) {  
        if(r >= m || c >= n || visited[r][c] || sum(r, c) > k) return 0;    // 超出边界 & 访问过 & 坐标和超出
        visited[r][c] = true;   // 标记为访问
        return 1 + dfs(r + 1, c) + dfs(r, c + 1);   // 想右向下走
    }

    // 计算坐标和
    public int sum(int r, int c) {
        int sum = 0;
        while(r != 0) {
            sum += r % 10;
            r /= 10;
        }
        while(c != 0) {
            sum += c % 10;
            c /= 10;
        }

        return sum;
    }


}
```

https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/solution/dfshe-bfsliang-chong-jie-jue-fang-shi-by-sdwwld/

#### 方法2: bfs

```java
class Solution {


    public int movingCount(int m, int n, int k) {
        int res = 0;
        boolean[][] visited = new boolean[m][n];    // 记录是否走过
        Deque<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0});
        while(!q.isEmpty()) {
            int[] pos = q.poll();
            int i = pos[0], j = pos[1];
            if(i >= m || j >= n || visited[i][j] || sum(i, j) > k) continue;

            visited[i][j] = true;
            res++;
            q.offer(new int[]{i + 1, j});
            q.offer(new int[]{i, j + 1});
        }

        return res;
    }

    // 计算坐标和
    public int sum(int r, int c) {
        int sum = 0;
        while(r != 0) {
            sum += r % 10;
            r /= 10;
        }
        while(c != 0) {
            sum += c % 10;
            c /= 10;
        }

        return sum;
    }


}
```

https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/solution/dfshe-bfsliang-chong-jie-jue-fang-shi-by-sdwwld/