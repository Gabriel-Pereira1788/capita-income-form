/*
-Para subir esta aplicação em um servidor local digite o comando 'npm run devStart'
no terminal.
*/

const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");

app.use(express.json());
app.use(cors());

const calculateRPC = ({ income, dependents }) => {//Função que calcula a renda per capita do usuario.
	const newIncome = income.replaceAll('.','').replaceAll(",", ".");
	const result = Number(newIncome) / Number(dependents);
	return result.toLocaleString("pt-br", {
		style: "currency",
		currency: "BRL",
	});
};

const getAddress = (dataAddress) => { 
//Função que trata os dados recebidos pela a  API e retorna um endereço.
	const {logradouro,complemento,bairro,cep,localidade,uf} = dataAddress
	const infoFormat = (info, separator) => (info ? info + separator : "");
	const result = ` ${infoFormat(logradouro, ",")} ${infoFormat(complemento,"-")}${infoFormat(bairro, ".")} CEP:${cep}. ${localidade} - ${uf}`;

	return () =>  dataAddress.erro ? ' Endereço não encontrado. Por favor verifique o cep.' : result
};

/*
Metodo que trata os dados recebidos pelo Client
e responde a requisição com esses mesmos dados
tratados.
*/

const dataResponse = async (dataRequest, res) => {
	const { cep } = dataRequest;
	const cepValid = cep.replaceAll(".", "").replaceAll("-", "");
	const url = `https://viacep.com.br/ws/${cepValid}/json/`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		const address = getAddress(data)
		res.send({
			RPC: calculateRPC(dataRequest),
			address: address(),
			name: dataRequest.name,
		});
	} catch (err) {
		console.log('ERROR encontrado',err);
	}
};

// app.post("/register", (req, res) => {
// 	const dataReq = {// Dados recebidos pela camada do Client
// 		name: req.body.name,
// 		cep: req.body.cep,
// 		income: req.body.income,
// 		dependents: req.body.dependents,
// 	};
// 	dataResponse(dataReq, res);
// });

app.get('/',(req,res)=>{
	return res.json({message:'serverisup'})
})

app.listen(3333,() => {
	console.log('rodando na porta 3333')
})
