<template>
  <el-container class="alerts-container">
    <div class="header">
      <div class="header-item active">Female Restroom</div>
      <!-- <div class="header-item">Corridor</div> -->
    </div>
    <div class="search">
      <el-form inline>
        <template v-for="item in searchDataList">
          <el-form-item :key="item.title">
            <div class="search-title">{{item.title}}</div>
            <el-select v-model="searchData[item.prop]"
                       clearable
                       placeholder="select"
                       :class="item.className">
              <el-option v-for="itemL in item.list"
                         :key="itemL.id"
                         :label="itemL.name"
                         :value="itemL.id">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item>
          <div class="search-title">Time:</div>
          <el-date-picker v-model="searchData.startTime"
                          clearable
                          type="datetime"
                          placeholder="Start Time"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          class="search-date"
                          @change="selectDate">
          </el-date-picker>
          <div class="line"></div>
          <el-date-picker v-model="searchData.endTime"
                          clearable
                          type="datetime"
                          placeholder="Start Time"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          class="search-date"
                          @change="selectDate">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <mzh-table v-model="tableList"
               ref="table"
               @change-page="changePage"
               @click-result="clickResult">
    </mzh-table>
  </el-container>
</template>

<script>
import Table from '../components/table.vue';

const alarmStatusList = [
  { id: -1, name: 'Unacknowledged' },
  { id: 0, name: 'Unsure' },
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
];
const processResultList = [
  { id: -1, name: 'Unprocessed' },
  { id: 0, name: 'Whitelist' },
  { id: 1, name: 'Keepitis' },
  { id: 2, name: 'Captured' },
  { id: 3, name: 'Escaped' },
];
const genderList = [{ id: 1, name: 'Male' }, { id: -1, name: 'Unknow' }];
const tableTagList = [
  {
    label: 'No.',
    prop: 'id',
  },
  {
    label: 'Time',
    prop: 'report_time',
  },
  {
    label: 'Gender',
    prop: 'reported_gender',
  },
  {
    label: 'FacePic',
    prop: 'face_pic',
  },
  {
    label: 'BodyPic',
    prop: 'human_pic',
  },
  {
    label: 'Process Result',
    prop: 'result',
  },
  {
    label: 'Alarm Status',
    prop: 'status',
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
      page: 0,
      pageSize: 20,
      searchDataList: [
        {
          title: 'Alarm Status:',
          value: '',
          list: alarmStatusList,
          className: 'serach-alarm',
          prop: 'alarmStatus',
        },
        {
          title: 'Process Result:',
          value: '',
          list: processResultList,
          className: 'serach-process',
          prop: 'processResult',
        },
        {
          title: 'Gender:',
          value: '',
          list: genderList,
          className: 'serach-gender',
          prop: 'gender',
        },
      ],
      searchData: {
        gender: '',
        processResult: '',
        alarmStatus: '',
        startTime: '',
        endTime: '',
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const data = {};
      Object.assign(data, this.searchData);
      this.$axios
        .get(
          `/alarm/list?page=${this.page}&page_size=${this.pageSize}${
            data.alarmStatus !== '' ? `&status=${data.alarmStatus}` : ''
          }${data.processResult !== '' ? `&result=${data.processResult}` : ''}${
            data.gender !== '' ? `&gender=${data.gender}` : ''
          }${
            data.startTime !== '' && data.startTime !== null
              ? `&start_time=${data.startTime}`
              : ''
          }${
            data.endTime !== '' && data.endTime !== null
              ? `&end_time=${data.endTime}`
              : ''
          }`,
        )
        .then((res) => {
          res.data.forEach((item) => {
            Object.assign(item, {
              face_pic_url: '',
            });
            Object.assign(item, { human_pic_url: '' });
          });
          this.tableList.tableData = res.data;
          this.tableList.totalNumber = res.total;
          res.data.forEach((item) => {
            this.$axios.get(`image/face_pic/${item.id}`).then((response) => {
              Object.assign(item, {
                face_pic_url: response,
              });
            });
            this.$axios.get(`image/human_pic/${item.id}`).then((request) => {
              Object.assign(item, { human_pic_url: request });
            });
          });
        });
    },
    searchList() {},
    selectDate() {
      if (this.searchData.endTime === null) {
        this.searchData.endTime = '';
      }
      if (this.searchData.startTime === null) {
        this.searchData.startTime = '';
      }
      this.getList();
    },
    changePage(val) {
      this.page = val;
      this.getList();
    },
    clickResult(e) {
      this.$alert(e.remark ? e.remark : 'null', 'Remark', {
        confirmButtonText: 'OK',
      });
    },
  },
  watch: {
    'searchData.alarmStatus': {
      handler(val) {
        if (val === undefined) {
          this.searchData.alarmStatus = '';
        }
        this.getList();
      },
    },
    'searchData.processResult': {
      handler(val) {
        if (val === undefined) {
          this.searchData.processResult = '';
        }
        this.getList();
      },
    },
    'searchData.gender': {
      handler(val) {
        if (val === undefined) {
          this.searchData.gender = '';
        }
        this.getList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/alerts.scss';
</style>
