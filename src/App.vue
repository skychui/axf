<template>
  <div id="app">
    <TabBar></TabBar>
    <!-- 缓存组件,created只触发一次啦 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/TabBar'
import api from "./api";
export default {
  name: 'app',
  created () {
    this.loading.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      let that = this
      async function getData ( ) {
        //获取分类
        let result = await that.$http.get(api.host+'/categories')
        that.categories = result.data
        //获取商品的数据
        let res = await that.$http.get(api.host+'/products')
        that.products = res.data
        that.computedCategories()
        that.loading.close()
      }
      getData()
  },
  methods:{
    computedCategories () {
      //保存的重新组织过的数据
      /* 
        {
          id;
          cid;
          name;
          products:[
            {}
          ]
        }
      */ 
      let products = this.products
      let categories = this.categories
      for (let i = 0 ; i < products.length ; i++) {
        for (let j = 0 ; j < categories.length ; j++ ){
          if(categories[j].id === products[i].categoryId){
            categories[j].products.push(products[i])
          }
        }
      }
      this.$store.commit('SAVE_COMPUTED_CATEGORIES',categories)
    }
  },
  components: {
    TabBar,
  }
}
</script>

<style>

</style>
