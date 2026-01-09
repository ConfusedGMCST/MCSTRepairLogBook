// const fs = require('fs'); you apparently need node.js for this

class LogEntry {
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

class miniLog {
    constructor(model, part, cost, date) {
        this.model = model
        this.part = part
        this.cost = cost
        this.date = date
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
}

//input property assembles both subDiv and inputDiv to create the sub container for storing a certain value in the log
function inputProperty(text, type, parentContainer, required = "true") {
    const container = document.createElement('div')
    container.className = "input-row"
    container.dataset.required = required
    inputDiv(text, type, container)
    parentContainer.appendChild(container)
    if (required === "true") {
        const star = document.createElement('h3')
        star.textContent = "*"
        star.className = "required"
        container.appendChild(star)
    }
    return container //returns the container to a variable
}

//initLog creates the log
function initLog() {
    makingLog = true //so you can't log more than one at a time
    invalid = false

    const container = document.createElement('div')

    container.className = "log-input-container"

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
    document.body.appendChild(container)

    finishButton.addEventListener("click", () => { //checks if all boxes that require input are filled and adds the values into the logs.json files
        let hasInvalid = false;
        inputs = []

        for (let i = 0; i < inputAmount; i++) {
            const input = containers[i].querySelector("input");
            const required = containers[i].dataset.required === "true";
            inputs[i] = input.value //has ALL the values for each of the properties of the log
            input.classList.remove("invalid");

            if (required && input.value.trim() === "") {
                hasInvalid = true;
                input.classList.add("invalid");
            }
        }

        if (hasInvalid) {
            alert("invalid entry, please enter information in required boxes");
        } else {
            newLog = new LogEntry(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5], inputs[6])
            document.body.removeChild(container)
            makingLog = false
        }
    });
}

createButton.addEventListener("click", () => {
    if (!makingLog) {
        initLog()
    }
})