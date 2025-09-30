export function ToyPreview({ toy = {} }) {
  const { name = 'Toy', price, inStock } = toy
  return (
    <article className="toy-preview">
      <h3 className="toy-name">{name}</h3>
      <div className="toy-meta">
        {price != null && <span className="toy-price">${price}</span>}
        {inStock != null && (
          <span className={`toy-stock ${inStock ? 'in' : 'out'}`}>
            {inStock ? 'In stock' : 'Out of stock'}
          </span>
        )}
      </div>
    </article>
  )
}

