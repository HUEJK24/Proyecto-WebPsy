let appointments = [];
let editingIndex = -1;

// Manejo del modal
function openModal(action, index = -1) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modalTitle');
    const editForm = document.getElementById('editForm');

    if (action === 'edit') {
        modalTitle.innerText = 'Editar Cita';
        loadAppointmentData(index);
        editingIndex = index;
    } else {
        modalTitle.innerText = 'Añadir Nueva Cita';
        editForm.reset();
        editingIndex = -1;
    }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function loadAppointmentData(index) {
    const appointment = appointments[index];
    document.getElementById('appointmentId').value = index;
    document.getElementById('name').value = appointment.name;
    document.getElementById('date').value = appointment.date;
    document.getElementById('status').value = appointment.status;
    document.getElementById('subject').value = appointment.subject;
    document.getElementById('reason').value = appointment.reason;
    document.getElementById('requestStatus').value = appointment.requestStatus;
}

function saveAppointment(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;
    const subject = document.getElementById('subject').value;
    const reason = document.getElementById('reason').value;
    const requestStatus = document.getElementById('requestStatus').value;

    const appointment = {
        name,
        date,
        status,
        subject,
        reason,
        requestStatus
    };

    if (editingIndex === -1) {
        appointments.push(appointment);
    } else {
        appointments[editingIndex] = appointment;
    }

    renderAppointments();
    closeModal();
}

function renderAppointments() {
    const appointmentsContainer = document.getElementById('appointments');
    appointmentsContainer.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'appointment-card';
        appointmentCard.innerHTML = `
            <h3><b>${appointment.name}</b></h3>
            <p><b>Fecha:</b> ${appointment.date}</p>
            <p><b>Estado:</b> ${appointment.status}</p>
            <p><b>Asunto:</b> ${appointment.subject}</p>
            <p><b>Motivo:</b> ${appointment.reason}</p>
            <p><b>Estado de la solicitud:</b> ${appointment.requestStatus}</p>
            <button onclick="openModal('edit', ${index})">Editar</button>
            <button onclick="deleteAppointment(${index})">Eliminar</button>
        `;
        appointmentsContainer.appendChild(appointmentCard);
    });
}

function deleteAppointment(index) {
    appointments.splice(index, 1);
    renderAppointments();
}

// Menú deslizante
function openNav() {
    document.getElementById("mySideMenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideMenu").style.width = "0";
}

// Manejar dropdowns del menú lateral
function toggleDropdown(event) {
    const button = event.target;
    const dropdown = button.nextElementSibling;

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

// Parte 2 del menú
function openMenu() {
    const sideMenu = document.getElementById("side-menu");
    sideMenu.classList.add("open");
    sideMenu.classList.remove("close");
}

function closeMenu() {
    const sideMenu = document.getElementById("side-menu");
    sideMenu.classList.add("close");
    sideMenu.classList.remove("open");
}

document.addEventListener('DOMContentLoaded', (event) => {
    const openBtn = document.querySelector('.open-btn');
    const closeBtn = document.querySelector('.close-btn');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDropdown);
    });
});
