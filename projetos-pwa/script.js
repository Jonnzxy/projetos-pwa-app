// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            saveProject();
        });
    }

    if (projectList) {
        loadProjects();
    }

    function saveProject() {
        const projectName = document.getElementById('project-name').value;
        const description = document.getElementById('description').value;
        const responsible = document.getElementById('responsible').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const status = document.getElementById('status').value;
        const budget = document.getElementById('budget').value;

        const project = {
            projectName,
            description,
            responsible,
            startDate,
            endDate,
            status,
            budget
        };

        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));

        form.reset();
        alert('Projeto salvo com sucesso!');
    }

    function loadProjects() {
        projectList.innerHTML = '';
        let projects = JSON.parse(localStorage.getItem('projects')) || [];

        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${project.projectName}</strong><br>
                Descrição: ${project.description}<br>
                Responsável: ${project.responsible}<br>
                Data de Início: ${project.startDate}<br>
                Data de Término: ${project.endDate}<br>
                Status: ${project.status}<br>
                Orçamento: R$ ${project.budget}<br>
                <button onclick="removeProject(${index})">Remover</button>
            `;
            projectList.appendChild(li);
        });
    }

    window.removeProject = function(index) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
    }
});
