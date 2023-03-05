import { sheetService } from './sheet-service.js'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'
import { userService } from './user.service.js'
import { asyncStorageService } from './async-storage.service'

const LEADS_KEY = 'leads_db'
const CONTACT_KEY = 'contact_db'

export const leadService = {
    // query,
    getLeads,
    getLeadById,
    getNewLeads,
    getContacts,
    getTableFields,
    getBoardFields,
    // setTableFields,
    getLeadCardSections,
    // setUserPrefFields,
    getCurrFilterViews,
}

// function query() {
//     return asyncStorageService.query(LEADS_KEY)
// }

_createLeads()

async function getLeads(filterBy = null) {
    // console.log('filterBy: ', filterBy);
    // let leads = _createLeads()
    let leads = await asyncStorageService.query(LEADS_KEY)
    leads = _filterLeads(leads, filterBy)
    return leads
    // return storageService.getLeads(LEADS_KEY)
    // return sheetService.getLeads()
}

async function getLeadById(id) {
    return await asyncStorageService.get(LEADS_KEY, id)
}

function getNewLeads() {
    return storageService.getNewLeads(LEADS_KEY)
    // return sheetService.getNewLeads()
}

function getContacts(userId) {
    // setStage()
    return gContacts
    // return storageService.getContacts(CONTACT_KEY)
    // return sheetService.getContacts(userId)
}

function setStage() {
    console.log('stage')
}

async function postContact(payload) {
    var formData = { name: 'ghj', phone: '678678', email: 'gyjgfgj@dfhg.com' }
    var data = new URLSearchParams()
    for (var key in formData) {
        data.append(key, formData[key])
    }
    const res = await fetch('https://eu-west-1.aws.data.mongodb-api.com/app/sheetstomongodb-sulid/endpoint/sheets', {
        method: 'POST',
        body: data,
    })
    const id = await res.json()
    console.log('id: ', id)
}

async function getFromMongo() {
    const findEndpoint = 'https://data.mongodb-api.com/app/data-ghtax/endpoint/data/v1/action/find'
    const clusterName = 'SheetsCluster'
    const partname = ''

    const apiKey = 'Nm8A0uhf898Wn4tQe03iGDbHStBVje6kB3ASWABm3Ftth6aS6MBUrXZ0VqAHPcRc'
    //  const apiKey = import.meta.env.VITE_MONGODB_API_KEY
    // console.log('apiKey: ', apiKey);

    //We can do operators like regular expression with the Data API
    const query = { name: { $regex: `${partname}`, $options: 'i' } }
    const order = { name: 1 }
    const limit = 100
    //We can Specify sort, limit and a projection here if we want
    const payload = {
        filter: query,
        sort: order,
        limit,
        collection: 'contact_db',
        database: 'googlesheetsdb',
        dataSource: clusterName,
    }

    const options = {
        method: 'POST',
        // contentType: 'application/json',
        body: JSON.stringify(payload),
        headers: { 'api-key': apiKey, 'Content-type': 'application/json' },
    }

    const res = await fetch(findEndpoint, options)
    console.log('res: ', res.json())
    // console.log(JSON.parse(res.getContentText()).documents)
    // const documents = JSON.parse(res.getContentText()).documents

    // for (d = 1; d <= documents.length; d++) {
    //     let doc = documents[d - 1]
    //     fields = [[doc.name, doc.phone, doc.email]]
    //     let row = d + 2
    //     sheet.getRange(`C${row}:E${row}`).setValues(fields)
    // }
}

function getMyContacts(userId) {
    const leads = storageService.getLeads(LEADS_KEY)
    let contacts = leads.filter(lead => lead.ownerId === userId)
    contacts.map(contact => {
        // gContacts.stages[contact.status].children.push(contact)
        const currStage = gContacts.stages.filter(stage => stage.status === contact.status)
        currStage.push(contact)
    })
}
// function mongoTry() {
//     var axios = require('axios')
//     var data = JSON.stringify({
//         collection: 'contact_db',
//         database: 'googlesheetsdb',
//         dataSource: 'SheetsCluster',
//         projection: {
//             _id: 1,
//         },
//     })

