var count = Object.keys(books).length;
var correctAnswers = 0;
var wrongAnswers = 0;
var question;

// Global answer index.
var answerIndex = GetRandomIndex(3);
var choices = [3];

// Create the initial question.
CreateQuestion();

// Create a question and pass it to the HTML.
function CreateQuestion(){
  var randomIndex = GetRandomIndex(count);
  var choice;

  question = books[randomIndex];

  // Print the book name to the box.
  UpdateSRC("img-campeao", question.eser);

  // Get random author names.
  for(var i = 0; i < 3; i++) {
    choice = books[GetRandomIndex(count)];

    if(choices.indexOf(choice.yazar) == -1 || choice.yazar.length > 4){
      if(question.yazar !== choice.yazar){
        if(!((question.hasOwnProperty("digerYazar") && choice.yazar == question.digerYazar) ||
          (choice.hasOwnProperty("digerYazar") && choice.digerYazar == question.yazar))) {
          
          // If all the conditions are satisfied, save it as an option.
          choices[i] = choice.yazar;
        } else {i--;}
      } else {i--;}
    } else {i--;}
  }

  // Put the real answer into the array.
  answerIndex = GetRandomIndex(3);
  choices[answerIndex] = question.yazar;

  // Print the choices to the buttons.
  for(var i = 0; i < 3; i++) {
    UpdateHTML("button_" + i, choices[i]);
  }
}

// Check the answer and continue to create a new question.
function CheckAndCreateNewQuestion(answer){
  if(answerIndex == answer){
    correctAnswers++;

    // Create the sweet alert.
    swal({
      title: "Resposta certa!",
      text: "Parabéns, você respondeu corretamente. <strong class='color-green'>" + question.yazar + "</strong>",
      type: "success",
      confirmButtonColor: "#1e7300",
      confirmButtonText: "Próxima pergunta",
      customClass: "sweetAlertModal",
      html: true
    },
    function(isConfirm){
      CreateQuestion();
      UpdateHTML("correctAnswers", correctAnswers);
    });
  } else {
    wrongAnswers++;

    // Create the sweet alert.
    swal({
      title: "Resposta errada!",
      text: "A respota correta é <strong class='color-green'>" + question.yazar + "</strong>",
      type: "error",
      confirmButtonColor: "#f85f73",
      confirmButtonText: "Próxima pergunta",
      customClass: "sweetAlertModal",
      html: true
    },
    function(isConfirm){
      CreateQuestion();
      UpdateHTML("wrongAnswers", wrongAnswers);
    });
  }
}

// Generate random number from 0 to end.
function GetRandomIndex(end){
  return Math.floor(Math.random() * end);  
}

function UpdateHTML(id, text) {
  var element = document.getElementById(id);
  element.innerHTML = text;
}

function UpdateSRC(id, text) {
  var element = document.getElementById(id);
  element.src = 'img/' + text;
}