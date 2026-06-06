import "./ForgotPassword.css";

function ForgotPassword() {

 return(

 <div className="auth-container">

 <div className="auth-card">

 <h2>Forgot Password</h2>

 <input
 className="form-control mb-3"
 placeholder="Enter Email"
 />

 <button
 className="btn btn-warning w-100"
 >
 Reset Password
 </button>

 </div>

 </div>

 );
}

export default ForgotPassword;