# Java基础

## 基本数据类型

### Java 中的几种基本数据类型有哪些？

```
6 种数字类型：
  4 种整数型：byte、short、int、long
  2 种浮点型：float、double
1 种字符类型：char
1 种布尔型：boolean。
```

### 包装类型

```
包装类型：Byte，Short，Integer，Long，Float，Double，Character，Boolean
```

### 基本类型和包装类型的区别？[x]

```
（1）默认值：基本数据类型未初始化时有默认值，如int默认为0；包装类型未初始化时默认为null
（2）存储：基本数据类型基本上是存在栈中（未被static修饰的成员变量在堆中）；包装类型属于对象，存放在堆中
（3）比较方式：基本数据类型比较的是值，；包装类型比较的是对象的内存地址，使用equals（）方法来比较
（4）集合和泛型都只能用包装类，不能用基本数据类型
```

### 自动装箱与拆箱了解吗？原理是什么？[xx]

```
（1）装箱：就是把基本类型转为包装类型。调用了包装类的valueOf()方法
（2）拆箱：把包装类型转为基本数据类型。调用了xxValue()方法。（int就是intValue()）

Integer i = 10 等价于 Integer i = Integer.valueOf(10)
int n = i 等价于 int n = i.intValue();
```

### 为什么要自动装箱和拆箱 [x]

```
代码简化，更加直观：ArrayList<Integer>只能添加包装类，如果没有自动装箱，就需要我们手动新建Integer对象，然后添加
```

### 谈谈Integer i = new Integer(xxx)和Integer i =xxx;这两种方式的区别

```
（1） new Integer(xxx) 每次创建一个Integer对象实例；
（2）Integer i = xxx 可能会使用缓存的 Integer 对象，特别是当值在 -128 到 127 之间时。
```

### int和Integer有什么区别

```
（1）int是基本数据类型；Integer是int的包装类
（2）int默认值是0；Integer默认值是null，Integer使用需要判空
（3）存储位置：
		- int 值通常存储在栈上。
		- Integer 对象存储在堆上，并且还有一个指向这个对象的引用存储在栈上。
```

### Integer的缓存机制

```
默认情况下，Integer 类缓存了从 -128 到 127 的所有整数对象。
当我们调用 Integer.valueOf() 方法或因为自动装箱而创建 Integer 对象时，如果值在此范围内，Java 会直接从缓存中返回已存在的对象，而不是创建一个新的对象。
```

### 缓存机制的作用

```java
（1）性能优化：避免频繁的创建和销毁这些对象
（2）节省内存

Integer a = 10;
Integer b = 10;

Integer c = 129；
Integer d = 129;

System.out.println(a == b)		// true
System.out.println(c == d)  	// false
```



## 变量

### 字符型常量和字符串常量的区别?

```
（1）形式：字符型常量是单引号引起的一个字符；字符串常量是双引号引起的若干个字符
（2）含义：字符常量相当于一个整型值（ASCII值），可以参加表达式运算；字符串常量代表一个地址值
（3）内存：字符型常量只占2个字节；字符串常量占用若干字节
```



### 成员变量与局部变量的区别？[x]

```
（1）作用域：
		- 成员变量：属于类的一部分，在整个类中都可以访问。可以被public、private、protected、static修饰
		- 局部变量：定在方法、构造函数和代码块内部，只能在其定义的范围内使用。没有修饰符
（2）生命周期
		- 成员变量：随着对象的创建而创建，在对象销毁时销毁
		- 局部变量：在声明时被创建，并在其作用域结束后被销毁。
（3）默认值：
		- 成员变量: 如果没有显式初始化，会被赋予默认值，如数值类型为0，布尔类型为false，引用类型为null。
		- 局部变量：没有默认值，必须在使用之前进行显式初始化。

```

### 静态变量？[x]

