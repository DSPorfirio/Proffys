const Database = require("./db")
const createProffy = require("./createProffy")

Database.then(async (db) => {
    //Iserir dados
    proffyValue = {
        name: "Danilo Porfírio",
        avatar: "https://avatars1.githubusercontent.com/u/44443621?s=400&u=15345a0e83d2bc16b95cdeddee5841baef0186f9&v=4",
        whatsapp: "35987095714",
        bio: "Cientista da Computação",
    }

    classValue = {
        subjetc: 1,
        cost: "20",
        //proffy id banco de dados
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220,
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220,
            // class_id banco de dados
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    //console.log(selectClassesSchedules)

})