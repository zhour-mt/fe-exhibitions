import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-semibold bg-white text-gray-700 hover:text-gray-900"
    >
      Log out
    </button>
  );
}
