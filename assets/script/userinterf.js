var userId;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userId = user.uid;
  }
  else {
    alert("You have logged out");
    window.location.href = "index.html";
  }
});

var ref = firebase.database().ref("hospitalsandbloodbanks");

ref.on("value", function(snapshot) {
  snapshot.forEach(
    function(childSnapshot) {
      var childData = childSnapshot.val();
      var id=childData.id;
      
      if (userId == id) {
        var hospname = childData.hospital_or_bloodbank_name;
        var apos = childData.quantity_apositive;
        var aneg = childData.quantity_anegative;
        var bpos = childData.quantity_bpositive;
        var bneg = childData.quantity_bnegative;
        var opos = childData.quantity_opositive;
        var oneg = childData.quantity_onegative;
        var abpos = childData.quantity_abpositive;
        var abneg = childData.quantity_abnegative;

        document.getElementById("greetingtext").innerHTML = "Hi, " + hospname;
        document.getElementById("ap").innerHTML = apos + "ml";
        document.getElementById("bp").innerHTML = bpos + "ml";
        document.getElementById("op").innerHTML = opos + "ml";
        document.getElementById("abp").innerHTML = abpos + "ml";
        document.getElementById("an").innerHTML = aneg + "ml";
        document.getElementById("bn").innerHTML = bneg + "ml";
        document.getElementById("on").innerHTML = oneg + "ml";
        document.getElementById("abn").innerHTML = abneg + "ml";

        let str = hospname;
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
  canvas.width = 50;
  canvas.height = 50;
  // Draw background
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Draw text
  context.font = "bold 21px Assistant";
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

function edit() {
  var aplus = document.getElementById("aplus").value;
  var bplus = document.getElementById("bplus").value;
  var oplus = document.getElementById("oplus").value;
  var abplus = document.getElementById("abplus").value;
  var aminus = document.getElementById("aminus").value;
  var bminus = document.getElementById("bminus").value;
  var ominus = document.getElementById("ominus").value;
  var abminus = document.getElementById("abminus").value;

  firebase.database().ref("hospitalsandbloodbanks/" + userId).update({
    quantity_apositive: aplus,
    quantity_bpositive: bplus,
    quantity_opositive: oplus,
    quantity_abpositive: abplus,
    quantity_anegative: aminus,
    quantity_bnegative: bminus,
    quantity_onegative: ominus,
    quantity_abnegative: abminus
  });
  alert("saved");
  alert("if error occurs go to the previous page");
}