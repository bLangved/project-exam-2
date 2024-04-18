function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
}
export default logout;
