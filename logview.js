const idText = document.getElementById("id")
const model = document.getElementById("model")
const part = document.getElementById("part")
const cost = document.getElementById("cost")
const date = document.getElementById("date")
const procedure = document.getElementById("procedure")
const extra = document.getElementById("extra-notes")

currentID = sessionStorage.getItem('currentID')

fetch('logs.json') //creates a test log
    .then(response => response.json())
    .then(jsonData => {
        const logs = jsonData.logs.map(data => new Log(data))   

        const testLog = logs.find(p => p.id == currentID)
        idText.textContent = testLog.id
        model.textContent = testLog.model
        part.textContent = testLog.part
        cost.textContent = testLog.cost
        date.textContent = testLog.date
        procedure.textContent = testLog.procedure
        extra.textContent = testLog.extra
    })
    .catch(err => console.error('Error loading file:', err))