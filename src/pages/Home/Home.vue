<template>
  <div class="home">
    <HeaderYellow></HeaderYellow>
    <div class="main">
      <!-- 轮播图 -->
      <div class="bannar">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, index) in bannar" :key="item.id">
            <img :src="item.bannar_img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 首页 商品列表 -->
      <ul class="acts-category">
        <li class="acts-category-item" v-for="(item,index) in computedCategories" :key="item.cid_id">
          <!-- 列表的标题 -->
          <div class="acts-category-title">
            <span :style="{color:item.color}">{{item.name}}</span>
            <a href="###">更多&gt;</a>
          </div>
          <img class="category-item-banner" :src="item.category_img" alt="">
          <!-- 分类小商品 -->
          <ul class="acts-category-item-goodsList">
            <li v-for="(product,index) in item.products" :key="product.id" v-if="index < 3">
              <img :src="product.imgs.min" alt="">
              <p class="category-name">{{product.name}}</p>
              <div class="product-specifics">
                <div class="product-specifics-left">
                  <p>{{product.unit}}ml</p>
                  <p>￥{{product.price}}</p>
                </div>
                <div class="product-specifics-right">
                  +
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderYellow from "@/components/Header-yellow/Header-yellow";
import api from '@/api'
export default {
  data () {
    return {
      bannar:[],
    }
  },
  created () {
    this.$http.get(api.host+'/bannar')
      .then(res => {
        this.bannar = res.data
      })
  },
  components:{
    HeaderYellow
  },
  computed: {
    computedCategories () {
      return this.$store.state.computedCategories
    }
  }
}
</script>
<style lang="less" scoped>
.bannar{
  height: 14rem;
  img{
    width: 100%;
  }
}
.acts-category-item{
  background-color: #fff;
  padding: 1.4rem 0.9rem;
} 
.acts-category-title{
  overflow: hidden;
}
.acts-category-title>span{
  float: left;
  border-left: 0.8rem solid #eb4084;
  color: #eb4084;
  text-indent: 0.6rem;
  font-size: 1.4rem;
}
.acts-category-title>a{
  float: right;
  color: #a6a6a6;
  font-size: 1.3rem;
}
.category-item-banner{
  width: 100%;
  margin: 0.9rem 0;
  border-radius:50px
}
.acts-category-item-goodsList{
  overflow: hidden;
}
.acts-category-item-goodsList>li{
  width: 31.33333%;
  padding: 1% 1%;
  float: left;
  text-align: center;
  font-size: 1.2rem;
}
.acts-category-item-goodsList>li:nth-child(3n-1){
  width: 33.33333%;
  border-left: 0.1rem solid #e5e5e5;
  border-right: 0.1rem solid #e5e5e5;
  box-sizing: border-box;
}
.acts-category-item-goodsList>li>img{
  width: 7.4rem;
  height: 7.4rem;
}
.product-specifics{
  overflow: hidden;
  margin-top: 2rem;
}
.product-specifics-left{
  float: left;
  text-align: left;
}
.product-specifics-right{
  float: right;
  width: 3rem;
  height: 3rem;
  border: 0.1rem solid #dee0dd;
  border-radius: 50%;
  font-size: 2rem;
  color: #ff3910;
  text-align: center;
  line-height: 3rem;
}
.product-specifics-left>p:nth-child(1){
  color: #acacac;
}
.product-specifics-left>p:nth-child(2){
  color: #e44619;
}
.category-name{
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  vertical-align: top;
  text-align: -webkit-match-parent;
}
</style>