//     var config = {
//         method: 'post',
//         url: 'https://data.mongodb-api.com/app/data-ghtax/endpoint/data/v1/action/findOne',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Request-Headers': '*',
//             'api-key': 'Nm8A0uhf898Wn4tQe03iGDbHStBVje6kB3ASWABm3Ftth6aS6MBUrXZ0VqAHPcRc',
//         },
//         data: data,
//     }

//     axios(config)
//         .then(function (response) {
//             console.log(JSON.stringify(response.data))
//         })
//         .catch(function (error) {
//             console.log(error)
//         })
// }

function getTableFields() {
    const userPrefs = userService.getUserPrefs()
    if (userPrefs?.tableFields) return userPrefs.tableFields
    return [
        { id: 'tf101', key: 'status', txt: 'סטטוס', isActive: true },
        { id: 'tf102', key: 'fullname', txt: 'שם מלא', isActive: true },
        { id: 'tf103', key: 'firstName', txt: 'שם פרטי', isActive: false },
        { id: 'tf104', key: 'lastName', txt: 'שם משפחה', isActive: false },
        { id: 'tf105', key: 'phone', txt: 'טלפון', isActive: true },
        { id: 'tf106', key: 'email', txt: 'אימייל', isActive: true },
        { id: 'tf107', key: 'leadManager', txt: 'מנהל לקוח', isActive: true },
        { id: 'tf108', key: 'channel', txt: "צ'אנל", isActive: true },
        { id: 'tf109', key: 'createdAt', txt: 'תאריך כניסה', isActive: true, isDate: true },
        { id: 'tf111', key: 'message', txt: 'הודעה', isActive: true },
        { id: 'tf112', key: 'contactLog', txt: 'לוג שיחה', isActive: true },
        { id: 'tf113', key: 'source', txt: 'מקור', isActive: false },
        { id: 'tf114', key: 'stopper', txt: 'חסם פוטנציאלי', isActive: false },
        { id: 'tf115', key: 'lastContactMethod', txt: 'אמצעי קשר אחרון', isActive: false },
        { id: 'tf116', key: 'lastContactBy', txt: 'מי תקשר אחרון', isActive: false },
        { id: 'tf117', key: 'lastContactAt', txt: 'תאריך תקשורת אחרון', isActive: false, isDate: true },
        { id: 'tf118', key: 'nextContactTime', txt: 'זמן התקשרות הבא', isActive: false },
        { id: 'tf119', key: 'nextContactDate', txt: 'תאריך התקשרות הבא', isActive: false, isDate: true },
    ]
}

function getBoardFields() {
    return [
        { id: 'bf101', key: 'new', txt: 'חדשים', isActive: true },
        { id: 'bf102', key: 'beforeIntro', txt: 'לפני ע"פ', isActive: true },
        { id: 'bf103', key: 'intro', txt: 'ערב פתוח', isActive: true },
        { id: 'bf104', key: 'afterIntro', txt: 'אחרי ע"פ', isActive: true },
        { id: 'bf105', key: 'interviewScheduled', txt: 'נקבע ראיון', isActive: true },
        { id: 'bf106', key: 'interview', txt: 'בתהליך ראיון', isActive: true },
        { id: 'bf107', key: 'done', txt: 'רשומים', isActive: true },
        { id: 'bf108', key: 'close', txt: 'סגורים', isActive: true },
    ]
}

// function setTableFields(fields) {
//     let userPrefs = userService.getUserPrefs()
//     if (!userPrefs) userPrefs = {}
//     userPrefs.tableFields = fields //.map(field => field.isActive?)
//     userService.saveUserPrefs(userPrefs)
// }
// function setUserPrefFields(fields) {
//     let userPrefs = userService.getUserPrefs()
//     if (!userPrefs) userPrefs = {}
//     userPrefs.tableFields = fields //.map(field => field.isActive?)
//     userService.saveUserPrefs(userPrefs)
// }

