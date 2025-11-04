import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between min-h-[48px]">
          <div className="flex items-center space-x-2">
            <Code2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <span className="text-base md:text-xl font-bold">The dApp Factory</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#features" className="text-sm hover:text-primary transition-colors min-h-[44px] flex items-center">Features</a>
              <a href="#how-it-works" className="text-sm hover:text-primary transition-colors min-h-[44px] flex items-center">How it Works</a>
              <a href="https://github.com/DevGruGold/dappfactory/blob/main/README.md" className="text-sm hover:text-primary transition-colors min-h-[44px] flex items-center">Docs</a>
            </nav>
            <Button onClick={() => window.location.href = 'https://maticdapps.vercel.app/'}>Get Started</Button>
          </div>

          <button 
            className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#features" 
                className="text-base hover:text-primary transition-colors py-3 min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-base hover:text-primary transition-colors py-3 min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                How it Works
              </a>
              <a 
                href="https://github.com/DevGruGold/dappfactory/blob/main/README.md" 
                className="text-base hover:text-primary transition-colors py-3 min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                Docs
              </a>
              <Button 
                className="w-full min-h-[48px] text-base" 
                onClick={() => {
                  handleNavClick();
                  window.location.href = 'https://maticdapps.vercel.app/';
                }}
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};