const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function creatLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        creatTask(inputTask.value);
    }
});

function limpaInput() {
    inputTask.value = '';
    inputTask.focus();
}

function creatEraseButton(li) {
    li.innerHTML += ' ';
    const eraseButton = document.createElement('button');
    eraseButton.innerHTML = 'Apagar';
    eraseButton.setAttribute('class', 'apagar');
    li.appendChild(eraseButton);
}



function creatTask(textImput) {
    const li = creatLi();
    li.innerHTML = textImput;
    tasks.appendChild(li);
    limpaInput();
    creatEraseButton(li);
    saveTasks();
}


btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    creatTask(inputTask.value);
});

document.addEventListener('click', function(e){
    const el = e.target;
    
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];
  
    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        taskList.push(taskText);    
    }

    const taskJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', taskJSON);
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);
    
    for(let task of taskList) {
        creatTask(task);
    }
}

addSaveTasks();

