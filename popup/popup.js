document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addTodo);
  loadTodos();
});

const addTodo = () => {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();

  if (todoText === '') {
    return;
  }

  chrome.storage.sync.get(['todos'], (result) => {
    const todos = result.todos || [];
    todos.push(todoText);

    chrome.storage.sync.set({ todos }, () => {
      todoInput.value = '';
      loadTodos();
    });
  });
}

const loadTodos = () => {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  chrome.storage.sync.get(['todos'], (result) => {
    const todos = result.todos || [];

    todos.forEach((todo) => {
      const listItem = document.createElement('li');
      listItem.textContent = todo;
      todoList.appendChild(listItem);
    });
  });
};