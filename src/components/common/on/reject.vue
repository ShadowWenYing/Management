<template>
    <div>
        <el-row class="reject_title" :gutter="0">
            <el-col :lg="({span: 7, offset:0 })" :xl="({span: 6, offset: 0})" class="">
              <el-input
                @keyup.enter.native="searchEnterFun"
                placeholder="搜索申请人、身份证号"
                prefix-icon="el-icon-search"
                v-model="input">
              </el-input>
            </el-col>

            <!-- <el-col class="reject_fen" :lg="({span: 7, offset:0 })"> -->

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
             <el-col :lg="({span: 24, offset:0 })" :xl="({span:24, offset: 0})" class="reject_table">
              <el-table
              class="hidden-lg-only"
              border
              height='745px'
              cell-class-name='reject_agin'
              header-cell-class-name='reject_tit'
              row-class-name='reject_text'
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
							prop="updatedTime"
							label="驳回时间"
							width="200">
                <template slot-scope="scope">
                  <span type="text" size="small">{{dateFormat(scope.row.updatedTime,"yyyy/MM/dd hh:mm:ss")}}</span>
                </template>
							</el-table-column>
							<el-table-column
							prop="mobile"
							label="操作"
							width="160">
                <template slot-scope="scope">
                    <button @click="handereject(scope.row)" class="reject_button">查看详情</button>
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
              cell-class-name='reject_agin'
              header-cell-class-name='reject_tit'
              row-class-name='reject_text'
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
							prop="updatedTime"
							label="驳回时间"
							width="180">
                <template slot-scope="scope">
                  <span type="text" size="small">{{dateFormat(scope.row.updatedTime,"yyyy/MM/dd hh:mm:ss")}}</span>
                </template>
							</el-table-column>
							<el-table-column
							prop="mobile"
							label="操作"
							width="120">
                <template slot-scope="scope">
                    <button @click="handereject(scope.row)" class="reject_button">查看详情</button>
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
          <b-aside class="reject_aside" :show-header='false'  :is-show="isShowRight" ref="appo" title="Right Aside!" :show-footer="false" placement="right" :width='610' :backdrop="true" @close="isShowRight=false">
            <div class="reject_t1" @click="sss">
              <span class="el-icon-arrow-right"></span>
              <span>爱心筹资质申请/驳回</span>
            </div>

            <div class="reject_t2">
              <span>申请结果</span>
            </div>


            <div class="reject_t3">
              <div><span class="reject_t3_text">申请结果:</span><span class="reject_t3_text1">{{'驳回'}}</span></div>
              <div><span class="reject_t3_text reject_t3_top">驳回原因:</span><div class="reject_t3_text1 reject_t3_padding">{{rejectString.refuseReason}}</div></div>
            </div>

            <div class="reject_t2">
                <span>对应债权信息</span>
            </div>

            <div class="reject_t3">
              <div><span class="reject_t3_text">投资人姓名:</span><span class="reject_t3_text1">{{rejectString.realName?rejectString.realName:'-'}}</span></div>
              <div><span class="reject_t3_text">身份证号:</span><span class="reject_t3_text1">{{rejectString.idCard?rejectString.idCard:'-'}}</span></div>
              <el-row class="reject_table1" :gutter="0">
                  <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                      <el-table
                class=""
                border
                cell-class-name='reject_table_agin'
                header-cell-class-name='reject_table_tit'
                row-class-name='reject_table_text'
                :data="rejectString.bondAssetVOList">
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

            <div class="reject_t2">
              <span>资质申请材料</span>
            </div>

            <div class="reject_t3">
              <div><span class="reject_t3_text">姓名:</span><span class="reject_t3_text1">{{rejectString.realName?rejectString.realName:'-'}}</span></div>
              <div><span class="reject_t3_text">电话:</span><span class="reject_t3_text1">{{rejectString.mobile?rejectString.mobile:'-'}}</span></div>
              <div><span class="reject_t3_text">当事人姓名:</span><span class="reject_t3_text1">{{rejectString.litigant}}</span></div>
              <div><span class="reject_t3_text">关系:</span><span class="reject_t3_text1">{{rejectString.relation}}</span></div>
              <div><span class="reject_t3_text reject_t3_top">原由:</span><div class="reject_t3_text1 reject_t3_paddings">{{rejectString.reason}}</div></div>
            </div>

            <div class="reject_t4">
                <span class="">爱心筹证件:</span>
                  <div class="reject_img">
                     <ul>
                        <li
                          class="reject_t4_img"
                          :key="index"
                          @click="preview(index,l.src)"
                          v-for="(l, index) in rejectString.concernAttachmentVOList">
                          <img class="reject_t4_img" :src="l.src" alt="">
                        </li>
                      </ul>
                  </div>
            </div>
            <div class="reject_t3">
              <div class="reject_t3ss"><span class="reject_t3_text">申请时间:</span><span class="reject_t3_text1">{{rejectString.createdTime?dateFormat(rejectString.createdTime,"yyyy/MM/dd hh:mm:ss"):'-'}}</span>
                </div>
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
        rejectOne:true,
        rejectTwo:false,
        fen:true,
        ye:false,
        checkListOne:'',
        checkListTwo:'',
        radio:'2',
        total:0,
        checkList:['0'],
        inviteList:[],
        rejectString:[]
      }
    },
    methods:{
      searchEnterFun(){
				var keyCode = window.event? event.keyCode:event.which;
                 if(keyCode == 13 && this.input){
									 	this.search();
                 }else if(keyCode == 13 && !this.input){
									 this.getreject();
								 }
      },
      search(){//搜索
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":2,
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
      rejectSumit(){
        console.log(this.checkListOne)
        console.log(this.checkListTwo)
      },
      rejectCheckOne(){
          this.rejectOne=false
          this.rejectTwo=true
      },
      rejectCheckTwo(){
          this.rejectOne=true
          this.rejectTwo=false
      },
      sss(){
          this.radio ='2'
          this.checkList = ['0']
          this.rejectOne=true
          this.rejectTwo=false
          this.isShowRight=false
      },
      preview(index){
        this.$imagePreview({
			images: this.rejectString.concernAttachmentVOList.map((item,i) => {
				return item.src;
			}),
        index: index
      })
      },
      handereject(row){
        this.isShowRight = true
        this.fen=false
        this.ye=true
        	this.$axios.get(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrDetails',{
						params:{
              'id':row.id
            }
				})
				.then(res =>{
          console.log(res)
              this.rejectString = res.data.data
							// this.total=res.data.data.count;
					}).catch(err =>{

					});

      },
      handleCurrentChange(val) {//分页
					var _this = this
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":val,
            "pageSize":20,
						"status":2,
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
      getreject() {
          	this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":2,
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
          }
      }
    },
    mounted(){
        this.getreject()
    }
}
</script>

