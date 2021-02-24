<template>
    <div>
        <div class="table-form">
            <div class="form-left">
                <Input type="text" placeholder="支持学校名称搜索" class="large-input">
                </Input>
                <div class="status">
                    <label>状态:</label>
                    <Select class="status-select">
                        <Option value="">请选择</Option>
                        <Option value="1">正常</Option>
                        <Option value="2">禁用</Option>
                    </Select>
                </div>
            </div>
            <div class="form-right btns">
                <Button type="primary" class="btn">查询</Button>
                <Button type="primary" class="btn" @click="addItem">新增</Button>
                <Button type="error" class="btn">批量删除</Button>
            </div>
        </div>
        <Table size="small" class="table-box" border :columns="columns" :data="dataTable"></Table>

        <!-- 删除提示 -->
        <Modal
            v-model="deletedModal"
            title="提示"
            @on-ok="handleDeletedOk">
            <p>确定删除？</p>
        </Modal>
        <!-- 新增 -->
        <Modal
            v-model="addModal"
            title="新增">
            <Form ref="addForm" :label-width="150" :rules="ruleValidate" :model="formValidate">
                <FormItem label="学校名称：" prop="name">
                    <Input type="text" v-model="formValidate.name" class="form-input-normal" placeholder="学校名称"/>
                </FormItem>
                <FormItem label="学校联系人姓名：" prop="contactsName">
                    <Input type="text" v-model="formValidate.contactsName" class="form-input-normal" placeholder="学校联系人姓名"/>
                </FormItem>
                <FormItem label="手机：" prop="telNum">
                    <Input type="text" v-model="formValidate.telNum" class="form-input-normal" placeholder="手机"/>
                </FormItem>
                <FormItem label="邮箱：" prop="mail">
                    <Input type="text" v-model="formValidate.mail" class="form-input-normal" placeholder="邮箱"/>
                </FormItem>
                <FormItem label="账号状态：" prop="status">
                    <Select class="form-select-normal" v-model="formValidate.status">
                        <!-- <Option :value="0" label="请选择"></Option> -->
                        <Option :value="1" label="正常"></Option>
                        <Option :value="2" label="禁用"></Option>
                    </Select>
                </FormItem>
                <FormItem label="产品功能：" prop="fun">
                    <Select class="form-select-normal" v-model="formValidate.fun">
                        <!-- <Option :value="0" label="请选择"></Option> -->
                        <Option :value="1" label="基本版产品功能"></Option>
                        <Option :value="2" label="高级版产品功能"></Option>
                    </Select>
                </FormItem>
                <FormItem label="开始时间：" prop="start">
                    <DatePicker type="datetime" placeholder="开始时间" class="form-input-normal" v-model="formValidate.start"></DatePicker>
                </FormItem>
                <FormItem label="结束时间：" prop="end">
                    <DatePicker type="datetime" placeholder="结束时间" class="form-input-normal" v-model="formValidate.end"></DatePicker>
                </FormItem>
                <FormItem label="学校地址：">
                    <Input type="text" v-model="formValidate.schoolDress"  class="form-input-normal"/>
                </FormItem>
                <FormItem label="学校logo：">
                    <Upload
                        action=""
                        :before-upload="upload">
                        <div class="form-upload-normal" v-if="!formValidate.logo">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击选择照片</p>
                        </div>
                        <div class="img-wrap" v-else>
                            <img :src="formValidate.logo" alt=""  class="uploadLogo">
                            <Button type=""></Button>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text"  @click="handleAddCancle">取消</Button>
                <Button type="primary"  @click="handleAddOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'registrationManagement',
    data(){
        return {
            deletedModal: false,
            deletedIndex:'',
            addModal: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'logo',
                    key: 'logo',
                    align: 'center',
                    render: (h , params) => {
                        return h('img',{
                            domProps:{
                                src:params.row.logo
                            }
                        })
                    }
                },
                {
                    title: '学校名称',
                    key: 'schoolName',
                    align: 'center'
                },
                {
                    title: '联系人姓名',
                    key: 'contactName',
                    align: 'center'
                },
                {
                    title: '手机',
                    key: 'telNum',
                    align: 'center'
                },
                {
                    title: '开始时间',
                    key: 'startDate',
                    align: 'center'
                },
                {
                    title: '结束时间',
                    key: 'endDate',
                    align: 'center'
                },
                {
                    title: '账号状态',
                    key: 'status',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                class:'edit',
                                style: {
                                    marginRight: '10px',
                                    color:'#2d8cf0'
                                },
                                on: {
                                    click: () => {
                                        
                                    }
                                }
                            }, '修改'),
                            h('a', {
                                class:'deleted',
                                style: {
                                    color: '#ed4014'
                                },
                                on: {
                                    click: () => {
                                        this.deletedModal = true
                                        this.deletedIndex = params.row._index
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataTable: [
                {
                    logo: '',
                    schoolName: 'xxx师范大学1',
                    contactName: 'New York No. 1 Lake Park',
                    telNum: '18671121256',
                    startDate: '2020-10-11',
                    endDate: '2021-10-11',
                    status: '正常'
                },
               {
                    logo: '',
                    schoolName: 'xxx师范大学2',
                    contactName: 'New York No. 1 Lake Park',
                    telNum: '18671121256',
                    startDate: '2020-10-11',
                    endDate: '2021-10-11',
                    status: '正常'
                },
                {
                    logo: '',
                    schoolName: 'xxx师范大学3',
                    contactName: 'New York No. 1 Lake Park',
                    telNum: '18671121256',
                    startDate: '2020-10-11',
                    endDate: '2021-10-11',
                    status: '正常'
                },
                {
                    logo: '',
                    schoolName: 'xxx师范大学4',
                    contactName: 'New York No. 1 Lake Park',
                    telNum: '18671121256',
                    startDate: '2020-10-11',
                    endDate: '2021-10-11',
                    status: '正常'
                },
            ],
            ruleValidate: {
                name: [
                    { required: true, message: '学校名称必填', trigger: 'blur' }
                ],
                contactsName: [
                    { required: true, message: '学校联系人姓名必填', trigger: 'blur' },
                ],
                telNum: [
                    { required: true, message: '手机号必填', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮件必填', trigger: 'blur' },
                    { type: 'email', message: '错误邮件格式', trigger: 'blur' }
                ],
                status: [
                    { required: true, type:'number',message: '请选择一个状态', trigger: 'change' }
                ],
                fun: [
                    { required: true, type:'number', message: '请选择一个产品', trigger: 'change' }
                ],
                start: [
                    { required: true, type: 'date', message: '开始时间必填', trigger: 'change,blur' }
                ],
                end: [
                    { required: true, type: 'date', message: '结束时间必填', trigger: 'change,blur' }
                ]
            },
            formValidate:{
                name:'',
                contactsName:'',
                telNum:'',
                mail:'',
                status:'',
                fun:'',
                start:'',
                end:'',
                schoolDress:'',
                logo:''
            }
        }
    },
    methods: {
        handleDeletedOk: function() {
            this.dataTable.splice(this.deletedIndex,1)
        },
        handleAddOk: function() {
            this.$refs.addForm.validate((valid) => {
                if(!valid) {
                    this.addModal = true
                    this.$Message.success('添加成功');
                }
                
            })
        },
        handleAddCancle: function() {
            this.addModal = false
            this.$refs.addForm.resetFields()
        },
        addItem: function() {
            this.addModal = true
        },
        upload: function(file) {
            let reader = new FileReader()
            let that = this
            reader.onload = function(){
                if(["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"].indexOf(file.type) < 0){
                    that.$Message.error('请选择(.gif,.jpeg,.jpg,.png,.bmp)格式的照片进行上传！')
                    return false
                }else if(file.size >1024 * 1024){
                    that.$Message.error('请上传不超过1M的图片')
                    return false;
                }else{
                    that.formValidate.logo = reader.result
                }
            };
            reader.readAsDataURL(file);
            console.log(file)
        }
    }
}

</script>
<style lang="stylus" scoped>
.table-form
    display flex
    justify-content flex-end
    .form-left
        display flex
        .large-input
            width 300px
            min-width 200px
        .status
            min-width 250px
            display flex
            label 
                display inline-block
                width 80px
                min-width 70px
                padding 0 15px
                height 32px
                line-height 32px
            .status-select
                min-width 150px
    .btns
        min-width 300px
        .btn
            margin-left 20px
.table-box
    margin-top 20px
.form-input-normal,.form-select-normal
    width 200px
.form-upload-normal
    width 120px
    padding 10px
    display flex
    flex-direction column
    align-items center
    cursor pointer
    border 1px dashed #dcdee2
    transition border-color .2s ease
    border-radius 10px
    &:hover
        border 1px dashed #2d8cf0
.upload-wrap
    position relative
    height 100px
    .uploadLogo
        width 100px
        height 100px
        border-radius 10px
        position absolute
        top 0
        left 0
        cursor pointer
</style>