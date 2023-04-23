import { supabase } from "@utils";
import { useState } from "react";

interface Form {
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    console.log({ res });
  };

  return (
    <div>
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={(e) => void setForm((prev) => ({ ...prev, email: e.target.value }))}
      />

      <br />

      <input
        type="text"
        name="password"
        value={form.password}
        onChange={(e) => void setForm((prev) => ({ ...prev, password: e.target.value }))}
      />

      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RegisterPage;
