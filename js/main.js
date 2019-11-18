// Init SpeechSynth API
const synth = window.speechSynthesis;

function createQuestions () {
  let form_all = document.getElementsByClassName("form-all");
        let form = form_all[0].getElementsByTagName("li");
        let questions = [];

        for (let i =0; i<form.length; i++) {
            let type = form[i].getAttribute("data-type");
            let question = {
                type: "",
                title: "",
                sub_question_arr: []
            };

            if (type === "control_fullname" || type === "control_email" || type === "control_phone" || type === "control_address" || type === "control_datetime" || type === "control_time") {

                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;
                let spans = form[i].querySelectorAll(".form-sub-label-container");
                for (let j = 0; j < spans.length; j++) {
                    let sub_question = {
                        q_description: "",
                        q_answer: {}
                    };

                    
                    if (type === "control_datetime" )
                        if (spans[j].querySelector("label") == null && spans[j].querySelector("select")== null )
                            continue;

                    sub_question.q_description = spans[j].querySelector("label").textContent.trim();

                    if (type === "control_time" || form[i].querySelector("allowTime-container") != null || type === "control_datetime") {
                      //debugger;
                        if (sub_question.q_description === "Hour" || sub_question.q_description === "Minutes" || sub_question.q_description === "AM/PM Option")
                            sub_question.q_answer = spans[j].querySelector("select");
                        else if (sub_question.q_description === "Date" || sub_question.q_description === "Tarih")
                            sub_question.q_answer = spans[j].querySelector("input");
                        else
                            continue;

                        question.sub_question_arr.push(sub_question);

                    }else {
                        if (spans[j].querySelector('input') != null) {
                          sub_question.q_answer = spans[j].querySelector("input");
                          question.sub_question_arr.push(sub_question);
                        }
                    }
                }

                questions.push(question);

            }
            else if (type === "control_textbox" || type === "control_textarea" || type === "control_number")  {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;
                let sub_question = {
                    q_description: "",
                    q_answer: {}
                };
                sub_question.q_description = "";
                if (type === "control_textbox" || type === "control_number")
                    sub_question.q_answer = form[i].querySelector("input");
                else
                    sub_question.q_answer = form[i].querySelector("textarea");

                question.sub_question_arr.push(sub_question);
                questions.push(question);

            }
            else if (type === "control_dropdown") {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;
                let sub_question = {
                    q_description: "",
                    q_answer: {}
                };
                sub_question.q_description = "";
                sub_question.q_answer = form[i].querySelector("select");

                question.sub_question_arr.push(sub_question);
                questions.push(question);
            }
            else if (type === "control_radio" || type === "control_checkbox") {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;
                let spans ;
                if (type === "control_radio")
                    spans = form[i].querySelectorAll("span.form-radio-item");
                else
                    spans = form[i].querySelectorAll("span.form-checkbox-item");
                for (let j = 0; j<spans.length; j++) {
                    let sub_question = {
                        q_description: "",
                        q_answer: {}
                    };
                    sub_question.q_description = spans[j].querySelector("label").textContent.trim();
                    sub_question.q_answer = spans[j].querySelector("input");

                    question.sub_question_arr.push(sub_question);
                }

                questions.push(question);
            }
            else if (type === "control_spinner") {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;

                let sub_question = {
                    q_description: "",
                    q_answer: {}
                };

                sub_question.q_description = "";
                sub_question.q_answer = form[i].querySelector("input");

                question.sub_question_arr.push(sub_question);

                sub_question = {
                    q_description: "",
                    q_answer: {}
                };

                sub_question.q_description = "";
                sub_question.q_answer = form[i].querySelector(".form-spinner-up");

                question.sub_question_arr.push(sub_question);

                sub_question = {
                    q_description: "",
                    q_answer: {}
                };

                sub_question.q_description = "";
                sub_question.q_answer = form[i].querySelector(".form-spinner-down");

                question.sub_question_arr.push(sub_question);

                questions.push(question);
            }
            else if (type === "control_rating") {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;
                
                setTimeout(function(){
                  //debugger;
                  let div_stars = form[i].querySelector(".form-star-rating");
                  let stars = div_stars.querySelectorAll("div");
                  for (let j=0; j<stars.length-1; j++) {
                      let sub_question = {
                          q_description: "",
                          q_answer: {}
                      };

                      sub_question.q_answer = stars[j];

                      question.sub_question_arr.push(sub_question);
                  }

                  questions.push(question);
                }, 100);
                
            }
            else if (type === "control_scale")  {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;

                let trs = form[i].querySelectorAll("tr");
                let ths = trs[0].querySelectorAll("th");
                let inputs = trs[1].querySelectorAll("input");
                for (let j=0; j<inputs.length; j++) {
                    let sub_question = {
                        q_description: "",
                        q_answer: {
                            answer: {},
                            corresponding: ""
                        }
                    };

                    sub_question.q_answer.answer = inputs[j];
                    sub_question.q_answer.corresponding = ths[j+1].textContent.trim();

                    question.sub_question_arr.push(sub_question);
                }

                questions.push(question);
            }
            else if (type === "control_matrix") {
                let q_title = form[i].querySelector("label").textContent.trim();
                question.type = type;
                question.title = q_title;

                let trs = form[i].querySelectorAll("tr");
                let ths = trs[0].querySelectorAll("th");
                let choice = ths.length-2;
                
                //console.log(trs.length);
                for(let j = 1; j<trs.length; j++)  {
                    let arr = [];
                    let sub_question = {
                        q_description: "",
                        q_answer: {}
                    };

                    sub_question.q_description = trs[j].querySelector("th").textContent.trim();
                    let tds = trs[j].querySelectorAll("td");
                    //console.log(tds.length);
                    for (let k = 0; k<tds.length; k++) {
                        sub_question = {
                            q_description: "",
                            q_answer: {}
                        };
                        let answer = tds[k].querySelector("input");
                        let correspond = ths[k+1].textContent.trim();
                        
                        sub_question.q_answer = {
                            answer: answer,
                            corresponding: correspond
                        };

                        arr.push(sub_question);
                        
                    }
                    question.sub_question_arr.push(arr);

                }

                questions.push(question);
            }

        }
        return questions;
};

