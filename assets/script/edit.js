var userId;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userId = user.uid;
  }
});

let formMessage = firebase.database().ref("hospitalsandbloodbanks");
document.getElementById('updateform').addEventListener('submit', formSubmit);
function formSubmit(e) {
    e.preventDefault();
    save()
    document.getElementById('updateform').reset();
}

function sendMessage(hospnameval,addressval,mobilenoval,cityval,stateval) {
  firebase.database().ref("hospitalsandbloodbanks/" + userid).update({
    hospital_or_bloodbank_name: hospnameval,
    address: addressval,
    mobile: mobilenoval,
    city: cityval,
    state: stateval,
  });
  alert("saved");
  alert("if error occurs go to the previous page");
}

function save(){
  var hospnameval = document.getElementById("hospname-txtpo").value;
  var addressval = document.getElementById("address-txtpo").value;
  var mobilenoval = document.getElementById("mobile-txtpo").value;
  var cityval = document.getElementById("city-txtpo").value;
  var stateval = document.getElementById("state-txtpo").value;

  sendMessage(hospnameval,addressval,mobilenoval,cityval,stateval);
}  

function fnedit() {
 
  firebase.database().ref("hospitalsandbloodbanks/" + userId).update({
    hospital_or_bloodbank_name: hospnameval,
    address: addressval,
    mobile: mobilenoval,
    city: cityval,
    state: stateval,
  });
  alert("saved");
  alert("if error occurs go to the previous page");
}