# Planejando
Projeto ainda não está feito, porém há ideias sobre o que fazer
> [!NOTE]
> Anotarei todas as ideias aqui para uma análise melhor, e, obviamente, planejar o projeto de uma maneira mais eficaz.

Apartir de agora serão demonstrados as ideias em tópicos.

- [1 Sobre o projeto](#1-sobre-o-projeto)
    - [1.1 O que é?](#11-o-que-é)
    - [1.2 Como funcionará?](#12-como-funcionará)
    - [1.3 Como usar?](#13-como-usar)
        - [1.3.1 Opções](#131-opções)

## 1 Sobre o projeto

### 1.1 O que é?
O projeto recebe dados de qualquer loteria e faz uma análise sobre os resultados. Portanto, o projeto *`lotery`* tem o intuito de auxiliar na escolha de alternativas de jogos.

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
| debug |  <center>-</center>|  Demonstra com mais detalhes o que retorna ao console |

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
</br>$\binom{60}{6}$

### 2.2.2
Para poder obter as probabilidades e escolher a melhor sequência, preciso calcular a probabilidade, que farei desta maneira:
$P_{\text{total}} = P_1 \cdot $
