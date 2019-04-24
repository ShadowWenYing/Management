<template>
    <div class="cycle_table">
    <!-- 输入框 -->
      <el-row :gutter="0">
        <el-col :lg="({span: 3, offset: 0})" :xl='({span: 2, offset: 0})' :offset="1"><span class="cycle_span">质押周期(月)：</span></el-col>
        <el-col :lg="4" :xl='({span: 4, offset:0,})' class="cycle_padd" ><el-input placeholder="请填写质押周期" v-model="formData.cycle" class="cycle_input"></el-input></el-col>
        <el-col :lg="({span: 3, offset: 0})" class="cycle_padd2" :xl="({span: 2, offset:0,})"><span class="cycle_span">利率(%)：</span></el-col>
        <el-col :lg="({span: 5, offset: 0})" :xl="4" class="cycle_padd1"><el-input placeholder="请填写质押利率" class="cycle_input2" v-model="formData.interest"></el-input></el-col>
        <el-col :lg="({span: 7, offset:0 })" :xl="({span: 4, offset: 0})" class="">
          <a href="http://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/125838/125885/index.html" target="view_window" class="cycle_table_a">超链查看利率>></a>
          <el-button type="primary" class="cycle_button" @click="handleClick()" round>新增周期</el-button></el-col>
      </el-row>
      <el-row class="cycle_title" :gutter="0">
        <el-col :lg="({span: 7, offset:0 })" :xl="({span: 3, offset: 0})" class="">
            <div class="home_header">操作日志</div>
        </el-col>
      </el-row>
    <!--  -->
    <!-- 表格 -->
      <el-row :gutter="0">
        <!-- <el-col :lg="({span: 20, offset:0 })" :xl="({span:22, offset: 0})" class=""> -->
            <div class="cycle_t" ref="cycle_t">
              <el-table
              ref="hidden_lg_only"
              border
              cell-class-name='cycle_agin'
              header-cell-class-name='cycle_tit'
              row-class-name='cycle_text'
							:data="tableData.data"
							>
							<el-table-column
								prop="createdTime"
								label="操作时间"
								width="210">
								<template slot-scope="scope">
									<span type="text" size="small">{{dateFormat(scope.row.createdTime,"yyyy/MM/dd hh:mm:ss")}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="pledgePeriod"
								label="周期(月)"
								width="170">
							</el-table-column>
							<el-table-column
								prop="annualInterestRate"
								label="利率(%)"
								width="170">
								<template slot-scope="scope">
									<span type="text" size="small">{{(scope.row.annualInterestRate*100).toFixed(3)}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="idCard"
								label="操作"
								width="180">
                 <template slot-scope="scope">
									 <button @click="handleDelete(scope.$index, scope.row)" class="cycle_button1">删除</button>
								</template>
							</el-table-column>
							<el-table-column
							prop="remark"
							label=""
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
      formData:[{
			  cycle:'',
			  interest:''
		  }],
      tableData: {},
      fullWidth:document.documentElement.clientWidth,
      fullHeight:document.documentElement.clientHeight
      }
    },
    methods:{
      handleDelete(index,row){
				var _this=this;
				const id = row.id
				this.$axios.get(this.$store.state.api+'/pledgeOperate/pledgeCycle/delete',{
					changeOrigin:true,
					params:{
						id:id
					}
				})
					.then(function(response){
					_this.getHomeInfo();

					})
					.catch(function(error){

					});

				    //删除数据，更新视图
				// console.log(row.id)
			},
      getHomeInfo() {
			  this.$axios.get(this.$store.state.api+'/pledgeOperate/pledgeCycle/pledgeCycleList')
			  .then(this.getHomeInfoSucc)
		  },
		  getHomeInfoSucc (res) {
			  this.tableData = res.data
		  },
      handleClick () {
			 var _this=this;
			 const data = this.formData;
			 var care = /^[1-9]+[0-9]*]*$/;
			 var regex = /^([1-9]\d{0,15}|0)(\.\d{1,3})?$/;
			 if(data.cycle && data.interest){
				 if(care.test(data.cycle) && regex.test(data.interest)){
					 this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeCycle/insert',{
						"pledgePeriod":data.cycle,
						"annualInterestRate":data.interest/100
				})
				.then(function(response){
					if(response.data.code=='200'){
						alert('新增成功')
						data.cycle="",
						data.interest="",
						_this.getHomeInfo();
					}else if(response.data.code=='501'){
						alert('请删除相应周期后进行添加')
					}else{
						alert('新增失败')
					}

				})
				.catch(function(error){

					})
				 }else{
					 alert('请输入正确的质押周期或者利率')
				 }
			 }else{
				 alert("质押周期或质押利率不能为空")
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
          this.$refs.cycle_t.style.width = (widths-230)+'px'
          this.$refs.hidden_lg_only.height = (heights-135)+'px'
      }
    },
    watch:{
      fullWidth(){
          var that = this
          setTimeout(function(){
            that.$refs.cycle_t.style.width = (that.fullWidth-230)+'px'
          },400)
        },
        fullHeight(){
          var that = this
          setTimeout(function(){
            that.$refs.hidden_lg_only.height = (that.fullHeight-135)+'px'
          },400)
        }
    },
    mounted(){
        this.getHomeInfo()
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
        },
}
</script>

<style>
.el-col{
  /* background: #659865; */
  /* margin-left:20px; */
  padding: 0 0 !important;
}
.cycle_padd{
  margin-left: -30px;
}
.cycle_padd1{
  margin-left: -65px;
}
.cycle_padd2{
  margin-left: 30px;
}
.cycle_span{
  height: 25px;
  line-height: 54px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.cycle_input{
  height: 54px;
  line-height: 54px;
}
.cycle_input2{
  height: 54px;
  line-height: 54px;
}
.cycle_button{
  width: 160px;
  height: 42px;
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
.cycle_title{
  margin-top: 17px;
}
.cycle_t{
  margin-top: 8px;
}
.cycle_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  /* text-align: center !important; */
}
.cycle_tit{
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
.cycle_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}
/* .cell{
  padding-right:20px !important;
  padding-left:20px !important;
} */
.cycle_button1{
  width: 76px;
  height: 28px;
  border: 1px solid #E96E6E;
  background: #FFFFFF;
  border-radius: 14.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  color: #E96E6E;
  letter-spacing: -0.34px;
}
.cycle_button1:hover{
  background: #E96E6E;
  color: #ffffff;
}
.cycle_table_a{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #1E63CB;
  letter-spacing: -0.34px;
  margin-left: 8px;
  margin-right: 24px;
}
.cycle_table_a:hover{
  color: #1E63CB;
}
</style>
