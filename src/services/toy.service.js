import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    // createToys,
    // getFilterFromSearchParams,
    // getImportanceStats,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }

            if (filterBy.importance) {
                todos = todos.filter(todo => todo.importance >= filterBy.importance)
            }

            return todos
        })
}

function get(todoId) {
    return storageService.get(TOY_KEY, todoId)
        .then(todo => {
            todo = _setNextPrevTodoId(todo)
            return todo
        })
}

function remove(todoId) {
    return storageService.remove(TOY_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        // TODO - updatable fields
        todo.updatedAt = Date.now()
        return storageService.put(TOY_KEY, todo)
    } else {
        todo.createdAt = todo.updatedAt = Date.now()

        return storageService.post(TOY_KEY, todo)
    }
}

function getEmptyToy(name = '', labels = []) {
    return { name, labels }
}

function getDefaultFilter() {
    return { txt: '', importance: 0 }
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
    if (!toys || !todos.length) {
        toys = []
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
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
                lable.push(labels[utilService.getRandomIntInclusive(0, labels.length - 1)])
            }
            toys.push(_createToy(name, lable))

        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(name, labels) {
    const toy = getEmptyToy(name, labels)
    toy._id = utilService.makeId()
    toy.price = utilService.getRandomIntInclusive(50, 300)
    toy.createdAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevTodoId(todo) {
    return storageService.query(TOY_KEY).then((todos) => {
        const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
        const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
        const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
        todo.nextTodoId = nextTodo._id
        todo.prevTodoId = prevTodo._id
        return todo
    })
}

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

// const toy = {
//   _id: 't101',
//   name: 'Talking Doll',
//   price: 123,
//   labels: ['Doll', 'Battery Powered', 'Baby'],
//   createdAt: 1631031801011,
//   inStock: true,
// }



