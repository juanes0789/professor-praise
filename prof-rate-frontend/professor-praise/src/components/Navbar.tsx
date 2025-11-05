import { GraduationCap, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const alias = localStorage.getItem("userAlias");

  const handleLogout = () => {
    localStorage.removeItem("userAlias");
    navigate("/login");
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">RateMyProf</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Usuario: <span className="font-medium text-foreground">{alias}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 transition-smooth"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
