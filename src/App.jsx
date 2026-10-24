import FarmerCard from './components/FarmerCard.jsx'

function App() {
  return (
    <main>
      <h1>KazaCare</h1>

      <FarmerCard name="Sani" birds={250} />
      <FarmerCard name="Jemimah" birds={120} />
    </main>
  )
}

export default App