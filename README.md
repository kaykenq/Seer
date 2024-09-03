# Seer
O futuro é incerto. Nossos números não.

- [1 Sobre o projeto](#1-sobre-o-projeto)
    - [1.1 O que é?](#11-o-que-é)
    - [1.2 Como funcionará?](#12-como-funcionará)
    - [1.3 Como usar?](#13-como-usar)
        - [1.3.1 Opções](#131-opções)
- [2 Código](#2-código)
    - [2.1 API](#21-api)
    - [2.2 Cálculos](#22-cálculos)
        - [2.2.1 Possibilidades](#221-possibilidades)
        - [2.2.2 Probabilidades](#222-probabilidades)
    - [2.3 Threads e Clusters](#23-threads-e-clusters)
    - [2.4 TensorFlow.js](#24-tensorflow.js)

## 1 Sobre o projeto

> [!IMPORTANT]
> Esse é o projeto **oficial**, a qual não é pago, além disso, caso programas, iguais a esse, serem vistos, por favor, considere um risco. Ademais, o projeto **não** requere **quaisquer** dados **pessoais**.

### 1.1 O que é?
O projeto recebe dados de qualquer loteria e faz uma análise sobre os resultados. Portanto, o projeto *`Seer`* tem o intuito de auxiliar na escolha de alternativas de jogos.

> [!IMPORTANT]
> Apenas jogos de **LOTERIA**

### 1.2 Como funcionará?
Haverá um algoritimo que receberá **todos** os resultados dos jogos e fará uma análise. Com isso, mostrará as pronabilidades de cair uma sequência e número qualquer. Além disso, apresentará as melhores alternativas para serem escolhidas.

> [!IMPORTANT]
> Não terá 100% de precisão. A ideia é aumentar as chances de ganho.

### 1.3 Como usar?
Deve ser utilizado pelo terminal e utilizará argumentos no *`Shell`*.
E, o site da loteria deve ser colocado para o programa baixar todos os resultados e realizar a análise.

> [!TIP]
> É interessante utilizar o modo *`debug`* para melhor análise

Além disso, haverá como trocar linguagem, para melhor entendimento.
</br>A seguir linguagens disponíveis:

| Linguagens | Status |
|------------|--------|
|    EN-us   |    🟠 (Em andamento)  |
|    PT-br   |    🟠 (Em andamento)   |

#### 1.3.1 Opções
No *`Shell`* haverá opções que necessitam, ou não, de argumentações.
</br>A seguir as opções:

| Opção | Argumento | Descrição |
|-------|-----------|-----------|
| debug |     -     |  Demonstra com mais detalhes o que retorna ao console |

## 2 Código
Vou anotar importantes ideias e detalhes alheios sobre o código do projeto

### 2.1 API
A loteria possui uma API (`https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/x`). Portanto, consigo baixar os resultados utilizando-a.
> [!NOTE]
> Basta alterar `x` para qualquer número

### 2.2 Cálculos
A loteria possui 60 números, sendo necessário escolher 6 deles, porém, preciso calcular as possibilidades de criação de todas as sequências, e calcular as probabilidades das sequência (calcularei usando cada probabilidade de cada número)

#### 2.2.1 Possibilidades
É de extrema importância calcular quantas são as possibilidades das sequências para criar um limite no loop. Portanto, calcularei desta maneira:
</br>$K = \binom{60}{6} = 50.063.860$

#### 2.2.2 Probabilidades
Para obter as probabilidades e escolher a melhor sequência, preciso calcular a probabilidade, que farei desta maneira:
</br>$P_{\text{total}} = \prod\limits_{n=1}^6P_{\text{n}}$

> [!IMPORTANT]
> $P_n$ é probabilidade de um número da sequência de uma ordem 'n', ou seja, $n = 1$ escolherá o primeiro número, e assim adiante.

### 2.3 Threads e Clusters
Vou utilizar *threads* e *clusters* para realizar os cálculos, verificar as melhores probabilidades das sequências, e baixar os conteúdos da loteria.

> [!TIP]
> Agrupar as sequências em grupos simétricos, ou quase, para usar poucos processos e evitar maiores gastos de memória *RAM*.

### [2.4 TensorFlow.js](https://www.tensorflow.org/)
TensorFlow.js é um projeto a qual cria-se uma rede neural no código, portanto o faz aprender qualquer material.
</br>
</br>O uso do módulo `TensorFlow.js` é importante, haja vista a necessidade do código aprender a lógica dos números sorteados, ou, ao menos, tentar prever com uma certa precisão os próximos números.

<sub> *Para mais informações de instalação e utilização clique [aqui](https://www.tensorflow.org/install)* </sub>