```
（1）是什么
静态变量就是被static关键值修饰的变量。它可以被类的所有实例共享，无论创建多个个对象，都共享同一份静态变量。也就是说，静态变量只会分配一次内存，可以节省内存。

（2）访问方法
		- 通过类名直接访问。ClassName.staticVariable;
		- 通过对象引用访问。objectReference.staticVariable;
```

### 静态变量和实例变量的区别？

```java
public class A {

    private int x;         // 实例变量
    private static int y;  // 静态变量

    public static void main(String[] args) {
        // int x = A.x;  // Non-static field 'x' cannot be referenced from a static context
        A a = new A();
        int x = a.x;
        int y = A.y;
    }
	}

（1）实例变量是属于实例的，与实例变量同生共死
（2）访问方法不同
```

### 静态方法

```
使用static修饰的方法，静态方式也成类方法，是属于类的

特点
（1）无需实例化，通过类名调用
（2）不能访问非静态成员
（3）不能使用this关键值。静态方法中不能使用this关键字，因为this表示当前对象实例，而静态方法没有对象实例。
（4）具有全局性：类的所有实例共享
```

### 静态代码块

```java
static {
    // 静态代码块的代码逻辑
}

使用static修饰的一段代码块
  
特点
（1）在类加载时执行，只执行一次
（2）无需调用，自动执行
（3）用于初始化静态成员
（4）无法访问非静态变量
```

### 静态内部类 [x]

```
静态内部类是定义在另一个类中的内部类，被声明为静态的。

特点：
（1）可以直接访问外部类的静态方法和静态变量，无需创建外部类的对象。但不能直接访问外部类的非静态成员（包括实例变量和实例方法，需要通过创建外部类对象来访问）
（2）可以在没有外部类对象的情况下被实力化和访问
（3）生命周期独立于外部类，即使外部类被销毁，静态内部类仍然存在
（4）静态内部类可以拥有静态成员和实例成员，包括静态变量、静态方法和实例变量、实例方法
```

```java
// 静态内部类的声明方式如下：
public class OuterClass {
    // 外部类的成员和方法
    
    public static class StaticInnerClass {
        // 静态内部类的成员和方法
    }
}

// 静态内部类可以通过以下方式实例化和访问：
OuterClass.StaticInnerClass innerObject = new OuterClass.StaticInnerClass();
// 访问静态内部类的成员和方法
innerObject.staticMethod();
innerObject.staticVariable;
```

### 静态内部类与非静态内部类的区别 [x]

```
（1）声明方式：有无static
（2）实例化方式：静态内部类可以直接实例化；非静态内部类需要外部类的实例来创建
（3）访问范围：
		- 静态内部类：只能访问外部类的静态成员，要访问非静态成员可以通过创建外部类的实例
		- 非静态内部类：可以直接访问外部类的静态与非静态成员
（4）声明周期：
		- 静态内部类：独立于外部类，即使外部类被销毁，静态内部类的实例仍然存在
		- 非静态内部类：声明周期同外部类，共享一个实例
```

### 静态方法为什么不能调用非静态成员?

```
（1）静态方法是属于类的，在类加载时就会分配内存，可以通过类名直接访问；而非静态成员是属于实例对象的，只有在对象实例化之后才存在，需要通过类的实例对象去访问。
（2）类中非静态成员不存在的时候，静态方法就已经存在了，此时调用内存中还不存在的非静态成员，属于非法操作
```

### 静态方法和实例方法有何不同？

```
（1）调用方式
		- 外部调用静态方法时，可以通过【类名.方法名】的方式，也可以通过【对象.方法名】的方式。
		- 实例方法只能通过【对象.方法名】
（2）访问类成员是否存在限制
		- 静态方法只能反问类的静态成员（静态变量和静态方法），不允许访问实例成员
```

### 为什么静态变量不能在方法中定义

```
静态变量属于类的成员，生命周期与类相同，在类加载时就被初始化，类销毁时才会被销毁。
定义在方法中的变量是局部变量，如果定义在方法中，那么只有方法被初始化，方法执行后就会销毁。
```

### 类的实例化初始化顺序 [x]

