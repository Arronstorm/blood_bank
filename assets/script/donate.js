var userId;
var hospname;
var btnno;
var ref1 = firebase.database().ref("hospitalsandbloodbanks");
var ref2 = firebase.database().ref('donation');

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
            var childData = childSnapshot.val();
            var name = childData.name;
            var blood = childData.blood_grp;
            var date = childData.appointment_date;
            var time = childData.appointment_time;
            var hospitalname = childSnapshot.key;
            if (hospname == hospitalname) {
                addItems(name,blood,date,time);                    
            }
        });
    });
}

window.onload = select;

var sl = 0;
var trowid = 0;
function addItems(name,blood,date,time) {
    
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var slno = document.createElement('td');
    var nameop = document.createElement('td');
    var bloodop = document.createElement('td');
    var dateop = document.createElement('td');
    var timeop = document.createElement('td');
    var editdateop = document.createElement('td');
    var edittimeop = document.createElement('td');
    var edit = document.createElement('td');

    var datetext = document.createElement('input');
    datetext.setAttribute('type','date')
    datetext.id = "dateval";
    datetext.style.borderRadius = '10px';
    datetext.style.width = '170px';
    datetext.style.height = '30px';

    
    var timetext = document.createElement('input');
    timetext.setAttribute('type','time')
    timetext.id = "timeval";
    timetext.style.borderRadius = '10px';
    timetext.style.width = '100px';
    timetext.style.height = '30px';

    var editbtn = document.createElement('button');
    editbtn.id = "btninp";
    editbtn.style.backgroundColor = 'rgb(243,50,50)';
    editbtn.style.fontWeight = '650';
    editbtn.style.borderRadius = '10px';
    editbtn.style.border = 'none';
    editbtn.style.width = '70px';
    editbtn.style.height = '35px';
    editbtn.innerHTML = "Save";
    editbtn.onclick = function fun() {
        var x = document.getElementById('dateval').value;
        var y = document.getElementById('timeval').value;

        time = y.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? ' AM' : ' PM';
            time[0] = +time[0] % 12 || 12;
        }
        var edittime = time.join ('');
        alert(x);
        alert(edittime);
        
        if (x == '') {
            firebase.database().ref('donation/' + hospname).update ({
                appointment_date: date
            });
        }
        else {
            firebase.database().ref('donation/' + hospname).update ({
                appointment_date: x
            });
        }
        if (y == '') {
            firebase.database().ref('donation/' + hospname).update ({
                appointment_time: time
            });
        }
        else {
            firebase.database().ref('donation/' + hospname).update ({
                appointment_time: edittime
            });
        }
    }

    slno.innerHTML = ++sl;
    nameop.innerHTML = name;
    bloodop.innerHTML = blood;
    dateop.innerHTML = date;
    timeop.innerHTML = time;

    editdateop.appendChild(datetext);
    edittimeop.appendChild(timetext);
    edit.appendChild(editbtn);
    
    trow.appendChild(slno);
    trow.appendChild(nameop);
    trow.appendChild(bloodop);
    trow.appendChild(dateop);
    trow.appendChild(timeop);
    trow.appendChild(editdateop);
    trow.appendChild(edittimeop);
    trow.appendChild(edit);
    
    tbody.appendChild(trow);    
}