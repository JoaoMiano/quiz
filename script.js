// dados iniciais
let currentQuestion = 0
let countQuestions = 0
showQuestion()

//eventos
document.querySelector('button').addEventListener('click', reset)


// Funções
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion]
        let pct = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = ''

        let optionsHTML = ''
        for (let i in q.options) {
            optionsHTML += `<div data-op=${i} class='option'><span>${+i + 1}</span>${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', clickOption)
        })

    } else {
        finish()
    }
}

function clickOption(e) {
    let clikedOption = e.target.getAttribute("data-op")
    if (clikedOption == questions[currentQuestion].answer) {
        e.target.style.backgroundColor = "#006600"
        countQuestions++
        currentQuestion++

        setTimeout(showQuestion, 250)
    } else {
        e.target.style.backgroundColor = "#660000"
        currentQuestion++
        setTimeout(showQuestion, 250)
    }
}

function finish() {
    let points = Math.floor((countQuestions / questions.length) * 100);

    document.querySelector('.progress--bar').style.width = `100%`
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none'

    if (points < 40) {
        document.querySelector('.scoreText1').innerHTML = "Estude mais!!"
        document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
        document.querySelector('.scorePct').style.color = '#660000'
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${countQuestions}.`
    }
    if (points >= 40 && points <= 80) {
        document.querySelector('.scoreText1').innerHTML = "Até que ta bom!"
        document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
        document.querySelector('.scorePct').style.color = '#DF9F17'
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${countQuestions}.`
    }
    if (points > 80) {
        document.querySelector('.scoreText1').innerHTML = "Mandou Bem!!!"
        document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
        document.querySelector('.scorePct').style.color = '#006600'
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${countQuestions}.`
    }
}

function reset(){
    currentQuestion = 0
    countQuestions = 0
    showQuestion()
}