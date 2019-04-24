<template>
    <div>
        <el-row class="data_t1" :gutter="0">
            <el-col :lg="({span: 7, offset:0 })" :xl="({span: 6, offset: 0})" class="">
                <span>筹资数据</span>
            </el-col>
        </el-row>

        <el-row class="data_t2" :gutter="0">
            <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                <span>温馨提醒：已回购分为已回购1：提前回购、
                  已回购2：到期正常回购、已回购3：到期后在宽限期内回购；状态为已回购或未回购的筹资数据会产生结算日期。</span>
            </el-col>
        </el-row>

        <el-row class="data_t3"  :gutter="0">
            <!-- <el-col :lg="({span: 20, offset:0 })" :xl="({span: 21, offset: 0})" ref="data_height" class="data_t3_con"> -->
              <div class="data_height" ref="data_height">
                   <el-row class="data_t4" :gutter="0">
                       <el-col :lg="21" :xl='({span: 24, offset:0,})'>

                         <span class="data_span">身份证号/姓名：</span>
                         <el-input class="data_input" @keyup.enter.native="searchEnterFun" placeholder="请输入身份证号/姓名搜索" v-model="value13"></el-input>

                          <span class="data_span">发起日期：</span>
                         <el-date-picker
                                class="data_input2"
                                v-model="values"
                                :clearable='false'
                                @change='onPick'
                                type="daterange"
                                :start-placeholder="start"
                                :end-placeholder="end"
                                value-format="timestamp"
                                :default-time="['00:00:00', '23:59:59']"
                                >
                          </el-date-picker>
                          </el-col>
                          <el-col :lg="24" :xl='({span: 24, offset:0,})' class="data_span_one">
                           <span class="data_span">筹资类型：</span>
                               <el-select class="data_input_1" v-model="selectOne" placeholder="全部">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="互助筹" value="0"></el-option>
                                <el-option label="爱心筹" value="1"></el-option>
                              </el-select>


                          <span class="data_span">状态：</span>
                        <el-select v-model="selectTwo" placeholder="全部" class="data_input_1">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="筹资中" value="1"></el-option>
                                    <el-option label="待回购" value="4"></el-option>
                                    <el-option label="未回购" value="5"></el-option>
                                    <el-option label="已回购1" value="9"></el-option>
                                    <el-option label="已回购2" value="8"></el-option>
                                    <el-option label="已回购3" value="10"></el-option>
                          </el-select>

                        <el-button class="data_button" round @click="clear">重置</el-button>
                        <el-button class="data_button1" round @click="commit">确定</el-button>
                        <el-button class="data_button1" round @click="exportExcel">导出Excel</el-button>
                        <div class="data_qiuhe">
                            <span>筛选结果共计 : {{this.financedList.length+'条'}}</span>
                        </div>

                       </el-col>
                   </el-row>
                   <!-- <el-row class="data_t444" :gutter="0"> -->
                         <!-- <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" > -->
                              <el-table
                              border
                            class="data_t444"
                            :height='dataheight'
                            cell-class-name='datas_agin'
                            header-cell-class-name='datas_tit'
                            row-class-name='datas_text'
                            :data="financedList"
                            >
                            <el-table-column
                            prop="idCard"
                            label="需求方身份证号"
                            width="210px"
                            header-cell-style='abcd'>
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.idCard?scope.row.idCard:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="realName"
                            label="需求方姓名"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.realName?scope.row.realName:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="筹资类型"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeType?'爱心筹':'互助筹'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgeAmount"
                            label="筹资金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeAmount?scope.row.pledgeAmount:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgeAssetsOriginal"
                            label="债权金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeAssetsOriginal?scope.row.pledgeAssetsOriginal:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="coverageRate"
                            label="债权倍数"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.coverageRate?scope.row.coverageRate:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.status?scope.row.status:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="financedProgress"
                            label="筹资进度(%)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.financedProgress?(scope.row.financedProgress*100).toFixed(2):'-'}}</span>
                                    <!-- <span type="text" size="small">{{scope.row.financedProgress}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="amount"
                            label="已筹金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.amount?scope.row.amount:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="repurchaseMarkupRate"
                            label="回购加价(%)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.repurchaseMarkupRate?Math.floor(scope.row.repurchaseMarkupRate*10000)/100:'-'}}</span>
                                    <!-- <span type="text" size="small">{{scope.row.repurchaseMarkupRate?Math.floor(scope.row.repurchaseMarkupRate*10000)/100:'-'}}</span> -->
                                    <!-- <span type="text" size="small">{{Math.floor(scope.row.annualInterestRate*10000)/100}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgePeriod"
                            label="回购周期(月)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgePeriod?scope.row.pledgePeriod:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="repurchasePrice"
                            label="约定回购价(元)"
                            width="165">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.repurchasePrice?scope.row.repurchasePrice:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="currentRepurchasePrice"
                            label="当前回购价(元)"
                            width="170">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.currentRepurchasePrice?scope.row.currentRepurchasePrice:'-'}}</span>
                                    <!-- <span type="text" size="small">{{scope.row.CurrentRepurchasePrice}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createdTime"
                            label="发起日期"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.createdTime?dateFormat(scope.row.createdTime,"yyyy/MM/dd"):'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="updatedTime"
                            label="结算日期"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.updatedTime?dateFormat(scope.row.updatedTime,"yyyy/MM/dd"):'-'}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 导出专用 -->
                          <el-table
                            border
                            id="out_table"
                            v-show="false"
                            cell-class-name='datas_agin'
                            header-cell-class-name='datas_tit'
                            row-class-name='datas_text'
                            :data="financedList"
                            height='765px'
                            >
                            <el-table-column
                            prop="idCard"
                            label="需求方身份证号"
                            width="210px"
                            header-cell-style='abcd'>
                                <template slot-scope="scope">
                                     <span type="text" size="small">{{scope.row.idCard?"'"+scope.row.idCard:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="realName"
                            label="需求方姓名"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.realName?scope.row.realName:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="筹资类型"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeType?'爱心筹':'互助筹'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgeAmount"
                            label="筹资金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeAmount?scope.row.pledgeAmount:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgeAssetsOriginal"
                            label="债权金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgeAssetsOriginal?scope.row.pledgeAssetsOriginal:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="coverageRate"
                            label="债权倍数"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.coverageRate?scope.row.coverageRate:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="状态"
                            width="120">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.status?scope.row.status:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="financedProgress"
                            label="筹资进度(%)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.financedProgress?(scope.row.financedProgress*100).toFixed(2):'-'}}</span>
                                    <!-- <span type="text" size="small">{{scope.row.financedProgress}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="amount"
                            label="已筹金额(元)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.amount?scope.row.amount:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="repurchaseMarkupRate"
                            label="回购费加价(%)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.repurchaseMarkupRate?Math.floor(scope.row.repurchaseMarkupRate*10000)/100:'-'}}</span>
                                    <!-- <span type="text" size="small">{{Math.floor(scope.row.annualInterestRate*10000)/100}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="pledgePeriod"
                            label="回购周期(月)"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.pledgePeriod?scope.row.pledgePeriod:'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="repurchasePrice"
                            label="约定回购价(元)"
                            width="165">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.repurchasePrice?scope.row.repurchasePrice:'-'}}</span>
                                </template>
                            </el-table-column>
                             <el-table-column
                            prop="currentRepurchasePrice"
                            label="当前回购价(元)"
                            width="170">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.currentRepurchasePrice?scope.row.currentRepurchasePrice:'-'}}</span>
                                    <!-- <span type="text" size="small">{{scope.row.CurrentRepurchasePrice}}</span> -->
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="createdTime"
                            label="发起日期"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.createdTime?dateFormat(scope.row.createdTime,"yyyy/MM/dd"):'-'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="updatedTime"
                            label="结算日期"
                            width="160">
                                <template slot-scope="scope">
                                    <span type="text" size="small">{{scope.row.updatedTime?dateFormat(scope.row.updatedTime,"yyyy/MM/dd"):'-'}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 闭合 -->
                         <!-- </el-col> -->
                   <!-- </el-row> -->
            <!-- </el-col> -->
          </div>
           </el-row>
    </div>

</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    data(){
      return{
          value13:'',//身份证输入框
          values:[],//日期选项
          end:'',//最早结束日期
          start:'',//最晚结束日期
          financedList:[],//列表数据
          selectOne:'',//发起日期
          selectTwo:'',//结束日期
          init:[],
          fullWidth:document.documentElement.clientWidth,
          fullHeight:document.documentElement.clientHeight,
          dataheight:''
      }
    },
    methods:{
      onPick(maxDate){
        this.init[0] = maxDate[0]//kaishi
        this.init[1] = maxDate[1]//jieshu
      },
      searchEnterFun(even){
        var browser = navigator.appName;
        var userAgent = navigator.userAgent;
        var code;

          if(browser.indexOf('Internet')>-1){
            code = window.event.keyCode;
          } else if(userAgent.indexOf("Firefox")>-1){ //火狐
              code = event.which;
          } else{ //  其它浏览器
              code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
          }
      //    按Enter键的键值为13
          if ( code == 13 && this.input){
              //调用你要执行的方法
              this.getType();
          }else if(code == 13 && !this.input){
              this.commit();
          }
				// var keyCode = window.event? event.keyCode:event.which;
        //          if(keyCode == 13 && this.input){
				// 					 	this.getType();
        //          }else if(keyCode == 13 && !this.input){
        //            this.commit();
				// 				 }
      },
       exportExcel () {//导出exzel
           var timestamp =Date.parse(new Date());
           var time= 'data'+this.dateFormat(timestamp,"yyyyMMdd")+'.xlsx'
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out_table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), time)
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
          clear(){
            this.value13='',
            this.values=[],
            this.selectOne=''
            this.selectTwo=''
            this.getType()
          },

          commit(){
                    var a = this.values[0]
                    var b = this.values[1]
                  this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeFinance/financedLists',{
					'nameOrIdCard':this.value13,
                    'startDate':this.init[0],
                    'endDate':this.init[1],
                    'pledgeType':this.selectOne,
                    'status':this.selectTwo
				})
				.then(res =>{
                    if(res.data.code ==200){
                    this.financedList=res.data.data.financedList
                for( var i=0 ;i<this.financedList.length;i++){
               switch(this.financedList[i].status)
               {
                    case 1:
                        this.financedList[i].status='筹资中'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 2:
                        this.financedList[i].status='待回购'
                        break;
                    case 3:
                        this.financedList[i].status='待回购'
                        break;
                    case 4:
                        this.financedList[i].status='待回购'
                        break;
                    case 5:
                        this.financedList[i].status='未回购'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 8:
                        this.financedList[i].status='已回购2'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 9:
                        this.financedList[i].status='已回购1'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 10:
                        this.financedList[i].status='已回购3'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
               }
           }
            }else{

            }
                }).catch(err =>{

					});

          },
       getType() {
			  var _this = this;
			  this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeFinance/financedLists',{
                    'nameOrIdCard':'',
                    'startDate':'',
                    'endDate':'',
                    'isPledgeConcern':'',
                    'status':''
              })
			  .then(this.getHomeInfoSucc)
		  },
		  getHomeInfoSucc (res) {
            this.financedList = res.data.data.financedList
            this.end= this.dateFormat(res.data.data.endDate,"yyyy/MM/dd")
            this.start= this.dateFormat(res.data.data.startDate,"yyyy/MM/dd")
            this.init[1] = res.data.data.endDate
            this.init[0] = res.data.data.startDate
            this.values[0]=this.start
            this.values[1]=this.end
            console.log(res)
           for( var i=0 ;i<this.financedList.length;i++){
               switch(this.financedList[i].status)
               {
                    case 1:
                        this.financedList[i].status='筹资中'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 2:
                        this.financedList[i].status='待回购'
                        break;
                    case 3:
                        this.financedList[i].status='待回购'
                        break;
                    case 4:
                        this.financedList[i].status='待回购'
                        break;
                    case 5:
                        this.financedList[i].status='未回购'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 8:
                        this.financedList[i].status='已回购2'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 9:
                        this.financedList[i].status='已回购1'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;
                    case 10:
                        this.financedList[i].status='已回购3'
                        this.financedList[i].currentRepurchasePrice='-'
                        break;

               }
           }
           console.log('///////')
           console.log(res)
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
          // this.$refs.height_table.style.width = widths+'px'
          var that = this
          this.$refs.data_height.style.width = (this.fullWidth-230)+'px'
          this.$refs.data_height.style.height = (this.fullHeight-95)+'px'
          this.dataheight = document.documentElement.clientHeight-220
          // this.$refs.dataheight.height = (that.fullHeight-535)+'px'

          // this.$refs.data_height.height = (heights-505)+'px'
      }
},
  mounted(){
          this.getType();
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
            console.log(that.$refs.data_height.style)
            that.$refs.data_height.style.width = (that.fullWidth-230)+'px'
          },400)
        },
        fullHeight(){
          var that = this
          setTimeout(function(){
            that.$refs.data_height.style.height = (that.fullHeight-95)+'px'
            that.dataheight = document.documentElement.clientHeight-220
          },400)
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
.data_t1{
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.data_t2{
  margin-top: 8px;
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
}
.data_t3{
  margin-top: 8px;
}
.data_t3_con{
  background: #FFFFFF;
  border: 1px solid #B7C3D5;
  border-radius: 4px;
}
.data_height{
  background: #FFFFFF;
  border: 1px solid #B7C3D5;
  border-radius: 4px;
}
.data_span{
  font-family: 'ingFangSC-Regular';
  height: 22px;
  line-height: 22px;
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  margin-left: 16px;
}
.data_input2{
  width: 229px !important;
}
.data_input{
  width: 220px;
}
.data_t4{
  margin-top: 16px;
  margin-left: 8px;
  margin-bottom: 16px;
}
.data_input_1{
  width: 118px;
}
.data_button{
  margin-left: 8px;
  background: #FFFFFF;
  border: 1px solid #4D6C9B;
  border-radius: 28.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  color: #4D6C9B;
  letter-spacing: -0.39px;
}
.data_button:hover{
  background: #FFFFFF;
  border: 1px solid #4D6C9B;
  border-radius: 28.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  color: #4D6C9B;
  letter-spacing: -0.39px;
}
.data_button:focus{
  background: #FFFFFF;
  border: 1px solid #4D6C9B;
  border-radius: 28.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 16px;
  color: #4D6C9B;
  letter-spacing: -0.39px;
}
.data_button1{
background: #4D6C9B;
border-radius: 28.5px;
font-family: 'PingFangSC-Medium';
font-size: 16px;
color: #FFFFFF;
letter-spacing: -0.39px;
}
.datas_agin{
  border: 1px solid #B7C3D5;
  height: 52px;
}
.datas_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  background: #E4E8EE !important;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.datas_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  /* text-align: center !important; */
}
.data_t444{
  margin-left: -2px;
}
.data_qiuhe{
  float: right;
  height: 42px;
  margin-right: 16px;
}
.data_qiuhe>span{
  text-align: center;
  height: 42px;
  line-height: 42px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  font-weight: bold;
  letter-spacing: -0.39px;
}
.data_margin{
  margin-top: 20px;
}
.data_span_one{
  margin-top: 16px;
  /* margin-left: -50px; */
}
</style>
