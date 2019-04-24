<template>
    <div>
        <el-row class="adopt_title" :gutter="0">
            <el-col :lg="({span: 7, offset:0 })" :xl="({span: 6, offset: 0})" class="">
              <el-input
                @keyup.enter.native="searchEnterFun"
                placeholder="搜索申请人、身份证号"
                prefix-icon="el-icon-search"
                v-model="input">
              </el-input>
            </el-col>

            <!-- <el-col class="adopt_fen" :lg="({span: 7, offset:0 })"> -->

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
             <el-col :lg="({span: 24, offset:0 })" :xl="({span:24, offset: 0})" class="adopt_table">
              <el-table
              class="hidden-lg-only"
              border
              height='745px'
              cell-class-name='adopt_agin'
              header-cell-class-name='adopt_tit'
              row-class-name='adopt_text'
							:data="inviteList">
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
								prop="isConcern"
								label="申请结果"
								width="200">
                  <template slot-scope="scope">
                    <span type="text" size="small">{{scope.row.isConcern ==0?"普通":"爱心"}}</span>
                  </template>
							</el-table-column>
							<el-table-column
							prop="createdTime"
							label="通过时间"
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
                    <button @click="handeadopt(scope.row)" class="adopt_button">查看详情</button>
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
              cell-class-name='adopt_agin'
              header-cell-class-name='adopt_tit'
              row-class-name='adopt_text'
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
								prop="isConcern"
								label="申请结果"
								width="180">
                  <template slot-scope="scope">
                    <span type="text" size="small">{{scope.row.isConcern ==0?"普通":"爱心"}}</span>
                  </template>
							</el-table-column>
							<el-table-column
							prop="updatedTime"
							label="通过时间"
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
                    <button @click="handeadopt(scope.row)" class="adopt_button">查看详情</button>
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

          <b-aside class="adopt_aside" :show-header='false'  :is-show="isShowRight" ref="appo" title="Right Aside!" :show-footer="false" placement="right" :width='610' :backdrop="true" @close="isShowRight=false">
            <div class="adopt_t1" @click="sss">
              <span class="el-icon-arrow-right"></span>
              <span>爱心筹资质申请/通过</span>
            </div>

            <div class="adopt_t2">
              <span>申请结果</span>
            </div>

            <div class="adopt_t3">
              <div><span class="adopt_t3_text">申请结果:</span><span class="adopt_t3_text1">通过</span></div>
              <div v-show="adoptimgtext1">
                <span class="adopt_t3_text">筹资类型:</span>
                  <span class="adopt_el_checkbox">
                    <el-checkbox label="0" v-model="checkListOne" disabled>普通</el-checkbox>
                    <el-checkbox label="1" v-model="checkListTwo">爱心</el-checkbox>
                  </span>

                   <div class="adopt_imgs_div" @click="adoptimgs">
                      <img class="adopt_imgs" src="...\..\..\static\img\保存.svg">
                      <span class="adopt_img_span">保存</span>
                    </div>
              </div>
              <div v-show="adoptimgtext2">
                <span class="adopt_t3_text">筹资类型:</span><span class="adopt_t3_text1">{{this.isConcern+'&nbsp;&nbsp;&nbsp;&nbsp;'+this.checkListTwoo}}</span>
                   <div class="adopt_imgs_div" @click="adoptimgss">
                      <img class="adopt_imgs" src="...\..\..\static\img\修改.svg">
                      <span class="adopt_img_span">编辑</span>
                    </div>
              </div>
              <div><span class="adopt_t3_text">最低债权倍数:</span><span class="adopt_t3_text1">{{adoptlist.coverageRate?(adoptlist.coverageRate)+'倍':'-'}}</span></div>
              </div>

            <div class="adopt_t2">
                <span>对应债权信息</span>
            </div>

            <div class="adopt_t3">
              <div><span class="adopt_t3_text">投资人姓名:</span><span class="adopt_t3_text1">{{adoptlist.realName?adoptlist.realName:'-'}}</span></div>
              <div><span class="adopt_t3_text">身份证号:</span><span class="adopt_t3_text1">{{adoptlist.idCard?adoptlist.idCard:'-'}}</span></div>
              <el-row class="adopt_table1" :gutter="0">
                  <el-col :lg="({span: 24, offset:0 })" :xl="({span: 24, offset: 0})" class="">
                      <el-table
                class=""
                border
                cell-class-name='adopt_table_agin'
                header-cell-class-name='adopt_table_tit'
                row-class-name='adopt_table_text'
                :data="adoptlist.bondAssetVOList">
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

            <div class="adopt_t2">
              <span>资质申请材料</span>
            </div>

            <div class="adopt_t3">
              <div><span class="adopt_t3_text">姓名:</span><span class="adopt_t3_text1">{{adoptlist.realName?adoptlist.realName:'-'}}</span></div>
              <div><span class="adopt_t3_text">电话:</span><span class="adopt_t3_text1">{{adoptlist.mobile?adoptlist.mobile:'-'}}</span></div>
              <div><span class="adopt_t3_text">当事人姓名:</span><span class="adopt_t3_text1">{{adoptlist.litigant}}</span></div>
              <div><span class="adopt_t3_text">关系:</span><span class="adopt_t3_text1">{{adoptlist.relation}}</span></div>
              <div><span class="adopt_t3_text adopt_t3_top">原由:</span><div class="adopt_t3_text1 adopt_t3_padding">{{adoptlist.reason}}</div></div>
            </div>

            <div class="adopt_t4">
                <span class="">爱心筹证件:</span>
                  <div class="adopt_img">
                     <ul>
                        <li
                          class="adopt_t4_img"
                          :key="index"
                          @click="preview(index,l.src)"
                          v-for="(l, index) in adoptlist.concernAttachmentVOList">
                          <img class="wait_t4_img" :src="l.src" alt="">
                        </li>
                      </ul>
                  </div>
                  <div class="adopt_t4_span"></div>
            </div>

            <div class="adopt_t3">
              <div>
                <span class="adopt_t3_text">申请时间:</span><span class="adopt_t3_text1">{{adoptlist.createdTime?dateFormat(adoptlist.createdTime,"yyyy/MM/dd hh:mm:ss"):'-'}}</span></div>
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
        id:'',
        fen:true,
        ye:false,
        ruleTwo:'',
        adoptOne:true,
        adoptTwo:false,
        isCommon:'',
        isConcern:'普通',
        checkListOne:['0'],
        checkListTwo:'',
        checkListTwoo:'',
        adoptimgtext1:false,
        adoptimgtext2:true,
        total:0,
        checkList:['0'],
        inviteList:[],
        adoptlist:[]
      }
    },
    methods:{
      adoptimgs(){
          this.adoptimgtext1=false
          this.adoptimgtext2=true
          if(this.checkListTwo){
            var checkListTwo = '1'
          }else{
            var checkListTwo = '0'
          }
          this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/modifyCredit',{
						"id":this.id,
						"isCommon":1,
            "isConcern":Number(checkListTwo),
				})
				.then(res =>{
						if(res.data.code ='200'){
              alert('申请结果修改成功')
                this.sss()
                this.getadopt()
						}else{
							alert('申请结果修改失败')
						}
					}).catch(err =>{
					   alert('网络故障请稍后重试')
          });
      },
      adoptimgss(){

          this.adoptimgtext1=true
          this.adoptimgtext2=false
      },
      searchEnterFun(){
				var keyCode = window.event? event.keyCode:event.which;
                 if(keyCode == 13 && this.input){
									 	this.search();
                 }else if(keyCode == 13 && !this.input){
									 this.getadopt();
								 }
      },
      search(){//搜索
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":1,
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
      adoptSumit(){

      },
      adoptCheckOne(){
          this.adoptOne=false
          this.adoptTwo=true
      },
      adoptCheckTwo(){
          this.adoptOne=true
          this.adoptTwo=false
      },
      sss(){
          if(!this.adoptimgtext2){
            alert('请先保存修改结果')
          }else{
          this.radio ='2'
          this.checkList = ['0']
          this.adoptOne=true
          this.adoptTwo=false
          this.isShowRight=false
          }

      },
      preview(index){
        this.$imagePreview({
			images: this.adoptlist.concernAttachmentVOList.map((item,i) => {
				return item.src;
			}),
        index: index
      })
      },
      handeadopt(row){
        this.isShowRight = true
        this.fen=false
        this.ye=true
        this.id = row.id
        	this.$axios.get(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrDetails',{
						params:{
              'id':row.id
            }
				})
				.then(res =>{
              console.log(res.data.data)
              if(res.data.data.isConcern){

                this.checkListTwoo='爱心'
              }else{

                 this.checkListTwoo=''
              }
              this.adoptlist = res.data.data
					}).catch(err =>{

					});

      },
      handleCurrentChange(val) {//分页
					var _this = this
					this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":val,
            "pageSize":20,
						"status":1,
						"nameOrIdCard":'',
				})
				.then(res =>{
          console.log(res)
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
      getadopt() {
          	this.$axios.post(this.$store.state.api+'/pledgeOperate/pledgeVerify/authstrList',{
						"page":1,
            "pageSize":20,
						"status":1,
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
        this.getadopt()
    }
}
</script>

<style>
.adopt_agin{
  border: 1px solid #B7C3D5;
  height: 65px;
}
.adopt_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.adopt_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  text-align: center !important;
}
.adopt_table{
  height: 745px;
  margin-left: -2px;
  margin-top: 16px;
}
.adopt_title{
  margin-left: 16px;
  margin-top: 16px;
}

.block{
  float: right;
  margin-right: 16px;

}

.blocks{
  float: right;
  margin-right: 600px;
}
.aside .modal-card{
  width: 610px;
}
.adopt_t1{
  margin-left: 24px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.49px;
}
.adopt_t2{
  margin-left: 24px;
  margin-top: 24px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  color: #212C3C;
  letter-spacing: -0.43px;
}
.adopt_t3{
  clear: both;
  margin-top: 16px;
  margin-left: 21px;
  width: 550px;
}
.adopt_tt3{
  margin-top: 32px;
  margin-left: 40px;
  width: 550px;
}
.adopt_t3>span{
    word-wrap:break-word; word-break:normal;
}
.adopt_t3>div{
  margin-top: 16px;
}
.adopt_t3_text{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.adopt_t3_text1{
  margin-left: 10px;
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
}
.adopt_t3_padding{
  margin-left: 45px;
  margin-top: -20px;
  width: 500px;
  word-wrap:break-word; word-break:normal;
}
.adopt_t3_top{
  display: block;
}
.adopt_img{
  position: relative;
  margin-left: 80px;
  margin-top: -20px;
  width: 488px;
}
.adopt_t4_img{
  width:106px;
  height:106px;
  float: left;
  margin-left: 8px;
}
.adopt_t4{
  margin-top: 16px;
  margin-left: 21px;
  width: 550px;
  height: 106px;
}
.adopt_t4>span{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #9CA8BA;
  letter-spacing: -0.39px;
}
.adopt_t4_span{
  clear:both;
}
.adopt_table_agin{
  border: 1px solid #B7C3D5;
  height: 54px;
}
.adopt_table_tit{
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #212C3C;
  letter-spacing: -0.39px;
  background: #E4E8EE !important;
  text-align: center !important;
  border: 1px solid #B7C3D5;
}
.adopt_table_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
  /* text-align: center !important; */
}
.adopt_check{
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
.adopt_check_text{
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #9CA8BA;
  letter-spacing: -0.43px;
}
.adopt_el_checkbox{
  margin-left: -10px;
  display: inline-block;
  height: 20px;
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #212C3C;
  letter-spacing: -0.34px;
}
.adopt_submit{
  width: 554px;
  height: 54px;
  color: #FFFFFF;
  background: #4D6C9B;
  border-radius: 28.5px;
}
.adopt_imgs{
  width: 15px;
  height: 15px;
  vertical-align:text-top;
  display: inline-block;
}
.adopt_img_span{
margin-left: 5px;
height: 22px;
line-height: 22px;
font-family: 'PingFangSC-Regular';
font-size: 16px;
color: #47B55C;
letter-spacing: -0.49px;
}
.adopt_imgs_div{
  margin-left: 24px;
  display: inline-block;
}
.adopt_button{
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
.adopt_button:hover{
  color: #ffffff;
  background: #4D6C9B;
}
.adopt_button:focus{
  color: #ffffff;
  background: #4D6C9B;
}
</style>
