const Database = require('./database/db')

const [ subjetcArray, weekdayArray, getSubjetc, convertHoursToMinutes ] = require('./utils/format');

// Páginas
function pageLanding(req, res) {
    return res.render("index.html");
}

async function pageStudy(req, res) {
    
    const filters = req.query
    
    if (!filters.subjetc || !filters.weekday || !filters.time){
        return res.render("study.html", { filters, subjetcArray, weekdayArray})
    } else {

        const timeToMinutes = convertHoursToMinutes(filters.time)

        const query = `
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes ON (classes.proffy_id = proffys.id)
            WHERE EXISTS (
                SELECT class_schedule.*
                FROM class_schedule
                WHERE class_schedule.class_id = classes.id
                AND class_schedule.weekday = ${filters.weekday}
                AND class_schedule.time_from <= ${timeToMinutes}
                AND class_schedule.time_to > ${timeToMinutes}
            )
            AND classes.subjetc = '${filters.subjetc}'
        `

        try {
            const db = await Database
            const proffys = await db.all(query)

            proffys.map((proffy) => {
                proffy.subjetc = getSubjetc(proffy.subjetc)
            })

            return res.render('study.html', {proffys, subjetcArray, filters, weekdayArray})
        } catch (error) {
            console.log(error)
        }
    }
}

function pageGiveClasses(req, res) {
    
    return res.render("give-classes.html", { weekdayArray, subjetcArray });
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subjetc: req.body.subjetc,
        cost: req.body.cost
    }

    
    const classScheduleValues = req.body.weekday.map((weekday, index) => {   
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })


    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject" + req.body.subjetc
        queryString += "&weekday" + req.body.weekday[0]
        queryString += "&time" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = [
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
]