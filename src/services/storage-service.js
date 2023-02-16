export const storageService = {
    getLeads,
    getNewLeads,
    getContacts,
    getMyContacts,
}

function getLeads(key) {
    return new Promise((resolve, reject) => {
        let leads = JSON.parse(localStorage.getItem(key))
        if (!leads || leads.length) leads = _createLeads(key)
        resolve(leads)
    })
}

function getNewLeads(key) {
    return new Promise(async (resolve, reject) => {
        const leads = await getLeads(key)
        const newLeads = leads.filter(lead => lead.status === 'New')
        if (newLeads.length) resolve(newLeads)
        else reject('No new leads')
    })
}

function getContacts(key) {
    return new Promise((resolve, reject) => {
        let contacts = JSON.parse(localStorage.getItem(key))
        if (!contacts || !contacts.length) contacts = _createContacts(key)
        resolve(contacts)
    })
}

function getMyContacts(key, ownerId) {
    return new Promise(async (resolve, reject) => {
        const contacts = await getContacts(key)
        const myContacts = contacts.filter(contact => contact.owner_id === ownerId)
        if (myContacts.length) resolve(myContacts)
        else reject('No contacts')
    })
}

function _createLeads(key) {
    const leads = [
        {
            _id: 'fnB5b5KheZ',
            status: 'New',
            fullname: 'שגיא לוי',
            firstName: 'שגיא',
            lastName: 'לוי',
            phone: '054-598-8518',
            email: 'sasagsagi@gmail.com',
            createdAt: 1672481130084,
            channel: 'Website',
            source: 'Google Ad',
            message: 'הודעה: לא השאיר/ה הודעה',
            lastContactAt: 1672581130084,
        },
        {
            _id: '72D7O5BKYX',
            status: 'In progress',
            fullname: 'נעמה בר',
            firstName: 'נעמה',
            lastName: 'בר',
            phone: '054-238-6899',
            email: 'lusya15@walla.com',
            createdAt: 1672481130081,
            channel: 'Facebook',
            source: 'Facebook Ad',
            message: '',
        },
        {
            _id: '7GRnvkOwl1',
            status: 'In progress',
            fullname: 'יוסי שטרן',
            firstName: 'יוסי',
            lastName: 'שטרן',
            phone: '054-572-2684',
            email: 'Yossiv.il@gmail.com',
            createdAt: 1672481130079,
            channel: 'Website',
            source: 'Oragaic',
            message:
                'הודעה:  אני מנהל את הנכסים הדיגיטליים של אחת החברות המסחריות הגדולות בארץ והייתי רוצה להתמקצע יותר בפיתוח. אני כמובן עובד משרה מלאה , האם יש לכם קורס לימודי ערב/ לאנשים שעובדים במשרה מלאה?',
        },
        {
            _id: 'N96q8AxQcN',
            status: 'In progress',
            fullname: 'ראיד חורי',
            firstName: 'ראיד',
            lastName: "ח'ורי",
            phone: '050-599-4990',
            email: 'khouryrd@gmail.com',
            createdAt: 1672481130082,
            channel: 'Website',
            source: 'Google Ad',
            message: 'הודעה: לא השאיר/ה הודעה',
        },
        {
            _id: 'BNhDfbH6jq',
            status: 'New',
            fullname: 'נעם ברק',
            firstName: 'נעם',
            lastName: 'בורק',
            phone: '058-786-1173',
            email: 'n.burak77@gmail.com',
            createdAt: 1672481130098,
            channel: 'Facebook',
            source: 'Facebook Ad',
            message: '',
        },
        {
            _id: 'QpZBBVf6JM',
            status: 'New',
            fullname: 'כרמל שביט',
            firstName: 'כרמל',
            lastName: 'שביט',
            phone: '054-525-6147',
            email: 'carmel.shavit@gmail.com',
            createdAt: 1672481123575,
            channel: 'Website',
            source: 'Google Ad',
            message: 'הודעה: לא השאיר/ה הודעה',
        },
    ]
    localStorage.setItem(key, JSON.stringify(leads))
    return leads
}

function _createContacts(key) {
    const contacts = {
        ownerId: 'sdfsdfsdfsdfsdfsdf',
        stages: [
            {
                id: 'u101',
                stage: 'אנשי קשר חדשים',
                children: [
                    {
                        id: 'c101',
                        img: 'https://robohash.org/puki',
                        name: 'Puki',
                        phone: '055-278-9984',
                    },
                    {
                        id: 'c102',
                        img: 'https://robohash.org/shuki',
                        name: 'Shuki',
                        phone: '055-527-6654',
                    },
                    {
                        id: 'c103',
                        img: 'https://robohash.org/mia',
                        name: 'Mia',
                        phone: '055-421-8755',
                    },
                ],
            },
            {
                id: 'u102',
                stage: 'הוזמנו לערב פתוח',
                children: [
                    {
                        id: 'c104',
                        img: 'https://robohash.org/dudi',
                        name: 'Dudi',
                        phone: '055-278-4578',
                    },
                    {
                        id: 'c105',
                        img: 'https://robohash.org/muki',
                        name: 'Muki',
                        phone: '055-527-1475',
                    },
                    {
                        id: 'c106',
                        img: 'https://robohash.org/chicka',
                        name: 'Chika',
                        phone: '055-421-4572',
                    },
                ],
            },
            {
                id: 'u103',
                stage: 'הגיעו לערב פתוח',
                children: [
                    {
                        id: 'c107',
                        img: 'https://robohash.org/baba',
                        name: 'Baba',
                        phone: '055-278-7451',
                    },
                    {
                        id: 'c108',
                        img: 'https://robohash.org/misha',
                        name: 'Misha',
                        phone: '055-557-1475',
                    },
                    {
                        id: 'c109',
                        img: 'https://robohash.org/mazal',
                        name: 'Mazal',
                        phone: '055-421-7895',
                    },
                ],
            },
            {
                id: 'u104',
                stage: 'קיבלו אתגר',
                children: [
                    {
                        id: 'c110',
                        img: 'https://robohash.org/baba',
                        name: 'Baba',
                        phone: '055-278-7451',
                    },
                    {
                        id: 'c111',
                        img: 'https://robohash.org/misha',
                        name: 'Misha',
                        phone: '055-557-1475',
                    },
                    {
                        id: 'c112',
                        img: 'https://robohash.org/mazal',
                        name: 'Mazal',
                        phone: '055-421-7895',
                    },
                ],
            },
            {
                id: 'u105',
                stage: 'זומנו לראיון',
                children: [
                    {
                        id: 'c113',
                        img: 'https://robohash.org/baba',
                        name: 'Duda',
                        phone: '055-475-7451',
                    },
                    {
                        id: 'c114',
                        img: 'https://robohash.org/misha',
                        name: 'Pita',
                        phone: '055-557-4486',
                    },
                    {
                        id: 'c115',
                        img: 'https://robohash.org/mazal',
                        name: 'Falafel',
                        phone: '055-421-7732',
                    },
                ],
            },
        ],
    }
    localStorage.setItem(key, JSON.stringify(contacts))
    return contacts
}
