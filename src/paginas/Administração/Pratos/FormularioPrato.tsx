import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

  const [restaurante, setRestaurante] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [imagem, setImagem] = useState<File | null | string>(null);

  const [imagemOriginal, setImagemOriginal] = useState<string>("");

  const parametros = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (parametros.id) {
          const pratoResposta = await http.get<IPrato>(
            `pratos/${parametros.id}/`
          );
          const prato = pratoResposta.data;
          const restauranteResposta = await http.get<IRestaurante>(
            `restaurantes/${prato.restaurante}/`
          );
          const restaurante = restauranteResposta.data;

          setNomePrato(prato.nome);
          setTag(prato.tag);
          setDescricao(prato.descricao);
          setImagem(prato.imagem);
          setImagemOriginal(prato.imagem);
          setRestaurante(restaurante.nome);
        } else {
          setNomePrato('');
          setTag('');
          setDescricao('');
          setImagem(null);
          setImagemOriginal('');
          setRestaurante('');
        }

        const tagsResposta = await http.get<{ tags: ITag[] }>("tags/");
        setTags(tagsResposta.data.tags);

        const restaurantesResposta = await http.get<IRestaurante[]>(
          "restaurantes/"
        );
        setRestaurantes(restaurantesResposta.data);
      } catch (erro) {
        console.log("Erro ao carregar dados:", erro);
      }
    };

    fetchData();
  }, [parametros]);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);

    const restauranteSelecionado = restaurantes.find(
      (r) => r.nome === restaurante
    );
    if (restauranteSelecionado) {
      formData.append("restaurante", String(restauranteSelecionado.id));
    }

    if (imagem && imagem !== imagemOriginal) {
      formData.append("imagem", imagem);
    }

    if (parametros.id) {
      http
        .request({
          url: `pratos/${parametros.id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          alert("Prato atualizado com sucesso");
        })
        .catch((erro) => console.log(erro));
    } else {
      http
        .request({
          url: "pratos/",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
        .then(() => {
          setNomePrato("");
          setDescricao("");
          setTag("");
          setRestaurante("");
          alert("Prato cadastrado com sucesso");
        })
        .catch((erro) => console.log(erro));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeter}>
        <TextField
          value={nomePrato}
          onChange={(evento) => setNomePrato(evento.target.value)}
          label="Nome do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          label="Descrição do Prato"
          variant="standard"
          fullWidth
          required
          margin="dense"
        />

        <FormControl required margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(evento) => setTag(evento.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(evento) => setRestaurante(evento.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.nome}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {typeof imagem === "string" && (
          <Box
            component="img"
            sx={{ width: "30%", height: "auto", marginBottom: 2 }}
            src={imagem}
            alt="Imagem do prato"
          />
        )}

        <input type="file" onChange={selecionarArquivo} name="" id="" />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
