function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal(){
modalbg.style.display = 'none';
modalbg2.style.display = 'none';
}



// validate the datas written in the form
function validate(event){

  event.preventDefault();

  //DOM elements
  var first = document.forms["reserve"]["first"].value;               
  var last = document.forms["reserve"]["last"].value;
  var email = document.forms["reserve"]["email"].value;
  var birthdate = document.forms["reserve"]["birthdate"].value;   
  var quantity = document.forms["reserve"]["quantity"].value;
  var cities = document.querySelectorAll('input[type="radio"]');
  var acceptedPolicy = document.forms["reserve"]["checkbox1"];
  var problem = 0; 
  var today = new Date();
  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Validation of the firstname
  if (first.trim().length<2){
    problem = errorMessage("errorFirst", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", problem);
  }else{
      document.getElementById("errorFirst").innerHTML="";  
  }

  //Validation of the lastname
  if (last.trim().length<2){
    problem = errorMessage("errorLast", "Veuillez entrer 2 caractères ou plus pour le champ du nom.", problem);
  }else{
      document.getElementById("errorLast").innerHTML="";  
  }
    
  //Validation of the email address
  if (!email_regex.test(email.trim())){ 
    problem = errorMessage("errorEmail", "Veuillez entrez une adresse mail valide", problem);
  }else{
      document.getElementById("errorEmail").innerHTML="";  
  }

  //Validation of the birthdate
  if ((birthdate === "") || (+birthdate.slice(0,4) < today.getFullYear() - 100) || (+birthdate.slice(0,4) > today.getFullYear() - 10)){ 
    problem = errorMessage("errorBirthdate", "Vous devez entrer votre date de naissance.", problem);
  }else{
      document.getElementById("errorBirthdate").innerHTML="";  
  }

  //Validation of the number of previous participations
  if ((quantity.trim() === "") || (+quantity.trim()>99) || (+quantity.trim()<0)){ 
    problem = errorMessage("errorQuantity", "Veuillez entrer un nombre entre 0 et 99 pour ce champ.", problem);
  }else{
      document.getElementById("errorQuantity").innerHTML="";  
  }

  //Validation of the city
  var i = 0;
  var IsChecked = false;
  while (i < cities.length){
    if (cities[i].checked){
      IsChecked = true;
      break
    }else{
      i++
    }
  }
  if (!IsChecked){
    problem = errorMessage("errorCity", "<br>Vous devez choisir une option.", problem);
  }else{
    document.getElementById("errorCity").innerHTML="";
  }

  //Validation of the privacy policy
  if (!acceptedPolicy.checked){
    problem = errorMessage("errorAcceptedPolicy", "<br>Vous devez vérifier que vous acceptez les termes et conditions.", problem);
  }else{
      document.getElementById("errorAcceptedPolicy").innerHTML="";  
  }

    //Validation of the form if everything is ok
    if (problem === 0){
      document.querySelector(".bground2").style.display = "block";
      document.querySelector(".bground").style.display = 'none';
      return true;
      // Return true car pour le moment le prevent.default du début de la fonction bloque l'envoi > Good ou inutile ?!
      // Est-ce qu'on doit vider tous les champs si envoi ?
    }else{
      return false;
    }
}

//Write an error message when the field is not correctly filled (this function is called in the Validate() function)
function errorMessage (element, message, errorCounter){
  document.getElementById(element).innerHTML=message;  
  errorCounter++;
  return errorCounter;
}