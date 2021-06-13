let formMessage = firebase.database().ref("hospitalsandbloodbanks");
document.getElementById('registrationform').addEventListener('submit', formSubmit);
function formSubmit(e) {
    e.preventDefault();
    save()
    document.getElementById('registrationform').reset();
}

function sendMessage(userid, hosporbb, hosporbbname, mainemail, address, city, state, location, mobile, time, aplus, aminus, bplus, bminus, oplus, ominus, abplus, abminus) {
    firebase
        .database()
        .ref("hospitalsandbloodbanks/" + userid)
        .set({
            id: userid,
            hospital_or_bloodbank: hosporbb,
            hospital_or_bloodbank_name: hosporbbname,
            email: mainemail,
            address: address,
            city: city,
            state: state,
            location: location,
            mobile: mobile,
            donation_timing: time,
            quantity_apositive: aplus,
            quantity_anegative: aminus,
            quantity_bpositive: bplus,
            quantity_bnegative: bminus,
            quantity_opositive: oplus,
            quantity_onegative: ominus,
            quantity_abpositive: abplus,
            quantity_abnegative: abminus,
        });
}

function save(){
    var pw = document.getElementById("mainpassword").value;
    var repw = document.getElementById("mainrepassword").value;
    var hosporbb = document.getElementById("hospitalorbloodbank").value;  
    var hosporbbname = document.getElementById("mainname").value;  
    var ema = document.getElementById("mainemail").value;  
    var addrs = document.getElementById("mainaddress").value;  
    var cit = document.getElementById("maincity").value;  
    var stat = document.getElementById("mainstate").value;  
    var mob = document.getElementById("mainmobno").value;  
    var aplus = document.getElementById("a+blood").value;  
    var aminus = document.getElementById("a-blood").value;  
    var bplus = document.getElementById("b+blood").value;  
    var bminus = document.getElementById("b-blood").value;  
    var oplus = document.getElementById("o+blood").value;  
    var ominus = document.getElementById("o-blood").value;  
    var abplus = document.getElementById("ab+blood").value;  
    var abminus = document.getElementById("ab-blood").value;  
    //to check empty password field  
    if(pw == "") {  
        alert("No Password has been Entered");
        return false;  
    }  
    //minimum password length validation  
    if(pw.length < 7) {  
        alert("The Password is Short");
        return false;  
    }  
    //maximum length of password validation  
    if(pw.length > 15) {  
        alert("The Password is Long");
        return false;  
    }
    //to check both password field are same or not 
    if(pw != repw) {
        alert("The Password is not Same");
    }
    else { 
        const email = document.querySelector('#mainemail');
        const password = document.querySelector('#mainpassword');
        try {
            const result = firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            console.log(result)
            alert("You have successfully registered");
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var uid = user.uid;
                    var loc = "ni";
                    var time = "9:00 AM - 6:00 PM";
                    sendMessage(uid, hosporbb, hosporbbname, ema, addrs, cit, stat, loc, mob, time, aplus, aminus, bplus, bminus, oplus, ominus, abplus, abminus);
                    window.location.href = "index.html";
                }
            });
        }
        catch(err) {
            alert("there is some error please retry again");
        }
    }
}