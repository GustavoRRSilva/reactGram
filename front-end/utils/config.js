import { body, header } from "express-validator";

// URL base da API
export const api = "http://localhost:5000/api";
// URL para uploads de arquivos
export const uploads = "http://localhost:5000/uploads";

// Função para configurar as opções de requisição
export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  // Se houver um arquivo de imagem
  if (image) {
    config = {
      method,
      body: data, // Corpo da requisição contém o arquivo de imagem
      headers: {}, // Cabeçalhos vazios, pois o tipo de conteúdo é definido automaticamente
    };
  } else if (method == "DELETE" || data === null) {
    // Se for uma requisição DELETE ou se não houver dados
    config = {
      method,
      header: {}, // Cabeçalhos vazios (possivelmente um erro de digitação, deveria ser 'headers')
    };
  } else {
    // Se for qualquer outro tipo de requisição com dados JSON
    config = {
      method,
      body: JSON.stringify(data), // Dados convertidos para JSON e definidos como corpo da requisição
      headers: {
        "Content-type": "application/json", // Tipo de conteúdo definido como JSON
      },
    };
  }

  // Se houver um token de autenticação, adicioná-lo aos cabeçalhos
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config; // Retornar a configuração da requisição
};
