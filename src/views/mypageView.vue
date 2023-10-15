<template>
    <div class="center">
        <el-row>
            <usr_card></usr_card>
        </el-row>
    </div>
    <div class="center">
        <el-row>
            <top_nav @post="label='1'" @interaction="label='2'"></top_nav>
        </el-row>
    </div>
    <div class="center">
        <div class="main">
            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                <div v-if="label=='1'">
                    <post_card></post_card>
                    <post_card></post_card>
                    <post_card></post_card>
                </div>  
                <div v-if="label=='2'">
                    <message_card></message_card>
                    <message_card></message_card>
                    <message_card></message_card>
                    <message_card></message_card>
                    <message_card></message_card>
                    <message_card></message_card>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import usr_card from '../components/mypage/usr_card.vue';
import top_nav from '../components/mypage/top_nav.vue'
import post_card from '../components/mypage/post_card.vue';
import message_card from '../components/mypage/message_card.vue';
import { ref } from 'vue';
const label = ref('1')

</script>

<style scoped>
.center{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main{
    margin-top: 10px;
    width: 900px;
    height: 485px;
    border: 1px solid #b4b2b251;
    border-radius: 5px;
}

.infinite-list {
  height: 485px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

</style>