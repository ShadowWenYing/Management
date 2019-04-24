<template>
    <div>
        <el-row class="wait_title" :gutter="0">
            <el-col :lg="({span: 7, offset:0 })" :xl="({span: 6, offset: 0})" class="">
              <el-input
                @keyup.enter.native="searchEnterFun"
                placeholder="搜索申请人、身份证号"
                prefix-icon="el-icon-search"
                v-model="input">
              </el-input>
            </el-col>

            <!-- <el-col class="wait_fen" :lg="({span: 7, offset:0 })"> -->
                  <div class="block"  ref='offsets' v-show="fen" style="display:block">
                <el-pagination
                 @current-change="handleCurrentChange"
                  :page-size="20"
                  prev-text=' '
                  next-text=' '
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>

              <div class="blocks"  ref='offsets' v-show="ye" style="display:block">
                <el-pagination
                 @current-change="handleCurrentChange"
                  :page-size="20"
                  prev-text=' '
                  next-text=' '
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>

            <!-- </el-col> -->
        </el-row>

        <el-row :gutter="0">
             <el-col :lg="({span: 24, offset:0 })" :xl="({span:24, offset: 0})" class="wait_table">
              <el-table
              class="hidden-lg-only"
              border
               height='740px'
              cell-class-name='wait_agin'
              header-cell-class-name='wait_tit'
              row-class-name='wait_text'
							:data="inviteList"
							style="width:100%">
							<el-table-column
							  prop="num"
								label="序号"
								width="110">
							</el-table-column>
							<el-table-column
								prop="name"
								label="申请人"
								width="130">
							</el-table-column>
              <el-table-column
								prop="idCard"
								label="身份证号"
								width="180">
							</el-table-column>
							<el-table-column
								prop="isPledgeConcern"
								label="申请筹资类型"
								width="200">
                  <template slot-scope="scope">
                    <span type="text" size="small">{{scope.row.isPledgeConcern ==0?"普通":"爱心"}}</span>
                  </template>
							</el-table-column>
							<el-table-column
							prop="createdTime"
							label="申请时间"
							width="200">
                <template slot-scope="scope">
                  <span type="text" size="small">{{dateFormat(scope.row.createdTime,"yyyy/MM/dd hh:mm:ss")}}</span>
                </template>
							</el-table-column>
							<el-table-column
							prop="mobile"
							label="操作"
							width="160">
                <template slot-scope="scope">
                    <button @click="handeWait(scope.row)" class="wait_button">待开通</button>
                </template>
							</el-table-column>
							<el-table-column
							prop="remark"
							label=""
							>
							</el-table-column>
							</el-table>

            <el-table
              class="hidden-xl-only"
              border
              height='480px'
              cell-class-name='wait_agin'
              header-cell-class-name='wait_tit'
              row-class-name='wait_text'
							:data="inviteList"
							style="width:1645px">
							<el-table-column
								prop="num"
								label="序号"
								width="100">
							</el-table-column>
							<el-table-column
								prop="name"
								label="申请人"
								width="120">
							</el-table-column>
              <el-table-column
								prop="idCard"
								label="身份证号"
								width="180">
							</el-table-column>
							<el-table-column
								prop="isPledgeConcern"
								label="申请筹资类型"
								width="180">
                  <template slot-scope="scope">
                    <span type="text" size="small">{{scope.row.isPledgeConcern ==0?"普通":"爱心"}}</span>
                  </template>
							</el-table-column>
							<el-table-column
							prop="createdTime"
							label="申请时间"
							width="180">
                <template slot-scope="scope">
                  <span type="text" size="small">{{dateFormat(scope.row.createdTime,"yyyy/MM/dd hh:mm:ss")}}</span>
                </template>
							</el-table-column>
							<el-table-column
							prop="mobile"
							label="操作"
							width="120">
                <template slot-scope="scope">
                    <button @click="handeWait(scope.row)" class="wait_button">待开通</button>
                </template>
							</el-table-column>
							<el-table-column
							prop="remark"
							label=""
              width='200px'
							>
							</el-table-column>
					  </el-table>
            </el-col>
        </el-row>
          <b-aside class="wait_aside" :show-header='false'  :is-show="isShowRight" ref="appo" title="Right Aside!" :show-footer="false" placement="right" :width='610' :backdrop="true" @close="isShowRight=false">
            <div class="wait_t1" @click="sss">
              <span class="el-icon-arrow-right"></span>
              <span>爱心筹资质申请/待查看</span>
            </div>

            <div class="wait_t2">
              <span>资质申请材料</span>
            </div>

            <div class="wait_t3">
              <div><span class="wait_t3_text">姓名:</span><span class="wait_t3_text1">{{waitString.realName?waitString.realName:'-'}}</span></div>
              <div><span class="wait_t3_text">电话:</span><span class="wait_t3_text1">{{waitString.mobile?waitString.mobile:'-'}}</span></div>
              <div><span class="wait_t3_text">当事人姓名:</span><span class="wait_t3_text1">{{waitString.litigant}}</span></div>
              <div><span class="wait_t3_text">关系:</span><span class="wait_t3_text1">{{waitString.relation}}</span></div>
              <div><span class="wait_t3_text wait_t3_top">原由:</span><div class="wait_t3_text1 wait_t3_padding">{{waitString.reason}}</div></div>
            </div>

            <div class="wait_t4">
                <span class="">爱心筹证件:</span>
                  <div class="wait_img">
                     <ul>
                        <li
                          class="wait_t4_img"
                          :key="index"
                          @click="preview(index,l.src)"
                          v-for="(l, index) in waitString.concernAttachmentVOList">
                          <img class="wait_t4_img" :src="l.src" alt="">
                        </li>
                      </ul>
                  </div>
                  <div class="wait_t4_span">
                     <span class="wait_t3_text">申请时间:</span><span class="wait_t3_text1">{{waitString.createdTime?dateFormat(waitString.createdTime,"yyyy/MM/dd hh:mm:ss"):'-'}}</span>
                  </div>
            </div>

            <div class="wait_t2">
                <span>对应债权信息</span>
            </div>

            <div class="wait_t3">
              <div><span class="wait_t3_text">投资人姓名:</span><span class="wait_t3_text1">{{waitString.realName?waitString.realName:'-'}}</span></div>
              <div><span class="wait_t3_text">身份证号:</span><span class="wait_t3_text1">{{waitString.idCard?waitString.idCard:'-'}}</span></div>
              <el-row class="wait_table1" :gutter="0">
                  <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                      <el-table
                class=""
                border
                cell-class-name='wait_table_agin'
                header-cell-class-name='wait_table_tit'
                row-class-name='wait_table_text'
                :data="waitString.bondAssetVOList">
                <el-table-column
                prop="category"
                label="债权类型"
                width="274px">
                     <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.category?scope.row.category:'-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="currentDept"
                label="当前持有有效债权(元)"
                width="275px">
                    <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.currentDept?scope.row.currentDept:'-'}}</span>
                    </template>
                </el-table-column>
            </el-table>
                  </el-col>
              </el-row>
            </div>

            <div class="wait_t2">
                <span>信用状况</span><span class="wait_t3_text">(展示投资人相关的历史回购情况)</span>
            </div>

            <div class="wait_t3">
              <el-row class="wait_table1" :gutter="0">
                  <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                      <el-table
                class=""
                border
                cell-class-name='wait_table_agin'
                header-cell-class-name='wait_table_tit'
                row-class-name='wait_table_text'
                :data="waitString.pledgeFormVOList">
                <el-table-column
                prop="updateTime"
                label="邀约单结算日期"
                width="160px">
                    <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.updateTime?dateFormat(scope.row.updateTime,"yyyy年MM月dd日"):'-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="bondAccountIn"
                label="姓名"
                width="98px">
                    <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.bondAccountIn?scope.row.bondAccountIn:'-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="pledgeAmount"
                label="筹资金额(元)"
                width="156px">
                    <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.pledgeAmount?scope.row.pledgeAmount:'-'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="回购状态"
                width='135px'>
                    <template slot-scope="scope">
                        <span type="text" size="small">{{scope.row.status?scope.row.status:'-'}}</span>
                    </template>
                </el-table-column>
            </el-table>
                  </el-col>
              </el-row>
            </div>

            <div class="wait_t2">
                <span>申请历史</span>
            </div>

            <div class="wait_t3">
              <el-row class="wait_table1" :gutter="0">
                  <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                      <el-table
                class=""
                border
                cell-class-name='wait_table_agin'
                header-cell-class-name='wait_table_tit'
                row-class-name='wait_table_text'
                :data="waitString.verifyVOList">
                <el-table-column
                    prop="realName"
                    label="申请人"
                    width="120px">
                        <template slot-scope="scope">
                            <span type="text" size="small">{{scope.row.realName?scope.row.realName:'-'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="筹资类型"
                    prop="isPledgeConcern"
                    width="118px">
                        <template slot-scope="scope">
                                <span type="text" size="small">{{scope.row.isPledgeConcern ==0?"普通":"爱心"}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column
                    prop="createdTime"
                    label="申请时间"
                    width="180px">
                        <template slot-scope="scope">
                                <span type="text" size="small">{{scope.row.createdTime?dateFormat(scope.row.createdTime,"yyyy/MM/dd hh:mm:ss"):'-'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="申请结果"
                    prop="texts"
                    width="130px">
                    <template slot-scope="scope">
                                <!--@click="his(scope.$index, scope.row)" 按钮弹窗时间-->
                        <span type="text" size="small">{{scope.row.status?(scope.row.status ==2?"驳回":"通过"):'-'}}</span>
                    </template>
                    </el-table-column>
            </el-table>
                  </el-col>
              </el-row>
            </div>

            <div class="wait_t2">
                <span>申请结果</span>
                <el-radio class="wait_check" @change='waitCheckOne' v-model="radio" label="2">驳回</el-radio>
                <el-radio class="wait_check" @change='waitCheckTwo' v-model="radio" label="1">通过</el-radio>
            </div>

            <div class="wait_tt3">
              <el-row class="wait_table1" :gutter="0" v-show="waitOne">
                  <el-col :lg="({span: 4, offset:0 })" :xl="({span: 4, offset: 0})" class="">
                    <span class="wait_t3_text1">筹资类型:</span>
                  </el-col>
                  <el-col :lg="({span: 7, offset:0 })" :xl="({span: 12, offset: 0})" class="">
                    <el-checkbox-group class="wait_el_checkbox" v-model="checkList">
                        <el-checkbox label="0" disabled>普通</el-checkbox>
                        <el-checkbox label="1">爱心</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
              </el-row>

              <el-row class="wait_table1" :gutter="0" v-show="waitTwo">
                  <el-col :lg="({span: 22, offset:0 })" :xl="({span: 22, offset: 0})" class="">
                       <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 5}"
                        placeholder="请输入驳回原因"
                        v-model="ruleTwo">
                        </el-input>
                  </el-col>
              </el-row>
                <span v-show="waitOne" class="wait_check_text">注:最低债权倍数默认为1.5倍，爱心筹资额度默认为100万元，普通筹资额度不设限制</span>
            </div>

            <div class="wait_t2">
                <el-button @click="waitSumit" class="wait_submit" v-show="waitOne">保存</el-button>
                <el-button @click="waitSumits" class="wait_submit" v-show="waitTwo">保存</el-button>
            </div>
          </b-aside>

    </div>
</template>

<script>
export default {
     data(){
      return {
        isShowRight:false,
        input:'',
        ruleTwo:'',
        waitOne:true,
        fen:true,
        ye:false,
        waitTwo:false,
        id:'',
        checkListOne:'',
        checkListTwo:'',
        radio:'1',
        total:0,
        stat:'',
        checkList:['0'],
        inviteList:[],
        waitString:[]
      }
    },
    methods:{
      searchEnterFun(){
				var keyCode = window.event? event.keyCode:event.which;
                 if(keyCode == 13 && this.input){
									 	this.search();
                 }else if(keyCode == 13 && !this.input){
									 this.getWait();
								 }
      },
      search(){//搜索
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":0,
						"nameOrIdCard":this.input,
				})
				.then(res =>{
						if(res.data.code ='200'){
							this.inviteList=res.data.data.pledgeVerifyLists;
							this.total=res.data.data.count;

						}else{
							alert('数据获取失败')
						}
					}).catch(err =>{
					   alert('网络故障请稍后重试')
          });
      },
      waitSumits(){
        if(this.ruleTwo){
            this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/verifyOperate',{
						"id":this.id,
            "status":this.radio,
            "coverageRate":1.5,
						"isCommon":1,
            "isConcern":1,
            "reason":this.ruleTwo
				})
				.then(res =>{
              this.sss()
              this.getWait()
					}).catch(err =>{

					});
        }else{
          alert('驳回原因为必填参数！')
        }
      },
      waitSumit(){
        if(this.checkList[1] == 1){
          this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/verifyOperate',{
						"id":this.id,
            "status":this.radio,
            "coverageRate":1.5,
						"isCommon":1,
            "isConcern":1,
            "reason":this.ruleTwo
				})
				.then(res =>{
              this.sss()
              this.getWait()
					}).catch(err =>{

					});
        }else{
          alert('请选择筹资类型')
        }

      },
      waitCheckOne(){
          this.waitOne=false
          this.waitTwo=true
      },
      waitCheckTwo(){
          this.waitOne=true
          this.waitTwo=false
      },
      sss(){
          this.radio ='1'
          this.checkList = ['0']
          this.waitOne=true
          this.waitTwo=false
          this.isShowRight=false
      },
      preview(index){
        this.$imagePreview({
			images: this.waitString.concernAttachmentVOList.map((item,i) => {
				return item.src;
			}),
        index: index
      })
      },
      handeWait(row){
        this.isShowRight = true
        this.fen=false
        this.ye=true
        this.id=row.id
        	this.$axios.get(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrDetails',{
						params:{
              'id':row.id
            }
				})
				.then(res =>{
              this.waitString = res.data.data
							// this.total=res.data.data.count;
					}).catch(err =>{

					});

      },
      handleCurrentChange(val) {//分页
					var _this = this
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":val,
            "pageSize":20,
						"status":0,
						"nameOrIdCard":this.searchInput,
				})
				.then(res =>{
						if(res.data.code ='200'){
							this.inviteList=res.data.data.pledgeVerifyLists;
							this.total=res.data.data.count;
						}else{
							alert('数据获取失败')
						}
					}).catch(err =>{

					});
			},
      getWait() {
          	this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":0,
						"nameOrIdCard":'',
				})
				.then(res =>{
							this.inviteList=res.data.data.pledgeVerifyLists;
              this.total=res.data.data.count;
              this.input = ''
					}).catch(err =>{

					});
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
            }
    },
    watch:{
      isShowRight(){
          if(this.isShowRight){
             this.fen=false
              this.ye=true
          }else{
              this.fen=true
              this.ye=false
              this.radio ='1'
              this.waitOne=true
              this.waitTwo=false
              this.checkList = ['0']
          }
      },
    },
    mounted(){
        this.getWait()
    }
}
</script>

