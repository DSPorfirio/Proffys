module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subjetc,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subjetc}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                weekday,
                time_from,
                time_to,
                class_id
            ) VALUES (
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}",
                "${class_id}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)

}