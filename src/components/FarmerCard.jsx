function FarmerCard({ name, birds }) {
  return (
    <section>
      <h2>{name}'s farm</h2>
      <p>Birds: {birds}</p>
    </section>
  )
}

export default FarmerCard