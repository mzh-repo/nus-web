<template>
  <el-container>
    <el-row class="logo">
      <svg-icon icon-class="icon" />
    </el-row>
    <el-menu router
             @select="handleSelect">
      <template v-for="menu in routerList">
        <el-menu-item :index="menu.path"
                      :key="menu.name">
          <svg-icon :icon-class="selectItem === menu.path ? menu.selectIcon: menu.name"></svg-icon>

        </el-menu-item>
      </template>
    </el-menu>
    <el-row class="user">
      <div class="user-pic"></div>
      <svg-icon icon-class="exit" />
    </el-row>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      selectItem: '',
      routerList: this.$router.options.routes[0].children,
    };
  },
  mounted() {
    this.selectItem = this.$router.options.routes[0].children[0].path;
  },
  methods: {
    handleSelect(e) {
      this.selectItem = e;
      this.$router.replace(e);
    },
    // showMy() {
    //   this.$store.commit('setShow');
    // },
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
.el-container {
  height: 100%;
  background-color: #fff;
  @include flex-column;
  justify-content: center;
  position: relative;
}

.logo {
  @include flex-column;
  position: absolute;
  top: 50px;
  width: 100%;

  svg {
    margin: auto;
    @include set-size(60px, 30px);
  }
}
.user {
  @include flex-column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  width: 100%;

  svg {
    margin: auto;
    @include set-size(29px, 28px);
  }

  .user-pic {
    @include set-size(50px);
    background-color: red;
    border-radius: 50%;
    margin: 0 0 20px 0;
  }
}

.el-menu {
  background-color: #fff;
  border-right: 0;

  .el-menu-item {
    padding: 0 !important;
    height: auto;
    margin: 16px 0;
    &:hover,
    &:focus {
      background-color: #fff;
    }
    svg {
      @include set-size(90px);
    }
  }
}

span {
  color: #fff;
}

.el-button {
  background-color: $primary-color;
  width: 80%;
  margin: auto;
  color: #fff;
  margin-bottom: 50px;
}
</style>