<style>
.reject_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}
.reject_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.reject_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  text-align: center !important;
}
.reject_table{
  height: 745px;
  margin-left: -2px;
  margin-top: 16px;
}
.reject_title{
  margin-left: 16px;
  margin-top: 16px;
}
.reject_t3ss{
  margin-top: 16px;
}
.reject_button{
  width: 76px;
  height: 28px;
  border: 1px solid #4D6C9B;
  background: #FFFFFF;
  border-radius: 14.5px;
  font-family: 'PingFangSC-Medium';
  font-size: 14px;
  color: #4D6C9B;
  letter-spacing: -0.34px;
  text-align: center;
}
.reject_button:hover{
  color: #ffffff;
  background: #4D6C9B;
}
.reject_button:focus{
  color: #ffffff;
  background: #4D6C9B;
}
.block{
  float: right;
  margin-right: 16px;
}
.aside .modal-card{
  width: 610px;
}
.reject_t1{
  margin-left: 24px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.49px;
}
.reject_t2{
  margin-left: 24px;
  margin-top: 24px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.reject_t3{
  clear: both;
  margin-top: 16px;
  margin-left: 21px;
  width: 550px;
}
.reject_tt3{
  margin-top: 32px;
  margin-left: 40px;
  width: 550px;
}
.reject_t3>span{
    word-wrap:break-word; word-break:normal;
}
.reject_t3>div{
  margin-top: 16px;
}
.reject_t3_text{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.reject_t3_text1{
  margin-left: 10px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
}
.reject_t3_padding{
  margin-left: 80px;
  margin-top: -22px;
  width: 500px;
  word-wrap:break-word;
  word-break:normal;
}
.reject_t3_paddings{
  margin-left: 45px;
  margin-top: -20px;
  width: 500px;
  word-wrap:break-word; word-break:normal;
}

.reject_t3_top{
  display: block;
}
.reject_img{
  position: relative;
  margin-left: 80px;
  margin-top: -20px;
  width: 488px;
}
.reject_t4_img{
  float: left;
  width:106px;
  height:106px;
  margin-left: 8px;
}
.reject_t4{
  margin-top: 16px;
  margin-left: 21px;
  margin-bottom: 16px;
  width: 550px;
  height: 108px;
}
.reject_t4>span{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.reject_t4_span{
  clear:both;
  position: relative;
  margin-top: 16px;
  margin-bottom: 40px;

}
.reject_table_agin{
  border: 1px solid #B7C3D5;
  height: 54px;
}
.reject_table_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  background: #E4E8EE !important;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.reject_table_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  /* text-align: center !important; */
}
.reject_check{
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
.reject_check_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #9CA8BA;
  letter-spacing: -0.43px;
}
.reject_el_checkbox{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
}
.reject_submit{
  width: 554px;
  height: 54px;
  color: #FFFFFF;
  background: #4D6C9B;
  border-radius: 28.5px;
}
</style>
