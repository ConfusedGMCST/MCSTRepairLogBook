const createButton = document.getElementById("createNew")
let makingLog = false

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
function inputProperty(text, type, parentContainer, required = false) {
    const container = document.createElement('div')
    container.className = "input-row"
    inputDiv(text, type, container)
    parentContainer.appendChild(container)
    if (!required) {
        
    }
    return container //returns the container to a variable
}

//initLog creates the log
function initLog() {
    makingLog = true //so you can't log more than one at a time

    const container = document.createElement('div')

    container.className = "log-input-container"

    const titleContainer = inputProperty("Model ", 'text', container)
    const partContainer = inputProperty("Part repaired", 'text', container)
    const costContainer = inputProperty("Cost", 'text', container)
    const personContainer = inputProperty("Who repaired it", 'text', container)
    const dateContainer = inputProperty("Date of log", 'date', container)
    const procedureContainer = inputProperty("Procedure", 'text', container, required = false)
    const extraContainer = inputProperty("Extra Notes", 'text', container, required = false)
    
    const finishButton = document.createElement('button')
    finishButton.textContent = "Finish" //add functionality later

    container.appendChild(finishButton)
    document.body.appendChild(container)
}

createButton.addEventListener("click", () => {
    if (!makingLog) initLog()
})