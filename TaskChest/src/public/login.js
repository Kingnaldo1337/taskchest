class LoginSection extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'closed' });
        const url = new URL(window.location.href);
        const userId = url.pathname.replaceAll('/', '');

        let userScore = 0;
        try {
            const response = await axios.get(`/user/${userId}/score`);
            userScore = response.data.score;
        } catch (error) {
            console.error('Erro ao obter o score do usuário:', error);
        }

        shadow.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="/style/global.css" rel="stylesheet">
            <main class="bg-default shadow-sections" style="height: 70vh; width: 30vw;" tabindex="0">
                <section class="container-fluid d-flex justify-content-center h-100 flex-column align-items-center">
                    <h1 class="text-white font-italic font-weight-light">${userId}</h1>
                    <p class="text-white font-italic">Score: ${userScore}</p>
                    <a class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="http://${url.host}">Trocar de conta</a>
                </section>
            </main>
        `;

        shadow.querySelector('main').focus();

        document.querySelector('login-section').addEventListener('focusout', event => {
            event.currentTarget.remove();
        });
    }
}
customElements.define('login-section', LoginSection);