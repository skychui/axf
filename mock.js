var Mock = require('mockjs');
var fs = require('fs')

var data = new Mock.mock({
  'bannar|3-5':[
    {
      'id|+1':1,
      'bannar_img':'@image(320x140,@color)',
      'cids|4':[
        {
          'cid_id|+1':1,
          'name':'@cword(3,5)'
        }
      ],
      'products|30-50':[
        {
          //子分类id
          'cidsId|0-3':10,
          'product_id|+1':1,
          'product_img':'@image(168x168,@color)',
          'product_name':'@cword(2,8)',
          'price|1-99.1':10,
          'unit|10-1000':10
        }
      ]
    }
  ],
  'categories|10' : [
    {
      //分类的ID
      'id|+1':1,
      'name':'@cword(3,5)',
      'category_img':'@image(320x76,@color)',
      //分类标题的颜色
      'color':'@color',
      //子分类
      'cids|4':[
        {
          'name':'@cword(4)',
        }
      ],
      //每个对应 所有商业id的数据
      'products':[]
    }
  ],
  'products|300-400':[
    {
      //商品的ID
      'id|+1':1,
      //商品对应的分类id
      'categoryId|1-10':10,
      //商品对应的子分类id
      'cidIndex|0-3':10,
      //商品的图片
      'imgs':{
        'min':'@image(80x80,@color,@cname)',
        'big':'@image(300x300,@color,@cname)'
      },
      'price|10-999.2':10,
      //商品的名称
      'name':'@cword(3,10)',
      //商品的规格
      'unit|10-1000':10,
      //品牌
      'brand':'@cword(2,6)',
      //保质期
      'expiraton_date|1-3.1':10,
      //产地
      'place_of_origin':'@city(true)',
    }
  ]

})

fs.writeFile('db.json',JSON.stringify(data,null,2),function () {
  console.log("写入成功")
})