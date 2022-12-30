# Vue的干货

### 1.1.路由的出门与进门

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210312144446686.png)

在路由中，

```纯文本
activated() {
  console.log("在家");
},
deactivated() {
  console.log("出门");
},
```

### 1.2.数据对象封装思想

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/20210114151722161.png)

### 1.3.生命周期的方法

created 方法，常用于请求网络数据。

### 1.4.过滤器filters的使用

```javascript
//结构  | 将前面的作为后面的参数传入
{{shop.sells | sellCountFilter}}
//scripter>filters
filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1)+'万'
    }
}
```

### 1.5.常用结构的说明

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103845749.png)

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103846954.png)

# 二、VueCli3

### 一）、开始

1.  在有nodeJs下，如果我们只想使用VueCli3，我们只需用npm install -g @vue/cli命令即可，如果我们还想使用VueCli2（包含VueCli3）,要用npm install -g @vue/cli-init

2.  创建项目
    创建cli2：vue init webpack 项目名
    创建cli3:   vue create 项目名：

    (预设项目设置保存在)

3.  基本结构：
    VueCli3基本目录

    （vue ui 界面管理配置）

    （自定义配置）
    在当前项目下创建vue.config.js文件。将想要添加的配置写到这里面，它会将你添加的配置和原来的配置进行一个合并

    （项目创建时，我们创建的目录介绍）

### 二）、TabBar 的开发及使用

1.  安装vue-router 使用命令：npm install vue-router --save

2.  配置router: 在src下创建router目录，在该目录下创建一个index.js

    ```javascript
    //1、引入
    import Vue from 'vue'
    import VueRouter from "vue-router";


    //2、安装插件
    Vue.use(VueRouter)
    //3、注册路由
    const routes =[

    ]
    //2、创建router
    const router = new VueRouter({
      routes,
      mode: 'history' 
    })

    export default router
    ```

3.  挂载路由：在main.js下 ：

    ```javascript
    /*二、挂载路由*/

    import Vue from 'vue'
    import App from './App.vue'
    import router from "./router"; /*1、导入路由*/
    Vue.config.productionTip = false

    new Vue({
      render: h => h(App),
      router  /*2、挂载路由*/
    }).$mount('#app')

    ```

4.  开发TabBar组件 Components>common>tabbar>TabBar.vue：
    思想：TabBar组件实际上就是一个存放TabBarItem.vue组件的容器。

    ```javascript
    <template>
      <div id="tab-bar">
        <slot></slot>
      </div>
    </template>
    <script>

      export default {
        name: "TabBar"
      }
    </script>
    <style>
      #tab-bar {
        display: flex;
        background: #f6f6f6;
        position: fixed;
        left: 0px;
        bottom: 0px;
        right: 0px;
        box-shadow: 0px -1px 1px rgba(100,100,100,0.1);
      }
    </style>

    ```

5.  开发TabBar组件 Components>common>tabbar>TabBarItem.vue：
    思想：TabBarItem 组件,它们可以看作是一个按钮，当点击时，会切换为指定（自身）路由，同时我们还可以通过 this.\$route.path.indexOf(this.path) != -1 来判断自身现在是否处于活跃，来决定显示哪个图标与文字样式。

    ```javascript
    <template>
      <div class="tab-bar-item" @click="itemClick()">
        <div v-if="! isActive"><slot name="item-icon"></slot></div>
        <div v-else="isActive"><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
    </template>
    <script>
      export default {
        name: "TabBarItem",
        data(){
          return{

          }
        },
        props: {
          path:String, //自身path
          activeColor: {  //图标显示的颜色
            type:String,
            default: 'red'
          }
        },
        computed: {//计算属性
          isActive(){
            //图标的显示是根据全局Path与自身path是否存在包含关系来决定的
            return this.$route.path.indexOf(this.path) != -1
          },
          activeStyle(){
            //如果显示的是当前，isActive =true时 给文字加入样式
            return this.isActive?{color: this.activeColor}:{}
          }
        },
        methods: {
          itemClick(){
            //当点击TabBarItem时，改变路由
            this.$router.replace(this.path)
          }
        }

      }
    </script>
    <style>
      .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
      }
      .tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
      }
    </style>

    ```

6.  使用组件（示例） src>components>content>mainTabbar>MainTabBar.vue:

    ```javascript


    <template>
      <tab-bar>
        <tab-bar-item path="/home">
          <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category">
          <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="/cart">
          <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile">
          <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>
    </template>

    <script>
      import TabBar from 'components/common/tabbar/TabBar'
      import TabBarItem from 'components/common/tabbar/TabBarItem'

      export default {
        name: "MainTabBar",
        components: {
          TabBar,
          TabBarItem
        }
      }
    </script>

    <style scoped>

    </style>

    ```

