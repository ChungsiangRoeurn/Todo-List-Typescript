interface Task {
  id: number;
  text: string;
}

class TodoApp {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    this.setupEventListeners();
    this.renderTasks(); // Render any existing tasks when the app starts
  }

  private setupEventListeners(): void {
    const form = document.querySelector('form') as HTMLFormElement;
    const input = document.getElementById('input') as HTMLInputElement;
    const clearAllButton = document.getElementById(
      'clear-all',
    ) as HTMLHeadingElement;

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent form submission and page reload
      if (input.value.trim() !== '') {
        this.addTask(input.value.trim());
        input.value = ''; // Clear the input field
      }
    });

    clearAllButton.addEventListener('click', () => {
      this.clearAllTasks();
    });
  }

  private addTask(text: string): void {
    const newTask: Task = {
      id: this.nextId++,
      text: text,
    };
    this.tasks.push(newTask);
    this.renderTasks();
  }

  private removeTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.renderTasks(); // Re-render the task list
  }

  private clearAllTasks(): void {
    this.tasks = []; // Clear all tasks
    this.renderTasks(); // Re-render the empty list
  }

  private renderTasks(): void {
    const taskList = document.querySelector('.order-list') as HTMLUListElement;
    taskList.innerHTML = ''; // Clear the current list

    this.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-rectangle-xmark"></i> ${task.text}`;

      // Add an event listener to the icon for removing the task
      const removeIcon = li.querySelector('i') as HTMLElement;
      removeIcon.addEventListener('click', () => {
        this.removeTask(task.id);
      });

      taskList.appendChild(li);
    });
  }
}

new TodoApp();
