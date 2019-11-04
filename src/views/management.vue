<template>
  <el-container class="management-container">
    <div class="header">
      <div class="header-item">Account Management</div>
      <!-- <div class="header-item">Corridor</div> -->
    </div>
    <div class="user">
      <div class="user-pic"></div>
      <div class="user-information">
        <div class="user-name">Christina</div>
        <div class="user-gender">female</div>
        <div class="login-time">Last login: 2019-09-28 00:00</div>
      </div>
      <div class="reset-btn" @click="reset">Password Reset</div>
    </div>
    <div class="operation">
      <div class="operation-title">Administrator List</div>
      <div class="operation-area">
        <div class="search">
          <el-input
            v-model="searchName"
            placeholder="Search via user name"
            prefix-icon="el-icon-search"
          ></el-input>
          <div class="search-btn">
            Search
          </div>
        </div>
        <div class="add-btn" @click="addAccount">
          <svg-icon icon-class="addBtn" />Add New Accounts
        </div>
      </div>
    </div>
    <el-dialog
      center
      :title="dialogType === 1 ? 'Add New Accounts' : 'Password Reset'"
      width="700px"
      :visible.sync="dialogVisible"
    >
      <el-form label-width="80px" label-position="left" class="assign-data">
        <el-form-item label="Name">
          <el-input v-model="formData.name" clearable :disabled="dialogType === 2"> </el-input>
        </el-form-item>
        <el-form-item label="Account">
          <el-input v-model="formData.account" clearable :disabled="dialogType === 2"> </el-input>
        </el-form-item>
        <el-form-item label="Gender">
          <el-select
            v-model="formData.gender"
            clearable
            placeholder="select"
            :disabled="dialogType === 2"
            @clear="formData.gender = ''"
          >
            <template v-for="item in genderList">
              <el-option :key="item.id" :value="item.id" :label="item.name"> </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password" clearable> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="preserve" @click="preserve">Preserve</el-button>
        <el-button @click="dialogVisible = false">cancel</el-button>
      </span>
    </el-dialog>
    <mzh-table
      v-model="tableList"
      operation
      ref="table"
      @reset="reset"
      @delete="deleteAccount"
      @change-page="changePage"
    >
    </mzh-table>
  </el-container>
</template>

<script>
import Table from '../components/table.vue';

const genderList = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
];
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
    prop: 'lastLogin',
  },
];
export default {
  components: { 'mzh-table': Table },
  data() {
    return {
      tableList: {
        tableData: [
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
          {
            name: 'Ella',
            gender: 'Male',
            lastLogin: '2019-08-15 13:23:59',
            account: 'Ella4251',
            processResult: 1,
            alarmStatus: 2,
            alarmStatus_string: 'Unacknowledged',
          },
        ],
        tableTagList,
        totalNumber: 40,
      },
      searchName: '',
      dialogVisible: false,
      genderList,
      formData: {},
      dialogType: 1,
    };
  },
  created() {},
  methods: {
    getList() {
      // eslint-disable-next-line no-console
      console.log(this.searchData);
    },
    searchList() {},
    selectDate() {
      this.getList();
    },
    addAccount() {
      this.dialogType = 1;
      this.dialogVisible = true;
    },
    preserve() {},
    reset(e) {
      this.dialogType = 2;
      this.dialogVisible = true;
      Object.assign(this.formData, e);
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
          this.$message({
            type: 'success',
            message: 'delete successed!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel',
          });
        });
      console.log(e);
    },
    changePage(e) {
      console.log(e);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/views/manegement.scss";
</style>
