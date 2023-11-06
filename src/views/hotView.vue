<template>
    <div class="center">
    <el-row style="padding-left:40px; width: 100%;">
      <el-col
        v-for="(o) in 3"
        :key="o"
        :span="5"
        :offset="2"
      >
        <cover_card></cover_card>
      </el-col>
    </el-row>
    </div>
    
  </template>
  
  <script setup>
  import {ref} from "vue"
  import cover_card from "@/components/post/cover_card.vue"
  import DataService from "../components/services/DataService";
  const loading = ref(true);

  // const load = async () => {
  //   loading.value = true;
  //   const response = await DataService;
  // }

  </script>
  
  <style>
  .time {
    font-size: 12px;
    color: #999;
  }

  .center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    min-height: auto;
  }
  
  .image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display:block;
  }
  </style>
  