<template>
    <div class="messagebox" v-if="n.actor">
        <el-row>
        <el-col :span="4">
            <el-avatar v-if="n.actor.avatar!=null" :size="40" :src="avatar"/>
            <el-avatar v-else :size="40"><el-icon><Avatar /></el-icon></el-avatar>
        </el-col>
        <el-col :span="20">
            <el-row>
            <el-space wrap>
                <span style="zoom:0.8;font-weight: 500;">{{ n.actor.username }}</span>
                <el-divider direction="vertical"></el-divider>
                <el-text style="zoom:0.8; font-weight: 400;">{{ n.actor.status }}</el-text>
            </el-space>
            </el-row>
            <el-row>
            <el-space wrap>
                <span style="zoom:0.8;font-size:xx-small;">{{ n.description }}</span>
                <el-text type="info" @click="router.push({name:'post',params: {postid:n.target.postID}})"
                style="zoom:0.8;font-size:xx-small;">{{ n.target.title }}</el-text>
            </el-space>
            </el-row>
        </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
const props = defineProps({
    n: Object, // 指定p属性的类型
});
const { n } = props;
const avatar = computed(() => {
    return 'http://124.222.42.111:8000' + n.actor.avatar
});
const router = useRouter();
const date = new Date(n.timestamp)
const readableDate = date.toLocaleString()

</script>