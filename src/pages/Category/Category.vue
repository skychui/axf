<template>
  <div class="home">
    <HeaderYellow />
    <div class="main">
      <!-- 左边列表部分 -->
      <div class="category">
        <ul class="categories">
          <li v-for="(item,index) in computedCategories" :key="item.id" @click="changeCategory(index)">
            <span :class="{'active': activeCategory === index}">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- //右边商品展示部分 -->
      <!-- 全部分类和综合排序按钮 -->
      <div class="productList" >
        <div class="product-filter" :class="{'active':allCategories || rankingBol}">
          <div class="filter-titles">
            <div :class="{'active':allCategories}" @click="changeAllCategories">
              <span>全部分类</span><var>&nbsp;</var>
            </div>
            <div :class="{'active': rankingBol}" @click="changeRankCategorices">
              <span>综合排序</span><var>&nbsp;</var>
            </div>
          </div>
          <!-- 显示隐藏的全部分类 -->
          <div class="filter-items" v-show="allCategories" @click="hideProductList">
            <ul>
              <li :class="{'active':activeSmall === '全部分类'}" @click="changeCid('全部分类','all')">全部分类</li>
              <li :class="{'active':activeSmall === item.name}" v-for="(item,index) in computedCategories[activeCategory].cids" :key="item.cid_id" @click="changeCid(item.name,index)">{{item.name}}</li>
            </ul>
          </div> 
          <!-- 显示隐藏的综合排序 -->
          <div class="filter-items" v-show="rankingBol" @click="hideProductList">
            <ul>
              <li @click="changeRanking(item)" :class="{'active':activeRanking == item}" v-for="(item,index) in rankingList" :key="item">{{item}}</li>
            </ul>
          </div>
        </div>
        <ul class="productList-wrap">
          <!-- 每件商品的信息 -->
          <li v-for="(item,index) in activeSortRankingProducts" :key="item.product_id">
            <dl>
              <dt>
                <img :src="item.imgs.min">
              </dt>
              <dd class="nowrap product-item-title">
                {{item.name}}
              </dd>
              <dd class="product-specifics-wrap">
                <div class="product-specifics">
                  <span>{{item.unit}}ml</span>
                  <var>￥{{item.price}}</var>
                </div>
                <div class="product-operates">
                  <span class="inner">-</span>
                  <span class="product-operates-item">0</span>
                  <span class="inner">+</span>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderYellow from "@/components/Header-yellow/Header-yellow";
