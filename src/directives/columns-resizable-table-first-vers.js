export const columnsResizableDirective = {
    mounted(el, { value: cb }) {
        const nodeName = el.nodeName
        if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) return

        const table = nodeName === 'TABLE' ? el : el.parentElement
        const dir = document.defaultView.getComputedStyle(table, null)['direction']
        const isRtl = dir === 'rtl'

        const thead = table.querySelector('thead')
        const ths = thead.querySelectorAll('th')
        const barHeight = nodeName === 'TABLE' ? table.offsetHeight : thead.offsetHeight

        const resizeContainer = document.createElement('div')
        table.style.position = 'relative'
        resizeContainer.style.position = 'absolute'
        resizeContainer.style.width = table.offsetWidth + 'px'
        resizeContainer.style.height = thead.offsetHeight + 'px'
        resizeContainer.className = 'vue-columns-resizable'
        // table.parentElement.insertBefore(resizeContainer, table)
        // thead.parentElement.insertBefore(resizeContainer, thead)
        thead.prepend(resizeContainer)

        let moving = false
        let movingIndex = 0

        ths.forEach((th, index) => {
            th.style.width = th.offsetWidth + 'px'

            if (index + 1 >= ths.length) return

            const nextTh = ths[index + 1]
            const bar = document.createElement('div')

            bar.style.position = 'absolute'
            // bar.style.left = nextTh.offsetLeft - 4 + 'px'
            bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
            bar.style.top = 0
            bar.style.height = barHeight + 'px'
            bar.style.width = '4px'
            bar.style.cursor = 'col-resize'
            // bar.style.background = 'black'
            bar.style.zIndex = 1
            bar.className = 'columns-resize-bar'
            
            bar.addEventListener('mouseover', () => {
                ths[index].style.backgroundColor = '#f9f9f9'
             })
            bar.addEventListener('mouseleave', () => {
                ths[index].style.backgroundColor = ''
             })

            bar.addEventListener('mousedown', () => {
                bar.style.background = '#9f9f9f'
                moving = true
                movingIndex = index
                document.body.style.cursor = 'col-resize'
                document.querySelector('.head-cell').classList.remove('cursor-pointer')
                document.body.style.userSelect = 'none'
            })

            resizeContainer.appendChild(bar)
        })

        const bars = resizeContainer.querySelectorAll('.columns-resize-bar')

        document.addEventListener('mouseup', () => {
            if (!moving) return
            document.querySelector('.head-cell').classList.add('cursor-pointer')
            moving = false
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
            
            bars.forEach((bar, index) => {
                bar.style.background = 'transparent'
                const th = ths[index]
                const nextTh = ths[index + 1]
                th.style.width = th.offsetWidth + 'px'
                // bar.style.left = nextTh.offsetLeft - 4 + 'px'
                bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
            })
        })

        const cutPx = str => +str.replace('px', '')

        const handleResize = e => {
            if (moving) {
                const th = ths[movingIndex]
                const nextTh = ths[movingIndex + 1]
                const bar = bars[movingIndex]
                const diff = isRtl ? -1 : 1
                th.style.width = cutPx(th.style.width) + e.movementX * diff + 'px'
                nextTh.style.width = cutPx(nextTh.style.width) - e.movementX * diff + 'px'
                // bar.style.left = nextTh.offsetLeft - 4 + e.movementX + 'px'
                bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + e.movementX + 'px'
            }
        }

        resizeContainer.addEventListener('mousemove', handleResize)
        table.addEventListener('mousemove', handleResize)
    },
}






// previos version - before split to functions and remove events listeners

export const columnsResizableDirectiveNew = {
    mounted(el, { value: cb }) {
        prepareResizableTable(el, cb)
        // setTimeout(() => {
        //     removeEventListeners(el)
        // },3000)
    },
    updated(el, { value: cb }) {
        console.log('el: ', el);
        prepareResizableTable(el, cb)
    },
    unmounted(el) {
        // removeEventListeners(el)
    },
}