function getLeadCardSections() {
    const userPrefs = userService.getUserPrefs()
    if (userPrefs?.cardSections) return userPrefs.cardSections
    const cardSections = [
        {
            id: 's1',
            name: 'פרטים כלליים',
            isOpen: true,
            fields: [
                { key: 'status', txt: 'סטטוס', isActive: true, isEditable: false },
                { key: 'fullname', txt: 'שם מלא', isActive: true, isEditable: false },
                { key: 'firstName', txt: 'שם פרטי', isActive: true, isEditable: false },
                { key: 'lastName', txt: 'שם משפחה', isActive: true, isEditable: false },
                { key: 'phone', txt: 'טלפון', isActive: true, isEditable: false, type: 'phone' },
                { key: 'createdAt', txt: 'תאריך כניסה', isActive: true, isEditable: false, type: 'date', isImmutable: true },
                { key: 'source', txt: 'מקור', isActive: true, isEditable: false },
                { key: 'channel', txt: "צ'אנל", isActive: true, isEditable: false },
            ],
        },
        {
            id: 's2',
            name: 'פרטי התקשרות',
            isOpen: true,
            fields: [
                { key: 'phone', txt: 'טלפון', isActive: true, isEditable: false, type: 'phone' },
                { key: 'email', txt: 'אימייל', isActive: true, isEditable: false, type: 'email' },
                { key: 'leadManager', txt: 'מנהל לקוח', isActive: true },
                { key: 'message', txt: 'הודעה', isActive: true, isEditable: false },
                // { key: 'contactLog', txt: 'לוג שיחה', isActive: true, isEditable: false },
                { key: 'stopper', txt: 'חסם פוטנציאלי', isActive: true, isEditable: false },
                { key: 'lastContactMethod', txt: 'אמצעי קשר אחרון', isActive: true, isEditable: false },
                { key: 'lastContactBy', txt: 'מי תקשר אחרון', isActive: true, isEditable: false },
                { key: 'lastContactAt', txt: 'תאריך תקשורת אחרון', isActive: true, isEditable: false, type: 'date' },
                { key: 'nextContactTime', txt: 'זמן התקשרות הבא', isActive: true, isEditable: false, type: 'date' },
            ],
        },
    ]
    userPrefs.cardSections = cardSections
    userService.saveUserPrefs(userPrefs)
    return cardSections
}

function getCurrFilterViews(view) {
    let filterViews = {
        lead: [
            { filterKey: 'all', key: 'all', txt: 'כל הלידים', isActive: true },
            { filterKey: 'status', key: 'new', txt: 'לידים חדשים', isActive: false },
            {
                key: 'status',
                txt: 'סטטוס',
                isActive: false,
                options: [
                    { filterKey: 'status', key: 'new', txt: 'חדשים', isActive: false },
                    { filterKey: 'status', key: 'beforeIntro', txt: 'לפני ע"פ', isActive: false, details: '' },
                    {
                        filterKey: 'status', key: 'intro',
                        txt: 'ערב פתוח',
                        isActive: false,
                        details: { date: '', isConfirmed: true, whatsapp: true, phone: true },
                    },
                    { filterKey: 'status', key: 'afterIntro', txt: 'אחרי ע"פ', isActive: false, details: { date: '', didCome: true, gotChallenge: true } },
                    { filterKey: 'status', key: 'interviewScheduled', txt: 'נקבע ראיון', isActive: false, details: '' },
                    { filterKey: 'status', key: 'interview', txt: 'בתהליך ראיון', isActive: false },
                    { filterKey: 'status', key: 'done', txt: 'רשומים', isActive: false },
                    { filterKey: 'status', key: 'close', txt: 'סגורים', isActive: false, details: '' },
                ],
            },
            {
                key: 'manager',
                txt: 'מנהל',
                isActive: false,
                options: [
                    { filterKey: 'manager', key: 'me', txt: 'אני', isActive: false },
                ],
                // options: getManagers(),
            },
            {
                key: 'nextContactDate',
                txt: 'זמן התקשרות הבא',
                isActive: false,
                options: [
                    {
                        // filterKey: 'nextContactDate', 
                        key: 'today',
                        txt: 'היום',
                        date: Date.now(),
                        isActive: false,
                        options: [
                            { filterKey: 'nextContactTime', key: 'morning,noon,evening', txt: 'כל היום', isActive: false, },
                            { filterKey: 'nextContactTime', key: 'morning', txt: 'בוקר', isActive: false, isMultiSelect: true, },
                            { filterKey: 'nextContactTime', key: 'noon', txt: 'צהריים', isActive: false, isMultiSelect: true, },
                            { filterKey: 'nextContactTime', key: 'evening', txt: 'ערב', isActive: false, isMultiSelect: true, },
                            // { filterKey: 'nextContactTime', key: 'morning,noon,evening', txt: 'כל היום', isActive: false, date: Date.now(), },
                            // { filterKey: 'nextContactTime', key: 'morning', txt: 'בוקר', isActive: false, date: Date.now(), isMultiSelect: true, },
                            // { filterKey: 'nextContactTime', key: 'noon', txt: 'צהריים', isActive: false, date: Date.now(), isMultiSelect: true, },
                            // { filterKey: 'nextContactTime', key: 'evening', txt: 'ערב', isActive: false, date: Date.now(), isMultiSelect: true, },
                        ],
                    },
                    {
                        filterKey: 'nextContactDate',
                        key: 'nextContactDate',
                        // key: 'morning,noon,evening',
                        txt: 'בחר תאריך',
                        date: '',
                        type: 'date',
                    },
                ],
            },
        ],
    }
    return filterViews[view]
}

