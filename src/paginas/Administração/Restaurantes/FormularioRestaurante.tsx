import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: nomeRestaurante
      })
      .then(() => alert("Restaurante cadastrado com sucesso!"));
  };
  return (
    <form onSubmit={aoSubmeter}>
      <TextField
        value={nomeRestaurante}
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
