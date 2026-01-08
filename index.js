const createButton = document.getElementById("createNew")
let makingLog = false

function subDiv(div) {
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.gap = '8px'
}

function inputDiv(text, parent) {
    const textElement = document.createElement('h3')
    const input = document.createElement('input')

    textElement.textContent = text
    input.type = 'text'

    parent.appendChild(textElement)
    parent.appendChild(input)
}

function initLog() {
    makingLog = true

    const container = document.createElement('div')
    const titleContainer = document.createElement('div')
    const partContainer = document.createElement('div')

    container.style.padding = '0.5%'
    container.style.border = '3px solid black'
    container.style.marginTop = '2%'
    container.style.marginRight = '40%'

    subDiv(titleContainer)
    subDiv(partContainer)

    inputDiv("Model", titleContainer)
    inputDiv("Part repaired", partContainer) //This shouldn't be input, it should be a list of checkboxes and you can add a new one

    container.appendChild(titleContainer)
    container.appendChild(partContainer)
    document.body.appendChild(container)
}

createButton.addEventListener("click", () => {
    if (!makingLog) initLog()
})