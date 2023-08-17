if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m009']=[{"name":"001-设计模式及业务场景.md","path":"009-设计模式/001-设计模式及业务场景.md","content":"[实战！聊聊工作中使用了哪些设计模式](https://juejin.cn/post/7023536216138055716)\n\n[菜鸟教程](https://www.runoob.com/design-pattern/factory-pattern.html)\n\n## 设计模式有哪些？\n\n![image-20230812155724840](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/12/15572416918270441691827044939ju6WEY-image-20230812155724840.png)\n\n\n","timestamp":1692282363931},{"name":"002-工厂模式.md","path":"009-设计模式/002-工厂模式.md","content":"## 定义\n\n```\n是一种创建型设计模式，它提供了一种统一的接口来创建对象。\n主要目标是将对象的创建与使用分离，从而降低系统的耦合性。\n它将对象的创建过程封装在一个工厂类中，客户端代码只需要通过工厂类来创建对象，而不需要直接实例化对象。\n```\n\n\n\n## 业务场景\n\n```\n（1）工厂模式一般配合策略模式一起使用。用来去优化大量的if...else...或switch...case...条件语句。\n（2）日志记录器：记录可能记录到本地硬盘、系统事件、远程服务器等，用户可以选择记录日志到什么地方\n（3）数据库访问，当用户不知道最后系统采用哪一类数据库，以及数据库可能有变化时\n\n当一个类不知道它所需要的对象的类时，可以使用工厂模式来创建对象。\n当一个类希望由子类来指定创建对象的具体类时，可以使用工厂模式。\n当一个类将对象的创建委托给多个帮助子类中的某一个，并且希望根据运行时的条件选择其中一个时，可以使用工厂模式。\n```\n\n## 问题\n\n```\n每次增加一个产品时，都需要增加一个具体类和对象实现工厂\n```\n\n## 实现\n\n![工厂模式的 UML 图](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/12/1930331691839833169183983366620mSfR-AB6B814A-0B09-4863-93D6-1E22D6B07FF8.jpg)\n\n### 步骤1：创建接口 & 实现类\n\n```java\npublic interface Shape {\n   void draw();\n}\n```\n\n```java\n// 实现类1\npublic class Rectangle implements Shape {\n \n   @Override\n   public void draw() {\n      System.out.println(\"Inside Rectangle::draw() method.\");\n   }\n}\n\n// // 实现类2\npublic class Square implements Shape {\n \n   @Override\n   public void draw() {\n      System.out.println(\"Inside Square::draw() method.\");\n   }\n}\n```\n\n### 步骤2: 创建一个工厂\n\n生成基于给定信息的实体类的对象。\n\n```java\npublic class ShapeFactory {\n    \n   //使用 getShape 方法获取形状类型的对象\n   public Shape getShape(String shapeType){\n      if(shapeType == null){\n         return null;\n      }        \n      if(shapeType.equalsIgnoreCase(\"CIRCLE\")){\n         return new Circle();\n      } else if(shapeType.equalsIgnoreCase(\"RECTANGLE\")){\n         return new Rectangle();\n      } else if(shapeType.equalsIgnoreCase(\"SQUARE\")){\n         return new Square();\n      }\n      return null;\n   }\n}\n```\n\n## 步骤3: 使用该工厂\n\n通过传递类型信息来获取实体类的对象。\n\n```java\npublic class FactoryPatternDemo {\n \n   public static void main(String[] args) {\n      ShapeFactory shapeFactory = new ShapeFactory();\n \n      //获取 Circle 的对象，并调用它的 draw 方法\n      Shape shape1 = shapeFactory.getShape(\"CIRCLE\");\n      shape1.draw();\n \n      //获取 Rectangle 的对象，并调用它的 draw 方法\n      Shape shape2 = shapeFactory.getShape(\"RECTANGLE\");\n      shape2.draw();\n \n      //获取 Square 的对象，并调用它的 draw 方法\n      Shape shape3 = shapeFactory.getShape(\"SQUARE\");\n      shape3.draw();\n   }\n}\n```\n\n","timestamp":1692282363931},{"name":"003-抽象工厂模式.md","path":"009-设计模式/003-抽象工厂模式.md","content":"","timestamp":1692282363931},{"name":"004-策略模式.md","path":"009-设计模式/004-策略模式.md","content":"## 策略模式\n\n### 定义\n\n```\n是一种行为型设计模式\n将不同的算法封装成独立的类，这些类都实现了一个共同的接口，这样可以使得它们可以互相替换。\n客户端代码不需要知道具体的算法实现细节，只需要知道使用的是哪个策略类即可。\n通过使用不同的策略类，客户端可以在不修改原有代码的情况下改变算法的使用。\n```\n\n### 优点\n\n```\n（1）封装变化： 将算法从客户端代码中分离出来，使得算法可以独立演化而不影响客户端。\n（2）易于扩展： 可以轻松地添加新的算法实现，无需修改现有代码。\n（3）避免条件语句： 避免了使用大量的条件语句来选择不同的算法。\n```\n\n\n\n### 业务场景\n\n```\n根据不同类型采取不同的处理方式方式，如不同类型用户拥有不同的折扣策略。\n当一个类有多种行为，且这些行为在运行时可以互相替换。\n当希望在不修改现有代码的情况下，增加或更改算法的实现。\n当有一些相关的类仅在它们的行为有所不同时，可以使用策略模式来避免代码的重复。\n\nif(type==\"A\"){\n   //按照A格式解析\n}else if(type==\"B\"){\n   //按B格式解析\n}else{\n    //按照默认格式解析\n}\n```\n\n## 实现1 - 简单使用\n\n![策略模式的 UML 图](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/12/20281416918432941691843294474lXUq3k-strategy_pattern_uml_diagram.jpg)\n\n### 步骤1: 创建接口和实现类\n\n```java\npublic interface Strategy {\n   public int doOperation(int num1, int num2);\n}\n```\n\n```java\npublic class OperationAdd implements Strategy{\n   @Override\n   public int doOperation(int num1, int num2) {\n      return num1 + num2;\n   }\n}\n```\n\n```java\npublic class OperationSubtract implements Strategy{\n   @Override\n   public int doOperation(int num1, int num2) {\n      return num1 - num2;\n   }\n}\n```\n\n### 步骤2:\n\n*Context* 是一个使用了某种策略的类。\n\n```java\npublic class Context {\n   private Strategy strategy;\n \n   public Context(Strategy strategy){\n      this.strategy = strategy;\n   }\n \n   public int executeStrategy(int num1, int num2){\n      return strategy.doOperation(num1, num2);\n   }\n}\n```\n\n### 步骤3: 使用\n\n```java\npublic class StrategyPatternDemo {\n   public static void main(String[] args) {\n      Context context = new Context(new OperationAdd());    \n      System.out.println(\"10 + 5 = \" + context.executeStrategy(10, 5));\n \n      context = new Context(new OperationSubtract());      \n      System.out.println(\"10 - 5 = \" + context.executeStrategy(10, 5));\n \n      context = new Context(new OperationMultiply());    \n      System.out.println(\"10 * 5 = \" + context.executeStrategy(10, 5));\n   }\n}\n```\n\n[参考](https://www.runoob.com/design-pattern/strategy-pattern.html)\n\n\n\n\n\n\n\n## 实现2 - 策略 & 工厂\n\n```\n针对不同类型用户，又不同的打折优惠\n```\n\n### 用户等级枚举类\n\n```java\n/**\n * 用户类型枚举类\n */\npublic enum UserPayServiceEnum {\n\n    VIP(1,\"Vip\"),\n\n    SUPERVIP(2,\"SuperVip\"),\n\n    PARTICULALYVIP(3,\"ParticularlyVip\"),\n\n    NORMAL(4,\"NormalPayService\");\n\n\n\n    /**\n     * 状态值\n     */\n    private int code;\n\n    /**\n     * 类型描述\n     */\n    private String value;\n\n    private UserPayServiceEnum(int code, String value) {\n        this.code = code;\n        this.value = value;\n    }\n    public int getCode() {\n        return code;\n    }\n\n    public String getValue() {\n        return value;\n    }\n\n    public static UserPayServiceEnum valueOf(int code) {\n        for (UserPayServiceEnum type : UserPayServiceEnum.values()) {\n            if (type.getCode()==code) {\n                return type;\n            }\n        }\n        return null;\n    }\n    public static void main(String[] args) {\n        System.out.println(UserPayServiceEnum.VIP.getValue());\n    }\n\n}\n\n```\n\n### 编写接口 & 不同实现类\n\n接口\n\n```java\npublic interface UserPayService {\n    public BigDecimal quote(BigDecimal orderPrice);\n}\n```\n\n策略1\n\n```java\n// 实现InitializingBean接口，容器启动后会调用afterPropertiesSet()方法，往工厂里写入打折策略, 也可以手动初始化工厂\n@Service\npublic class NormalPayService implements UserPayService, InitializingBean {\n    @Override\n    public BigDecimal quote(BigDecimal orderPrice) {\n        return new BigDecimal(\"10\");\n    }\n\n    @Override\n    public void afterPropertiesSet() throws Exception {\n        UserPayServiceStrategyFactory.register(UserPayServiceEnum.NORMAL.getValue(), this);\n    }\n}\n```\n\n策略2\n\n```java\n@Service\npublic class VipPayService implements UserPayService, InitializingBean {\n    @Override\n    public BigDecimal quote(BigDecimal orderPrice) {\n        return new BigDecimal(\"9\");\n    }\n\n    @Override\n    public void afterPropertiesSet() throws Exception {\n        UserPayServiceStrategyFactory.register(UserPayServiceEnum.VIP.getValue(), this);\n    }\n}\n```\n\n### 编写工厂类\n\n```java\n//@Service\npublic class UserPayServiceStrategyFactory {\n\n    private static Map<String,UserPayService> services = new ConcurrentHashMap<String,UserPayService>();\n\n    public  static UserPayService getByUserType(String type){\n        return services.get(type);\n    }\n\n    public static void register(String userType,UserPayService userPayService){\n        Assert.notNull(userType,\"userType can\'t be null\");\n        services.put(userType,userPayService);\n    }\n}\n```\n\n### 编写测试类\n\n```java\n@SpringBootTest\n@Slf4j\nclass IfElseApplicationTests {\n\n    @Test\n    void contextLoads() {\n        calPrice();\n    }\n\n    public void calPrice() {\n        BigDecimal orderPrice = new BigDecimal(\"100\");\n        String vipType = \"Vip\";\n        //指定用户类型，获得相对应的策略\n        UserPayService strategy = UserPayServiceStrategyFactory.getByUserType(vipType);\n\t\t\t\t// UserPayService strategy2 = UserPayServiceStrategyFactory2.getByUserType(vipType);\n\n        BigDecimal quote = strategy.quote(orderPrice);\n        if(strategy instanceof VipPayService){\n           ((VipPayService) strategy).myShow();\n        }\n        System.out.println(quote);\n    }\n}\n```\n\n\n\n### 编写工厂类2 - 手动添加\n\n提前将策略写入到`map`，但是这里需要手动`new`策略对象\n\n```java\npublic class UserPayServiceStrategyFactory2 {\n\n    private static Map<String,UserPayService> services = new ConcurrentHashMap<String, UserPayService>();\n\n    public static UserPayService getByUserType(String type){\n        return services.get(type);\n    }\n\n    static {\n        services.put(UserPayServiceEnum.VIP.getValue(), new VipPayService());\n        services.put(UserPayServiceEnum.SUPERVIP.getValue(), new SuperVipPayService());\n        services.put(UserPayServiceEnum.PARTICULALYVIP.getValue(), new ParticularlyVipPayService());\n        services.put(UserPayServiceEnum.NORMAL.getValue(), new NormalPayService());\n    }\n}\n```\n\n### 编写工厂类3 - 反射\n\n```java\npublic class UserPayServiceStrategyFactory3 {\n\n    private static Map<String, Class<? extends UserPayService>> services = new ConcurrentHashMap<>();\n\n    //初始化map，存放策略\n    static {\n        services.put(UserPayServiceEnum.VIP.getValue(), VipPayService.class);\n        services.put(UserPayServiceEnum.SUPERVIP.getValue(), SuperVipPayService.class);\n        services.put(UserPayServiceEnum.PARTICULALYVIP.getValue(), ParticularlyVipPayService.class);\n        services.put(UserPayServiceEnum.NORMAL.getValue(), NormalPayService.class);\n    }\n\n    //获取策略\n    public static UserPayService getByUserType(String type) {\n        try {\n            Class<? extends UserPayService> userPayServiceClass = services.get(type);\n            return userPayServiceClass.newInstance();\n        } catch (Exception e) {\n            e.printStackTrace();\n            return new NormalPayService();\n        }\n\n    }\n}\n```\n\n[参考](https://juejin.cn/post/6844903985850089480#heading-5)","timestamp":1692282363931},{"name":"005-观察者模式.md","path":"009-设计模式/005-观察者模式.md","content":"## 观察者模式\n\n### 定义\n\n```\n观察者模式是一种行为型设计模式，也被称为发布-订阅（Publish-Subscribe）模式。\n它用于定义一种对象间的一对多依赖关系，使得当一个对象的状态发生变化时，所有依赖于它的对象都会得到通知并自动更新。\n\n在观察者模式中，有两个主要角色：\n（1）主题（Subject）：主题是被观察的对象，它维护一组观察者，并提供方法来添加、移除和通知观察者。当主题的状态发生变化时，会通知所有注册的观察者进行更新。\n（2）观察者（Observer）：观察者是依赖于主题的对象，它定义了一个更新的方法，当主题状态变化时会被调用。多个观察者可以订阅同一个主题，并在主题发生变化时得到通知。\n```\n\n### 优点\n\n```\n（1）松耦合： 主题和观察者之间的耦合度降低，主题不需要知道观察者的具体细节。\n（2）扩展性： 可以很容易地增加新的观察者或主题，而不需要修改现有代码。\n（3）通知机制： 观察者模式提供了一种简单而有效的通知机制，允许观察者根据主题的状态变化来执行相应的操作。\n（4）实时更新： 观察者模式可以实现实时更新，当主题状态变化时，观察者会立即得到通知并进行处理。\n```\n\n","timestamp":1692282363931},{"name":"006-单例模式.md","path":"009-设计模式/006-单例模式.md","content":"## 单例模式\n\n### 定义\n\n```\n单例模式（Singleton Pattern）是一种创建型设计模式，它保证一个类只有一个实例，并提供一个全局访问点来访问这个实例。这意味着在整个应用程序的生命周期内，该类的实例只会被创建一次，所有对该实例的访问都指向同一个对象。\n```\n\n\n\n### 业务场景\n\n```\n保证一个类仅有一个实例，并提供一个访问它的全局访问点。\n- I/O\n- 数据库连接\n- minio连接， mqtt连接\n\n全局资源共享： 当多个部分需要共享一个资源，如配置信息、数据库连接等，可以使用单例模式来确保资源只被实例化一次。\n控制资源访问： 当需要限制某个资源的访问权限，使其只能被一个对象所拥有，可以使用单例模式来实现。\n线程池、缓存等场景： 在一些需要集中管理和控制的场景中，单例模式能够提供一种简单而有效的方法来管理资源。\n```\n\n### 实现\n\n#### 懒汉模式\n\n```\n描述：实例在需要用到的时候，才去创建\n问题：线程不安全\n解决：getInstance加上synchronized\n```\n\n代码\n\n```java\npublic class LanHanSingleton {\n\n    private static LanHanSingleton instance;\n\n    private LanHanSingleton(){ }\n\n    public static LanHanSingleton getInstance(){\n        if (instance == null) {\n            instance = new LanHanSingleton();\n        }\n        return instance;\n    }\n}\n```\n\n#### 饿汉模式\n\n```\n描述：实例在初始化的时候就创建\n问题：不管你后面有没有用到，都先新建好实例，浪费内存空间\n```\n\n代码\n\n```java\npublic class EHanSingleton {\n\n   private static EHanSingleton instance = new EHanSingleton();\n   \n   private EHanSingleton(){ }\n\n   public static EHanSingleton getInstance() {\n       return instance;\n   }\n}\n```\n\n#### 双重校验锁\n\n```\n描述：综合了懒汉式和饿汉式两者的优缺点，既保证了线程安全，又比直接上锁提高了执行效率，还节省了内存空间。\n```\n\n代码\n\n```java\npublic class DoubleCheckSingleton {\n\n   private static DoubleCheckSingleton instance;\n\n   private DoubleCheckSingleton() { }\n   \n   public static DoubleCheckSingleton getInstance(){\n       if (instance == null) {\n           synchronized (DoubleCheckSingleton.class) {\n               if (instance == null) {\n                   instance = new DoubleCheckSingleton();\n               }\n           }\n       }\n       return instance;\n   }\n}\n```\n\n","timestamp":1692282363931},{"name":"007-模版模式.md","path":"009-设计模式/007-模版模式.md","content":"## 模版模式\n\n### 定义\n\n```\n是一种行为型设计模式，一个抽象类定义了一个模板方法，该方法包含了算法的主要骨架，其中一部分步骤可能由子类实现。子类通过继承抽象类并覆盖其中的方法来实现具体的算法细节\n这种方式可以提供代码复用，同时也允许不同的子类实现算法的不同部分，从而实现定制化的行为。\n```\n\n\n\n[参考](https://blog.csdn.net/zxd1435513775/article/details/120080387)","timestamp":1692282363931}]