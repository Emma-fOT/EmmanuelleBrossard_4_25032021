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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//TODO #1 Fermer la modale

// close modal form
const modalCloseBtn = document.getElementById("close");
modalCloseBtn.onclick = () => {
  modalbg.style.display = 'none';
  }
  //autre solution reprenant le code déjà écrit :
  //const modalCloseBtn = document.querySelectorAll(".close");
  //modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
  //function closeModal(){
  //  modalbg.style.display = 'none';
  //}


//TODO #2 Implémenter entrées formulaire

//the first part of the mission is in the html file (to link label and inuts with for and id)
// the second part of the mission is here:

// validate the datas written in the form
function validate()                                  
{ 
// In order to test if I'm going through this function :
//console.log("Ok");
    var first = document.forms["reserve"]["first"].value;               
    var last = document.forms["reserve"]["last"].value;
    var email = document.forms["reserve"]["email"].value;
    var birthdate = document.forms["reserve"]["birthdate"].value;   
    var quantity = document.forms["reserve"]["quantity"].value;
    var cities = document.querySelectorAll('input[type="radio"]');
    var acceptedPolicy = document.forms["reserve"]["checkbox1"];
    var problem = 0; 
    var today = new Date();


    // Validation of the elements directly in the input of the form : would be quicker... but not very good because you don't know what you did false (accessibility)
   
    //Validation of the firstname
    if ((first == "") || (first.length<2))                            
    { 
      problem = errorMessage("errorFirst", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", problem);
    }else{
        document.getElementById("errorFirst").innerHTML="";  
    }

    //Validation of the lastname
    if ((last == "") || (last.length<2))                             
    { 
      problem = errorMessage("errorLast", "Veuillez entrer 2 caractères ou plus pour le champ du nom.", problem);
    }else{
        document.getElementById("errorLast").innerHTML="";  
    }
      
    //Validation of the email address
    if ((email == "") || (email.indexOf("@", 0) < 0) ||  (email.indexOf(".", 0) < 0))                                 
    { 
      problem = errorMessage("errorEmail", "Veuillez entrez une adresse mail valide", problem);
    }else{
        document.getElementById("errorEmail").innerHTML="";  
    }

    //Validation of the birthdate
    if ((birthdate == "") || (birthdate.slice(0,4) < today.getFullYear() - 100) || (birthdate.slice(0,4) > today.getFullYear()-10))
    { 
      problem = errorMessage("errorBirthdate", "Vous devez entrer votre date de naissance.", problem);
    }else{
        document.getElementById("errorBirthdate").innerHTML="";  
    }

    //Validation of the number of previous participations
    if ((quantity == "") || (quantity>99) || (quantity<0))
    { 
      problem = errorMessage("errorQuantity", "Veuillez entrer un nombre entre 0 et 99 pour ce champ.", problem);
    }else{
        document.getElementById("errorQuantity").innerHTML="";  
    }

    //Validation of the city

    var i = 0;
    var IsChecked = false;
    while (i < cities.length){
      if (cities[i].checked)
      {
        IsChecked = true;
        break
      }else{
        i++
      }
    }
    if (IsChecked == false) 
    {
      problem = errorMessage("errorCity", "<br>Vous devez choisir une option.", problem);
    }else{
      document.getElementById("errorCity").innerHTML="";  
    }


    //Validation of the privacy policy
    if (!acceptedPolicy.checked)
    {
      problem = errorMessage("errorAcceptedPolicy", "<br>Vous devez vérifier que vous acceptez les termes et conditions.", problem);
    }else{
        document.getElementById("errorAcceptedPolicy").innerHTML="";  
    }

    if (problem > 0){
      return false;
    }else{
      alert("Merci ! Votre réservation a été reçue.");
      // Creation of the object for the database
      return true;
    }
}

function errorMessage (element, message, errorCounter)
{
  document.getElementById(element).innerHTML=message;  
  errorCounter++;
  return errorCounter;
}

// Creation of the object for the database
/*
class Participant {
  constructor(firstname,lastname,email,birthdate,previousParticipations,city,acceptedPolicy,addToMailingList) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.birthdate = birthdate;
      this.previousParticipations = previousParticipations;
      this.city = city;
      this.acceptedPolicy = acceptedPolicy;
      this.addToMailingList = addToMailingList;
  }
}

function getInformations() {
  const NewFirst = getElementById('first');
  const NewLast = getElementById('last');
  const NewEmail = getElementById('email');
  const NewBirthdate = getElementById('birthdate');
  const NewQuantity = getElementById('quantity');
  const NewCity = 0;
  const NewAcceptedPolicy = 0;
  const NewAddToMailingList = 0;
}

let NewParticipant = new Participant(NewFirst, NewEmail, NewEmail, NewBirthdate, NewQuantity, NewCity, NewAcceptedPolicy, NewAddToMailingList);*/