7.  配置路由 src>router>index.js

    ```javascript
    //1、引入
    import Vue from 'vue'
    import VueRouter from "vue-router";

    //1、懒加载引入
    const Home = () => import('views/home/Home')
    const Cart = () => import('views/cart/Cart')
    const Category = () => import('views/category/Category')
    const Profile = () => import('views/profile/Profile')


    //2、安装插件
    Vue.use(VueRouter)
    //3、注册路由
    const routes =[
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/profile',
        component: Profile
      }
    ]
    //2、创建router
    const router = new VueRouter({
      routes,
      mode: 'history'
    })

    export default router
    ```

8.  App.vue

    ```javascript
    <template>
      <div id="app">
        <router-view />
        <main-tab-bar />

      </div>
    </template>

    <script>
    import MainTabBar from 'components/content/mainTabbar/MainTabBar'

    export default {
      name: 'App',
      components: {
        MainTabBar
      }
    }
    </script>

    <style>

    </style>

    ```

### 三）、TabControl.vue组件的开发

1.  基本逻辑：组件通过props获取传入的Array，进行遍历显示且绑定点击事件，点击时会将对应的索引声明出来(在自身vue改变样式)，并向引用vue页面emit 声明这个索引(作对应的展示)

2.

<!---->

    ```javascript

<!---->

    <template>
      <div class="tab-control">
        <!-- 基本逻辑：点击时会将对应的索引声明出来(在自身vue改变样式)，并向引用vue页面emit 声明这个索引(作对应的展示)   -->
        <div v-for="(item,index) in titles" :key="item" @click="tabchang(index)"
             class="tab-control-item" :class="{active: (index == currentIndex)}">
          <span>{{item}}</span>
        </div>
      </div>
    </template>
    <script>
      export default {
        name: "TabControl",
        props: {
          titles: {
            type: Array,
            default() {
              return []
            }
          }
        },
        data() {
          return {
            currentIndex: 0
          }
        },
        methods: {
          tabchang(index) {
            this.currentIndex=index
            this.$emit("tabClick",index);
          }
        }

      }
    </script>
    <style scoped>
      /*父样式*/
      .tab-control {
        display: flex;
        text-align: center;

        height: 44px;
        line-height: 44px;
        font-size: 15px;
        background-color: #ffffff;
        position: sticky;
        top: 44px;

        z-index: 1000;
      }
      /*子样式*/
      .tab-control-item {
        flex: 1;
      }
      .tab-control-item span {
        padding: 5px;
      }

      .active {
        color: var(--color-high-text);
      }
      .active span {
        border-bottom: 3px solid var(--color-high-text);

      }

    </style>

    ```

3\.  使用：
导入-添加到components-使用 =>
信息输入：:titles="\['流行','新款','精选']"
信息输出：传播组件内部的点击事件（包含索引）

    ```纯文本
    <tab-control_zjazn :titles="['流行','新款','精选']" @clickIndex="clickIndex"/>
    ```

4\.  功能1： CabControl的悬停

    HomeSwiper组件将图片加载完成的事件改送出去：

    Home.vue获取要悬停的组件offsetTop值进行赋值保存:
    当滑动触发滚动事件时，进行对比，得到的boolean值使用在tabControl的v-show中
    bug 提醒：因为悬停功能的实现要用到两个组件实例，他们内部的数据是不同的，也就是说，一方改变会触发到Home父组件中，但父组件并不知道是哪个组件发出的，我们就需要进行数据的同步了；

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103845322.png)

    ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210312134718629.png)

    ```javascript
    swiperImageLoad() {
          //当图片加载完成后，触发获取要吸顶的元素距父元素的top值给tabOffsetTop
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    ```

    ```javascript
    scroll(scrollPar) {
          //已获取元素距父元素top的值，第次滑动进行比较，如果滑动的大小大于此值，则显示
          this.isShowTabControl = (-scrollPar.y) > this.tabOffsetTop
    }
    ```

    ```纯文本
    //关联更新
    this.$refs.tabControl1.currentIndex = index
    this.$refs.tabControl2.currentIndex = index
    ```

### 四）、多列显示模板 GoodsList.vue +GoodsListItem.vue的开发

```纯文本
![image-20210309173945842](https://raw.githubusercontent.com/18476305640/typora/master/img/image-20210309173945842.png)
```

