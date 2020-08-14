import Vue from "vue";
import { Message, Select, Option, MessageBox, Pagination } from "element-ui";
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
