<template>
  <el-container class="management-container">
    <div class="header">
      <div class="header-item">Account Management</div>
      <!-- <div class="header-item">Corridor</div> -->
    </div>
    <div class="user">
      <div class="user-pic">
        <img src='@/assets/images/head.jpg'
             alt="">
      </div>
      <div class="user-information">
        <div class="user-name">{{userData.name}}</div>
        <div class="user-gender">{{userData.gender===0?'Male':'Female'}}</div>
        <div class="login-time">Last login: {{userData.last_login_time}}</div>
      </div>
      <div class="reset-btn"
           @click="reset(userData)">Password Reset</div>
    </div>
    <div class="operation">
      <div class="operation-title">Administrator List</div>
      <div class="operation-area">
        <div class="search">
          <el-input v-model="searchName"
                    placeholder="Search via user name"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="getList" />
          <div class="search-btn"
               @click="getList">
            Search
          </div>
        </div>
        <div class="add-btn"
             @click="addAccount">
          <svg-icon icon-class="addBtn" />Add New Accounts
        </div>
      </div>
    </div>
    <el-dialog center
               :title="dialogType === 1 ? 'Add New Accounts' : 'Password Reset'"
               width="700px"
               :visible.sync="dialogVisible">
      <el-form ref="ruleForm"
               label-width="100px"
               label-position="left"
               :model="formData"
               :rules="rules"
               class="assign-data">
        <el-form-item label="Name"
                      prop="name">
          <el-input v-model="formData.name"
                    clearable
                    :disabled="dialogType === 2"> </el-input>
        </el-form-item>
        <el-form-item label="Account"
                      prop="account">
          <el-input v-model="formData.account"
                    clearable
                    :disabled="dialogType === 2"> </el-input>
        </el-form-item>
        <el-form-item label="Gender"
                      prop="gender">
          <el-select v-model="formData.gender"
                     clearable
                     placeholder="select"
                     :disabled="dialogType === 2"
                     @clear="formData.gender = ''">
            <template v-for="item in genderList">
              <el-option :key="item.id"
                         :value="item.id"
                         :label="item.name"> </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="Password"
                      prop="password">
          <el-input v-model="formData.password"
                    clearable />
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="preserve"
                   @click="preserve">Preserve</el-button>
        <el-button @click="dialogVisible = false">cancel</el-button>
      </span>
    </el-dialog>
    <mzh-table v-model="tableList"
               operation
               ref="table"
               @reset="reset"
               @delete="deleteAccount"
               @change-page="changePage">
    </mzh-table>
  </el-container>
</template>

<script>
import Table from '../components/table.vue';

const genderList = [{ id: 1, name: 'Male' }, { id: 0, name: 'Female' }];
const tableTagList = [
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Account',
    prop: 'account',
  },
  {
    label: 'Gender',
    prop: 'gender',
  },
  {
    label: 'Last login',
    prop: 'last_login_time',
  },
];
export default {
  components: { 'mzh-table': Table },
  data() {
    return {
      tableList: {
        tableData: [],
        tableTagList,
        totalNumber: 40,
      },
      rules: {
        name: [{ required: true, message: 'please set name', trigger: 'blur' }],
        account: [
          { required: true, message: 'please set account', trigger: 'blur' },
        ],
        gender: [
          {
            required: true,
            message: 'please select gender',
            trigger: 'change',
          },
        ],
        password: [
          {
            required: true,
            message: 'please set password',
            trigger: 'blur',
          },
        ],
      },
      userData: this.$store.state.userData,
      searchName: '',
      dialogVisible: false,
      genderList,
      formData: {
        password: '',
        name: '',
        gender: '',
        account: '',
      },
      dialogType: 1,
      page: 0,
      pageSize: 20,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .get(
          `user/guard/list?page=${this.page}&page_size=${this.pageSize}&name=${
            this.searchName
          }`,
        )
        .then((res) => {
          this.tableList.tableData = res.data;
          this.tableList.totalNumber = res.total;
        });
    },
    selectDate() {
      this.getList();
    },
    addAccount() {
      this.dialogType = 1;
      this.dialogVisible = true;
      this.formData = {
        password: '',
        name: '',
        gender: '',
        account: '',
      };
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    reset(e) {
      this.dialogType = 2;
      this.dialogVisible = true;

      Object.assign(this.formData, e, { password: '' });

      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    preserve() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {};
          if (this.dialogType === 1) {
            Object.assign(data, this.formData);
            this.$axios
              .post('user/guard', data)
              .then(() => {
                this.dialogVisible = false;
                this.getList();
              })
              .catch(() => {
                this.$message({
                  message: 'error！',
                  type: 'error',
                });
              });
          } else if (this.dialogType === 2) {
            Object.assign(data, this.formData);
            if (data.role_name === 'user:manager') {
              this.$axios
                .put('user/manager', { password: data.password })
                .then(() => {
                  this.getList();
                });
            } else {
              this.$axios
                .put(`user/guard/${data.id}`, {
                  id: data.id,
                  password: data.password,
                })
                .then(() => {
                  this.getList();
                });
            }
          }
        } else {
          return false;
        }
        return false;
      });
    },

    deleteAccount(e) {
      this.$confirm(
        'This operation will permanently delete this account. Do you want to continue?',
        'Tips',
        {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(() => {
          this.$axios
            .delete(`user/guard/${e.id}`)
            .then(() => {
              this.getList();
              this.$message({
                type: 'success',
                message: 'delete successed!',
              });
            })
            .catch(() => {
              this.$message({
                type: 'woring',
                message: 'delete error!',
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel',
          });
        });
    },
    changePage(val) {
      this.page = val;
      this.getList();
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/manegement.scss';
</style>
