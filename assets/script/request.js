var userId;
var hospname;
var btnno;
var ref1 = firebase.database().ref("hospitalsandbloodbanks");
var ref2 = firebase.database().ref('request');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
    }
})

ref1.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var id=childData.id;
        if(userId == id) {
            hospname = childData.hospital_or_bloodbank_name;
        }
    });
});


function select(){
    ref2.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var hosp_name = childData.hosp_name;
            var childData = childSnapshot.val();
            var name = childData.name;
            var phone = childData.phone_no;
            var blood = childData.blood;
            var resp = childData.accept;
            
            if(hospname == hosp_name) {
                addItems(name,phone,blood,resp);                    
            }
        });
    });
}

window.onload = select;

var sl = 0;
var trowid = 0;
function addItems(name,phone,blood,resp) {
    
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var slno = document.createElement('td');
    var nameop = document.createElement('td');
    var phoneop = document.createElement('td');
    var bloodop = document.createElement('td');
    var respop = document.createElement('td');
    var accept = document.createElement('td');
    var save = document.createElement('td');
    var acc = document.createElement('button');
    acc.id = trowid;
    acc.onclick = function acceptval() {
        btnno = event.srcElement.id;
        var x = "true";
        alert(hospname);
        firebase.database().ref('request/' + hospname).update({
            accept: x
        });
    }
    acc.style.backgroundColor = "rgb(0, 169, 0)";
    acc.style.borderRadius = "10px";
    acc.style.border = "none";
    acc.style.width = "60px";
    acc.style.height = "35px";
    acc.style.cursor = "pointer";
    acc.style.fontWeight = "650";
    
    var del = document.createElement('button');
    del.id = trowid++;
    del.onclick = function deleteval() {
        btnno = event.srcElement.id;
        firebase.database().ref('request/' + hospname).remove();
    }
    del.style.backgroundColor = "rgb(255, 24, 24)";
    del.style.borderRadius = "10px";
    del.style.border = "none";
    del.style.width = "60px";
    del.style.height = "35px";
    del.style.cursor = "pointer";
    del.style.fontWeight = "650";
    
    
    slno.innerHTML = ++sl;
    nameop.innerHTML = name;
    phoneop.innerHTML = phone;
    bloodop.innerHTML = blood;
    respop.innerHTML = resp;
    del.innerHTML = "X";
    acc.innerHTML = "Accept";
    
    save.appendChild(del);
    accept.appendChild(acc);
    
    trow.appendChild(slno);
    trow.appendChild(nameop);
    trow.appendChild(phoneop);
    trow.appendChild(bloodop);
    trow.appendChild(respop);
    trow.appendChild(accept);
    trow.appendChild(save);
    
    tbody.appendChild(trow);    
}