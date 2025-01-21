import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import ImagePickerModal from "../../../src/components/modals/ImagePickerModal.vue";

describe("ImagePickerModal Component", () => {
  const factory = (props) => {
    return mount(ImagePickerModal, {
      props,
    });
  };

  it("updates the image after selecting a new image from the opened modal", async () => {
    const wrapper = factory({
      blockId: 1,
    });

    const firstImage = wrapper.find("img[src='/image-1.png']");
    await firstImage.trigger("click");
    expect(wrapper.vm.selectedImage).toBe("/image-1.png");

    const insertButton = wrapper.findComponent({ name: "InsertImageButton" });
    await insertButton.vm.$emit("update:selected-image", "/image-1.png");

    expect(wrapper.emitted("update:image")).toBeTruthy();
    expect(wrapper.emitted("update:image")?.[0]).toEqual([1, "/image-1.png"]);

    expect(wrapper.emitted("update:modal")).toBeTruthy();
    expect(wrapper.emitted("update:modal")?.[0]).toEqual([
      { blockId: 0, open: false },
    ]);
  });

  it("closes the modal without selecting an image", async () => {
    const wrapper = factory({
      blockId: 1,
    });

    const closeButton = wrapper.findComponent({ name: "CloseButton" });
    await closeButton.vm.$emit("update:modal", { blockId: 0, open: false });

    expect(wrapper.emitted("update:modal")).toBeTruthy();
    expect(wrapper.emitted("update:modal")?.[0]).toEqual([
      { blockId: 0, open: false },
    ]);
  });
});
