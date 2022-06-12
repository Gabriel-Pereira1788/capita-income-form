import { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./styles/Main.css";
import Form from "./Form.jsx";
import Result from "./Result.jsx";

const Main = () => {
	const [displayForm, setDisplay] = useState(false);
	const [displayResult, setDisplayResult] = useState(false);
	const [data, setData] = useState({});

	const renderButton = () => {
		const widthWindow = document.body.getBoundingClientRect().width;
		if (widthWindow <= 640 || !displayForm) {
			return (
				<Button
					variant="contained"
					onClick={() => {
						setDisplay(true);
						setDisplayResult(false);
					}}
					style={{ margin: "10px" }}
				>
					Novo Calculo
				</Button>
			);
		}
	};

	const renderForm = () => {
		if (displayForm) {
			return (
				<Form
					setDisplay={setDisplay}
					displayForm={displayForm}
					setDisplayResult={setDisplayResult}
					setData={setData}
				/>
			);
		}
	};

	return (
		<Container maxWidth="xl" style={{ padding: "0px" }}>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				height="100vh"
			>
				<Box
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					className="image"
				>
					<div className="content-container">
						{renderForm()}
						<div
							className="init"
							style={
								displayForm || displayResult
									? { display: "none" }
									: { display: "flex" }
							}
						>
							<h1>Calcular RPC</h1>
							<div className="container-paragraph">
								<p>
									RPC ou Renda per capita é o calculo que
									envolve a soma da renda de todos os
									moradores de uma residência, e que é
									dividida pelo número total de pessoas que
									vivem sob a manutenção desta renda total.
								</p>
							</div>

							<Button
								variant="contained"
								onClick={() => setDisplay(true)}
							>
								Calcular
							</Button>
						</div>
						<div
							className="init"
							style={
								displayResult
									? { display: "flex" }
									: { display: "none" }
							}
						>
							<Result
								name={data.name}
								address={data.address}
								RPC={data.RPC}
							/>
							{renderButton()}
						</div>
					</div>
				</Box>
			</Box>
		</Container>
	);
};

export default Main;
