import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoText,
  OiImage,
  MdDeleteSharp,
  HiDuplicate,
  MdDragindicatorRound,
  BiInfoCircleFill,
  MdSavealtOutlined,
  MdLivehelp,
} from "oh-vue-icons/icons";

addIcons(
  CoText,
  OiImage,
  MdDeleteSharp,
  HiDuplicate,
  MdDragindicatorRound,
  BiInfoCircleFill,
  MdSavealtOutlined,
  MdLivehelp
);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
