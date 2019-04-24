import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultuser = 'admins'
try{
    if(localStorage.user){
        defaultuser = localStorage.user
    }
} catch(e){

}

export default new Vuex.Store({
    state:{
        user:defaultuser,
        api:'https://pledge.hejiajinrong.com',
          //api:'http://192.168.33.90:10092',
          //api:'http://pledge.xunji.info',
          Awidth:'',
          Aheight:''
    },
    actions:{
        changeUser(ctx,user){
            ctx.commit('changeUser',user)
        },
        changeWI(wi,Awidth){
            wi.commit('changeWI',Awidth)
        },
        changeHI(wi,Aheight){
          wi.commit('changeHI',Aheight)
      }
    },
    mutations:{
        changeUser (state,user){
            state.user = user
            try{
                localStorage.user = user
            }catch(e) {

            }
        },
        changeWI(state,Awidth){
          state.Awidth = Awidth
        },
        changeHI(state,Aheight){
          state.Aheight = Aheight
        }
    }
})
