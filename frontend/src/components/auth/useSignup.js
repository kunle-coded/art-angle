import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/apiUser";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: (userData) => registerUser(userData),
    onSuccess: (data) => {
      console.log("successful", data);
    },
    onError: (error) => {
      //   console.log(error.message);
    },
  });

  return { signup, isSigningUp };
}
