import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SchoolBranding } from '@/hooks/useSchoolCustomization';

interface BrandingEditorProps {
    data: SchoolBranding;
    update: (updates: Partial<SchoolBranding>) => void;
}

export function BrandingEditor({ data, update }: BrandingEditorProps) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                update({ [field]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>School Name</Label>
                    <Input
                        value={data.schoolName}
                        onChange={(e) => update({ schoolName: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Motto</Label>
                    <Input
                        value={data.motto}
                        onChange={(e) => update({ motto: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex gap-2">
                        <Input
                            type="color"
                            value={data.primaryColor}
                            onChange={(e) => update({ primaryColor: e.target.value })}
                            className="w-12 h-10 p-1 bg-neutral-800 border-neutral-700"
                        />
                        <Input
                            value={data.primaryColor}
                            onChange={(e) => update({ primaryColor: e.target.value })}
                            className="flex-1 bg-neutral-800 border-neutral-700"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex gap-2">
                        <Input
                            type="color"
                            value={data.secondaryColor}
                            onChange={(e) => update({ secondaryColor: e.target.value })}
                            className="w-12 h-10 p-1 bg-neutral-800 border-neutral-700"
                        />
                        <Input
                            value={data.secondaryColor}
                            onChange={(e) => update({ secondaryColor: e.target.value })}
                            className="flex-1 bg-neutral-800 border-neutral-700"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-2">
                        <Input
                            type="color"
                            value={data.accentColor || '#3b82f6'}
                            onChange={(e) => update({ accentColor: e.target.value })}
                            className="w-12 h-10 p-1 bg-neutral-800 border-neutral-700"
                        />
                        <Input
                            value={data.accentColor || '#3b82f6'}
                            onChange={(e) => update({ accentColor: e.target.value })}
                            className="flex-1 bg-neutral-800 border-neutral-700"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Font Style</Label>
                <Select value={data.fontStyle} onValueChange={(value) => update({ fontStyle: value })}>
                    <SelectTrigger className="bg-neutral-800 border-neutral-700">
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                        <SelectItem value="Inter">Inter (Modern)</SelectItem>
                        <SelectItem value="Roboto">Roboto (Classic)</SelectItem>
                        <SelectItem value="Outfit">Outfit (Bold)</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display (Elegant)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Logo</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'logo')}
                        className="bg-neutral-800 border-neutral-700"
                    />
                    {data.logo && (
                        <div className="mt-2 p-2 bg-white/10 rounded-md inline-block">
                            <img src={data.logo} alt="Logo Preview" className="h-12 object-contain" />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>Favicon</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'favicon')}
                        className="bg-neutral-800 border-neutral-700"
                    />
                    {data.favicon && (
                        <div className="mt-2 p-2 bg-white/10 rounded-md inline-block">
                            <img src={data.favicon} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
