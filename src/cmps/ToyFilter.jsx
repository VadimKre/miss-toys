export function ToyFilter() {
  return (
    <section className="toy-filter">
      <label>
        Search
        <input type="search" placeholder="Search toys..." />
      </label>
      <label>
        In Stock
        <input type="checkbox" />
      </label>
    </section>
  )
}

