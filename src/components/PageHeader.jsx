import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, description, showBack = true }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
        >
            {showBack && (
                <Link
                    to={createPageUrl('Home')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
            {description && (
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl">{description}</p>
            )}
        </motion.div>
    );
}