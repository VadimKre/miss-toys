import ToyPreview from './ToyPreview.jsx'

export function ToyList({ toys = [] }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy.id || toy._id || toy.name} className="toy-list-item">
          <ToyPreview toy={toy} />
        </li>
      ))}
    </ul>
  )
}

