let container = document.querySelector('.container')

let resultContainer = document.querySelector('.result')

let submitBtn = document.querySelector('.submit-btn')
let reloadBtn = document.querySelector('.reload-btn')
let filterBtn = document.querySelector('.filter-btn')

let warning = document.querySelector('.warning')
let qInput = document.querySelector('.q-input')
let categories = document.querySelector('.categories span')
let categoriesMenu = document.querySelectorAll('.navbar-menu2 li')

let questionsQnt = 10
let category = ''
let opstionsList = []
let correctAnswers =  []
let numbersArray = [0, 1, 2, 3]
let answers = []

let endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&type=multiple`

filterBtn.addEventListener('click', () => {
        resultContainer.classList.add('hide')
        submitBtn.classList.add('hide')
        reloadBtn.classList.add('hide')
        container.innerHTML = ''

        category = categories.innerHTML

        if (qInput.value) {
                if (qInput.value <= 0) {
                        qInput.value = 10
                }

                if (qInput.value > 30) {
                        qInput.value = 30
                }

                questionsQnt = qInput.value
                pickCategory()
        } else {
                pickCategory()
        }

        generateQ()

        setTimeout(() => submitBtn.classList.remove('hide'), 1000)
})


submitBtn.addEventListener('click', () => {
        let inputs = document.querySelectorAll('input')
        answers = []

        if (isAnswered(inputs)) {
                reloadBtn.classList.remove('hide')
                isCorrent(inputs)
        }
})

reloadBtn.addEventListener('click', () => location.reload())

categoriesMenu.forEach(categorie => {
        categorie.addEventListener('click', () => categories.innerText = categorie.innerHTML)
})

function generateQ() {
        fetch(endPoint)
                .then(response => {
                        return response.json()
                })
                .then(jsonData => {
                        console.log(jsonData)

                        for (let i = 0; i < questionsQnt; i++) {
                                opstionsList.push({
                                        0: jsonData.results[i].correct_answer,
                                        1: jsonData.results[i].incorrect_answers[0],
                                        2: jsonData.results[i].incorrect_answers[1],
                                        3: jsonData.results[i].incorrect_answers[2]
                                })

                                correctAnswers.push(jsonData.results[i].correct_answer)

                                let faq = document.createElement('div')
                                faq.classList.add('faq')

                                faq.innerHTML = `
                                <div class="question">${jsonData.results[i].question}</div>
                                <div class="options">
                                        <div class="option">
                                                <input type="radio" name="${i + 1}" id="${i + 1}a">
                                                <label for="${i + 1}a">${opstionsList[i][getRandomNumber()]}</label>
                                        </div>
                                        <div class="option">
                                                <input type="radio" name="${i + 1}" id="${i + 1}b">
                                                <label for="${i + 1}b">${opstionsList[i][getRandomNumber()]}</label>
                                        </div>
                                        <div class="option">
                                                <input type="radio" name="${i + 1}" id="${i + 1}c">
                                                <label for="${i + 1}c">${opstionsList[i][getRandomNumber()]}</label>
                                        </div>
                                        <div class="option">
                                                <input type="radio" name="${i + 1}" id="${i + 1}d">
                                                <label for="${i + 1}d">${opstionsList[i][getRandomNumber()]}</label>
                                        </div>
                                </div>
                        `

                                container.appendChild(faq)
                                numbersArray = [0, 1, 2, 3]
                        }
                })
}

function getRandomNumber() {
        let number = Math.floor(Math.random() * numbersArray.length)
        let randomNumber = numbersArray[number]
        numbersArray.splice(number, 1)

        return randomNumber
}

function isAnswered(inputs) {
        let count = 0

        inputs.forEach(input=> {
                if (input.checked) {
                        count++
                        answers.push(input.nextElementSibling.innerHTML)
                }
        })

        if (count == questionsQnt) {
                warning.innerHTML = '&nbsp;'
                return true
        } else {
                warning.innerHTML = '*responda todas as perguntas;'
                return false
        }

}

function isCorrent(inputs) {
        let correct = 0
        let wrong = 0

        for (let i = 0; i < answers.length; i++){
                if (answers[i] == correctAnswers[i]) {
                        correct++

                        inputs.forEach(input => {
                                if (input.checked) {
                                        if (input.nextElementSibling.innerHTML == answers[i]) {
                                                input.nextElementSibling.classList.add('right')
                                        }
                                }
                        })
                } else {
                        wrong++
                }
        }

        resultContainer.classList.remove('hide')
        resultContainer.innerHTML = `
                You answered  ${correct} out of 10 questions correctly.
        `

        window.scrollTo(0, document.body.scrollHeight)

        console.log(opstionsList)
}

function pickCategory() {
        switch (category) {
                case 'Any Category':
                case 'Categories':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&type=multiple`
                        break
                case 'General Knowledge':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&category=9&type=multiple`
                        break
                case 'Animals':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&category=27&type=multiple`
                        break
                case 'Sports':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&category=21&type=multiple`
                        break
                case 'Politics':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&category=24&type=multiple`
                        break
                case 'Celebrities':
                        endPoint = `https://opentdb.com/api.php?amount=${questionsQnt}&category=26&type=multiple`
                        break
        }
}