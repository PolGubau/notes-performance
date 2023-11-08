"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [generalError, setGeneralError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.error) {
        reset();
        router.push("/");
        router.refresh();
        return;
      }
      setGeneralError(res?.error);
      return;
    } catch (error: any) {
      console.log(error);
    }
  });

  const inputStyle = `px-4 py-3   rounded-lg text bg-green-200  focus:outline-none focus:ring-2 focus:ring-green-600 text-green-950 placeholder-green-600 transition-all focus:ring-offset-2 focus:ring-offset-green-50 focus:border-transparent`;
  return (
    <div className="relative w-full ">
      {isSubmitting && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-neutral-300 animate-spin dark:text-gray-600 fill-green-800"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <main
        className={`relative flex gap-6 flex-col items-center md:items-start p-4 md:p-24 max-w-screen-xl w-full ${
          isSubmitting && "opacity-40"
        }`}
      >
        {generalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative text-center md:text-left gap-2 flex flex-col md:flex-row">
            <strong className="font-bold">Error!</strong>
            <span className="">{generalError}</span>
          </div>
        )}
        <form
          className="flex flex-col justify-center gap-6 max-w-md w-full"
          onSubmit={onSubmit}
        >
          <fieldset className="flex flex-col gap-4">
            <legend className="text-3xl mb-4  text-green-900 font-bold">
              Login
            </legend>

            <div className="flex gap-1 flex-col">
              <label className="text-sm  text-green-800" htmlFor="email">
                Email
              </label>
              <input
                className={`${inputStyle}`}
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  minLength: 3,
                  disabled: isSubmitting,
                  maxLength: 50,
                })}
                autoComplete="email"
                placeholder="hello@polgubau.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </span>
              )}
            </div>
            <div className="flex gap-1 flex-col">
              <label className="text-sm  text-green-800" htmlFor="password">
                Password
              </label>
              <input
                className={`${inputStyle}`}
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                  disabled: isSubmitting,
                  minLength: 3,
                  maxLength: 50,
                })}
                autoComplete="current-password"
                placeholder="****"
              />{" "}
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message?.toString()}
                </span>
              )}
            </div>
          </fieldset>

          <button
            disabled={isSubmitting}
            className="disabled:bg-green-400   rounded-lg text-lg px-4 py-3 mt-4 focus:outline-none  transition-all text-white
        bg-green-700 hover:bg-green-500 focus:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-50
        "
            type="submit"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link href="/register" className="text-green-500 hover:text-green-700">
          {`Don't have an account yet? Register`}
        </Link>
      </main>
    </div>
  );
}
