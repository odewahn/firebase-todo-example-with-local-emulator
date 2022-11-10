# Setting up

Create the initial project:

```
npx create-react-app todo-list
```

Install some dependencies:

```
npm install --save react-router-dom@5.2.0 @mui/material @emotion/react @emotion/styled @mui/icons-material
```

I also usually like to clear out some files in here.

# Set up firebase:

```
firebase init
```

For this, I'm selecting:

```
Firestore: Configure security rules and indexes files for Firestore
Functions: Configure a Cloud Functions directory and its files
Hosting: Configure files for Firebase Hosting
Emulators
```

There are a bunch more options, but I mostly accept the defaults.

Also, install `firebase` node module:

```
npm install --save firebase
```

In the firebase console, go to your project and then create a new app. I'm calling this one `todo-list`. Once it's created, put the firebase config into a faile called `src/firebase.js`.

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  ...
  appId: "1:1040196214089:web:88420ffeb0daa5482c8e98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

Next, add a conditional so that it can use the emulator if you're developing locally:

```
if (location.hostname === "localhost") {
   config = {
      databaseURL: "http://localhost:9000/?ns=gpt3-experiments-sparktime",
   };
}
```

# Fire up the dev environment

You'll need two tabs: one to run the emulator and one to run the react app.

To start the emulator, run:

```
firebase emulators:start
```
