<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="form.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="form.username"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="form.email"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  minlength="8"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { update } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        image: "",
        bio: "",
      },
    };
  },
  created() {
    let keys = Object.keys(this.form);
    keys.forEach((key) => {
      this.form[key] = this.user[key];
    });
  },
  methods: {
    async submit() {
      const { data } = await update({
        user: this.form,
      });
      // console.log(data)
      // TODO: 保存用户的登录状态
      this.$store.commit("setUser", data.user);

      // 为了防止刷新页面数据丢失，我们需要把数据持久化
      Cookie.set("user", data.user);
      this.$router.replace(`/profile?username=${data.user.username}`);
      console.log("ok");
    },
    async logout() {
      await this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!",
        });
      });
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.replace("/");
    },
  },
};
</script>

<style></style>
