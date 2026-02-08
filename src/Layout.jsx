import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calculator, Home, Info, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

export default function Layout({ children, currentPageName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        if (savedDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = (enabled) => {
        setDarkMode(enabled);
        localStorage.setItem('darkMode', enabled.toString());
        if (enabled) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navLinks = [
        { name: 'Home', icon: Home, page: 'Home' },
        { name: 'About', icon: Info, page: 'About' },
        { name: 'Settings', icon: Settings, page: 'Settings' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toaster position="top-center" richColors />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            to={createPageUrl('Home')}
                            className="flex items-center gap-2 group"
                        >
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 group-hover:shadow-lg transition-shadow">
                                <Calculator className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-lg">GradeGrid</span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden sm:flex items-center gap-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPageName === link.page
                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="sm:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
                        >
                            <nav className="p-4 space-y-1">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.page}
                                        to={createPageUrl(link.page)}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentPageName === link.page
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content */}
            <main>
                {React.cloneElement(children, { darkMode, toggleDarkMode })}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 mt-auto">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} GradeGrid. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                to={createPageUrl('About')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to={createPageUrl('Settings')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}