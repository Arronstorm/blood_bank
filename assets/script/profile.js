
var userId;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
    }
})


var ref = firebase.database().ref("hospitalsandbloodbanks");

ref.on("value", function(snapshot) {
  snapshot.forEach(
    function(childSnapshot) {
      var childData = childSnapshot.val();
      var id=childData.id;
    
      if (userId == id) {
        hospnameip = childData.hospital_or_bloodbank_name;
        addressip = childData.address;
        emailip = childData.email;
        mobileip = childData.mobile;
        cityip = childData.city;
        stateip = childData.state;
   
        document.getElementById("hospital-name-op").innerHTML = hospnameip;
        if (addressip.length>65) {
          document.getElementById("address-op").innerHTML = addressip.replace(/(.{75})/g, "$1<br>");
        }
        else {
          document.getElementById("address-op").innerHTML = addressip;
        }
        document.getElementById("email-op").innerHTML = emailip;
        document.getElementById("mobile-op").innerHTML = mobileip;
        document.getElementById("city-op").innerHTML = cityip;
        document.getElementById("state-op").innerHTML = stateip;
      
        let str = hospnameip;
        let spliting = str.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
        var final = spliting.toUpperCase();
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        var color = "#" + randomColor;
      
        document.getElementById("avatar").src = generateAvatar(
          final,
          "white",
          color
        );
      
      }
    });
  });
  

function generateAvatar(
  text,
  foregroundColor = "white",
  backgroundColor = "black"
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  
  canvas.width = 150;
  canvas.height = 150;
  
  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  context.font = "50px Montserrat";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  return canvas.toDataURL("image/png");
}



var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function fnedit() {
  var hospnameval = document.getElementById("hospname-txtpo").value;
  var addressval = document.getElementById("address-txtpo").value;
  var mobilenoval = document.getElementById("mobile-txtpo").value;
  var cityval = document.getElementById("city-txtpo").value;
  var stateval = document.getElementById("state-txtpo").value;

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