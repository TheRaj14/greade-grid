import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ResultDisplay({ result, formula, label, unit = "" }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${result}${unit}`);
        setCopied(true);
        toast.success('Result copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        const content = `GradeGrid Result\n\n${label}: ${result}${unit}\n\nFormula: ${formula}\n\nGenerated on: ${new Date().toLocaleString()}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gradegrid-result.txt';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Result exported');
    };

    return (
        <AnimatePresence mode="wait">
            {result !== null && result !== undefined && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="mt-8"
                >
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                        <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">{label}</p>
                        <p className="mt-2 text-4xl font-bold tracking-tight">
                            {typeof result === 'number' ? result.toFixed(2) : result}
                            {unit && <span className="text-2xl text-blue-200 ml-2">{unit}</span>}
                        </p>

                        <div className="mt-4 pt-4 border-t border-blue-500/30">
                            <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Formula Used</p>
                            <p className="text-sm text-blue-100 font-mono bg-blue-800/30 rounded-lg px-3 py-2">
                                {formula}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCopy}
                                className="bg-white/10 hover:bg-white/20 text-white border-0"
                            >
                                {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleExport}
                                className="bg-white/10 hover:bg-white/20 text-white border-0"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}