import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-[#432F2E] flex flex-col px-6 py-8 max-w-md mx-auto">

      {/* Logo */}
      <div className="text-center pt-6">

        <h1 className="text-4xl font-serif">
          Way<span className="italic text-[#8DBBD4]">ve</span>
        </h1>

        <p className="text-sm text-[#432F2E]/60 mt-2">
          Good to see you again
        </p>

      </div>

      {/* Form */}
      <div className="mt-12 space-y-5">

        <div>
          <label className="text-sm font-medium block mb-2">
            Email address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white border border-[#E6D56D] rounded-2xl px-4 py-4 outline-none focus:border-[#432F2E]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">

            <label className="text-sm font-medium">
              Password
            </label>

            <button className="text-xs text-[#8DBBD4]">
              Forgot password?
            </button>

          </div>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-[#E6D56D] rounded-2xl px-4 py-4 outline-none focus:border-[#432F2E]"
          />
        </div>

        <button
          onClick={() => navigate("/discover")}
          className="w-full bg-[#432F2E] text-white py-4 rounded-2xl font-semibold"
        >
          Log in
        </button>

      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-8">

        <div className="h-px bg-[#432F2E]/15 flex-1" />

        <span className="text-xs text-[#432F2E]/50">
          Or continue with
        </span>

        <div className="h-px bg-[#432F2E]/15 flex-1" />

      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">

        <button className="bg-white border border-[#E6D56D] rounded-2xl py-3.5 font-medium">
          G Google
        </button>

        <button className="bg-white border border-[#E6D56D] rounded-2xl py-3.5 font-medium">
           Apple
        </button>

      </div>

      {/* Sign up */}
      <div className="mt-auto pt-10 text-center">

        <p className="text-sm text-[#432F2E]/60">
          Don't have an account?
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-2 text-[#8DBBD4] font-semibold"
        >
          Create an account
        </button>

      </div>

    </div>
  );
}

export default Login;