```java
静态变量和静态语句块优先于实例变量和普通语句块，静态变量和静态语句块的初始化顺序取决于它们在代码中的顺序。

父类（静态变量、静态语句块）
子类（静态变量、静态语句块）
父类（实例变量、普通语句块）
父类（构造函数）
子类（实例变量、普通语句块）
子类（构造函数）

class Parent {
    static {
        System.out.println("1. Parent static block");
    }
    
    {
        System.out.println("3. Parent instance block");
    }
    
    public Parent() {
        System.out.println("4. Parent constructor");
    }
}

class Child extends Parent {
    static {
        System.out.println("2. Child static block");
    }
    
    {
        System.out.println("5. Child instance block");
    }
    
    public Child() {
        System.out.println("6. Child constructor");
    }
}

public class TestInitialization {
    public static void main(String[] args) {
        new Child();
    }
}
```



### 重载和重写有什么区别？[x]

```
（1）重载：同一个类中多个同名方法根据不同的参数执行不同的逻辑

（2）重写：运行期间，子类对父类的相同方法的重新改造
“两同两小一大”：
- “两同”即方法名相同、形参列表相同；
- “两小”指的是子类方法返回值类型应比父类方法返回值类型更小或相等，子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等；
- “一大”指的是子类方法的访问权限应比父类方法的访问权限更大或相等。

关于 重写的返回值类型 这里需要额外多说明一下，上面的表述不太清晰准确：如果方法的返回类型是 void 和基本数据类型，则返回值重写时不可修改。但是如果方法的返回值是引用类型，重写时是可以返回该引用类型的子类的。

javaguide
```

| 区别点     | 重载方法 | 重写方法                                                     |
| :--------- | :------- | :----------------------------------------------------------- |
| 发生范围   | 同一个类 | 子类                                                         |
| 参数列表   | 必须修改 | 一定不能修改                                                 |
| 返回类型   | 可修改   | 子类方法返回值类型应比父类方法返回值类型更小或相等           |
| 异常       | 可修改   | 子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等； |
| 访问修饰符 | 可修改   | 一定不能做更严格的限制（可以降低限制）                       |
| 发生阶段   | 编译期   | 运行期                                                       |



## 面向对象基础

### 面向对象和面向过程的区别

```
面向过程：将一个大问题分解为一个方法，通过一个个方法的执行解决问题
面向对象：会先抽象出对象，然后用对象执行方法的方式解决问题。为了能够更好的模块化、增加代码的重用性
```

### 创建一个对象用什么运算符?对象实体与对象引用有何不同? [x]

```
new 运算符，new 创建对象实例（对象实例在 内存中），
对象引用指向对象实例（对象引用存放在栈内存中）。
- 一个对象实例可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）；
- 一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。
```

### 对象的相等和引用相等的区别

```java
对象的相等一般比较的是内存中存放的内容是否相等。
引用相等一般比较的是他们指向的内存地址是否相等。

String str1 = "hello";
String str2 = new String("hello");
String str3 = "hello";
// 使用 == 比较字符串的引用相等
System.out.println(str1 == str2);
System.out.println(str1 == str3);
// 使用 equals 方法比较字符串的相等
System.out.println(str1.equals(str2));
System.out.println(str1.equals(str3));

false
true
true
true
```

### 构造方法有哪些特点？是否可被 override?

```
构造方法特点如下：
- 名字与类名相同。
- 没有返回值，但不能用 void 声明构造函数。
- 生成类的对象时自动执行，无需调用。

构造方法不能被 override（重写）,但是可以 overload（重载）,所以你可以看到一个类中有多个构造函数的情况。
```

### 面向对象三大特征

封装

```
（1）定义：指把对象的属性封装在对象内部，不允许外部对象直接访问对象内部信息。可以提供一些被外界访问的方法来操作属性
（2）好处：这样可以防止对象内部状态的不合理修改。提高代码的安全性和可维护性。
```

继承

