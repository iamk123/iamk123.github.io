TODO：

 https://mp.weixin.qq.com/s/3zuATaua6avMuGPjYEDUdQ

```
1.2 过期时间不精准问题
1.3 数据弱一致性问题

基于 watchDog 看门狗机制以及 redLock 红锁机制给出对应的解决方案.
```

https://mp.weixin.qq.com/s/ha4Ojv9tDNaeMg4mAVwUTA

```
自动续期
```



实现原理

```
（1）获取锁的时候，使用setnx加锁，并使用expire命令为锁添加一个超时时间，超过该时间则自动释放锁，锁的value值为一个随机生成的UUID，通过此在释放锁的时候进行判断。
（2）获取锁的时候还设置一个获取的超时时间，若超过这个时间则放弃获取锁。
（3）释放锁的时候，通过UUID判断是不是该锁，若是该锁，则执行delete进行锁释放。
```

## key的设计

```
固定前缀:项目名:数据库名:表名:字段名:具体的值
```

## 问题

### 剩余票问题

如果10张票，10个人抢，同一时刻也只有一个人能拿到锁，其它也会因拿不到锁而失败返回，就会剩余票，怎么解决？

```java
public boolean lock(String lockKey, String value, long expireTime) {
        System.out.println("lock:: key:" + lockKey + " value: " + value);
        return redisTemplate.opsForValue().setIfAbsent(lockKey, value, expireTime, TimeUnit.SECONDS);
}
```
解决

```
（1）规定时间内尝试获取锁，而不是获取失败就立即返回
（2）重试机制。获取到锁的线程，执行业务逻辑之前先检测剩余票数，为0直接释放锁。未获取锁的线程在获取锁的逻辑中使用循环，直到获取到锁或超过一定的尝试次数才退出循环

```

```java
@Resource
private RedisTemplate redisTemplate;

void saleTick() {
		...
    int maxRetryCount = 3; // 最大重试次数
    int retryIntervalMillis = 100; // 重试间隔时间（毫秒）
    int retryCount = 0;
  
     try {
          boolean locked = false;
          while (!locked && retryCount < maxRetryCount) {
            	boolean locked = redisLock.tryLock(key, requestId, Duration.ofSeconds(2));	// 2s内尝试获取锁
              if (!locked) {
                  retryCount++;
                  Thread.sleep(retryIntervalMillis); // 重试间隔
              }
          }
       
       		// 获取到锁的业务逻辑...
     } finally {
        redisLock.unlock(key, requestId);
    }
}
```

### 解锁要使用lua的原因？

```java
// 不使用lua的方式
public boolean unlock(String key, String value) {
  	Object currentValue = redisTemplate.opsForValue().get(key);
  	boolean result = false;
    if (StringUtils.isNotEmpty(String.valueOf(currentValue)) && currentValue.equals(value)) {
      result = redisTemplate.opsForValue().getOperations().delete(key);
    }
    return result;
}
```

不使用Lua解锁可能会存在以下隐患：

```

（1）非原子性操作：如果在解锁过程中使用了多个Redis命令，例如先查询锁状态再进行解锁操作，那么这两个操作之间可能会发生竞争条件。即使在判断锁状态时锁是存在的，但在执行解锁操作之前，其他客户端可能已经抢占了锁，导致解锁操作失败。
（2）网络开销增加：在不使用Lua解锁的情况下，解锁过程需要发送多个Redis命令，这会增加网络通信的开销。每个命令都需要与Redis服务器进行交互，而频繁的网络通信可能会增加延迟和降低性能。
（3）锁的误解锁：在解锁过程中，如果由于某种原因（例如网络故障、程序异常等）导致解锁命令未能成功发送或执行，那么就会出现锁的误解锁情况。这会导致其他客户端在未完成任务的情况下获得了锁，可能引发数据一致性问题。

综上所述，不使用Lua解锁可能会带来竞争条件、增加网络开销和锁的误解锁等隐患。使用Lua脚本可以解决这些问题，并提供更可靠和高效的分布式锁机制。

```
### 程序异常无法解锁，导致死锁

```
finally中进行删除锁的操作
```

