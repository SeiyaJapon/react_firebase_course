import * as firebase from 'firebase'

const config = {
    apiKey: "*****",
    appId: "****",
    authDomain: "*****.firebaseapp.com",
    databaseURL: "https://*****.firebaseio.com",
    measurementId: "*********",
    messagingSenderId: "****",
    projectId: "****",
    storageBucket: "*****.appspot.com",
};

firebase.initializeApp(config);

const firestore = firebase.firestore()
// const settings = { timestampsInSnapshots: true }
const settings = {}

firestore.settings(settings)

export const auth = firebase.auth()
export const db = firestore
export const storage = firebase.storage()