function prepareResizableTable(el, cb) {
    const nodeName = el.nodeName
    if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) return

    const table = nodeName === 'TABLE' ? el : el.parentElement
    const direction = document.defaultView.getComputedStyle(table, null)['direction']
    const isRtl = direction === 'rtl'

    const thead = table.querySelector('thead')
    const ths = thead.querySelectorAll('th')
    const barHeight = nodeName === 'TABLE' ? table.offsetHeight : thead.offsetHeight
    // table.addEventListener('')
    var isFullWindow

    const resizeContainer = document.createElement('div')
    let isMoving = false
    let movingIndex = 0
    table.style.position = 'relative'
    resizeContainer.style.position = 'absolute'
    resizeContainer.style.width = table.offsetWidth + 'px'
    resizeContainer.style.height = thead.offsetHeight + 'px'
    resizeContainer.className = 'vue-columns-resizable'
    thead.prepend(resizeContainer)

    ths.forEach((th, index) => {
        th.style.width = th.offsetWidth + 'px'

        if (index + 1 >= ths.length) return
        // const nextTh = (index + 1 >= ths.length)? null :ths[index + 1]

        const nextTh = ths[index + 1]
        const bar = document.createElement('div')

        bar.style.position = 'absolute'
        // bar.style.left = nextTh.offsetLeft - 4 + 'px'
        bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
        // if (nextTh) bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
        // else bar.style.left = isRtl ? 0 : table.offsetLeft
        bar.style.top = 0
        bar.style.height = barHeight + 'px'
        bar.style.width = '4px'
        bar.style.cursor = 'col-resize'
        // bar.style.background = 'black'
        bar.style.zIndex = 1
        bar.className = 'columns-resize-bar'

        th.addEventListener('mouseover', () => {
            bar.style.backgroundColor = '#cacaca'
        })
        th.addEventListener('mouseleave', () => {
            bar.style.backgroundColor = ''
        })
        bar.addEventListener('mouseover', () => {
            ths[index].style.backgroundColor = '#f9f9f9'
        })
        bar.addEventListener('mouseleave', () => {
            ths[index].style.backgroundColor = ''
        })

        bar.addEventListener('mousedown', () => {
            bar.style.background = '#9f9f9f'
            isMoving = true
            movingIndex = index
            document.body.style.cursor = 'col-resize'
            // document.querySelector('th').classList.remove('cursor-pointer')
            document.querySelector('.head-cell').classList.remove('cursor-pointer')
            // th.classList.remove('cursor-pointer')
            document.body.style.userSelect = 'none'
        })

        resizeContainer.appendChild(bar)
    })

    const bars = resizeContainer.querySelectorAll('.columns-resize-bar')
    document.addEventListener('mouseup', () => {
        if (!isMoving) return
        document.querySelector('.head-cell').classList.add('cursor-pointer')
        isMoving = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''

        bars.forEach((bar, index) => {
            bar.style.background = 'transparent'
            const th = ths[index]
            const nextTh = ths[index + 1]
            th.style.width = th.offsetWidth + 'px'
            // bar.style.left = nextTh.offsetLeft - 4 + 'px'
            bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
        })

        if (!isFullWindow) cb(movingIndex, ths[movingIndex].offsetWidth)
        tableResized()
    })

    const cutPx = str => +str.replace('px', '')

    const handleResize = ev => {
        if (!isMoving) return
        const th = ths[movingIndex]
        const nextTh = ths[movingIndex + 1]
        const bar = bars[movingIndex]
        const diff = isRtl ? -1 : 1
        // const isFullWindow = window.innerWidth - document.querySelector('.table-container').offsetWidth < 100
        th.style.width = cutPx(th.style.width) + ev.movementX * diff + 'px'
        // nextTh.style.width = cutPx(nextTh.style.width) - ev.movementX * diff + 'px'
        if (isFullWindow) nextTh.style.width = cutPx(nextTh.style.width) - ev.movementX * diff + 'px'
        else {
            resizeContainer.style.width = resizeContainer.offsetWidth + ev.movementX * diff + 'px'
            table.style.width = table.offsetWidth + ev.movementX * diff + 'px'
        }
        bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + ev.movementX + 'px'
    }

    resizeContainer.addEventListener('mousemove', handleResize)
    table.addEventListener('mousemove', handleResize)
    const tableResized = () => {
        if (isMoving) return
        resizeContainer.style.width = table.offsetWidth + 'px'
        bars.forEach((bar, idx) => {
            const nextTh = ths[idx + 1]
            bar.style.left = (isRtl ? nextTh.offsetLeft + nextTh.offsetWidth : nextTh.offsetLeft - 4) + 'px'
        })
        isFullWindow = window.innerWidth - document.querySelector('.table-container')?.offsetWidth < 100
    }
    new ResizeObserver(tableResized).observe(thead)
}

function removeEventListeners(el) {
    const table = el.nodeName === 'TABLE' ? el : el.parentElement
    const ths = table.querySelectorAll('th')
    const bars = table.querySelectorAll('.columns-resize-bar')
    const resizeContainer = document.querySelector('.vue-columns-resizable')

    ths.forEach(th => {
        th.removeEventListener('mouseover', function () {})
        th.removeEventListener('mouseleave', function () {})
    })

    bars.forEach(bar => {
        bar.removeEventListener('mouseover', () => {})
        bar.removeEventListener('mouseleave', () => {})
        bar.removeEventListener('mousedown', () => {})
    })

    // document.removeEventListener('mouseup', () => {})
    // resizeContainer.removeEventListener('mousemove', () => {})
    // table.removeEventListener('mousemove', () => {})
}