1.  GoodsList.vue :

    ```javascript
    <template>
      <!-- 输入：某种类型的商品数组，如最新，流行。 -->
      <!-- 向内输出：在子组件上进行遍历、分发。让子组件来显示具体内容 -->
      <div class="goods">
        <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.showId" />
      </div>
    </template>

    <script>
    import GoodsListItem from "@/components/content/goods/GoodsListItem";
    export default {
      name: "GoodsList",
      components: {
        GoodsListItem
      },
      props: {
        goods: {
          type:Array,
          default() {
            return []
          }
        }
      }
    }
    </script>
    /*重要排列样式*/ 
    <style scoped>
      .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        padding: 2px;
      }
    </style>

    ```

2.  GoodsListItem.vue

    ```javascript
    <template>
      <div class="goods-item">
      <!--  输入：分发到的对象，遍历显示  -->
        <img :src="goodsItem.show.img" @load="imageLoad" @click="toGoodPage(goodsItem)"/>
        <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
        </div>
      </div>
    </template>

    <script>
    export default {
      name: "GoodsListItem",
      props: {
        goodsItem: {
          type:Object,
          default() {
            return {}
          }
        }
      },
      methods: {
        imageLoad() {

        },
        toGoodPage(good) {
          window.open(good.link,"_self")
        }
      }
    }

    </script>

    <style scoped>
      .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
      }

      .goods-item img {
        width: 100%;
        border-radius: 5px;
      }

      .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
      }

      .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }

      .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
      }

      .goods-info .collect {
        position: relative;
      }

      .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      }
    </style>

    ```

    *   数据处理逻辑：

        *   存储结构：

            ```javascript
            goods: {
                    'pop': {page: 0, list: []},
                    'news': {page: 0, list: []},
                    'sell': {page: 0, list: []}
            },
            currentGoodsType:'pop'
            ```

        *   数据的追加

            ```javascript
            this.goods[type].list.push(...res.data.list) //追加到list数组中
            ```

### 五、better-scroll组件的封装，Scroll组件的开发与使用

better-scroll组件的封装思想：首先需要引入better-scroll  命令：npm install better-scroll  --save

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103844956.png)

我们想在开发完后可以直接套在要滑动的n个元素外，但”wrapper“ =>滑板内只能有一个元素，所以在封装时，我们需要在wrapper内套一个.content的元素了。在.content内写一个插槽slot,代表我们套在contents的元素。我们希望使用我们组件的组件能给我们传入几个参数来决定是否要使用上拉加载与是否要监控滚动

props: {
probeType: {
type:Number,
default:0
},
pullUpLoad: {
type: Boolean,
default: false
}
},

参数用于且将事件发出给使用的组件：

this.scroll = new BScroll(this.\$refs.wrapper,{
probeType: this.probeType,
pullUpLoad:this.pullUpLoad,
click: true
})

```纯文本
this.scroll.on('pullingUp', () => {
    this.$emit("pullingUp")

})
this.scroll.on('scroll', SParams => {
  this.$emit('scroll',SParams);

})
```

***

better-scroll	组件更多信息：[https://www.cnblogs.com/670074760-zsx/p/6918800.html](https://www.cnblogs.com/670074760-zsx/p/6918800.html "https://www.cnblogs.com/670074760-zsx/p/6918800.html")

better-scroll	官网：[https://better-scroll.github.io/docs/zh-CN/guide/#%E6%BB%9A%E5%8A%A8%E5%8E%9F%E7%90%86](https://better-scroll.github.io/docs/zh-CN/guide/#滚动原理 "https://better-scroll.github.io/docs/zh-CN/guide/#%E6%BB%9A%E5%8A%A8%E5%8E%9F%E7%90%86")

```javascript
<template>
  <div  ref="wrapper">
    <div ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "BScroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type:Number,
      default:0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
      click: true
    })
    this.scroll.on('pullingUp', () => {
      this.$emit("pullingUp")


    })
    this.scroll.on('scroll', SParams => {
      this.$emit('scroll',SParams);

    })
  },
  methods: {
    ScrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>


</style>

```

***

使用说明：

1.  在页面中引入，然后套在要滚动的内容外

    ```javascript
          <scroll class="wrapper" ref="Scroll"
                  :probe-type="3"
                  :pull-up-load="true"
                  @pullingUp="pullingUp"
                  @scroll="scroll" >
          
               <!-- 要滚动的内容 -->

          </scroll>
    ```

2.  这时scroll组件还不能用，因为我们需要设置”滑板“ 高度大小

    ```javascript
    .wrapper {
         position: fixed;
         top: 0px;
         bottom: 49px;
         left: 0px;
         right: 0px;
    }
    ```

3.  这时我们需要传入scroll组件上props的属性，当然不传也有默认值：
    :probe-type="3"   => 1 监听事件的触发时间，2为即时触发，3为延迟到事件完毕后触发
    :pull-up-load="true"  =>是否开启 ”触底通知“  做上拉加载需要开启。
    上面分别对应：@pullingUp="pullingUp"  => 触底通知

    ```纯文本
               @scroll="scroll"   => 能接收一个参数
    ```

4.  用事件总线解决高度刷新（图片加载时，如果不通知刷新 scroll中content的高度就会出现有内容无法上拉问题）

    *   在main塔建事件总线 Vue.prototype.\$bus = new Vue()  让通知与刷新”通信“

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103845959.png)

    *   通知：

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210311151100359.png)

    *   刷新：
        引入防抖函数  :  import {debounce} from "@/common/utils"
        接收通知进行刷新：
        （”触发后设置定时器，在这时没再触发时，就重新调整，触发次数只要触发至少一次“）
        功能1：上拉加载更多功能的实现

        ```javascript
        export function debounce(func,delay) {
          let timer = null;
          return function (...args) {
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
              func.apply(this,args)
            },delay)
          }
        }

        ```

        ```javascript
        mounted() { //生命周期函数
             const refresh =debounce(this.$refs.Scroll.refresh,80)
             this.$bus.$on("itemImageLoad", () => {
                refresh()
             })
        },
        ```

        ![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210311170109202.png)

        ```javascript
        pullingUp() {
              this.getHomeGoods(this.currentGoodsType)
              setTimeout(() => {
                //告诉Scroll可再次上拉加载更多
                this.$refs.Scroll.finishPullUp() 
              },500)
        },

        ```

