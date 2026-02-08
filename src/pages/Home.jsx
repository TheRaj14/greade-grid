import React, { useState } from 'react';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
    Search,
    GraduationCap,
    Percent,
    Calculator,
    ArrowLeftRight,
    Ruler,
    Scale,
    Clock,
    Thermometer,
    Info,
    Settings
} from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    const gpaTools = [
        {
            title: "SGPA to CGPA",
            description: "Convert your Semester GPA to Cumulative GPA across all semesters",
            icon: GraduationCap,
            href: createPageUrl('Calculator') + '?type=sgpa-cgpa',
            color: "blue"
        },
        {
            title: "CGPA to Percentage",
            description: "Convert your Cumulative GPA to percentage format",
            icon: Percent,
            href: createPageUrl('Calculator') + '?type=cgpa-percent',
            color: "green"
        },
        {
            title: "SGPA to Percentage",
            description: "Directly convert Semester GPA to percentage",
            icon: Calculator,
            href: createPageUrl('Calculator') + '?type=sgpa-percent',
            color: "purple"
        },
        {
            title: "Percentage to CGPA",
            description: "Convert percentage marks to CGPA scale",
            icon: ArrowLeftRight,
            href: createPageUrl('Calculator') + '?type=percent-cgpa',
            color: "orange"
        }
    ];

    const conversionTools = [
        {
            title: "Length Converter",
            description: "Convert between meters, feet, inches, kilometers, and more",
            icon: Ruler,
            href: createPageUrl('Conversions') + '?type=length',
            color: "blue"
        },
        {
            title: "Weight Converter",
            description: "Convert between kilograms, pounds, ounces, and grams",
            icon: Scale,
            href: createPageUrl('Conversions') + '?type=weight',
            color: "green"
        },
        {
            title: "Time Converter",
            description: "Convert between seconds, minutes, hours, and days",
            icon: Clock,
            href: createPageUrl('Conversions') + '?type=time',
            color: "purple"
        },
        {
            title: "Temperature Converter",
            description: "Convert between Celsius, Fahrenheit, and Kelvin",
            icon: Thermometer,
            href: createPageUrl('Conversions') + '?type=temperature',
            color: "orange"
        }
    ];

    const allTools = [...gpaTools, ...conversionTools];

    const filteredGpaTools = gpaTools.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredConversionTools = conversionTools.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 mb-6">
                            <Calculator className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            GradeGrid
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Your essential academic toolkit for GPA calculations and unit conversions
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 max-w-md mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search calculators and converters..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-6 text-base rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* GPA Calculators */}
                {filteredGpaTools.length > 0 && (
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-12"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-100">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">GPA Calculators</h2>
                        </motion.div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {filteredGpaTools.map((tool, index) => (
                                <motion.div key={tool.title} variants={itemVariants}>
                                    <CalculatorCard {...tool} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Conversion Tools */}
                {filteredConversionTools.length > 0 && (
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-emerald-100">
                                <ArrowLeftRight className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unit Converters</h2>
                        </motion.div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {filteredConversionTools.map((tool, index) => (
                                <motion.div key={tool.title} variants={itemVariants}>
                                    <CalculatorCard {...tool} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* No Results */}
                {filteredGpaTools.length === 0 && filteredConversionTools.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No calculators found for "{searchQuery}"</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}