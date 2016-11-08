var goToFirstSite = function() {
	var name = $('#name').val();
	if(name != ""){
		localStorage.setItem("name", name);
		window.location.href='strona1.html';
	}
	else{
		alert("Enter your name!");
	}
}

var checkCheckedFields = function() {
    $('input').each(function(){
        var elementId = $(this).attr('id');
        if(localStorage.getItem(elementId) == "true") {$(this).attr("checked",true);};
    })
}

var colorCheckedFields = function() {
    checkCheckedFields();
    saveFormToLocalStorage();
	$('input').each(function(a,b){ if(a.checked){a.parentNode.className = "labelClass color"}});
	var inputsChecked = $('input:checked');
	var inputsNotChecked = $('input:radio:not(:checked)');
	for (var i = 0; i < inputsChecked.length; i++) {
		inputsChecked[i].parentNode.classList.add("color");
	}
	for (var i = 0; i< inputsNotChecked.length; i++) {
		inputsNotChecked[i].parentNode.classList = ["labelClass"];
	}
}

var saveFormToLocalStorage = function() {
        $('input').each(function(a,b){
            var elementId = $(this).attr('id');
            if(a.checked){localStorage.setItem(elementId, JSON.stringify((document.getElementById(elementId)).checked))}
        })
}

var changeColor = function() {
	$(event.target).closest('.labelClass').toggleClass('color');
}

var saveFirstQuestionToLocalStorage = function() {
	localStorage.setItem("red", JSON.stringify((document.getElementById("red")).checked));
	localStorage.setItem("blue", JSON.stringify((document.getElementById("blue")).checked));
	localStorage.setItem("green", JSON.stringify((document.getElementById("green")).checked));
	localStorage.setItem("yellow", JSON.stringify((document.getElementById("yellow")).checked));
	localStorage.setItem("white", JSON.stringify((document.getElementById("white")).checked));
	localStorage.setItem("black", JSON.stringify((document.getElementById("black")).checked));
}

var saveSecondQuestionToLocalStorage = function() {
    var radioChecked = $('input:checked');
    localStorage.setItem(radioChecked.attr('name'), radioChecked.attr('id'));
}

var checkForm = function() {
    var ls = localStorage;
    var firstQuestionItems = ["red","blue","green","yellow","white","black"];
    var firstQuestionFilled = false;
    var secondQuestionFilled = false;

    $.each(firstQuestionItems, function(index, value) {
        if(JSON.parse(localStorage.getItem(value)) == true){
            firstQuestionFilled = true;
        }
    });

    var secondQuestionAnswer = localStorage.getItem("radio");
    if(secondQuestionAnswer != null) {
        secondQuestionFilled = true;
    }

    if(firstQuestionFilled == false) {
        alert("Wypełnij pytanie pierwsze!");
    }
    else if(secondQuestionFilled == false) {
        alert("Wypełnij pytanie drugie!");
    }

    return [firstQuestionFilled, secondQuestionFilled];
}

var sendForm = function(isQuestionsFilledArray) {
    if(isQuestionsFilledArray[0] == false) {
        window.location.href='strona1.html';
        return false;
    }
    else if(isQuestionsFilledArray[1] == false) {
        window.location.href='strona2.html';
        return false;
    }
    return true;
}

var sendPOST = function() {
    var formArray = checkForm();
    if(sendForm(formArray)){

        var jsonTemplate = {
            "user": localStorage.getItem("name"),
            "red": localStorage.getItem("red"),
            "blue": localStorage.getItem("blue"),
            "green": localStorage.getItem("green"),
            "yellow": localStorage.getItem("yellow"),
            "white": localStorage.getItem("white"),
            "black": localStorage.getItem("black"),
            "radio": localStorage.getItem("radio")
        };

        $.post("strona.php",
        jsonTemplate,
        function(data) {
              console.log(data);
        });
        localStorage.clear();
        window.location.href='strona3.html';
    }
};

function getStatistics(){
		$.ajax({
			type: 'GET',
			url: 'http://localhost/formularz/statistics.php',
			success: function(data){
				stat = $.parseJSON(data);
				var statJSON = $.parseJSON(data);
				var statString = "";
				statString += "Czerwony jest ulubionym kolorem " + statJSON['StatRed1'] + " osob. </br>";
				statString += "Niebieski jest ulubionym kolorem " + statJSON['StatBlue1'] + " osob. </br> ";
				statString += "Zielony jest ulubionym kolorem " + statJSON['StatGreen1'] + " osob. </br> ";
				statString += "Żołty jest ulubionym kolorem " + statJSON['StatYellow1'] + " osob. </br> ";
				statString += "Biały jest ulubionym kolorem " + statJSON['StatWhite1'] + " osob. </br> ";
				statString += "Czarny jest ulubionym kolorem " + statJSON['StatBlack1'] + " osob. </br> ";
				$('#stats').append(statString);

			}
		});
	};
