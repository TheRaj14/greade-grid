import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, GraduationCap, ArrowLeftRight, Shield, Zap, Globe } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function About() {
    const features = [
        {
            icon: GraduationCap,
            title: "Academic Tools",
            description: "Specialized GPA calculators designed for students to convert between SGPA, CGPA, and percentage formats."
        },
        {
            icon: ArrowLeftRight,
            title: "Unit Converters",
            description: "Comprehensive conversion tools for length, weight, time, and temperature with instant results."
        },
        {
            icon: Zap,
            title: "Instant Results",
            description: "Real-time calculations as you type, with no page reloads or waiting time."
        },
        {
            icon: Shield,
            title: "Formula Transparency",
            description: "Every calculation shows the formula used, so you understand exactly how your result was computed."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
                <PageHeader
                    title="About GradeGrid"
                    description="Your essential academic toolkit"
                />

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8 mb-6"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500">
                            <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        GradeGrid was created to provide students with a simple, fast, and accurate platform for essential academic and daily-use calculations. We believe that converting grades and units shouldn't require complex spreadsheets or confusing formulas.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid gap-4 sm:grid-cols-2 mb-6"
                >
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                        >
                            <div className="p-2 rounded-lg bg-blue-50 w-fit mb-3">
                                <feature.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6"
                >
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Important Disclaimer
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                        The GPA conversion formulas used in GradeGrid follow common standards (9.5 multiplier) used by many Indian universities. However, different institutions may use different conversion factors. Always verify with your university's official guidelines for accurate conversions. GradeGrid is intended as a helpful tool and should not be considered official documentation.
                    </p>
                </motion.div>

                {/* Version Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-gray-400">
                        GradeGrid v1.0
                    </p>
                </motion.div>
            </div>
        </div>
    );
}