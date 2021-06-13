function forgotpass(){
    var auth = firebase.auth();
    var email = document.getElementById("emailid").value;
    alert(email);
    if(email != ""){
        auth.sendPasswordResetEmail(email).then(function() {
            alert("reset is sent");
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    else{
        window.alert("No Email Entered..!");
    }
}