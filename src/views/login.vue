<template>
  <div class="max">
    <div class="container">
      <div class="saide">
        <img src="../assets/images/login/loginLeft.png" />
      </div>
      <div class="main">
        <img src="../assets/images/login/loginLogo.png" />
        <p>Welcome Back</p>
        <form :model="loginData"
              class="form">
          <div class="form-item">
            <span><img src="../assets/images/login/Group 2.png" /></span>
            <input v-model="loginData.username"
                   placeholder="Username" />
          </div>
          <br />
          <div class="form-item">
            <span><img src="../assets/images/login/Group 6.png" /></span>
            <input v-model="loginData.password"
                   placeholder="Password" />
          </div>
          <button @click="loginHandler(loginData)">SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {},
    };
  },
  methods: {
    loginHandler(loginData) {
      // TODO
      console.log(loginData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/login.scss';
</style>
