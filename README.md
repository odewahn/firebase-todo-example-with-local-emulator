This repo has an example of how to set up a simple "To Do" list app in firebase with the following features:

- Local development with firebase emulator
- Authentication with `react-firebaseui` stored in a React context (see `auth_context.js`)
- Set up for `react-router` (v. 5)
- Local ACL rules in `firestore.rules`
- Local index development in `firestore.indexes.json`
- Create/Update/Delete examples for list items
- Snapshot-based updates for the UI as it progresses

There is also a start at pagination, although this is not complere. Firebase seems to make this hard, even though it's a basic feature.

While I like the ability to have all the backend features just work without any ops, there is a serious tradeoff in making the kinds of queries you could do with something like SQL. So, caveat emptor.

# Setting up

Create the initial project:

```
npx create-react-app todo-list
```

Install some dependencies:

```
npm install --save --legacy-peer-deps \
   react-router-dom@5.2.0 \
   @mui/material \
   @emotion/react \
   @emotion/styled \
   @mui/icons-material \
   react-firebaseui
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

In another tab, start the dev environment:

```
npm run start
```

# Deployment

## Deploy firestore rules

Add rules in the file `firestore.rules`. Here's an example:

```
firebase deploy --only firestore:rules
```

## Firestore indexes

Add indexes in the file `fiewstore.indexes.json`. This [Full Stack Firebase](https://www.fullstackfirebase.com/cloud-firestore/indexes) article has more detail, but the basic format is:

```
{
  "indexes": [
    {
      "collectionId": "todos",
      "fields": [
        {
          "fieldPath": "user",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "ASCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Note that in general you have to have two fields in an index, not just one. Weird.

Once it's done, you can deploy it like this:

```
firebase deploy --only firestore:indexes
```

# Other Notes

## Authentication

- https://lo-victoria.com/beginner-friendly-guide-to-react-authentication-system-with-firebase
