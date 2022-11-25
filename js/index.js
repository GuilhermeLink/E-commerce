

let inputPesquisa = document.querySelector(".inputPesquisa")
let buttonPesquisa = document.querySelector("#botaoPesquisa")


buttonPesquisa.addEventListener("click", function(){
    let buscaUsuario = inputPesquisa.value.toLowerCase()
    let resultadoBusca = buscar(buscaUsuario)
    tag(lojaTela, resultadoBusca)

})

function buscar (pesquisa) {
    let resultado = []
    lojaTela.addCart = "Adicionar ao carrinho" 
    for(let produto of vitrine){
        let loja = produto.nameItem.toLowerCase()
          if(loja.includes(pesquisa)){
            
              resultado.push(produto)
          }
    }   
    return resultado
}




let lojaTela = document.querySelector(".tela")

function tag(itens, lista) {
    itens.innerHTML = ""
    lista.forEach(element => {
        let cardProduto = criarProduto(element, itens)
        itens.appendChild(cardProduto)
    })
}
tag(lojaTela, vitrine)


function criarProduto(lista, tagHtml) {

    let tagSection  = document.createElement("section")
    tagSection.classList.add("card")

    let tagDiv      = document.createElement("div")
    tagDiv.classList.add("box")
    tagSection.appendChild(tagDiv)

    let tagImg      = document.createElement("img")
    tagDiv.appendChild(tagImg)

    let tagSection2 = document.createElement("section")
    tagSection2.classList.add("descricao")
    tagSection.appendChild(tagSection2)

    let tagDiv2     = document.createElement("div")
    tagDiv2.classList.add("setor")
    tagSection2.appendChild(tagDiv2)

    let tagDiv3     = document.createElement("div")
    tagDiv3.classList.add("tituloJogos")
    tagSection2.appendChild(tagDiv3)

    let tagP        = document.createElement("p")
    tagSection2.appendChild(tagP)

    let tagDiv4     = document.createElement("div")
    tagDiv4.classList.add("preco")
    tagSection2.appendChild(tagDiv4)

    let tagButton   = document.createElement("button") 
    tagButton.classList.add("botao")
    tagSection2.appendChild(tagButton)
    

    let id          = lista.id
    let img         = lista.img
    let description = lista.description
    let nameItem    = lista.nameItem
    let value       = lista.value.toFixed(2)
    let addCart     = lista.addCart
    let tag         = lista.tag

    tagImg.src = `./${img}`
    tagImg.alt = nameItem
    tagDiv3.innerText = nameItem
    tagDiv4.innerText = `R$ ${value}`.replace(".",",")
    tagDiv2.innerText = tag
    tagP.innerText = description
    tagButton.innerText = addCart

    if(id != undefined){
        tagButton.id =  id
    }
    
    return tagSection
}

let produtosLoja = document.querySelectorAll(".botao")
let produtosCarrinho = document.querySelector(".ulCarrinho")
let precoFinalCarrinho = document.querySelector(".precoFinal")
let carrinhoCompras = []

function tag2(itens2, lista2) {
    itens2.innerHTML = ""
    lista2.forEach(element => {
        let cardProduto2 = criarProdutoCarrinho(element, itens2)
        itens2.appendChild(cardProduto2)
    })
}
tag2(produtosCarrinho, carrinhoCompras)


function criarProdutoCarrinho(lista, tagHtml){

    let tagSection  = document.createElement("section")
    tagSection.classList.add("card")

    let tagDiv      = document.createElement("div")
    tagDiv.classList.add("box")
    tagSection.appendChild(tagDiv)

    let tagImg      = document.createElement("img")
    tagDiv.appendChild(tagImg)

    let tagSection2 = document.createElement("section")
    tagSection2.classList.add("descricao")
    tagSection.appendChild(tagSection2)

    let tagDiv2     = document.createElement("div")
    tagDiv2.classList.add("setor")
    tagSection2.appendChild(tagDiv2)

    let tagDiv3     = document.createElement("div")
    tagDiv3.classList.add("tituloJogos")
    tagSection2.appendChild(tagDiv3)

    let tagDiv4     = document.createElement("div")
    tagDiv4.classList.add("preco")
    tagSection2.appendChild(tagDiv4)

    let tagButton   = document.createElement("button") 
    tagButton.classList.add("botaoCarrinho")
    tagSection2.appendChild(tagButton)

    let id          = lista.id
    let img         = lista.img
    let nameItem    = lista.nameItem
    let value       = lista.value.toFixed(2)
    let addCart     = lista.addCart
    let tag         = lista.tag

    tagImg.src = `./${img}`
    tagImg.alt = nameItem
    tagDiv3.innerText = nameItem
    tagDiv4.innerText = `R$ ${value}`.replace(".",",")
    tagDiv2.innerText = tag
    tagButton.innerText = addCart

    if(id != undefined){
        tagButton.id =  id
    }
    
    return tagSection
}





for(let i = 0; i < produtosLoja.length; i++){
    produtosLoja[i].addEventListener("click", interceptacao)       
}

function interceptacao(event) {
    let idProduto = event.target.id
    let produtosEncontrados = vitrine.find(produto => {
        if(idProduto == produto.id){ 
            produto.addCart = "Remover produto"
            return produto
        } 
        
    })
    adicionarCarrinho(produtosEncontrados)
}


function adicionarCarrinho(produtos){

    if(produtos !== undefined){
        carrinhoCompras.push(produtos)
        somaValores(carrinhoCompras)
        tag(produtosCarrinho, carrinhoCompras)
    }   
}


let quantidade = document.querySelector(".totalItens")
let valor = document.querySelector(".totalValor")

function somaValores(produtos) {
    let total = 0

    produtos.forEach(element => {
        total += element.value
        
    })


    valor.innerHTML = `R$ ${total.toFixed(2)}`.replace(".",",")
    
    quantidade.innerHTML = `${produtos.length}`

    return total
}


let produtosLoja2 = document.querySelector(".ulCarrinho")



produtosLoja2.addEventListener("click", interceptacaoCarrinho)       
  


function interceptacaoCarrinho(event) {

    let botaoCarrinho = event.target
    if (botaoCarrinho.tagName == "BUTTON") {
        
        let produtosEncontrados = carrinhoCompras.find(produto => {
            if(botaoCarrinho.id == produto.id){ 
                return produto.id
            }        
        })
        removerCarrinho(carrinhoCompras, produtosEncontrados)
    }
        
}


function removerCarrinho(produtos, produtosEncontrados) {
    let indiceProduto = produtos.indexOf(produtosEncontrados)
    produtos.splice(indiceProduto, 1)
    tag(produtosCarrinho, produtos)
    subtrairValores(produtos)


    return produtos

} 

function subtrairValores(produtos) {
    let total = somaValores(produtos)

    valor.innerHTML = `R$ ${total.toFixed(2)}`.replace(".",",")
    
    quantidade.innerHTML = `${produtos.length}`
}

