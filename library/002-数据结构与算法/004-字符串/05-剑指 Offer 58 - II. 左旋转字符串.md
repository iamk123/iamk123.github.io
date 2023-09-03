



#### [剑指 Offer 58 - II. 左旋转字符串](https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

```go
func reverseLeftWords(s string, n int) string {
    b := []byte(s)
    n = n % len(s)
    b = reverse(b, 0, n - 1)
    b = reverse(b, n, len(s) - 1)
    b = reverse(b, 0, len(s) - 1)
    return string(b)
}

func reverse(b []byte, l int, r int) []byte {
    for l < r {
        b[l], b[r] = b[r], b[l]
        l++
        r--
    }
    return b
}
```

优化

```go
func reverseLeftWords(s string, n int) string {
    b := []byte(s)
    // 1. 反转前n个字符
    // 2. 反转第n到end字符
    // 3. 反转整个字符
    reverse(b, 0, n-1)
    reverse(b, n, len(b)-1)
    reverse(b, 0, len(b)-1)
    return string(b)
}
// 切片是引用传递
func reverse(b []byte, left, right int){
    for left < right{
        b[left], b[right] = b[right],b[left]
        left++
        right--
    }
}
```

