import { createContext, useContext } from "react";
import { UserContext } from "./UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { newTechSchema } from "../validations/NewTechSchema";

export const TechContext = createContext({});

export function TechProvider({ children }) {

  const { closeModal } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(newTechSchema)
  });

  async function addNewTech(data) {

    try {

      await api.post("users/techs", data);
      toast.success("Tecnologia registrada com sucesso");
      
      reset()
      closeModal();
    } catch (error) {

      console.error(error);
      toast.error("O usuário ja registrou essa tecnologia anteriormente");
    }
  }

  return (
    <TechContext.Provider
      value={{ handleSubmit, addNewTech, register, errors, reset }}
    >
      {children}
    </TechContext.Provider>
  );
}