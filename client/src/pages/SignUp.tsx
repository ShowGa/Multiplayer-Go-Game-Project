import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form:", formData);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-3/5 bg-gray-200">
        <img
          src=""
          alt="Login background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-2/5 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">註冊</h1>

        <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-4">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="email">
              帳號
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormData}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              placeholder="輸入帳號"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" htmlFor="password">
              密碼
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormData}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
              placeholder="輸入密碼"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full border border-blue-500 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            註冊
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