var f_index = 0;
var s_index = 0;
var girdi = document.querySelector("input");
var flag = true;
var row_index = 0 // for matrix
var error_msg = "";

const form_lis = document.querySelectorAll(".form-line");
const questions = createQuestions();
highlighted();

function speak(word) {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return false;
  }

  const speakText = new SpeechSynthesisUtterance(word);

  speakText.onend = e => {
    console.log('Done speaking...');
  };

  speakText.onerror = e => {
    console.error('Something went wrong');
  };
    
  synth.speak(speakText);
  return true;
};

// should put delay for speaking
var speak_btn = document.getElementById("speak-btn");
speak_btn.addEventListener("click", function() {
  
  
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
  console.log("Voice is activated, you can to microphoneeee");
}

function listen() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition = new window.SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript = transcript;
        } else {
          interimTranscript = transcript;
        }
      }
      if (finalTranscript.trim() !== "") {
        girdi.value = finalTranscript;
        console.log("Input: " + girdi.value);
        test();
      }
      
    }
    
    recognition.start();
}

function test() {
  
  girdi.value = girdi.value.trim().toLowerCase();

  while(f_index < questions.length) {
    
    highlighted();
    var question = questions[f_index];
    var sub_questions = question.sub_question_arr;
    
    if (girdi.value === "atla") {
      unhighlighted();
      if (questions[f_index].type === "control_matrix") {
        var lines = document.querySelector("li[data-type = 'control_matrix']").querySelectorAll("tr");
        lines[row_index+1].style.border = "none";
      }
      f_index++;
      highlighted();
      girdi.value = "";
      break;
    }

    if (question.type === "control_radio"  || question.type === "control_checkbox") {
      if (girdi.value === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        girdi.value = "";
        break;
      }else if (girdi.value === "geri gel") {
        unhighlighted();
        f_index--;
        highlighted();
        girdi.value = "";
        break;
      }else if (girdi.value === "sil") {
        var options = question.sub_question_arr;
        for (var i = 0; i<options.length; i++)
          options[i].q_answer.checked = false;

        return;
      }
      if (girdi.value !== "") {
        var options = question.sub_question_arr;
        for (var i = 0; i<options.length; i++){
          if (options[i].q_description.toLowerCase() === girdi.value){
            options[i].q_answer.click();
            girdi.value = "";
            return;
          }
        }
        error_msg = "Yanlis girdi (Dropdown)";
      }
      
      girdi.value = "";
      return;
    }else if (question.type === "control_spinner") {
      if (girdi.value.toLowerCase() === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        girdi.value = "";
        break;
      }else if (girdi.value.toLowerCase() === "arttır")
        question.sub_question_arr[1].q_answer.click();
      else if (girdi.value.toLowerCase() === "azalt")
        question.sub_question_arr[2].q_answer.click();
      else if (!isNaN(girdi.value))
        question.sub_question_arr[0].q_answer.value = girdi.value;
      else if (girdi.value === "sil") 
        question.sub_question_arr[0].q_answer.value = "0";
      else
        error_msg = "Yanlis girdi (Spinner)";

      girdi.value = "";
      return;    
    }else if (question.type === "control_matrix") {
      var matrix_table = document.querySelector("table.form-matrix-table tbody");
      var trs = matrix_table.querySelectorAll("tr");
      var ths = [];
      trs[row_index+1].style.border = "3px solid red";
      if (girdi.value === "ilerle") {
        
        if (row_index === sub_questions.length-1) {
          
          unhighlighted();
          trs[row_index+1].style.border = "none";
          row_index = 0;
          f_index++;
          highlighted();
          girdi.value = "";
         }
         else {
          trs[row_index+1].style.border = "none";
          row_index++;
          trs[row_index+1].style.border = "3px solid red";
          girdi.value = "";    
        }
         break;
        
      }else if (girdi.value === "geri gel") {
        if (row_index <= 0) {
          row_index = 0;
          trs[row_index+1].style.border = "none";
          unhighlighted();
          f_index--;
          highlighted();
        }
        else {
          trs[row_index+1].style.border = "none";
          row_index--;
          trs[row_index+1].style.border = "3px solid red";
        }
        girdi.value = "";
        return;
      }
      else {
        
        for (var i=1; i<trs.length; i++)
          ths.push(trs[i].querySelector("th"));
        
        for (var i=0; i<sub_questions.length; i++) {
          if (sub_questions[row_index][i].q_answer.corresponding.toLowerCase() === girdi.value) {
            sub_questions[row_index][i].q_answer.answer.click();
            girdi.value = "";
            return;
          }
        }
      }
      return;
    }else if (question.type === "control_rating") {
      if (girdi.value === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        girdi.value = "";
        break;
      }else if (girdi.value === "sil") {
        if (document.querySelector("div[title='Cancel Your Rating']") != undefined) {
          document.querySelector("div[title='Cancel Your Rating']").click();
        }
        girdi.value = "";
        break;
      }

      var rate = parseInt(girdi.value);
      
      if (rate <= 0 || rate > sub_questions.length) {
        error_msg = "Yanlis girdi (Rating)";
      }else {
        error_msg = "";
        sub_questions[rate-1].q_answer.click();
        girdi.value = "";
      }

      return;
    }else if (question.type === "control_scale") {
      if (girdi.value === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        girdi.value = "";
        break;
      }
      else if (girdi.value === "geri gel") {
        unhighlighted();
        f_index--;
        highlighted();
        girdi.value = "";
        break;
      }
      for (var i = 0; i < sub_questions.length; i++) {
        if (sub_questions[i].q_answer.corresponding === girdi.value) {
          sub_questions[i].q_answer.answer.click();
          girdi.value = "";
          return;
        }
      }
      error_msg = "Yanlıs girdi (Scale)";
      return;
    }else {
        while (s_index < sub_questions.length && s_index >= 0) {
          highlighted();
          var sub_question = sub_questions[s_index];
          
          if (girdi.value.toLowerCase() !== "ilerle" && girdi.value.toLowerCase() !== "ilerle2"
              && girdi.value.toLowerCase() !== "geri gel" && girdi.value.toLowerCase() !== "geri gel2") {
            if (!facilitator_c(question.type)) {
                if (girdi.value === "sil")
                  sub_question.q_answer.value = "";
                else{
                  if (question.type === "control_datetime")
                    sub_question.q_answer.value = dateConvert(girdi.value.toLowerCase());
                  else if (question.type === "control_number") {
                    if (!isNaN(girdi.value))
                      sub_question.q_answer.value = girdi.value;
                    else
                      error_msg = "Yanlıs girdi (Not number)";
                  }
                  else
                    if (canbeAdded(question.type))
                      sub_question.q_answer.value += girdi.value + " ";
                    else
                      sub_question.q_answer.value = girdi.value;
                }
                girdi.value = "";
            }
          }

          if (girdi.value.toLowerCase() === "ilerle") {
            unhighlighted();
            s_index++;
            girdi.value = "ilerle2";
          }else if (girdi.value.toLowerCase() === "geri gel") {
            unhighlighted();
            s_index--;
            girdi.value = "geri gel2";
            if (s_index >=0)
              highlighted();
          }
          else
            break;
          
        }

        if (s_index >= sub_questions.length) {
          s_index = 0;
          girdi.value = "ilerle2";
        }else if (s_index < 0) {
          s_index = 0;
        }
        else
          girdi.value = "";


        if (girdi.value === "ilerle2") {
          f_index++;
          girdi.value = "";

        }
        else if (girdi.value === "geri gel2") {
          f_index--;
          highlighted();
          girdi.value = "";
          break;
        }
        else{
          break;
        }
    }
    console.log("\n");
  }

  if (questions[f_index].type === "control_matrix") {
    var lines = document.querySelector("li[data-type = 'control_matrix']").querySelectorAll("tr");
    lines[row_index+1].style.border = "3px solid red";
  }
  if (f_index === questions.length || f_index < 0) {
    f_index = 0;
    s_index = 0;
    highlighted();
  }

}
//highlighted();

