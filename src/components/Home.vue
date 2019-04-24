<template>
  <el-container>
  <el-aside class="" width="233px">
      <div class="back">
          <div class="back_colors">后台数据中心</div>
          <div class="xiantiao"></div>
          <div class="bo">
              <div>{{this.$store.state.user}}</div>
              <span class="one"></span>
              <div @click="out">退出账号</div>
              <img @click="out" class="icons" src="../../static/img/1.svg" alt="">
            </div>
          <div class="list">
            <div class="list_div" @click="list">债权互助筹
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-collapse-transition>
              <ul class="ul" v-show="lists">
                  <router-link class="list_li1" to="/home/content">
                    <li class="blues">生成邀请码</li>
                  </router-link>
                  <router-link class="list_li" to="/home/cycle">
                    <li class="blues">回购周期</li>
                  </router-link>
                  <router-link class="list_li" to="/home/type">
                    <li class="blues">互助筹债权类型</li>
                  </router-link>
                  <router-link class="list_li" to="/home/top">
                    <li class="blues">爱心筹资质申请</li>
                  </router-link>
                  <router-link class="list_li" to="/home/data">
                    <li class="blues">筹资数据</li>
                  </router-link>
                  <!-- <router-link class="list_li" to="/home/height">
                    <li class="blues">高度</li>
                  </router-link> -->
              </ul>
            </el-collapse-transition>
          </div>
      </div>
  </el-aside>
  <el-main >
       <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
import BScroll from 'better-scroll'
export default {
      data(){
        return {
            lists:true,

        }
      },
      methods:{
        list(){
            if(this.lists){
              this.lists = false;
            }else{
              this.lists = true;
            }
        },
        out(){
          this.$axios.get(this.$store.state.api+'/pledgeOperate/logout');
          this.$router.push({
							name:'Login',
							// query:{ id：id }
						});
        }
      },
      mounted(){
          if(this.$store.state.user=='admins'){
			  this.$router.push({
							name:'Login',
							// query:{ id：id }
            });
		  }else{

		  }
		},
}
</script>

<style>
.router-link-active{
  color: #FFFFFF !important;
  background-image: url('../../static/img/Group.png');
  width: 200px;
}
.blues{
  text-align: left;
  margin-left: 32px;
}
.el-icon-caret-bottom{
    color: #FFFFFF;
    display: inline-block;
}
.ul{
  width: 200px;
  margin-top: 24px;
  padding:0;
  list-style: none;
}
.list_div{
  margin-left:-24px;
  font-family: 'PingFangSC-Regular';
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: -0.43px;
}

.list_li:hover{
  color: #FFFFFF;
   /* color: #FFFFFF; */
}
.list_li1:hover{
  color: #FFFFFF;
   /* color: #FFFFFF; */
}
.list_li1{
  display: block;
  height: 38px;
  width: 200px;
  line-height: 38px;
  font-family: 'PingFangSC-Light';
  font-size: 16px;
  color: #ACC0DD;
  letter-spacing: -0.39px;
}
.list_li{
  display: block;
  height: 38px;
  width: 200px;
  line-height: 38px;
  font-family: 'PingFangSC-Light';
  font-size: 16px;
  margin-top: 16px;
  color: #ACC0DD;
  letter-spacing: -0.39px;
}
.list{
  position: relative;
  top: 13%;
  clear: both;
  margin-top: 10px;
}
.one{
  display: block;
  width: 1px;
  float: left;
  margin-left: -3.2px;
  margin-top: 3px;
  height: 17px;
  background: rgba(255,255,255,0.26);
  border-radius: 0.5px;
}
.bo>div{
  width: 89px;
  float: left;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  text-align: center;
  color: #ACC0DD;
  letter-spacing: -0.39px;
}
.bo{
  position: relative;
  top: 9%;
  height: 24px;
  width: 200px;
}
.xiantiao{
  position: relative;
  width: 200px;
  height: 4px;
  top: 7.5%;
  background: #629CC3;
}
.back{
  max-width: 200px;
  min-width: 170px;
  position: fixed;
  background: linear-gradient(-151deg, #4D6C9B 0%, #233A5B 100%);
  height:77.14rem;
}
.back_colors{
  width: 200px;
  position: relative;
  background-image:#4D6C9B;
  top: 3.7%;
  right: 2.1%;
  color: #FFFFFF;
  font-size: 26px;
  letter-spacing: -0.63px;
  font-family: 'PingFangSC-Regular';
}
.el-aside {
  /* background-image: linear-gradient(-151deg, #4D6C9B 0%, #233A5B 100%); */
  text-align: center;
  overflow: hidden;
  height: 100%;
  }
  .el-main{
    margin-left: 200px;
    width: 100%;
    position: fixed;
    background: #F4F5F7;
    color: #333;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
.icons{
  margin-top: 6px;
  margin-left: -26px;
  width: 12px;
  height: 12px;
}

</style>
