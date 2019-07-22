<!--
使用说明
 <div slot="key" slot-scope="data">{{data.row.key}}</div>
 reload,reset
{
isPage,
url,
primaryKey,
sort,
sortType,
filterList
searchList, {key: item.key, symbol: value.symbol ? value.symbol : '=', value: value.value}  随动的搜索条件
staticSearch, 固定的搜索条件
param: {
    id: demo
},
list:[
    title,
    key,
    sortable,
    align:left,right,
    search:{
        type: 'text','time','select'
        symbol: between, like, .....
        cat: null, '%?%' , '%?', '?%'--like
        list: [{name, value}]--select
    }
    filter:[
        text,
        value: 空格隔开symbol和value，-隔开数组, '>= 1' 'in 1-2-3-4'
    ]
]

}


-->

<template>
    <div>
        <!--搜索-->
        <div v-if="showSearch && needSearchList && needSearchList.length">
            <div class="table-search">
                <div style="margin-right: 20px;margin-bottom: 10px;width: 400px" v-for="(item,index) in needSearchList" :key="index">
                    <div style="width: 100px;display: inline-block">{{item.title}}: </div>
                    <template v-if="item.type === 'time'">
                        <el-date-picker v-if="item.symbol !== 'between'" style="width: 200px" v-model="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        <template v-if="item.symbol === 'between'">
                            <!--<el-date-picker style="width: 180px" v-model="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>-->
                            <el-date-picker style="width: 130px" v-model="item.value1" type="datetime" placeholder="选择日期时间"></el-date-picker> - <el-date-picker style="width: 130px" v-model="item.value2" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </template>
                    </template>
                    <template v-if="!item.type || item.type === 'text'">
                        <el-input v-if="item.symbol !== 'between'" style="display: inline-block;width: 180px" type="text" v-model="item.value" clearable></el-input>
                        <template v-if="item.symbol === 'between'">
                            <el-input style="display: inline-block;width:80px" type="text" v-model="item.value1" clearable></el-input> - <el-input style="display: inline-block;width: 80px" type="text" v-model="item.value2" clearable></el-input>
                        </template>
                    </template>
                    <el-select v-if="item.type === 'select'" style="display: inline-block;width: 180px" clearable v-model="item.value" placeholder="请选择">
                        <el-option v-for="jtem in item.list" :key="jtem.value" :label="jtem.name" :value="jtem.value"></el-option>
                    </el-select>
                </div>
            </div>
            <div style="margin-top: 10px;margin-bottom: 20px;text-align: right">
                <el-button @click="cleanSearch()">清空</el-button>
                <el-button type="primary" @click="doSearch()">搜索</el-button>
            </div>
        </div>
        <!--按钮-->
        <div class="handle-box">
            <div class="left">
                <el-button style="width: 70px" type="primary" @click="refresh()" :loading="loading">刷新</el-button>
                <slot></slot>
            </div>
            <div class="right">
                <el-button type="primary" icon="el-icon-search" @click="clickShowSearch()"></el-button>
                <el-dropdown trigger="click" :hide-on-click="false">
                    <el-button type="primary" icon="el-icon-menu"></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in allColumns" :key="index">
                            <input type="checkbox" v-on:change="changeShowColumns(item)" :checked="!item.hide" title="select"/>
                            {{item.title}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!--表格-->
        <el-table :default-sort="defaultSort" v-loading="loading" :fit="true" :data="dataList" border class="table" ref="table" @filter-change="filterChanger" @sort-change="sortChange" @selection-change="selectionChange">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column :align="item.align ? item.align : 'center'" :width="item.width ? item.width : null" :prop="item.key" :column-key="item.key" :filter-multiple="false" :label="item.title" :filters="item.filter ? item.filter : null" :sortable="item.sortable" v-for="(item, index) in columns" :key="index">
                <template slot-scope="scope">
                    <slot :name="item.key" :row="scope.row">
                        {{scope.row[item.key]}}
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="isPage" class="pagination">
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="pageChange"
                :page-sizes="[10, 15, 20, 25]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {containsString, copyList} from '../js/util';
    export default {
        name: 'basetable',
        data() {
            return {
                loading: false,
                // 数据
                dataList: [],
                // main
                isPage: false,
                url: '',
                primaryKey: 'id',
                sort: '',
                sortType: 'asc',
                defaultSort: {},
                filterList: [], // 筛选
                selection: [], // 选中
                columns: [],
                allColumns: [],
                // search
                showSearch: false,
                needSearchList: [],
                searchList: [], // 随动的搜索条件
                staticSearch: [], // 默认不会更改的搜索条件
                // page
                page: 1,
                size: 10,
                totalNum: 100,
                totalPage: 10
            }
        },
        props: {
            load: {
                type: Function
            },
            data: {
                type: Object,
                require: true
            }
        },
        created() {
            if (this.load) {
                this.load(this);
            }
            this.reset();
            this.refresh();
        },
        methods: {
            // 重置
            reset () {
                this.allColumns = copyList(this.data.list);
                this.url = this.data.url ? this.data.url : '';
                this.searchList = this.data.searchList ? this.data.searchList : [];
                this.filterList = this.data.filterList ? this.data.filterList : [];
                this.isPage = this.data.isPage ? this.data.isPage : false;
                this.primaryKey = this.data.primaryKey ? this.data.primaryKey : 'id';
                this.sort = this.data.sort ? this.data.sort : '';
                this.sortType = this.data.sortType ? this.data.sortType : 'asc';
                if (this.sort) {
                    this.defaultSort = {prop: this.sort, order: this.sortType == 'asc' ? 'ascending' : 'descending'};
                }
                this.columns = [];
                this.allColumns.forEach((value) => {
                    if (value.sortable) {
                        value.sortable = 'custom';
                    }
                    if (value.search) {
                        let search = value.search;
                        search.key = value.key;
                        search.title = value.title;
                        if (search.symbol === 'between') {
                            if (search.type === 'time') {
                                search.value = [null, null];
                            } else {
                                search.value = [null, null];
                            }
                        }
                        this.needSearchList.push(search);
                    }
                    if (!value.hide) {
                        this.columns.push(value);
                    }
                });
            },
            // 刷新
            refresh () {
                this.loading = true;
                let search = [];
                if (this.data.staticSearch) {
                    search = search.concat(this.data.staticSearch);
                }
                 if (this.searchList) {
                    search = search.concat(this.searchList);
                }
                if (this.filterList) {
                    search = search.concat(this.filterList);
                }
                let param;
                if (this.data.param) {
                    param = this.data.param;
                }
                else {
                    param = {};
                }
                param.tableForm = {
                    sort: this.sort,
                    sortType: this.sortType,
                    current: this.page,
                    size: this.size,
                    search: search
                };
                Sun.post({
                    url: this.url,
                    data: param,
                    final: () => {
                        this.loading = false;
                    },
                    success: (data) => {
                        if (this.isPage) {
                            this.dataList = data.records;
                            this.totalPage = data.pages;
                            this.totalNum = parseInt(data.total);
                        } else {
                            this.dataList = data;
                        }
                    }
                })
            },
            // 菜单显示
            changeShowColumns (item) {
                item.hide = !item.hide;
                this.columns = [];
                this.allColumns.forEach((value) => {
                    if (!value.hide) {
                        this.columns.push(value);
                    }
                });
            },
            // 筛选
            filterChanger (item) {
                for(let key in item){
                    for(let i=0; i<this.filterList.length; i++){
                        if(this.filterList[i].key === key){
                            this.filterList.splice(i--,1);
                        }
                    }
                    if (item[key].length) {
                        item[key].forEach((data) => {
                            let array = data.split(' ');
                            let symbol = array[0];
                            let value = array[1];
                            if (containsString(array[1], '-')) {
                                value = array[1].split('-');
                            }
                            this.filterList.push({
                                key: key,
                                symbol: symbol,
                                value: value
                            })
                        });
                    }
                }
                this.refresh();
            },
            // 排序
            sortChange (item) {
                if (item.column) {
                    this.sort = item.prop;
                    if (item.order === 'descending') {
                        this.sortType = 'desc';
                    } else {
                        this.sortType = 'asc';
                    }
                } else {
                    this.sort = this.data.sort ? this.data.sort : '';
                    this.sortType = this.data.sortType ? this.data.sortType : 'asc';
                }
                this.refresh();
            },
            // 选择
            selectionChange (item) {
                this.selection = item;
            },
            // 分页
            pageSizeChange (item) {
                this.size = item;
                this.refresh();
            },
            pageChange (item) {
                this.page = item;
                this.refresh();
            },
            //搜索
            clickShowSearch () {
                if (!this.needSearchList.length) {
                    Sun.showError('无可搜索项!');
                    return;
                }
                this.showSearch = !this.showSearch;
            },
            cleanSearch () {
                this.searchList = [];
                this.needSearchList.forEach((item, index) => {
                    item.value = item.value1 = item.value2 = null;
                });
                this.refresh();
            },
            doSearch () {
                this.searchList = [];
                this.needSearchList.forEach((item, index) => {
                    if (item.symbol !== 'between' && item.value !== null && item.value !== '' && typeof item.value !== 'undefined') {
                        let value = item.value;
                        if (item.type === 'time') {
                            value = Date.parse(value) / 1000;
                        }
                        if (item.symbol === 'like') {
                            if (!item.cat) {
                                value = '%' + value + '%';
                            } else {
                                value = item.cat.replace('?', value);
                            }
                        }
                        this.searchList.push({key: item.key, symbol: item.symbol, value: value})
                    }
                    if (item.symbol === 'between') {
                        if (item.value1 && item.value2) {
                            let value = [item.value1, item.value2];
                            if (item.type === 'time') {
                                value[0] = Date.parse(value[0]) / 1000;
                                value[1] = Date.parse(value[1]) / 1000;
                            }
                            this.searchList.push({key: item.key, symbol: '>=', value: value[0]}, {key: item.key, symbol: '<=', value: value[1]})
                        }
                        if (item.value1 && !item.value2) {
                            let value = item.value1;
                            if (item.type === 'time') {
                                value = Date.parse(value) / 1000;
                            }
                            this.searchList.push({key: item.key, symbol: '>=', value: value})
                        }
                        if (!item.value1 && item.value2) {
                            let value = item.value2;
                            if (item.type === 'time') {
                                value = Date.parse(value) / 1000;
                            }
                            this.searchList.push({key: item.key, symbol: '<=', value: value})
                        }
                        if (!item.value1 && !item.value2) {

                        }
                    }
                });
                this.refresh();
            }
        }
    }

</script>

<style scoped>
    .table-search {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .handle-box {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
</style>
