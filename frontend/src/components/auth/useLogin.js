import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiUser";

export function useLogin() {
  const { mutate: login } = useMutation({
    mutationFn: (loginData) => loginUser(loginData),

    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { login };
}
