<template>
  <el-container class="table-container">
    <el-table ref="multipleTable"
              empty-text="No data available"
              :data="value.tableData"
              :row-class-name="tableRowClassName"
              height="500"
              class="table-main">
      <el-table-column v-for="(tableTag, index) in value.tableTagList"
                       :min-width="limitWidth(tableTag)"
                       :key="index"
                       :label="tableTag.label"
                       :prop="tableTag.prop">
        <template slot-scope="scope">
          <span v-if="tableTag.prop === 'alarmStatus'">
            <div :class="getAlarmClassName(scope.row[tableTag.prop])">{{
              scope.row.alarmStatus_string
              }}</div>
          </span>
          <span v-else-if="tableTag.prop === 'processResult'">
            <div :class="scope.row[tableTag.prop]===1?'escaped':'captured'">{{
              scope.row[tableTag.prop]===1?'Escaped':'Captured'
              }}</div>
          </span>
          <span v-else-if="tableTag.prop === 'facePic'||tableTag.prop === 'humanPic'">
            <img :src="scope.row[tableTag.prop]"
                 alt="no pic"
                 class="img">
          </span>
          <span v-else
                class="table-span">{{scope.row[tableTag.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="operation"
                       align="center"
                       label="Operation"
                       :width="operationLength">
        <template>
          <span class="reset">
            <svg-icon icon-class="reset" />Password Reset
          </span>
          <div class="line"></div>
          <span class="delete">
            <svg-icon icon-class="delete" />Delete accounts
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :page-size=20
                   :current-page=1
                   :total="value.totalNumber"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange">
    </el-pagination>
    <span @click="scroll">
      <svg-icon icon-class="回到顶部"
                class="icon-btn">
      </svg-icon>
    </span>

  </el-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        tableData: [],
        tableTagList: [],
        totalNumber: 0,
      }),
    },
    select: {
      type: Boolean,
      default: false,
    },
    operation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      multipleSelection: [],
      btnWidth: '75px',
      role: '',
      operationLength: '600',
    };
  },
  mounted() {
    window.onresize = () => {
      const { clientWidth } = document.body;
      if (clientWidth < 1600) {
        this.operationLength = '500';
      } else {
        this.operationLength = '600';
      }
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('change-page', val - 1);
    },
    handleSizeChange(val) {
      this.$emit('change-size', val);
    },
    tableRowClassName(val) {
      if (val.row.highlight === 1) {
        return 'highlight-row';
      }
      if (val.row.highlight === 2) {
        return 'overdue-row';
      }
      return '';
    },
    scroll() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
      });
    },
    limitWidth(tag) {
      if (tag.prop === 'time' || tag.prop === 'lastLogin') {
        return '200px';
      }
      if (tag.prop === 'facePic' || tag.prop === 'humanPic') {
        return '160px';
      }
      if (tag.prop === 'processResult') {
        return '160px';
      }
      if (tag.prop === 'alarmStatus') {
        return '200px';
      }
      if (tag.prop === 'id') {
        return '80px';
      }
      if (
        tag.prop === 'gender'
        || tag.prop === 'name'
        || tag.prop === 'account'
      ) {
        return '120px';
      }
      return 'auto';
    },
    getAlarmClassName(index) {
      if (index === 1) {
        return 'alarm-item alarm-first';
      }
      if (index === 2) {
        return 'alarm-item alarm-second';
      }
      if (index === 3) {
        return 'alarm-item alarm-third';
      }
      if (index === 4) {
        return 'alarm-item alarm-fourth';
      }
      return 'alarm-item';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/table.scss';
</style>
