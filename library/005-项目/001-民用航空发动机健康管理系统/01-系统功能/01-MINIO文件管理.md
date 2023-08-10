## MINIO文件管理

### 数据库设计

```java
分片上传-分片任务记录表 sys_upload_task
id 
upload_id							// 分片上传的uploadId，需要根据该id来生成每个分片上传的地址
file_identifier				// 文件唯一标识（md5）
file_name							// 文件名
bucket_name						// 所属桶名
object_key						// 文件的key
total_size						// 文件大小（byte）
chunk_size						// 每个分片大小（byte）
chunk_num							// 分片数量
```

### 功能

#### 文件秒传

```
上传文件时会去计算文件的md5、文件大小、分片大小，将这些信息存储到数据库，再次上传时，根据md5值就能知道文件是否上传，如果存在文件，则直接返回文件的uri
```

#### 分片上传

```
将大文件拆分成小文件，将小文件上传\下载，最后再将小文件组装成大文件
```

<img src="https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/03/20055016910643501691064350082DqOU1Q-640.png" alt="图片" style="zoom:50%;" />

```
流程：
（1）前端计算文件的md5值、文件大小、分片大小、文件名，调用文件上传接口
（2）根据md5值查询是否上传过，
			- 如果上传完成则直接返回；【文件秒传】
			- 如果有上传过但为上传完成，则返回已经上传的分片；【断点续传的内容】
			- 如果未上传，则调用minio接口开启一个上传任务获取uploadId，将文件上传信息插入上传记录表中
（3）根据md5去获取每个分片上传的地址【通过md5去查uploadId，根据uploadId和分片号查询上传地址】
（4）异步将每个分片上传到指定地址
（5）合并分片完成上传【监听进度，最后一个分片上传完就调合并接口】
```

#### 断点续传

```
指在传输过程中发生中断，或者传输失败，可以从断点处继续传输，而不需要从头开始传输整个文件
```

#### 分段下载

```
断点续传下载将需要下载的文件分成若干个分片分别下载，所有分片都下载完成后，将所有分片合并成完整的文件。
```

<img src="https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/04/213943169115638316911563833938akdFF-image-20220724211002451.png" alt="image-20220724211002451" style="zoom:50%;" />

```java
GetObjectResponse stream = minioClient.getObject(
  GetObjectArgs.builder()
  .bucket(statObjectResponse.bucket())
  .object(statObjectResponse.object())
  .offset(startByte)
  .length(contentLength)
  .build()
); 
```

参考

-   [minio断点下载](https://java.isture.com/arch/minio/minio-breakpoint-downloading.html#_3-%E6%96%AD%E7%82%B9%E4%B8%8B%E8%BD%BD)
-   [springboot使用minio实现分段下载](https://www.bilibili.com/read/cv21016230/)



#### 文件预览

```
openoffice
```



### 问题

#### 文件上传一半不上传了，怎么清理碎片分片？

```
（1）定时任务：可以考虑在sys_upload_task表中新加一个status字段，表示是否合并分片，默认为false，merge请求结束后变更为true，通过一个定时任务定期清理为status为false的记录。
（2）另外MinIO自身对于临时上传的分片，会实施定时清理
```

#### 如何知道哪些分片已经上传成功？

```
（1）方式1: 通过redis记录，md5:uploadId  -> 分片号
（2）方式2：直接调minio接口，获取已经上传的分片
```

#### 多个用户上传同一个文件怎么处理？

```
（1）文件上传锁：可以引入文件上传锁，确保同一时刻只有一个用户可以进行上传操作。当一个用户开始上传文件时，其他用户需要等待上传锁释放后才能开始上传。
（2）版本控制：可以为每个文件引入版本控制，确保每个上传的文件都有唯一的版本号。用户上传同名文件时，系统会自动为其分配一个新的版本号，以保证数据的唯一性。
```

#### 优化：多用户上传同一个文件