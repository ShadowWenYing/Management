<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
        fullWidth:document.documentElement.clientWidth,
        fullHeight:document.documentElement.clientHeight
    }
  },
  methods:{
    bbb(){
        var Awidth = window.innerWidth
        var Aheight = window.innerHeight
        this.$store.dispatch('changeWI',Awidth)
        this.$store.dispatch('changeHI',Aheight)
    },
  },
  // computed:{

  // },
  // watch:{
  //       fullWidth(){
  //         var that = this
  //         setTimeout(function(){
  //           that.$store.dispatch('changeWI',that.fullWidth)
  //         },400)

  //       },
  //       fullHeight(){
  //         var that = this
  //         setTimeout(function(){
  //           that.$store.dispatch('changeHI',that.fullHeight)
  //         },400)
  //       }
  //     },
  mounted(){
    this.bbb()
    // const that = this
    // window.onresize = () => {
    //     return (() => {
    //       window.fullWidth = document.documentElement.clientWidth
    //       window.fullHeight = document.documentElement.clientHeight
    //       that.fullWidth = window.fullWidth
    //       that.fullHeight = window.fullHeight
    //     })()
    //   }
  },

}
</script>

<style>

body{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 14px;
  font-family:"SimSun","宋体","Arial Narrow";
}
body>div:nth-of-type(5){
  position: absolute;
  z-index: 9999999;
}
input,button,a {outline:0 none !important;}
/* ::-webkit-scrollbar{
  display:none;
} */
::-webkit-scrollbar {/*滚动条整体样式*/
            width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 6px;
            border-radius: 27px !important;
        }
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 270px !important;
    /* -webkit-box-shadow: inset 0 0 5px rgba(204, 89, 89, 0.2); */
    background: rgb(155, 155, 155);
        }
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /* -webkit-box-shadow: inset 0 0 5px rgba(223, 43, 43, 0.2); */
    border-radius: 0px;
    background: rgba(0, 0, 0, 0.1);
        }
/* 修改input和button样式 */
.el-input__inner{
  background: #FFFFFF;
  border: 1px solid #B7C3D5;
  border-radius: 27px;
  font-family: 'PingFangSC-Regular';
  letter-spacing: -0.39px;
}
.el-button:focus, .el-button:hover{
  background-color:#4D6C9B ;
  color:#FFFFFF ;
}
/* 修改多选框样式 */
.el-checkbox__inner{
  background: #FFFFFF;
  border: 1px solid #4D6C9B;
  border-radius: 4px;
  text-align: center;
}
.el-checkbox{
  margin-left: 24px;
}
.el-checkbox+.el-checkbox{
  margin-left: 24px;
  margin-bottom: 16px;
}
.el-radio__input.is-checked .el-radio__inner{
  background: #47B55C;
  background-color: #47B55C;
}
/* 修改表格移入变色 */
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #F7F4EF !important;
}
/* 修改页面滚动条 */
/* .el-message--warning{
  background-color:rgb(143, 175, 190) !important;
  border-color:#FFFFFF;
}
.el-message--warning .el-message__content {
  color: aqua;
}
.el-message .el-icon-warning{
   color: aqua;
} */
/* .el-message{
  top: 50px;
} */
a{text-decoration:none;}
/* 修改列表切换 */
#tab-0,#tab-1,#tab-2{
  width: 127px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  letter-spacing: -0.39px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  color: #212C3C;
}
.el-tabs__nav-scroll{
   background: #E4E8EE;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: #4D6C9B;
}
.el-tabs--border-card{
  border: 1px solid #B7C3D5;
  border-radius: 4px;
  -webkit-box-shadow:none;
  box-shadow: none;
}
.cell{
   text-align: center;
}
.el-table__empty-text{
  width: 200px;
  height: 132px;
  background-image: url('../static/img/空状态.png')
}
.block:not(:last-child){
  margin-bottom: 0px;
}
</style>
