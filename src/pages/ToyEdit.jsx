import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toys.actions.js'

export function ToyEdit() {
  const { toyID } = useParams()
  const navigate = useNavigate()
  const [toy, setToy] = useState(() => toyService.getEmptyToy())
  const [labelsText, setLabelsText] = useState('')
  const isEdit = Boolean(toyID)

  useEffect(() => {
    if (!toyID) {
      setToy(toyService.getEmptyToy())
      setLabelsText('')
      return
    }

    async function loadToy() {
      try {
        const toyToEdit = await toyService.get(toyID)
        const template = toyService.getEmptyToy()
        setToy({ ...template, ...toyToEdit })
        setLabelsText(Array.isArray(toyToEdit.labels) ? toyToEdit.labels.join(', ') : '')
      } catch (err) {
        console.error('Failed to load toy for edit:', err)
        navigate('/toys')
      }
    }

    loadToy()
  }, [toyID, navigate])

  function handleChange({ target }) {
    const { name, value, type, checked } = target

    if (name === 'labels') {
      setLabelsText(value)
      const labelsArr = value
        .split(',')
        .map((label) => label.trim())
        .filter((label) => label.length)
      setToy((prev) => ({ ...prev, labels: labelsArr }))
      return
    }

    let newValue = value
    if (type === 'number') newValue = value === '' ? '' : Number(value)
    if (type === 'checkbox') newValue = checked

    setToy((prev) => ({ ...prev, [name]: newValue }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    try {
      const labelsArr = labelsText
        .split(',')
        .map((label) => label.trim())
        .filter((label) => label.length)

      const toyToSave = {
        ...toy,
        labels: labelsArr,
      }
      await saveToy(toyToSave)
      navigate('/toys')
    } catch (err) {
      console.error('Failed saving toy:', err)
    }
  }

  return (
    <section className="toy-edit">
      <h1>{isEdit ? 'Edit Toy' : 'Add Toy'}</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            name="name"
            placeholder="Toy name"
            value={toy.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            min="0"
            placeholder="0"
            value={toy.price ?? ''}
            onChange={handleChange}
          />
        </label>

        <label>
          Labels (comma separated)
          <input
            name="labels"
            placeholder="e.g. Puzzle, Outdoor"
            value={labelsText}
            onChange={handleChange}
          />
        </label>

        <label className="toggle-field">
          <span>In stock</span>
          <input
            type="checkbox"
            name="inStock"
            checked={Boolean(toy.inStock)}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Short description"
            value={toy.description ?? ''}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEdit ? 'Save Changes' : 'Create Toy'}
          </button>
          <button
            type="button"
            className="btn-link"
            onClick={() => navigate('/toys')}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
