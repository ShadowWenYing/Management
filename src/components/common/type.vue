<template>
    <div class="type_table">
    <!-- 输入框 -->
      <el-row :gutter="0">
        <el-col :lg="({span: 21, offset: 0})" class="" :xl="({span: 21, offset:0,})"><span class="type_span">互助筹债权类型</span></el-col>
        <el-col :lg="({span: 20, offset: 0})" class="" :xl="({span: 21, offset:0,})">
          <el-checkbox-group v-model="checkedCities1">
              <el-checkbox class="type_div" v-model="checkedCities1" v-for="item in tableData.debetTypeVOList" :label="item.merchantPlatId" :key="item.id">{{item.merchantPlatName}}</el-checkbox>
					</el-checkbox-group>
        </el-col>
      </el-row>
      <el-row class="type_in" :gutter="0">
        <el-col :lg="({span: 2, offset: 0})" class="" :xl="({span: 1, offset:0,})"><span class="type_span">备注：</span></el-col>
        <el-col :lg="({span: 6, offset: 0})" :xl="5" class="type_padd1"><el-input class="type_input2" placeholder="用于说明本次操作的原因，可不填" v-model="input"></el-input></el-col>
        <el-col :lg="({span: 7, offset:1 })" :xl="({span: 3, offset: 1})" class=""><el-button type="primary" class="type_button" @click="handeClick" round>保存</el-button></el-col>
      </el-row>
      <el-row class="type_title" :gutter="0">
        <el-col :lg="({span: 7, offset:0 })" :xl="({span: 3, offset: 0})" class="">
            <div class="home_header">操作日志</div>
        </el-col>
      </el-row>
    <!--  -->
    <!-- 表格 -->
      <el-row :gutter="0">
        <!-- <el-col :lg="({span: 20, offset:0 })" :xl="({span:23, offset: 0})" class=""> -->
            <div class="type_t" ref="type_w">
              <el-table
              border
              ref="type_h"
              cell-class-name='type_agin'
              header-cell-class-name='type_tit'
              row-class-name='type_text'
							:data="tableData.pledgeDebetMakeList">
              <el-table-column
								prop="debetType"
								label="修改线上债权质押类型"
								width="340px">
							</el-table-column>
							<el-table-column
								prop="createTime"
								label="操作时间"
								width="200">
								<template slot-scope="scope">
									<span type="text" size="small">{{scope.row.createTime?dateFormat(scope.row.createTime,"yyyy/MM/dd hh:mm:ss"):'-'}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="remark"
								label="备注"
								width="730">
							</el-table-column>
              <el-table-column
								prop=""
								label="">
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
      checkedCities1:[],
      input:'',
      tableData:{},
      checked:[],
      fullWidth:document.documentElement.clientWidth,
      fullHeight:document.documentElement.clientHeight
      }
    },
    methods:{
        getType() {
			  var _this = this;
			  this.$axios.post(this.$store.state.api+'/pledgeOperate/debetTypeList')
			  .then(this.getHomeInfoSucc)
		  },
		  getHomeInfoSucc (res) {
			  this.tableData = res.data.data

		  },
      handeClick(){
			  var _this = this
			  if(this.checkedCities1.length>0){
				  	this.$axios.post(this.$store.state.api+'/pledgeOperate/deployDebetType',{
						"DebetList":this.checkedCities1,
            			"remark":this.input,
				})
				.then(res =>{
						if(res.data.code ='200'){
							alert('保存成功')
							_this.getType();
							_this.checkedCities1 = []
							_this.input = ''

						}else{
							alert('保存失败')
						}
					}).catch(err =>{
					   alert('网络故障请稍后重试')
					});
			  }else{
				  alert('请选择质押类型')
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
          this.$refs.type_w.style.width = (widths-230)+'px'
          this.$refs.type_h.height = (heights-275)+'px'
      }
    },
    watch:{
      fullWidth(){
          var that = this
          setTimeout(function(){
            that.$refs.type_w.style.width = (that.fullWidth-230)+'px'
          },400)

        },
        fullHeight(){
          var that = this
          setTimeout(function(){
            that.$refs.type_h.height = (that.fullHeight-275)+'px'
          },400)
        }
    },
    mounted(){
        this.getType()
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
.type_padd1{
  margin-left: -20px;
}
.type_span{
  height: 25px;
  line-height: 54px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
  }
.type_input{
  height: 54px;
  line-height: 54px;
}
.type_input2{
  height: 54px;
  line-height: 54px;
}
.type_button{
  width: 84px;
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
.type_title{
  margin-top: 15px;
}
.type_t{
  margin-top: 16px;
}
.type_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  text-align: center !important;
}
.type_tit{
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
.type_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}
/* .cell{
  padding-right:40px !important;
  padding-left:40px !important;
} */
.el-checkbox__label{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
}
.type_div{
  height: 20px;
  line-height: 20px;
}
.type_in{
  margin-top: 8px;
}
.el-checkbox-group{
  margin-left: -24px;
}
</style>
