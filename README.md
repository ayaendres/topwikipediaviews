# Top Wikipedia Articles

To run this project locally you will need to be able to run the start script. To do this you will need the to have Node and npm or yarn downloaded. Once those are downloaded, install the project's dependencies with the following command:

`npm i` or `yarn`

Once the packages are install you should be able to run the project locally with:

`npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Additionally, you can run the tests with: 

`npm test` or `yarn test`

## Documentation

This app was bootstrapped with create react app. All the component code and logic can be found in the src directory.

### Packages and their uses
Aside from React and Typescript I used the following third party libraries:

- React Query: 
  - This package allows me to create hooks to API calls. These are implemented in the hooks directory. And get used in SearchPage and PinnedArticleRow
- Axios:
  - Used to make the calls to the wikimedia API. This is separated from React Query and actually does the asynchronous call to APIs. This code can be found in src/hooks
- @emotion/react:
  - Implements the css within the components. It adds a `css` field to html components to apply styles from its own `css()` function. This is used heavily in the project and can be seen anywhere with styles.
- react-day-picker:
  - Implements the calendar component. I chose this picker specifically because it allowed me to restyle almost everything about it and still use the basic functionality.
- react-popper:
  - Implements the popover functionality of the date and number of rows buttons.

### Pinning and pinning behavior
I decided to implement the pinning behavior. I chose to have the pinned values still show up in the list if the main list, so they can be seen with their relative rank. This also allows the user to unpin articles from within the main list.

I chose to implement the pinning behavior because I haven't used sessionStorage before and wanted to try it. 

### Other notes

The basic component and hook structure is as follows:

App:
- Banner
- SearchPage
  - useGetTopArticles()
  - SearchBar
    - DatePicker
    - CountPicker
    - SearchButton
  - PinnedArticleRow[]
    - useGetArticle() 
    - ArticleRow
  - ArticleRow[] 
  - Pagination

#### What is cssWithMq?
This function takes css styles with arrays of values and applies them based on screen size. Its css with applied media query for width.

Example: 
I want width to be "100%" on mobile but only "60%" on desktop.

```
const variableWidth = cssWithMq({
    width: ["100%", "60%"],
});
```
variableWidth will return with media queries based on the settings in cssWithMq.

On mobile screens (min-width: 0px) the first css will be applied ("100%")

On desktop screens (min-width: 800px) the second css will be applied ("60%")

This set up means we don't need to make media queries all over the app for different styles, we can just use arrays.