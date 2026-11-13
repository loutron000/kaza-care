import Sidebar from "../components/Sidebar";
import "./FarmRecords.css";

function FarmRecords() {
  return (
    <div>
      <Sidebar />
      <main style={{ marginLeft: "270px", padding: "30px" }}>
        <h1>Detailed Pen Health Logs</h1>
        <p>Your farm records will appear here.</p>
      </main>
    </div>
  );
}

export default FarmRecords;