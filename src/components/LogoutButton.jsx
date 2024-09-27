import '/src/css/logout.css'; 
export default function LogoutButton({ onLogout }) {
  return (
    <form onSubmit={onLogout}>
      <button class="Logoutbutton" type="submit">Log out</button>
    </form>
  );
}

