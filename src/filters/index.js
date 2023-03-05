export default function (value, isDateOnly) {
    if (!value) return ''
    let date = new Date(value)
    if(isDateOnly) return date.toLocaleDateString('en-GB')
    return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
// export default function (value) {
//     if (!value) return ''
//     let date = new Date(value)
//     let month = date.getMonth() + 1
//     let day = date.getDate()
//     let year = date.getFullYear()
//     let hours = date.getHours()
//     let minutes = date.getMinutes()
//     return `${month}/${day}/${year} ${hours}:${minutes}`
// }
