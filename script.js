const firebaseConfig = {
    apiKey: "AIzaSyDOziYO4lXeJDp9Cpb9BH42xh_hVgvSxNU",
    authDomain: "codenation-musicplaylist.firebaseapp.com",
    databaseURL: "https://codenation-musicplaylist-default-rtdb.firebaseio.com",
    projectId: "codenation-musicplaylist",
    storageBucket: "codenation-musicplaylist.appspot.com",
    messagingSenderId: "1014413194085",
    appId: "1:1014413194085:web:dd765894f740257a23e78c",
    measurementId: "G-1QEMY54EN3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database().ref();
const addButton = document.getElementById("add")
const form = document.getElementById("form");
const imageDiv = document.getElementById("displayImage");
const songDiv = document.getElementById("displaySong");
const artistDiv = document.getElementById("displayArtist");
const linkDiv = document.getElementById("displayLink");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const img = document.getElementById("image").value;
    const songName = document.getElementById("song").value;
    const artist = document.getElementById("artist").value;
    const link = document.getElementById("link").value;
  
    const value = {
      IMAGE: img,
      SONG: songName,
      ARTIST: artist,
      LINK: link,
    };
    
    // Push the value to the Firebase database
    database.push(value);
  
    // Clear input fields and close the modal
    document.getElementById("image").value = "";
    document.getElementById("song").value = "";
    document.getElementById("artist").value = "";
    document.getElementById("link").value = "";
  });
  
  // Listen for new child messages added to the database
  database.on("child_added", (snapshot) => {
    const data = snapshot.val();
    const img = data.IMAGE;
    const songName = data.SONG;
    const artist = data.ARTIST;
    const link = data.LINK;
  
    const imageE = document.createElement("img");
    imageE.src = img;

    const songE = document.createElement("p");
    songE.textContent = songName;

    const artistE = document.createElement("p");
    artistE.textContent = artist;

    const linkE = document.createElement("a");
    linkE.href = link;
    linkE.target = "_blank";
    linkE.innerHTML = "link";


    imageDiv.appendChild(imageE);
    songDiv.appendChild(songE);
    artistDiv.appendChild(artistE);
    linkDiv.appendChild(linkE);
  });