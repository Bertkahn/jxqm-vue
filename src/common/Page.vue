<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> {{title ? title : $route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title']
    }

</script>

<style scoped>
    .table{
        width: 100%;
        font-size: 14px;
    }
</style>
