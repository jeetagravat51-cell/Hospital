let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let hospital = localStorage.getItem("hospital") || "Hospital";

hospitalTitle.innerText = hospital;

let pEdit = -1,
  dEdit = -1,
  aEdit = -1;

function showSection(id) {
  document
    .querySelectorAll(".section")
    .forEach((s) => (s.style.display = "none"));
  document.getElementById(id).style.display = "block";
  updateDashboard();
}

/* Dashboard */
function updateDashboard() {
  pCount.innerText = patients.length;
  dCount.innerText = doctors.length;
  aCount.innerText = appointments.length;
}

/* Patients */
function addPatient() {
  if (!pid.value || !pname.value || !pgender.value)
    return alert("Fill all details");

  let p = {
    id: pid.value,
    name: pname.value,
    age: page.value,
    gender: pgender.value,
    phone: pphone.value
  };

  if (pEdit == -1) patients.push(p);
  else {
    patients[pEdit] = p;
    pEdit = -1;
  }

  localStorage.setItem("patients", JSON.stringify(patients));
  displayPatients();
}

function displayPatients(list = patients) {
  patientTable.innerHTML =
    "<tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Action</th></tr>";

  list.forEach((p, i) => {
    patientTable.innerHTML += `
    <tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.phone}</td>
      <td>
        <button onclick="editPatient(${i})">Edit</button>
        <button onclick="deletePatient(${i})" style="background:red">Delete</button>
      </td>
    </tr>`;
  });
}

function searchPatient() {
  let k = pSearch.value.toLowerCase();
  displayPatients(patients.filter((p) => p.name.toLowerCase().includes(k)));
}

function editPatient(i) {
  let p = patients[i];
  pid.value = p.id;
  pname.value = p.name;
  page.value = p.age;
  pgender.value = p.gender;
  pphone.value = p.phone;
  pEdit = i;
}

function deletePatient(i) {
  if (confirm("Delete patient?")) {
    patients.splice(i, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients();
  }
}

/* Doctors */
function addDoctor() {
  let d = { id: did.value, name: dname.value, dept: dept.value };
  if (dEdit == -1) doctors.push(d);
  else {
    doctors[dEdit] = d;
    dEdit = -1;
  }
  localStorage.setItem("doctors", JSON.stringify(doctors));
  displayDoctors();
}

function displayDoctors() {
  doctorTable.innerHTML =
    "<tr><th>ID</th><th>Name</th><th>Dept</th><th>Action</th></tr>";
  doctors.forEach((d, i) => {
    doctorTable.innerHTML += `
    <tr>
      <td>${d.id}</td>
      <td>${d.name}</td>
      <td>${d.dept}</td>
      <td>
        <button onclick="editDoctor(${i})">Edit</button>
        <button onclick="deleteDoctor(${i})" style="background:red">Delete</button>
      </td>
    </tr>`;
  });
}

function editDoctor(i) {
  let d = doctors[i];
  did.value = d.id;
  dname.value = d.name;
  dept.value = d.dept;
  dEdit = i;
}

function deleteDoctor(i) {
  doctors.splice(i, 1);
  localStorage.setItem("doctors", JSON.stringify(doctors));
  displayDoctors();
}

/* Appointments */
function addAppointment() {
  let a = {
    id: aid.value,
    pid: apid.value,
    did: adid.value,
    date: adate.value
  };
  if (aEdit == -1) appointments.push(a);
  else {
    appointments[aEdit] = a;
    aEdit = -1;
  }
  localStorage.setItem("appointments", JSON.stringify(appointments));
  displayAppointments();
}

function displayAppointments() {
  appointmentTable.innerHTML =
    "<tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Action</th></tr>";
  appointments.forEach((a, i) => {
    appointmentTable.innerHTML += `
    <tr>
      <td>${a.id}</td>
      <td>${a.pid}</td>
      <td>${a.did}</td>
      <td>${a.date}</td>
      <td>
        <button onclick="editAppointment(${i})">Edit</button>
        <button onclick="deleteAppointment(${i})" style="background:red">Delete</button>
      </td>
    </tr>`;
  });
}

function editAppointment(i) {
  let a = appointments[i];
  aid.value = a.id;
  apid.value = a.pid;
  adid.value = a.did;
  adate.value = a.date;
  aEdit = i;
}

function deleteAppointment(i) {
  appointments.splice(i, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  displayAppointments();
}

/* Billing */
function generateBill() {
  let p = patients.find((x) => x.id === billPid.value);
  if (!p) return alert("Patient not found");
  let total =
    Number(docFee.value) + Number(medFee.value) + Number(roomFee.value);
  billArea.innerHTML = `<h3>${hospitalTitle.innerText}</h3>
  <p>Patient: ${p.name}</p>
  <p>Total: ₹${total}</p>
  <button onclick="window.print()">Print</button>`;
}

/* Load */
displayPatients();
displayDoctors();
displayAppointments();
updateDashboard();
