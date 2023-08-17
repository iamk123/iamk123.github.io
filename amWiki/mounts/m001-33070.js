if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m001']=[{"name":"01-Java基础.md","path":"001-JAVA/01-Java基础.md","content":"# Java基础\n\n## 基本数据类型\n\n### Java 中的几种基本数据类型有哪些？\n\n```\n6 种数字类型：\n  4 种整数型：byte、short、int、long\n  2 种浮点型：float、double\n1 种字符类型：char\n1 种布尔型：boolean。\n```\n\n### 包装类型\n\n```\n包装类型：Byte，Short，Integer，Long，Float，Double，Character，Boolean\n```\n\n### 基本类型和包装类型的区别？[x]\n\n```\n（1）默认值：基本数据类型未初始化时有默认值，如int默认为0；包装类型未初始化时默认为null\n（2）存储：基本数据类型基本上是存在栈中（未被static修饰的成员变量在堆中）；包装类型属于对象，存放在堆中\n（3）比较方式：基本数据类型比较的是值，；包装类型比较的是对象的内存地址，使用equals（）方法来比较\n（4）集合和泛型都只能用包装类，不能用基本数据类型\n```\n\n### 自动装箱与拆箱了解吗？原理是什么？[x]\n\n```\n（1）装箱：就是把基本类型转为包装类型。调用了包装类的valueOf()方法\n（2）拆箱：把包装类型转为基本数据类型。调用了xxValue()方法。（int就是intValue()）\n\nInteger i = 10 等价于 Integer i = Integer.valueOf(10)\nint n = i 等价于 int n = i.intValue();\n```\n\n### 为什么要自动装箱和拆箱\n\n```\n代码简化，更加直观：ArrayList<Integer>只能添加包装类，如果没有自动装箱，就需要我们手动新建Integer对象，然后添加\n```\n\n### 装箱 拆箱 缓存 TODO\n\n```\n\n```\n\n### 谈谈Integer i = new Integer(xxx)和Integer i =xxx;这两种方式的区别\n\n```\n（1）方式1显示创建一个Integer对象实例\n```\n\n\n\n## 变量\n\n### 字符型常量和字符串常量的区别?\n\n```\n（1）形式：字符型常量是单引号引起的一个字符；字符串常量是双引号引起的若干个字符\n（2）含义：字符常量相当于一个整型值（ASCII值），可以参加表达式运算；字符串常量代表一个地址值\n（3）内存：字符型常量只占2个字节；字符串常量占用若干字节\n```\n\n\n\n### 成员变量与局部变量的区别？[x]\n\n```\n（1）作用域：\n\t\t- 成员变量：属于类的一部分，在整个类中都可以访问。可以被public、private、protected、static修饰\n\t\t- 局部变量：定在方法、构造函数和代码块内部，只能在其定义的范围内使用。没有修饰符\n（2）生命周期\n\t\t- 成员变量：随着对象的创建而创建，在对象销毁时销毁\n\t\t- 局部变量：在声明时被创建，并在其作用域结束后被销毁。\n（3）默认值：\n\t\t- 成员变量: 如果没有显式初始化，会被赋予默认值，如数值类型为0，布尔类型为false，引用类型为null。\n\t\t- 局部变量：没有默认值，必须在使用之前进行显式初始化。\n\n```\n\n### 静态变量？[x]\n\n```\n（1）是什么\n静态变量就是被static关键值修饰的变量。它可以被类的所有实例共享，无论创建多个个对象，都共享同一份静态变量。也就是说，静态变量只会分配一次内存，可以节省内存。\n\n（2）访问方法\n\t\t- 通过类名直接访问。ClassName.staticVariable;\n\t\t- 通过对象引用访问。objectReference.staticVariable;\n```\n\n### 静态变量和实例变量的区别？\n\n```java\npublic class A {\n\n    private int x;         // 实例变量\n    private static int y;  // 静态变量\n\n    public static void main(String[] args) {\n        // int x = A.x;  // Non-static field \'x\' cannot be referenced from a static context\n        A a = new A();\n        int x = a.x;\n        int y = A.y;\n    }\n\t}\n\n（1）实例变量是属于实例的，与实例变量同生共死\n（2）访问方法不同\n```\n\n### 静态方法\n\n```\n使用static修饰的方法，静态方式也成类方法，是属于类的\n\n特点\n（1）无需实例化，通过类名调用\n（2）不能访问非静态成员\n（3）不能使用this关键值。静态方法中不能使用this关键字，因为this表示当前对象实例，而静态方法没有对象实例。\n（4）具有全局性：类的所有实例共享\n```\n\n### 静态代码块\n\n```java\nstatic {\n    // 静态代码块的代码逻辑\n}\n\n使用static修饰的一段代码块\n  \n特点\n（1）在类加载时执行，只执行一次\n（2）无需调用，自动执行\n（3）用于初始化静态成员\n（4）无法访问非静态变量\n```\n\n### 静态内部类 [x]\n\n```\n静态内部类是定义在另一个类中的内部类，被声明为静态的。\n\n特点：\n（1）可以直接访问外部类的静态方法和静态变量，无需创建外部类的对象。但不能直接访问外部类的非静态成员（包括实例变量和实例方法，需要通过创建外部类对象来访问）\n（2）可以在没有外部类对象的情况下被实力化和访问\n（3）生命周期独立于外部类，即使外部类被销毁，静态内部类仍然存在\n（4）静态内部类可以拥有静态成员和实例成员，包括静态变量、静态方法和实例变量、实例方法\n```\n\n```java\n// 静态内部类的声明方式如下：\npublic class OuterClass {\n    // 外部类的成员和方法\n    \n    public static class StaticInnerClass {\n        // 静态内部类的成员和方法\n    }\n}\n\n// 静态内部类可以通过以下方式实例化和访问：\nOuterClass.StaticInnerClass innerObject = new OuterClass.StaticInnerClass();\n// 访问静态内部类的成员和方法\ninnerObject.staticMethod();\ninnerObject.staticVariable;\n```\n\n### 静态内部类与非静态内部类的区别 [x]\n\n```\n（1）声明方式：有无static\n（2）实例化方式：静态内部类可以直接实例化；非静态内部类需要外部类的实例来创建\n（3）访问范围：\n\t\t- 静态内部类：只能访问外部类的静态成员，要访问非静态成员可以通过创建外部类的实例\n\t\t- 非静态内部类：可以直接访问外部类的静态与非静态成员\n（4）声明周期：\n\t\t- 静态内部类：独立于外部类，即使外部类被销毁，静态内部类的实例仍然存在\n\t\t- 非静态内部类：声明周期同外部类，共享一个实例\n```\n\n### 静态方法为什么不能调用非静态成员?\n\n```\n（1）静态方法是属于类的，在类加载时就会分配内存，可以通过类名直接访问；而非静态成员是属于实例对象的，只有在对象实例化之后才存在，需要通过类的实例对象去访问。\n（2）类中非静态成员不存在的时候，静态方法就已经存在了，此时调用内存中还不存在的非静态成员，属于非法操作\n```\n\n### 静态方法和实例方法有何不同？\n\n```\n（1）调用方式\n\t\t- 外部调用静态方法时，可以通过【类名.方法名】的方式，也可以通过【对象.方法名】的方式。\n\t\t- 实例方法只能通过【对象.方法名】\n（2）访问类成员是否存在限制\n\t\t- 静态方法只能反问类的静态成员（静态变量和静态方法），不允许访问实例成员\n```\n\n### 为什么静态变量不能在方法中定义\n\n```\n静态变量属于类的成员，生命周期与类相同，在类加载时就被初始化，类销毁时才会被销毁。\n定义在方法中的变量是局部变量，如果定义在方法中，那么只有方法被初始化，方法执行后就会销毁。\n```\n\n### 初始化顺序 [x]\n\n```\n静态变量和静态语句块优先于实例变量和普通语句块，静态变量和静态语句块的初始化顺序取决于它们在代码中的顺序。\n\n父类（静态变量、静态语句块）\n子类（静态变量、静态语句块）\n父类（实例变量、普通语句块）\n父类（构造函数）\n子类（实例变量、普通语句块）\n子类（构造函数）\n```\n\n\n\n### 重载和重写有什么区别？[x]\n\n```\n（1）重载：同一个类中多个同名方法根据不同的参数执行不同的逻辑\n\n（2）重写：运行期间，子类对父类的相同方法的重新改造\n“两同两小一大”：\n- “两同”即方法名相同、形参列表相同；\n- “两小”指的是子类方法返回值类型应比父类方法返回值类型更小或相等，子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等；\n- “一大”指的是子类方法的访问权限应比父类方法的访问权限更大或相等。\n\n关于 重写的返回值类型 这里需要额外多说明一下，上面的表述不太清晰准确：如果方法的返回类型是 void 和基本数据类型，则返回值重写时不可修改。但是如果方法的返回值是引用类型，重写时是可以返回该引用类型的子类的。\n\njavaguide\n```\n\n| 区别点     | 重载方法 | 重写方法                                                     |\n| :--------- | :------- | :----------------------------------------------------------- |\n| 发生范围   | 同一个类 | 子类                                                         |\n| 参数列表   | 必须修改 | 一定不能修改                                                 |\n| 返回类型   | 可修改   | 子类方法返回值类型应比父类方法返回值类型更小或相等           |\n| 异常       | 可修改   | 子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等； |\n| 访问修饰符 | 可修改   | 一定不能做更严格的限制（可以降低限制）                       |\n| 发生阶段   | 编译期   | 运行期                                                       |\n\n\n\n## 面向对象基础\n\n### 面向对象和面向过程的区别\n\n```\n面向过程：将一个大问题分解为一个方法，通过一个个方法的执行解决问题\n面向对象：会先抽象出对象，然后用对象执行方法的方式解决问题。为了能够更好的模块化、增加代码的重用性\n```\n\n### 创建一个对象用什么运算符?对象实体与对象引用有何不同?\n\n```\nnew 运算符，new 创建对象实例（对象实例在 内存中），\n对象引用指向对象实例（对象引用存放在栈内存中）。\n- 一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）；\n- 一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。\n```\n\n### 对象的相等和引用相等的区别\n\n```java\n对象的相等一般比较的是内存中存放的内容是否相等。\n引用相等一般比较的是他们指向的内存地址是否相等。\n\nString str1 = \"hello\";\nString str2 = new String(\"hello\");\nString str3 = \"hello\";\n// 使用 == 比较字符串的引用相等\nSystem.out.println(str1 == str2);\nSystem.out.println(str1 == str3);\n// 使用 equals 方法比较字符串的相等\nSystem.out.println(str1.equals(str2));\nSystem.out.println(str1.equals(str3));\n\nfalse\ntrue\ntrue\ntrue\n```\n\n### 构造方法有哪些特点？是否可被 override?\n\n```\n构造方法特点如下：\n- 名字与类名相同。\n- 没有返回值，但不能用 void 声明构造函数。\n- 生成类的对象时自动执行，无需调用。\n\n构造方法不能被 override（重写）,但是可以 overload（重载）,所以你可以看到一个类中有多个构造函数的情况。\n```\n\n### 面向对象三大特征\n\n封装\n\n```\n指把对象的属性封装在对象内部，不允许外部对象直接访问对象内部信息。可以提供一些被外界访问的方法来操作属性\n```\n\n继承\n\n```\n不同类型的对象，相互之间经常有一定数量的共同点, 可以将它们封装成一个类。\n其他类继承这个类后，拥有父类对象所有的属性和方法（私有属性也拥有，但无法访问）\n子类可以进行拓展，拥有自己的属性和方法，也可以对父类方法进行重写\n```\n\n多态\n\n```\n多态指同一个行为具有多个不同的表现形式或形态的能力\n\n（1）编译时多态：主要是通过方法的重载实现的，编译时，java编译器会根据调用方法的参数类型、数量来决定使用哪个方法\n（2）运行时多态：主要通过方法的重写和继承实现的。当子类继承父类并重写父类的方法时，父类引用指向子类对象，并调用子类对象的方法，这种方法调用解析是在运行时进行的。\n```\n\n### 抽象类和接口有什么区别\n\n```\n（1）主要目的\n\t\t- 抽象类是为了提供一个基类，这个基类包含子类共有的属性和方法实现，但可能包含一些没有实现的方法，子类继承后需要去实现这些抽象方法\n\t\t- 接口是为了定义一个规范，指定了类应该实现的方法。\n（2）抽象类被子类继承，可以有构造方法，普通成员变量；接口被子类实现，不能有构造方法，也没有普通成员变量，只能有静态常量。\n（3）一个类只能继承一个抽象类；一个类可以实现多个接口\n\n如果希望为多个类提供共同的实现，则使用抽象类；\n如果希望定义某个功能的规范而不关心具体实现，则使用接口。\n```\n\n### 深拷贝和浅拷贝区别了解吗？什么是引用拷贝？\n\n```\n（1）深拷贝：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。\n（2）浅拷贝：浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。\n（3）引用拷贝：引用拷贝就是两个不同的引用指向同一个对象。\n```\n\n\n\n## Object\n\n### equals 与==的区别\n\n```\n==：\n\t- 如果是基本数据类型，==比较它们的值是否相等\n\t- 如果是引用对象，==会判断两个对象指向的内存地址是否相同，而不是比较内容\n\t\nequals：\n\t- 如果没有重写equals()方法，则和==一样\n\t- 如果重写了，一般是比较两个对象中的属性是否相等\n```\n\n### hashCode() 有什么用？\n\n```\n（1）hashcode的作用是获取哈希码，也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。\n（2）对象的快速比较：hashCode值不相等对象一定不等，hashCode值相等则进一步比较\n```\n\n### 为什么要有 hashCode？\n\n```\n【hashCode的作用】\n以“HashSet 如何检查重复”为例子来说明为什么要有 hashCode？\n把对象加入hashSet时，先计算对象的hashCode值，如果没有相等的直接加入；\n如果有相等的，调用equals()进一步比较，如果不相等则把对象添加。\n\n可以大大减少equals的次数，提高执行效率\n```\n\n### 为什么重写 equals() 时必须重写 hashCode() 方法？\n\n```\n两个对象相等，hashCode必须相等\n如果重写equals()而没有重写hashCode()，会导致equals方法判断是两个相等的对象，但hashCode值却不相等\n```\n\n\n\n## String\n\n### String，Stringbuffer，StringBuilder 的区别\n\n```\n（1）不可变性：\n\t\t- String是不可变的。\n\t\t- StringBuffer和StringBuilder都继承自AbstractStringBuilder类，在AbstractStringBuilder中也是使用字符数组保存字符串char[] value，但没有用final修饰，且提供了修改字符串的方法如append(), 所以两种对象都是可变的。\n（2）安全性：\n\t\t- String是不可变的，所以是线程安全的\n\t\t- StringBuffer是线程安全的，大多数方法都是同步的\n\t\t- StringBuilder是线程非安全的，没用同步方法\n（3）性能：\n\t\t- String每次修改都会产生一个新对象，频繁的修改会导致性能下降，(增加垃圾回收的负担)\n\t\t- StringBuffer、StringBuilder：都是对对象本身进行操作，StringBuilder没有同步方法，性能比StringBuffer快。\n（4）使用场景：\n\t\t- String：当字符串内容不需要修改或字符串操作不频繁时\n\t\t- StringBuffer：在多线程环境中，如果需要频繁修改字符串内容，使用 StringBuffer 是合适的。\n\t\t- StringBuilder：在单线程环境中，如果需要频繁修改字符串内容，使用 StringBuilder 通常会提供更好的性能。\n\n```\n\n### String 为什么是不可变的?\n\n```\nprivate final char value[];\n(1) 保存字符串的数组被 final 修饰且为私有的，并且String 类没有提供/暴露修改这个字符串的方法。\n(2)String 类被 final 修饰导致其不能被继承，进而避免了子类破坏 String 不可变。\n```\n\n### 字符串常量池的作用了解吗？\n\n```java\n字符串常量池 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。\n\n// 在堆中创建字符串对象”ab“\n// 将字符串对象”ab“的引用保存在字符串常量池中\nString aa = \"ab\";\n// 直接返回字符串常量池中字符串对象”ab“的引用\nString bb = \"ab\";\nSystem.out.println(aa==bb);// true\n```\n\n\n\n### String s1 = new String(\"abc\");这句话创建了几个字符串对象？\n\n```\n会创建 1 或 2 个字符串对象。\n(1) 如果字符串常量池中不存在字符串对象“abc”的引用，那么它将首先在字符串常量池中创建，然后在堆空间中创建，因此将创建总共 2 个字符串对象。\n(2) 如果字符串常量池中已存在字符串对象“abc”的引用，则只会在堆中创建 1 个字符串对象“abc”。\n```\n\n\n\n## 异常\n\n### Exception 和 Error 有什么区别？\n\n```\n在 Java 中，所有的异常都有一个共同的祖先，java.lang.Throwable,它有两个重要的子类:\n- Exception： 程序可以处理的异常。分为受检查异常、非受检查异常\n- Error：程序无法处理的错误。\n```\n\n### Checked Exception 和 Unchecked Exception 有什么区别？\n\n```\nChecked Exception：Java 代码在编译过程中，如果受检查异常没有被 catch或者throws 关键字处理的话，就没办法通过编译。例如IOException\n\nUnchecked Exception：Java 代码在编译过程中 ，我们即使不处理不受检查异常也可以正常通过编译。\n- NullPointerException(空指针错误)\n- IllegalArgumentException(参数错误比如方法入参类型错误)\n- NumberFormatException（字符串转换为数字格式错误，IllegalArgumentException的子类）\n- ArrayIndexOutOfBoundsException（数组越界错误）\n- ClassCastException（类型转换错误）\n- ArithmeticException（算术错误）\n- SecurityException （安全错误比如权限不够）\n- UnsupportedOperationException(不支持的操作错误比如重复创建同一用户)\n```\n\n### finally 中的代码一定会执行吗？\n\n```\n不一定的！在某些情况下，finally 中的代码不会被执行。\n\n（1）finally 之前虚拟机被终止运行的话，finally 中的代码就不会被执行。\n（2）程序所在的线程死亡。\n（3）关闭 CPU。\n```\n\n### final, finally, finalize 的区别\n\n```\nfinal：\n\t- 是一个关键字，用于声明某些事物不能被后续修改。\n\t- 用于修饰属性、方法和类。表示属性不能被重新赋值，方法不可被覆盖，类不可被继承\nfinally：\n\t是异常处理语句结构的一部分，一般以try-catch-finally出现，无论发生什么异常，finally都会被执行\nfinalize：\n\t是Object类中的一个方法，它会在垃圾回收器决定收回对象之前被调用。我们可以重写此方法以确保对象被后手前执行一些特定的清理任务\n```\n\n\n\n## 反射\n\n### 是什么？\n\n```\n反射是一种机制，指的是在程序运行时动态加载类并获取类的详细信息，从而操作类或对象的属性和方法。\n本质是JVM得到class对象之后，再通过class对象进行反编译，从而获取对象的各种信息。\n\nhttps://blog.csdn.net/a745233700/article/details/82893076\n```\n\n","timestamp":1692282363931},{"name":"02-集合.md","path":"001-JAVA/02-集合.md","content":"## Java集合\n\n### Java 集合概览\n\n```\nJava 集合， 也叫作容器，主要是由两大接口派生而来：\n1. 一个是 Collection接口，主要用于存放单一元素；\n\t- 下面又有三个主要的子接口：List、Set 和 Queue。\n2. 另一个是 Map 接口，主要用于存放键值对。\n\n```\n\n![Java 集合框架概览](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/16/230544169219834416921983448694vHFLk-11464016882696001688269600418RyFb8U-java-collection-hierarchy.png)\n\n### List, Set, Queue, Map 四者的区别？\n\n```\nList: 有序、可重复\nSet： 无需、不重复\nQueue: 有序可重复，先进先出\nMap: 使用键值对存储。key是无序、不重复； value：无序、可重复\n```\n\n### 为什么要使用集合？\n\n```\n数组的缺点：\n当我们需要存储一组类型相同的数据时，数组是最常用且最基本的容器之一。但是，使用数组存储对象存在一些不足之处，因为在实际开发中，存储的数据类型多种多样且数量不确定。\n\n集合的优点：\n（1）与数组相比，Java 集合提供了更灵活、更有效的方法来存储多个数据对象。Java 集合框架中的各种集合类和接口可以存储不同类型和数量的对象，同时还具有多样化的操作方式。\n（2）相较于数组，Java 集合的优势在于它们的大小可变、支持泛型、具有内建算法等。\n（3）总的来说，Java 集合提高了数据的存储和处理灵活性，可以更好地适应现代软件开发中多样化的数据需求，并支持高质量的代码编写。\n```\n\n### List\n\n#### ArrayList 和 Array（数组）的区别？[x]\n\n```\n（1）大小可变性：数组的长度在创建时就确定，并且不能改变。而 ArrayList 的大小是可以动态调整的，可以根据需要自动扩容或缩减。\n（2）对象类型：数组可以存储任何类型的对象，包括基本数据类型和引用类型。而 ArrayList 只能存储引用类型的对象，不能直接存储基本数据类型，需要使用对应的包装类型。\n（3）功能和灵活性：ArrayList 提供了丰富的方法和操作，可以方便地进行元素的插入、删除、查找等操作，以及获取列表的大小、遍历元素等。而数组的功能相对较少，需要手动实现这些操作。\n（4）性能：由于 ArrayList 内部使用数组实现，它在动态扩容和元素移动等操作时会引入一些性能开销。而数组在访问元素时更加高效，因为它们在内存中是连续存储的。\n（5）多维数据结构：数组可以轻松地表示多维数据结构，而 ArrayList 并不直接支持多维数据结构。\n\n综上所述，ArrayList 相对于数组具有更大的灵活性和功能，可以自动调整大小并提供方便的操作方法。但在性能要求较高、固定长度或多维数据结构等特定场景下，数组可能更适合使用。在选择使用 ArrayList 还是数组时，需要根据具体的需求和情况做出选择。·\n\nchatgpt\n```\n\n#### ArrayList和Array相比有很多优点，那为什么不都是用ArrayList，还要使用Array？\n\n```\n（1）性能：数组在访问元素时更加高效，因为它们在内存中是连续存储的。相比之下，ArrayList 内部使用数组实现，但它还需要进行动态扩容和元素移动等操作，可能会引入一些性能开销。\n（2）固定长度：如果数据集的大小是固定的，不会发生变化，那么使用数组是更合适的选择。数组的长度在创建时确定，之后不能改变，这可以提供更好的性能和内存利用率。\n（3）多维数组：数组可以轻松地表示多维数据结构，而 ArrayList 并不直接支持多维数据结构。在需要处理矩阵、图形、二维表等数据时，使用数组可以更自然地表示和操作。\n（4）直接访问索引：有时候我们需要直接访问数组的特定位置，而不需要进行插入、删除等操作。使用数组可以直接通过索引进行快速访问，而不需要进行额外的查找操作。\n\nArrayList 和数组都有各自的优势和适用场景。在大多数情况下，ArrayList 提供了更多的便利性和灵活性，可以自动调整大小，并提供了丰富的方法和操作。但对于一些特定的场景，如性能要求较高、固定长度或多维数据等，使用数组可能更为合适。\n\nchatgpt\n```\n\n#### ArrayList 可以添加 null 值吗？\n\n```\nArrayList 中可以存储任何类型的对象，包括 null 值。不过，不建议向ArrayList 中添加 null 值， null 值无意义，会让代码难以维护比如忘记做判空处理就会导致空指针异常\n\njavaguide\n```\n\n#### ArrayList 插入和删除元素的时间复杂度？\n\n```\n对于插入：\n- 头部插入：由于需要将所有元素都依次向后移动一个位置，因此时间复杂度是 O(n)。\n- 尾部插入：当 ArrayList 的容量未达到极限时，往列表末尾插入元素的时间复杂度是 O(1)，因为它只需要在数组末尾添加一个元素即可；当容量已达到极限并且需要扩容时，则需要执行一次 O(n) 的操作将原数组复制到新的更大的数组中，然后再执行 O(1) 的操作添加元素。\n- 指定位置插入：需要将目标位置之后的所有元素都向后移动一个位置，然后再把新元素放入指定位置。这个过程需要移动平均 n/2 个元素，因此时间复杂度为 O(n)。\n\n对于删除：\n- 头部删除：由于需要将所有元素依次向前移动一个位置，因此时间复杂度是 O(n)。\n- 尾部删除：当删除的元素位于列表末尾时，时间复杂度为 O(1)。\n- 指定位置删除：需要将目标元素之后的所有元素向前移动一个位置以填补被删除的空白位置，因此需要移动平均 n/2 个元素，时间复杂度为 O(n)。\n\njavaguide\n```\n\n#### LinkedList 插入和删除元素的时间复杂度？\n\n```\n- 头部插入/删除：只需要修改头结点的指针即可完成插入/删除操作，因此时间复杂度为 O(1)。\n- 尾部插入/删除：只需要修改尾结点的指针即可完成插入/删除操作，因此时间复杂度为 O(1)。\n- 指定位置插入/删除：需要先移动到指定位置，再修改指定节点的指针完成插入/删除，因此需要移动平均 n/2 个元素，时间复杂度为 O(n)。\n\njavaguide\n```\n\n#### LinkedList 为什么不能实现 RandomAccess 接口？\n\n```\nRandomAccess 是一个标记接口，用来表明实现该接口的类支持随机访问（即可以通过索引快速访问元素）。由于 LinkedList 底层数据结构是链表，内存地址不连续，只能通过指针来定位，不支持随机快速访问，所以不能实现 RandomAccess 接口。\n\njavaguide\n```\n\n#### ArrayList 与 LinkedList 区别?\n\n```\n（1）线程安全：都是不同步的，不保证线程安全\n（2）底层实现：\n\t- ArrayList使用Object数组实现，\n\t- LinkedList使用双向链表实现\n（3）插入和删除操作：\n\t- ArrayList 需要移动元素来保持连续存储的特性，因此对于大量的插入和删除操作，性能可能较低\n\t- LinkedList 的插入和删除操作只需要调整链表中的指针，因此对于频繁的插入和删除操作，性能可能更好\n（4）随即访问：\n\t- ArrayList支持\n\t- LinkedList不支持\n（5）内存占用：\n\t- ArrayList 在存储元素时需要预留一定的连续内存空间，因此它的内存占用比较高\n\t- LinkedList 的每个节点只需要存储元素值和指向前后节点的指针，因此内存占用相对较低\n\t\n如果需要频繁进行插入和删除操作，可以选择 LinkedList；如果需要频繁进行随机访问操作，可以选择 ArrayList。\n\nchatgpt\n```\n\n#### ArrayList 的扩容机制 [x]\n\n```java\n（1）初始容量：ArrayList 在创建时会分配一个初始容量，通常为 10（可以通过构造函数指定初始容量）。\n（2）扩容时机：向ArrayList添加元素时，如果当前元素个数超过了当前容量，ArrayList 将会进行扩容\n（3）扩容策略：ArrayList 扩容时会创建一个新的内部数组（当前容量的1.5倍），并将原来的元素复制到新数组中。\n\nArrayList扩容的本质就是计算出新的扩容数组的size后实例化，并将原有数组内容复制到新数组中去。默认情况下，新的容量会是原容量的1.5倍。\n\n以JDK1.8为例说明:\npublic boolean add(E e) {\n    //判断是否可以容纳e，若能，则直接添加在末尾；若不能，则进行扩容，然后再把e添加在末尾\n    ensureCapacityInternal(size + 1);  // Increments modCount!!\n    //将e添加到数组末尾\n    elementData[size++] = e;\n    return true;\n    }\n\n// 每次在add()一个元素时，arraylist都需要对这个list的容量进行一个判断。通过ensureCapacityInternal()方法确保当前ArrayList维护的数组具有存储新元素的能力，经过处理之后将元素存储在数组elementData的尾部\nprivate void ensureCapacityInternal(int minCapacity) {\n      ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));\n}\n\nprivate static int calculateCapacity(Object[] elementData, int minCapacity) {\n        //如果传入的是个空数组则最小容量取默认容量与minCapacity之间的最大值\n        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {\n            return Math.max(DEFAULT_CAPACITY, minCapacity);\n        }\n        return minCapacity;\n    }\n    \n  private void ensureExplicitCapacity(int minCapacity) {\n        modCount++;\n        // 若ArrayList已有的存储能力满足最低存储要求，则返回add直接添加元素；如果最低要求的存储能力>ArrayList已有的存储能力，这就表示ArrayList的存储能力不足，因此需要调用 grow();方法进行扩容\n        if (minCapacity - elementData.length > 0)\n            grow(minCapacity);\n    }\n\n\nprivate void grow(int minCapacity) {\n        // 获取elementData数组的内存空间长度\n        int oldCapacity = elementData.length;\n        // 扩容至原来的1.5倍\n        int newCapacity = oldCapacity + (oldCapacity >> 1);\n        //校验容量是否够\n        if (newCapacity - minCapacity < 0)\n            newCapacity = minCapacity;\n        //若预设值大于默认的最大值，检查是否溢出\n        if (newCapacity - MAX_ARRAY_SIZE > 0)\n            newCapacity = hugeCapacity(minCapacity);\n        // 调用Arrays.copyOf方法将elementData数组指向新的内存空间\n         //并将elementData的数据复制到新的内存空间\n        elementData = Arrays.copyOf(elementData, newCapacity);\n    }\n\nchatgpt\n面试小抄：https://www.javalearn.cn/#/doc/Java集合/面试题?id=_5-说一说arraylist-的扩容机制？\n其他：javaguide: ArrayList 源码分析：https://javaguide.cn/java/collection/arraylist-source-code.html#arraylist-简介\n```\n\nArrayList 的构造函数\n\n```\n（1）默认构造函数，使用初始容量10构造一个空列表。\n\t\t实际上初始化赋值的是一个空数组。当真正对数组进行添加元素操作时，才真正分配容量。即向数组中添加第一个元素时，数组容量扩为 10。\n（2）带初始容量参数的构造函数。\n（3）构造包含指定collection元素的列表\n```\n\n\n\n### Set\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/16/23054516921983451692198345635eCX62E-22325016883947701688394770256dipO8b-image-20230703223250082.png\" alt=\"image-20230703223250082\" style=\"zoom:50%;\" />\n\n#### 什么是Set？[x]\n\n```\nSet 是 Java 中的一种集合（Collection）类型，Set 接口继承自 Collection 接口，它是一个不允许包含重复元素的集合。\n\n主要特点：\n（1）不可重复性。Set 中不能包含相同的元素，如果试图添加重复元素，则添加操作会失败。\n（2）无序性：Set 中的元素没有固定的顺序，即元素的顺序是不可预测的。\n（3）提供高效的查找操作：Set 提供了高效的查找操作，可以快速判断一个元素是否存在于 Set 中。\n\n常见实现类：\n（1）HashSet：基于哈希表实现，插入和查找操作的时间复杂度为 O(1)，不保证元素的顺序。\n（2）TreeSet：基于红黑树实现，插入和查找操作的时间复杂度为 O(logN)，元素按照自然排序或自定义排序进行排序。\n（3）LinkedHashSet：基于哈希表和链表实现，插入和查找操作的时间复杂度为 O(1)，元素按照插入顺序排序。\n\n常见用途：\n（1）去重：可以使用 Set 来去除集合中重复的元素，只保留不重复的元素。\n（2）判断元素是否存在：可以通过 Set 来快速判断一个元素是否存在于集合中。\n（3）数学集合运算：Set 支持集合的交集、并集、差集等运算，方便进行集合操作。\n\nchatgpt\n```\n\n#### 什么是HashSet？\n\n```\n（1）底层实现：基于哈希表（HashMap）实现，通过哈希函数将元素映射到桶中\n（2）无序性：不保证元素的插入顺序和存储顺序一致。\n（3）唯一性：每个元素都是唯一的。元素的唯一性是通过HashMap中键的唯一性来实现的，通过hashCode()和equals()方法来判断的。\n（4）允许空元素：HashSet可以存储空元素（null），但只能存储一个空元素，因为元素的唯一性要求。\n（5）性能高效：查找、插入和删除元素的时间复杂度是常数时间O(1)。\n\nchatgpt\n```\n\n#### HashSet是如何保证唯一性的？\n\n```\nHashSet通过HashMap来实现唯一性。\n\n当向HashSet中添加元素时，首先会计算元素的HashCode，找到对应的桶。\n然后遍历这个桶中的元素，比较它们的哈希code值，如果不相等则直接加入。\n如果哈希码相等，则用equals方法比较两个元素，如果返回true则表示重复元素，添加失败。否则添加成功\n```\n\n#### 什么是LinkedHashSet？[x]\n\n```\n（1）底层实现：继承自HashSet，通过哈希表+双向链表实现。哈希表提供了快速的查找和删除操作，链表则用于维护元素的插入顺序。\n（2）有序性：可以保持元素的插入顺序和存储顺序一致\n（3）唯一性：每个元素都是唯一的。\n（4）允许空元素：与HashSet一样，LinkedHashSet可以存储空元素（null），但只能存储一个空元素。\n（5）性能：LinkedHashSet的性能与HashSet相当，查找、插入和删除操作的平均时间复杂度为常数时间O(1)。\n\nchatgpt\n```\n\n#### 什么是TreeSet? [x]\n\n```\n（1）底层实现：TreeSet内部使用红黑树（Red-Black Tree）数据结构来存储元素。红黑树是一种自平衡的二叉查找树，可以保持元素的有序性，并提供高效的插入、删除和查找操作。\n（2）有序性：TreeSet会根据元素的比较规则对元素进行排序。如果元素实现了Comparable接口，将使用元素自身的比较逻辑来进行排序（对于整数类型的元素，默认的升序排序将会从小到大排列元素）；如果没有实现Comparable接口，可以在构造TreeSet时传入自定义的比较器来指定元素的排序规则。\n（3）唯一性：与Set接口一样，TreeSet不允许存储重复的元素，每个元素都是唯一的。\n（4）允许空元素：TreeSet可以存储空元素（null），但在比较元素时需要注意，因为空元素无法进行比较。\n（5）性能方面：TreeSet的插入、删除和查找操作的时间复杂度为O(log n)，其中n表示集合中的元素个数。由于红黑树的自平衡特性，TreeSet在大部分情况下具有良好的性能。\n\nTreeSet适用于需要元素有序并且需要高效的插入、删除和查找操作的场景。它常用于排序、范围查找等场景，也可以通过自定义比较器来指定特定的排序规则。\n\nchatgpt\n```\n\n#### TreeSet是如何保证有序性的？TODO\n\n```\n\n```\n\n\n\n#### 比较 HashSet、LinkedHashSet 和 TreeSet 三者的异同 [x]\n\n```\nHashSet、LinkedHashSet和TreeSet都是Java集合框架中的Set接口的实现类\n\n（1）底层实现：HashSet和LinkedHashSet都是基于哈希表实现的，TreeSet是基于红黑树实现的\n（2）有序性：HashSet无序，LinkedHashSet保留了插入顺序，TreeSet根据元素的比较规则对元素进行排序，或者在构造TreeSet时自定义比较器。\n（3）唯一性：都保证了元素的唯一性\n（4）都允许空元素\n（5）性能：HashSet的插入和查找操作的性能较好，而TreeSet的有序性和范围查询是其特点，LinkedHashSet则在保持插入顺序的同时提供了较好的性能。\n\nchatgpt\n```\n\n#### TreeSet的两种方式\n\n元素实现Comparable接口\n\n```java\npublic class Person implements Comparable<Person> {\n    private String name;\n    private int age;\n\n    @Override\n    public int compareTo(Person other) {\n        // 比较逻辑，按照年龄进行比较\n        return this.age - other.age;\n    }\n}\n\n如果当前元素小于传入的元素，应返回负整数。\n如果当前元素等于传入的元素，应返回零。\n如果当前元素大于传入的元素，应返回正整数。\n\nchatgpt\n```\n\n自定义比较器\n\n```java\npublic class PersonComparator implements Comparator<Person> {\n    @Override\n    public int compare(Person p1, Person p2) {\n        // 比较逻辑，按照年龄进行比较\n        return p1.getAge() - p2.getAge();\n    }\n}\n\n// 使用自定义比较器构造 TreeSet 对象\nTreeSet<Person> treeSet = new TreeSet<>(new PersonComparator());\n\nchatgpt\n```\n\n### Queue\n\n![image-20230704162733908](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/16/230546169219834616921983464752vZMMk-16273416884592541688459254135NeEAbK-image-20230704162733908.png)\n\n####  Queue 与 Deque 的区别\n\n```\nQueue 是单端队列，只能从一端插入元素，另一端删除元素，实现上一般遵循 先进先出（FIFO）规则。\nQueue 扩展了 Collection 的接口，根据因为容量问题而导致操作失败后处理方式的不同 可以分为两类方法: 一种在操作失败后会抛出异常，另一种则会返回特殊值。\n```\n\n| `Queue` 接口 | 抛出异常  | 返回特殊值          |\n| ------------ | --------- | ------------------- |\n| 插入队尾     | add(E e)  | offer(E e): boolean |\n| 删除队首     | remove()  | poll()：null        |\n| 查询队首元素 | element() | peek(): null        |\n\n```\nDeque 是双端队列，在队列的两端均可以插入或删除元素。\nDeque 扩展了 Queue 的接口, 增加了在队首和队尾进行插入和删除的方法，同样根据失败后处理方式的不同分为两类：\n```\n\n| `Deque` 接口 | 抛出异常      | 返回特殊值      |\n| ------------ | ------------- | --------------- |\n| 插入队首     | addFirst(E e) | offerFirst(E e) |\n| 插入队尾     | addLast(E e)  | offerLast(E e)  |\n| 删除队首     | removeFirst() | pollFirst()     |\n| 删除队尾     | removeLast()  | pollLast()      |\n| 查询队首元素 | getFirst()    | peekFirst()     |\n| 查询队尾元素 | getLast()     | peekLast()      |\n\n#### ArrayDeque 与 LinkedList 的区别 [x]\n\n```\nArrayDeque 和 LinkedList 都是 Java 中常用的双端队列（Deque）的实现，它们在实现方式和性能上有一些区别。\n\n（1）内部实现方式\n\t\t- ArrayDeque：内部使用循环数组实现，可以自动扩容和缩容，具有较高的访问和操作性能\n\t\t- LinkedList：内部使用双向链表实现，每个节点包含前后节点的引用，支持快速插入和删除\n（2）访问和操作性能\n\t\t- ArrayDeque：头尾增删性能好O(1)。使用了循环数组，有较好的空间利用率\n\t\t- LinkedList：头尾增删性能好O(1)。随机访问和搜索差O(n)\n（3）内存占用\n\t\t- ArrayDeque 的内存占用比 LinkedList 少，因为它不需要为每个元素额外存储前后节点的引用。\n（4）适用场景\n\t\t- ArrayDeque：适用于头尾增删，随机访问性能要求高的\n\t\t- LinkedList：适用于任意位置增删，随机访问性能要求不高的\n\nchatgpt\n```\n\n#### 什么是PriorityQueue [x]\n\n```\n是Java中优先级队列的实现，与 Queue 的区别在于元素出队顺序是与优先级相关的，即总是优先级最高的元素先出队。\n\n（1）底层实现：利用二叉堆的数据结构实现，底层使用可变长的数组来存储数据\n（2）有序性：不保证有序性，保证每次取出的元素是优先级最高的\n（3）唯一性：允许插入相同的元素，取出时优先级顺序不定\n（4）空元素：是非线程安全的，且不支持存储 NULL 和 non-comparable 的对象\n（5）性能：插入和删除操作的时间复杂度为 O(log n)，查找O(n)\n\nchatgpt\n```\n\n\n\n### Map [x]\n\n![image-20230705204107476](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/16/23054816921983481692198348921CBvLjK-20410716885608671688560867635aqltK5-image-20230705204107476.png)\n\n\n\n####  HashMap \n\n```\n是Java中的一种散列表实现，用于存储键值对数据，基于哈希表实现，可以快速增删查\n\n\n（1）底层实现：底层通过数组和链表（或红黑树）实现。每个键值对被封装为一个Entry对象，其中包含了键和值的信息。通过对键进行哈希计算，确定该键值对在内部数组中的存储位置。\n（2）有序性：不保证有序\n（3）唯一性：键是唯一的，不允许重复，键和值可以是任意类型的对象\n（4）空元素：允许存储null键和null值（除了Hashtable）\n（5）性能：通过键来进行快速的插入、删除和查找操作，时间复杂度为O(1)\n\nchatgpt\n```\n\n####  一般用什么作为HashMap的key? [x]\n\n```\n一般用Integer、String 这种不可变类当 HashMap 当 key，而且 String 最为常用。\n\n（1）不可变：这些类是不可变的，一旦创建就不能被修改。这使得在哈希计算时保持稳定，不会发生改变。确保相同的内容始终具有相同的哈希值，保证hashmap键的唯一性\n（2）hashcode()和equals()的正确实现。所有类都继承至Object，提供了默认的hashcode()和equals(),但并不一定适用于所有类。而String类已经对这两个方法进行了正确的重写，从而保证了相同内容的字符串具有相同的哈希码。\n（3）高度优化的哈希函数：Java 的 String 类内部实现了高度优化的哈希函数，可以快速计算出字符串的哈希码。这有助于提高 HashMap 在处理 String 类型的键时的性能。\n```\n\n#### 用可变类当 HashMap 的 key 有什么问题?\n\n```\nhashcode 可能发生改变，导致 put 进去的值，无法 get 出。如下所示\n\nHashMap<List<String>, Object> changeMap = new HashMap<>();\nList<String> list = new ArrayList<>();\nlist.add(\"hello\");\nObject objectValue = new Object();\nchangeMap.put(list, objectValue);\nSystem.out.println(changeMap.get(list));\nlist.add(\"hello world\");//hashcode发生了改变\nSystem.out.println(changeMap.get(list));\n\n输出值如下：\njava.lang.Object@74a14482\nnull\n```\n\n#### [HashMap的底层数据结构是什么？](https://www.javalearn.cn/#/doc/Java集合/面试题?id=_7-hashmap的底层数据结构是什么？)\n\n```\n在 JDK 1.7 中，\nHashMap 使用了数组+链表的组合来实现。具体来说，它使用了一个 Entry 数组来存储键值对，每个数组元素是一个链表的头节点。当发生哈希冲突时，新的键值对会被添加到链表的末尾。这种实现方式称为\"拉链法\"（Chaining）。\n\n当链表过长，则会严重影响 HashMap 的性能，链表是糟糕的 O(n)\n在JDK1.8 中，进行了优化，引入了红黑树\n插入元素时\n- 当链表 > 8 且数据总量 >= 64 时，hashmap会将链表转换为红黑树\n- 当红黑树的节点数量 < 6时，红黑树会重新转换为链表。\n这种优化能够更好地平衡存储空间和执行效率。\n\nchatgpt\n面试小抄\n```\n\n#### [解决hash冲突的办法有哪些？HashMap用的哪种？](https://www.javalearn.cn/#/doc/Java集合/面试题?id=_8-解决hash冲突的办法有哪些？hashmap用的哪种？)\n\n```\n解决Hash冲突方法有:开放定址法、再哈希法、链地址法（拉链法）、建立公共溢出区。HashMap中采用的是 链地址法 。\n\n（1）开放定址法：也称为再散列法，基本思想就是，如果p=H(key)出现冲突时，则以p为基础，再次hash，p1=H(p),如果p1再次出现冲突，则以p1为基础，以此类推，直到找到一个不冲突的哈希地址pi。 因此开放定址法所需要的hash表的长度要大于等于所需要存放的元素，而且因为存在再次hash，所以只能在删除的节点上做标记，而不能真正删除节点。\n（2）再哈希法(双重散列，多重散列)：提供多个不同的hash函数，当R1=H1(key1)发生冲突时，再计算R2=H2(key1)，直到没有冲突为止。 这样做虽然不易产生堆集，但增加了计算的时间。\n（3）链地址法(拉链法)，将哈希值相同的元素构成一个同义词的单链表,并将单链表的头指针存放在哈希表的第i个单元中，查找、插入和删除主要在同义词链表中进行。链表法适用于经常进行插入和删除的情况。\n（4）建立公共溢出区，将哈希表分为公共表和溢出表，当溢出发生时，将所有溢出数据统一放到溢出区。\n\n面试小抄\n```\n\n#### 为什么在解决 hash 冲突的时候，不直接用红黑树？而选择先用链表，再转红黑树?\n\n```\n（1）时间复杂度：链表的增删查是O(n)，红黑树是O(logn)。链表的复杂度相对较高，但是在链表较短的情况下，仍然可以保持较好的性能。\n\n（2）空间复杂度：链表节点只需要存储键值对的引用 & 下一个节点引用，相对来说占用空间较小。红黑树节点需要存储键值对的引用、左右节点的引用、以及额外的颜色标记，占用空间较大\n\nchatgpt\n```\n\n#### 如果不用红黑树，用二叉查找树可以么?\n\n```\n可以。但是二叉查找树在特殊情况下会变成一条线性结构（这就跟原来使用链表结构一样了，造成很深的问题），遍历查找会非常慢\n```\n\n#### 为什么阈值是8？\n\n```\n是因为泊松分布，作者在源码中的注释：\n\n理想情况下使用随机的哈希码，容器中节点分布在 hash 桶中的频率遵循泊松分布。链表中元素个数为 8 时的概率已经非常小\n```\n\n[参考](https://www.javalearn.cn/#/doc/Java集合/面试题?id=hashmap面试小抄)\n\n#### 为什么hashmap 查找的时间复杂度是O(1), 通过红黑树或者链表存储，是怎么找到元素的？需要遍历吗\n\n```\n基本上是O（1）, 发生了哈希冲突才会遍历链表或红黑树\nTODO\n```\n\n#### hashmap的加载因子是什么？\n\n```\n加载因子（load factor）是指在哈希表中元素数量与桶（数组的每个元素）数量之间的比率关系\nhashmap的默认加载因子是0.75，当哈希表中的元素达到容量的75%时，会触发哈希表的扩容操作，将哈希表的容量增加一倍。\n\nchatgpt\n```\n\n#### hashmap的加载因子默认是多少？为什么是0.75，不是0.6或0.8? [x]\n\n```\n数组长度是16，加载因子是0.75\n加载因子是一个权衡考虑的结果。\n（1）较低的加载因子会增加内存的使用（哈希表会在存储较少元素时就发生扩容），但可以减少哈希冲突的概率，从而提高查找性能。\n（2）较高的加载因子会减少内存的使用（相同容量的哈希表会存储更多元素），但会增加哈希冲突，导致查找性能下降。\n0.75 被认为是一个较好的加载因子，它在时间和空间效率之间取得了一个平衡。\n\n使用场景\n低加载因子：内存多、时间效率高\n高加载因子：内存少、时间效率不高\n\nchatgpt\n```\n\n#### [ HashMap 中 key 的存储索引是怎么计算的？](https://www.javalearn.cn/#/doc/Java集合/面试题?id=_11-hashmap-中-key-的存储索引是怎么计算的？) [x]\n\n```\n在hashmap中，key的存储索引是通过哈希函数计算得到的。当插入一个键值对时，会根据key的哈希值进行计算，然后映射到数组的索引位置上。\n\n具体计算过程：\n（1）取key的hashcode值：使用 key 的 hashCode() 方法获取 key 的哈希码值，即一个整数\n（2）根据 hashcode 计算出hash值：使用 HashMap 的内部哈希函数将 hashCode 值转换为 hash 值。哈希函数的实现会对 hashCode 进行一系列的计算和变换操作，以生成一个更分散的 hash 值。\n（3）通过取模计算下标：使用取模运算将 hash 值映射到数组的索引位置。HashMap 内部维护了一个数组（通常称为 table 或 bucket），该数组的长度是固定的。通过 hash 值与数组长度进行取模运算，可以将 hash 值映射到数组的一个索引位置，从而确定 key 在数组中的存储位置。\n\nchatgpt\n```\n\n#### [HashMap 的put方法流程？](https://www.javalearn.cn/#/doc/Java集合/面试题?id=_12-hashmap-的put方法流程？)\n\n图中转红黑树前要判断数组长度是否>=64\n\n![在这里插入图片描述](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/16/23055016921983501692198350023jgrgQz-17423116886365511688636551075KyBqgM-watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA546E5piOSGFua28=,size_20,color_FFFFFF,t_70,g_se,x_16.png)\n\n```\n（1）判断数组是否为空，为空就初始化\n（2）根据键的hashcode计算哈希值，计算出键值对在数组中的索引\n（3）位置不存在元素则直接插入, 判断是否扩容，直接返回null。\n（4）如果存在元素（发生冲突）\n\t\t- key存在，则覆盖，直接返回旧值\n\t\t- key不存在，则尾插法插入链表 / 红黑树\n（5）如果是链表,判断是否要转红黑树 还是 扩容\n（6）如果是红黑树，判断是否要扩容\n\nhttps://javaguide.cn/java/collection/hashmap-source-code.html#put-方法\nhttps://blog.csdn.net/citywu123/article/details/122125093\n```\n\n#### Jdk7 和Jdk8 的put方法区别是什么？\n\n```\n（1）解决哈希冲突时，jdk7只用链表，jdk8使用链表+红黑树，满足一定条件时，链表会转为红黑树\n（2）链表插入元素时，\n\t\t- jdk7使用头插法，多线程条件下，扩容会造成环形链或数据丢失，出现死循环\n\t\t- jdk8使用尾插法，扩容时会保持链表原本的顺序，就不会出现链表成环的问题，但多线程环境下，会出现数据覆盖的情况，导致数据不一致。\n\t\t\nhttps://xiaoniuhululu.com/2022-04-18_interview-about-hashmap/#%E9%9D%A2%E8%AF%95%E5%AE%98%EF%BC%9A-%E4%BD%A0%E8%BF%98%E7%9F%A5%E9%81%93%E5%93%AA%E4%BA%9Bhash%E7%AE%97%E6%B3%95%EF%BC%9F\n```\n\n#### 为什么会出现死循环 TODO\n\n```\n头插法在多线程中形成环形链表\n\nhttps://www.cnblogs.com/developer_chan/p/10450908.html\nhttps://javaguide.cn/java/collection/java-collection-questions-02.html#hashmap-多线程操作导致死循环问题\n```\n\n\n\n#### jdk8 中 HashMap 链表和红黑树的转化条件\n\n```\n插入元素后，链表的个数 > 8，且长 < 64时进行扩容\n如果 >= 64,则转为红黑树\n\n扩容完成后，如果某个节点是树，且节点个数 < 6则转换为链表\n```\n\n\n\n#### HashMap 怎么设定初始容量大小的？[x]\n\n```\n不传值默认为16，\n传入初始值n，则为大于n的2的最小次方\n如果传10，则大小为16\n```\n\n#### HashMap 的长度为什么是 2 的幂次方 [x]\n\n```\n（1）提高运算效率：当长度为 2 的幂次方时，通过取模运算可以使用位运算来替代，即 hash & (length - 1)，这比使用取模运算 hash % length 效率更高。\n（2）使数据均匀分布，减少碰撞：长度为 2 的幂次方可以保证哈希值在取模运算时能够更加均匀地分布到不同的桶中，减少哈希冲突的概率，提高 HashMap 的性能和效率。\n```\n\n#### 为什么“长度为 2 的幂次方可以保证哈希值在取模运算时能够更加均匀地分布到不同的桶中”？[x]\n\n```\n2 的幂次方的二进制为 10000\nlength - 1的二进制为01111\n\n取模运算是hash & (length - 1)\n&运算：同1为1，其余为0\n\n当数组的长度为 2 的幂次方时，数组的长度减一的二进制表示形式中的所有位都是 1，这样就可以通过与操作（AND）来保留 hash 值的较低位，舍弃较高位。由于哈希函数的结果是一个较大的整数，而数组的长度相对较小，取模运算就可以将较大的整数映射到较小的范围内，使得哈希值能够均匀地分布到不同的桶中。\n```\n\n#### HashMap如何扩容？TODO\n\n```\nHashmap 在容量超过负载因子所定义的容量之后，就会扩容。扩容时会新建一个两倍大小的数组，将原来的对象放入新的数组中\n\n\nhttps://xiaoniuhululu.com/2022-04-18_interview-about-hashmap/#%E9%9D%A2%E8%AF%95%E5%AE%98%EF%BC%9A-jdk8%E4%B8%AD%E7%9A%84%E6%89%A9%E5%AE%B9%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%BB%E8%BE%91%E5%88%A4%E6%96%AD%E6%9B%B4%E7%AE%80%E5%8D%95\n\nhttps://www.javalearn.cn/#/doc/Java集合/面试题?id=hashmap面试小抄\n```\n\n\n\n####  jdk8对HashMap的优化 [x]\n\n```\njdk7->jdk8的优化：\n\n（1）数组+链表改成了数组+链表+红黑树\n（2）链表的插入方式从头插法改成了尾插法\n（3）扩容的时候7需要对原数组中的元素进行重新hash定位在新数组的位置，8采用更简单的判断逻辑，位置不变或索引+旧容量大小；\n（4）在插入时，7先判断是否需要扩容，再插入；而 8先进行插入，插入完成再判断是否需要扩容；\n```\n\n[参考](https://xiaoniuhululu.com/2022-04-18_interview-about-hashmap/#%E9%9D%A2%E8%AF%95%E5%AE%98%EF%BC%9A-jdk8%E4%B8%AD%E7%9A%84%E6%89%A9%E5%AE%B9%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%BB%E8%BE%91%E5%88%A4%E6%96%AD%E6%9B%B4%E7%AE%80%E5%8D%95)\n\n#### [HashMap为什么线程不安全？](https://www.javalearn.cn/#/doc/Java集合/面试题?id=_15-hashmap为什么线程不安全？) [x]\n\n```\n（1）多线程下扩容死循环。jdk7中的hashmap使用头插法插入元素，在多线程下，扩容的时候可能导致环形链表，形成死循环。jdk8时改用尾插法，扩容时会保证链表原有顺序。\n（2）多线程put可能导致元素丢失。计算出来的索引位置可能一致，会造成前一个key会被后一个key覆盖，导致元素丢失。jdk7和jdk8都存在\n（3）put和get并发时，get可能为null。线程1执行put时，超出容量需要rehash，线程2此时get，就有可能出现问题。jdk7和jdk8都存在\n```\n\n[具体介绍](https://mp.weixin.qq.com/s?__biz=MzkyMTI3Mjc2MQ==&mid=2247485906&idx=1&sn=64785914b2bc6c53b21d7c62fbb605a7&source=41#wechat_redirect)\n\n\n\n\n\n\n\n### ConcurrentHashMap TODO\n\n","timestamp":1692282363931},{"name":"10-Springboot.md","path":"001-JAVA/10-Springboot.md","content":"https://javaguide.cn/system-design/framework/spring/spring-knowledge-and-questions-summary.html\n\nhttps://www.yuque.com/snailclimb/mf2z3k/vqe4gz 密码 cnk4\n\nhttps://www.yuque.com/snailclimb/gepg7u/go0n51 密码：ihvn\n\n##  Spring IoC\n\n### 谈谈自己对于 Spring IoC 的了解\n\n是什么\n\n```\nIoC（Inversion of Control:控制反转） 是一种设计思想。\nIoC 的思想就是将原本在程序中手动创建对象的控制权交由 Spring 框架来管理，应用程序只需要定义好对象的依赖关系，容器负责在运行时创建和注入这些对象。\n\n控制：指的是对象创建（实例化、管理）的权力\n反转：控制权交给外部环境（Spring 框架、IoC 容器）\n\nSpring IoC 的核心是 Spring 容器，它是一个管理和维护对象的容器。Spring 容器负责创建、初始化、配置和销毁对象，同时它也管理对象之间的依赖关系。容器通过读取配置文件或者注解来了解对象之间的关系，并根据这些配置在需要的时候创建和注入对象。\n\nIoC 的另一个重要概念是依赖注入（DI），它是指容器将对象所需的依赖关系注入到对象中，而不是由对象自己去创建或查找依赖对象。这样可以减少对象之间的耦合，使得代码更加清晰和可维护。\n```\n\n### 什么是 Spring Bean？\n\n```\n在Spring框架中，Bean就是一个由Spring容器管理的对象实例，这些对象实例 被spring容器创建、配置和管理，可以在应用程序中被重复使用。\n```\n\n### 将一个类声明为 Bean 的注解有哪些?\n\n```\n（1）@Component：通用的注解，可标注任意类为 Spring 组件。如果一个 Bean 不知道属于哪个层，可以使用@Component 注解标注。\n（2）@Repository : 对应持久层即 Dao 层，主要用于数据库相关操作。\n（3）@Service : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。\n（4）@Controller : 对应 Spring MVC 控制层，主要用于接受用户请求并调用 Service 层返回数据给前端页面。\n```\n\n### Bean 是线程安全的吗？\n\n```\nSpring 框架中的 Bean 是否线程安全，取决于其作用域和状态。\n默认情况下，Spring Bean 是单例的，即在整个应用程序的生命周期内只会创建一个实例，所有线程共享这个实例。\n然而，单例 Bean 并不保证线程安全，因为如果在单例 Bean 内部存在共享的可变状态，多个线程同时访问可能会导致线程安全问题。\n```\n\n### 如何保证Spring Bean 的线程安全性\n\n```\n（1）避免共享可变状态：尽量避免在单例 Bean 中使用共享的可变状态。如果需要在多线程环境中处理共享状态，可以使用线程安全的数据结构或者同步机制来保证线程安全。\n（2）synchronized：如果确实需要在单例 Bean 内部进行多线程访问，可以在方法级别使用同步（synchronization）机制，例如使用 synchronized 关键字来保护临界区。\n（3）作用域使用非单例的prototype，每次获取都创建一个新实例，不会共享状态。\n（4）在类中定义一个 ThreadLocal 成员变量，将需要的可变成员变量保存在 ThreadLocal 中（推荐的一种方式）。\n```\n\n\n\n## Spring AoP\n\n### 是什么\n\n```\n是一种面向切面编程的技术，能够将那些与业务逻辑无关的，但却为业务模块共同调用的逻辑从业务代码中分离出来，减少重复代码，降低模块间的耦合度，有利于拓展和维护。\n```\n\n### 通知类型有哪些？\n\n```\n（1）前置通知（@Before）：在目标方法调用之前调用通知\n（2）后置通知（@After）：在目标方法完成之后调用通知\n（3）环绕通知（@Around）：在被通知的方法调用之前和调用之后执行自定义的方法\n（4）返回通知（@AfterReturning）：在目标方法成功执行之后调用通知\n（5）异常通知（@AfterThrowing）：在目标方法抛出异常之后调用通知\n```\n\n### 多个切面的执行顺序如何控制？\n\n（1）通常使用@Order 注解直接定义切面顺序，值越小优先级越高\n\n```java\n@Order(3)\n@Component\n@Aspect\npublic class LoggingAspect implements Ordered {\n```\n\n（2）**实现`Ordered` 接口重写 `getOrder` 方法。**\n\n```java\n@Component\n@Aspect\npublic class LoggingAspect implements Ordered {\n    @Override\n    public int getOrder() {\n        // 返回值越小优先级越高\n        return 1;\n    }\n}\n```\n\n### Spring AOP术语\n\n```\n（1）连接点（Jointpoint）：表示在程序中可以插入切面的点。【在哪里干】\n（2）切点（Pointcut）：定义了哪些连接点应该被切面的通知所织入。【连接点的集合】\n（3）通知（Advice）：在连接点上执行的行为。【干什么】\n（4）切面（Aspect）：是一组「通知」和「切点」的组合，用于在目标对象的方法执行过程中插入横切逻辑\n（5）织入（Weaving）：将切面的逻辑插入到目标对象代码的执行过程中\n```\n\n### 实现原理\n\n```\nSpring AOP 就是基于动态代理的，\n（1）JDK动态代理：\n\t\t- 如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 JDK动态代理，去创建代理对象。\n\t\t- 实现原理：JDK的动态代理是基于「反射」实现。JDK通过反射，生成一个代理类，这个代理类实现了原来那个类的全部接口，并对接口中定义的所有方法进行了代理。\n（2）Cglib动态代理：\n\t\t- 没有实现接口的对象，使用 Cglib \n\t\t- 实现原理：在运行时通过生成字节码的方式创建一个目标对象的子类，然后在子类中织入切面中的通知代码\n\t\t\nspringboot中的aop， 2.0之前和spring一样，2.0之后首选cglib动态代理，如果要用jdk动态代理需要手动配置\n\t\t\nhttps://www.cnblogs.com/tuyang1129/p/12878549.html\nhttps://mp.weixin.qq.com/s/mEmXaboXu48O96Yi_Kn9pw\n```\n\n### JDK动态代理 和 Cglib动态代理优缺点\n\n```\nJDK动态代理 \n（1）优点：\n\t\t- JDK动态代理是JDK原生的，不需要任何依赖即可使用\n\t\t- 通过反射机制生成代理类的速度要比CGLib操作字节码生成代理类的速度更快；\n（2）缺点：\n\t\t- 如果要使用JDK动态代理，被代理的类必须实现了接口，否则无法代理；\n\t\t- JDK动态代理执行代理方法时，需要通过反射机制进行回调，此时方法执行的效率比较低；\n\t\t\nCglib动态代理\n（1）优点：\n\t\t- 使用CGLib代理的类，不需要实现接口，因为CGLib生成的代理类是直接继承自需要被代理的类；\n\t\t- CGLib执行代理方法的效率要高于JDK的动态代理。CGLib生成的代理类，和我们自己编写并编译的类没有太大区别，对方法的调用和直接调用普通类的方式一致\n（2）缺点：\n\t\t- 由于CGLib的代理类使用的是继承，这也就意味着如果需要被代理的类是一个final类，则无法使用CGLib代理；\n\t\t- 由于CGLib实现代理方法的方式是重写父类的方法，所以无法对final方法，或者private方法进行代理，因为子类无法重写这些方法；\n\t\t- CGLib生成代理类的方式是通过操作字节码，这种方式生成代理类的速度要比JDK通过反射生成代理类的速度更慢；\n\t\t\t\nhttps://www.cnblogs.com/tuyang1129/p/12878549.html\n```\n\n\n\n### 什么是代理？\n\n```\n代理是一种设计模式，它充当了其他对象的接口，以控制对这些对象的访问。\n代理对象可以在客户端和实际目标对象之间充当中介，通过代理来进行访问对象，从而增加一些额外的功能\n\n【分为静态代理和动态代理】\n```\n\n### 静态代理 vs 动态代理\n\n```\n（1）静态代理：代理类在编译阶段就已经存在，通过手动写代理类来实现对目标对象的包装和控制\n（2）动态代理：在运行时创建代理对象，不需要手动编写代理类，而是通过一些工具库或者语言特性来实现。在java中，常用的动态代理技术有JDK动态代理、Cglib代理\n```\n\n","timestamp":1692282363931}]