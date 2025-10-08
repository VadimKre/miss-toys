import {ToyPreview} from './ToyPreview.jsx'

export function ToyList({ toys = [], onRemove }) {

  return (
        <section className="toy-list">
            {toys.map((toy) => (  
                <ToyPreview toy={toy} onRemove={onRemove} key={toy.id}/>
            ))}
        </section>
  )
}

