<template>
    <el-row style="margin-top: 30px;">
        <el-col :span="5">

        </el-col>
        <el-col :span="5">
            <el-row>
                <a href="https://github.com/ttSamoyed/Sand-Riverside">
                <img style="height:30px;" 
                src="https://img1.baidu.com/it/u=2626381969,3909549426&fm=253&fmt=auto&app=138&f=JPEG?w=588&h=401"
                alt="Fork me on GitHub" >
                </a>
            </el-row>
            <el-row style="margin-top: 20px;">
                <img alt="Static Badge" src="https://img.shields.io/badge/%E6%B2%99%E6%B2%B3%E7%95%94-%E7%94%B5%E5%AD%90%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6-blue">
            </el-row>
            <el-row style="margin-top: 20px;">
                <img alt="Static Badge" src="https://img.shields.io/badge/%E5%89%8D%E7%AB%AF%EF%BC%9A%E6%9B%BE%E6%A5%9A%E7%AB%A5%20%E6%9D%8E%E5%AE%9D%E9%94%9F%20%E9%BB%84%E5%86%8D%E5%8D%8E-pink?logo=github">
            </el-row>
            <el-row style="margin-top: 20px;">
                <img alt="Static Badge" src="https://img.shields.io/badge/%E5%90%8E%E7%AB%AF%EF%BC%9A%E7%86%8A%E7%A3%8A-yellow?logo=github">
            </el-row>
            <el-row style="margin-top: 20px;">
                <img alt="Static Badge" src="https://img.shields.io/badge/%E4%B8%8A%E7%BA%BF%E6%97%A5%E6%9C%9F-2023.11.13-green">
            </el-row>
        </el-col>
        <el-col :span="14">
            <el-timeline class="timeline">
                <el-timeline-item timestamp="2023/9/25" placement="top">
                    <el-card>
                    <h4>启动沙河畔项目</h4>
                    <el-text>李宝锟：提交需求分析文档</el-text>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/9/27" placement="top">
                    <el-card>
                    <h4>开始沙河畔项目前端开发</h4>
                    <el-text>曾楚童：创建前端仓库 @李宝锟 @黄再华</el-text>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/9/30" placement="top">
                    <el-card>
                    <h4>开始沙河畔项目后端开发</h4>
                    <el-text>熊磊：创建后端仓库</el-text>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/11/13" placement="top">
                    <el-card>
                    <h4>沙河畔项目最终验收</h4>
                    <el-text></el-text>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-col>
    </el-row>
  </template>

<style>
.timeline{
    margin-top: 50px;
    width: 80%;
}
</style>