```
不同类型的对象，相互之间经常有一定数量的共同点, 可以将它们封装成一个类。
其他类继承这个类后，拥有父类对象所有的属性和方法（私有属性也拥有，但无法访问）
子类可以进行拓展，拥有自己的属性和方法，也可以对父类方法进行重写
```

多态

```
多态指同一个行为具有多个不同的表现形式或形态的能力

（1）编译时多态：主要是通过方法的重载实现的，编译时，java编译器会根据调用方法的参数类型、数量来决定使用哪个方法
（2）运行时多态：主要通过方法的重写和继承实现的。当子类继承父类并重写父类的方法时，父类引用指向子类对象，并调用子类对象的方法，这种方法调用解析是在运行时进行的。
```

### 五大原则（SOLID原则）

```
（1）单一职责 Single
	- 一个类只负责一项功能
	- 提高类的可读性和可维护性
	
（2）开闭原则 Open
	- 软件实体应该是可扩展的，而不可修改的。
	- 提高拓展性和稳定性
	
（3）里氏替换原则
	- 子类型必须能够替换它的基类型，而系统的行为还是保持不变。
	- 类A是类B的父类，那么在进行调用的时候，类A可以引用类B，但是反过来不行。
	
（4）接口隔离原则 Interface
	- 使用多个小的专门的接口，而不要使用一个大的总接口。
	
（5）依赖倒置原则 Dependency
	- 高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖于细节，细节应该依赖于抽象。
	- 降低了类之间的耦合性，提高了系统的可维护性和可扩展性。
```



### Java 支持多继承么,为什么？

```
不支持多继承，原因:
（1）安全性的考虑，如果子类继承的多个父类里面有相同的方法或者属性，子类将不知道具体要继承哪个。 
（2）Java 提供了接口和内部类以达到实现多继承功能，弥补单继承的缺陷。
```



### 抽象类和接口有什么区别

```
（1）主要目的
		- 抽象类是为了提供一个基类，这个基类包含子类共有的属性和方法实现，但可能包含一些没有实现的方法，子类继承后需要去实现这些抽象方法
		- 接口是为了定义一个规范，指定了类应该实现的方法。
（2）抽象类被子类继承，可以有构造方法，普通成员变量；接口被子类实现，不能有构造方法，也没有普通成员变量，只能有静态常量。
（3）一个类只能继承一个抽象类；一个类可以实现多个接口

如果希望为多个类提供共同的实现，则使用抽象类；
如果希望定义某个功能的规范而不关心具体实现，则使用接口。
```

### 深拷贝和浅拷贝区别了解吗？什么是引用拷贝？

```
（1）深拷贝：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。
（2）浅拷贝：浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。
（3）引用拷贝：引用拷贝就是两个不同的引用指向同一个对象。
```

### Java 创建对象有几种方式 [x]

```java
（1）使用new关键字：
  	ClassName objectName = new ClassName();

（2）反射中使用Class类的newInstance()方法：
		ClassName objectName = (ClassName) Class.forName("ClassName").newInstance();

（3）使用clone()方法：如果一个类实现了Cloneable接口，则可以使用clone()方法创建该对象的一个复制品。
  	ClassName object1 = new ClassName();
		ClassName object2 = (ClassName) object1.clone();

```



## Object

### 有哪些方法

