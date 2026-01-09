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
function inputProperty(text, type, parentContainer, required = true) {
    const container = document.createElement('div')
    container.className = "input-row"
    container.dataset.required = required
    inputDiv(text, type, container)
    parentContainer.appendChild(container)
    if (required) {
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

    const container = document.createElement('div')

    container.className = "log-input-container"

    const titleContainer = inputProperty("Model ", 'text', container)
    const partContainer = inputProperty("Part repaired", 'text', container)
    const costContainer = inputProperty("Cost", 'text', container)
    const personContainer = inputProperty("Who repaired it", 'text', container)
    const dateContainer = inputProperty("Date of log", 'date', container)
    const procedureContainer = inputProperty("Procedure", 'text', container, required = false)
    const extraContainer = inputProperty("Extra Notes", 'text', container, required = false)
    
    const containers = [titleContainer, partContainer, costContainer, personContainer, dateContainer, procedureContainer, extraContainer]

    const finishButton = document.createElement('button')
    finishButton.textContent = "Finish"
    container.appendChild(finishButton)
    document.body.appendChild(container)

    finishButton.addEventListener("click", () => { //apologies for awful nesting
        for (i = 0; i < containers.length;) {
            const input = containers[i].querySelector("input")
            const required = containers[i].dataset.required
            if (required) {
                if (input.type == 'text') {
                    if (!(input.textContent == "")) {

                    }
                }
            }
        }
    })
}

createButton.addEventListener("click", () => {
    if (!makingLog) {
        initLog()
    }
})