if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m010']=[{"name":"00-课程内容.md","path":"010-GoLang/01-字节青训营/00-课程内容.md","content":"[学习路线](https://bytedance.feishu.cn/docx/DgLKdAs9uofxFHxEBATc9KKYnxg)\n\n","timestamp":1694516098320},{"name":"01-Golang学习路线.md","path":"010-GoLang/01-字节青训营/01-Golang学习路线.md","content":"课程源码：https://github.com/wangkechun/go-by-example\n\n使用go的公司\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/12/22245116839014911683901491956gsbs6b-image-20230512222451789.png\" alt=\"image-20230512222451789\" style=\"zoom:33%;\" />","timestamp":1694516098320},{"name":"02-Go语言基础.md","path":"010-GoLang/01-字节青训营/02-Go语言基础.md","content":"# Go语言基础\n\nhttps://juejin.cn/course/bytetech/7140987981803814919/section/7140988735222448165\n\n## 基础语法\n\n### `Hello World`\n\n```go\npackage main\n\nimport (\n\t\"fmt\"\n)\n\nfunc main() {\n\tfmt.Println(\"hello world\")\n}\n```\n\n### 变量\n\n```java\npackage main\n\nimport (\n\t\"fmt\"\n\t\"math\"\n)\n\nfunc main() {\n\n\tvar a = \"initial\"\n\n\tvar b, c int = 1, 2\n\n\tvar d = true\n\n\tvar e float64\n\n\tf := float32(e)\n\n\tg := a + \"foo\"\n\tfmt.Println(a, b, c, d, e, f) // initial 1 2 true 0 0\n\tfmt.Println(g)                // initialapple\n\n\tconst s string = \"constant\"\n\tconst h = 500000000\n\tconst i = 3e20 / h\n\tfmt.Println(s, h, i, math.Sin(h), math.Sin(i))\n}\n```\n\n### If else\n\n```go\nfunc main() {\n\n\tif 7%2 == 0 {\n\t\tfmt.Println(\"7 is even\")\n\t} else {\n\t\tfmt.Println(\"7 is odd\")\n\t}\n\n\tif 8%4 == 0 {\n\t\tfmt.Println(\"8 is divisible by 4\")\n\t}\n\n\tif num := 9; num < 0 {\n\t\tfmt.Println(num, \"is negative\")\n\t} else if num < 10 {\n\t\tfmt.Println(num, \"has 1 digit\")\n\t} else {\n\t\tfmt.Println(num, \"has multiple digits\")\n\t}\n}\n```\n\n### for循环\n\n```go\nfunc main() {\n\n\ti := 1\n\tfor {\n\t\tfmt.Println(\"loop\")\n\t\tbreak\n\t}\n\tfor j := 7; j < 9; j++ {\n\t\tfmt.Println(j)\n\t}\n\n\tfor n := 0; n < 5; n++ {\n\t\tif n%2 == 0 {\n\t\t\tcontinue\n\t\t}\n\t\tfmt.Println(n)\n\t}\n\tfor i <= 3 {\n\t\tfmt.Println(i)\n\t\ti = i + 1\n\t}\n}\n\n```\n\n### switch\n\n```go\nfunc main() {\n\n\ta := 2\n\tswitch a {\n\tcase 1:\n\t\tfmt.Println(\"one\")\n\tcase 2:\n\t\tfmt.Println(\"two\")\n\tcase 3:\n\t\tfmt.Println(\"three\")\n\tcase 4, 5:\n\t\tfmt.Println(\"four or five\")\n\tdefault:\n\t\tfmt.Println(\"other\")\n\t}\n\n\tt := time.Now()\n\tswitch {\n\tcase t.Hour() < 12:\n\t\tfmt.Println(\"It\'s before noon\")\n\tdefault:\n\t\tfmt.Println(\"It\'s after noon\")\n\t}\n}\n```\n\n### 数组\n\n```go\nfunc main() {\n\n\tvar a [5]int\n\ta[4] = 100\n\tfmt.Println(\"get:\", a[2])\n\tfmt.Println(\"len:\", len(a))\n\n\tb := [5]int{1, 2, 3, 4, 5}\n\tfmt.Println(b)\n\n\tvar twoD [2][3]int\n\tfor i := 0; i < 2; i++ {\n\t\tfor j := 0; j < 3; j++ {\n\t\t\ttwoD[i][j] = i + j\n\t\t}\n\t}\n\tfmt.Println(\"2d: \", twoD)\n}\n```\n\n### 切片\n\n```go\nfunc main() {\n\n\ts := make([]string, 3)\n\ts[0] = \"a\"\n\ts[1] = \"b\"\n\ts[2] = \"c\"\n\tfmt.Println(\"get:\", s[2])   // c\n\tfmt.Println(\"len:\", len(s)) // 3\n\n\ts = append(s, \"d\")\n\ts = append(s, \"e\", \"f\")\n\tfmt.Println(s) // [a b c d e f]\n\n\tc := make([]string, len(s))\n\tcopy(c, s)\n\tfmt.Println(c) // [a b c d e f]\n\n\tfmt.Println(s[2:5]) // [c d e]\n\tfmt.Println(s[:5])  // [a b c d e]\n\tfmt.Println(s[2:])  // [c d e f]\n\n\tgood := []string{\"g\", \"o\", \"o\", \"d\"}\n\tfmt.Println(good) // [g o o d]\n}\n```\n\n### map\n\n```go\nfunc main() {\n\tm := make(map[string]int)\n\tm[\"one\"] = 1\n\tm[\"two\"] = 2\n\tfmt.Println(m)           // map[one:1 two:2]\n\tfmt.Println(len(m))      // 2\n\tfmt.Println(m[\"one\"])    // 1\n\tfmt.Println(m[\"unknow\"]) // 0\n\n\tr, ok := m[\"unknow\"]\n\tfmt.Println(r, ok) // 0 false\n\n\tdelete(m, \"one\")\n\n\tm2 := map[string]int{\"one\": 1, \"two\": 2}\n\tvar m3 = map[string]int{\"one\": 1, \"two\": 2}\n\tfmt.Println(m2, m3)\n}\n\n```\n\n### range\n\n```go\nfunc main() {\n  // 数组\n\tnums := []int{2, 3, 4}\n\tsum := 0\n\tfor i, num := range nums {\n\t\tsum += num\n\t\tif num == 2 {\n\t\t\tfmt.Println(\"index:\", i, \"num:\", num) // index: 0 num: 2\n\t\t}\n\t}\n\tfmt.Println(sum) // 9\n\n  // map\n\tm := map[string]string{\"a\": \"A\", \"b\": \"B\"}\n\tfor k, v := range m {\n\t\tfmt.Println(k, v) // b 8; a A\n\t}\n\tfor k := range m {\n\t\tfmt.Println(\"key\", k) // key a; key b\n\t}\n}\n```\n\n### 函数\n\n实际业务逻辑代码中，几乎所有函数都返回两个值。第一个是真正的返回结果，第二个是错误信息\n\n```go\nfunc add(a int, b int) int {\n\treturn a + b\n}\n\nfunc add2(a, b int) int {\n\treturn a + b\n}\n\n// 多个返回值\nfunc exists(m map[string]string, k string) (v string, ok bool) {\n\tv, ok = m[k]\n\treturn v, ok\n}\n\nfunc main() {\n\tres := add(1, 2)\n\tfmt.Println(res) // 3\n\n\tv, ok := exists(map[string]string{\"a\": \"A\"}, \"a\")\n\tfmt.Println(v, ok) // A True\n}\n```\n\n### 指针\n\n一个主要用途就是修改传入参数\n\n```go\nfunc add2(n int) {\n\tn += 2\n}\n\nfunc add2ptr(n *int) {\n\t*n += 2\n}\n\nfunc main() {\n\tn := 5\n\tadd2(n)\n\tfmt.Println(n)  // 5\n  \n\tadd2ptr(&n)\t\t\t// 传引用\n\tfmt.Println(n)  // 7\n}\n```\n\n### 结构体\n\n结构体是带类型的字段的集合\n\n```go\ntype user struct {\n\tname     string\n\tpassword string\n}\n\nfunc main() {\n\ta := user{name: \"wang\", password: \"1024\"}\n\tb := user{\"wang\", \"1024\"}\n\tc := user{name: \"wang\"}\n\tc.password = \"1024\"\n\tvar d user\n\td.name = \"wang\"\n\td.password = \"1024\"\n\n\tfmt.Println(a, b, c, d)                 // {wang 1024} {wang 1024} {wang 1024} {wang 1024}\n\tfmt.Println(checkPassword(a, \"haha\"))   // false\n\tfmt.Println(checkPassword2(&a, \"haha\")) // false\n}\n\nfunc checkPassword(u user, password string) bool {\n\treturn u.password == password\n}\n\nfunc checkPassword2(u *user, password string) bool {\n\treturn u.password == password\n}\n```\n\n### 结构体方法\n\n```go\ntype user struct {\n\tname     string\n\tpassword string\n}\n\n// 不带指针，操作的是一个拷贝，无法对结构体进行修改\nfunc (u user) checkPassword(password string) bool {\n\treturn u.password == password\n}\n\n// 带指针，对结构体去做修改\nfunc (u *user) resetPassword(password string) {\n\tu.password = password\n}\n\nfunc main() {\n\ta := user{name: \"wang\", password: \"1024\"}\n\ta.resetPassword(\"2048\")\n\tfmt.Println(a.checkPassword(\"2048\")) // true\n}\n```\n\n带指针和不带指针的区别\n\n```go\npackage main\n\nimport \"fmt\"\n\ntype Rectangle struct {\n    width  int\n    height int\n}\n\nfunc (r *Rectangle) PointerMethod() {\n    r.width = 10\n    r.height = 5\n}\n\nfunc (r Rectangle) ValueMethod() {\n    r.width = 20\n    r.height = 10\n}\n\nfunc main() {\n    rect1 := Rectangle{}\n    \n    // 指针接收者方法\n    fmt.Println(\"Before calling PointerMethod:\", rect1)\n    rect1.PointerMethod()\n    fmt.Println(\"After calling PointerMethod:\", rect1)\n    \n    rect2 := Rectangle{}\n    \n    // 非指针接收者方法\n    fmt.Println(\"Before calling ValueMethod:\", rect2)\n    rect2.ValueMethod()\n    fmt.Println(\"After calling ValueMethod:\", rect2)\n}\n\n\nBefore calling PointerMethod: {0 0}\nAfter calling PointerMethod: {10 5}\nBefore calling ValueMethod: {0 0}\nAfter calling ValueMethod: {0 0}\n\n```\n\n指针接收者方法只能在指针类型的值上调用，而非指针接收者方法可以在指针类型和非指针类型的值上都能调用\n\n```\npackage main\n\nimport \"fmt\"\n\ntype Rectangle struct {\n    width  int\n    height int\n}\n\nfunc (r *Rectangle) PointerMethod() {\n    fmt.Println(\"PointerMethod called\")\n}\n\nfunc (r Rectangle) ValueMethod() {\n    fmt.Println(\"ValueMethod called\")\n}\n\nfunc main() {\n    rect := Rectangle{}\n    rectPointer := &rect\n    \n    rect.ValueMethod()            // 在非指针类型的值上调用非指针接收者方法\n    rectPointer.ValueMethod()     // 在指针类型的值上调用非指针接收者方法\n    \n    (&rect).PointerMethod()       // 在非指针类型的值上调用指针接收者方法\n    rectPointer.PointerMethod()   // 在指针类型的值上调用指针接收者方法\n}\n\n```\n\n","timestamp":1694516098320},{"name":"03-案例实战.md","path":"010-GoLang/01-字节青训营/03-案例实战.md","content":"","timestamp":1694516098320},{"name":"04-需求实践.md","path":"010-GoLang/01-字节青训营/04-需求实践.md","content":"go需求实践-发帖回帖\n\n-   源码：https://github.com/Moonlight-Zhao/go-project-example\n\n![image-20230521222834892](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/21/22283516846793151684679315051ml7eaj-image-20230521222834892.png)\n\n![image-20230521222850654](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/21/22285016846793301684679330763qlinfa-image-20230521222850654.png)\n\n![image-20230521222858100](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/21/22285816846793381684679338183Lnyr9x-image-20230521222858100.png)\n\n![image-20230521222909478](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/21/22290916846793491684679349563k6gdc2-image-20230521222909478.png)\n\n![image-20230521222937789](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/21/22293716846793771684679377881Gq4A67-image-20230521222937789.png)\n\n项目结构\n\n```\n- handler\n\t- publish_post.go\n\t- query_page_indo.go\n- repository\n\t- db_init.go\n\t- post.go\n\t- topic.go\n\t- user.go\n- service\n\t- publish_post.go\n\t- publish_post_test.go\n\t- query_page_info.go\n\t- query_page_info_test.go\n- server.go\n\n```\n\n`repository/post.go`\n\n```go\npackage repository\n\nimport (\n\t\"github.com/Moonlight-Zhao/go-project-example/util\"\n\t\"gorm.io/gorm\"\n\t\"sync\"\n\t\"time\"\n)\n\ntype Post struct {\n\tId         int64     `gorm:\"column:id\"`\n\tParentId   int64     `gorm:\"parent_id\"`\n\tUserId     int64     `gorm:\"column:user_id\"`\n\tContent    string    `gorm:\"column:content\"`\n\tDiggCount  int32     `gorm:\"column:digg_count\"`\n\tCreateTime time.Time `gorm:\"column:create_time\"`\n}\n\nfunc (Post) TableName() string {\n\treturn \"post\"\n}\n\ntype PostDao struct {\n}\n\nvar postDao *PostDao\nvar postOnce sync.Once\n\nfunc NewPostDaoInstance() *PostDao {\n\tpostOnce.Do(\n\t\tfunc() {\n\t\t\tpostDao = &PostDao{}\n\t\t})\n\treturn postDao\n}\n\nfunc (*PostDao) QueryPostById(id int64) (*Post, error) {\n\tvar post Post\n\terr := db.Where(\"id = ?\", id).Find(&post).Error\n\tif err == gorm.ErrRecordNotFound {\n\t\treturn nil, nil\n\t}\n\tif err != nil {\n\t\tutil.Logger.Error(\"find post by id err:\" + err.Error())\n\t\treturn nil, err\n\t}\n\treturn &post, nil\n}\n\nfunc (*PostDao) QueryPostByParentId(parentId int64) ([]*Post, error) {\n\tvar posts []*Post\n\terr := db.Where(\"parent_id = ?\", parentId).Find(&posts).Error\n\tif err != nil {\n\t\tutil.Logger.Error(\"find posts by parent_id err:\" + err.Error())\n\t\treturn nil, err\n\t}\n\treturn posts, nil\n}\n\nfunc (*PostDao) CreatePost(post *Post) error {\n\tif err := db.Create(post).Error; err != nil {\n\t\tutil.Logger.Error(\"insert post err:\" + err.Error())\n\t\treturn err\n\t}\n\treturn nil\n}\n\n```\n\n`service/publish_post.go`\n\n```go\npackage service\n\nimport (\n\t\"errors\"\n\t\"github.com/Moonlight-Zhao/go-project-example/repository\"\n\t\"time\"\n\t\"unicode/utf8\"\n)\n\nfunc PublishPost(topicId, userId int64, content string) (int64, error) {\n\treturn NewPublishPostFlow(topicId, userId, content).Do()\n}\n\nfunc NewPublishPostFlow(topicId, userId int64, content string) *PublishPostFlow {\n\treturn &PublishPostFlow{\n\t\tuserId:  userId,\n\t\tcontent: content,\n\t\ttopicId: topicId,\n\t}\n}\n\ntype PublishPostFlow struct {\n\tuserId  int64\n\tcontent string\n\ttopicId int64\n\n\tpostId int64\n}\n\nfunc (f *PublishPostFlow) Do() (int64, error) {\n\tif err := f.checkParam(); err != nil {\n\t\treturn 0, err\n\t}\n\tif err := f.publish(); err != nil {\n\t\treturn 0, err\n\t}\n\treturn f.postId, nil\n}\n\nfunc (f *PublishPostFlow) checkParam() error {\n\tif f.userId <= 0 {\n\t\treturn errors.New(\"userId id must be larger than 0\")\n\t}\n\tif utf8.RuneCountInString(f.content) >= 500 {\n\t\treturn errors.New(\"content length must be less than 500\")\n\t}\n\treturn nil\n}\n\nfunc (f *PublishPostFlow) publish() error {\n\tpost := &repository.Post{\n\t\tParentId:   f.topicId,\n\t\tUserId:     f.userId,\n\t\tContent:    f.content,\n\t\tCreateTime: time.Now(),\n\t}\n\tif err := repository.NewPostDaoInstance().CreatePost(post); err != nil {\n\t\treturn err\n\t}\n\tf.postId = post.Id\n\treturn nil\n}\n\n```\n\n`handler/publish_post.go`\n\n```go\npackage handler\n\nimport (\n\t\"strconv\"\n\n\t\"github.com/Moonlight-Zhao/go-project-example/service\"\n)\n\ntype PageData struct {\n\tCode int64       `json:\"code\"`\n\tMsg  string      `json:\"msg\"`\n\tData interface{} `json:\"data\"`\n}\n\nfunc QueryPageInfo(topicIdStr string) *PageData {\n\t//参数转换\n\ttopicId, err := strconv.ParseInt(topicIdStr, 10, 64)\n\tif err != nil {\n\t\treturn &PageData{\n\t\t\tCode: -1,\n\t\t\tMsg:  err.Error(),\n\t\t}\n\t}\n\t//获取service层结果\n\tpageInfo, err := service.QueryPageInfo(topicId)\n\tif err != nil {\n\t\treturn &PageData{\n\t\t\tCode: -1,\n\t\t\tMsg:  err.Error(),\n\t\t}\n\t}\n\treturn &PageData{\n\t\tCode: 0,\n\t\tMsg:  \"success\",\n\t\tData: pageInfo,\n\t}\n\n}\n\n```\n\n`sever.go`\n\n```go\npackage main\n\nimport (\n\t\"github.com/Moonlight-Zhao/go-project-example/handler\"\n\t\"github.com/Moonlight-Zhao/go-project-example/repository\"\n\t\"github.com/Moonlight-Zhao/go-project-example/util\"\n\t\"gopkg.in/gin-gonic/gin.v1\"\n\t\"os\"\n)\n\nfunc main() {\n\tif err := Init(); err != nil {\n\t\tos.Exit(-1)\n\t}\n\tr := gin.Default()\n\n\tr.Use(gin.Logger())\n\n\tr.GET(\"/ping\", func(c *gin.Context) {\n\t\tc.JSON(200, gin.H{\n\t\t\t\"message\": \"pong\",\n\t\t})\n\t})\n\n\tr.GET(\"/community/page/get/:id\", func(c *gin.Context) {\n\t\ttopicId := c.Param(\"id\")\n\t\tdata := handler.QueryPageInfo(topicId)\n\t\tc.JSON(200, data)\n\t})\n\n\tr.POST(\"/community/post/do\", func(c *gin.Context) {\n\t\tuid, _ := c.GetPostForm(\"uid\")\n\t\ttopicId, _ := c.GetPostForm(\"topic_id\")\n\t\tcontent, _ := c.GetPostForm(\"content\")\n\t\tdata := handler.PublishPost(uid, topicId, content)\n\t\tc.JSON(200, data)\n\t})\n\terr := r.Run()\n\tif err != nil {\n\t\treturn\n\t}\n}\n\nfunc Init() error {\n\tif err := repository.Init(); err != nil {\n\t\treturn err\n\t}\n\tif err := util.InitLogger(); err != nil {\n\t\treturn err\n\t}\n\treturn nil\n}\n\n```\n\n","timestamp":1694516098320},{"name":"05-GORM.md","path":"010-GoLang/01-字节青训营/05-GORM.md","content":"","timestamp":1694516098320},{"name":"06-消息队列.md","path":"010-GoLang/01-字节青训营/06-消息队列.md","content":"![image-20230524221940630](/Users/kuan/Library/Application%20Support/typora-user-images/image-20230524221940630.png)\n\n![image-20230524221957034](/Users/kuan/Library/Application%20Support/typora-user-images/image-20230524221957034.png)\n\n![image-20230524222006689](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/24/22200616849380061684938006785FahpfP-image-20230524222006689.png)\n\n![image-20230524222512173](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/24/22251216849383121684938312286Mk8EiN-image-20230524222512173.png)\n\n## kafka  \n\n![image-20230524222614872](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/05/24/222614168493837416849383749660m2yJP-image-20230524222614872.png)","timestamp":1694516098320}]