```java
/**
 * native 方法，用于返回当前运行时对象的 Class 对象，使用了 final 关键字修饰，故不允许子类重写。
 */
public final native Class<?> getClass()
/**
 * native 方法，用于返回对象的哈希码，主要使用在哈希表中，比如 JDK 中的HashMap。
 */
public native int hashCode()
/**
 * 用于比较 2 个对象的内存地址是否相等，String 类对该方法进行了重写以用于比较字符串的值是否相等。
 */
public boolean equals(Object obj)
/**
 * native 方法，用于创建并返回当前对象的一份拷贝。
 */
protected native Object clone() throws CloneNotSupportedException
/**
 * 返回类的名字实例的哈希码的 16 进制的字符串。建议 Object 所有的子类都重写这个方法。
 */
public String toString()
/**
 * native 方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
 */
public final native void notify()
/**
 * native 方法，并且不能重写。跟 notify 一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
 */
public final native void notifyAll()
/**
 * native方法，并且不能重写。暂停线程的执行。注意：sleep 方法没有释放锁，而 wait 方法释放了锁 ，timeout 是等待时间。
 */
public final native void wait(long timeout) throws InterruptedException
/**
 * 多了 nanos 参数，这个参数表示额外时间（以纳秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 纳秒。。
 */
public final void wait(long timeout, int nanos) throws InterruptedException
/**
 * 跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念
 */
public final void wait() throws InterruptedException
/**
 * 实例被垃圾回收器回收的时候触发的操作
 */
protected void finalize() throws Throwable { }

```



### equals 与==的区别

```
==：
	- 如果是基本数据类型，==比较它们的值是否相等
	- 如果是引用对象，==会判断两个对象指向的内存地址是否相同，而不是比较内容
	
equals：
	- 如果没有重写equals()方法，则和==一样
	- 如果重写了，一般是比较两个对象中的属性是否相等
```

### hashCode() 有什么用？

```
（1）hashcode的作用是获取哈希码，也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。
（2）对象的快速比较：hashCode值不相等对象一定不等，hashCode值相等则进一步比较
```

### 为什么要有 hashCode？

```
【hashCode的作用】
以“HashSet 如何检查重复”为例子来说明为什么要有 hashCode？
把对象加入hashSet时，先计算对象的hashCode值，如果没有相等的直接加入；
如果有相等的，调用equals()进一步比较，如果不相等则把对象添加。

可以大大减少equals的次数，提高执行效率
```

### 为什么重写 equals() 时必须重写 hashCode() 方法？

```
两个对象相等，hashCode必须相等
如果重写equals()而没有重写hashCode()，会导致equals方法判断是两个相等的对象，但hashCode值却不相等
添加到HashSet等集合时就有可能可以添加多个一样的对象。
```



##  泛型

