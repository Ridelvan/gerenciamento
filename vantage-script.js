// Salva o ID do botão clicado
function handleButtonClick(buttonId) {
    let confirmedButtons = JSON.parse(localStorage.getItem('confirmedButtons')) || []; // Obtém a lista de botões confirmados, se houver
    if (!confirmedButtons.includes(buttonId)) {
        confirmedButtons.push(buttonId); // Adiciona o ID do botão à lista, se ainda não estiver nela
        localStorage.setItem('confirmedButtons', JSON.stringify(confirmedButtons)); // Salva a lista de botões confirmados
    }
    window.location.href = "segundo.html"; // Navega para a página renomeada
}

// Marca todos os botões confirmados ao carregar a página principal
function loadState() {
    const confirmedButtons = JSON.parse(localStorage.getItem('confirmedButtons')) || []; // Obtém a lista de botões confirmados
    confirmedButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('confirmed');
            button.textContent = 'Confirmado'; // Exibe o texto "Confirmado"
        }
    });
}

// Função para resetar os botões
function resetButtons() {
    localStorage.removeItem('confirmedButtons'); // Remove a lista de botões confirmados do localStorage
    // Remove a classe 'confirmed' e o texto "Confirmado" de todos os botões
    document.querySelectorAll('.grid-btn').forEach(button => {
        button.classList.remove('confirmed');
        button.textContent = button.id.replace('day-', 'Day '); // Restaura o texto original
    });
}

// Adiciona o evento de clique a todos os botões
document.querySelectorAll('.grid-btn').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.id);
    });
});

// Adiciona o evento de clique para o botão de reset
document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm("Você tem certeza de que deseja resetar todos os botões?")) {
        resetButtons();
    }
});

// Função para marcar os botões como confirmados ao carregar a página
function loadState() {
    const confirmedButtons = JSON.parse(localStorage.getItem('confirmedButtons')) || [];
    confirmedButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('confirmed');
            button.textContent = 'Confirmado';
        }
    });
}

// Salva o ID do botão clicado no localStorage
function handleButtonClick(buttonId) {
    let confirmedButtons = JSON.parse(localStorage.getItem('confirmedButtons')) || [];
    if (!confirmedButtons.includes(buttonId)) {
        confirmedButtons.push(buttonId); // Adiciona o ID do botão à lista
        localStorage.setItem('confirmedButtons', JSON.stringify(confirmedButtons));
    }
    window.location.href = "segundo.html"; // Navega para a página renomeada
}

// Adiciona evento de clique a todos os botões
document.querySelectorAll('.grid-btn').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.id);
    });
});

// Executa ao carregar a página
window.addEventListener('DOMContentLoaded', loadState);

document.getElementById('reset-btn').addEventListener('click', function() {
    // Seleciona todos os botões com a classe grid-btn
    const buttons = document.querySelectorAll('.grid-btn');

    // Altera a cor de fundo de todos os botões
    buttons.forEach(function(button) {
        button.style.backgroundColor = 'rgba(0, 255, 0, 0.7)'; // Altere para a cor que deseja
    });

    // Exibe um alerta
    alert('Todos os botões foram confirmados!');
});
