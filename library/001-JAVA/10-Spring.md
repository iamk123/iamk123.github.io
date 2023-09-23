https://javaguide.cn/system-design/framework/spring/spring-knowledge-and-questions-summary.html

https://www.yuque.com/snailclimb/mf2z3k/vqe4gz 密码 cnk4

https://www.yuque.com/snailclimb/gepg7u/go0n51 密码：ihvn

##  Spring IoC

### 谈谈自己对于 Spring IoC 的了解

是什么

```
IoC（Inversion of Control:控制反转） 是一种设计思想。
控制：指的是对象创建（实例化、管理）的权力
反转：控制权交给外部环境（Spring 框架、IoC 容器）

IoC是控制反转的意思，它的思想就是将原本在程序中手动创建对象的控制权交由 Spring 框架来管理。应用程序只需要定义好对象的依赖关系，容器负责在运行时创建和注入这些对象。

Spring IoC 的核心是 Spring 容器，负责创建、初始化、配置和销毁对象，同时它也管理对象之间的依赖关系。容器通过读取配置文件或者注解来了解对象之间的关系，并根据这些配置在需要的时候创建和注入对象。

控制反转：
（1）没有引⼊IOC容器之前，对象A依赖于对象B，那么对象A在初始化或者运⾏到某⼀点的时候，⾃⼰必须主动去创建对象B（或者使用已经创建的对象B）。控制器在自己手上。
（2）引入IOC容器后，对象A和对象B之间失去了直接联系。当对象A运行到需要对象B的时候，IOC容器会主动创建一个对象B注入到对象A需要的地方。这时候对象A获得对象B的过程已经由主动变为了被动 。
```

### 依赖注入

```
IoC 的另一个重要概念是依赖注入（DI），它是指容器将对象所需的依赖关系注入到对象中，而不是由对象自己去创建或查找依赖对象。这样可以减少对象之间的耦合，使得代码更加清晰和可维护。
```

### 什么是 Spring Bean？

```
在Spring框架中，Bean就是一个由Spring容器管理的对象实例，这些对象实例 被spring容器创建、配置和管理，可以在应用程序中被重复使用。
```

### bean的生命周期？

