https://javaguide.cn/system-design/framework/spring/spring-knowledge-and-questions-summary.html

https://www.yuque.com/snailclimb/mf2z3k/vqe4gz 密码 cnk4

https://www.yuque.com/snailclimb/gepg7u/go0n51 密码：ihvn

##  Spring IoC

### 谈谈自己对于 Spring IoC 的了解

是什么

```
IoC（Inversion of Control:控制反转） 是一种设计思想。
IoC 的思想就是将原本在程序中手动创建对象的控制权交由 Spring 框架来管理，应用程序只需要定义好对象的依赖关系，容器负责在运行时创建和注入这些对象。

控制：指的是对象创建（实例化、管理）的权力
反转：控制权交给外部环境（Spring 框架、IoC 容器）

Spring IoC 的核心是 Spring 容器，它是一个管理和维护对象的容器。Spring 容器负责创建、初始化、配置和销毁对象，同时它也管理对象之间的依赖关系。容器通过读取配置文件或者注解来了解对象之间的关系，并根据这些配置在需要的时候创建和注入对象。

IoC 的另一个重要概念是依赖注入（DI），它是指容器将对象所需的依赖关系注入到对象中，而不是由对象自己去创建或查找依赖对象。这样可以减少对象之间的耦合，使得代码更加清晰和可维护。
```

### 什么是 Spring Bean？

```
在Spring框架中，Bean就是一个由Spring容器管理的对象实例，这些对象实例 被spring容器创建、配置和管理，可以在应用程序中被重复使用。
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
```