document.querySelector("#listen").addEventListener("click", function(){
  listen();
});

document.querySelector("#show").addEventListener("click", function(){
  test();
  document.querySelector("#error").innerHTML = error_msg;
});


girdi.onkeypress = function(e) {
  var event = e || window.event;
    var charCode = event.which || event.keyCode;

    if ( charCode == '13' ) {
      document.querySelector("#show").click();
    }
}

// contain answer in q_answer
function facilitator_a(type) {
  if (type === "control_matrix" || type === "control_scale")
    return true;
  return false;
}

// boxShadow in q_answer
function facilitator_b(type) {
  if (type === "control_matrix" || type === "control_scale" || type === "control_radio" ||
      type === "control_checkbox" || type === "control_rating")
      return false;
  return true;
}

// has q_answer to click
function facilitator_c(type) {
  if (type === "control_matrix" || type === "control_radio" || type === "control_checkbox" ||
        type === "control_scale" || type === "control_rating")
      return true;
  return false;
}

function highlighted() {
  
  if (f_index < questions.length)
    if (s_index < questions[f_index].sub_question_arr.length)
      if (facilitator_b(questions[f_index].type)) {
        if (questions[f_index].sub_question_arr[s_index].q_answer != null)
          questions[f_index].sub_question_arr[s_index].q_answer.style.boxShadow = "0 0 3pt 2pt #719ECE";
      }
      else if (questions[f_index].type === "control_matrix") {
        var matrix_table = document.querySelector("table.form-matrix-table tbody");
        var trs = matrix_table.querySelectorAll("tr");

        trs[row_index+1].style.border = "3px solid red";

        var lis = document.querySelector("li[data-type='"+ questions[f_index].type +"'");
        lis.style.boxShadow = "0 0 3pt 2pt #719ECE";
      }
      else {
        var lis = document.querySelector("li[data-type='"+ questions[f_index].type +"'");
        lis.style.boxShadow = "0 0 3pt 2pt #719ECE";
      }
}