[参考](https://blog.csdn.net/zl1zl2zl3/article/details/105044954)

```
（1）生命周期包含：实例化、属性赋值、初始化、销毁这 4 个大阶段；
（2）再是初始化的具体操作，有 Aware 接口的依赖注入、BeanPostProcessor 在初始化前后的处理以及InitializingBean 和 init-method 的初始化操作；
（3）销毁的具体操作，有注册相关销毁回调接口，最后通过DisposableBean 和 destory-method 进行销毁。
```

![字节跳动面试题：“请你描述下 Spring Bean 的生命周期？”](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/09/22/11063316953519931695351993044aNpQJN-format,png.png)

### Spring⽀持的⼏种bean的作⽤域

```
（1）singleton：默认，每个容器中只有⼀个bean的实例，单例的模式由BeanFactory⾃身来维护。该对象的⽣命周期是与Spring IOC容器⼀致的（但在第⼀次被注⼊时才会创建）
（2） prototype：为每⼀个bean请求提供⼀个实例。在每次注⼊时都会创建⼀个新的对象
（3）request：bean被定义为在每个HTTP请求中创建⼀个单例对象，也就是说在单个请求中都会复⽤这个单例对象
（4）session：与request范围类似，确保每个session中有⼀个bean的实例，在session过期后，bean会随之失效。
```

### 将一个类声明为 Bean 的注解有哪些?

```
（1）@Component：通用的注解，可标注任意类为 Spring 组件。如果一个 Bean 不知道属于哪个层，可以使用@Component 注解标注。
（2）@Repository : 对应持久层即 Dao 层，主要用于数据库相关操作。
（3）@Service : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao 层。
（4）@Controller : 对应 Spring MVC 控制层，主要用于接受用户请求并调用 Service 层返回数据给前端页面。
```

### Bean 是线程安全的吗？

```
Spring 框架中的 Bean 是否线程安全，取决于其作用域和状态。
默认情况下，Spring Bean 是单例的，即在整个应用程序的生命周期内只会创建一个实例，所有线程共享这个实例。单例 Bean 并不保证线程安全，因为如果在单例 Bean 内部存在共享的可变状态，多个线程同时访问可能会导致线程安全问题。

如何线程安全？
（1）可以将bean的作⽤域设置为prototype，这样每个线程请求过来都会去创建一个新的bean
（2）将bean中的成员变量保存在ThreadLocal中，ThredLoca 能保证多线程下变量的隔离
```

### 如何保证Spring Bean 的线程安全性

```
（1）作用域使用非单例的prototype，每次获取都创建一个新实例，不会共享状态。

（2）避免共享可变状态：尽量避免在单例 Bean 中使用共享的可变状态。如果需要在多线程环境中处理共享状态，可以使用线程安全的数据结构或者同步机制来保证线程安全。
（3）synchronized：如果确实需要在单例 Bean 内部进行多线程访问，可以在方法级别使用同步（synchronization）机制，例如使用 synchronized 关键字来保护临界区。
（4）在类中定义一个 ThreadLocal 成员变量，将需要的可变成员变量保存在 ThreadLocal 中（推荐的一种方式）。
```



## Spring AOP

### 谈谈对AOP的理解

```
系统由多个不同的组件组成，每个组件负责一块特定的功能，除了实现自身核心的功能外，这些组件经常还需要承担额外的责任。例如日志、事务管理、安全检查等这样的核心服务竟然要融入到这些组件中，这些系统服务经常被称为横切关注点，应该他们会跨越系统的多个组件。

当我们需要为分散的对象引⼊公共⾏为的时候，OOP则显得⽆能为⼒。OOP允许你定义从上到下的关系，但并不适合定义从左到右的关系。例如⽇志功能。在OOP设计中，它导致了⼤量代码的重复，⽽不利于各个模块的重⽤。

AOP是一种面向切面编程的技术，能够将那些与业务逻辑无关的，但却为业务模块共同调用的逻辑从业务代码中分离出来，封装成一个切面，然后注入到目标对象（具体业务逻辑中）中，这样就可以减少重复代码，降低模块间的耦合度，有利于拓展和维护。
```

### 通知类型有哪些？

```
（1）前置通知（@Before）：在目标方法调用之前调用通知
（2）后置通知（@After）：在目标方法完成之后调用通知
（3）环绕通知（@Around）：在被通知的方法调用之前和调用之后执行自定义的方法
（4）返回通知（@AfterReturning）：在目标方法成功执行之后调用通知
（5）异常通知（@AfterThrowing）：在目标方法抛出异常之后调用通知
```

### 多个切面的执行顺序如何控制？

（1）通常使用@Order 注解直接定义切面顺序，值越小优先级越高

```java
@Order(3)
@Component
@Aspect
public class LoggingAspect implements Ordered {}
```

（2）**实现`Ordered` 接口重写 `getOrder` 方法。**

```java
@Component
@Aspect
public class LoggingAspect implements Ordered {
    @Override
    public int getOrder() {
        // 返回值越小优先级越高
        return 1;
    }
}
```

### Spring AOP术语

```
（1）连接点（Jointpoint）：表示在程序中可以插入切面的点。【在哪里干】
（2）切点（Pointcut）：定义了哪些连接点应该被切面的通知所织入。【连接点的集合】
（3）通知（Advice）：在连接点上执行的行为。【干什么】
（4）切面（Aspect）：是一组「通知」和「切点」的组合，用于在目标对象的方法执行过程中插入横切逻辑
（5）织入（Weaving）：将切面的逻辑插入到目标对象代码的执行过程中
```

### 实现原理

```
Spring AOP 就是基于动态代理的，
（1）JDK动态代理：
		- 如果要代理的对象，实现了某个接口，那么 Spring AOP 会使用 JDK动态代理，去创建代理对象。
		- 实现原理：JDK动态代理是基于「反射」实现。通过反射，生成一个代理类，这个代理类实现了原来那个类的全部接口，并对接口中定义的所有方法进行了代理。
		
（2）Cglib动态代理：
		- 没有实现接口的对象，使用 Cglib 
		- 实现原理：在运行时通过生成字节码的方式创建一个目标对象的子类，然后在子类中织入切面中的通知代码
		
springboot中的aop， 2.0之前和spring一样，2.0之后首选cglib动态代理，如果要用jdk动态代理需要手动配置
		
https://www.cnblogs.com/tuyang1129/p/12878549.html
https://mp.weixin.qq.com/s/mEmXaboXu48O96Yi_Kn9pw
```

#### JDK动态代理 和 Cglib动态代理优缺点

```
JDK动态代理 
（1）优点：
		- JDK动态代理是JDK原生的，不需要任何依赖即可使用
		- 通过反射机制生成代理类的速度要比CGLib操作字节码生成代理类的速度更快；
（2）缺点：
		- 如果要使用JDK动态代理，被代理的类必须实现了接口，否则无法代理；
		- JDK动态代理执行代理方法时，需要通过反射机制进行回调，此时方法执行的效率比较低；
		
Cglib动态代理
（1）优点：
		- 使用CGLib代理的类，不需要实现接口，因为CGLib生成的代理类是直接继承自需要被代理的类；
		- CGLib执行代理方法的效率要高于JDK的动态代理。CGLib生成的代理类，和我们自己编写并编译的类没有太大区别，对方法的调用和直接调用普通类的方式一致
（2）缺点：
		- 由于CGLib的代理类使用的是继承，这也就意味着如果需要被代理的类是一个final类，则无法使用CGLib代理；
		- 由于CGLib实现代理方法的方式是重写父类的方法，所以无法对final方法，或者private方法进行代理，因为子类无法重写这些方法；
		- CGLib生成代理类的方式是通过操作字节码，这种方式生成代理类的速度要比JDK通过反射生成代理类的速度更慢；
			
https://www.cnblogs.com/tuyang1129/p/12878549.html
```



### 什么是代理？

```
代理是一种设计模式，它充当了其他对象的接口，以控制对这些对象的访问。
代理对象可以在客户端和实际目标对象之间充当中介，通过代理来进行访问对象，从而增加一些额外的功能

【分为静态代理和动态代理】
```

### 静态代理 vs 动态代理

```
（1）静态代理：代理类在编译阶段就已经存在，通过手动写代理类来实现对目标对象的包装和控制
（2）动态代理：在运行时创建代理对象，不需要手动编写代理类，而是通过一些工具库或者语言特性来实现。在java中，常用的动态代理技术有JDK动态代理、Cglib代理
```



## 负载均衡

### nginx负载均衡策略

```
默认的策略是轮询

（1）轮询（Round Robin）
	- 描述：默认的负载均衡方法，按顺序将请求分配到后端服务器列表中。
	- 特点：简单易实现，但不考虑后端服务器的负载情况。
	
（2）加权轮询（Weighted Round Robin）
	- 描述：和轮询类似，但可以指定每个服务器的权重，权重越高的服务器将接收更多的请求。
	- 特点：可以根据服务器的性能和负载来分配权重，实现更合理的负载分配。
	
（3）最少连接（Least Connections）
	- 描述：将新的请求分配给当前连接数最少的服务器。
	- 特点：能够更好地处理不均匀的负载情况。

（4）IP哈希（IP Hash）
	- 描述：根据客户端的 IP 地址进行哈希计算，将来自同一IP的请求分配给同一台服务器。
	- 特点：可以保持客户端会话的持久性。

（5）URL哈希（URL Hash）
	- 描述：根据请求的URL进行哈希计算，相同URL的请求将被路由到同一台服务器。
	- 特点：可以用于缓存优化，因为相同URL的请求可以被路由到缓存了该URL内容的服务器。

（6）最快响应时间（Least Time）
	- 描述：将请求路由到响应时间最短的服务器。
	- 特点：可以提供较好的用户体验，因为它总是尝试将请求路由到性能最好的服务器。
```



## 事务

```
Spring 事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，Spring 是无法提供事务功能的。Spring 只提供统一事务管理接口，具体实现都是由各数据库自己实现，数据库事务的提交和回滚是通过数据库自己的事务机制实现。
```

### Spring 事务的种类？

```
（1）编程式事务：编程式事务管理使用TransactionTemplate或TransactionManager，需要显式执行事务。
（2）声明式事务：
	- 使用@Transactional注解,代码的倾入性比较小
	- 通过AOP实现，当一个方法加上@Transactional注解后，Spring会基于这个类生成一个代理对象，将这个代理对象作为bean。当使用这个代理对象的方法时，如果方法上存在这个@Transactional注解，那么代理逻辑会把事务的自动提交设置为false，然后再去执行原本的业务逻辑方法。如果出现异常，那么就会进行回滚；否则就提交事务
```

**编程式事务**

transactionTemplate

```java
@Autowired
private TransactionTemplate transactionTemplate;
public void testTransaction() {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {

                try {

                    // ....  业务代码
                } catch (Exception e){
                    //回滚
                    transactionStatus.setRollbackOnly();
                }

            }
        });
}

```

transactionManager

```java
@Autowired
private PlatformTransactionManager transactionManager;

public void testTransaction() {

  TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
          try {
               // ....  业务代码
              transactionManager.commit(status);
          } catch (Exception e) {
              transactionManager.rollback(status);
          }
}

```

声明式事务

```java
@Transactional(propagation=propagation.PROPAGATION_REQUIRED)
public void aMethod {
  //do something
  B b = new B();
  C c = new C();
  b.bMethod();
  c.cMethod();
}

```



### spring事务和数据库事务不一致，以哪个为准

```
以Spring的配置为准，如果spring设置的隔离级别数据库不支持，效果取决于数据库
```



### 声明式事务在哪些情况下会失效？

```
（1）@Transactional 应用在非 public 修饰的方法上
（2）数据库不支持事务

（3）同一个类中方法调用
	- 比如有一个类 Test，它的一个方法 A，A 再调用本类的方法 B（不论方法 B 是用 public 还是 private 修饰），但方法 A 没有声明注解事务，而 B 方法有。则外部调用方法 A 之后，方法 B 的事务是不会起作用的。这也是经常犯错误的一个地方。
	- 原因：由于使用 Spring AOP 代理造成的，因为只有当事务方法被当前类以外的代码调用时，才会由 Spring 生成的代理对象来管理。
	
（4）@Transactional 注解属性 rollbackFor 设置错误
	- rollbackFor 可以指定能够触发事务回滚的异常类型。Spring 默认抛出了未检查 unchecked 异常（继承自 RuntimeException 的异常）或者 Error 才回滚事务，其他异常不会触发回滚事务。
```



## 依赖注入DI

```
IoC 的另一个重要概念是依赖注入（DI），它是指容器将对象所需的依赖关系注入到对象中，而不是由对象自己去创建或查找依赖对象。这样可以减少对象之间的耦合，使得代码更加清晰和可维护。
```

### 依赖注入的方式

```java
（1）基于XML的构造方法注入：通过在Spring XML配置文件中使用<constructor-arg>元素来注入依赖。
<bean id="exampleBean" class="com.example.ExampleBean">
    <constructor-arg ref="anotherBean"/>
    <constructor-arg value="exampleValue"/>
</bean>

（2）基于XML的setter方法注入：使用<property>元素注入依赖。
<bean id="exampleBean" class="com.example.ExampleBean">
    <property name="anotherBean" ref="anotherBean"/>
    <property name="exampleValue" value="exampleValue"/>
</bean>

（3）基于注解的字段注入：使用@Autowired（或@Inject）注解直接在字段上注入依赖。
@Component
public class ExampleBean {
    @Autowired
    private AnotherBean anotherBean;
}

（4）基于注解的构造方法注入：在构造方法上使用@Autowired（或@Inject）注解来注入依赖。
@Component
public class ExampleBean {
    private final AnotherBean anotherBean;

    @Autowired
    public ExampleBean(AnotherBean anotherBean) {
        this.anotherBean = anotherBean;
    }
}

（5）基于注解的setter方法注入：在setter方法上使用@Autowired或@Inject注解来注入依赖。
@Component
public class ExampleBean {
    private AnotherBean anotherBean;

    @Autowired
    public void setAnotherBean(AnotherBean anotherBean) {
        this.anotherBean = anotherBean;
    }
}

（6）使用@Resource注解：@Resource注解可以用于字段、setter方法或其他任何依赖注入点来注入依赖
@Component
public class ExampleBean {
    @Resource
    private AnotherBean anotherBean;
}

（7）使用Java配置类进行注入：使用Java配置（使用@Configuration和@Bean注解）可以在Java代码中定义和注入bean。
@Configuration
public class AppConfig {
    @Bean
    public AnotherBean anotherBean() {
        return new AnotherBean();
    }

    @Bean
    public ExampleBean exampleBean(AnotherBean anotherBean) {
        return new ExampleBean(anotherBean);
    }
}
```

### @Resource和@Autowired的区别

```
（1）来源
	- @Autowired是Spring框架原生的注解。
	- @Resource来自Java的javax.annotation.Resource，它是J2EE的标准注解。
（2）注入方式
	- @Autowired默认按类型(byType)来自动注入依赖。如果存在多个同类型的bean，它会根据属性名称尝试进行匹配。如果需要指定某个bean，可以与@Qualifier注解一起使用。
	- @Resource默认按名称(byName)来自动注入依赖。你可以使用它的name属性来指定bean的名称。如果没有指定name属性，@Resource会根据字段或setter方法的名称来查找bean。如果按名称查找失败，它会退回到按类型(byType)查找。
```





### 循环依赖

```
循环依赖是指两个或两个以上的bean相互依赖，形成一个闭环。比如AB间循环依赖。
这种情况在基于构造器的注入中尤其明显，因为当Spring尝试初始化其中一个bean时，它会因为需要先初始化其他bean而陷入死锁。

使用单例的bean时才会存在循环依赖的情况。
（1）AB间循环依赖
（2）A自己依赖自己
```

### 循环依赖咋解决？

```
AB间循环依赖
（1）A、B都适用setter方法注入。Spring首先创建bean实例，然后在bean实例化后进行setter或字段注入。
（2）A、B都采用属性自动注入
（3）A中注入的B为Setting注入，B中注入的A为构造器注入
```



spring启动流程？springboot的关键注解