### 六、BackTop 回到顶部组件的 开发

```纯文本
开发思想：组件本身没什么，只起基本的显示作用，主要是功能上，如果回到顶部与何时显示隐藏。
```

```javascript
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt=""/>
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }

</style>

```

**功能1：回到顶部，BackTop组件对Scroll组件功能的实现很密切。**

在组件上添加一个点击事件，当点击时调用函数返回顶部而函数里调用Scroll中的方法作真正的返回顶部。

```纯文本
//点击
<back-top @click.native="backTop" />
....
//触发函数,用于Scroll内封装的方法。体现backTop面向Scroll开发，而不是Scroll引入的组件。
backTop() {
    this.$refs.Scroll.ScrollTo(0,0,300); 
},
```

**功能2： 按钮的显示与隐藏**

这个功能需要在Scroll 滚动的监控函数中写：

```javascript
//结构：
<back-top @click.native="backTop" v-show="isShowBackTop"/>
    
//Data
 Data() {
    return {
        isShowBackTop:false
    }
}

//method
scroll(scrollPar) {
  this.isShowBackTop = (-scrollPar.y)>1000
},
```

### 七、轮播图Swiper组件

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/image/2022/03/13/20220313103846490.png)

index.js

```javascript
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}

```

Swiper.vue

```js
<template>
    <div id="hy-swiper">
      <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <slot name="indicator">
      </slot>
      <div class="indicator">
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
	export default {
		name: "Swiper",
    props: {
      interval: {
		    type: Number,
        default: 3000
      },
      animDuration: {
		    type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
        slideCount: 0, // 元素个数
        totalWidth: 0, // swiper的宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动
      }
    },
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      setTimeout(() => {
        this.handleDom();

        // 2.开启定时器
        this.startTimer();
      }, 200)
    },
    methods: {
		  /**
       * 定时器操作
       */
      startTimer: function () {
		    this.playTimer = window.setInterval(() => {
		      this.currentIndex++;
		      this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer: function () {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent: function (currentPosition) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 校验正确的位置
       */
      checkPosition: function () {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },

      /**
       * 设置滚动的位置
       */
      setTransform: function (position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      /**
       * 操作DOM, 在DOM前后添加Slide
       */
		  handleDom: function () {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          swiperEl.appendChild(cloneFirst);
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },

      /**
       * 拖动事件的处理
       */
      touchStart: function (e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },

      touchMove: function (e) {
        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd: function (e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.5
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },

      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
	}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>

```

SwiperItem.vue

```js
<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>

```

![](https://cdn.jsdelivr.net/gh/18476305640/typora@master/img/image-20210312141122424.png)

HomeSwiper.vue

```js
<template>

  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imageLoad()">
      </a>
    </swiper-item>
  </swiper>

</template>
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';
  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        timeout:null
      }
    },
    methods: {
      imageLoad() {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.$emit('swiperImageLoad')
        }, 200)
      }
    }
  }
</script>

<style>


</style>

```

然后在页面导入HomeSwiper.vue使用

End
