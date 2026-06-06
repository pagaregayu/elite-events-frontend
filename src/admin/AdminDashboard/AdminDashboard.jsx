function AdminDashboard() {

  const totalEvents =
    JSON.parse(
      localStorage.getItem("events")
    )?.length || 0;

  const totalVendors =
    JSON.parse(
      localStorage.getItem("vendors")
    )?.length || 0;

  const totalMessages =
    JSON.parse(
      localStorage.getItem("messages")
    )?.length || 0;

  const totalReviews =
    JSON.parse(
      localStorage.getItem("reviews")
    )?.length || 0;

  return (

    <>

      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{totalEvents}</h2>
          <p>Events</p>
        </div>

        <div className="dashboard-card">
          <h2>{totalVendors}</h2>
          <p>Vendors</p>
        </div>

        <div className="dashboard-card">
          <h2>{totalMessages}</h2>
          <p>Messages</p>
        </div>

        <div className="dashboard-card">
          <h2>{totalReviews}</h2>
          <p>Reviews</p>
        </div>

      </div>

    </>

  );
}

export default AdminDashboard;