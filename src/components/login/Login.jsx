import React, {useState} from "react"
import supabase from "../../helper/supabaseClient"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {data, error} = await supabase.auth.signInWithPassword({
      email:email,
      password:password,
    });

    if(data){
      navigate("/dashboard");
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-(--grey)">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center login-text-1 text-(--white)">
            Blackhole Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-(--white)"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-(--grey) px-3 py-2 text-(--white) outline outline-1 outline-(--white) placeholder:text-(--less-white) focus:outline-2 focus:outline-(--white)"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-(--less-white)"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-(--grey) px-3 py-2 text-(--white) outline outline-1 outline-(--white)] placeholder:text-(--less-white) focus:outline-2 focus:outline-(--white)"
                />
              </div>
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-(--white) px-3 py-2 text-sm font-semibold text-(--grey) hover:bg-(--less-white) transition"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
