

`pom.xml`引入

```xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>27.0.1-jre</version>
</dependency>
```

初始化布隆过滤器

```java
package com.weteam.portal.config;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import com.weteam.common.util.RedisKeyUtil;
import com.weteam.common.util.RedisUtil;
import com.weteam.portal.dao.WtGameDao;
import com.weteam.portal.modal.entity.WtGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.List;

/**
 * 布隆过滤器配置
 */
@Component
public class BloomFilterConfig {
    @Autowired
    private WtGameDao gameDao;
    @Autowired
    private RedisUtil redisUtil;

    /**
     * 期望添加的数据个数
     */
    @Value("${bf.game.expected-insertions}")
    private Long gameExpectedInsertions ;

    /**
     * 误判率（大于0，小于1.0）,期望的误判率，期望的误判率越低，布隆过滤器计算时间越长
     */
    @Value("${bf.game.fpp}")
    private Double gameFpp;


    /**
     * 初始化game布隆过滤器
     * @return
     */
    @Bean
    public BloomFilter<String> gameBloomFilter() {
        BloomFilter<String> bloomFilter = createBloomFilter();
        loadBloomFilterGameData(bloomFilter);
        return bloomFilter;
    }

    /**
     * 创建一个布隆过滤器
     * @return
     */
    public BloomFilter<String> createBloomFilter() {
        return BloomFilter.create(Funnels.stringFunnel(Charset.defaultCharset()),
                gameExpectedInsertions, gameFpp);
    }

    /**
     * 将数据添加到布隆过滤器 & redis
     * @param bloomFilter
     */
    public void loadBloomFilterGameData(BloomFilter<String> bloomFilter) {
        List<WtGame> games = gameDao.selectList(null);
        for(WtGame game : games) {
            String key = RedisKeyUtil.getGameKey(game.getId());
            redisUtil.set(key, game);

            // 存储到布隆过滤器
            bloomFilter.put(String.valueOf(game.getId()));
        }
    }
}

```

定时刷新重置，解决布隆过滤器无法删除元素的问题

```java
package com.weteam.portal.task;

import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;
import com.weteam.common.exception.DefaultExceptionHandler;
import com.weteam.portal.config.BloomFilterConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


/**
 * 布隆过滤器定时任务
 */
@Component
public class BloomFilterTasks {

    private static Logger log = LoggerFactory.getLogger(DefaultExceptionHandler.class);

    @Autowired
    private BloomFilterConfig bloomFilterConfig;
    @Autowired
    private BloomFilter<String> gameBloomFilter;

    @Scheduled(cron = "0 0 0 * * ?") // 每天凌晨0点执行
    public void resetBloomFilter() {
        log.info("===resetBloomFilter===");
        // 创建一个新的布隆过滤器实例来替代旧的过滤器对象
        BloomFilter<String> newBloomFilter = bloomFilterConfig.createBloomFilter();
        bloomFilterConfig.loadBloomFilterGameData(newBloomFilter);
        gameBloomFilter = newBloomFilter;
    }
}

```

业务中使用布隆过滤器

```java
@RestController
@RequestMapping("/games")
public class WtGameController implements WeTeamConstant {
    @Autowired
    private BloomFilter<String> gameBloomFilter;
  
    @GetMapping("/testGameBloomFilter/{id}")
    public CommonResult<?> testGameBloomFilter(@PathVariable int id) {
        // 用布隆判断缓存是否存在
        boolean flag = gameBloomFilter.mightContain(String.valueOf(id));
      
        // 存在则去缓存中查， 不存在则去数据库中查
      	if(flag) {
          
        } else {
          
        }
        return CommonResult.success(b);
    }
}
```



参考

-   [SpringBoot中布隆过滤器的使用](https://blog.csdn.net/m0_52256357/article/details/126386755)
-   [SpringBoot + Redis实现布隆过滤器](https://juejin.cn/post/7075115527219183646)
-   [如何在springboot项目中redis使用布隆过滤器防止缓存穿透](https://blog.csdn.net/weixin_43748936/article/details/110225696?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-110225696-blog-115405043.235%5Ev36%5Epc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-110225696-blog-115405043.235%5Ev36%5Epc_relevant_default_base3&utm_relevant_index=5)