export default {
  data () {
    return {
      //激活的大分类
      activeCategory: 0,
      //激活的子分类,保存子分类的名称
      activeSmall:'全部分类',
      //激活的子分类的下标,默认为'all'
      activeCidsIndex : 1,
      //控制全部分类显示隐藏
      allCategories : false,
      //控制综合排序的显示隐藏
      rankingBol : false,
      //综合排序数组
      rankingList: ['综合排序', '价格最低', '价格最高'],
      //激活的综合排序
      activeRanking:'综合排序'
    }
  },
  methods:{
    //更改激活的分类
    changeCategory (index) {
      this.activeCategory = index
      this.activeSmall = '全部分类'
      this.activeRanking = '综合排序'
      this.rankingBol = false
      this.allCategories = false

    },
    //全部分类的显示隐藏
    changeAllCategories () {
      this.allCategories = !this.allCategories
      this.rankingBol = false
    },
    //综合分类的显示隐藏
    changeRankCategorices () {
      this.rankingBol = !this.rankingBol
      this.allCategories = false
    },
    changeCid (name,index) {
      this.activeSmall = name,
      this.activeCidsIndex = index
    },
    //更改综合排序激活的分类
    changeRanking (item) {
      this.activeRanking = item
    },
    //点击任意位置隐藏已弹出分类选项
    hideProductList () {
      this.rankingBol = false
      this.allCategories = false
    }
  },
  components:{
    HeaderYellow
  },
  computed: {
    computedCategories () {
      return this.$store.state.computedCategories
    },
    //激活的分类商品数据
    activeCategoryProduct () {
      return this.computedCategories[this.activeCategory].products
    },
    //根据激活的分类下标过滤数据
    activeCidsProducts () {
      if(this.activeCidsIndex === 'all'){
        return this.activeCategoryProduct
      }else{
        let index = this.activeCidsIndex
        return this.activeCategoryProduct.filter(item => item.cidIndex === index)
      } 
    },
    //对显示的商品进行分类排序
    activeSortRankingProducts () {
      let newArr = this.activeCidsProducts.slice(0,this.activeCidsProducts.length+1)
      if (this.activeRanking === '综合排序') {
        return this.activeCidsProducts
      }else if(this.activeRanking === '价格最低'){
        return newArr.sort((a,b) => a.price - b.price)
      }else {
        return newArr.sort((a,b) => b.price - a.price)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.category{
  overflow: scroll;
  position: relative;
  height: 100%;
}
.categories{
  float: left;
  width: 23.4375%;
  font-size: 1.1rem;
}
.categories>li{
  padding: 0.3rem 0;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 0.1rem solid #d9d9d9;
}
.categories>li>span{
  display: block;
  height: 3.4rem;
  line-height: 3.4rem;
  padding-left: 0.6rem;
}
.categories>li>span.active{
  border-left: 0.6rem solid #f0d001;
  padding-left: 0;
}
.productList{
  /*float: right;*/
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 76%;
}
.product-filter{
  display: flex;
  display: -webkit-flex;
  flex-direction:column;
  -webkit-flex-direction:column;
  position: absolute;
  z-index: 2;
  width: 100%;
}
.product-filter.active{
  height: 100%;
}
.filter-titles{
  height: 1.8rem;
  padding: 1.1rem 0;
  background-color: rgba(255,255,255,0.8);
  width: 100%;
  border-bottom: 0.1rem solid #e1dbdd;
}
.filter-titles>div{
  float: left;
  width: 50%;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  font-size: 1.2rem;
}
.filter-titles>div:nth-child(1){
  box-sizing:border-box;
  border-right: 0.1rem solid #d5d5d5;
}
.filter-titles>div>var{
  display: inline-block;
  width: 1.3rem;
  height: 1.8rem;
  line-height: 1.8rem;
  background: url("./images/icon-down.png") center center no-repeat;
  -webkit-background-size: 1rem 0.6rem;
  background-size: 1rem 0.6rem;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  transition: 0.5s ease;
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
}
.filter-titles>div.active>var{
  -webkit-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
}
.filter-items{
  flex:1;
  -webkit-flex:1;
  width: 100%;

  background-color: rgba(0,0,0,0.2);
}
.filter-items>ul{
  overflow: hidden;
  padding-bottom: 1rem;
  background-color: rgba(255,255,255,1);
}
.filter-items>ul>li{
  padding: 0.7rem 0.9rem;
  border: 0.1rem solid #e0e0e0;
  /*border: 0.1rem solid #e6d056;*/
  border-radius: 0.4rem;
  float: left;
  margin: 0.8rem 0 0 0.8rem;
  
}
.filter-items>ul>li.active{
  background-color: #fff9d9;
  border-color: #e6d056;
}
.productList-wrap{
  position: absolute;
  top: 4.1rem;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  background-color: #fff;
}
.productList-wrap>li{
  border-bottom: 0.1rem solid #e1dbdd;
  padding: 0.8rem 1rem;
}
.productList-wrap>li>dl{
  overflow: hidden;
}
.productList-wrap>li>dl>dt{
  float: left;
  width: 8rem;
  height: 8rem;
  margin-right: 1rem;
  overflow: hidden;
  text-align: center;
}
.productList-wrap>li>dl>dt>img{
  width: 100%;
}
.productList-wrap>li>dl>dd{
  font-size: 1.2rem;
}
.product-item-title{
  margin-bottom: 2.9rem;
}
.product-specifics-wrap{
  overflow: hidden;
}
.product-specifics{
  float: left;
  width: 30%;
  overflow: hidden;
}
.product-specifics>span{
  display: block;
  color: #858585;
  margin-bottom: 1rem;
}
.product-specifics>var{
  color: #f40;
}
.product-operates{
  float: right;
  width: 70%;
  overflow: hidden;
}
.product-operates>.inner{
  display: inline-block;
  font-size: 2.4rem;
  width: 2.9rem;
  height: 2.9rem;
  line-height: 3.4rem;
  color: #d73e00;
  text-align: center;
  /*padding: 0.8rem;*/
  border: 0.1rem solid #dcbd9e;
  border-radius: 50%;
}
.product-operates-item{
  display: inline-block;
  height: 2.8rem;
  line-height: 2.8rem;
  vertical-align: top;
  font-size: 1.2rem;
  margin: 0 0.5rem;
}
</style>