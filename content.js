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

}

function test(transcript) {
  
  transcript = transcript.trim().toLowerCase();

  while(f_index < questions.length) {
    
    highlighted();
    var question = questions[f_index];
    var sub_questions = question.sub_question_arr;
    
    if (findQuestionNumber(transcript) >= 0) {
      unhighlighted();
      f_index = findQuestionNumber(transcript);
      if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = questions[f_index].sub_question_arr[0].q_answer.length;
      }
      highlighted();
      //console.log(f_index);
      return;
    }
    if (transcript === "atla") {
      unhighlighted();
      if (questions[f_index].type === "control_matrix") {
        var lines = document.querySelector("li[data-type = 'control_matrix']").querySelectorAll("tr");
        lines[row_index+1].style.border = "none";
      }if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = 0;
      }
      f_index++;
      if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = questions[f_index].sub_question_arr[0].q_answer.length;
      }
      s_index = 0;
      highlighted();
      transcript = "";
      break;
    }else if (transcript === "bitir" || transcript === "tamamla") {
      submit_button.style.boxShadow = "0 0 3pt 3pt #719ECE";
      submit_button.click();
    }

    if (question.type === "control_radio"  || question.type === "control_checkbox") {
      if (transcript === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        transcript = "";
        break;
      }else if (transcript === "geri gel") {
        unhighlighted();
        if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = 0;
        }
        f_index--;
        highlighted();
        transcript = "";
        break;
      }else if (transcript === "sil") {
        var options = question.sub_question_arr;
        for (var i = 0; i<options.length; i++)
          options[i].q_answer.checked = false;

        return;
      }
      if (transcript !== "") {
        var options = question.sub_question_arr;
        for (var i = 0; i<options.length; i++){
          if (options[i].q_description.toLowerCase() === transcript){
            options[i].q_answer.click();
            return test("ilerle");
          }
        }
        if (transcript.indexOf(". seçenek") > 0) {
          var index = parseInt(transcript.substring(0, transcript.indexOf(".")));
          if (index <= options.length){
            
            options[index-1].q_answer.click();
            return;
          }
        }
        error_msg = "Yanlis girdi (Checkbox)";
      }
      
      transcript = "";
      return;
    }else if (question.type === "control_spinner") {
      if (transcript === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        break;
      }else if (transcript === "geri gel") {
        unhighlighted();
        f_index--;
        highlighted();
        break;
      }else if (transcript.toLowerCase() === "arttır")
        question.sub_question_arr[1].q_answer.click();
      else if (transcript.toLowerCase() === "azalt")
        question.sub_question_arr[2].q_answer.click();
      else if (!isNaN(transcript)){
        question.sub_question_arr[0].q_answer.value = transcript;
        return test("ilerle");
      }
      else if (transcript === "sil") 
        question.sub_question_arr[0].q_answer.value = "0";
      else
        error_msg = "Yanlis girdi (Spinner)";

      return;    
    }else if (question.type === "control_matrix") {
      var matrix_table = document.querySelector("table.form-matrix-table tbody");
      var trs = matrix_table.querySelectorAll("tr");
      var ths = [];
      trs[row_index+1].style.border = "3px solid red";
      if (transcript === "ilerle") {
        
        if (row_index === sub_questions.length-1) {
          
          unhighlighted();
          trs[row_index+1].style.border = "none";
          row_index = 0;
          f_index++;
          highlighted();
          transcript = "";
         }
         else {
          trs[row_index+1].style.border = "none";
          row_index++;
          trs[row_index+1].style.border = "3px solid red";
          transcript = "";    
        }
         break;
        
      }else if (transcript === "geri gel") {
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
        transcript = "";
        return;
      }
      else {
        
        for (var i=1; i<trs.length; i++)
          ths.push(trs[i].querySelector("th"));
        
        for (var i=0; i<sub_questions.length; i++) {
          if (sub_questions[row_index][i].q_answer.corresponding.toLowerCase() === transcript) {
            sub_questions[row_index][i].q_answer.answer.click();
            return test("ilerle");
          }
        }
      }
      return;
    }else if (question.type === "control_rating") {
      if (transcript === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        break;
      }else if (transcript === "sil") {
        if (document.querySelector("div[title='Cancel Your Rating']") != undefined) {
          document.querySelector("div[title='Cancel Your Rating']").click();
        }
        break;
      }else if (transcript === "geri gel") {
        unhighlighted();
        f_index--;
        highlighted();
        break;
      }

      var rate = parseInt(transcript);
      
      if (rate <= 0 || rate > sub_questions.length) {
        error_msg = "Yanlis girdi (Rating)";
      }else if (rate >= 0 && rate <= sub_questions.length)  {
        error_msg = "";
        sub_questions[rate-1].q_answer.click();
        return test("ilerle");
      }else
        error_msg = "Yanlis girdi (Rating)";

      return;
    }else if (question.type === "control_scale") {
      if (transcript === "ilerle") {
        unhighlighted();
        f_index++;
        highlighted();
        break;
      }
      else if (transcript === "geri gel") {
        unhighlighted();
        f_index--;
        highlighted();
        break;
      }
      for (var i = 0; i < sub_questions.length; i++) {
        if (sub_questions[i].q_answer.corresponding === transcript) {
          sub_questions[i].q_answer.answer.click();
          return test("ilerle");
        }
      }
      error_msg = "Yanlıs girdi (Scale)";
      return;
    }else {
        while (s_index < sub_questions.length && s_index >= 0) {
          highlighted();
          var sub_question = sub_questions[s_index];
          
          if (transcript.toLowerCase() !== "ilerle" && transcript.toLowerCase() !== "ilerle2"
              && transcript.toLowerCase() !== "geri gel" && transcript.toLowerCase() !== "geri gel2") {
            if (!facilitator_c(question.type)) {
                if (transcript === "sil"){
                  sub_question.q_answer.value = "";
                  return;
                }
                else{
                  if (question.type === "control_datetime"){
                    sub_question.q_answer.value = dateConvert(transcript.toLowerCase());
                    return test("ilerle");
                  }
                  else if (question.type === "control_number") {
                    if (!isNaN(transcript)){
                      sub_question.q_answer.value = transcript;
                      return test("ilerle");
                    }
                    else
                      error_msg = "Yanlıs girdi (Not number)";
                  }
                  else

                    if (canbeAdded(question.type)){
                      sub_question.q_answer.value = transcript;
                      return test("ilerle");
                    }
                    else{
                      if (question.type === "control_time") {
                        if (sub_question.q_description === "AM/PM Option") {
                          if (transcript === "öğleden sonra")
                            transcript = "PM";
                          else if (transcript === "öğleden önce")
                            transcript = "AM";
                          else if (transcript === "")
                            break;
                          else
                            error_msg = "Yanlıs girdi (Time)";
                        }
                      }
                      if (question.type === "control_dropdown") {
                        if (transcript.indexOf(" seçenek") > 0) {
                          if (!isNaN(transcript.substring(0, transcript.indexOf(" seçenek")-1))) {
                            var x = parseInt(transcript.substring(0, transcript.indexOf(" seçenek")-1));
                            if (x < sub_question.q_answer.length) {
                                sub_question.q_answer.value = sub_question.q_answer[x].innerHTML.trim();
                                return test("ilerle");
                            }
                          }
                        }
                        for (opt of sub_question.q_answer)
                          if (opt.textContent.trim().toLowerCase() === transcript) {
                            sub_question.q_answer.value = opt.textContent.trim();
                            sub_question.q_answer.size = 0;
                            return test("ilerle");
                          }

                        error_msg = "Yanlıs girdi (Dropdown)";
                        break;
                      }
                      sub_question.q_answer.value = transcript;
                      return test("ilerle");
                    }
                }
            }
          }
          else if (transcript.toLowerCase() === "ilerle") {
            unhighlighted();
            s_index++;
            transcript = "ilerle2";
          }else if (transcript.toLowerCase() === "geri gel") {
            unhighlighted();
            s_index--;
            transcript = "geri gel2";
            if (s_index >=0)
              highlighted();
          }
          else
            break;
          
        }

        if (s_index >= sub_questions.length) {
          s_index = 0;
          transcript = "ilerle2";
        }else if (s_index < 0) {
          s_index = 0;
        }
        else
          transcript = "";


        if (transcript === "ilerle2") {
          if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = 0;
          }
          f_index++;
          if (questions[f_index].type === "control_dropdown") {
            questions[f_index].sub_question_arr[0].q_answer.size = questions[f_index].sub_question_arr[0].q_answer.length;
          }
          highlighted();
          return;
        }
        else if (transcript === "geri gel2") {
          f_index--;
          highlighted();
          transcript = "";
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
  if (f_index === questions.length) {
    f_index = 0;
    s_index = 0;
    submit_button.style.boxShadow = "0 0 3pt 3pt #719ECE";
  }else if (f_index < 0){
    f_index = 0;
    s_index = 0;
    highlighted();

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
          questions[f_index].sub_question_arr[s_index].q_answer.style.boxShadow = "0 0 3pt 3pt #719ECE";
      }
      else if (questions[f_index].type === "control_matrix") {
        var matrix_table = document.querySelector("table.form-matrix-table tbody");
        var trs = matrix_table.querySelectorAll("tr");

        trs[row_index+1].style.border = "3px solid red";

        var lis = document.querySelector("li[data-type='"+ questions[f_index].type +"'");
        lis.style.boxShadow = "0 0 3pt 3pt #719ECE";
      }
      else {
        var lis = document.querySelectorAll("li[data-type='"+ questions[f_index].type +"'");
        for(li of lis) {
          if (li.textContent.indexOf(questions[f_index].title) >= 0){
            li.style.boxShadow = "0 0 3pt 3pt #719ECE";
            return;
          }
        }
        lis.style.boxShadow = "0 0 3pt 3pt #719ECE";
        
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
        var lis = document.querySelectorAll("li[data-type='"+ questions[f_index].type +"'");
        for(li of lis) {
          if (li.textContent.indexOf(questions[f_index].title) >= 0){
            li.style.boxShadow = "none";
            return;
          }
        }
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

function isAvailable(type) {
  switch(type) {
    case "control_fullname":
      return true;
    case "control_email":
      return true;
    case "control_phone":
      return true;
    case "control_address":
      return true;
    case "control_datetime":
      return true;
    case "control_time":
      return true;
    case "control_textbox":
      return true;
    case "control_textarea":
      return true;
    case "control_dropdown":
      return true;
    case "control_radio":
      return true;
    case "control_checkbox":
      return true;
    case "control_number":
      return true;
    case "control_spinner":
      return true;
    case "control_matrix":
      return true;
    case "control_scale":
      return true;
    case "control_rating":
      return true;
    default:
      return false;
  }

}

function findQuestionNumber(transcript) {
  var temp = "";
  if (transcript.indexOf(" git")) {
    temp = transcript.substring(0, transcript.indexOf(" git"));

    if (temp.indexOf("soruya") >= 0) {

      if (temp.indexOf("ilk ") >= 0)
        return 0;
      
      else if (temp.indexOf("son ") >= 0)
        return questions.length-1;
      
      return parseInt(temp.substring(0, temp.indexOf("soruya")-2))-1;
    }
    else {
      //console.log(temp);
      for(var i=0; i<questions.length; i++)
        if (temp.indexOf(questions[i].title.toLowerCase()) >=0 )
          return i;
    }
  }

  return -1;
  
}

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
        console.log("Input: " + finalTranscript);
        test(finalTranscript);
      }
      
    }
    
    recognition.start();
}

var questions = createQuestions();
var f_index = 0;
var s_index = 0;
var flag = true;
var row_index = 0 // for matrix
var error_msg = "";
const submit_button = document.querySelector("button.form-submit-button");

if (questions[f_index].type === "control_dropdown") {
  questions[f_index].sub_question_arr[0].q_answer.size = questions[f_index].sub_question_arr[0].q_answer.length;
}


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	if (message.txt == "run") {
		highlighted();
		listen();
	}
}




