import { sheetService } from './sheet-service.js'
import { storageService } from './storage-service.js'
import { userService } from './user.service.js'

const LEAD_KEY = 'leads_db'
const CONTACT_KEY = 'contact_db'

export const leadService = {
    getLeads,
    getNewLeads,
    getContacts,
    getTableFields,
    setTableFields
}

function getLeads() {
    return storageService.getLeads(LEAD_KEY)
    // return sheetService.getLeads()
}

function getNewLeads() {
    return storageService.getNewLeads(LEAD_KEY)
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
        headers: { 'api-key': apiKey, 'Content-type': 'application/json'},
    }

    const res = await fetch(findEndpoint, options)
    console.log('res: ', res.json());
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
    const leads = storageService.getLeads(LEAD_KEY)
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
        { key: 'status', txt: 'סטטוס', isActive: true },
        { key: 'name', txt: 'שם', isActive: true },
        { key: 'phone', txt: 'טלפון', isActive: true },
        { key: 'channel', txt: 'צ\'אנל', isActive: true },
        { key: 'createdAt', txt: 'תאריך כניסה', isActive: true },
        { key: 'message', txt: 'הודעה', isActive: true },
        { key: 'contactLog', txt: 'לוג שיחה', isActive: true },
        { key: 'source', txt: 'מקור', isActive: false },
        { key: 'stopper', txt: 'חסם פוטנציאלי', isActive: false },
        { key: 'lastContactBy', txt: 'אמצעי קשר אחרון', isActive: false },
        { key: 'lastContactAt', txt: 'תאריך תקשורת אחרון', isActive: false },
        { key: 'nextContactTime', txt: 'זמן התקשרות הבא', isActive: false },
    ]
}

function setTableFields(fields) {
    let userPrefs = userService.getUserPrefs()
    if (!userPrefs) userPrefs = {}
    userPrefs.tableFields = fields//.map(field => field.isActive?)
    userService.saveUserPrefs(userPrefs)
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
        // intro: {
        {
            id: 'u102',
            stage: 'הוזמנו לערב פתוח',
            // status: 'intro',
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
        // came: {
        {
            id: 'u103',
            stage: 'הגיעו לערב פתוח',
            // status: 'came',
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
        // challenge: {
        {
            id: 'u104',
            stage: 'קיבלו אתגר',
            // status: 'challenge',
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
        // interview: {
        {
            id: 'u105',
            stage: 'זומנו לראיון',
            // status: 'interview',
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
