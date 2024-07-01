import React, { useEffect, useState } from "react";
import Iprato from "../../../interfaces/IPrato";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {
  const [pratos, setpratos] = useState<Iprato[]>([]);

  useEffect(() => {
    http.get<Iprato[]>("pratos/").then((resposta) => setpratos(resposta.data));
  }, []);

  const excluir = (pratoParaExcluir: Iprato) => {
    http.delete(`pratos/${pratoParaExcluir.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoParaExcluir.id
      );
      setpratos([...listaPratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Restaurante</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver imagem
                </a>
              </TableCell>
              <TableCell>{prato.restaurante}</TableCell>
              <TableCell>
                [<Link to={`${prato.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
