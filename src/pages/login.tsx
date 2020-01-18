import Router from 'next/router'
import firebaseApi from '../api/firebase-api';
import useLoginForm from '../hooks/useLoginForm';

const Login = () => {

    const signup = () => logIn(inputs.email, inputs.password);

    const {inputs, handleInputChange, handleSubmit} = useLoginForm(signup);
    const {logIn, invalidLogin} = firebaseApi();
    const showError = () => !!invalidLogin ? <p className="text-red-500 text-xs italic">Email password combination did not match</p> : null;

    return (
        <div className="container bg-gray pt-6 xs:w-80 md:w-1/3">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                        id="email" 
                        type="email"
                        onChange={handleInputChange} 
                        value={inputs.email}>
                    </input>
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input 
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" 
                    id="password" 
                    type="password"
                    onChange={handleInputChange} 
                    value={inputs.password}></input>
                    {showError()}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
        </div>
    )

}

export default Login;

{/* <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************">
      <p class="text-red text-xs italic">Please choose a password.</p> */}