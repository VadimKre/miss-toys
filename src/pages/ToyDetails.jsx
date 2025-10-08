import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { removeToy } from '../store/actions/toys.actions.js'

export function ToyDetails() {
    const { toyID } = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        async function loadToy() {
            try {
                const toyToDisplay = await toyService.get(toyID)
                setToy(toyToDisplay)
            } catch (e) {
                console.log('error in ToyDetails: ', e)
                throw e
            }
        }

        loadToy()
    }, [toyID])

    if (!toy) return <p>Loading toy…</p>

    const createdAt = toy.createdAt
        ? new Date(toy.createdAt).toLocaleString()
        : 'Unknown'
    const labels = toy.labels?.length ? toy.labels.join(', ') : 'No labels yet'

    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <p>Price: ${toy.price}</p>
            <p>Created: {createdAt}</p>
            <p>Labels: {labels}</p>

            <div className="toy-details-actions">
                <Link className="btn-link" to="/toys">
                    Back
                </Link>
                <Link className="btn-link" to={`/toys/edit/${toy.id}`}>
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn-danger"
                    onClick={() => {
                        removeToy(toy.id)
                        navigate('/toys')
                    }}
                >
                    Remove
                </button>
            </div>
        </section>
    )
}