function _createLeads() {
    let leads = utilService.loadFromStorage(LEADS_KEY)
    if (!leads || !leads.length) {
        leads = [
            {
                _id: 'fnB5b5KheZ',
                // statusTxt: '',
                status: 'new',
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
                nextContactDate: 1677297600000,
                nextContactTime: 'morning',
            },
            {
                _id: '72D7O5BKYX',
                // statusTxt: '',
                status: 'beforeIntro',
                fullname: 'נעמה בר',
                firstName: 'נעמה',
                lastName: 'בר',
                phone: '054-238-6899',
                email: 'lusya15@walla.com',
                createdAt: 1672481130081,
                channel: 'Facebook',
                source: 'Facebook Ad',
                message: '',
                lastContactAt: 1672581130084,
                nextContactDate: 1677470400000,
                nextContactTime: 'morning',
            },
            {
                _id: '7GRnvkOwl1',
                // statusTxt: '',
                status: 'beforeIntro',
                fullname: 'יוסי שטרן',
                firstName: 'יוסי',
                lastName: 'שטרן',
                phone: '054-572-2684',
                email: 'Yossiv.il@gmail.com',
                createdAt: 1672481130079,
                channel: 'Website',
                source: 'Orgaic',
                message:
                    'הודעה:  אני מנהל את הנכסים הדיגיטליים של אחת החברות המסחריות הגדולות בארץ והייתי רוצה להתמקצע יותר בפיתוח. אני כמובן עובד משרה מלאה , האם יש לכם קורס לימודי ערב/ לאנשים שעובדים במשרה מלאה?',
                    lastContactAt: 1672581130084,
                    nextContactDate: 1677297600000,
                    nextContactTime: 'morning',    
            },
            {
                _id: 'N96q8AxQcN',
                // statusTxt: '',
                status: 'new',
                fullname: 'ראיד חורי',
                firstName: 'ראיד',
                lastName: "ח'ורי",
                phone: '050-599-4990',
                email: 'khouryrd@gmail.com',
                createdAt: 1672481130082,
                channel: 'Website',
                source: 'Google Ad',
                message: 'הודעה: לא השאיר/ה הודעה',
                lastContactAt: 1672581130084,
                nextContactDate: 1677470400000,
                nextContactTime: 'morning',
            },
            {
                _id: 'BNhDfbH6jq',
                // statusTxt: '',
                status: 'new',
                fullname: 'נעם ברק',
                firstName: 'נעם',
                lastName: 'בורק',
                phone: '058-786-1173',
                email: 'n.burak77@gmail.com',
                createdAt: 1672481130098,
                channel: 'Facebook',
                source: 'Facebook Ad',
                message: '',
                lastContactAt: 1672581130084,
                nextContactDate: 1677297600000,
                nextContactTime: 'morning',
            },
            {
                _id: 'QpZBBVf6JM',
                // statusTxt: '',
                status: 'afterIntro',
                fullname: 'כרמל שביט',
                firstName: 'כרמל',
                lastName: 'שביט',
                phone: '054-525-6147',
                email: 'carmel.shavit@gmail.com',
                createdAt: 1672481123575,
                channel: 'Website',
                source: 'Google Ad',
                message: ' לא השאיר/ה הודעה',
                lastContactAt: 1672581130084,
                nextContactDate: 1677470400000,
                nextContactTime: 'morning',
            },
        ]
        utilService.saveToStorage(LEADS_KEY, leads)
        // localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
    }
    return leads
}

