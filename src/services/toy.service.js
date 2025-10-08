import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
const TOY_LABELS = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
    // createToys,
    // getFilterFromSearchParams,
    // getImportanceStats,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY).then((toys) => {
        let isDirty = false
        const normalized = toys.map((toy) => {
            const id = toy._id ?? toy.id ?? utilService.makeId()
            if (toy._id !== id || toy.id !== id) isDirty = true
            return {
                ...toy,
                _id: id,
                id,
                labels: Array.isArray(toy.labels) ? toy.labels : [],
            }
        })

        if (isDirty) utilService.saveToStorage(TOY_KEY, normalized)

        const nameValue = filterBy.name?.trim()
        const inStockFilter =
            filterBy.inStock === true || filterBy.inStock === false
                ? filterBy.inStock
                : null
        const labelsFilter = Array.isArray(filterBy.labels)
            ? filterBy.labels.filter(Boolean)
            : []

        let filtered = normalized

        if (nameValue) {
            const regExp = new RegExp(nameValue, 'i')
            filtered = filtered.filter((toy) => regExp.test(toy.name))
        }

        if (inStockFilter !== null) {
            filtered = filtered.filter((toy) => Boolean(toy.inStock) === inStockFilter)
        }

        if (labelsFilter.length) {
            filtered = filtered.filter((toy) =>
                Array.isArray(toy.labels) && labelsFilter.some((label) => toy.labels.includes(label))
            )
        }

        return filtered
    })
}

function get(toyId) {
    return storageService
        .get(TOY_KEY, toyId)
        .then((toy) => ({ ...toy, id: toy._id ?? toy.id }))
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId).catch((err) => {
        return storageService.query(TOY_KEY).then((toys) => {
            const idx = toys.findIndex((toy) => toy.id === toyId)
            if (idx === -1) throw err
            toys.splice(idx, 1)
            utilService.saveToStorage(TOY_KEY, toys)
        })
    })
}

function save(toy) {
    const toyToSave = { ...toy }
    if (toyToSave.id && !toyToSave._id) toyToSave._id = toyToSave.id

    if (toyToSave._id) {
        toyToSave.updatedAt = Date.now()
        return storageService
            .put(TOY_KEY, toyToSave)
            .then((savedToy) => ({ ...savedToy, id: savedToy._id ?? savedToy.id }))
    } else {
        toyToSave.createdAt = toyToSave.updatedAt = Date.now()

        return storageService
            .post(TOY_KEY, toyToSave)
            .then((savedToy) => ({ ...savedToy, id: savedToy._id ?? savedToy.id }))
    }
}

function getEmptyToy(name = '', labels = []) {
    return {
        id: '',
        _id: '',
        name,
        price: '',
        labels,
        inStock: true,
        description: '',
        createdAt: null,
        updatedAt: null,
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: null,
        labels: [],
    }
}

function getLabels() {
    return [...TOY_LABELS]
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}



function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const names = [
                "Lego City Set",
                "Remote Control Car",
                "Barbie Dreamhouse",
                "Rubik's Cube",
                "Hot Wheels Track",
                "Nerf Blaster",
                "Play-Doh Pack",
                "Teddy Bear",
                "Jenga Tower",
                "Action Figure"
                ]
        for (let i = 0; i < 10; i++) {
            const name = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            const lable = []
            for (let j = 0; j < utilService.getRandomIntInclusive(1, 5); j++) {
                lable.push(TOY_LABELS[utilService.getRandomIntInclusive(0, TOY_LABELS.length - 1)])
            }
            toys.push(_createToy(name, lable))

        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, labels) {
    const toy = getEmptyToy(name, labels)
    const id = utilService.makeId()
    toy.id = id
    toy._id = id
    toy.price = utilService.getRandomIntInclusive(50, 300)
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.updatedAt = toy.createdAt
    toy.inStock = Math.random() > 0.4
    toy.description = utilService.makeLorem(18)
    return toy
}

// function _setNextPrevTodoId(todo) {
//     return storageService.query(TOY_KEY).then((todos) => {
//         const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
//         const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
//         const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
//         todo.nextTodoId = nextTodo._id
//         todo.prevTodoId = prevTodo._id
//         return todo
//     })
// }

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

// const toy = {
//   _id: 't101',
//   name: 'Talking Doll',
//   price: 123,
//   labels: ['Doll', 'Battery Powered', 'Baby'],
//   createdAt: 1631031801011,
//   inStock: true,
// }