### 误解锁问题

```
给锁加一个标识符，只允许自己来操作锁，其他访问程序不能操作锁
如String requestId = String.valueOf(gameId + Thread.currentThread().getId());
```

### 运行的程序彻底死掉，如断电，还是会无法解锁导致死锁

```
还要给锁加一个过期时间，这样就算程序死了，当时间过期后，还是能够继续执行
```

### 锁的过期时间过短，业务还未执行完成

```
守护线程/定期任务，续期
```

### 扣减库存的过程可以用lua脚本保证原子性

```

```

### 处理业务逻辑中，使用lua脚本，避免超卖问题??也不会哦

不使用lua脚本，[无法保证原子性，典型的RMW模型](https://juejin.cn/post/7127667756693979173)？？好像也不会出现超卖问题？？？

```java
int stock = Integer.parseInt(redisTemplate.opsForValue().get("product001-stock").toString());
if(stock <= 0) {
    System.out.println("卖完啦！");
    return;
}
int currentStock = stock - 1;
redisTemplate.opsForValue().set("product001-stock",currentStock);
```

使用lua脚本

```java
// 方式2：Lua：参数列表下标从0开始, 获取KEYS[1]对应的值，判断是否<=0，小于返回0；大于则-1
String script = "local stock = redis.call('get', KEYS[1])\n" +
                "if tonumber(stock) <= 0 then\n" +
                "    return 0\n" +
                "else\n" +
                "    redis.call('decr', KEYS[1])\n" +
                "    return 1\n" +
                "end";
RedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);
String key2 = "product001-stock";
Long result = (Long) redisTemplate.execute(redisScript, Collections.singletonList(key2));
int stock = Integer.parseInt(redisTemplate.opsForValue().get("product001-stock").toString());
if (result == 1) {
  	// 执行成功
  	System.out.println("线程：" + Thread.currentThread().getName() + " 抢到票，剩余: " + stock);
} else {
    // 执行失败
    System.out.println("抢票失败");
}
```



## 例子：抢票

`redis`配置

```java
package com.example.springbootdemo.redis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;


@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // 设置key的序列化方式
        template.setKeySerializer(RedisSerializer.string());
        // 设置value的序列化方式
        template.setValueSerializer(RedisSerializer.json());
        // 设置hash的key的序列化方式
        template.setHashKeySerializer(RedisSerializer.string());
        // 设置hash的value的序列化方式
        template.setHashValueSerializer(RedisSerializer.json());

        template.afterPropertiesSet();
        return template;
    }
}
```

Redis分布式锁通用操作类

TODO: 到期自动续期，参考redisson的看门狗watchdog

```java
package com.example.springbootdemo.redis;

import com.alibaba.fastjson.JSON;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.lang.management.LockInfo;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Redis分布式锁通用操作类
 */
@Slf4j
@Component
public class RedisLockUtils {
    @Resource
    private RedisTemplate redisTemplate;
    private static Map<String, LockInfo> lockInfoMap = new ConcurrentHashMap<>();
    private static final Long SUCCESS = 1L;

    /** 分布式锁过期时间，单位秒 */
    private static final Long DEFAULT_LOCK_EXPIRE_TIME = 60L;

    @Getter
    @Setter
    public static class LockInfo {
        private String key;
        private String value;
        private int expireTime;
        //更新时间
        private long renewalTime;
        //更新间隔
        private long renewalInterval;
        public static LockInfo getLockInfo(String key, String value, int expireTime) {
            LockInfo lockInfo = new LockInfo();
            lockInfo.setKey(key);
            lockInfo.setValue(value);
            lockInfo.setExpireTime(expireTime);
            lockInfo.setRenewalTime(System.currentTimeMillis());
            lockInfo.setRenewalInterval(expireTime * 2000 / 3);
            return lockInfo;
        }
    }

    /**
     * 使用lua脚本更新redis锁的过期时间
     * @param lockKey
     * @param value
     * @return 成功返回true, 失败返回false
     */
    public boolean renewal(String lockKey, String value, int expireTime) {
        String luaScript = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('expire', KEYS[1], ARGV[2]) else return 0 end";
        DefaultRedisScript<Boolean> redisScript = new DefaultRedisScript<>();
        redisScript.setResultType(Boolean.class);
        redisScript.setScriptText(luaScript);
        List<String> keys = new ArrayList<>();
        keys.add(lockKey);

        Object result = redisTemplate.execute(redisScript, keys, value, expireTime);
        log.info("更新redis锁的过期时间：{}", result);
        return (boolean) result;
    }

    /**
     * 直接加锁
     * @param lockKey    锁
     * @param value      身份标识（保证锁不会被其他人释放）
     * @param expireTime 锁的过期时间（单位：秒）
     * @return 成功返回true, 失败返回false
     */
    public boolean lock(String lockKey, String value, long expireTime) {
        // System.out.println("lock:: key:" + lockKey + " value: " + value);
        return redisTemplate.opsForValue().setIfAbsent(lockKey, value, expireTime, TimeUnit.SECONDS);
    }

    /**
     * 直接加锁2 - lua脚本
     * @param key
     * @param value
     * @param expire
     * @return
     */
    public boolean lock2(String key, String value, Long expire){
        String luaScript = "if redis.call('setnx', KEYS[1], ARGV[1]) == 1 then return redis.call('expire', KEYS[1], ARGV[2]) else return 0 end";
        RedisScript<Long> redisScript = new DefaultRedisScript<>(luaScript, Long.class);
        Long result = (Long) redisTemplate.execute(redisScript, Collections.singletonList(key), value, String.valueOf(expire));
        return result.equals(Long.valueOf(1));
    }

    /**
     * 尝试在指定时间内加锁
     * @param key
     * @param value
     * @param timeout 锁等待时间
     * @return
     */
    public boolean tryLock(String key, String value, Duration timeout){
        long waitMills = timeout.toMillis();
        long currentTimeMillis = System.currentTimeMillis();
        do {
            boolean lock = lock(key, value, DEFAULT_LOCK_EXPIRE_TIME);
            if (lock) {
                return true;
            }
            try {
                Thread.sleep(1L);
            } catch (InterruptedException e) {
                Thread.interrupted();
            }
        } while (System.currentTimeMillis() < currentTimeMillis + waitMills);
        return false;
    }


    /**
     * 释放锁 - lua脚本解锁
     * @param key
     * @param value
     * @return
     */
    public boolean unlock(String key,String value){
        String luaScript = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        RedisScript<Long> redisScript = new DefaultRedisScript<>(luaScript, Long.class);
        Long result = (Long) redisTemplate.execute(redisScript, Collections.singletonList(key), value);
        return result.equals(Long.valueOf(1));
    }

    /**
     * 定时去检查redis锁的过期时间
     */
    @Scheduled(fixedRate = 5000L)
    @Async("redisExecutor")
    public void renewal() {
        long now = System.currentTimeMillis();
        for (Map.Entry<String, LockInfo> lockInfoEntry : lockInfoMap.entrySet()) {
            LockInfo lockInfo = lockInfoEntry.getValue();
            if (lockInfo.getRenewalTime() + lockInfo.getRenewalInterval() < now) {
                renewal(lockInfo.getKey(), lockInfo.getValue(), lockInfo.getExpireTime());
                lockInfo.setRenewalTime(now);
                log.info("lockInfo {}", JSON.toJSONString(lockInfo));
            }
        }
    }

    /**
     * 分布式锁设置单独线程池
     * @return
     */
    @Bean("redisExecutor")
    public Executor redisExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(1);
        executor.setMaxPoolSize(1);
        executor.setQueueCapacity(1);
        executor.setKeepAliveSeconds(60);
        executor.setThreadNamePrefix("redis-renewal-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardOldestPolicy());
        return executor;
    }
}

```

抢票业务请求

```java
package com.example.springbootdemo.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.Duration;
import java.util.Collections;
import java.util.Random;

@RestController
public class IndexController {
    @Resource
    private RedisTemplate redisTemplate;

    @Autowired
    private RedisLockUtils redisLock;

    @GetMapping("/saleTick")
    public String saleTick() {
        System.out.println("===saleTick===");
        String productId = "product001";
        String requestId = productId + Thread.currentThread().getId();
        String key = productId;
        int maxRetryCount = 3; // 最大重试次数
        int retryIntervalMillis = 100; // 重试间隔时间（毫秒）
        int retryCount = 0;

        try {
            // 方式1：获取失败直接返回
            // boolean locked = redisLock.lock(key, requestId, 10);

            // 方式2：规定时间内尝试获取锁
            // boolean locked = redisLock.tryLock(key, requestId, Duration.ofSeconds(2));

            // 方式3：重试机制
            boolean locked = false;
            while (!locked && retryCount < maxRetryCount) {
                locked = redisLock.tryLock(key, requestId, Duration.ofSeconds(1));	// 2s内尝试获取锁

                if (!locked) {
                    retryCount++;
                    Thread.sleep(retryIntervalMillis); // 重试间隔
                }
            }


            if (!locked) {
                // System.out.println("error");
                return "获取锁失败";
            }

            // 执行业务逻辑
            // 方式1：非lua方式
            // int stock = Integer.parseInt(redisTemplate.opsForValue().get("product001-stock").toString());
            // if(stock <= 0) {
            //     System.out.println("卖完啦！");
            //     return "卖完啦";
            // }
            // int currentStock = stock - 1;
            // redisTemplate.opsForValue().set("product001-stock",currentStock);
            // try {
            //     Random random = new Random();
            //     Thread.sleep(random.nextInt(3) * 1000);
            // } catch (InterruptedException e) {
            //     e.printStackTrace();
            // }
            // System.out.println("线程：" + Thread.currentThread().getName() + " 抢到票，剩余: " + currentStock);

            // 方式2：Lua：参数列表下标从0开始, 获取KEYS[1]对应的值，判断是否<=0，小于返回0；大于则-1
            String script = "local stock = redis.call('get', KEYS[1])\n" +
                    "if tonumber(stock) <= 0 then\n" +
                    "    return 0\n" +
                    "else\n" +
                    "    redis.call('decr', KEYS[1])\n" +
                    "    return 1\n" +
                    "end";
            RedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);
            String key2 = "product001-stock";
            Long result = (Long) redisTemplate.execute(redisScript, Collections.singletonList(key2));
            int stock = Integer.parseInt(redisTemplate.opsForValue().get("product001-stock").toString());
            if (result == 1) {
                // 执行成功
                System.out.println("线程：" + Thread.currentThread().getName() + " 抢到票，剩余: " + stock);
            } else {
                // 执行失败
                System.out.println("抢票失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {

            redisLock.unlock(key, requestId);
        }

        return "买到了";
    }

}

```



参考

-   [SpringBoot整合Redis实现分布式缓存、分布式锁等，实战分享！](https://www.51cto.com/article/744722.html)
    -   springboot redis的基本使用
    -   lua脚本加锁、解锁
    -   规定时间内加锁

-   [SpringBoot+Redis实现分布式锁](https://zhuanlan.zhihu.com/p/536951041)
    -   直接加锁，直接释放
    -   封了一个内部类，描述锁的信息
    -   加锁失败直接返回

-   [手写一个Redis分布式锁，让你彻底搞懂](https://www.51cto.com/article/722510.html)
    -   分布式锁的各种问题

-   [Spring Boot 实现Redis分布式锁](https://juejin.cn/post/7127667756693979173)
    -   代码跑不通

-   [Spring Boot 集成Redisson实现分布式锁](https://juejin.cn/post/7128050664336261157)
    -   解决锁定续期、可重入的问题
    -   分布式系统可用

-   [SpringBoot集成Redis - Redis分布式锁的实现之Jedis(setNXPX+Lua)](https://www.pdai.tech/md/spring/springboot/springboot-x-redis-lettuce-dist-lock.html)
    -   切片，注解的方式使用
    -   有源码

-   [分布式系统 - 分布式锁及实现方案](https://www.pdai.tech/md/arch/arch-z-lock.html)

-   [SpringBoot接口 - 如何保证接口幂等](https://www.pdai.tech/md/spring/springboot/springboot-x-interface-mideng.html)