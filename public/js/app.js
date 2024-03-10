document.addEventListener('DOMContentLoaded', (event) => {
    const addTaskForms = document.querySelectorAll('.addTaskForm');
    addTaskForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const boxId = form.dataset.boxId;
            const newTask = form.elements.task.value;
            form.action = `/boxes/${boxId}/${newTask}`;
            form.submit();
        });
    });

    const addBoxForms = document.querySelectorAll('.addBoxForm');
    addBoxForms.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = form.elements.title.value;
            form.action = `/boxes/add/${title}`;
            form.method = 'POST';
            form.submit();
        });
    });

    document.querySelectorAll('.form-checkbox').forEach((form) => {
        const checkbox = form.querySelector('.form-check-input');
        const isChecked = checkbox.dataset.checked === 'true';
        checkbox.checked = isChecked;
        const label = checkbox.parentNode;
        label.style.textDecoration = isChecked ? 'line-through' : 'none';

        checkbox.addEventListener('change', (event) => {
            event.preventDefault();
            const boxId = checkbox.dataset.boxId;
            const taskId = checkbox.dataset.taskId;
            const newValue = checkbox.checked;

            if (checkbox.checked) {
                label.style.textDecoration = 'line-through';
            } else {
                label.style.textDecoration = 'none';
            }

            form.action = `/boxes/${boxId}/tasks/${taskId}?_method=PUT`;
            form.method = 'POST';
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'checked';
            input.value = newValue;
            form.appendChild(input);
            form.submit();
        });
    });

    const editButtons = document.querySelectorAll('.edit-form');
    editButtons.forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const newTitle = prompt('Enter new title');
            if (newTitle) {
                const boxId1 = form.dataset.boxId;
                form.action = `/boxes/${boxId1}/${newTitle}/edit?_method=PUT`;
                form.submit();
            } else {
                console.log("No new title entered");
            }
        });
    });
});

document.querySelectorAll('.form-check-input').forEach((checkbox, index) => {
    const isChecked = checkbox.dataset.checked === 'true';
    checkbox.checked = isChecked;
    const label = checkbox.parentNode.parentNode;
    label.style.textDecoration = isChecked ? 'line-through' : 'none';

    checkbox.addEventListener('change', (event) => {
        event.preventDefault();
        if (checkbox.checked) {
            label.style.textDecoration = 'line-through';
        } else {
            label.style.textDecoration = 'none';
        }
    });
});

document.querySelectorAll('.add').forEach((button) => {
    button.addEventListener('click', (event) => {
        const inputField = button.nextElementSibling;
        if (inputField.style.display === 'none') {
            event.preventDefault();
            inputField.style.display = 'block';
        } else if (inputField.value === '') {
            event.preventDefault();
            inputField.style.display = 'none';
        }
    });
});

const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
    const deleteButton = task.querySelector('.delete-task-button');
    task.addEventListener('mouseenter', () => {
        deleteButton.style.display = 'inline-block';
    });
    task.addEventListener('mouseleave', () => {
        deleteButton.style.display = 'none';
    });
});

const resetButton = document.querySelector('.reset');
const checkboxes = document.querySelectorAll('.form-check-input');
resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/boxes/reset', { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    const label = checkbox.parentNode;
                    label.style.textDecoration = 'none';
                });
                window.location.href = '/boxes';
            }
        })
        .catch(error => console.error('Error:', error));
});

function confirmDelete(event) {
    var confirmation = confirm("Are you sure you want to delete this chat?");
    if (!confirmation) {
        event.preventDefault();
    }
}