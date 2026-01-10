// const fs = require('fs'); you apparently need node.js for this
const contentHolder = document.getElementById("contentHolder")
currentLog = 0

class LogEntry { //for making new logs
    constructor(model, part, cost, person, date, procedure, extra) {
        this.model = model
        this.part = part
        this.cost = cost
        this.person = person
        this.date = date
        this.procedure = procedure
        this.extra = extra
    }
}

class Log { // for pre-existing logs
    constructor(data) {
        this.id = data.id
        this.model = data.model
        this.part = data.part
        this.cost = data.cost
        this.person = data.person
        this.date = data.date
        this.procedure = data.procedure
        this.extra = data.extra
    }
}

class miniLog { //creates a visible mini display of a log, which when expanded goes to a separate webpage
    constructor(data) {
        this.id = data.id
        this.model = data.model
        this.part = data.part
        this.cost = data.cost
        this.date = data.date
    }
    showLog() {
        const logContainer = document.createElement('div')
        
        logContainer.setAttribute('align', 'right')

        const idText = this.quickH3(this.id, logContainer)
        const modelText = this.quickH3(this.model, logContainer)
        const partText = this.quickH3(this.part, logContainer)
        const costText = this.quickH3(this.cost, logContainer)
        const dateText = this.quickH3(this.date, logContainer)

        const expandButton = document.createElement('button')

        expandButton.textContent = "expand"

        expandButton.addEventListener("click", () => {
            currentLog = this.id
            sessionStorage.setItem('currentID', currentLog)
            window.location.assign("logview.html")
        })

        logContainer.appendChild(expandButton)
        contentHolder.appendChild(logContainer)
    }
    quickH3(text, parent) {
        const propertyText = document.createElement('h3')

        propertyText.textContent = text

        parent.appendChild(propertyText)
        return propertyText
    }
}

const createButton = document.getElementById("createNew")
makingLog = false
inputAmount = 7

//inputDiv creates the elements in the sub container
function inputDiv(text, type, parent) {
    const textElement = document.createElement('h3')
    const input = document.createElement('input')

    textElement.textContent = text
    input.type = type

    parent.appendChild(textElement)
    parent.appendChild(input)

    return textElement
}

//input property assembles both subDiv and inputDiv to create the sub container for storing a certain value in the log
function inputProperty(text, type, parentContainer, required = "true") {
    const container = document.createElement('div')
    // container.className = "input-row"
    container.dataset.required = required
    const inputElement = inputDiv(text, type, container)
    parentContainer.appendChild(container)
    if (required === "true") {
        inputElement.textContent = inputElement.textContent + "*" 
        // star.className = "required"
    }
    return container //returns the container to a variable
}

//initLog creates the log
function initLog() {
    makingLog = true //so you can't log more than one at a time
    invalid = false

    const container = document.createElement('div')

    // container.className = "log-input-container"

    const titleContainer = inputProperty("Model ", 'text', container)
    const partContainer = inputProperty("Part repaired", 'text', container)
    const costContainer = inputProperty("Cost", 'text', container)
    const personContainer = inputProperty("Who repaired it", 'text', container)
    const dateContainer = inputProperty("Date of log", 'date', container)
    const procedureContainer = inputProperty("Procedure", 'text', container, required = "false")
    const extraContainer = inputProperty("Extra Notes", 'text', container, required = "false")
    
    const containers = [titleContainer, partContainer, costContainer, personContainer, dateContainer, procedureContainer, extraContainer]

    const finishButton = document.createElement('button')
    finishButton.textContent = "Finish"
    container.appendChild(finishButton)
    contentHolder.prepend(container)

    finishButton.addEventListener("click", () => { //checks if all boxes that require input are filled and adds the values into the logs.json files
        let hasInvalid = false;
        inputs = []

        for (let i = 0; i < inputAmount; i++) {
            const input = containers[i].querySelector("input")
            const required = containers[i].dataset.required === "true"
            inputs[i] = input.value //has ALL the values for each of the properties of the log
            // input.classList.remove("invalid");

            if (required && input.value.trim() === "") {
                hasInvalid = true
                // input.classList.add("invalid")
            }
        }

        if (hasInvalid) {
            alert("invalid entry, please enter information in required boxes")
        } else {
            newLog = new LogEntry(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5], inputs[6])
            contentHolder.removeChild(container)
            makingLog = false
        }
    });
}

createButton.addEventListener("click", () => {
    if (!makingLog) {
        initLog()
    }
})

fetch('logs.json') //creates a test log
    .then(response => response.json())
    .then(jsonData => {
        const logs = jsonData.logs.map(data => new miniLog(data))   

        const testLog = logs.find(p => p.id == 0)
        testLog.showLog()
    })
    .catch(err => console.error('Error loading file:', err))