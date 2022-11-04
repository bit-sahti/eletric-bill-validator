# Eletric Bill Validator

Esse projeto checa os dados da conta de luz de um cliente para verificar a eligibilidade do mesmo em relação a determinadas regras.

Você testar o resultado [aqui](https://eletric-bill-validator.herokuapp.com) caso não deseje fazer uma instalação local - note, porém, que a API pode estar suspensa e demorar para responder à primeira requisição.

## Instalação

Clone o projeto e instale as dependências com npm:

```bash
  cd eletric-bill-validator
  npm install
```

Depois disso, rode o projeto com:

```bash
  npm run dev
```

ou

```bash
  npm start
```

## Tecnologias utilizadas

- Node
- Express
- Jest
- Swagger

## Considerações

Elaborei o projeto em torno da funcionalidade primária (as regras de negócio) e depois busquei simular a estrutura básica que precisaria circundá-la - validação da requisição, tratamento de erros, documentação, e, caso houvesse tempo, persistência e logs.

Procurei não adicionar complexidade desnecessária nem estrapolar as regras propostas, mas, ao mesmo tempo, precisei fazer algumas inferências com base no senso comum e nos exemplos fornecidos - para calcular a média de consumo e a economia anual de CO2, por exemplo, considerei que utilizaremos uma projeção a partir do consumo registrado, caso não tenhamos os dados dos últimos 12 meses.
