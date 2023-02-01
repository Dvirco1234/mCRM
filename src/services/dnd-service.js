export const dndService = {
    applyDrag,
    generateItems,
    getScene,
}

function applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

function generateItems(count, creator) {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
}

const lorem = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, labore quos consequatur facilis unde quod repellendus quis, vero eius ipsa sed iusto molestias enim sint sunt, iste aspernatur saepe quae.'

const columnNames = ['Backlog', 'Doing', 'Finished']

const cardColors = [
    '#34495E',
    '#84B0DC',
    '#49627A',
    '#41B883',
    '#7096BB',
    '#97CAFC',
    '#6CC1C0',
    '#41B883',
    '#41B883',
    '#49627A',
];

const pickColor = () => {
    const rand = Math.floor(Math.random() * 10);
    return cardColors[rand];
};

function getScene() {
    // return {

    //     type: 'container',
    //     props: {
    //         orientation: 'horizontal',
    //     },
    //     children: generateItems(3, (i) => ({
    //         id: `column${i}`,
    //         type: 'container',
    //         name: columnNames[i],
    //         props: {
    //             orientation: 'vertical',
    //             className: 'card-container',
    //         },
    //         children: generateItems(+(Math.random() * 10).toFixed() + 5, (j) => ({
    //             type: 'draggable',
    //             id: `${i}${j}`,
    //             props: {
    //                 className: 'card',
    //                 style: { backgroundColor: pickColor() },
    //             },
    //             number: Math.floor(Math.random() * 100),
    //             data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
    //         })),
    //     })),
    // }
    return 
};