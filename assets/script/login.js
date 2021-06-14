function userlogin(e) {
    e.preventDefault()
    const email = document.querySelector('#useremail')
    const password = document.querySelector('#userpass')
  
    try {
        const result = firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        console.log(result)
        alert("Successfully Logged In");
        window.location.href = "userinterf.html";
    }
    catch(err) {
        console.log(err)
        alert("Please check the Email and Password you have entered");
    }
}