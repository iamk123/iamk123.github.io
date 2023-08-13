# Java中的13个原子操作类

## 原子更新基本类型类

### 有哪些？

```
AtomicBoolean: 原子更新布尔类型
AtomicInteger：原子更新整型
AtomicLong：原子更新长整型
```

### 如何使用？

三个类提供的方法几乎一摸一样，以`AtomicInteger`

```
int addAndGet(int delta)
boolean compareAndSet(int expect, int update)  如果输入的数值等于预期值，则以原子方式将该值设置为输入的值
int getAndIncrement() 以原子方式将当前值+1，返回自增前的值
void lazySet(int newValue)
int getAndSet(int newValue) 以原子方式设置为newValue值，返回旧值
```

### getAndIncrement实现原理

TODO

## 原子更新数组

### 有哪些

```
AtomicIntegerArray 原子更新整型数组里的元素
AtomicLongArray 原子更新长整型数组里的元素
AtomicReferenceArray 原子更新引用类型数组里的元素
```



## 原子更新引用类型



## 原子更新字段类