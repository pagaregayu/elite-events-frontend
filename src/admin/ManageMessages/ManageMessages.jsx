import { useEffect, useState } from "react";

function ManageMessages() {

  const [messages,setMessages] = useState([]);

  useEffect(()=>{

    const data =
      JSON.parse(
        localStorage.getItem("messages")
      ) || [];

    setMessages(data);

  },[]);

  const deleteMessage=(index)=>{

    const updated =
      messages.filter(
        (_,i)=>i !== index
      );

    setMessages(updated);

    localStorage.setItem(
      "messages",
      JSON.stringify(updated)
    );
  };

  return(

    <div className="container mt-4">

      <h2>Customer Messages</h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {messages.map((msg,index)=>(

            <tr key={index}>

              <td>{msg.name}</td>

              <td>{msg.email}</td>

              <td>{msg.phone}</td>

              <td>{msg.message}</td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={()=>
                    deleteMessage(index)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ManageMessages;