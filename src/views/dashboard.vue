<template>
  <el-container class="dashboard-container">
    <div class="dashboard-title">{{dashboard}}</div>
    <el-row :gutter="40"
            style="margin:0"
            class="dashboard">
      <el-col :span="6"
              :class="fullWidth?'dashboard-model':''"
              style="padding-left:0">
        <div class="dashboard-statistic">
          <img src="../assets/images/camera.png">
          <div>
            <div>{{totalCameraNumber}}</div>
            <div>Total number of cameras</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :class="fullWidth?'dashboard-model':''">
        <div class="dashboard-statistic">
          <img src="../assets/images/alert.png">
          <div>
            <div>{{totalAlarmNumber}}</div>
            <div>Total Alert</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :class="fullWidth?'dashboard-model':''"
              :style="`padding-left:${paddingleft}`">
        <div class="dashboard-statistic">
          <img src="../assets/images/male.png">
          <div>
            <div>{{maleAlarmNumber}}</div>
            <div>Male</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :class="fullWidth?'dashboard-model':''"
              :style="`padding-right:${paddingright}`">
        <div class="dashboard-statistic">
          <img src="../assets/images/unacknowledged.png">
          <div class="statistic-content">
            <div>{{unacknowledgedAlarmNumber}}</div>
            <div>Unacknowledged</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="dashboard-list">Camera Failure List</div>
    <div class="list">
      <div v-for="dashboard in dashboardList"
           :key="dashboard.id"
           class="list-content"
           :class="fullWidth?'contents':'content'">
        <div>{{dashboard.region}}</div>
        <div>{{dashboard.level}} - {{dashboard.room}}</div>
        <div v-if="dashboard.online"
             class="tips"
             @click="getOnline(dashboard.id)">Try to go online again</div>
        <div v-else
             class="tip">Going online…</div>
      </div>
    </div>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalNumber"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   @current-change="currentChange">
    </el-pagination>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      dashboard: 'Dashboard',
      totalCameraNumber: 0,
      totalAlarmNumber: 0,
      maleAlarmNumber: 0,
      unacknowledgedAlarmNumber: 0,
      totalNumber: 32,
      pageSize: 15,
      page: 0,
      fullWidth: true,
      paddingleft: 0,
      paddingright: 0,
      currentPage: 1,
      screenWidth: 0,
      dashboardList: [],
    };
  },
  mounted() {
    this.getStatistic();
    this.change();
    this.resize();
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios
        .get(`camera/failure_list?page_size=${this.pageSize}&page=${this.page}`)
        .then((res) => {
          this.dashboardList = res.data;
          this.totalNumber = res.total;
          this.dashboardList.forEach((item, index) => {
            this.$set(this.dashboardList[index], 'online', '');
            this.dashboardList[index].online = true;
          });
        });
    },
    getStatistic() {
      this.$axios.get('index/dashboard').then((res) => {
        this.totalCameraNumber = res.total_camera_number;
        this.totalAlarmNumber = res.total_alarm_number;
        this.maleAlarmNumber = res.male_alarm_number;
        this.unacknowledgedAlarmNumber = res.unacknowledged_alarm_number;
      });
    },
    getOnline(id) {
      this.dashboardList.forEach((item, index) => {
        if (item.id === id) {
          this.dashboardList[index].online = false;
        }
      });
      this.$axios.put(`camera/${id}/on`).then();
    },
    change() {
      const screenWidth = document.body.clientWidth;
      if (screenWidth > 1658) {
        this.pageSize = 15;
        this.fullWidth = false;
        this.paddingleft = '20px';
        this.paddingright = 0;
      } else {
        this.pageSize = 12;
        this.fullWidth = true;
        this.paddingleft = 0;
        this.paddingright = '20px';
      }
    },
    resize() {
      window.onresize = () => {
        this.change();
      };
    },
    currentChange(cpage) {
      this.currentPage = cpage;
      this.page = cpage - 1;
      this.getdata();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/dashboard.scss';
</style>
