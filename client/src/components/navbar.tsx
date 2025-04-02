import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/ui/logo";
import { 
  Bell, 
  Menu,
  X,
  Globe,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  // Liste des langues disponibles
  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'fr', name: t('languages.fr') }
  ];
  
  // Changer de langue
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { name: 'nav.home', path: "/" },
    { name: 'nav.discover', path: "/discover" },
    { name: 'nav.submit', path: "/submit-app" },
    { name: 'nav.leaderboard', path: "/leaderboard" },
  ];

  const getInitials = (name?: string) => {
    if (!name) return "BB";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`${
                    location === item.path
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>
          </div>
          {/* Sélecteur de langue */}
          <div className="hidden sm:flex sm:items-center sm:ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center p-1 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('common.language')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`cursor-pointer ${i18n.language === lang.code ? 'font-semibold text-primary' : ''}`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {user ? (
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <div className="points-badge bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium relative overflow-hidden">
                <span>{user.points} {t('common.points')}</span>
              </div>
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <span className="sr-only">Open user menu</span>
                  <Avatar>
                    <AvatarImage src={user.avatar || ""} alt={user.username} />
                    <AvatarFallback>{getInitials(user.name || user.username)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.name || user.username}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      {t('nav.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-apps" className="w-full cursor-pointer">
                      {t('nav.myApps')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link 
                href="/auth"
                className="text-primary hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.signin')}
              </Link>
              <Link 
                href="/auth"
                className="bg-primary hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.signup')}
              </Link>
            </div>
          )}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`${
                  location === item.path
                    ? "bg-indigo-50 border-primary text-primary"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            
            {/* Sélecteur de langue mobile */}
            <div className="border-t border-gray-200 pt-2">
              <div className="pl-3 pr-4 py-2 text-base font-medium text-gray-600">
                {t('common.language')}:
              </div>
              <div className="flex pl-3 pr-4 space-x-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      i18n.language === lang.code 
                        ? "bg-indigo-50 text-primary" 
                        : "text-gray-600"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user.avatar || ""} alt={user.username} />
                    <AvatarFallback>{getInitials(user.name || user.username)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name || user.username}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <div className="points-badge bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <span>{user.points} {t('common.points')}</span>
                  </div>
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link 
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-around">
                <Link 
                  href="/auth"
                  className="text-primary hover:text-indigo-700 px-4 py-2 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.signin')}
                </Link>
                <Link 
                  href="/auth"
                  className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}