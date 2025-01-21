import { mount, VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ComponentPublicInstance } from "vue";

import App from "../src/App.vue";

type AppInstance = ComponentPublicInstance<{
  list: {
    id: number;
    type: string;
    text?: string;
    image?: string;
    order: number;
  }[];
  uniqueIdCounter: number;
}>;

describe("App Component", () => {
  it("adds a new text block to the list when TextElement is clicked", async () => {
    const wrapper = mount(App, {
      data() {
        return {
          list: [] as {
            id: number;
            type: string;
            text?: string;
            image?: string;
            order: number;
          }[],
          uniqueIdCounter: 0,
        };
      },
    }) as VueWrapper<AppInstance>;

    const textElement = wrapper.findComponent({ name: "TextElement" });

    await textElement.vm.$emit("update:list", [
      ...wrapper.vm.list,
      {
        id: wrapper.vm.uniqueIdCounter,
        type: "text",
        text: "Edit text here",
        order: 1,
      },
    ]);

    expect(wrapper.vm.list).toContainEqual(
      expect.objectContaining({ type: "text", text: "Edit text here" })
    );

    // blockId starts from 0
    expect(wrapper.vm.uniqueIdCounter).toBe(wrapper.vm.list.length - 1);
  });

  it("adds a new image block to the list when ImageElement is clicked", async () => {
    const wrapper = mount(App, {
      data() {
        return {
          list: [] as {
            id: number;
            type: string;
            text?: string;
            image?: string;
            order: number;
          }[],
          uniqueIdCounter: 0,
        };
      },
    }) as VueWrapper<AppInstance>;

    const textElement = wrapper.findComponent({ name: "ImageElement" });

    await textElement.vm.$emit("update:list", [
      ...wrapper.vm.list,
      { id: wrapper.vm.uniqueIdCounter, type: "image", image: "", order: 1 },
    ]);

    expect(wrapper.vm.list).toContainEqual(
      expect.objectContaining({ type: "image", image: "" })
    );

    // blockId starts from 0
    expect(wrapper.vm.uniqueIdCounter).toBe(wrapper.vm.list.length - 1);
  });
});
