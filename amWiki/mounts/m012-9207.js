if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m012']=[{"name":"00-相关教程.md","path":"012-JVM/00-相关教程.md","content":"面经\n\n-   [用友](https://mp.weixin.qq.com/s/9SltMQTnPvmpUiOuJTX6KA)","timestamp":1695014412505},{"name":"01-内存管理.md","path":"012-JVM/01-内存管理.md","content":"参考\n\n-   [二哥的java进阶之路](https://javabetter.cn/sidebar/sanfene/jvm.html#_9-%E5%AF%B9%E8%B1%A1%E6%80%8E%E4%B9%88%E8%AE%BF%E9%97%AE%E5%AE%9A%E4%BD%8D)\n-   https://xie.infoq.cn/article/83777ef09f349643cee6b5cd7\n-   https://www.cnblogs.com/crazymakercircle/p/14365820.html\n-   [javaguide](https://javaguide.cn/java/jvm/memory-area.html)\n\n\n\n## JVM主要组成部分\n\n![img](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/16/10373316948318531694831853136etiIM5-watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly90aGlua3dvbi5ibG9nLmNzZG4ubmV0,size_16,color_FFFFFF,t_70.png)\n\n```\nJVM包含两个子系统和两个组件：\n\t- 两个子系统：Class loader(类装载)、Execution engine(执行引擎)；\n\t- 两个组件：Runtime data area(运行时数据区)、Native Interface(本地接口)。\n\t\n（1）类加载Class loader：\n 根据给定的全限定名类名(如：java.lang.Object)来装载class文件到「运行时数据区」中的「方法区」。\n \n（2）执行引擎：执行classes中的指令。\n（3）本地接口：与native libraries交互，是其它编程语言交互的接口。\n（4）运行时数据区域：这就是我们常说的JVM的内存。\n```\n\n### 作用\n\n```\n（1）首先通过编译器（javac命令）把 Java 代码转换成字节码，生产.class文件，\n（2）类加载器（ClassLoader）再把字节码加载到内存中，将其放在运行时数据区（Runtime data area）的方法区内，生成相应的Class对象\n（3）执行引擎将字节码翻译成底层系统指令，再交由 CPU 去执行，而这个过程中需要调用其他语言的本地库接口（Native Interface）来实现整个程序的功能。\n```\n\n\n\n## JVM内存模型 / 运行时数据区\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/13/21463116946127911694612791614umFadC-jvm-3.png\" alt=\"Java虚拟机运行时数据区\" style=\"zoom: 67%;\" />\n\n```\n线程共享区\n（1）方法区：存储已经被加载的类信息、常量、静态变量、即时编译器编译后的代码缓存等数据。\n（2）堆：\n\t- 是虚拟机所管理的内存中最大的一块，java中几乎所有的对象实例都存储在这里。\n\t- 是垃圾收集器管理的主要区域，因此也被称作 GC 堆\n\n线程私有区\n（1）程序计数器：当前线程执行的字节码的行号指示器，记录当前线程执行的字节码指令地址。（比如切换线程时，需要根据这个来知道它上次执行到的地方。）\n（2）虚拟机栈：存放基本数据类型、对象的引用、方法出口等\n（3）本地方法区：与虚拟机栈的作用是一样的，只不过虚拟机栈是服务 Java 方法的，而本地方法栈是为虚拟机调用 Native 方法服务的\n\n```\n\n哪些对象不存在java堆中\n\n```\n（1）Thread对象：\n\t- Thread对象是一个特例，它的大部分数据（例如线程栈）实际上是存储在线程自己的栈内存中，而不是Java堆中。\n\t\n（2）JNI创建的对象：\n\t- 通过Java Native Interface（JNI）创建和管理的对象可以存储在堆外内存中，这是一种绕过Java堆的方法。\n\t\n（3）池化的对象：\n\t- 在某些情况下，池化对象（如数据库连接池中的连接对象）可能不直接存储在Java堆中，而是使用特殊的内存管理和分配策略。\n```\n\n\n\n## 对象创建的过程\n\n```\n通过new创建一个对象 MyClass myObject = new MyClass();\n（1）类加载检查。\n\t- 首先，虚拟机会检查该类是否已被加载、解析和初始化。如果没有，那么就会执行相应的类加载过程。\n\t- （检查这个指令的参数MyClass是否能在常量池中定位到这个类的符号引用（com.example.MyClas））\n\n（2）内存分配\n\t- 类加载检查通过后，虚拟机将为新的对象分配内存。\n\t- 对象所需的内存大小是在类加载完成后确定的。\n\t- 分配内存的方式有两种：指针碰撞和空闲列表。\n\n（3）初始化零值\n\t- 内存分配完成后，虚拟机会初始化对象的内存空间，将对象中的字段设置为相应类型的初始值（如int设置为0）\n\n（4）设置对象头\n\t- 初始化完成后，虚拟机 会在对象的内存中设置对象头，包括这个对象的哈希码、GC状态、类元数据信息等。\n\n（5）执行构造方法：\n\t- 最后，虚拟机会执行对象的构造方法，进行对象的具体初始化。这是通过调用类中的构造方法来完成的，将各个字段设置为构造方法中指定的值。\n```\n\n例子\n\n```java\npublic class MyClass {\n    private int x;\n    private int y;\n\n    public MyClass(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public static void main(String[] args) {\n        // 创建对象的过程\n        MyClass myObject = new MyClass(1, 2);\n    }\n}\n\n（1）调用new MyClass(1, 2)会触发类加载检查，先去常量池中查找MyClass这个类的符号引用，没有则加载这个类\n（2）为新的MyClass对象内存分配。\n（3）接着，对象的内存空间会被初始化，x和y的内存空间将被分配和初始化为默认值（这里是0）。\n（4）然后设置对象头，包对象的哈希码、GC状态、类元数据信息等。\n（5）最后执行MyClass的构造方法，将x和y初始化为指定的值（这里是1和2）。\n```\n\n\n\n## 内存分配的方式\n\n```\n内存分配有两种方式，\n（1）指针碰撞\n（2）空闲列表\n```\n\n## 什么是指针碰撞？什么是空闲列表？\n\n```\n内存分配有两种方式，指针碰撞（Bump The Pointer）、空闲列表（Free List）。\n（1）指针碰撞\n\t假设 Java 堆中内存是绝对规整的，所有被使用过的内存都被放在一边，空闲的内存被放在另一边，中间放着一个指针作为分界点的指示器，那所分配内存就仅仅是把那个指针向空闲空间方向挪动一段与对象大小相等的距离，这种分配方式称为“指针碰撞”。\n\n（2）空闲列表\n 如果 Java 堆中的内存并不是规整的，已被使用的内存和空闲的内存相互交错在一起，那就没有办法简单地进行指针碰撞了，虚拟机就必须维护一个列表，记录上哪些内存块是可用的，在分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的记录，这种分配方式称为“空闲列表”。\n```\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/14/11400416946628041694662804092yay58d-image-20230914114003956.png\" alt=\"image-20230914114003956\" style=\"zoom:50%;\" /><img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/14/114015169466281516946628153496RRWLy-image-20230914114015247.png\" alt=\"image-20230914114015247\" style=\"zoom:50%;\" />\n\n\n\n## 类加载过程\n\n### 类的生命周期\n\n```\n加载、验证、准备、解析、初始化、使用、卸载\n```\n\n### 类加载过程\n\n```\n类加载过程即是指JVM虚拟机把.class文件中类信息加载进内存，并进行解析生成对应的class对象的过程。\n（举个通俗点的例子来说，JVM在执行某段代码时，遇到了class A， 然而此时内存中并没有class A的相关信息，于是JVM就会到相应的class文件中去寻找class A的类信息，并加载进内存中，这就是我们所说的类加载过程。）\n\n（1）加载\n（2）连接（验证、准备、解析）\n（3）初始化\n\n具体流程\n（1）加载：\n\t- 在这个阶段，类加载器通过类的全限定名来获取类的二进制字节流，\n\t- 将这个字节流代表的静态存储结构转化为方法区的运行时数据结构\n\t- 在内存中生成一个代表该类的 Class 对象，作为方法区这个类的各个数据的访问入口。\n\n（2）验证\n\t- 在这个阶段，虚拟机要确保加载的类文件满足 Java 虚拟机的约束条件和安全性检查。\n\t- 文件格式验证、元数据验证、字节码验证、符号引用验证\n\n（3）准备\n\t- 为类中的静态变量分配内存空间，并设置默认初始值。\n\t\n（4）解析\n\t- 将类、方法、字段的符号引用解析为直接引用。\n\t- 符号引用：即一个字符串，但是这个字符串给出了一些能够唯一性识别一个方法，一个变量，一个类的相关信息\n\t- 直接引用：是指内存地址的引用。\n\t- 举个例子来说，现在调用方法hello()，这个方法的地址是1234567，那么hello就是符号引用，1234567就是直接引用。\n\t\n（5）初始化\n\t- 初始化阶段是执行初始化方法 <clinit>()方法的过程，这个方法是编译之后自动生成的，它会按顺序的去收集类中的静态代码块或静态变量的初始化操作\n\t- （换句话说，只对static修饰的变量或语句进行初始化。）\n```\n\n例子\n\n```java\npublic class HelloWorld {\n    static {\n        System.out.println(\"静态初始化块执行...\");\n    }\n\n    private static String staticMessage = \"Hello, Static World!\";\n    \n    private String instanceMessage;\n\n    public HelloWorld(String message) {\n        this.instanceMessage = message;\n        System.out.println(\"构造函数执行...\");\n    }\n\n    public void displayMessage() {\n        System.out.println(\"实例消息: \" + instanceMessage);\n        System.out.println(\"静态消息: \" + staticMessage);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"主方法执行...\");\n        HelloWorld helloWorld = new HelloWorld(\"Hello, Instance World!\");\n        helloWorld.displayMessage();\n    }\n}\n\n（1）加载（Loading）\n\t当我们运行这个程序时，JVM首先会找到HelloWorld这个类的.class文件，并加载它到内存中。\n  \n（2）链接（Linking）\n\t- 验证（Verification）：JVM检查HelloWorld.class文件的格式，确保它是一个合法的Java类文件。\n\t- 准备（Preparation）：JVM为staticMessage静态变量分配内存，并赋予它默认的null值。\n\t- 解析（Resolution）：JVM解析HelloWorld类中的所有类、方法和字段的符号引用为直接引用。\n  \n（2）初始化（Initialization）\n\tHelloWorld类的静态初始化块和静态字段staticMessage被初始化。此时，静态初始化块内的System.out.println(\"静态初始化块执行...\");和staticMessage的初始化代码private static String staticMessage = \"Hello, Static World!\";会被执行。\n```\n\n参考\n\n-   [类的加载过程](https://anye3210.github.io/2021/08/02/%E8%AF%A6%E8%A7%A3Java%E7%B1%BB%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B/)\n-   [面试官：请你谈谈Java的类加载过程（通俗一点）](https://zhuanlan.zhihu.com/p/33509426)\n\n\n\n## 类加载器\n\n### 作用\n\n```\n类加载器的主要作用就是加载 Java 类的字节码（ .class 文件）到 JVM 中（在内存中生成一个代表该类的 Class 对象）\n\n（字节码可以是 Java 源程序（.java文件）经过 javac 编译得来，也可以是通过工具动态生成或者通过网络下载得来。）\n```\n\n### 类加载器加载规则\n\n```\n（1）JVM 启动的时候，并不会一次性加载所有的类，而是根据需要去动态加载。也就是说，大部分类在具体用到的时候才会去加载，这样对内存更加友好。\n（2）对于已经加载的类会被放在 ClassLoader 中。在类加载的时候，系统会首先判断当前类是否被加载过。已经被加载的类会直接返回，否则才会尝试加载。也就是说，对于一个类加载器来说，相同二进制名称的类只会被加载一次。\n```\n\n### 类加载器有哪些\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/14/160651169467881116946788113250oHpWH-class-loader-parents-delegation-model.png\" alt=\"类加载器层次关系图\" style=\"zoom: 50%;\" />\n\n```\n（1）启动类加载器(BootstrapClassLoader)\n\t- 最顶层的加载类，用来加载 java 核心类库，无法被 java 程序直接引用。\n\t- %JAVA_HOME%/lib\n\n（2）扩展类加载器(ExtensionClassLoader):\n\t- 它用来加载 Java 的扩展库，Java 虚拟机的实现会提供一个扩展库目录。该类加载器在此目录里面查找并加载 Java 类。\n\t- %JRE_HOME%/lib/ext\n\n（3）应用程序类加载器（AppClassLoader）：\n\t- 面向我们用户的加载器，负责加载当前应用 classpath 下的所有 jar 包和类。\n\t\n（4）用户自定义类加载器 (user class loader)\n\t- 用户通过继承 java.lang.ClassLoader 类的方式自行实现的类加载器。\n```\n\n### 什么是双亲委派机制？\n\n```\n双亲委派模型的执行流程\n（1）判断是否加载：\n\t在类加载的时候，已经被加载的类会直接返回，否则才会尝试加载（每个父类加载器都会走一遍这个流程）。\n\t\n（2）向上委派：\n\t类加载器在进行类加载的时候，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成（调用父加载器 loadClass()方法来加载类）。这样的话，所有的请求最终都会传送到顶层的启动类加载器 BootstrapClassLoader 中。\n\t\n（3）自己尝试加载：\n\t只有当父加载器反馈自己无法完成这个加载请求（它的搜索范围中没有找到所需的类）时，子加载器才会尝试自己去加载（调用自己的 findClass() 方法来加载类）。\n\t\n（4）抛出异常：\n\t如果子类加载器也无法加载这个类，那么它会抛出一个 ClassNotFoundException 异常。\n```\n\nJVM 判定两个 Java 类是否相同的具体规则\n\n```\n「类的全名」和「加载此类的类加载器」相同，才认为两个类是相同的。\n即使两个类来源于同一个 Class 文件，被同一个虚拟机加载，只要加载它们的类加载器不同，那这两个类就必定不相同。\n```\n\n###  双亲委派模型的好处\n\n```\n（1）类的唯一性：\n\t- 通过这种父先于子的加载方式，保证了首先被加载的类是唯一的，避免了类的重复加载。\n\t- 如果没有双亲委派，我们自定义一个java.lang.Object，那么程序运行的时候，系统就会出现两个不同的 Object类\n（2）节省资源：已经加载的类，就不需要在去加载，节省资源和时间\n（3）安全：可以防止核心类库被随意篡改。\n```\n\n### 打破双亲委派模型方法\n\n```\n类加载器在进行类加载的时候，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成（调用父加载器 loadClass()方法来加载类）\n所以打破双亲委派，只需要在实现自定义加载器的时候继承ClassLoader，并重写loadClass()方法\n```\n\n### 打破双亲委派的应用\n\n```\n Tomcat 服务器为了能够优先加载 Web 应用目录下的类，然后再加载其他目录下的类，就自定义了类加载器 WebAppClassLoader 来打破双亲委托机制。这也是 Tomcat 下 Web 应用之间的类实现隔离的具体原理。\n```\n\n\n\n## 什么情况下栈溢出\n\n```\n（1）JVM栈空间太小：如果JVM分配给栈的空间太小，也容易导致栈溢出。这可以通过JVM参数 -Xss（每个线程栈的大小） 来调整。\n（2）深度递归调用：当函数递归调用的深度太深时，由于每次调用都会在栈上分配空间，这可能会导致栈溢出。\n（3）大量的局部变量：方法内部创建了大量的局部变量，导致栈空间不足。\n（4）无限循环中的方法调用：在一个无限递归或循环中不断调用方法。\n（5）循环方法调用：方法A调用方法B，方法B再调用方法A，形成一个循环调用，如果这个循环调用的层次太深，也会导致栈溢出。\n```\n\n## 什么情况下堆溢出\n\n```java\n堆：java中几乎所有的对象实例都存储在这里\n\n（1）大对象分配：创建的对象太大，超过了JVM可分配的最大堆空间。\n（2）递归创建对象：递归创建对象，而递归深度非常大。\n（3）循环引用：虽然Java有垃圾回收机制，但如果对象之间存在循环引用，它们可能不会被正确回收，导致内存泄露。\n  \n（4）内存泄漏：程序中存在内存泄漏，例如长时间运行的服务不断分配对象但没有释放。\n  List<Object> list = new ArrayList<>();\n  while(true) {\n      list.add(new Object()); // 持续分配对象，不释放，可能导致堆溢出\n  }\n\n（5）VM配置不当：\n  - VM的堆空间设置太小，不足以支持程序的运行。这可以通过调整JVM参数\n  - Xmx：最大堆大小\n  - Xms: 初始堆大小\n```\n\n","timestamp":1695014412505}]