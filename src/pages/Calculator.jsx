import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calculator as CalcIcon, Plus, Trash2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ResultDisplay from '@/components/ResultDisplay';

export default function Calculator() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'sgpa-cgpa';

    const [result, setResult] = useState(null);
    const [formula, setFormula] = useState('');

    // SGPA to CGPA state
    const [sgpaValues, setSgpaValues] = useState(['']);

    // Single value inputs
    const [inputValue, setInputValue] = useState('');

    const calculatorConfig = {
        'sgpa-cgpa': {
            title: 'SGPA to CGPA Calculator',
            description: 'Calculate your Cumulative GPA from multiple semester GPAs weighted by credits',
            label: 'Your CGPA'
        },
        'cgpa-percent': {
            title: 'CGPA to Percentage Calculator',
            description: 'Convert your CGPA to percentage using the standard formula',
            label: 'Your Percentage',
            unit: '%'
        },
        'sgpa-percent': {
            title: 'SGPA to Percentage Calculator',
            description: 'Convert your Semester GPA directly to percentage',
            label: 'Your Percentage',
            unit: '%'
        },
        'percent-cgpa': {
            title: 'Percentage to CGPA Calculator',
            description: 'Convert your percentage marks to CGPA scale',
            label: 'Your CGPA'
        }
    };

    const config = calculatorConfig[type] || calculatorConfig['sgpa-cgpa'];

    useEffect(() => {
        setResult(null);
        setSgpaValues(['']);
        setInputValue('');
        document.title = `${config.title} – GradeGrid`;
    }, [type, config.title]);

    const addSemester = () => {
        setSgpaValues([...sgpaValues, '']);
    };

    const removeSemester = (index) => {
        if (sgpaValues.length > 1) {
            setSgpaValues(sgpaValues.filter((_, i) => i !== index));
        }
    };

    const updateSgpaValue = (index, value) => {
        const newValues = [...sgpaValues];
        newValues[index] = value;
        setSgpaValues(newValues);
    };

    const calculateSgpaToCgpa = () => {
        const validSgpas = sgpaValues
            .map(val => parseFloat(val))
            .filter(val => !isNaN(val) && val >= 0 && val <= 10);

        if (validSgpas.length === 0) return;

        const total = validSgpas.reduce((sum, sgpa) => sum + sgpa, 0);
        const cgpa = total / validSgpas.length;

        setResult(cgpa);
        setFormula(`CGPA = (${validSgpas.join(' + ')}) / ${validSgpas.length} = ${total.toFixed(2)} / ${validSgpas.length} = ${cgpa.toFixed(2)}`);
    };

    const calculateCgpaToPercent = () => {
        const cgpa = parseFloat(inputValue);
        if (isNaN(cgpa)) return;

        const percentage = cgpa * 9.5;
        setResult(percentage);
        setFormula(`Percentage = CGPA × 9.5 = ${cgpa} × 9.5 = ${percentage.toFixed(2)}%`);
    };

    const calculateSgpaToPercent = () => {
        const sgpa = parseFloat(inputValue);
        if (isNaN(sgpa)) return;

        const percentage = sgpa * 9.5;
        setResult(percentage);
        setFormula(`Percentage = SGPA × 9.5 = ${sgpa} × 9.5 = ${percentage.toFixed(2)}%`);
    };

    const calculatePercentToCgpa = () => {
        const percent = parseFloat(inputValue);
        if (isNaN(percent)) return;

        const cgpa = percent / 9.5;
        setResult(cgpa);
        setFormula(`CGPA = Percentage / 9.5 = ${percent} / 9.5 = ${cgpa.toFixed(2)}`);
    };

    const handleCalculate = () => {
        switch (type) {
            case 'sgpa-cgpa':
                calculateSgpaToCgpa();
                break;
            case 'cgpa-percent':
                calculateCgpaToPercent();
                break;
            case 'sgpa-percent':
                calculateSgpaToPercent();
                break;
            case 'percent-cgpa':
                calculatePercentToCgpa();
                break;
        }
    };

    const renderInputs = () => {
        if (type === 'sgpa-cgpa') {
            return (
                <div className="space-y-4">
                    {sgpaValues.map((sgpa, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex gap-4 items-end"
                        >
                            <div className="flex-1">
                                <Label className="text-sm text-gray-600">Semester {index + 1} SGPA (out of 10.0)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    placeholder="e.g., 8.5"
                                    value={sgpa}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 10)) {
                                            updateSgpaValue(index, val);
                                        }
                                    }}
                                    className="mt-1.5 h-14 text-xl font-medium"
                                />
                            </div>
                            {sgpaValues.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSemester(index)}
                                    className="h-14 w-14 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            )}
                        </motion.div>
                    ))}
                    <Button
                        variant="outline"
                        onClick={addSemester}
                        className="w-full h-12 border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Semester
                    </Button>
                </div>
            );
        }

        const inputLabels = {
            'cgpa-percent': { label: 'Enter your CGPA', placeholder: 'e.g., 8.5', max: 10 },
            'sgpa-percent': { label: 'Enter your SGPA', placeholder: 'e.g., 9.0', max: 10 },
            'percent-cgpa': { label: 'Enter your Percentage', placeholder: 'e.g., 85', max: 100 }
        };

        const inputConfig = inputLabels[type];

        return (
            <div>
                <Label className="text-sm text-gray-600">{inputConfig.label}</Label>
                <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max={inputConfig.max}
                    placeholder={inputConfig.placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mt-1.5 h-14 text-xl font-medium"
                />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
                <PageHeader
                    title={config.title}
                    description={config.description}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8"
                >
                    {renderInputs()}

                    <Button
                        onClick={handleCalculate}
                        className="w-full mt-6 h-14 text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl"
                    >
                        <CalcIcon className="w-5 h-5 mr-2" />
                        Calculate
                    </Button>

                    <ResultDisplay
                        result={result}
                        formula={formula}
                        label={config.label}
                        unit={config.unit}
                    />
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
                >
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>Note:</strong> {type === 'sgpa-cgpa'
                            ? 'All calculations assume a grading scale of 10.0. CGPA is calculated as the simple average of all semester SGPAs.'
                            : 'This calculator uses the standard formula (multiplier of 9.5) commonly used by Indian universities. Your institution may use a different conversion factor.'}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}