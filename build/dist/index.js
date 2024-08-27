class TodoApp {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
    this.setupEventListeners();
    this.renderTasks();
  }
  setupEventListeners() {
    const form = document.querySelector("form");
    const input = document.getElementById("input");
    const clearAllButton = document.getElementById("clear-all");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.trim() !== "") {
        this.addTask(input.value.trim());
        input.value = "";
      }
    });
    clearAllButton.addEventListener("click", () => {
      this.clearAllTasks();
    });
  }
  addTask(text) {
    const newTask = {
      id: this.nextId++,
      text
    };
    this.tasks.push(newTask);
    this.renderTasks();
  }
  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.renderTasks();
  }
  clearAllTasks() {
    this.tasks = [];
    this.renderTasks();
  }
  renderTasks() {
    const taskList = document.querySelector(".order-list");
    taskList.innerHTML = "";
    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-rectangle-xmark"></i> ${task.text}`;
      const removeIcon = li.querySelector("i");
      removeIcon.addEventListener("click", () => {
        this.removeTask(task.id);
      });
      taskList.appendChild(li);
    });
  }
}
new TodoApp();
