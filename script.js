
const perguntas = [
    {
        pergunta: "Em qual país Ali Hazelwood nasceu?",
        alternativas: ["Estados Unidos", "Itália", "Reino Unido", "Brasil"],
        correta: 1
    },
    {
        pergunta: "Qual é o gênero literário mais associado aos livros da autora?",
        alternativas: ["Terror", "Romance", "Suspense", "Fantasia épica"],
        correta: 1
    },
    {
        pergunta: "Qual é o título do livro de estreia de Ali Hazelwood?",
        alternativas: ["A Hipótese do amor", "Amor, teoricamente", "A Razão do amor", "Noiva"],
        correta: 0
    },
    {
        pergunta: "Qual é a formação acadêmica de Ali Hazelwood?",
        alternativas: ["Biologia", "Física", "Neurociência", "Química"],
        correta: 2
    },
    {
        pergunta: "Qual é o nome da personagem principal em 'Amor, teoricamente'?",
        alternativas: ["Bee Königswasser", "Viola Bowen", "Olive Smith", "Elsie Hathaway"],
        correta: 3
    },
    {
        pergunta: "Quais são as protagonistas de 'Odeio te amar'?",
        alternativas: ["Guenn, Scarlett & Misery ", "Sadie, Maya & Hannah", "Serena, Lexi & Evie ", "Bee, Mallory & Olive"],
        correta: 1
    },
    {
        pergunta: "Qual é o título original de 'A Razão do Amor'?",
        alternativas: ["Love on the Brain", "Love, Theoretically", "Love, Actually", "Love, Unconditionally"],
        correta: 0
    },
    {
        pergunta: "Qual é o nome do protagonista masculino de Noiva?",
        alternativas: ["Nolan Sawyer", "Lucas Blomqvist", "Lowe Moreland", "Koen Alexander"],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;
const pontosPorAcerto = 15;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const resultadoElemento = document.getElementById("resultado");
const botaoComecar = document.getElementById("comecar");
const botaoReiniciar = document.getElementById("reiniciar");

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;

    botaoComecar.style.display = "none";
    botaoReiniciar.style.display = "none";

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;
    resultadoElemento.textContent = "";

    const pergunta = perguntas[perguntaAtual];
    perguntaElemento.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}: ${pergunta.pergunta}`;

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(index, botao);
        });

        alternativasElemento.appendChild(botao);
    });

    botaoComecar.textContent = "Próxima pergunta";
    botaoComecar.style.display = "none";
}

function verificarResposta(index, botaoSelecionado) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    if (index === pergunta.correta) {
        pontuacao += pontosPorAcerto;

        resultadoElemento.textContent =
            "Resposta correta! +10 pontos";
    } else {
        resultadoElemento.textContent =
            "Resposta incorreta! Você não ganhou pontos.";
    }

    const botoes = alternativasElemento.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    botaoComecar.style.display = "inline-block";

    if (perguntaAtual === perguntas.length - 1) {
        botaoComecar.textContent = "Ver resultado";
    }
}

function proximaPergunta() {
    if (!respondeu) return;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    perguntaElemento.textContent = "Quiz finalizado!";

    alternativasElemento.innerHTML = "";

    resultadoElemento.innerHTML = `
        Você fez ${pontuacao} pontos!<br><br>
        Acertos: ${pontuacao / pontosPorAcerto} de ${perguntas.length}<br>
        Pontuação máxima: ${perguntas.length * pontosPorAcerto} pontos.
    `;

    botaoComecar.style.display = "none";
    botaoReiniciar.style.display = "inline-block";
}

function reiniciarQuiz() {
    iniciarQuiz();
}

botaoComecar.addEventListener("click", () => {
    if (perguntaAtual === 0 && !respondeu &&
        alternativasElemento.children.length === 0) {
        iniciarQuiz();
    } else {
        proximaPergunta();
    }
});

botaoReiniciar.addEventListener("click", reiniciarQuiz);
