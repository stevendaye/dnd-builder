import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Editor from "../../src/components/Editor.vue";
import TextBlock from "../../src/components/blocks/TextBlock.vue";
import ImageBlock from "../../src/components/blocks/ImageBlock.vue";
import RemoveButton from "../../src/components/buttons/RemoveButton.vue";
import DuplicateButton from "../../src/components/buttons/DuplicateButton.vue";

import { Block, ImageBlockType, TextBlockType } from "../../src/types";

describe("Editor Component", () => {
  const factory = (props) => {
    return mount(ImageBlock, {
      props,
    });
  };

  it("renders 2 blocks when the app loads: TextBlock and ImageBlock components ", () => {
    const initialList: Block[] = [
      {
        id: 0,
        type: "text",
        text: "Edit text here",
        order: 1,
      } as TextBlockType,
      { id: 1, type: "image", image: "", order: 2 } as ImageBlockType,
    ];

    const wrapper = mount(Editor, {
      props: {
        list: initialList,
        assets: [],
        uniqueIdCounter: 2,
      },
      global: {
        components: { TextBlock, ImageBlock },
      },
    });

    const textBlock = wrapper.findComponent(TextBlock);
    expect(textBlock.exists()).toBe(true);
    expect(textBlock.props("element")).toEqual(initialList[0]);

    const imageBlock = wrapper.findComponent(ImageBlock);
    expect(imageBlock.exists()).toBe(true);
    expect(imageBlock.props("element")).toEqual(initialList[1]);
  });

  it("removes a block and emits the updated list", async () => {
    const initialList = [
      {
        id: 1,
        type: "text",
        text: "Edit text here",
        order: 1,
      } as TextBlockType,
      { id: 2, type: "image", image: "", order: 2 } as ImageBlockType,
    ];

    const wrapper = mount(Editor, {
      props: {
        uniqueIdCounter: 3,
        assets: [],
        list: initialList,
      },
    });

    await wrapper.findAllComponents(RemoveButton)[0].trigger("click");

    const emitted = wrapper.emitted("update:list");
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toEqual([
      { id: 2, type: "image", image: "", order: 1 },
    ]);
  });

  it("duplicates a block and emits the updated list", async () => {
    const initialList = [
      {
        id: 1,
        type: "text",
        text: "Edit text here",
        order: 1,
      } as TextBlockType,
      { id: 2, type: "image", image: "", order: 2 } as ImageBlockType,
    ];

    const wrapper = mount(Editor, {
      props: {
        uniqueIdCounter: 3,
        assets: [],
        list: initialList,
      },
    });

    expect(wrapper.props("list")).toHaveLength(2);

    const duplicateButtons = wrapper.findAllComponents(DuplicateButton);

    await duplicateButtons[0].trigger("click");

    const emittedList = wrapper.emitted("update:list") as Array<any>;
    const emittedUniqueIdCounter = wrapper.emitted(
      "update:uniqueIdCounter"
    ) as Array<any>;

    expect(emittedList).toHaveLength(1);
    expect(emittedUniqueIdCounter).toHaveLength(1);

    const updatedList = emittedList[0][0];
    expect(updatedList).toHaveLength(3);

    expect(updatedList[1]).toEqual({
      id: 3,
      type: "text",
      text: "Edit text here",
      order: 2,
    });

    expect(updatedList[0].order).toBe(1);
    expect(updatedList[1].order).toBe(2);
    expect(updatedList[2].order).toBe(3);

    expect(emittedUniqueIdCounter[0][0]).toBe(4);
  });

  it("renders ImageBlock with default image placeholder", () => {
    const initialList: Block[] = [
      { id: 1, type: "image", image: "", order: 1 } as ImageBlockType,
    ];

    const wrapper = mount(Editor, {
      props: {
        list: initialList,
        assets: [],
        uniqueIdCounter: 1,
      },
      global: {
        components: { ImageBlock },
      },
    });

    const imageBlock = wrapper.findComponent(ImageBlock);
    expect(imageBlock.exists()).toBe(true);

    const placeholder = imageBlock.find("img[src='/image-placeholder.png']");
    expect(placeholder.exists()).toBe(true);
  });

  it("opens the modal when clicking on the placeholder image", async () => {
    const wrapper = factory({
      blockId: 1,
      element: {
        type: "image",
        image: "",
      },
    });

    await wrapper.find(".image-default").trigger("click");

    expect(wrapper.emitted("update:modal")).toBeTruthy();
    expect(wrapper.emitted("update:modal")?.[0]).toEqual([
      { blockId: 1, open: true },
    ]);
  });

  it("opens the modal when clicking on the 'Replace image' overlay to change block's image", async () => {
    const wrapper = factory({
      blockId: 1,
      element: {
        type: "image",
        image: "/image-1.png",
      },
    });

    const imageOverlay = wrapper.find(".image-overlay");
    expect(imageOverlay.exists()).toBe(true);

    await imageOverlay.trigger("click");

    expect(wrapper.emitted("update:modal")).toBeTruthy();
    expect(wrapper.emitted("update:modal")?.[0]).toEqual([
      { blockId: 1, open: true },
    ]);
  });
});
