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
            <span>
              <img src="../assets/images/login/Group 2.png" />
            </span>
            <input v-model="loginData.account"
                   placeholder="Account"
                   tabindex="1"
                   type="text" />
          </div>
          <br />
          <div class="form-item">
            <span>
              <img src="../assets/images/login/Group 6.png" />
            </span>
            <input v-model="loginData.password"
                   placeholder="Password"
                   tabindex="2"
                   type="password"
                   @keyup.enter.native="loginHandler" />
          </div>
          <button @click.prevent="loginHandler">SIGN IN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        account: '',
        password: '',
      },
    };
  },
  methods: {
    loginHandler() {
      if (this.loginData.account && this.loginData.password) {
        const data = {};
        Object.assign(data, this.loginData);
        this.$axios
          .post('user/login', data)
          .then((res) => {
            if (res.login_token) {
              const tokenId = res.login_token;
              localStorage.setItem('Authorization', tokenId);
              localStorage.setItem('userData', JSON.stringify(res));
              this.$store.commit('setUser');
              if (tokenId) {
                this.$router.push('/alerts');
              }
              this.$message({
                message: 'Login successfully!',
                showClose: true,
                type: 'success',
              });
            } else {
              this.$message({
                message: 'Login error!',
                type: 'error',
              });
            }
          })
          .catch(() => {
            this.$message({
              message: 'Login error!',
              type: 'error',
            });
          });
      } else {
        this.$message({
          message: 'Lack of content！',
          type: 'error',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/views/login.scss';
</style>