<style>
.wait_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}
.wait_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.wait_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  text-align: center !important;
}
.wait_table{
  height: 745px;
  margin-left: -2px;
  margin-top: 16px;
}
.wait_title{
  margin-left: 16px;
  margin-top: 16px;
}
.wait_button{
  width: 76px;
  height: 28px;
  border: 1px solid #47B55C;
  border-radius: 14.5px;
  background: #ffffff;
  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  color: #47B55C;
  letter-spacing: -0.34px;
}
.wait_button:hover{
  background: #47B55C;
  border-radius: 14.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: -0.34px;
}
.wait_button:focus{
  background: #47B55C;
  color: #FFFFFF;
}
.block{
  float: right;
  margin-right: 16px;
}
.aside .modal-card{
  width: 610px;
}
.wait_t1{
  margin-left: 24px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.49px;
}
.wait_t2{
  margin-left: 24px;
  margin-top: 24px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.wait_t3{
  margin-top: 16px;
  margin-left: 21px;
  width: 550px;
}
.wait_tt3{
  margin-top: 32px;
  margin-left: 40px;
  width: 550px;
}
.wait_t3>span{
    word-wrap:break-word; word-break:normal;
}
.wait_t3>div{
  margin-top: 16px;
}
.wait_t3_text{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.wait_t3_text1{
  margin-left: 10px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
}
.wait_t3_padding{
  margin-left: 45px;
  margin-top: -20px;
  width: 500px;
  word-wrap:break-word; word-break:normal;
}
.wait_t3_top{
  display: block;
}
.wait_img{
  position: relative;
  margin-left: 80px;
  margin-top: -20px;
  width: 488px;
}
.wait_t4_img{
  width:106px;
  height:106px;
  float: left;
  margin-left: 8px;
}
.wait_t4{
  margin-top: 16px;
  margin-left: 21px;
  width: 550px;
}
.wait_t4>span{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.wait_t4_span{
  clear:both;
}
.wait_table_agin{
  border: 1px solid #B7C3D5;
  height: 54px;
}
.wait_table_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  background: #E4E8EE !important;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.wait_table_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  /* text-align: center !important; */
}
.wait_check{
  display: block;
  float: right;
  margin-right: 20px;
}
.el-radio__label{
  height: 36px;

  font-family: 'PingFangSC-Regular';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.wait_check_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #9CA8BA;
  letter-spacing: -0.43px;
}
.wait_el_checkbox{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
}
.wait_submit{
  width: 554px;
  height: 54px;
  color: #FFFFFF;
  background: #4D6C9B;
  border-radius: 28.5px;
}
</style>
