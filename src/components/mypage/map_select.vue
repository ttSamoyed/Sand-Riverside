<template>
    <div class="select">
      <el-row>
           <el-form :model="queryParams" inline  label-width="80px" >
              <el-form-item label="省份" prop="province">
                <el-select v-model="provinceValue" :placeholder=p @change="selectProvince" style="width: 120px; color: #000000;" >
                   <el-option
                         v-for="(item,index) of provincearr"
                         :key="index"          
                         :label="item.name"
                         :value="item.id"
                     ></el-option>
                   </el-select>
            </el-form-item>            
            <el-form-item label="城市" prop="city">
                    <el-select v-model="cityValue" :placeholder=c @change="selectCity" style="width: 120px">
                        <el-option 
                        v-for="(item,index) of cityarr" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                    </el-select>
           </el-form-item>
          <el-form-item label="区县" prop="country">
              <el-select v-model="regionValue" :placeholder=r @change="selectCountry"  style="width: 120px">
                    <el-option
                        v-for="(item,index) of regionarr"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
          </el-form-item>
           </el-form>
      </el-row>
    </div>
  </template>

  <script> 
  import { province } from '@/utils/map'
  import { defineProps, defineExpose } from 'vue'
  const props = defineProps({
  address: String
})

  export default {
      
    created () {
      this.provincearr = province
    },
    data () {
      return {
            province: [],
            cityarr: [],
            regionarr: [],
            provinceValue: '',
            cityValue: '',
            regionValue: ''
      }
    },
    props :({
  p: String,
  c:String,
  r:String
}),
    mounted () {  console.log("address", this.address)},
    methods: {
     selectProvince (id) {
              this.cityarr = [];
              this.regionarr = [];
              this.cityValue = '';
              this.regionValue = '';
              for (let item of this.provincearr) {
                  if (id == item.id) {
                        console.log(item.name, '-所选省份')
                      this.provinceValue = item.name
                      this.cityarr = item.children
                  }
              }
          },
          selectCity (id) {
              this.regionarr = [];
              this.regionValue = '';
              for (let item of this.cityarr) {
                  if (id == item.id) {
                        console.log(item.name, '-所选城市')
                        this.cityValue = item.name
                      this.regionarr = item.children
                  }
              }
          },
          selectCountry(id){
              this.regionValue = '';
              for (let item of this.regionarr) {
                  if (id == item.id) {
                        console.log(item.name, '-所选区域')
                        this.regionValue = item.name
                  }
              }
          },
          getSelectedValue() {
            return {
                province: this.provinceValue,
                city: this.cityValue,
                region: this.regionValue
            }
        },
      }
      
      
    }
   

  </script>
<style scoped>
.select{
    margin-top: 25px;
    margin-bottom: -15px;
}
.deep_color .el-select__dropdown__item {  
  color:#000000
}  
</style>