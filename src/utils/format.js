const subjetcArray = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdayArray = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubjetc(subjetcNumber) {
    const position = +subjetcNumber
    return subjetcArray[position-1]
}

function convertHoursToMinutes(time) {
    const [ hours, minutes ] = time.split(":")
    return Number((hours*60) + minutes)
}

module.exports = [
    subjetcArray,
    weekdayArray,
    getSubjetc,
    convertHoursToMinutes
]