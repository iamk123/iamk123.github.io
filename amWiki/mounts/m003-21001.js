if(typeof AWPageMounts=='undefined'){AWPageMounts={}};AWPageMounts['m003']=[{"name":"02-基础.md","path":"003-计算机网络/02-基础.md","content":"## 网络分层模型\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/24/095002169284180216928418024746GLbBr-image-20230824095002380.png\" alt=\"image-20230824095002380\" style=\"zoom:50%;\" />\n\n#### OSI七层模型是什么？每一层的作用是什么？\n\n```\n（1）应用层：为计算机用户提供服务，比如DNS、HTTP、FTP、SMTP、DHCP、POP3\n（2）表示层：数据处理（编解码、加密解密、压缩解压缩）\n（3）会话层：管理（建立、维护、重连）应用程序之间的会话\n（4）传输层：为两台主机之间的通信提供通用的数据传输服务，如TCP、UDP\n（5）网络层：路由和寻址，实现不同网络之间的路径选择，如IP协议、ARP、OSPF\n（6）数据链路层：将网络层传下来的IP数据包组装成帧，并在相邻节点的链路上传送帧\n（7）物理层：实现相邻节点间比特流的透明传输，尽可能屏蔽传输介质和通信手段的差异\n```\n\n#### TCP/IP四层模型是什么？每一层的作用是什么？\n\n```\n是目前被广泛采用的一种模型，可以看作是OSI七层模型的精简版\n\n（1）应用层：对应于 OSI 参考模型的（应用层、表示层、会话层）。\n（2）传输层：\n（3）网络层：\n（4）网络接口层：与 OSI 参考模型的数据链路层、物理层对应。\n```\n\n#### 为什么网络要分层？\n\n```\n（1）模块化和解耦：每个层次负责特定的功能，各层之间通过定义好的接口进行通信，使得网络的设计更加模块化和解耦。一旦某个层次发生变化，不会对其他层次产生影响。\n（2）可靠性和灵活性：分层结构使得网络功能相互独立，可以根据需要灵活地增加、删除或修改某个层次的功能，而不会对整个网络产生影响。\n（3）可拓展性：可以新增新的层次或协议，以满足不断增长的网络需求，而无需对已有层次进行修改。\n（4）通用性：可以通过使用标准的协议和接口，不同厂商的设备和应用可以更容易地进行互操作，实现通用性和互联互通\n```\n\n\n\n\n\n\n\n\n\n\n\n## PING\n\n### PING 命令的作用是什么？\n\n```\n是一种常用的网络诊断工具，经常用来测试网络中主机之间的连通性和网络延迟\n```\n\n### PING 命令的工作原理是什么？\n\n```\nICMP\n\nTODO：https://javaguide.cn/cs-basics/network/other-network-questions.html#ping-命令的作用是什么\n```\n\n\n\n## DNS\n\n### DNS 的作用是什么？\n\n```\nDNS是应用层协议，即域名管理系统，主要解决的是域名和ip地址的映射\n```\n\n### DNS 的解析过程\n\n```\ndns的查询解析过程分为两种模式：\n（1）迭代\n（2）递归\n```\n\n迭代\n\n```\n（1）查询浏览器缓存\n（2）查询本地DNS缓存\n（3）本地DNS请求发往「根域名服务器」，返回查询哪个「顶级域名服务器」\n（4）本地DNS请求发往「顶级域名服务器」，返回查询哪个「权威域名服务器」\n（5）本地DNS请求发往「权威域名服务器」，返回对应的IP地址\n\nhttps://javaguide.cn/cs-basics/network/dns.html#dns-记录\n```\n\n假设你要查询 www.baidu.com 的 IP 地址:\n\n```\n（1）首先会查找浏览器的缓存,看看是否能找到 www.baidu.com 对应的 IP 地址， 找到就直接返回；否则进行下一步。\n（2）将请求发往给本地 DNS 服务器，如果查找到也直接返回，否则继续进行下一 步；\n（3）本地 DNS 服务器向「根域名服务器」发送请求，根域名服务器返回负责.com 的顶级域名服务器的 IP 地址的列表。\n（4）本地 DNS 服务器再向其中一个负责.com 的顶级域名服务器发送一个请求，返回负责.baidu的权威域名服务器的 IP 地址列表。\n（5）本地 DNS 服务器再向其中一个权威域名服务器发送一个请求，返回 www.baidu.com 所对应的 IP 地址。\n```\n\n\n\n### 从输入 URL 到页面展示到底发生了什么？\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/24/09580516928422851692842285061yI5eBq-18450416927875041692787504619zXYQnH-url%E8%BE%93%E5%85%A5%E5%88%B0%E5%B1%95%E7%A4%BA%E5%87%BA%E6%9D%A5%E7%9A%84%E8%BF%87%E7%A8%8B.jpg\" alt=\"img\" style=\"zoom:50%;\" />\n\n\n\n```\n（1）DNS解析：浏览器将URL中的主机名发送给本地DNS服务器，以获取对应的IP地址。本地DNS服务器查询全球分布的根DNS服务器，并逐步向下查询，直到查到目标域名对应的ip地址。\n（2）TCP连接：浏览器根据获取到的IP地址，与服务器建立TCP连接\n（3）发送HTTP请求：TCP建立连接后，浏览器会发送一个HTTP请求到服务器，请求获取网页的资源。HTTP请求包括请求方法、URL、请求头、请求体等。\n（4）服务器处理请求并返回HTTP报文：服务器处理请求，并将生成的HTTP响应发送回浏览器。响应包括了状态码、响应头、响应体等信息。响应体中包含了请求的资源，比如html、css、图片等\n（5）浏览器解析渲染页面\n（6）TCP四次挥手，连接结束\n\nhttps://javaguide.cn/cs-basics/network/other-network-questions.html#从输入-url-到页面展示到底发生了什么-非常重要\n```\n\n\n\n### 说说 WebSocket 与 socket 的区别\n\n```\n- Socket 其实就是等于 IP 地址 + 端口 + 协议。\n具体来说，Socket 是一套标准，它完成了对 TCP/IP 的高度封装，屏蔽网络细 节，以方便开发者更好地进行网络编程。\n- WebSocket 是一个持久化的协议，它是伴随 H5 而出的协议，用来解决 http 不 支持持久化连接的问题。 \n- Socket 一个是网编编程的标准接口，而 WebSocket 则是应用层通信协议。\n```\n\n\n\n","timestamp":1693789897560},{"name":"03-HTTP.md","path":"003-计算机网络/03-HTTP.md","content":"## HTTP\n\n### HTTP 状态码有哪些？\n\n![常见 HTTP 状态码](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/01/14241516908710551690871055846D6MmiG-11280716905148871690514887827Ypzds9-http-status-code.png)\n\n### HTTP Header中常用的字段\n\n```\n通用\n  Cache-Control: 指定缓存策略。\n  Connection: 是否是长连接，如“keep-alive”或“close”。\n  Date: 消息发送的日期和时间。\n  \n请求头\n  Host: 指定请求资源的Internet主机和端口号。\n  Authorization: 用于身份验证的凭证。\n  \n响应头部字段\n\tContent-Type: 响应主体的媒体类型。\n\tContent-Length: 响应主体的长度（字节）\n\tExpires: 响应被认为是过时的日期和时间。\n```\n\n### 说说 HTTP 常用的状态码及其含义？\n\n<img src=\"/Users/kuan/Library/Application%20Support/typora-user-images/image-20230824094018848.png\" alt=\"image-20230824094018848\" style=\"zoom:50%;\" />\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/24/09403516928412351692841235349wSCIvy-image-20230824094035262.png\" alt=\"image-20230824094035262\" style=\"zoom:50%;\" />\n\n### HTTP 常用的请求方式，区别和用途？\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/24/09423716928413571692841357302FNLfKO-image-20230824094237223.png\" alt=\"image-20230824094237223\" style=\"zoom:50%;\" />\n\n### 如何理解 HTTP 协议是无状态的\n\n```\n服务器不会去记住你是谁，所以是无状态协议。\n```\n\n###  HTTP/1.0 、 HTTP/1.1 、HTTP2.0有什么区别？\n\n```\nHTTP 1.0\n（1）默认使用端链接，每次请求都需要建立一个新的tcp连接，请求完后立即关闭连接。它可以设置 Connection: keep-alive 这个字段，强制开启长连接。\n\n\nHTTP 1.1\n（1） http1.1是长连接，即在一个tcp连接上可以发送多个请求和响应，减少连接建立和关闭的开销，提高了性能。\n（2）管道机制：即在同一个 TCP 连接里面，客户端可以同时发送多个请求。\n（3）增强的缓存处理: 引入了更多的缓存控制策略。\n\nHTTP 2.0\n（1）二进制格式: HTTP/2使用二进制格式进行数据传输，而不是HTTP/1.x的文本格式。\n（2）完全多路复用：在一个连接里，客户端和浏览器都可以同时发送多个请求或回应， 而且不用按照顺序一一对应。\n（3）报头压缩：HTTP 协议不带有状态，每次请求都必须附上所有信息。Http 2.0 引入 了头信息压缩机制，使用 gzip 或 compress 压缩后再发送。\n（4）服务端推送：允许服务器未经请求，主动向客户端发送资源。\n```\n\n```\n田螺面试\nhttps://javaguide.cn/cs-basics/network/http1.0-vs-http1.1.html\n```\n\n\n\n### HTTP 是不保存状态的协议, 如何保存用户状态?\n\n```\nhttp是一种无状态协议，http协议自身不对请求和响应之间的通信状态进行保存。\n\n保存状态的方法：\n（1）cookies：通过在客户端浏览器上设置cookies，可以将一些用户信息存储在客户端，每次请求时，将这些信息发送到服务器。服务器可以读取这些cookies，从而实现用户状态的跟踪和管理。\n（2）session：服务器可以在用户登录之后创建一个session，将用户相关的信息保存在服务器上，然后将sessionID发送给客户端浏览器，通过cookies来保存，客户端在后续的请求中通过这个sessionID与服务器建立关联，从而维护用户状态。\n（3）Token：在一些前后端分离的应用中，通过token来保存用户信息，用户登录之后，服务器颁发一个带有有效期的令牌，客户端将令牌存储起来，在后续请求中携带这个token，服务器可以根据token来验证用户的身份和权限\n\nchatgpt\n```\n\n### Cookie 被禁用怎么办?\n\n```\n将sessionID附在url路径后面\n```\n\n###  Cookie 和 Session 有什么区别？\n\n```\n都是用户维护用户状态的方法\n- cookie将用户信息存储在客户端，存储容量较小，相对较不安全\n- session将用户信息存储在服务器，存储容量较大，用户无法直接访问和修改，相对比较安全\n```\n\n### URI 和 URL 的区别是什么?\n\n```\nURI(Uniform Resource Identifier) 是统一资源标志符，可以唯一标识一个资源。\nURL(Uniform Resource Locator) 是统一资源定位符，可以提供该资源的路径。当url可以唯一表示一个资源时，它就是uri\n\nURI 的作用像身份证号一样，URL 的作用更像家庭住址一样。\n```\n\n\n\n## POST 和 GET 有哪些区别？\n\n```\n（1）请求方式：GET用于请求数据，请求参数在url中使用问号传参，因此收到URL长度的限制，一般限制在2k字符以内；POST用于提交数据，数据放在请求体中，理论上没有数据大小的限制\n（2）请求缓存：GET会被主动缓存；Post默认不会被缓存\n```\n\n## HTTPS\n\n### HTTP 和 HTTPS 有什么区别？\n\n```\n（1）安全性：\n\t\t- http是明文传输协议，传输的所有数据都是以明文形式发送，容易被窃听和篡改\n\t\t- https是通过SSL/TLS协议进行加密传输，可以保证数据的安全性\n（2）端口\n\t\t- http使用80端口进行通信\n\t\t- https使用443端口进行通信\n（3）证书：\n\t\t- HTTP没有验证对方身份，存在被冒充的风险\n\t\t- 使用https的网站需要使用ssl证书，用于验证服务器的身份。这样客户端可以确保自己的连接是正确的服务器，而不是伪造的服务器。\n```\n\n### Https 流程是怎样的？\n\n![image-20230824101811401](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/24/10181116928434911692843491503aj08NI-image-20230824101811401.png)\n\n```\n- HTTPS = HTTP + SSL/TLS，也就是用 SSL/TLS 对数据进行加密和解密，Http 进行传输。 \n- SSL，即 Secure Sockets Layer（安全套接层协议），是网络通信提供安全及数 据完整性的一种安全协议。 \n- TLS，即 Transport Layer Security(安全传输层协议)，它是 SSL3.0 的后续版本。\n```\n\n流程\n\n```\n（1）客户端发送HTTPS请求，连接到服务器的443端口\n（2）服务器必须要有一套数字证书（包含公钥、证书颁发机构、失效日期等）\n（3）服务器将自己的数字证书发给客户端（公钥在证书里，私钥由服务器持有）\n（4）客户端收到数字证书之后，会校验证书的合法性。如何证书验证通过，就会生成一个「随机对称密钥」，用证书的公钥加密\n（5）客户端将公钥加密后的密钥发送到服务器\n（6）服务器接收到后，用自己之前保留的私钥对其进行「非对成解密」，解密之后就得到客户端的密钥，然后用客户端密钥对数据进行「对称加密」，这样传输的数据都是密文里。\n（7）服务将加密的密文返回给客户端\n（8）客户端收到后，用自己的密钥对其进行「对称解密」，得到服务器返回的数据\n```\n\n```\n客户生成的「随机对称密钥」用「非对称加密」：安全\n之后的数据传输用「对称加密」：快\n```\n\n\n\n### 对称加密与非对称加密有什么区别\n\n```\n（1）对称加密：指加密和解密使用同一密钥，优点是运算速度较快，缺点是如何安 全将密钥传输给另一方。常见的对称加密算法有：DES、AES 等。\n（2）非对称加密：指的是加密和解密使用不同的密钥（即公钥和私钥）。公钥与私 钥是成对存在的，如果用公钥对数据进行加密，只有对应的私钥才能解密。常见的非对称加密算法有 RSA。\n```\n\n","timestamp":1693789897560},{"name":"04-TCP.md","path":"003-计算机网络/04-TCP.md","content":"## TCP基本认识\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/01/14301816908714181690871418304qhbr63-format,png-20230309230534096.png\" alt=\"TCP 头格式\" style=\"zoom:50%;\" />\n\n\n\n### 什么是TCP？[x]\n\n```\nTCP 是面向连接的、可靠的、基于字节流的传输层通信协议。\n\n（1）面向连接：在传输数前，TCP会建立一个连接，然后在连接上传输数据，传输完后关闭连接。\n（2）可靠的：通过序列号、确认、重传、流量控制、拥塞控制和校验和等机制，确保TCP的可靠传输。无论网络链路出现了怎么样变化，TCP都可以保证一个报文，一定能够到达接收端。\n（3）字节流：如何理解TCP是面向字节流协议的？\n```\n\n### 如何理解TCP是面向字节流协议的？[x]\n\n```\nTCP 协议在传输数据时是以字节为单位进行传输的。这意味着，当用户通过应用程序发送数据时，TCP 协议会将用户消息拆分成若干个字节，并在传输时保证这些字节的顺序，以便接收端能够正确地重组原始数据。\n```\n\n### 如何唯一确定一个 TCP 连接呢？\n\n```\n源地址-源端口-目标地址-目标端口\n```\n\n\n\n## TCP和UDP\n\n### TCP 与 UDP 的区别？[x]\n\n```\n（1）连接性\n\t\t- TCP是面向连接的协议，传输数据之前需要建立连接，结束后需要释放连接\n\t\t- UDP是无连接协议，连接前不需要建立连接\n（2）可靠性：\n\t\t- TCP保证数据的可靠传输。通过序列号、确认、重传、流量控制、拥塞控制、校验和等机制来保证数据的完整性和顺序性。如果数据包丢失或损坏，TCP会自动重传数据。\n\t\t- UDP不保证数据的可靠传输。远程主机接受报文不需要确认，并不关心数据是否到达目的地\n（3）传输效率\n\t\t- TCP需要连接、确认、重传等机制，所以TCP比UDP慢很多\n（4）传输形式\n\t\t- TCP是面向字节流的，首部开销20-60字节\n\t\t- UDP是面向报文的，首部开销8字节\n（5）广播、多播\n\t\t- TCP只支持点对点通信\n\t\t- UDP支持一对一、一对多、多对一、多对多\n\t\t\nhttps://javaguide.cn/cs-basics/network/other-network-questions2.html#tcp-与-udp-的区别-重要\n```\n\n### 什么时候选择 TCP，什么时候选 UDP?\n\n```\n（1）TCP用于对传输准确性要求特别高的场景，如文件传输、发送和接收邮件、远程登录等\n（2）UDP一般用于即时通信，比如语音、视频、直播，对传输数据的准确性要求不是特别高\n```\n\n###  HTTP 基于 TCP 还是 UDP？TODO\n\n```\nHTTP/3.0 之前是基于 TCP 协议的，而 HTTP/3.0 将弃用 TCP，改用 基于 UDP 的 QUIC 协议 。\n\nhttps://javaguide.cn/cs-basics/network/other-network-questions2.html#什么时候选择-tcp-什么时候选-udp\n```\n\n### 使用 TCP 的协议有哪些?使用 UDP 的协议有哪些?\n\n```\ntcp:\n（1）HTTP：超文本传输协议\n（2）https\n（3）ftp\n（4）SMTP\n（5）ssh\n\nudp\n（1）dhcp\n（2）dns\n```\n\n## 三次握手 & 四次挥手\n\nhttps://javaguide.cn/cs-basics/network/tcp-connection-and-disconnection.html\n\nhttps://xiaolincoding.com/network/3_tcp/tcp_interview.html#tcp-三次握手过程是怎样的\n\n### TCP 三次握手\n\n#### 三次握手流程 [x]\n\n <img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/07/28/201503169054650316905465032715kjBPy-tcp-shakes-hands-three-times.png\" alt=\"TCP 三次握手图解\" style=\"zoom:50%;\" />\n\n```\n（1）一次握手：客户端发送带有SYN（seq=x）标志的数据包->服务端，然后客户端进入SYN_SEND状态，等待服务器确认；\n（2）二次握手：服务端发送带有SYN+ACK(seq=y, ack=x+1)标志的数据包->客户端，然后服务端进入SYN_RECV状态\n（3）三次握手：客户端发送带有ACK（seq=y+1）标志的数据包->服务端，然后客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。\n\nSYN+ACK报文指的是SYN和ACK字段置为1\nseq=y表示序列号为y\nack=x+1表示确认应答号为x+1\n```\n\n#### 为什么要三次握手？不是两次、四次？\n\n```\n最基本的原因：三次握手的目的是为了建立可靠的通信信道，让双方确认确认自己与对方的发送和接收都是正常的。\n（1）第一次握手：client什么也不能确认；server确认了自己接收正常，对方发送正常\n（2）第二次握手：client确认自己发送和接收正常，对方发送接收正常；server不能确认自己发送是否正常、对方接收是否正常\n（3）第三次握手：让server确认自己发送和接收正常，对方发送和接收正常\n\n分析三次握手的原因：\n（1）避免历史连接，浪费资源（主要原因）\n（2）三次握手才可以同步双方的初始序列号\n```\n\n避免历史连接，浪费资源\n\n```\n三次握手如何阻止历史连接：\n（1）先发送一个连接请求（seq=90）阻塞在网络中，超时后发送新的连接请求（seq=100）\n（2）「旧的SYN报文」比「新的SYN」报文到达服务端。此时服务器就会回复一个SYN+ACK报文（ack=91）\n（3）客户端收到后发现期望的ack是100+1，于是就会回复一个RST报文终止连接\n（4）客户端收到后序新的SYN报文后正常完成三次握手\n\n两次握手的问题：\n（1）收到旧的SYN报文后，就建立连接，回复一个ack=91\n（2）客户端收到消息后发现不是自己期望的确认号，就回复一个RST报文终止连接。但是服务端已经初始化连接了，就会白白浪费资源\n（3）收到新的SYN则正常建立连接\n```\n\n同步双方的初始序列号\n\n```\n序列号的作用：\n（1）接收方可以去重\n（2）排序\n（3）告诉发送方哪些已经被接收\n\n两次握手的问题：\n只能保证发送方的初始序列号被服务端接收\n\n四次握手：\n可以保证双方同步初始序列号，但是第二第三步可以合并优化\n```\n\n#### 第 2 次握手传回了 ACK，为什么还要传回 SYN？\n\n```\n（1）回传ACK，是为了告诉客户端，接收到的信息就是客户端发送的信号，表明客户端到服务端的通信是正常的。\n（2）回传SYN是为了建立并确认服务端到客户端的通信。\n```\n\n#### 第一次握手丢失了，会发生什么？[x]\n\n```\n第一次握手，客户端发送一个SYN报文，然后进入SYN_SEND状态\n如果丢失，一直收不到服务端的SYN+ACK（第二次握手），就会触发「超时重传」机制，重传SYN报文，重传的SYN报文序列号都是一样的。\n每次超时的时间都是上一次的2倍，超过「最大重传次数」后，如果还是没有回应，就会断开TCP连接，不再发生SYN报文\n```\n\n#### 第二次握手丢失了，会发生什么？\n\n```\n（1）第二次握手是什么？\n（2）第二次握手的ACK是对第一次握手的确认，由于第二次丢失后，客户端迟迟收不到，就会认为自己发送的SYN丢失，客户端就会触发超时重传机制，重传SYN报文\n（3）第二次握手的SYN需要客户端回复ACK确认，由于第二次丢失，客户端收不到也就不会回传，所以服务端会触发超时重传机制，重传SYN-ACK报文\n（4）超过最大重传次数后就不再发送，断开连接\n```\n\n#### 第三次握手丢失了，会发生什么？\n\n```\n（1）什么次第三次握手\n（2）第三次丢失，服务端迟迟收不到ACK报文，就会触发超时重传机制，重发SYN-ACK报文\n（3）超过最大重传次数后就不再发送，断开连接\n```\n\n#### 为什么每次建立 TCP 连接时，初始化的序列号都要求不一样呢？\n\n```\n（1）为了防止历史报文被下一个相同四元组的连接接收（主要方面）；\n假设客户端和服务端的初始序列号都为0\n- 建立连接后，客户端发送第一个报文被网络阻塞，随后进行超时重传。此时服务器宕机重启了，连接已经断开，所以服务器收到重传的报文后回复一个RST报文\n- 接着，客户端又与服务器建立与上一个连接相同四元组的连接\n- 新连接建立后，被阻塞的数据包刚好到达服务器，此时的序列号刚好在接收窗口内，就会被正常接收，造成数据错乱\n\n（2）为了安全性，防止黑客伪造的相同序列号的 TCP 报文被对方接收；\n```\n\n\n\n\n\n### TCP四次挥手\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/03/16164516910506051691050605249Z7due6-format,png-20230309230614791.png\" alt=\"客户端主动关闭连接 —— TCP 四次挥手\" style=\"zoom:50%;\" />\n\n```\n（1）第一次挥手：客户端发送一个FIN（seq=x）标志的数据包到服务器，用来关闭客户端到服务器的数据传输。然后客户端进入FIN-WAIT-1状态\n（2）第二次挥手：服务端接收后发送一个ACK（ACK=x+1）标志的数据包到客户端。服务器进入CLOSE-WAIT状态，客户端收到后进入FIN-WAIT-2状态\n（3）第三次挥手：服务端发送一个FIN（seq=y）标志的数据包到客户端，请求关闭连接，然后服务端进入LAST-ACK状态。\n（4）第四次挥手：客户端发送ACK（ACK=y+1）标志的数据包到服务器，然后客户端进入TIME-WAIT状态。服务器接收到后进入CLOSE状态。\n如果客户端等待2MSL后依旧没有收到回复，证明服务端已经正常关闭，随后客户端也可以关闭连接。\n\nMSL（Maximum Segment Lifetime）是指TCP数据报文在网络中的最长生存时间，通常为2分钟\n```\n\n#### 为什么要四次挥手？[x]\n\n```\nTCP连接是全双工的，客户端和服务器可以同时发送和接收数据。所以在关闭TCP连接时，一般需要四次挥手来确保双方都能完成数据的传输后在关闭连接\n\n第一次挥手，只能表示客户端不在发送数据但还可以接受数据\n服务端在收到FIN报文后，回复一个ACK应答报文，表示已经接受到FIN报文，这是第二次挥手。\n但是服务端可能还存在未发送完的数据，所以需要等待发送完后再发送FIN报文，这是第三次挥手\n客户端收到FIN报文后，还需要回复一个ACK报文表示收到，这是第四次挥手\n\n【但是在特定情况下，四次挥手是可以变成三次挥手的】\n```\n\n#### 为什么不能把服务器发送的 ACK 和 FIN 合并起来，变成三次挥手？\n\n```\n因为服务器收到客户端断开连接的请求时，可能还有一些数据没有发完，这时先回复 ACK，表示接收到了断开连接的请求。等到数据发完之后再发 FIN，断开服务器到客户端的数据传送。\n\n【但是在特定情况下，四次挥手是可以变成三次挥手的】\n```\n\n#### TCP 四次挥手，可以变成三次吗？[x]\n\n```\n关闭过程中，服务端「没有数据要发送」且「开启了TCP延迟确认机制」，那么第二和第三次就会合并传输，这样就会出现三次握手。\n\nhttps://xiaolincoding.com/network/3_tcp/tcp_three_fin.html#什么情况会出现三次挥手\n```\n\n#### 什么是TCP延迟确认机制？[x]\n\n```\n当发送没有携带数据的ACK时，它的网络效率是很低的，因为它也有40个字节的IP头和TCP头，但没有携带数据报文。\n为了解决ACK传输效率低的问题，所以就衍生出了「TCP延迟确认」\n\nTCP延迟确认策略：\n- 当有响应数据要发送时，ACK会随着响应数据一起立刻发送给对方\n- 当没有响应数据发送时，ACK会延迟一段时间，以等待是否有响应数据可以一起发送\n- 如果在延迟等待发送ACK期间，对方的第二个数据报文又到达了，这时会立刻发送ACK\n```\n\n#### 第一次挥手丢失了，会发生什么？\n\n```\n（1）第一次挥手是什么？\n（2）会触发超时重传机制重发，每次超时时间是上次的两倍。\n（3）如果超过最大重传次数，再等待一段时间仍未收到，则直接进入close状态\n```\n\n#### 第二次挥手丢失了，会发生什么？\n\n```\n（1）第二次挥手是什么？\n（2）ACK是不会触发超时重传的，所以客户端没有收到 ACK 确认，会重新发送 FIN 报文。\n（3）如果超过最大重传次数，再等待一段时间仍未收到，就会断开连接\n```\n\n#### 第三次挥手丢失了，会发生什么？\n\n```\n（1）第三次挥手是什么？\n（2）第三次丢失，则服务端收不到ACK报文，就会超时重传FIN报文\n（3）如果超过最大重传次数，再等待一段时间仍未收到，服务端就会断开连接\n（4）客户端是通过close函数来关闭连接的，处于FIN_WAIT_2状态是有时常限制的，超过指定时间未收到第三次握手，则客户端会断开连接\n```\n\n#### 第四次挥手丢失了，会发生什么？\n\n```\n（1）第四次挥手是什么？\n（2）服务端会重传FIN，超过最大重传次数，再等待一段时间后仍未收到ACK，服务端就会断开连接\n（3）客户端在收到第三次挥手时，进入TIME_WAIT状态，开启时常2MSL的定时器。如果中途收到FIN，则重置定时器。超时2MSL后客户端就会断开连接\n```\n\n####  为什么第四次挥手客户端需要等待 2*MSL（报文段最长寿命）时间后才进入 CLOSED 状态？[x]\n\n```\n【回答下面为什么要有timewait】\nMSL是报文最大生存时间。\n\n第四次挥手时，客户端发送的ACK有可能丢失，如果服务端因为某些原因没有收到ACK，服务端就会重发FIN。\n如果客户端在2MSL的事件内收到FIN，就会重新发送ACK并再次等待2MSL，防止server没有收到ack而不断重发fin\n\nMSL(Maximum Segment Lifetime) : 一个片段在网络中最大的存活时间，2MSL 就是一个发送和一个回复所需的最大时间。如果直到 2MSL，Client 都没有再次收到 FIN，那么 Client 推断 ACK 已经被成功接收，则结束 TCP 连接。\n```\n\n\n\n### TIME_WAIT\n\n#### 为什么需要 TIME_WAIT 状态？[x]\n\n```\n主动发起关闭连接的一方才会有TIME_WAIT状态\n\n主要原因：\n（1）防止历史连接中的数据，被后面相同四元组的连接错误的接收\n（2）保证「被动关闭连接」的一方，能被正确关闭\n\n四元组：原地址、源端口、目标地址、目标端口\n```\n\n防止历史连接中的数据，被后面相同四元组的连接错误的接收\n\n```\n（1）序列号和初始序列号并不是无限递增的，会发生会绕为初值的情况，所以无法根据序列号来判断新老数据。\n（2）假如在数据传输过程中有数据阻塞在网络中，此时通过四次挥手，不等待2msl就结束连接。\n（3）接着，服务端又以相同的四元组重建打开的新的连接，而前面被延迟的报文到达客户端，恰好又在接收窗口范围，那么客户端就会接收，就会产生数据错乱蹬严重问题。\n```\n\n保证「被动关闭连接」的一方，能被正确关闭\n\n```\n第四次握手的ACK丢失，服务端会重传FIN，假如没有TIME_WAIT状态，那么服务端就无法收到ACK，无法正常关闭连接\n```\n\n#### TIME_WAIT 过短有什么危害？\n\n```\n同【为什么需要 TIME_WAIT 状态？】\n```\n\n#### TIME_WAIT 过多有什么危害？[x]\n\n```\n（1）客户端TIME_WAIT过多：占满了所有端口资源，就无法对【目标ip + 目标端口】一样的服务器发起连接，但可以想其他服务器发起连接（端口是可以复用的）\n（2）服务端TIME_WAIT过多：并不会导致端口资源受限，因为服务端只监听一个端口，而且由于一个四元组唯一确定一个 TCP 连接，因此理论上服务端可以建立很多连接，但是 TCP 连接过多，会占用系统资源，比如文件描述符、内存资源、CPU 资源、线程资源等\n\n```\n\n#### 服务器出现大量 TIME_WAIT 状态的原因有哪些？[x]\n\n```\n首先要知道 TIME_WAIT 状态是「主动关闭连接方才会出现的状态」，所以如果服务器出现大量的 TIME_WAIT 状态的 TCP 连接，就是说明服务器主动断开了很多 TCP 连接。\n\n什么场景下服务端会主动断开连接呢？\n第一个场景：HTTP 没有使用长连接\n第二个场景：HTTP 长连接超时\n第三个场景：HTTP 长连接的请求数量达到上限\n```\n\n\n\n#### 如果已经建立了连接，但是客户端突然出现故障了怎么办？[x]\n\n```\n发生这种情况的时候，如果服务端一直不会发送数据给客户端，那么服务端是永远无法感知到客户端宕机这个事件的，也就是服务端的 TCP 连接将一直处于 ESTABLISH 状态，占用着系统资源。\n\n为了避免这种情况，TCP 搞了个「保活机制」。这个机制的原理是这样的：\n定义一个时间段，在这个时间段内，如果没有任何连接相关的活动，TCP 保活机制会开始作用，每隔一个时间间隔，服务端发送一个探测报文，该探测报文包含的数据非常少，如果连续几个探测报文都没有得到响应，则认为当前的 TCP 连接已经死亡，系统内核将错误信息通知给上层应用程序。\n```\n\n#### 如果已经建立了连接，但是服务端的进程崩溃会发生什么？[x]\n\n```\nTCP 的连接信息是由内核维护的，所以当服务端的进程崩溃后，内核需要回收该进程的所有 TCP 连接资源，于是内核会发送第一次挥手 FIN 报文，后续的挥手过程也都是在内核完成，并不需要进程的参与，所以即使服务端的进程退出了，还是能与客户端完成 TCP 四次挥手的过程。\n```\n\n\n\n#### 保活计时器的作用\n\n```\n同【如果已经建立了连接，但是客户端突然出现故障了怎么办？】\n\n如果tcp三次握手后，客户端出现故障。服务器一直无法接收到数据，也无法知道客户端故障了，就会浪费资源一直等待。\n\n服务器每收到一次客户的数据，就重新设置保活计时器，时间的设置通常是两 个小时。若两个小时都没有收到客户端的数据，服务端就发送一个探测报文段，以后则每隔 75 秒钟发送一次。若连续发送 10 个探测报文段后仍然无客户端的响应，服务端就认为客户端出了故障，接着就关闭这个连接。\n```\n\n\n\n\n\n\n\n##  TCP 如何保证传输的可靠性？\n\n```\n（1）连接控制：建立连接时通过三次握手建立可靠的传输信道；关闭连接时四次挥手，确保双方完成数据传输和连接关闭。\n（2）序列号：TCP将数据分割成小的数据块进行传输，每个数据包中包含序列号，接收方可以根据序列号进行排序以及去重。\n（3）确认和超时重传：TCP使用确认机制来保证数据的可靠传输。发送方在发送数据后会等待接收方的确认，如果一段时间内没有收到确认，则认为数据丢失，进行超时重传。\n（4）流量控制和拥塞控制：TCP通过流量控制和拥塞控制等机制控制数据的发送速率，避免数据丢失和网络拥塞。\n（5）校验和：TCP每个数据包的头部会包含一个校验和，接收方在接收后会再次计算校验和，如果两者不匹配，则说明数据在传输过程中发生了错误，接收方会要求发送发重新发送数据。\n```\n\n## 重传机制\n\n### 超时重传\n\n##### 是什么？\n\n```\n在发送数据时，设定一个定时器，当超过指定时间后，没有收到对方的ACK确认应答报文，就会重发该数据\n\n+ 「什么时候会超时重传？」\n```\n\n##### 什么情况下会超时重传\n\n```\n（1）数据包丢失\n（2）确认应答丢失\n\n+ 【需要设置合理的超时重传时间】\n```\n\n##### 超时时间应该设置为多少？\n\n```\nRTT：数据发送时刻 到 接收到确认的时刻 的差值，即包的往返时间\n超时重传时间 RTO 的值应该略大于报文往返 RTT 的值，是一个动态变化的值。\n\n+ 「过长/过短的问题？」\n```\n\n##### 超时重传时间RT0，较长/较短会有什么问题？\n\n```\n（1）RT0较长：重发慢，丢包很丢才重发，没有效率，性能差\n（2）RT0较小：会导致并没有丢就重发，于是重发的就很快，会增加网络的拥塞，导致更多的超时，更多的超时就会导致更多的重发\n```\n\n### 快速重传\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/07/30/114645169068880516906888051215oteeh-10.jpg\" alt=\"快速重传机制\" style=\"zoom:50%;\" />\n\n```\n连续收到三个相同的ack就重传\n\n快速重传解决了超时时间的问题，但是引入了另一个问题：就是重传时重传一个，还是重传所有\n（1）重传一个：重传效率低。假如发送seq1-seq6，seq2和seq3都丢失了，收到三个ack2时重传seq2，然后需要再收到三个ack3才会重传seq3\n（2）重传所有：传输过的数据需要再重传，浪费资源。发送seq1-seq6，seq2和seq3丢失，seq4-seq6都成功，如果收到三个ack2，重传seq2和后面所有的报文，那么之前传输成功的seq4-seq6就白浪费资源。\n```\n\n### 选择重传 SACK [x]\n\n```\n需要再头部【选项】字段里添加SACK，它可以将已经接收到的数据的信息发送给发送发，这样发送方就可以知道哪些数据收到了，哪些数据没收到，通过这些信息，就可以只重传丢失的数据。\n```\n\n### 冗余ACK重传\n\n```\nhttps://www.xiaolincoding.com/network/3_tcp/tcp_feature.html#duplicate-sack\n```\n\n\n\n##  TCP 如何实现流量控制？[x]\n\n```\n主要是通过滑动窗口来控制发送方的发送速率，确保接收方来得及接收。\n\n发送方和接收方在建立连接时会协商窗口大小（Window Size），即允许接收方缓冲的数据量。这个窗口大小是根据接收方的接收能力和发送方的发送能力进行调整的。\n接收方收到数据后，会发送确认（ACK）给发送方，并通知发送方当前的接收窗口大小，表示接收方的缓冲区还有多少可用空间。发送方根据接收方的窗口大小调整发送窗口的大小。\n如果发送窗口大小为0，表示接收方的缓冲区已满，发送方会暂停发送数据，等待接收方释放缓冲区空间。\n\n```\n\n## 为什么要流量控制？\n\n```\n（1）防止数据丢失：在双方通信时，发送发的速率和接收方的速率不一定相等。\n如果发送方发送的太快，会导致接收方处理不过来，从而造成数据丢失\n（2）防止网络拥塞：如果发送方过度发送数据，可能会造成网络拥塞，通过控制发送方的速率，来避免这种情况。让发送方和 接收方处于一种动态平衡\n```\n\n## 滑动窗口\n\n#### 窗口大小由哪一方决定？[x]\n\n```\n通常窗口的大小由接收方的窗口大小来决定。发送方发送的数据大小不能超过接收方的窗口大小，否则接收方就无法正常接收到数据。\n\nTCP头里有一个字段叫window，也就是窗口大小。\n这个字段是接收端告诉发送端自己还有多少缓冲区可以接收数据。于是发送方就根据这个接收端的处理能力来发送数据，而不会导致接收端处理不过来。\n```\n\n### 发送窗口 [x]\n\n```\n包含四个部分\n（1）发送已确认。已发送并收到 ACK确认的数据\n（2）发送未确认。已发送但未收到 ACK确认的数据\n（3）可发送。未发送但总大小在接收方处理范围内（接收方还有空间）\n（4）不可发送。未发送但总大小超过接收方处理范围（接收方没有空间）\n```\n\n### 接收窗口\n\n```\n（1）接收已确认\n（2）可接收\n（3）不可接收\n```\n\n### 接收窗口和发送窗口的大小是相等的吗？\n\n```\n并不是完全相等，接收窗口的大小是约等于发送窗口的大小的。\n\n滑动窗口大小是动态变化的。会根据接收方的读取数据的速度进行调整，通过TCP报文告诉发送方，这个传输过程是存在延迟的，所以接收窗口和发送窗口是约等于的关系。\n\n```\n\n### 窗口关闭\n\n```\n指发送方的窗口为0，发送方不能在给接收方发送数据\n```\n\n### 窗口关闭潜在的危险\n\n```\n接收方处理完数据后，向发送发通告窗口大小，假如ACK报文丢失，那么发送方窗口将一直为0，无法发送数据，双方进入死锁\n```\n\n### TCP 是如何解决窗口关闭时，潜在的死锁现象呢？[x]\n\n```\nTCP为每个连接设定一个持续计时器，只要收到零窗口通知，就会启动这个定时器。\n如果定时器超时，就会发送窗口探测报文，接收方会在确认报文中给出接收窗口的大小。\n如果为0就重启计时器\n如果 3 次过后接收窗口还是 0 的话，有的 TCP 实现就会发 RST 报文来中断连接。\n```\n\n\n\n## 拥塞控制\n\n### 是什么？\n\n```\n是为了保护整个网络，控制整个网络的数据流量，避免网络拥塞。主要是由发送方根据网络状态来调整发送速率，以控制整个网络中的数据流量。\n```\n\n### 为什么要有拥塞控制呀，不是有流量控制了吗？\n\n```\n拥塞控制和流量控制都涉及调整数据传输的速率，但它们的目标和作用是不同的。\n\n流量控制：是为了保护接收方，控制发送方的发送速率，防止发送方发送过多数据，接收方来不及处理而丢失数据。通常由接收方来控制，通过确认消息来告诉发送方自己有多少缓冲区可以接收数据，发送方由此动态调整窗口大小\n\n拥塞控制：是为了保护整个网络，控制整个网络的数据流量，避免网络拥塞。主要是由发送方根据网络状态来调整发送速率，以控制整个网络中的数据流量。\n```\n\n### 什么是拥塞窗口？和发送窗口有什么关系呢？[x]\n\n```\n拥塞窗口是发送方维护的一个状态变量，是根据网络的拥塞程度动态变化的。\n发送方窗口大小 约等于 接收窗口\n有了拥塞窗口，发送方的发送窗口大小就是【接收】 和 【拥塞窗口】的最小值\n\n拥塞窗口 cwnd 变化的规则：\n- 只要网络中没有出现拥塞，cwnd 就会增大；\n- 但网络中出现了拥塞，cwnd 就减少；\n```\n\n### 那么怎么知道当前网络是否出现了拥塞呢？\n\n```\n发送方在规定时间内没有收到ACK应答报文，发生了超时重传，就认为网络出现了拥塞\n```\n\n### 拥塞控制有哪些控制算法？[x]\n\n```\n慢启动\n拥塞避免\n拥塞发生\n快速恢复\n```\n\n### 慢启动\n\n```\nTCP在刚建立完成后，首先有个慢启动的过程，慢启动就是当发送方每收到一个ACK，拥塞窗口cwnd的大小就会+1（翻倍，1 2 4 8...）。\n\ncwnd = 慢启动门限ssthresh，慢启动 或者 拥塞避免\n当cwnd > 慢启动门限ssthresh（（slow start threshold））时，就会使用「拥塞避免算法」\n\n指数增长\n```\n\n### 拥塞避免算法\n\n```\n拥塞窗口超过慢启动门限，就会进入拥塞避免算法。\n他的规则是：每经过一个往返时间RTT就把发送方的拥塞窗口cwnd加1\n随着持续增长，会导致网络拥塞，出现丢包触发重传机制，进入【拥塞发生】阶段\n\n线性增加\n```\n\n### 拥塞发生\n\n```\n网络拥塞时的重传机制有两种：\n（1）超时重传\n（2）快速重传\n```\n\n#### 超时重传\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/01/112348169086022816908602289542JKWSB-29.jpg\" alt=\"拥塞发送 —— 超时重传\" style=\"zoom:50%;\" />\n\n```\n发生超时重传时，\n慢启动阈值ssthresh = cwnd/2\ncwnd重制为初始值\n进入慢启动\n\n\n问题：\n偶然的丢包，网络不一定发生拥塞，这时慢启动没有必要。\n```\n\n#### 快速重传\n\n```\n收到三个相同的ACK就会触发快速重传\n\n拥塞窗口大小cwnd = cwnd/2\n慢启动阈值ssthresh = cwnd\n进入快速恢复算法\n```\n\n教材上的图：[参考](https://fasionchan.com/network/tcp/congestion-control/)\n\n![img](https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/27/17142816931276681693127668404G0Ac21-14133816908704181690870418577PSZWX9-8690627fbee083b1be2cb88eee249f36ee2a9b21.png)\n\n\n\n### 快速恢复\n\n小林coding图：（12直接变成了12/2 + 3，跟教材上有区别）\n\n<img src=\"https://cdn.jsdelivr.net/gh/iamk123/typora@main/uPic/2023/08/01/11291116908605511690860551213fDbe8a-%E6%8B%A5%E5%A1%9E%E5%8F%91%E7%94%9F-%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0.drawio.png\" alt=\"快速重传和快速恢复\" style=\"zoom:50%;\" />\n\n```\n快速恢复和快速重传一般同时使用。快速恢复算法任务，还有三个重复ACK收到，说明网络没那么糟糕，所以没必要像超时重传那样直接将拥塞窗口置为初始值\n\n进入快速恢复之前，\ncwnd和sshthresh已经被更新\n\n然后真正的快速恢复算法如下：\n- cwnd = sshthresh + 3\n- 重传重复的那几个ACK\n- 如果再收到重复的ACK，那么cwnd = cwnd + 1\n- 如果收到新数据的ACK后，cwnd = sshthresh。因为收到新数据的ACK，表明恢复过程已经结束，可以再次进入拥塞避免的算法了\n```\n\n\n\n\n\n","timestamp":1693789897560}]