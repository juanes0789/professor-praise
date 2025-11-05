import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap } from "lucide-react";

const Login = () => {
  const [alias, setAlias] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (storedAlias) {
      navigate("/profesores");
    }
  }, [navigate]);

  const generateRandomAlias = () => {
    return `Usuario${Math.floor(Math.random() * 10000)}`;
  };

  const handleLogin = () => {
    const finalAlias = alias.trim() || generateRandomAlias();
    localStorage.setItem("userAlias", finalAlias);
    navigate("/profesores");
  };

  const handleAnonymousLogin = () => {
    const randomAlias = generateRandomAlias();
    localStorage.setItem("userAlias", randomAlias);
    navigate("/profesores");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">RateMyProf</h1>
          <p className="text-muted-foreground">Califica y descubre a los mejores profesores</p>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="alias" className="text-sm font-medium text-card-foreground">
              Alias (opcional)
            </label>
            <Input
              id="alias"
              type="text"
              placeholder="Ingresa tu alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="transition-smooth"
            />
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
              size="lg"
            >
              Entrar con alias
            </Button>
            
            <Button 
              onClick={handleAnonymousLogin} 
              variant="outline"
              className="w-full transition-smooth"
              size="lg"
            >
              Entrar anónimamente
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Tu alias se guardará para futuras visitas
        </p>
      </div>
    </div>
  );
};

export default Login;
