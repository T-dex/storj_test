import firebase from 'firebase';

const config={
    apiKey: "AIzaSyD_UKXQZYWXHYGlic8zS8GnZbYz0qbtHpQ",
    authDomain: "storj-dex-mills.firebaseapp.com",
    databaseURL: "https://storj-dex-mills.firebaseio.com",
    storageBucket: "storj-dex-mills.appspot.com",
};
firebase.initializeApp(config);
const test=firebase.auth()
console.log(test);



export default firebase;