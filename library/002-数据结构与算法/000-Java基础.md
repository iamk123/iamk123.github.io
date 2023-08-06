资料

-   [灵茶山艾府](https://github.com/EndlessCheng)



## map

```java
List<String> list = map.getOrDefault(key, new ArrayList<String>())

// map转list
List<List<String>> list = new ArrayList<List<String>>(map.values()); 

// 初始化赋值
Map<String, String> map  = new HashMap<String, String>() {{
  put("key1", "value1");
  put("key2", "value2");
}};
```



## list

```java
List<List<Integer>> res = new ArrayList<>();
res.add(Arrays.asList(nums[i], nums[l], nums[r]));
```

统计字母出现次数

```java
int[] counts = new int[26];
int length = str.length();
for (int i = 0; i < length; i++) {
  	counts[str.charAt(i) - 'a']++;
}
```

list转数组

```java
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);

// 转换为对象数组
Object[] array = list.toArray();

// 转换为Integer类型的数组
Integer[] array = list.toArray(new Integer[list.size()]);

// 使用流API转换为Integer类型的数组
Integer[] array = list.stream().toArray(Integer[]::new);
```

