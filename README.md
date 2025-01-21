# Drag and Drop Builder Assignment

Build a simple drag & drop landing page builder using any of Vue.js, Angular, React. Extra points for using Vue.js.

## Solution overview

This solution provides a drag and drop functionality, allowing users to **drag**, **rearrange**, **duplicate** and **delete** blocks. In addition it goes a step further to allow users to add new blocks of type **text** or **image** and let them see their recent working images.
![Alt text](/public/landing-page.png "Drag and Drop Builder - Landing Page")

## How to run the project

- git clone git@github.com:stevendaye/dnd-builder.git
- cd dnd-builder
- npm install
- npm run dev

## Technologies & Libraries used

- Vue 3
- TypeScript
- Tailwind CSS
- Vuedraggable
- Vite
- Vitest

## How to run test cases

- cd dnd-builder
- npm run test

### Run test cases individually

In case you would prefer to run test cases individually. Here are the different test cases you can expect
At the root of the project in dnd-builder. Run the following commands

- **npx vitest tests/components/elements/TextElement.test.ts**

  - renders the TextElement component

- **npx vitest tests/components/elements/ImageElement.test.ts**

  - renders the ImageElement component

- **npx vitest run tests/App.test.ts**

  - adds a new text block to the list when TextElement is clicked
  - adds a new image block to the list when ImageElement is clicked
  - edits text in the TextBlock component
  - exports the list to JSON format when SaveButton is clicked

- **npx vitest run tests/components/Editor.test.ts**

  - renders 2 blocks when the app loads: TextBlock and ImageBlock components
  - removes a block and emits the updated list
  - duplicates a block and emits the updated list
  - renders ImageBlock with default image placeholder
  - opens the modal when clicking on the placeholder image
  - opens the modal when clicking on the 'Replace image' overlay to change block's image

- **npx vitest tests/components/modals/ImagePickerModal.test.ts**
  - updates block's image after selecting a new image from the opened modal
  - updates block's image after a new image is selected from the opened modal

## Completed Requirement

- Create 2 draggable blocks: Text and Image ✅
- The content of Text block should be editable ✅
- Image block can be edited by selecting one of the 3-4 predefined images ✅
- The user should be able to rearrange, duplicate and delete blocks ✅
- Landing page data like the text content, links to images, block order, etc. should be exported to a JSON format when the user clicks the “Save” button (console.log is enough) ✅
- Style the application using CSS or a CSS framework of your choice (e.g., Tailwind CSS) ✅
- The application should be responsive ✅
- Test cases are a bonus ✅

## Thinking oustside the box

All requirements for this project have been implemented. Nevertheless, because I also have in mind the user's experience, I identified a few pain-points that I believe could improve the user's experience. Therefore I went one step further to implements a few additionnal features inspired by the main requirements

- **Add text block**: Located on the left hand side section, when clicked, this adds a new block of type _text_ to the list of blocks
- **Add Image block**: Located on the left hand side section, when clicked. this adds a new block of type _image_ to the list of blocks

  - I implemented these 2 elements because I thought it would be great if after deleting all blocks form the editor, the user can add new blocks without reloading the page

- **Media Assets**: I got inspiration of MailerLite's image upload modal. This represents a container of all used or applied images within the app. Think of it like after selecting a new image to the image block, that image is then stored in the media assets container to show you your recents working images that have been used so far

- **Help Guide**: Located on the right hand section, this represents a section that serves as a guide on how to use the application. It tells the user how to _drag_, _rearrange_, _duplicate_ and _delete_ blocks. It lists each icon with their description.

### README: To change an image in an image block, hover over the desired image, you will then see the overlay with the text _Change image_. Click to open the image modal again
