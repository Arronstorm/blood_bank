async function userlogin(e) {
    e.preventDefault()
    const email = document.querySelector('#useremail')
    const password = document.querySelector('#userpass')
  
    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        console.log(result)
        alert("Successfully Logged In as user");
        window.location.href = "userinterf.html";
    }
    catch(err) {
        console.log(err)
        alert("Please check the Email and Password you have entered");
    }
}