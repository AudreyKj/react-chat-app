## Chat app with React

React chat app that retrieves previous messages and enables users to post messages. I’ve used Create React App to kickstart the project, as it comes with babel and webpack configured and is supported by a broad range of browsers for production builds. <br/>

## Implementation

My implementation focused on usability and responsiveness with a coherent design. <br/> I've chosen React because it ensures great and fast user experience when UI elements change. I've mostly used stateless function components and Hooks (useState, useEffect, useRef) because of their readability and flexibility. The app also features loading and error messages. <br/>
I've tested both components with Jest and added metatags with react-helmet to improve SEO. <br/>

## Future improvements

If this chat was part of a larger app with components that share information, then I think using Redux would be better to manage the state. I would also add polyfills for older browsers, use Material-UI to ensure the coherent styling of numerous elements, and add more tests.

## Features

- get previous messages
- post new message (click on send button or press Enter)
- loading message when GET request retrieves messages
- error messages when messages failed to load or to be sent
- error message that prevents users sending an empty message

## Tech

**Stack**: SASS/SCSS, JavaScript, React, React Hooks, Jest
