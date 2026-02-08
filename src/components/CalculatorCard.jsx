import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function CalculatorCard({ title, description, icon: Icon, href, color = "blue" }) {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
        green: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
        purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
        orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Link
                to={href}
                className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300"
            >
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${colorClasses[color]} transition-colors duration-300`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
            </Link>
        </motion.div>
    );
}