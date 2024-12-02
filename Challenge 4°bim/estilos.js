// Função para validar o formulário
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (nome === "" ||  email === "" || mensagem ==="" || telefone ==="" ) {

        // Exibe a mensagem de erro
        document.getElementById('error-message').classList.remove('d-none');
        document.getElementById('success-message').classList.add('d-none');

    } else {
        // Exibe a mensagem de sucesso
        document.getElementById('success-message').classList.remove('d-none');
        document.getElementById('error-message').classList.add('d-none');

        // Limpa os campos do formulário
        document.getElementById('contact-form').reset();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const finalizeBtn = document.getElementById('finalize-btn');

    // Carregar produtos
    fetch('carrinho_backend.php?action=get_products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-md-4');
                productCard.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${product.nome}</h5>
                            <p class="card-text">Preço: R$${product.preco.toFixed(2)}</p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            });
        });

// Adicionar produto ao carrinho
window.addToCart = (id) => {
    fetch(`carrinho_backend.php?action=add_to_cart&product_id=${id}`)
        .then(() => updateCart());
};

// Atualizar carrinho
const updateCart = () => {
    fetch('carrinho_backend.php?action=get_cart')
        .then(response => response.json())
        .then(data => {
            cartItems.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>
                    <td>R$${(item.preco * item.quantidade).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remover</button>
                    </td>
                `;
                cartItems.appendChild(row);
            });
        });
};

// Remover produto do carrinho
window.removeFromCart = (id) => {
    fetch(`carrinho_backend.php?action=remove_from_cart&cart_id=${id}`)
        .then(() => updateCart());
};

// Finalizar compra
finalizeBtn.addEventListener('click', () => {
    fetch('carrinho_backend.php?action=finalize_cart')
        .then(() => {
            alert('Compra finalizada com sucesso!');
            updateCart();
        });
});

// Atualizar carrinho ao carregar a página
updateCart();
});