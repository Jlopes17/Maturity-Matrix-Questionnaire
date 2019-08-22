var score = 0,
    page = 0,
    perPage = 8;
var rows = [];
var questions = [
    "Our releases are usually small-scale iterative changes to existing features/services.",
    "Our feature releases are regular—for example, 'Release Feature X in two months, Feature Y in four months and Feature Z in six months'—with little or no deviation.",
    "Our team communicates well internally, but we don't talk to other teams very much.",
    "We run development as short-term, concentrated project 'sprints'.",
    "Inside of our teams, we have great mutual support and cameraderie.",
    "We focus on moving fast.",
    "Hard to do more than quick fixes when a bug or some other problem pops up.",
    "Our applications are divided into components that communicate through networking.",
    "Our individual teams each have very vertical and targeted responsibilities—we handle exactly one slice of the pie (a single component).",
    "New functionality requests can usually be accommodated within a few weeks.",
    "Developers test and merge their changes every few days, but notdirectly onto the production system",
];

function clearRow(n) {
    rows[n] = 0;
    var element = document.getElementsByClassName('options')[n].getElementsByClassName('option');
    for (var i = 0; i < element.length; i++) {
        if (element[i].getElementsByTagName("span")[0].classList.contains("checked")) {
            score += parseInt(element[i].getElementsByTagName("span")[0].getAttribute("data-value")) * -1;
            element[i].getElementsByTagName("span")[0].classList.remove("checked");
            element[i].getElementsByTagName("span")[0].style.background = "#FFFFFF";
        }
    }
}

// Draw main content (questions + choices + next button)
function drawPage(p) {
    rows = [];
    document.getElementById('questions').innerHTML = '';
	// pagination calculation
    var limit = p * perPage + perPage;
    if (limit > questions.length) {
        limit = questions.length
    }
    var row = 0;
	// draw questions
    for (var i = p * perPage; i < limit; i++) {
        document.getElementById('questions').innerHTML += '<div class="question"><div class="statement">' + questions[i] + '</div><div data-row="' + row + '" class="options"><div class="option">Agree<br><span data-value="1" class="round agree"></span></div><div class="option">Neutral<br><span data-value="0" class="round neutral"></span></div><div class="option">Disagree<br><span data-value="-1" class="round disagree"></span></div></div><hr></hr></div>';
        rows.push(0);
        row++;
    }
	// if questionnaire is ended, display an image depending the score.
    if (row == 0) {
        var img = 3;
        if (score >= 3 && score < 8) {
            img = 2
        }
        if (score >= 8) {
            img = 1
        }
        document.getElementById('score').innerHTML = "CONGRATULATIONS!<br><br><p id='congrats'>You have completed a simplified and abridged version of the same diagnostic tool\n" +
            "Container Solutions engineers use when we are called in for an assessment. (Ours\n" +
            "has many, many more questions, takes two days to fully administer, and includes\n" +
            "focus group and individual interviews for fact finding and maximum depth). </p><br><p id='congrats'>We hope you found the process helpful and maybe even enjoyable. But a word of\n" +
            "caution: this is meant to provide a very general top-level overview. Cloud migrations\n" +
            "are very complex (and expensive) undertakings. Please be sure to consult with\n" +
            "experts who have previously—and successfully—navigated the Cloud Native\n" +
            "transformation path </p><br><p id='congrats'>A good next step: book a Container Solutions Cloud Native Readiness Assessment.\n" +
            "Following our multi-day site visit we provide a full report of findings and a thorough\n" +
            "analysis. </p><br><p id='congrats'>Our co-founder and CEO Jamie Dobson promises, ‘You will never regret bringing us\n" +
            "in for a discovery. Investing in two days of organisational self discovery gives hugely\n" +
            "valuable insights into your company’s current situation. And, should you decide\n" +
            "to undertake a Cloud Native transformation, it will save you a lot of time—not to\n" +
            "mention a lot of money.’</p> <br><br><a href='images/" + img + ".pdf'>Show Report</a>";

        return false;
    }
    //options event listeners (radio buttons)
    setTimeout(function() {
        var opts = document.getElementsByClassName('round');
        for (var j = 0; j < opts.length; j++) {
            opts[j].addEventListener("click", function() {
                clearRow(parseInt(this.parentElement.parentElement.getAttribute("data-row")));
                rows[parseInt(this.parentElement.parentElement.getAttribute("data-row"))] = 1;
                this.classList.add("checked");
                this.style.background = this.style.borderColor;
                switch (this.getAttribute('data-value')) {
                    case '1':
                        this.style.background = "#1ED6B3";
                        break;
                    case '0':
                        this.style.background = "#999999";
                        break;
                    case '-1':
                        this.style.background = "#FF16AA";
                        break;
                }
                score += parseInt(this.getAttribute('data-value'));
                if (rows.indexOf(0) == -1) {
                    document.getElementsByClassName('btn')[0].classList.add("enabled");
                    document.getElementsByClassName('btn')[0].classList.remove("disabled");
                    document.getElementsByClassName('btn')[0].disabled = false;
                }
            });
        }
        document.getElementsByClassName('btn')[0].addEventListener("click", function() {
            page++;
            drawPage(page);
        });
    }, 1);


    document.getElementById('questions').innerHTML += '<br><button class="btn disabled" disabled>Next</button>';
}
drawPage(0);