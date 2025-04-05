
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-visa-blue-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-visa-blue-800">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-visa-blue-700">Page Not Found</h2>
        <p className="mt-3 text-visa-blue-600 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="mt-6" 
          onClick={() => navigate("/dashboard")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
