export const clickOutsideDirective = {
    mounted(el, { value: cb, arg }) {
        el.clickOutside = (ev) => {
            if (!el.contains(ev.target)) {
                cb(arg)
            }
        }
        setTimeout(() => {
            document.addEventListener('click', el.clickOutside)
        }, 0)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutside)
    },
}
// export const clickOutsideDirective = {
//     mounted(el, { value: cb, arg }) {
//         el.clickOutside = ({ clientX, clientY }) => {
//             const { left, top, width, height } = el.getBoundingClientRect()
//             if (!(clientX > left && clientX < left + width && clientY > top && clientY < top + height)) {
//                 cb(arg)
//                 //
//             } else {
//                 //
//             }
//         }
//         setTimeout(() => {
//             document.addEventListener('click', el.clickOutside)
//         }, 0)
//     },
//     unmounted(el) {
//         document.removeEventListener('click', el.clickOutside)
//     },
// }