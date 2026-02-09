import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ResultDisplay from '@/components/ResultDisplay';

export default function Conversions() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'length';

    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [result, setResult] = useState(null);
    const [formula, setFormula] = useState('');

    const conversionData = {
        length: {
            title: 'Length Converter',
            description: 'Convert between different units of length and distance',
            units: [
                { value: 'meter', label: 'Meters (m)', toBase: 1 },
                { value: 'kilometer', label: 'Kilometers (km)', toBase: 1000 },
                { value: 'centimeter', label: 'Centimeters (cm)', toBase: 0.01 },
                { value: 'millimeter', label: 'Millimeters (mm)', toBase: 0.001 },
                { value: 'mile', label: 'Miles (mi)', toBase: 1609.344 },
                { value: 'yard', label: 'Yards (yd)', toBase: 0.9144 },
                { value: 'foot', label: 'Feet (ft)', toBase: 0.3048 },
                { value: 'inch', label: 'Inches (in)', toBase: 0.0254 }
            ],
            defaultFrom: 'meter',
            defaultTo: 'foot'
        },
        weight: {
            title: 'Weight Converter',
            description: 'Convert between different units of mass and weight',
            units: [
                { value: 'kilogram', label: 'Kilograms (kg)', toBase: 1 },
                { value: 'gram', label: 'Grams (g)', toBase: 0.001 },
                { value: 'milligram', label: 'Milligrams (mg)', toBase: 0.000001 },
                { value: 'pound', label: 'Pounds (lb)', toBase: 0.453592 },
                { value: 'ounce', label: 'Ounces (oz)', toBase: 0.0283495 },
                { value: 'ton', label: 'Metric Tons (t)', toBase: 1000 }
            ],
            defaultFrom: 'kilogram',
            defaultTo: 'pound'
        },
        time: {
            title: 'Time Converter',
            description: 'Convert between different units of time',
            units: [
                { value: 'second', label: 'Seconds (s)', toBase: 1 },
                { value: 'millisecond', label: 'Milliseconds (ms)', toBase: 0.001 },
                { value: 'minute', label: 'Minutes (min)', toBase: 60 },
                { value: 'hour', label: 'Hours (hr)', toBase: 3600 },
                { value: 'day', label: 'Days', toBase: 86400 },
                { value: 'week', label: 'Weeks', toBase: 604800 },
                { value: 'month', label: 'Months (avg)', toBase: 2629746 },
                { value: 'year', label: 'Years', toBase: 31556952 }
            ],
            defaultFrom: 'hour',
            defaultTo: 'minute'
        },
        temperature: {
            title: 'Temperature Converter',
            description: 'Convert between Celsius, Fahrenheit, and Kelvin',
            units: [
                { value: 'celsius', label: 'Celsius (°C)' },
                { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
                { value: 'kelvin', label: 'Kelvin (K)' }
            ],
            defaultFrom: 'celsius',
            defaultTo: 'fahrenheit',
            isTemperature: true
        }
    };

    const config = conversionData[type] || conversionData.length;

    useEffect(() => {
        setFromUnit(config.defaultFrom);
        setToUnit(config.defaultTo);
        setInputValue('');
        setResult(null);
        document.title = `${config.title} – GradeGrid`;
    }, [type, config.title]);

    useEffect(() => {
        if (inputValue && fromUnit && toUnit) {
            convert();
        } else {
            setResult(null);
        }
    }, [inputValue, fromUnit, toUnit]);

    const convertTemperature = (value, from, to) => {
        let celsius;

        // Convert to Celsius first
        switch (from) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5 / 9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }

        // Convert from Celsius to target
        let result;
        let formulaText;
        switch (to) {
            case 'celsius':
                result = celsius;
                break;
            case 'fahrenheit':
                result = celsius * 9 / 5 + 32;
                break;
            case 'kelvin':
                result = celsius + 273.15;
                break;
        }

        const formulas = {
            'celsius-fahrenheit': `°F = (°C × 9/5) + 32 = (${value} × 9/5) + 32`,
            'celsius-kelvin': `K = °C + 273.15 = ${value} + 273.15`,
            'fahrenheit-celsius': `°C = (°F - 32) × 5/9 = (${value} - 32) × 5/9`,
            'fahrenheit-kelvin': `K = (°F - 32) × 5/9 + 273.15`,
            'kelvin-celsius': `°C = K - 273.15 = ${value} - 273.15`,
            'kelvin-fahrenheit': `°F = (K - 273.15) × 9/5 + 32`
        };

        formulaText = formulas[`${from}-${to}`] || `${from} → ${to}`;

        return { result, formula: formulaText };
    };

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return;

        if (config.isTemperature) {
            const { result: tempResult, formula: tempFormula } = convertTemperature(value, fromUnit, toUnit);
            setResult(tempResult);
            setFormula(tempFormula);
        } else {
            const fromUnitData = config.units.find(u => u.value === fromUnit);
            const toUnitData = config.units.find(u => u.value === toUnit);

            if (!fromUnitData || !toUnitData) return;

            // Convert to base unit, then to target unit
            const baseValue = value * fromUnitData.toBase;
            const convertedValue = baseValue / toUnitData.toBase;

            setResult(convertedValue);
            setFormula(`${value} ${fromUnitData.label} = ${value} × ${fromUnitData.toBase} ÷ ${toUnitData.toBase} = ${convertedValue.toFixed(4)} ${toUnitData.label}`);
        }
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const getUnitSymbol = (unitValue) => {
        const unit = config.units.find(u => u.value === unitValue);
        if (!unit) return '';
        const match = unit.label.match(/\(([^)]+)\)/);
        return match ? match[1] : unit.label;
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
                    {/* Input Value */}
                    <div>
                        <Label className="text-sm text-gray-600">Value to Convert</Label>
                        <Input
                            type="number"
                            step="any"
                            placeholder="Enter a value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="mt-1.5 h-14 text-xl font-medium"
                        />
                    </div>

                    {/* Unit Selectors */}
                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex-1">
                            <Label className="text-sm text-gray-600">From</Label>
                            <Select value={fromUnit} onValueChange={setFromUnit}>
                                <SelectTrigger className="mt-1.5 h-12">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {config.units.map(unit => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <button
                            onClick={swapUnits}
                            className="mt-6 p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ArrowDownUp className="w-5 h-5 text-gray-600" />
                        </button>

                        <div className="flex-1">
                            <Label className="text-sm text-gray-600">To</Label>
                            <Select value={toUnit} onValueChange={setToUnit}>
                                <SelectTrigger className="mt-1.5 h-12">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {config.units.map(unit => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <ResultDisplay
                        result={result}
                        formula={formula}
                        label="Converted Value"
                        unit={getUnitSymbol(toUnit)}
                    />
                </motion.div>

                {/* Quick Reference */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800"
                >
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">Quick Reference</p>
                    <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                        {type === 'length' && (
                            <>
                                <li>• 1 meter = 3.281 feet</li>
                                <li>• 1 kilometer = 0.621 miles</li>
                                <li>• 1 inch = 2.54 centimeters</li>
                            </>
                        )}
                        {type === 'weight' && (
                            <>
                                <li>• 1 kilogram = 2.205 pounds</li>
                                <li>• 1 pound = 16 ounces</li>
                                <li>• 1 gram = 1000 milligrams</li>
                            </>
                        )}
                        {type === 'time' && (
                            <>
                                <li>• 1 hour = 60 minutes = 3600 seconds</li>
                                <li>• 1 day = 24 hours</li>
                                <li>• 1 week = 7 days</li>
                            </>
                        )}
                        {type === 'temperature' && (
                            <>
                                <li>• Water freezes: 0°C = 32°F = 273.15K</li>
                                <li>• Water boils: 100°C = 212°F = 373.15K</li>
                                <li>• Body temperature: 37°C = 98.6°F</li>
                            </>
                        )}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}