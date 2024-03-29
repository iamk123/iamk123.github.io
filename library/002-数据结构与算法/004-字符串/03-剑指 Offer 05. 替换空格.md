

### [剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

```
假定一段路径记作字符串 path，其中以 "." 作为分隔符。现需将路径加密，加密方法为将 path 中的分隔符替换为空格 " "，请返回加密后的字符串。

输入：path = "a.aef.qerf.bb"
输出："a aef qerf bb"
```



```java
class Solution {
    public String pathEncryption(String path) {
        StringBuilder res = new StringBuilder();
        for(Character c : path.toCharArray())
        {
            if(c == '.') res.append(' ');
            else res.append(c);
        }
        return res.toString();
    }
}


链接：https://leetcode.cn/problems/ti-huan-kong-ge-lcof/
```



## 知识点

-   变量名不能用`len`

-   不能使用`b[i--] = 0`

-   数组扩容

    ```go
    b := []byte(s)
    tmp := make([]byte, 2)
    b = append(b, tmp...)
    ```

-   切片（不定长数组）

    ```go
    // 声明
    result := make([]byte, 0)
    // 添加元素， ...含义为将byte数组展开
    result = append(result, []byte("%20")...) 
    ```

    



方法一：遍历添加

```go
func replaceSpace(s string) string {
    b := []byte(s)
    result := make([]byte, 0)
    for _, v := range b {
        if v == ' ' {
            result = append(result, []byte("%20")...)
        } else {
            result = append(result, v)
        }
    }
    return string(result)
}
```

方法二：原地替换

扩容数组 + 倒叙遍历

```go
func replaceSpace(s string) string {
    b := []byte(s)
    length := len(b)
    cnt := 0

    // 遍历统计空格数
    for _, v := range b {
        if v == ' ' {
            cnt++
        } 
    }

    // 拓展切片容量
    tmp := make([]byte, cnt * 2)
    b = append(b, tmp...)

    // 倒叙遍历替换字符
    i := length - 1    // 原数组尾指针
    j := len(b) - 1 // 新数组尾指针
    for i >= 0 {
        if b[i] == ' ' {
            b[j] = '0'
            b[j-1] = '2'
            b[j-2] = '%'
            i--
            j -= 3
        } else {
            b[j] = b[i]
            j--
            i--
        }
    }
    return string(b)
}
```