function _filterLeads(leads, filterBy) {
    // console.log('leads: ', leads);
    // filterBy = {x:1,y:2}
    if (!filterBy) return leads
    const regex = new RegExp(filterBy.txt, 'i')
    const filters = Object.entries(filterBy)
    filters.forEach(([key, value]) => {
        if (key === 'nextContactDate') {
            leads = leads.filter(lead => new Date(value).toDateString() === new Date(lead[key]).toDateString())
        } else if(key === 'txt') leads = leads.filter(lead => regex.test(JSON.stringify(lead)) || regex.test(lead.phone.replace(/\D/g, '')))
         else leads = leads.filter(lead => value.includes(lead[key]))
        // leads = leads.filter(lead => lead[key] === value)
    })
    // if(filterBy.status) leads = leads.filter(lead => lead.status === filterBy.status)
    return leads
}

var gContacts = {
    ownerId: 'sdfsdfsdfsdfsdfsdf',
    stages: [
        // new: {
        {
            id: 'u101',
            stage: 'אנשי קשר חדשים',
            // status: 'new',
            children: [
                {
                    id: 'c101',
                    img: 'https://robohash.org/puki',
                    fullname: 'Puki',
                    phone: '0552789984',
                },
                {
                    id: 'c102',
                    img: 'https://robohash.org/shuki',
                    fullname: 'Shuki',
                    phone: '055-5276654',
                },
                {
                    id: 'c103',
                    img: 'https://robohash.org/mia',
                    fullname: 'Mia',
                    phone: '055-421-8755',
                },
            ],
        },
        // intro: {
        {
            id: 'u102',
            stage: 'הוזמנו לערב פתוח',
            // status: 'intro',
            children: [
                {
                    id: 'c104',
                    img: 'https://robohash.org/dudi',
                    fullname: 'Dudi',
                    phone: '055-278-4578',
                },
                {
                    id: 'c105',
                    img: 'https://robohash.org/muki',
                    fullname: 'Muki',
                    phone: '055-527-1475',
                },
                {
                    id: 'c106',
                    img: 'https://robohash.org/chicka',
                    fullname: 'Chika',
                    phone: '055-421-4572',
                },
            ],
        },
        // came: {
        {
            id: 'u103',
            stage: 'הגיעו לערב פתוח',
            // status: 'came',
            children: [
                {
                    id: 'c107',
                    img: 'https://robohash.org/baba',
                    fullname: 'Baba',
                    phone: '055-278-7451',
                },
                {
                    id: 'c108',
                    img: 'https://robohash.org/misha',
                    fullname: 'Misha',
                    phone: '055-557-1475',
                },
                {
                    id: 'c109',
                    img: 'https://robohash.org/mazal',
                    fullname: 'Mazal',
                    phone: '055-421-7895',
                },
            ],
        },
        // challenge: {
        {
            id: 'u104',
            stage: 'קיבלו אתגר',
            // status: 'challenge',
            children: [
                {
                    id: 'c110',
                    img: 'https://robohash.org/baba',
                    fullname: 'Baba',
                    phone: '055-278-7451',
                },
                {
                    id: 'c111',
                    img: 'https://robohash.org/misha',
                    fullname: 'Misha',
                    phone: '055-557-1475',
                },
                {
                    id: 'c112',
                    img: 'https://robohash.org/mazal',
                    fullname: 'Mazal',
                    phone: '055-421-7895',
                },
            ],
        },
        // interview: {
        {
            id: 'u105',
            stage: 'זומנו לראיון',
            // status: 'interview',
            children: [
                {
                    id: 'c113',
                    img: 'https://robohash.org/baba',
                    fullname: 'Duda',
                    phone: '055-475-7451',
                },
                {
                    id: 'c114',
                    img: 'https://robohash.org/misha',
                    fullname: 'Pita',
                    phone: '055-557-4486',
                },
                {
                    id: 'c115',
                    img: 'https://robohash.org/mazal',
                    fullname: 'Falafel',
                    phone: '055-421-7732',
                },
            ],
        },
    ],
}
