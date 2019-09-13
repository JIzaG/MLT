// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SETTINGS } from './settings';

export const environment = {
  production: false,
  appSettings: SETTINGS,
  googleMapApiKey: 'AIzaSyBSvo0x8v3C6aFWcSi2zooOC9tqGCOqCj4',
  firebaseConfig: {
    apiKey: "AIzaSyBOJMXB1fcOHALoJyWuJOFZXCM0vTcw82Y",
    authDomain: "mylittletooth-1a268.firebaseapp.com",
    databaseURL: "https://mylittletooth-1a268.firebaseio.com",
    projectId: "mylittletooth-1a268",
    storageBucket: "mylittletooth-1a268.appspot.com",
    messagingSenderId: "621879008612",
    appId: "1:621879008612:web:8455bf2b76d8445a"
  }
};
