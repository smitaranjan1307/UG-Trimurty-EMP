// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBLB_tE5vkf8373niwfjYeariQrzy1PFoA",
  authDomain: "ug-trimurty.firebaseapp.com",
  databaseURL: "https://ug-trimurty-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ug-trimurty",
  storageBucket: "ug-trimurty.appspot.com",
  messagingSenderId: "497836541504",
  appId: "1:497836541504:web:0e5a4e28c7e430e8f601a5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Login credentials
const credentials = {
  admin: { id: "MTsahoo", password: "Sahoo@0791" },
  employee: { id: "muna", password: "muna@1307" }
};

document.getElementById('loginBtn').addEventListener('click', function() {
  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('loginMsg');

  if (userId === credentials.admin.id && password === credentials.admin.password) {
    msg.style.color = 'green';
    msg.innerText = 'Admin logged in!';
  }
  else if (userId === credentials.employee.id && password === credentials.employee.password) {
    msg.style.color = 'green';
    msg.innerText = 'Employee logged in!';
  }
  else {
    msg.style.color = 'red';
    msg.innerText = 'Invalid ID or Password';
  }
});

function markAttendance(userId, status) {
  const today = new Date().toISOString().split('T')[0];
  db.ref(`attendance/${userId}/${today}`).set({ status })
    .then(() => console.log('Attendance recorded!'))
    .catch(err => console.error(err));
}

function generatePDF(employeeName, data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(`Payroll Slip: ${employeeName}`, 10, 10);
  doc.text(JSON.stringify(data, null, 2), 10, 20);
  doc.save(`${employeeName}_Payroll.pdf`);
}
