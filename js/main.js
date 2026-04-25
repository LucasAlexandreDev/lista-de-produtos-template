/* *********************************************************************
* Objective    : Arquivo responsável por consumir o JSON de produtos e transformar os dados em elementos HTML (cards)
* Date         : 2026-04-21  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/


/*
    Import do arquivo JSON contendo os dados dos produtos
    with { type: "json" } -> necessário para importar JSON como módulo
*/ 
import objectProduto from "../data/produtos.json" with { type: "json" }


// Função responsável por criar um único card de produto
const criarCard = function(produto){
    
    const card     = document.createElement('article') // Cria o container principal do card
    card.className = 'card'

    const imagem = document.createElement('img')   // Cria a imagem do produto
    imagem.src   = `./img/${produto.imagem}`       // Define o caminho da imagem 
    imagem.alt   = `Imagem de ${produto.nome}`     // Define o texto alternativo (acessibilidade)

    const nome       = document.createElement('h3')      // Cria o elemento para o nome do produto
    nome.textContent = produto.nome                      // Insere o nome no elemento

    const descricao       = document.createElement('p')   // Cria o elemento para descrição
    descricao.textContent = produto.descricao             // Insere a descrição do produto

    const preco       = document.createElement('p')     // Cria o elemento para preço
    preco.textContent = `R$ ${produto.preco}`          // Insere o preço com prefixo "R$"

    const categoria       = document.createElement('span')   // Cria o elemento para categoria
    categoria.textContent = produto.categoria               // Insere a categoria do produto

    const classificacao = document.createElement('p')    // Cria o elemento para classificação


    /*
        Converte o valor numérico da classificação em representação visual de estrelas

        produto.classificacao  ->  valor de 1 a 5
        '★'.repeat(n)         ->  gera estrelas preenchidas
        '☆'.repeat(5 - n)     ->  completa até 5 estrelas com vazias
    */ 
    const estrelas            = '★'.repeat(produto.classificacao) + '☆'.repeat(5 - produto.classificacao)
    classificacao.textContent = estrelas


    // Adiciona todos os elementos dentro do card
    card.append(imagem, nome, descricao, preco, categoria, classificacao)

    // Retorna o card pronto
    return card
}


/*
    map -> percorre o array de produtos e para cada produto, executa a função criarCard
    Retorna um array de elementos HTML (cards)
*/ 
const cards = objectProduto.map(criarCard)


/*
    Seleciona o container pelo ID do HTML

    Spread Operator (...)
    Converte o array de elementos em múltiplos argumentos individuais
    Necessário para o replaceChildren aceitar todos os cards corretamente

    cards    = [card1, card2, card3]
    ...cards = card1, card2, card3
    
    replaceChildren -> remove qualquer conteúdo existente e adiciona os novos cards
*/ 
document.getElementById('container').replaceChildren(...cards)