function unhighlighted() {
  if (f_index < questions.length)
    if (s_index < questions[f_index].sub_question_arr.length)
      if (facilitator_b(questions[f_index].type)) {
        if (questions[f_index].sub_question_arr[s_index].q_answer != null)
          questions[f_index].sub_question_arr[s_index].q_answer.style.boxShadow = "none";
      }
      else {
        var lis = document.querySelector("li[data-type='"+ questions[f_index].type +"'");
        lis.style.boxShadow = "none";
      }
}

function dateConvert(date) {

  var dates = date.split(" ");

  switch(dates[1]) {
    case "ocak":
      dates[1] = "1";
      break;
    case "şubat":
      dates[1] = "2";
      break;
    case "mart":
      dates[1] = "3";
      break;
    case "nisan":
      dates[1] = "4";
      break;
    case "mayıs":
      dates[1] = "5";
      break;
    case "haziran":
      dates[1] = "6";
      break;
    case "temmuz":
      dates[1] = "7";
      break;
    case "ağustos":
      dates[1] = "8";
      break;
    case "eylül":
      dates[1] = "9";
      break;
    case "ekim":
      dates[1] = "10";
      break;
    case "kasım":
      dates[1] = "11";
      break;
    case "aralık":
      dates[1] = "12";
      break;
    default:
      dates[1] = "-1";
      break;
  }

  return dates[0] + "-" + dates[1] + "-" + dates[2];
}

function canbeAdded(type) {
  if (type === "control_fullname" || type === "control_address"
        || type === "control_textbox" || type === "control_textarea")
    return true;
  return false;
}