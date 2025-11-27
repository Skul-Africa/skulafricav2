import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HomepageContent, HomepageVisibility } from '@/hooks/useSchoolCustomization';
import { Plus, Trash, Image as ImageIcon } from 'lucide-react';

interface HomepageEditorProps {
    data: HomepageContent;
    update: (updates: Partial<HomepageContent>) => void;
    visibility: HomepageVisibility;
    updateVisibility: (updates: Partial<HomepageVisibility>) => void;
}

export function HomepageEditor({ data, update, visibility, updateVisibility }: HomepageEditorProps) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'about', field: 'bgImage' | 'image') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (section === 'hero') {
                    update({ hero: { ...data.hero, [field]: reader.result as string } });
                } else {
                    update({ about: { ...data.about, [field]: reader.result as string } });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const addAcademicProgram = () => {
        const newProgram = {
            id: Date.now().toString(),
            title: 'New Program',
            description: 'Program description',
            image: '',
        };
        update({ academics: [...data.academics, newProgram] });
    };

    const updateAcademicProgram = (id: string, field: string, value: string) => {
        const updatedAcademics = data.academics.map(prog =>
            prog.id === id ? { ...prog, [field]: value } : prog
        );
        update({ academics: updatedAcademics });
    };

    const removeAcademicProgram = (id: string) => {
        update({ academics: data.academics.filter(prog => prog.id !== id) });
    };

    return (
        <Accordion type="single" collapsible className="w-full">
            {/* Hero Section */}
            <AccordionItem value="hero" className="border-neutral-800">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                        <span>Hero Section</span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-neutral-400">{visibility.hero ? 'Visible' : 'Hidden'}</span>
                            <Switch
                                checked={visibility.hero}
                                onCheckedChange={(checked) => updateVisibility({ hero: checked })}
                            />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            value={data.hero.title}
                            onChange={(e) => update({ hero: { ...data.hero, title: e.target.value } })}
                            className="bg-neutral-800 border-neutral-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Textarea
                            value={data.hero.subtitle}
                            onChange={(e) => update({ hero: { ...data.hero, subtitle: e.target.value } })}
                            className="bg-neutral-800 border-neutral-700"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>CTA Text</Label>
                            <Input
                                value={data.hero.ctaText}
                                onChange={(e) => update({ hero: { ...data.hero, ctaText: e.target.value } })}
                                className="bg-neutral-800 border-neutral-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>CTA Link</Label>
                            <Input
                                value={data.hero.ctaLink}
                                onChange={(e) => update({ hero: { ...data.hero, ctaLink: e.target.value } })}
                                className="bg-neutral-800 border-neutral-700"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Background Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'hero', 'bgImage')}
                            className="bg-neutral-800 border-neutral-700"
                        />
                        {data.hero.bgImage && (
                            <div className="mt-2 h-32 w-full bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${data.hero.bgImage})` }} />
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* About Section */}
            <AccordionItem value="about" className="border-neutral-800">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                        <span>About Section</span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-neutral-400">{visibility.about ? 'Visible' : 'Hidden'}</span>
                            <Switch
                                checked={visibility.about}
                                onCheckedChange={(checked) => updateVisibility({ about: checked })}
                            />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={data.about.description}
                            onChange={(e) => update({ about: { ...data.about, description: e.target.value } })}
                            className="bg-neutral-800 border-neutral-700 h-24"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Vision</Label>
                        <Input
                            value={data.about.vision}
                            onChange={(e) => update({ about: { ...data.about, vision: e.target.value } })}
                            className="bg-neutral-800 border-neutral-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Mission</Label>
                        <Input
                            value={data.about.mission}
                            onChange={(e) => update({ about: { ...data.about, mission: e.target.value } })}
                            className="bg-neutral-800 border-neutral-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>About Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'about', 'image')}
                            className="bg-neutral-800 border-neutral-700"
                        />
                        {data.about.image && (
                            <div className="mt-2 h-32 w-full bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${data.about.image})` }} />
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* Academics Section */}
            <AccordionItem value="academics" className="border-neutral-800">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                        <span>Academics Section</span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-neutral-400">{visibility.academics ? 'Visible' : 'Hidden'}</span>
                            <Switch
                                checked={visibility.academics}
                                onCheckedChange={(checked) => updateVisibility({ academics: checked })}
                            />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    {data.academics.map((program, index) => (
                        <div key={program.id} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-800 space-y-3">
                            <div className="flex justify-between items-start">
                                <Label>Program {index + 1}</Label>
                                <Button variant="ghost" size="sm" onClick={() => removeAcademicProgram(program.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Input
                                value={program.title}
                                onChange={(e) => updateAcademicProgram(program.id, 'title', e.target.value)}
                                placeholder="Program Title"
                                className="bg-neutral-800 border-neutral-700"
                            />
                            <Textarea
                                value={program.description}
                                onChange={(e) => updateAcademicProgram(program.id, 'description', e.target.value)}
                                placeholder="Description"
                                className="bg-neutral-800 border-neutral-700"
                            />
                        </div>
                    ))}
                    <Button onClick={addAcademicProgram} className="w-full border-dashed border-neutral-700 hover:bg-neutral-800" variant="outline">
                        <Plus className="h-4 w-4 mr-2" /> Add Academic Program
                    </Button>
                </AccordionContent>
            </AccordionItem>

            {/* Gallery & Testimonials placeholders for brevity, can expand if needed */}
            <AccordionItem value="gallery" className="border-neutral-800">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                        <span>Gallery Section</span>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <span className="text-xs text-neutral-400">{visibility.gallery ? 'Visible' : 'Hidden'}</span>
                            <Switch
                                checked={visibility.gallery}
                                onCheckedChange={(checked) => updateVisibility({ gallery: checked })}
                            />
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                    <p className="text-neutral-400 text-sm">Gallery management coming soon...</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
