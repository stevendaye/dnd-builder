import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  CoText,
  OiImage,
  MdDeleteoutlineRound,
  HiDuplicate,
  MdDragindicatorRound,
  BiInfoCircleFill,
} from "oh-vue-icons/icons";

addIcons(
  CoText,
  OiImage,
  MdDeleteoutlineRound,
  HiDuplicate,
  MdDragindicatorRound,
  BiInfoCircleFill
);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
