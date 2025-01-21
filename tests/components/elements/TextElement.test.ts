import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import App from "../../../src/App.vue";

describe("TextElement Component", () => {
  it("renders the TextElement component", () => {
    const wrapper = mount(App);

    const textElement = wrapper.findComponent({ name: "TextElement" });

    expect(textElement.exists()).toBe(true);
  });
});
