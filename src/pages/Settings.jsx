import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Download, FileText, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import PageHeader from '@/components/PageHeader';

export default function Settings({ darkMode, toggleDarkMode }) {
    const [exportFormat, setExportFormat] = useState('txt');

    const handleToggleDarkMode = (enabled) => {
        if (toggleDarkMode) {
            toggleDarkMode(enabled);
            toast.success(`${enabled ? 'Dark' : 'Light'} mode enabled`);
        }
    };

    const handleExportSample = () => {
        const content = exportFormat === 'txt'
            ? `GradeGrid Sample Export\n\nThis is a sample export file.\nYour calculation results will appear here.\n\nExport Format: ${exportFormat.toUpperCase()}\nDate: ${new Date().toLocaleString()}`
            : `Result,Formula,Date\n"Sample Result","Sample Formula","${new Date().toLocaleString()}"`;

        const blob = new Blob([content], { type: exportFormat === 'txt' ? 'text/plain' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `gradegrid-sample.${exportFormat}`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Sample file exported');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
                <PageHeader
                    title="Settings"
                    description="Customize your GradeGrid experience"
                />

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6"
                >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {darkMode ? (
                                <Moon className="w-5 h-5 text-blue-500" />
                            ) : (
                                <Sun className="w-5 h-5 text-amber-500" />
                            )}
                            <div>
                                <Label className="text-gray-900 dark:text-white font-medium">Dark Mode</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                            </div>
                        </div>
                        <Switch
                            checked={darkMode}
                            onCheckedChange={handleToggleDarkMode}
                        />
                    </div>
                </motion.div>

                {/* Export Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6"
                >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-900 dark:text-white font-medium mb-2 block">Default Export Format</Label>
                            <Select value={exportFormat} onValueChange={setExportFormat}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="txt">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Text File (.txt)
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="csv">
                                        <div className="flex items-center gap-2">
                                            <FileSpreadsheet className="w-4 h-4" />
                                            CSV File (.csv)
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleExportSample}
                            className="w-full h-12"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Sample File
                        </Button>
                    </div>
                </motion.div>

                {/* About */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 p-6"
                >
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">GradeGrid v1.0</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Built to help students calculate and convert academic results with ease and accuracy.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}