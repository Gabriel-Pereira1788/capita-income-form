import "./styles/Form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { TextField, Paper, Button, Box } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment'
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { useForm } from "react-hook-form";
import { ValidationCep, ValidationIncome } from "../utils/validations.js";

const Form = ({ setDisplay, displayForm, setDisplayResult, setData }) => {
	const url = "http://18.230.196.144:3333/register";
	const urlAlternative="http://localhost:3333/register"

	const validations = yup.object().shape({
		name: yup.string(),
		cep: yup
			.string()
			.matches(ValidationCep, "Cep invalido")
			.max(8, "8 caracteres permitidos"),
		income: yup
			.string()
			.matches(ValidationIncome, "Insira um valor monetario valido"),
		dependents: yup
			.number()
			.typeError("Apenas numeros são permitidos")
			.required("Campo Obrigatorio!")
			.positive("Apenas numeros positivos são permitidos"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validations),
	});

	const onSubmit = ({ name, cep, income, dependents }) => {
		Axios.post(url, {
			name: name,
			cep: cep,
			income: income,
			dependents: dependents,
		})
			.then((response) => setData(response.data))
			.then(() => {
				setDisplayResult(true);
				const widthWindow = document.body.getBoundingClientRect().width;
				if (widthWindow <= 640) {
					setDisplay(false);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div
			className="section-form"
			style={
				displayForm
					? { animationName: "displayOn" }
					: { animationName: "displayOff" }
			}
		>
			<Paper style={{ width: "100%", height: "100%" }} elevation={3}>
				<Box
					flexDirection="column"
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="100%"
				>
					<Button
						onClick={() => {
							setDisplay(false);
							setDisplayResult(false);
						}}
					>
						{" "}
						retornar
					</Button>
					<form onSubmit={handleSubmit(onSubmit)} className="form">
						<TextField
							name="name"
							{...register("name")}
							label="Nome (opcional)"
							fullWidth
							variant="outlined"
							error={!!errors.name}
							helperText={errors.name?.message}
							InputProps={{
								startAdornment:(
									<InputAdornment position='start'>
										<PersonIcon/>
									</InputAdornment>
									)
							}}
						/>
						<TextField
							name="cep"
							{...register("cep")}
							label="CEP"
							fullWidth
							variant="outlined"
							error={!!errors.cep}
							helperText={errors.cep?.message}
							InputProps={{
								startAdornment:(
									<InputAdornment position='start'>
										<HomeIcon/>
									</InputAdornment>
									)
							}}
						/>
						<TextField
							name="income"
							{...register("income")}
							label="Renda"
							fullWidth
							variant="outlined"
							error={!!errors.income}
							helperText={errors.income?.message}
							InputProps={{
								startAdornment:(
									<InputAdornment position='start'>
										<AttachMoneyIcon/>
									</InputAdornment>
									)
							}}

						/>
						<TextField
							type="number"
							name="dependents"
							{...register("dependents")}
							label="Dependentes"
							fullWidth
							variant="outlined"
							error={!!errors.dependents}
							helperText={errors.dependents?.message}
							InputProps={{
								startAdornment:(
									<InputAdornment position='start'>
										<GroupIcon/>
									</InputAdornment>
									)
							}}
						/>
						<Button variant="contained" type="submit">
							Enviar
						</Button>
					</form>
				</Box>
			</Paper>
		</div>
	);
};

export default Form;
