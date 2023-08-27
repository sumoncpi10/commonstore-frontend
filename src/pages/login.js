import { Button } from "antd";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const result = await signIn("credentials", { phone, password, callbackUrl: "/" });

    if (result?.error) {
      // Handle login error
      console.error("Login error:", result.error);
    }
  };

  return (
    <div>
      <Head>
        <title>Users Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <hr />
        <form onSubmit={handleLogin}>
          <label htmlFor="phone">Your Phone</label>
          <input type="text" id="mobileNo" name="mobileNo" />
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" name="password" />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
