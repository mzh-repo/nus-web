<template>
  <el-container>
    <el-row class="logo">
      <svg-icon icon-class="icon" />
    </el-row>
    <el-menu router
             @select="handleSelect">
      <template v-for="menu in routerList">
        <el-menu-item style="padding-left:0"
                      :index="menu.path"
                      :key="menu.name">
          <svg-icon :icon-class="selectItem === menu.path ? menu.selectIcon: menu.name"></svg-icon>
        </el-menu-item>
      </template>
    </el-menu>
    <el-row class="user">
      <div class="user-pic">
        <img src='@/assets/images/head.jpg'
             alt="">
      </div>
      <div @click="handleExit">
        <svg-icon icon-class="exit" />
      </div>
    </el-row>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectItem: '',
      routerList: this.$router.options.routes[0].children,
      headImgUrl: this.$store.state.headImgUrl,
    };
  },
  mounted() {
    this.selectItem = this.$route.path;
  },
  methods: {
    handleSelect(e) {
      this.selectItem = e;
    },
    handleExit() {
      const token = localStorage.getItem('Authorization');
      this.$axios.post(`user/logout?Authorization=${token}`).then(() => {
        localStorage.clear();
        this.$router.replace('/');
      });
    },
  },
  watch: {
    '$route.path': {
      handler() {
        this.selectItem = this.$route.matched[1].path;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/asideBar.scss';
</style>
