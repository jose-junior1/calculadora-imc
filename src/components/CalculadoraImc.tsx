import { useState } from "react";
import styles from './CalculadoraImc.module.css';

const CalculadoraImc = () => {
    const [altura, setAltura] = useState<string>("");
    const [peso, setPeso] = useState<string>("");
    const [resultado, setResultado] = useState(0);
    const [classificacao, setClassificacao] = useState<string>("");
    const [erro, setErro] = useState<string>("");

    const getClassificacaoStyle = () => {
        switch (classificacao) {
            case "Abaixo do peso": return styles.abaixoPeso;
            case "Peso normal": return styles.normal;
            case "Sobrepeso": return styles.sobrepeso;
            case "Obesidade grau 1": return styles.obesidadeGrau1;
            case "Obesidade grau 2": return styles.obesidadeGrau2;
            case "Obesidade grau 3": return styles.obesidadeGrau3;
            default: return "";
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErro(""); // Limpa o erro antes de validar

        const alturaNum = parseFloat(altura);
        const pesoNum = parseFloat(peso);

        if (alturaNum <= 0 || pesoNum <= 0 || isNaN(alturaNum) || isNaN(pesoNum)) {
            setResultado(0);
            setClassificacao("");
            setErro("Preencha os campos corretamente.");
            return;
        };

        if (alturaNum > 0 && pesoNum > 0) {
            const imc = pesoNum / (alturaNum * alturaNum);
            setResultado(imc);

            if (imc < 18.5) setClassificacao("Abaixo do peso");
            else if (imc < 25) setClassificacao("Peso normal");
            else if (imc < 30) setClassificacao("Sobrepeso");
            else if (imc < 35) setClassificacao("Obesidade grau 1");
            else if (imc < 40) setClassificacao("Obesidade grau 2");
            else setClassificacao("Obesidade grau 3");
        }

        setAltura("");
        setPeso("");
    };

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <div className={styles.containerLogoResponsive}>
                        <h1
                        className={styles.title}>
                            Calculadora IMC
                        </h1>
                        <span className={styles.marcaResponsive}>
                        Dev José
                    </span>
                    </div>
                    <h2 className={styles.subtitle}>
                        Veja se está no peso ideal!
                    </h2>
                    <span className={styles.marca}>
                        Dev José
                    </span>
                </div>
                <form className={styles.containerForm} onSubmit={handleSubmit}>
                    <div className={styles.containerFormresponsive}>
                        <label htmlFor="altura">Altura: </label>
                        <input
                            className={styles.inputReduzido}
                            value={altura}
                            onChange={(e) => {
                                setAltura(e.target.value);
                                if (erro) setErro("");
                            }}
                            id="altura"
                            type="number"
                            placeholder="Ex.: 1.83 (m)"
                            inputMode="decimal"
                            required
                        />
                    </div>
                        <span className={styles.espacador}></span>
                    <div className={styles.containerFormresponsive}>
                    <label htmlFor="peso">Peso:</label>
                        <input
                            className={styles.inputReduzido}
                            value={peso}
                            onChange={(e) => {
                                setPeso(e.target.value);
                                if (erro) setErro("");
                            }}
                            id="peso"
                            type="number"
                            placeholder="Ex.: 65.7 (kg)"
                            inputMode="decimal"
                            required
                        />
                        </div>

                    <button type="submit">Calcular</button>
                </form>
                {erro && <p className={styles.erro}>{erro}</p>}
                {classificacao && (
                    <div className={styles.exibeResultado}>
                        {resultado > 0 && <p>Seu IMC é: <span>{resultado.toFixed(2)}</span></p>}
                        <p>
                            Classificação:{" "}
                            <span className={`${styles.resultado} ${getClassificacaoStyle()}`}>
                                {classificacao}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
};

export default CalculadoraImc;