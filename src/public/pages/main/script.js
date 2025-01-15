import Card from "/components/card.js";
import TaskManager from "/components/taskManager.js";
import LoginSection from "/components/login.js";

window.addEventListener('load', async () => {
    if(window.location.pathname != '/'){ //Se o usuário estiver logado.
        const axiosContext = axios.create({baseURL:window.location.href});

        let response = await axiosContext.post('/task/getUserTasks');

        response.data.forEach(task => {
            document.createCard(task)
        });
    }
});

document.createCard = (task) => {
    document.querySelector('main').appendChild(new Card(task.CategoriaNome, task.status, task.prazo, task.titulo, task.descricao, task.id));
}

document.querySelector('#addTask').addEventListener('click', () => {
    if(!document.querySelector('body').innerHTML.includes('task-manager')){
        document.querySelector('body').appendChild(new TaskManager('Anote', '','', '', '', ''));
    }
});

document.querySelector('#doLogin').addEventListener('click', () => {
    if(!document.querySelector('body').innerHTML.includes('login-section') && !document.querySelector('body').innerHTML.includes('task-manager')){
        document.querySelector('body').appendChild(new LoginSection());
    }
});
