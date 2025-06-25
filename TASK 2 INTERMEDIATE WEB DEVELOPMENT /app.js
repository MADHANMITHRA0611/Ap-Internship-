// Contact Form Validation
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'At least 2 characters.';
    valid = false;
  }

  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email.';
    valid = false;
  }

  const message = document.getElementById('message').value.trim();
  if (message.length < 10) {
    document.getElementById('messageError').textContent = 'At least 10 characters.';
    valid = false;
  }

  if (!valid) return;
  alert('✉️ Your message has been sent!');
  form.reset();
});

// To‑Do List Logic
const inputBox = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" data-index="${idx}">&times;</button>`;
    li.addEventListener('click', () => toggleTask(idx));
    todoList.appendChild(li);
  });
}

function toggleTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
  saveAndRender();
}

addBtn.addEventListener('click', () => {
  const val = inputBox.value.trim();
  if (!val) return alert('Enter a task!');
  tasks.push({ text: val, completed: false });
  saveAndRender();
  inputBox.value = '';
});

todoList.addEventListener('click', e => {
  if (e.target.matches('.delete-btn')) {
    const i = e.target.dataset.index;
    tasks.splice(i, 1);
    saveAndRender(); 
  }
});

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
