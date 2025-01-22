import { mount, VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ComponentPublicInstance } from "vue";

import App from "../src/App.vue";
import TextBlock from "../src/components/blocks/TextBlock.vue";
import SaveButton from "../src/components/buttons/SaveButton.vue";

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

  it("edits or updates text in the TextBlock component", async () => {
    const initialText = "Edit text here";
    const updatedText = "Newsletters and Campaigns";

    const wrapper = mount(TextBlock, {
      props: {
        element: {
          id: 0,
          type: "text",
          text: initialText,
          order: 1,
        },
      },
    });

    const input = wrapper.find("textarea");
    await input.setValue(updatedText);

    expect(input.element.value).toBe(updatedText);
    expect(wrapper.props("element").text).toBe(updatedText);
  });

  it("exports landing page data to JSON format when Save button is clicked", async () => {
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

    const saveButton = wrapper.findComponent(SaveButton);

    const consoleSpy = vi.spyOn(console, "log");

    await saveButton.vm.$emit("update:export");

    expect(consoleSpy).toHaveBeenCalledWith(
      JSON.stringify(wrapper.vm.list, null, 2)
    );

    consoleSpy.mockRestore();
  });
});
