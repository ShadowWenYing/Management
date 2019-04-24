<template>
<el-container>
  <el-main class="min">
    <div class="loginbody" ref="loginbody">
		<form action="" method="post" class="loginform" onsubmit="return false" >
			<div class="login">
				<div class="login_dia">
					<h3>后台数据中心</h3>
					<p v-show="texthide">用户名或密码错误</p>
				</div>
				<div class="login_input">
					<ul class="clearfix">
						<li>
							<input id="log_phone" name="log_phone" class="s_phone" type="text"  v-model="username"  placeholder="请输入您的账号" />
							<!--<div class="tip-info validform_checktip"></div>-->
						</li>
						<li>
							<input id="log_password" name="log_password" class="s_password" type="password" v-model="password" placeholder="请输入密码"  />
							<!--<div class="tip-info validform_checktip"></div>-->
						</li>
					</ul>
				</div>
				<div class="login_submit">
					<input id="s_submit"  type="button" value="登 录" @click="login_validate()" />
				</div>
			</div>
		</form>
	</div>
  </el-main>
</el-container>
</template>

<script>
	export default {
		data() {
			return {
				texthide:false,
				username:'',
				password:'',
        user:'',
        fullWidth:document.documentElement.clientWidth,
        fullHeight:document.documentElement.clientHeight
			}
		} ,
		methods:{
			login_validate() {
				var _this = this;
				this.$axios.post(this.$store.state.api+'/pledgeOperate/login',{
                        "userName":this.username,
                        "passWord":this.password,
				})
				.then(function(response){
					if(response.data.code=="200"){
						_this.user=response.data.data
						_this.$router.push({
							path:'/home/content',
							// query:{ id：id }
						});
						_this.store();
                    }else if(response.data.code=="400"){
							_this.texthide=true
						setTimeout(function(){_this.texthide=false}, 2000);
                    }

				})

			},
			store(){
				this.$store.dispatch('changeUser',this.user)
      },
      whii(){
          this.widths = this.$store.state.Awidth
          this.heights = this.$store.state.Aheight
          this.$refs.loginbody.style.width = this.widths+'px'
          this.$refs.loginbody.style.height = this.heights+'px'
      }
    },
     created (){
       var _this = this
       setTimeout(function(){
          _this.whii();
       },100)
        },
      mounted(){
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
      watch:{
        fullWidth(){
          var that = this
          setTimeout(function(){
            that.$refs.loginbody.style.width = that.fullWidth+'px'
          },400)

        },
        fullHeight(){
          var that = this
          setTimeout(function(){
            that.$refs.loginbody.style.height = that.fullHeight+'px'
          },400)
        }
      }

	}
</script>

<style scoped>
.min{
  padding: 0px 0px;
  margin: 0 0;
}
.loginbody{
   background: url("../../static/img/bg.png") no-repeat center center;
   background-attachment:fixed;
   background-color:#CCCCCC;
   position: relative;
   background-size: 100% 100%;
}
.login{
	position: absolute;
	width: 580px;
	height: 483px;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	-webkit-transform: translate(-50%,-50%);
	-moz-transform: translate(-50%,-50%);
	background: url('../../static/img/login_alert.png') no-repeat center center;
	padding: 76px 0;
}
.login_dia{
	text-align: center;
}
.login_dia h3{
	font-size: 38px;
	line-height: 53px;
}
.login_dia p{
	font-size: 14px;
	color: #FF5560;
	line-height: 20px;
}
.login_input{
	width: 300px;
	margin: 0 auto;
}
.login_input input[name="log_phone"],.login_input input[name="log_password"]{
	color: #4A4A4A;
	font-size: 18px;
	line-height: 25px;
	padding: 13px 13px 13px 38px ;

}
.login_input input[name="log_phone"]{
	background: url('../../static/img/username.png') no-repeat 6px center;
}
.login_input input[name="log_password"]{
	background: url('../../static/img/password.png') no-repeat 6px center;
}
.login_input input{
	border: none;
    outline: medium;
    border-bottom: 1px solid #E3E3E3;
    width: 300px;
}
.login_submit{
	height: 44px;
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
.login_submit input{
	border: none;
    outline: medium;
    border: none;
    outline: medium;
	background: #4C84FF;
	color: #FFFFFF;
	border-radius: 6px;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	width: 100%;
	height: 100%;
	font-size: 16px;
}
.login_submit input:hover{
	cursor: pointer;
}
</style>
