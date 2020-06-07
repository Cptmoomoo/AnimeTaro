// google firebase config
var firebaseConfig = {
    apiKey: "AIzaSyCq8FFGVTgSRPvmKyclYSJ35QB3Af8qXkA",
    authDomain: "animetaro-bdd78.firebaseapp.com",
    databaseURL: "https://animetaro-bdd78.firebaseio.com",
    projectId: "animetaro-bdd78",
    storageBucket: "animetaro-bdd78.appspot.com",
    messagingSenderId: "986768296256",
    appId: "1:986768296256:web:acdcfd5f3b5f338236d2a5",
    measurementId: "G-K6P7HRVS9M"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function writeWebtoDatabase() {
    var source = chrome.extension.getBackgroundPage().currentDomain;;
    var title = source.split(".");
    title = title[1] + ":" + chrome.extension.getBackgroundPage().anime_title
    firebase.database().ref(title).set({
        Status: chrome.extension.getBackgroundPage().isValidPage
    });

}

document.getElementById('retry').addEventListener('click', writeWebtoDatabase);
