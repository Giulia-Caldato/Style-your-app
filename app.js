const routes = {
  '/login': { templateId: 'login' },
  '/dashboard': { templateId: 'dashboard' }
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];
  
  if (!route) {
    return navigate('/login');
  }
  
  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  
  app.innerHTML = "";
  app.appendChild(view);
}

function navigate(path) {
    const location = path.startsWith('/') ? window.location.origin + path : path;
    window.history.pushState({}, path, location);
    updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

async function register(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);
  const response = await createAccount(jsonData);
  
  console.log(response);
}

async function createAccount(account) {
  const response = await fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: account
  });
  
  return await response.json();
}

window.onpopstate = () => updateRoute();
updateRoute();