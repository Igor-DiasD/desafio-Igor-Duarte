const cardapio = {
    cafe: 3.00,
    chantily: 1.50,
    suco: 6.20,
    sanduiche: 6.50,
    queijo: 2.00,
    salgado: 7.25,
    combo1: 9.50,
    combo2: 7.50,
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0;
        let quantidadeInvalida = false;
        let itemInvalido = false;
        let codigoInvalido = false;
        let itensDoCarrinho = [];

        if(itens.length == 0){
            return "Não há itens no carrinho de compra!";
        }

        itens.forEach(item => {
            let itemFormatado = item.split(',');
            let nomeItem = itemFormatado[0];
            let quantidadeItem = Number(itemFormatado[1]);
            let valorItem = cardapio[nomeItem];

            itensDoCarrinho.push(nomeItem);

            if(quantidadeItem == 0){
                quantidadeInvalida = true;
            }

            if(itemFormatado.length < 2){
                itemInvalido = true;
            }

            if(valorItem == null){
                codigoInvalido = true;
            }

            valorTotal += quantidadeItem * valorItem;
        });

        if(quantidadeInvalida){
            return "Quantidade inválida!";
        }
        if(itemInvalido){
            return "Item inválido!";
        }

        if(codigoInvalido){
            return "Item inválido!";
        }

        if(itensDoCarrinho.includes("chantily") && !itensDoCarrinho.includes("cafe")){
            return "Item extra não pode ser pedido sem o principal";
        }

        if(itensDoCarrinho.includes("queijo") && !itensDoCarrinho.includes("sanduiche")){
            return "Item extra não pode ser pedido sem o principal";
        }

        if(metodoDePagamento == "dinheiro"){
            valorTotal = valorTotal - ((valorTotal * 5)/100);
        }
        else if(metodoDePagamento == "credito"){
            valorTotal = valorTotal + ((valorTotal * 3)/100);
        }
        else if(metodoDePagamento == "debito"){
            valorTotal = valorTotal;
        }
        else{
            return "Forma de pagamento inválida!";
        }

        let valorTotalFormatado = "R$ " + valorTotal.toFixed(2).replace(".",",");
        return valorTotalFormatado;
    }
}

export { CaixaDaLanchonete };
