import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import App from "../../../src/App.vue";

describe("ImageElement Component", () => {
  it("renders the ImageElement component", () => {
    const wrapper = mount(App);

    const imageElement = wrapper.findComponent({ name: "ImageElement" });

    expect(imageElement.exists()).toBe(true);
  });
});
