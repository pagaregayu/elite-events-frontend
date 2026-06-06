function AdminAnalytics() {
  return (
    <div className="container mt-4">
      <h2>Analytics Dashboard</h2>

      <div className="card p-4">
        <h4>Analytics Coming Soon</h4>

        <p>
          Total Events:
          {JSON.parse(localStorage.getItem("events"))?.length || 0}
        </p>

        <p>
          Total Vendors:
          {JSON.parse(localStorage.getItem("vendors"))?.length || 0}
        </p>

        <p>
          Total Messages:
          {JSON.parse(localStorage.getItem("messages"))?.length || 0}
        </p>
      </div>
    </div>
  );
}

export default AdminAnalytics;