[参考](https://juejin.cn/post/6844904050673057799#heading-5)

### 是什么

```java
就是一种参数化类型，在编写一个类、接口或方式来操作特定类型的数据时，不需要实现知道这些数据的确切类型

public class Box<T> {
    private T t;

    public void set(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }
}
```

### 好处

```
（1）类型安全：泛型提供编译时类型检查，编译器会在编译期间检查代码，确保没有不合法或不安全的类型转换。如果存在不安全的转换或操作，编译器会报错。
（2）代码重用：对于相同逻辑，只是类型不同的代码，可以进行重用
（3）类型自动转换：相较于Object，不用类型转换，代码更简洁，可读性增强。
```

### 什么是类型擦除

```
使用泛型时，编译器会确保我们在代码中正确使用泛型，在代码编译成字节码后，泛型相关的信息就会被移除，这个过程就叫类型擦除
```

### 为什么需要类型擦除

```
（1）向后兼容：泛型出来前，已经有大量的java代码，为了能够和老版本的代码兼容
（2）简化虚拟机的设计：类型擦除确保了在运行时，虚拟机只需要处理原始类型，并不需要为泛型带来的类型多样性增加复杂性。这样，JVM不需要进行大量的修改就能支持泛型。
（3）泛型实例共享：由于类型擦除，例如List<String>和List<Integer>在运行时都被转化为了原始的List，这意味着不同的泛型类型在运行时实际上共享同一个Class实例。这有助于减少运行时的内存开销。
```



## String

### String，Stringbuffer，StringBuilder 的区别

```
（1）不可变性：
		- String是不可变的。
		- StringBuffer和StringBuilder都继承自AbstractStringBuilder类，在AbstractStringBuilder中也是使用字符数组保存字符串char[] value，但没有用final修饰，且提供了修改字符串的方法如append(), 所以两种对象都是可变的。
（2）安全性：
		- String是不可变的，所以是线程安全的
		- StringBuffer是线程安全的，大多数方法都是同步的
		- StringBuilder是线程非安全的，没用同步方法
（3）性能：
		- String每次修改都会产生一个新对象，频繁的修改会导致性能下降，(增加垃圾回收的负担)
		- StringBuffer、StringBuilder：都是对对象本身进行操作，StringBuilder没有同步方法，性能比StringBuffer快。
（4）使用场景：
		- String：当字符串内容不需要修改或字符串操作不频繁时
		- StringBuffer：在多线程环境中，如果需要频繁修改字符串内容，使用 StringBuffer 是合适的。
		- StringBuilder：在单线程环境中，如果需要频繁修改字符串内容，使用 StringBuilder 通常会提供更好的性能。

```

### String 为什么是不可变的?

```
private final char value[];
(1) 保存字符串的数组被 final 修饰且为私有的，并且String 类没有提供/暴露修改这个字符串的方法。
(2) String 类被 final 修饰导致其不能被继承，进而避免了子类破坏 String 不可变。
```

### 字符串常量池的作用了解吗？[x]

```java
字符串常量池 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。

// 在堆中创建字符串对象”ab“
// 将字符串对象”ab“的引用保存在字符串常量池中
String aa = "ab";
// 直接返回字符串常量池中字符串对象”ab“的引用
String bb = "ab";
System.out.println(aa==bb);// true
```



### String s1 = new String("abc");这句话创建了几个字符串对象？

```
会创建 1 或 2 个字符串对象。
(1) 如果字符串常量池中不存在字符串对象“abc”的引用，那么它将首先在字符串常量池中创建，然后在堆空间中创建，因此将创建总共 2 个字符串对象。
(2) 如果字符串常量池中已存在字符串对象“abc”的引用，则只会在堆中创建 1 个字符串对象“abc”。
```

### String s 与 new String 与有什么区别 [x]

```
String str ="whx"
先在常量池中查找有没有"whx" 这个对象,如果有，就让 str 指向那个"whx".
如果没有，在常量池中新建一个“whx”对象，并让 str 指向在常量池中新建的对 象"whx"

String newStr =new String ("whx");
是在堆中建立的对象"whx" ,在栈中创建堆中"whx" 对象的内存地址。
```

### String s="a"+"b"+"c"+"d";创建了几个对象？

```
1个

Java 编译器对字符串常量直接相加的表达式进行优化，不等到运行期去进行加法运算，在编译时就去掉了加号，直接将其编译成一个这些常量相连的结果。 所以 "a"+"b"+"c"+"d" 相当于直接定义一个 "abcd" 的字符串。
```





## 异常

### Exception 和 Error 有什么区别？

```
在 Java 中，所有的异常都有一个共同的祖先，java.lang.Throwable,它有两个重要的子类:
（1）Exception： 程序可以处理的异常。分为受检查异常、非受检查异常
（2）Error：程序无法处理的错误。
	- 栈溢出错误
	- 内存溢出错误
	
```

### Checked Exception 和 Unchecked Exception 有什么区别？

```
Checked Exception：Java 代码在编译过程中，如果受检查异常没有被 catch或者throws 关键字处理的话，就没办法通过编译。
	- IOException：表示输入/输出操作失败或中断的异常。
	- ClassNotFoundException：当应用程序试图加载某个类时，如果找不到相应的类，则抛出此异常。
	- NoSuchMethodException：当应用程序试图通过某个类的 getMethod 或 getDeclaredMethod 方法，调用一个不存在的方法时，抛出此异常。
	- InterruptedException：当一个线程在等待、睡眠或是处理中被中断时，抛出此异常。

Unchecked Exception：Java 代码在编译过程中 ，我们即使不处理不受检查异常也可以正常通过编译。
- NullPointerException(空指针错误)
- IllegalArgumentException(参数错误比如方法入参类型错误)
- NumberFormatException（字符串转换为数字格式错误，IllegalArgumentException的子类）
- ArrayIndexOutOfBoundsException（数组越界错误）
- ClassCastException（类型转换错误）
- ArithmeticException（算术错误）
- SecurityException （安全错误比如权限不够）
- UnsupportedOperationException(不支持的操作错误比如重复创建同一用户)
```

### finally 中的代码一定会执行吗？

```
不一定的！在某些情况下，finally 中的代码不会被执行。

（1）finally 之前虚拟机被终止运行的话，finally 中的代码就不会被执行。
（2）程序所在的线程死亡。
（3）关闭 CPU。
```

### final, finally, finalize 的区别 [x]

```
final：
	- 是一个关键字，用于声明某些事物不能被后续修改。
	- 用于修饰属性、方法和类。表示属性不能被重新赋值，方法不可被覆盖，类不可被继承
finally：
	是异常处理语句结构的一部分，一般以try-catch-finally出现，无论发生什么异常，finally都会被执行
finalize：
	是Object类中的一个方法，它会在垃圾回收器决定收回对象之前被调用。我们可以重写此方法以确保对象被后手前执行一些特定的清理任务
```



## 反射 [*]

### 是什么？[x]

```
反射是一种机制，指的是在程序运行时动态加载类并获取类的详细信息，从而操作类或对象的属性和方法。

https://blog.csdn.net/a745233700/article/details/82893076
```

```
oracle官方解释：指在运行状态中，对于任意一个类都能够知道这个类所有的属性和方法； 并且对于任意一个对象，都能够调用它的任意一个方法；这种动态获取信息以及动态调用对象方法的功能成为Java语言的反射机制。
```

### 实现原理

```
本质是JVM得到class对象之后，再通过class对象进行反编译，从而获取对象的各种信息。
```

### 获取 Class 对象的方法 [x]

```java
(1) 知道具体类
Class alunbarClass = TargetObject.class;

(2) 通过 Class.forName()传入类的全路径获取：
Class alunbarClass1 = Class.forName("cn.javaguide.TargetObject");

(3) 通过对象实例instance.getClass()获取：
TargetObject o = new TargetObject();
Class alunbarClass2 = o.getClass();

（4）通过类加载器xxxClassLoader.loadClass()传入类路径获取:
ClassLoader.getSystemClassLoader().loadClass("cn.javaguide.TargetObject");
```

[参考](https://javaguide.cn/java/basis/reflection.html#反射的一些基本操作)

### 应用场景 [*]

```
（1）框架设计：比如Spring中@Component注解就声明了一个类为 Spring Bean；@Value注解就读取到配置文件中的值
（2）动态代理：AOP允许在运行时动态地创建代理类
（3）ORM（对象关系映射）：ORM工具，如Hibernate，使用反射将数据库表与Java类相映射，从而可以动态地创建对象和设置属性，而不需要为每个数据库表手动写代码。
（4）自定义注解处理：可以使用反射来处理自定义注解，执行特定的逻辑。
（5）JSON和对象的转换：像Jackson和Gson这样的库允许你在JSON字符串和Java对象之间转换，并使用反射来动态地设置或获取对象的属性。
```



## Java 中 IO 流 [x]

```
分为字节流和字符流
（1）字节流：InputStream、OutputStream
（2）字符流：Reader、Writer
```

## JVM & JDK & JRE有什么区别 [x]

<img src="https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/21/14003216925976321692597632294gp7a91-image-20230821140032155.png" alt="image-20230821140032155" style="zoom: 67%;" />

```
（1）JDK：Java Development Kit 的简称，Java 开发工具包，包含JRE和开发工具，能够创建和编译程序
（2）JRE：Java Runtime Environment 的简称，Java 运行环境，为 Java 的运行提供了所需环境。
包含JVM和一些核心类库
（3）JVM：它为Java字节码提供了一个运行环境。JVM的核心职责是加载、验证、编译以及执行Java字节码
```

[参考](https://www.javalearn.cn/#/doc/Java%E5%9F%BA%E7%A1%80/%E9%9D%A2%E8%AF%95%E9%A2%98?id=jvm%e3%80%81jre%e5%92%8cjdk%e7%9a%84%e5%85%b3%e7%b3%bb%e6%98%af%e4%bb%80%e4%b9%88%ef%bc%9f)

## 什么是值传递和引用传递？

```
（1）值传递是对基本型变量而言的,传递的是该变量的一个副本，改变副本不影响原变量.
（2）引用传递一般是对于对象型变量而言的,传递的是该对象地址的一个副本, 并不是原对象本身 。 所以对引用对象进行操作会同时改变原对象.
```

## java是值传递还是引用传递 [x]

```java
（1）传递基本数据类型
当我们向方法传递基本数据类型的值时，例如 int、float、char 等，我们实际上是传递该值的拷贝。因此，即使方法修改了这个拷贝的值，原始变量的值也不会被改变。

（2）传递对象引用：
当我们向方法传递对象时，我们实际上是传递对象引用的拷贝，而不是对象本身的拷贝。因此，方法可以通过这个引用修改对象的状态，但不能修改这个引用本身，使其指向另一个对象。

// --- 例子1： str 也没有被改变 ---
String str = "ABC";
foo(str);

// 没有提供改变自身方法的引用类型
static void foo(String text) {		
		text = "windows";
}

// --- 例子2： sb 被改变了，变成了"iphone4"。---
StringBuilder sb1 = new StringBuilder("iphone");
foo1(sb1); 

// 提供了改变自身方法的引用类型
static void foo1(StringBuilder builder) {		
	builder.append("4");
}

// --- 例子3： sb 没有被改变，还是 "iphone" ---
StringBuilder sb2 = new StringBuilder("iphone");
foo2(sb2); 

// 提供了改变自身方法的引用类型，但是不使用，而是使用赋值运算符。
static void foo2(StringBuilder builder) {		
	builder = new StringBuilder("ipad");
}
```

[参考](https://developer.aliyun.com/article/378196)



## java8新特性

```
（1）lambda表达式（函数式接口）：允许我们将函数作为参数传递给另一个函数或返回一个函数。它能帮助简化代码并提高可读性。
（2）Streams API：Stream API 用于处理集合对象，可以极大地简化集合对象的操作，支持顺序和并行处理。
（3）Default 方法：在接口中可以定义具有实现的方法，而不仅仅是抽象方法，这有助于向接口添加新方法，而不破坏现有的实现。
（4）新的日期和时间API：
```

## try-resource

```java
（1）是 Java 7 引入的一个新特性，用于简化资源的管理和关闭。这种结构确保了在 try 代码块完成时，任何打开的资源都会被正确关闭，从而避免了资源泄漏。
（2）在传统的 try-catch-finally 结构中，开发者必须在 finally 块中明确地关闭资源。这不仅增加了代码的冗余性，而且在关闭资源时可能会出错或遗漏。
（3）使用 try-with-resources，开发者可以更简洁、更安全地管理资源。

  try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
    String line;
    while ((line = br.readLine()) != null) {
      System.out.println(line);
    }
  } catch (IOException e) {
    System.out.println("Error reading the file: " + e.getMessage());
  }
```

## Finally里面的语句一定会执行吗？

```
finally 块中的代码是在 try 和 catch 块之后执行的，无论之前的代码块是否抛出异常

不会执行的场景
（1）System.exit(): 如果 try 或 catch 块中调用了 System.exit() 方法，JVM 将终止，而 finally 块不会被执行。
（2）JVM崩溃: 如果JVM因为某些原因（例如OutOfMemoryError）崩溃了，finally块可能不会执行。
（3）无限循环: 如果 try 或 catch 块包含一个无限循环，finally 块也不会执行，因为代码流程无法到达 finally 块。
（4）线程被中断或 killed: 如果执行 try 或 catch 块的线程在进入 finally 之前被中断或 killed，那么 finally 块也可能不会执行。
```

