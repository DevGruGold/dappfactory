import { Mail, Phone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="mailto:xmrtsolutions@gmail.com"
              className="flex items-center gap-2 hover:text-primary transition-colors min-h-[44px] text-sm md:text-base"
            >
              <Mail className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="break-all">xmrtsolutions@gmail.com</span>
            </a>
            <a
              href="https://wa.me/50661500559"
              className="flex items-center gap-2 hover:text-primary transition-colors min-h-[44px] text-sm md:text-base"
            >
              <Phone className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
              <span>+506 6150 0559</span>
            </a>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-right">
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};