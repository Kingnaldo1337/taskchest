import Card from "./card.js";

export default class TaskManager extends HTMLElement{
    constructor(action, id, tittle = '', description = '', term = '', category = '', status = false){
        super();

        this.action = action;
        this.id = id;

        this.tittle = tittle;
        this.description = description;
        this.term = term;
        this.category = category;
        this.status = status;
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode:'closed'});
        shadow.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">
            <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/style/global.css">

            <main class="bg-default shadow-sections pt-2" style="height: 70vh; width: 30vw; min-height: 500px;" tabindex="0">
                <section class="container-fluid d-flex justify-content-center flex-column ">
                    <h2 class="text-white font-italic font-weight-light text-nowrap text-center">${this.action} sua tarefa</h2>

                    <form class="d-flex justify-content-center w-50 flex-column ms-5" id="taskManagement">
                        <label for="inputTittle" class="form-label text-white">Título</label>
                        <input class="form-control" type="text" id="inputTittle" autocomplete="off">

                        <label for="inputDesc" class="form-label text-white">descricao</label>
                        <textarea class="form-control" id="inputDesc" rows="5" style="resize: none; width: 20vw;"></textarea>

                        <label for="inputTerm" class="form-label text-white" >Prazo</label>
                        <input class="form-control mb-3" type="date" id="inputTerm">
                        
                        <div class="container-fluid d-flex justify-content-between" style="width: 20vw;" >
                            <div class="d-flex flex-column text-white">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="radioEstudos" value="estudos" che>
                                    <label class="form-check-label" for="radioEstudos">
                                        Estudos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="radioTrabalho" value="trabalho">
                                    <label class="form-check-label" for="radioTrabalho">
                                        Trabalho
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="radioDiaadia" value="dia-a-dia">
                                    <label class="form-check-label" for="radioDayToDay">
                                        Dia-a-dia
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="category" id="radioOutros" value="outros">
                                    <label class="form-check-label" for="radioOthers">
                                        Outros
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary ">Confirmar</button>
                                <div class="mt-4 form-check">
                                    <input type="checkbox" class="form-check-input" id="concluida">
                                    <label class="form-check-label text-white" for="concluida">Concluída?</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        `
        const tittle = shadow.querySelector('#inputTittle');
        const description = shadow.querySelector('#inputDesc');
        const term = shadow.querySelector('#inputTerm');
        const concluded = shadow.querySelector('#concluida');
        
        
        tittle.value = this.tittle;
        description.value = this.description;
        term.value = this.term;
        concluded.checked = this.status;
        try{ shadow.querySelector('#radio' + this.category).checked = true; }catch(error){}
        
        const axiosContext = axios.create({baseURL:window.location.href});

        shadow.querySelector('#taskManagement').addEventListener('submit', async event => {
            event.preventDefault();

            let response = undefined;
            
            if(!this.id){
                response = await axiosContext.post('/task/create', {
                    "tittle": tittle.value,
                    "description": description.value,
                    "term": term.value,
                    "category":  shadow.querySelector('input[name="category"]:checked').value,
                    "status": concluded.checked
                });
                document.createCard(response.data);
            }
            else{//Se houver id, ou seja, se a tarefa estiver sendo editada
                response = await axiosContext.put('/task/edit', {
                    "id": this.id,
                    "tittle": tittle.value,
                    "description": description.value,
                    "term": term.value,
                    "category":  shadow.querySelector('input[name="category"]:checked').value,
                    "status": concluded.checked 
                });

                document.querySelector(`task-card[tarefa="${this.id}"]`).remove();
                document.createCard(response.data);
                this.remove()
            }
            tittle.value = '';
            description.value = '';
            term.value = '';
        });

        shadow.querySelector('main').focus();

        document.querySelector('task-manager').addEventListener('focusout', event => {
            event.currentTarget.remove();
        });
          
    }

}
customElements.define('task-manager', TaskManager);