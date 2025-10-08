import { Link } from "react-router-dom"

export function ToyPreview({ toy = {}, onRemove }) {

    const formattedDate = toy.createdAt ? new Date(toy.createdAt).toLocaleDateString() : '-'

    return (
        <article className="toy-card">
            <header className="toy-card-header">
                <h3 className="toy-card-title">{toy.name}</h3>
                {toy.price != null && (
                    <span className="toy-card-price">${toy.price}</span>
                )}
            </header>

            <dl className="toy-card-meta">
                <div>
                    <dt>Created</dt>
                    <dd>{formattedDate}</dd>
                </div>
                {toy.labels?.length ? (
                    <div>
                        <dt>Labels</dt>
                        <dd>{toy.labels.join(', ')}</dd>
                    </div>
                ) : null}
            </dl>

            <footer className="toy-card-actions">
                <Link to={`/toys/${toy.id}`} className="btn-link">
                    View
                </Link>
                <Link to={`/toys/edit/${toy.id}`} className="btn-link">
                    Edit
                </Link>
                <button
                    type="button"
                    className="btn-danger"
                    onClick={() => onRemove?.(toy.id)}
                >
                    Remove
                </button>
            </footer>
        </article>
    )
}

