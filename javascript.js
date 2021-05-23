 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBOZRLdQJIcSgBEd-5deZFcdvlD0GDM1p8",
    authDomain: "test-form-5ec34.firebaseapp.com",
    projectId: "test-form-5ec34",
    storageBucket: "test-form-5ec34.appspot.com",
    messagingSenderId: "872815346652",
    appId: "1:872815346652:web:5ec699aaa50c5ebc620519"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Refernece contactInfo collections
  let contactInfo = firebase.database().ref("infos");
  
  // Listen for a submit
  document.querySelector(".contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    //   Get input Values
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let description = document.querySelector("#description").value;
    console.log(name, email, description);
  
    saveContactInfo(name, email, description);
  
    document.querySelector(".contact-form").reset();

    sendEmail(name, email, description);
  }
  
  // Save infos to Firebase
  function saveContactInfo(name, email, description) {
    let newContactInfo = contactInfo.push();
  
    newContactInfo.set({
      name: name,
      email: email,
      description: description,
    });

    retriveInfos();
  }

  // Retrive infos
  function retriveInfos() {
      let ref = firebase.database().ref("infos");
      ref.on("value", gotData);
  }

  function gotData(data) {
      let info = data.val();
      let keys = Object.keys(info);

      for (let i = 0; i < keys.length; i++) {
          let infoData = keys[i];
          let name = info[infoData].name;
          let email = info[infoData].email;
          let description = info[infoData].description;
          console.log(name, email, description);
      }
  }
  //Send Email info
  function sendEmail(name, email, description) {
      Email.send({
          Host: "smtp.gmail.com",
          Username: "myweb1908@gmail.com",
          Password: "Smart123",
          To: "myweb1908@gmail.com",
          From: "myweb1908@gmail.com",
          Subject: `${name} sent you a message`,
          Body: `Name: ${name} <br/> Email: ${email} <br/> Description: ${description}`
      })
      .then(
          message => alert("Form Submitted Successfully")
      )};