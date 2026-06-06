// pages/AdminDashboard/Messages.jsx

function Messages() {

  const messages =
    JSON.parse(localStorage.getItem("messages")) || [];

  return (
    <div className="container">

      <h2>Contact Messages</h2>

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>

          {messages.map((msg,index)=>(
            <tr key={index}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.eventType}</td>
              <td>{msg.message}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Messages;