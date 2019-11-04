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
          <span v-if="tableTag.prop === 'status'">
            <div :class="getAlarmClassName(scope.row[tableTag.prop])">{{
              scope.row.status_string
              }}</div>
          </span>
          <span v-else-if="tableTag.prop === 'report_type'">
            <div :class="getResultClassName(scope.row[tableTag.prop])">{{
              scope.row.report_type_string
              }}</div>
          </span>
          <span v-else-if="tableTag.prop === 'face_pic'||tableTag.prop === 'human_pic'">
            <el-image :src="scope.row[tableTag.prop]"
                      :preview-src-list="[scope.row[tableTag.prop]]"
                      alt="no pic"
                      class="img" />
          </span>
          <span v-else
                class="table-span">{{scope.row[tableTag.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="operation"
                       align="center"
                       label="Operation"
                       :width="operationLength">
        <template slot-scope="scope">
          <span class="reset"
                @click="handleResetPassword(scope.row)">
            <svg-icon icon-class="reset" />Password Reset
          </span>
          <div class="line"></div>
          <span class="delete"
                @click="handleDeleteAccount(scope.row)">
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
    handleResetPassword(val) {
      this.$emit('reset', val);
    },
    handleDeleteAccount(val) {
      this.$emit('delete', val);
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
      if (tag.prop === 'face_pic' || tag.prop === 'human_pic') {
        return '160px';
      }
      if (tag.prop === 'report_type') {
        return '160px';
      }
      if (tag.prop === 'status') {
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
      if (index === -1) {
        return 'alarm-item alarm-second'; // 红色
      }
      if (index === 0) {
        return 'alarm-item alarm-fourth'; // 黄色
      }
      if (index === 1) {
        return 'alarm-item alarm-first'; // 绿色
      }
      if (index === 2) {
        return 'alarm-item  alarm-third'; // 灰色
      }

      return 'alarm-item';
    },
    getResultClassName(index) {
      if (index === -1) {
        return 'alarm-item alarm-second';
      }
      if (index === 0) {
        return 'alarm-item alarm-third';
      }
      if (index === 1) {
        return 'alarm-item alarm-fourth';
      }
      if (index === 2) {
        return 'alarm-item alarm-third';
      }
      if (index === 3) {
        return 'alarm-item alarm-first';
      }
      return 'alarm-item';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/table.scss';
</style>
