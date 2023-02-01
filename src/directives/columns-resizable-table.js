export const columnsResizableDirective = {
    mounted(el, { value: cb }) {
        const nodeName = el.nodeName
        if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) return
        const table = nodeName === 'TABLE' ? el : el.parentElement
        prepareResizableTable(table, cb, nodeName)
    },
    updated(el, { value: cb }) {
        const nodeName = el.nodeName
        if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) return
        const table = nodeName === 'TABLE' ? el : el.parentElement
        prepareResizableTable(table, cb, nodeName)
    },
    // updated(el, { value: cb, arg: container }) {
    //     console.log('container: ', container);
    //     console.log('container.firstChild: ', container.firstChild);
    //     console.log('el: ', el);
    //     if (['TABLE', 'THEAD'].indexOf(el.nodeName) < 0) return
    //     // const oldTable = el.nodeName === 'TABLE' ? el : el.parentElement
    //     const oldTable = container.firstChild
    //     // console.dir(oldTable);
    //     // const container = oldTable.parentNode
    //     // console.log('container: ', container);
    //     if(!oldTable) return
    //     // console.log('oldTable.parentNode: ', oldTable.parentNode);
    //     const newTable = oldTable.cloneNode(true)
    //     // console.log('newTable: ', newTable);
    //     // container.removeChild(oldTable)
    //     // container.appendChild(newTable)
    //     container.replaceChild(newTable, oldTable)
    //     console.log('oldTable.parentNode: ', oldTable.parentNode);
    //     // oldTable.parentNode.replaceChild(newTable, oldTable)
    //     // prepareResizableTable(newTable, cb)
    // },
    unmounted(el) {
        const oldTable = el.nodeName === 'TABLE' ? el : el.parentElement
        const newTable = oldTable.cloneNode(true)
        oldTable.parentNode.replaceChild(newTable, oldTable)
    },
}

function prepareResizableTable(table, cb, nodeName = 'TABLE') {
    const direction = document.defaultView.getComputedStyle(table, null)['direction']
    const isRtl = direction === 'rtl'

    const thead = table.querySelector('thead')
    const ths = thead.querySelectorAll('th')
    const barHeight = nodeName === 'TABLE' ? table.offsetHeight : thead.offsetHeight
    // table.addEventListener('')
    var isFullWindow

    const firstResizeContainer = document.querySelector('.vue-columns-resizable')
    // const isUpdate = firstResizeContainer? true : false
    if (firstResizeContainer) firstResizeContainer.remove()
    // const resizeContainer = firstResizeContainer || document.createElement('div')
    const resizeContainer = document.createElement('div')
    let isMoving = false
    let movingIndex = 0
    table.style.position = 'relative'
    resizeContainer.style.position = 'absolute'
    resizeContainer.style.width = table.offsetWidth + 'px'
    resizeContainer.style.height = thead.offsetHeight + 'px'
    resizeContainer.className = 'vue-columns-resizable'
    thead.prepend(resizeContainer)

    // var bars
    // if (firstResizeContainer) bars = resizeContainer.querySelectorAll('.columns-resize-bar')
    ths.forEach((th, index) => {
        th.style.width = th.offsetWidth + 'px'

        if (index + 1 >= ths.length) return
        // const nextTh = (index + 1 >= ths.length)? null :ths[index + 1]

        const nextTh = ths[index + 1]
        // const bar = firstResizeContainer ? bars[index] : document.createElement('div')
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

        // if (!firstResizeContainer) {
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
        // }
    })
    // if (firstResizeContainer) return
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
