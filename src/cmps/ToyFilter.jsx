import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'

const EMPTY_FILTER = {
    name: '',
    inStock: null,
    labels: [],
}

export function ToyFilter({ filterBy = EMPTY_FILTER, onChange }) {
    const [formState, setFormState] = useState({ ...EMPTY_FILTER, ...filterBy, labels: filterBy.labels ?? [] })
    const labels = toyService.getLabels()

    useEffect(() => {
        setFormState({ ...EMPTY_FILTER, ...filterBy, labels: filterBy.labels ?? [] })
    }, [filterBy])

    function handleInput(ev) {
        const { name, value, type, checked, multiple, selectedOptions } = ev.target
        let nextValue

        if (name === 'labels' && multiple) {
            nextValue = Array.from(selectedOptions, (option) => option.value)
        } else if (name === 'inStock') {
            nextValue = checked ? true : null
        } else {
            nextValue = type === 'number' && value !== '' ? Number(value) : value
        }

        const updated = { ...formState, [name]: nextValue }
        setFormState(updated)
        onChange?.(updated)
    }

    return (
        <form className="toy-filter" onSubmit={(ev) => ev.preventDefault()}>
            <label>
                Name
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    value={formState.name}
                    onChange={handleInput}
                />
            </label>

            <label className="check-field">
                <input
                    type="checkbox"
                    name="inStock"
                    checked={formState.inStock === true}
                    onChange={handleInput}
                />
                <span>In stock only</span>
            </label>

            <label>
                Labels
                <select
                    name="labels"
                    multiple
                    value={formState.labels}
                    onChange={handleInput}
                    size={Math.min(labels.length, 6)}
                >
                    {labels.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>
        </form>
    )
}
