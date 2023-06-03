export default function Logout({ logout }: any) {
  const handleClick = () => {
    logout(false);
    localStorage.clear();
  };
  return <h4 onClick={handleClick}>Logout</h4>;
}
