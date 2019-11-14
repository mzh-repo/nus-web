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
        // localStorage.setItem('Authorization', 'tokenId');
        // localStorage.setItem(
        //   'HeadImgUrl',
        //   'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1829100024,2848942066&fm=26&gp=0.jpg',
        // );
        // localStorage.setItem('Username', data.name);
        // localStorage.setItem('Gender', 'female');
        // localStorage.setItem('LastLogin', '2019-09-28 00:00:00');
        // this.$router.push('/alerts');
        this.$axios
          .post('user/login', data)
          .then((res) => {
            if (res.login_token) {
              const tokenId = res.login_token;
              localStorage.setItem('Authorization', tokenId);
              localStorage.setItem('userData', JSON.stringify(res));
              localStorage.setItem('Account', res.account);
              localStorage.setItem('Username', res.name);
              localStorage.setItem('Gender', res.gender);
              localStorage.setItem('LastLogin', res.last_login_time);
              this.$store.commit('setUser');
              if (tokenId) {
                this.$router.push('/alerts');
              }
              this.$message({
                message: 'Login successfully！',
                showClose: true,
                type: 'success',
              });
            } else {
              this.$message({
                message: 'Login error！',
                type: 'error',
              });
            }
          })
          .catch(() => {
            this.$message({
              message: 'server error！',
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
