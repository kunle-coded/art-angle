import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/apiUser";
import { useDispatch } from "react-redux";
import {
  enableError,
  enableSuccess,
  updateSuccessMgs,
} from "../../slices/globalSlice";

export function useSignup() {
  const dispatch = useDispatch();

  const { mutate: signup } = useMutation({
    mutationFn: (userData) => registerUser(userData),
    onSuccess: (data) => {
      dispatch(updateSuccessMgs(data.message));
      dispatch(enableSuccess());
    },
    onError: (error) => {
      dispatch(updateSuccessMgs(error.message));
      dispatch(enableError());
    },
  });

  return { signup };
}
