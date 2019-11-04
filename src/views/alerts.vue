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
          <el-date-picker v-model="searchData.startDate"
                          clearable
                          type="datetime"
                          placeholder="Start Time"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          class="search-date"
                          @change="selectDate">
          </el-date-picker>
          <div class="line"></div>
          <el-date-picker v-model="searchData.endDate"
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
               ref="table">
    </mzh-table>
  </el-container>
</template>

<script>
import Table from '../components/table.vue';

const alarmStatusList = [
  { id: 1, name: 'Unacknowledged' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Unsure' },
  { id: 4, name: 'Male' },
];
const processResultList = [
  { id: 1, name: 'Captured' },
  { id: 2, name: 'Escaped' },
];
const genderList = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Unkown' },
];
const tableTagList = [
  {
    label: 'No.',
    prop: 'id',
  },
  {
    label: 'Time',
    prop: 'time',
  },
  {
    label: 'Gender',
    prop: 'gender',
  },
  {
    label: 'FacePic',
    prop: 'face_pic',
  },
  {
    label: 'HumanPic',
    prop: 'human_pic',
  },
  {
    label: 'Process Result',
    prop: 'report_type',
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
        tableData: [
          {
            id: 12,
            gender: 'Male',
            time: '2019-08-15 13:23:59',
            human_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            face_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            report_type: -1,
            status: -1,
            report_type_string: 'Unprocessed',
            status_string: 'Unacknowledged',
          },
          {
            id: 12,
            gender: 'Male',
            time: '2019-08-15 13:23:59',
            human_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            face_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            report_type: 2,
            status: 1,
            report_type_string: 'Captured',
            status_string: 'Male',
          },
          {
            id: 12,
            gender: 'Male',
            time: '2019-08-15 13:23:59',
            human_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            face_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            report_type: 3,
            status: 1,
            report_type_string: 'Escaped',
            status_string: 'Male',
          },
          {
            id: 12,
            gender: 'Male',
            time: '2019-08-15 13:23:59',
            human_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            face_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            report_type: 0,
            status: 2,
            report_type_string: 'Whitelist',
            status_string: 'Female',
          },
          {
            id: 12,
            gender: 'Male',
            time: '2019-08-15 13:23:59',
            human_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            face_pic:
              'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1572504241&di=2b93e8dff245afa1d11724ee7d925c09&src=http://b-ssl.duitang.com/uploads/item/201503/14/20150314145026_8s5ar.jpeg',
            report_type: 1,
            status: 0,
            report_type_string: 'Keepitis',
            status_string: 'Unsure',
          },
        ],
        tableTagList,
        totalNumber: 40,
      },
      searchDataList: [
        {
          title: 'alarmStatus:',
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
        startDate: '',
        endDate: '',
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
      this.$axios.get(`/alarm?filters=${JSON.stringify(data)}`).then((res) => {
        console.log(res);
      });
    },
    searchList() {},
    selectDate() {
      this.getList();
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
