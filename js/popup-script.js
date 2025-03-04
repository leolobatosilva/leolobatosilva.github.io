/**
 * Script para controlar o Pop-up de Captura de Leads
 */

// Função para inicializar o pop-up
function initLeadPopup() {
    const popup = document.getElementById('lead-popup');
    const closeBtn = document.querySelector('.close-popup');
    const leadForm = document.getElementById('lead-form');
    const popupImage = document.getElementById('popup-image');

    if (!popup || !closeBtn || !leadForm) return;

    // Função para verificar se está em dispositivo móvel
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Função para ajustar a visualização da imagem com base no tamanho da tela
    function handleResponsive() {
        if (popupImage) {
            if (isMobile()) {
                popupImage.style.display = 'none';
            } else {
                popupImage.style.display = 'block';
            }
        }
    }

    // Executar verificação de responsividade ao carregar
    handleResponsive();

    // Ajustar visualização quando a janela for redimensionada
    window.addEventListener('resize', handleResponsive);

    // Exibir popup após 20 segundos
    setTimeout(function() {
        showPopup();
    }, 20000);

    // Exibir popup quando o usuário mover o mouse para sair da página
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 20 && !localStorage.getItem('popupShown')) {
            showPopup();
            // Marcar como exibido para não mostrar novamente na mesma sessão
            localStorage.setItem('popupShown', 'true');
        }
    });

    // Fechar popup ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        hidePopup();
    });

    // Fechar popup ao clicar fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    });

    // Processar envio do formulário
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('lead-email').value;

        if (validateEmail(email)) {
            submitLeadForm(this, email);
        } else {
            showError('Por favor, informe um email válido.');
        }
    });

    // Função para mostrar o popup
    function showPopup() {
        popup.style.display = 'block';
        // Verificar responsividade sempre que exibir o popup
        handleResponsive();
    }

    // Função para esconder o popup
    function hidePopup() {
        popup.style.display = 'none';
    }

    // Função para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para mostrar erro
    function showError(message) {
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ffe0e0';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';

        const formGroup = document.querySelector('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        formGroup.appendChild(errorElement);

        setTimeout(function() {
            errorElement.remove();
        }, 3000);
    }

    // Função para enviar o formulário
    function submitLeadForm(form, email) {
        // Aqui você adicionaria o código para enviar o email para seu servidor
        // Por exemplo, usando fetch API:
        /*
        fetch('seu-endpoint-de-api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            // Processar resposta de sucesso
            showSuccessMessage(form);
        })
        .catch(error => {
            // Lidar com erros
            showError('Ocorreu um erro ao enviar. Tente novamente.');
        });
        */

        // Simulação de envio com sucesso para demonstração
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        setTimeout(function() {
            showSuccessMessage(form);
        }, 1500);
    }

    // Função para mostrar mensagem de sucesso
    function showSuccessMessage(form) {
        form.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Obrigado! Entraremos em contato em breve.</p></div>';

        // Fechar popup após 3 segundos
        setTimeout(function() {
            hidePopup();
        }, 3000);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initLeadPopup);