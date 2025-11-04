import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">The dApp Factory</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it Works</a>
              <a href="https://github.com/DevGruGold/dappfactory/blob/main/README.md" className="text-sm hover:text-primary transition-colors">Docs</a>
            </nav>
            <Button onClick={() => window.location.href = 'https://maticdapps.vercel.app/'}>Get Started</Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it Works</a>
              <a href="https://github.com/DevGruGold/dappfactory/blob/main/README.md" className="text-sm hover:text-primary transition-colors">Docs</a>
              <Button className="w-full" onClick={() => window.location.href = 'https://maticdapps.vercel.app/'}>Get Started</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};