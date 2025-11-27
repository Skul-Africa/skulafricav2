import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SchoolTheme } from '@/hooks/useSchoolCustomization';

interface ThemeSelectorProps {
    data: SchoolTheme;
    update: (updates: Partial<SchoolTheme>) => void;
}

export function ThemeSelector({ data, update }: ThemeSelectorProps) {
    const themes = [
        { id: 'classic', name: 'Classic', description: 'Traditional and professional', color: 'bg-blue-900' },
        { id: 'minimal', name: 'Minimal', description: 'Clean and simple', color: 'bg-neutral-100' },
        { id: 'modern', name: 'Modern', description: 'Bold and contemporary', color: 'bg-indigo-600' },
        { id: 'dark', name: 'Dark', description: 'Sleek dark mode', color: 'bg-neutral-900' },
        { id: 'gradient', name: 'Gradient', description: 'Vibrant and dynamic', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    ];

    return (
        <div className="space-y-6">
            <RadioGroup value={data.mode} onValueChange={(value) => update({ mode: value as any })}>
                <div className="grid grid-cols-1 gap-4">
                    {themes.map((theme) => (
                        <div key={theme.id} className="flex items-center space-x-2 border border-neutral-800 p-4 rounded-lg hover:bg-neutral-800/50 transition-colors">
                            <RadioGroupItem value={theme.id} id={theme.id} />
                            <Label htmlFor={theme.id} className="flex-1 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-white">{theme.name}</div>
                                        <div className="text-sm text-neutral-400">{theme.description}</div>
                                    </div>
                                    <div className={`h-8 w-8 rounded-full border border-white/10 ${theme.color}`} />
                                </div>
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
