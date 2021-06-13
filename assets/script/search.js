function additems(name,city,state,phno,address,apos,aneg,bpos,bneg,opos,oneg,abpos,abneg) {

    var ul = document.getElementById('list');
    var row = document.createElement('tr');
    var row2 = document.createElement('tr');
    var row3 = document.createElement('hr');
    var space = document.createElement('br');
    row3.style.paddingLeft = "10px";

    var _name = document.createElement('h2');
    var _address = document.createElement('li');
    var _city = document.createElement('li');
    var _state = document.createElement('li');
    var _phno = document.createElement('li');

    _name.innerHTML = name;
    _address.innerHTML = address;
    _city.innerHTML = city;
    _state.innerHTML = state;
    _phno.innerHTML = phno;


    var aposid = document.createElement('th');
    var anegid = document.createElement('th');
    var bposid = document.createElement('th');
    var bnegid = document.createElement('th');
    var oposid = document.createElement('th');
    var onegid = document.createElement('th');
    var abposid = document.createElement('th');
    var abnegid = document.createElement('th');
    
    aposid.innerHTML = 'A+';
    anegid.innerHTML = 'A-';
    bposid.innerHTML = 'B+';
    bnegid.innerHTML = 'B-';
    oposid.innerHTML = 'O+';
    onegid.innerHTML = 'O-';
    abposid.innerHTML = 'AB+';
    abnegid.innerHTML = 'AB-';
    
    row2.appendChild(aposid);
    row2.appendChild(anegid);
    row2.appendChild(bposid);
    row2.appendChild(bnegid);
    row2.appendChild(oposid);
    row2.appendChild(onegid);
    row2.appendChild(abposid);
    row2.appendChild(abnegid);
    
    var aposi = document.createElement('td');
    var anega = document.createElement('td');
    var bposi = document.createElement('td');
    var bnega = document.createElement('td');
    var oposi = document.createElement('td');
    var onega = document.createElement('td');
    var abposi = document.createElement('td');
    var abnega = document.createElement('td');
    
    aposi.innerHTML = apos;
    anega.innerHTML = aneg;
    bposi.innerHTML = bpos;
    bnega.innerHTML = bneg;
    oposi.innerHTML = opos;
    onega.innerHTML = oneg;
    abposi.innerHTML = abpos;
    abnega.innerHTML = abneg;
    
    row.appendChild(aposi);
    row.appendChild(anega);
    row.appendChild(bposi);
    row.appendChild(bnega);
    row.appendChild(oposi);
    row.appendChild(onega);
    row.appendChild(abposi);
    row.appendChild(abnega);
    
    ul.appendChild(_name);
    ul.appendChild(_address);
    ul.appendChild(_city);
    ul.appendChild(_state);
    ul.appendChild(_phno);
    ul.appendChild(row2);
    ul.appendChild(row);
    ul.appendChild(space);
    ul.appendChild(row3);

}

var ref = firebase.database().ref('hospitalsandbloodbanks');
var searchcity = document.getElementById('cityname').value;

function fetchdata() {
    ref.once("value",function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            var childata = childSnapshot.val(); 
            var name = childata.hospital_or_bloodbank_name;
            var city = childata.city;
            var state = childata.state;
            var phno = childata.mobile;
            var address = childata.address;
            var apos = childata.quantity_apositive;
            var aneg = childata.quantity_anegative;
            var bpos = childata.quantity_bpositive;
            var bneg = childata.quantity_bnegative;
            var opos = childata.quantity_opositive;
            var oneg = childata.quantity_onegative;
            var abpos = childata.quantity_abpositive;
            var abneg = childata.quantity_abnegative;

            //if(city == searchcity) {
                additems(name,city,state,phno,address,apos,aneg,bpos,bneg,opos,oneg,abpos,abneg)
            //}
            }
        );
    });
}

window.onload = fetchdata;