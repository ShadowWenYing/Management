<template>
  <div>
      <el-row class="top_title" :gutter="0">
        <el-col :lg="({span: 7, offset:0 })" :xl="({span: 3, offset: 0})" class="">
            <div class="top_header">爱心筹资质申请</div>
        </el-col>
      </el-row>

      <el-row class="top_title" :gutter="0">
        <!-- <el-col :lg="({span: 20, offset:0 })" :xl="({span: 21, offset: 0})" class="top_mm"> -->
          <div  ref="top_titles">
            <el-tabs class="top_content"  type="border-card" @tab-click='waitc'>
              <!-- 待开通页面 -->
                <el-tab-pane  class="title1" label="待通过">
                    <Wait ref="wait"></Wait>
                </el-tab-pane>
               <!--  -->
                <el-tab-pane  label="通过">
                    <Adopt ref="adopt"></Adopt>
                </el-tab-pane>

               <!--  -->
                <el-tab-pane  label="驳回">
                    <Reject ref="reject"></Reject>
                </el-tab-pane>
            </el-tabs>
            </div>
        <!-- </el-col> -->
      </el-row>

  </div>
</template>

<script>
import Wait from './on/wait.vue'
import Adopt from './on/adopt.vue'
import Reject from './on/reject.vue'
export default {
    data(){
      return {
      fullWidth:document.documentElement.clientWidth,
      }
    },
    components:{
		 	Wait,
			Adopt,
			Reject,
		 },
    methods:{
      waitc(id){
				if(id.index ==0){
					this.$refs.wait.getWait();
				}else if(id.index ==1){
				this.$refs.adopt.getadopt();
				}else{
					this.$refs.reject.getreject();
				}
      },
      whii(){
          var widths = this.$store.state.Awidth
          this.$refs.top_titles.style.width = (widths-230)+'px'
      }
    },
     watch:{
      fullWidth(){
          var that = this
          setTimeout(function(){
            that.$refs.top_titles.style.width = (that.fullWidth-230)+'px'
          },400)
        },
    },
    mounted(){
        const that = this
      window.onresize = () => {
        return (() => {
          window.fullWidth = document.documentElement.clientWidth
          that.fullWidth = window.fullWidth
        })()
      }
    },
    created (){
       var _this = this
       setTimeout(function(){
          _this.whii();
       },100)
        },

}
</script>

<style>
.top_header{
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
  margin-bottom: 8px;
}
.btn-prev>span{
  background: #ffffff;
  background-image: url('../../../static/img/跳页左.svg');
}
.btn-next>span{
  background: #ffffff;
  background-image: url('../../../static/img/跳页右.svg');
}
.el-pagination span:not([class*=suffix]){
  min-width: 28px;
}
.el-tabs--border-card>.el-tabs__content{
  padding :0px;
}
.top_mm{
  width:1680px;
}
.modal-card{
box-shadow: -4px 0 16px 0 rgba(183,195,213,0.60);
}
.modal-background{
  background-color: rgba(255, 255, 255, 0);
}
</style>
