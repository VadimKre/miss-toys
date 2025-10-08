import { useEffect, useRef} from "react"
import { useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from "../cmps/ToyList.jsx"
import { loadToys, removeToy } from '../store/actions/toys.actions.js'
import { setToyFilter } from '../store/actions/filter.actions.js'


const fallbackFilter = { name: '', inStock: null, labels: [] }

function useDebounced(callback, delay) {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    return function (value) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
        callbackRef.current(value)
        }, delay)
    }
}

export function ToyIndex() {

const toys = useSelector((state) => state.toysModule?.toys ?? [])
const isLoading = useSelector((state) => state.toysModule?.isLoading)
const filterBy = useSelector((state) => state.filterModule?.filterBy ?? fallbackFilter)

useEffect(() => {
        loadToys(filterBy)
    }, [])

    const debouncedSetFilter = useDebounced((updated) => setToyFilter(updated), 300)

    function handleFilterChange(updatedFilter) {
        debouncedSetFilter(updatedFilter)
    }


    function handleRemoveToy(toyId) {
        removeToy(toyId)
    } 


    return (
         <section className="toy-index">
            <ToyFilter
                filterBy={filterBy}
                onChange={handleFilterChange}
            />
            {isLoading ? (
                <p className="loader">Loading toys…</p>
            ) : (
                <ToyList toys={toys} onRemove={handleRemoveToy} />
            )}
        </section>
    )
}
