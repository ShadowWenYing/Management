<template>
    <div class="height_table" ref="height_table">
    <!-- 输入框 -->
      <el-row :gutter="0">
        <el-col :lg="({span: 3, offset: 0})" :xl='({span: 2, offset: 0})' :offset="1"><span class="height_span">债权账号：</span></el-col>
        <el-col :lg="4" :xl='({span: 4, offset:0,})' class="height_padd" ><el-input v-model="username" placeholder="输入身份证账号" class="height_input"></el-input></el-col>
        <el-col :lg="({span: 2, offset: 0})" class="height_padd2" :xl="({span: 1, offset:0,})"><span class="height_span">备注：</span></el-col>
        <el-col :lg="({span: 6, offset: 0})" :xl="4" class="height_padd1"><el-input v-model="interest" placeholder="非必填项" class="height_input2"></el-input></el-col>
        <el-col :lg="({span: 7, offset:1 })" :xl="({span: 3, offset: 1})" class=""><el-button type="primary" class="height_button" @click="handleClick()" round>生成邀请码</el-button></el-col>
      </el-row>
      <el-row class="height_title" :gutter="0">
        <el-col :lg="({span: 7, offset:0 })" :xl="({span: 3, offset: 0})" class="">
            <div class="home_header">操作日志</div>
        </el-col>
      </el-row>
    <!--  -->
    <!-- 表格 -->
      <el-row :gutter="0"  >
        <!-- <el-col :lg="({span: 20, offset:0 })" :xl="({span:22, offset: 0})" class=""> -->
            <div class="height_t" ref="height_s">
              <el-table
              border
              ref="height_t"
              cell-class-name='height_agin'
              header-cell-class-name='height_tit'
              row-class-name='height_text'
							:data="inviteList"
							>
							<el-table-column
								prop="createdTime"
								label="邀请码生成时间"
								width="220">
								<template slot-scope="scope">
									<span type="text" size="small">{{dateFormat(scope.row.createdTime,"yyyy/MM/dd hh:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="inviteCode"
								label="邀请码"
								width="150">
							</el-table-column>
							<el-table-column
								prop="idCard"
								label="绑定账号ID"
								width="220">
							</el-table-column>
							<el-table-column
							prop="realName"
							label="姓名"
							width="150">
							</el-table-column>
							<el-table-column
							prop="mobile"
							label="手机号"
							width="180">
							</el-table-column>
              <el-table-column
								prop="status"
								label="使用状态"
								width="150">
                <template slot-scope="scope">
									<span type="text" size="small">{{scope.row.status?'已使用':'未使用'}}</span>
								</template>
							</el-table-column>
							<el-table-column
							prop="remark"
							label="备注"
							>
							</el-table-column>
							</el-table>

            </div>
        <!-- </el-col> -->
      </el-row>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
    data(){
      return{
          inviteList:[],
          username:'',
          interest:'',
          fullWidth:document.documentElement.clientWidth,
          fullHeight:document.documentElement.clientHeight
      }
    },
    methods:{
        getheight() {
			  this.$axios.get(this.$store.state.api+'/pledgeOperate/inviteNum/inviteList')
			  .then(this.getHomeInfoSucc)
		  },
		  getHomeInfoSucc (res) {
        this.inviteList = res.data.data
      },
      handleClick(){
        var _this=this;
        var username = _this.username
        var interest = _this.interest
			   const idcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			   if(idcard.test(username)){

				this.$axios.post(this.$store.state.api+'/pledgeOperate/inviteNum/isUsable',{
						"idCard":username,
						"remark":interest
				})
				.then(function(response){
					const code = response.data.code
					if(code==200){
						alert('邀请成功！')
						_this.username='',
						_this.interest='',
						_this.getheight();
					}else if(code ==400){
            alert('该用户已被邀请')
					}else{
            alert(' 该用户不存在！')
					}

				})
				.catch(function(error){
						//console.log(error)
					})
			   }else{
           alert('请输入正确的身份证号')
			   }
      },
        dateFormat(millionsTime, pattern){
          var d = new Date();
          d.setTime(millionsTime);
          var date = {
              "M+": d.getMonth() + 1,
              "d+": d.getDate(),
              "h+": d.getHours(),
              "m+": d.getMinutes(),
              "s+": d.getSeconds(),
              "q+": Math.floor((d.getMonth() + 3) / 3),
              "S+": d.getMilliseconds()
          };
          if (/(y+)/i.test(pattern)) {
              pattern = pattern.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in date) {
              if (new RegExp("(" + k + ")").test(pattern)) {
                  pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1
                      ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
          }
          return pattern;
        },
         whii(){
          var widths = this.$store.state.Awidth
          var heights = this.$store.state.Aheight
          // this.$refs.height_table.style.width = widths+'px'
          this.$refs.height_s.style.width = (widths-230)+'px'
          this.$refs.height_t.height = (heights-135)+'px'
      }
    },
    watch:{
        fullHeight(){
          var that = this
          setTimeout(function(){
            that.$refs.height_t.height = (that.fullHeight-135)+'px'
          },400)
        },
        fullWidth(){
          var that = this
          setTimeout(function(){
            that.$refs.height_s.style.width = (that.fullWidth-230)+'px'
          },400)
        },
    },
    mounted(){
        this.getheight()
        const that = this
      window.onresize = () => {
        return (() => {
          window.fullWidth = document.documentElement.clientWidth
          window.fullHeight = document.documentElement.clientHeight
          that.fullWidth = window.fullWidth
          that.fullHeight = window.fullHeight
        })()
      }
    },
    created (){
       var _this = this
       setTimeout(function(){
          _this.whii();
       },100)
        }
}
</script>

<style>
.el-col{
  /* background: #659865; */
  /* margin-left:20px; */
  padding: 0 0 !important;
}
.height_padd{
  margin-left: -60px;
}
.height_padd1{
  margin-left: -20px;
}
.height_padd2{
  margin-left: 30px;
}
.height_span{
  height: 25px;
  line-height: 54px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.height_input{
  height: 54px;
  line-height: 54px;
}
.height_input2{
  height: 54px;
  line-height: 54px;
}
.height_button{
  width: 160px;
  height: 42px;
  margin-left: -45px;
  margin-top: 5px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #FFFFFF;
  letter-spacing: -0.43px;
}
.home_header{
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.height_title{
  margin-top: 17px;
}
.height_t{
  margin-top: 8px;
}
.height_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  text-align: center !important;
}
.height_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  background: #E4E8EE !important;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.cell{
   text-align: center;
}
.height_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}

/* .cell{
  padding-right:40px !important;
  padding-left:40px !important;
} */
</style>
