import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SchoolNavigation, SchoolFooter } from '@/hooks/useSchoolCustomization';
import { Plus, Trash } from 'lucide-react';

interface NavigationEditorProps {
    nav: SchoolNavigation;
    updateNav: (updates: Partial<SchoolNavigation>) => void;
    footer: SchoolFooter;
    updateFooter: (updates: Partial<SchoolFooter>) => void;
}

export function NavigationEditor({ nav, updateNav, footer, updateFooter }: NavigationEditorProps) {
    const addLink = () => {
        const newLink = {
            id: Date.now().toString(),
            label: 'New Link',
            href: '#',
        };
        updateNav({ links: [...nav.links, newLink] });
    };

    const updateLink = (id: string, field: string, value: string) => {
        const updatedLinks = nav.links.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        );
        updateNav({ links: updatedLinks });
    };

    const removeLink = (id: string) => {
        updateNav({ links: nav.links.filter(link => link.id !== id) });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Menu Links</h3>
                <div className="space-y-3">
                    {nav.links.map((link) => (
                        <div key={link.id} className="flex gap-2 items-start">
                            <div className="grid grid-cols-2 gap-2 flex-1">
                                <Input
                                    value={link.label}
                                    onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                                    placeholder="Label"
                                    className="bg-neutral-800 border-neutral-700"
                                />
                                <Input
                                    value={link.href}
                                    onChange={(e) => updateLink(link.id, 'href', e.target.value)}
                                    placeholder="URL / Section ID"
                                    className="bg-neutral-800 border-neutral-700"
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeLink(link.id)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addLink} className="w-full border-dashed border-neutral-700 hover:bg-neutral-800" variant="outline">
                        <Plus className="h-4 w-4 mr-2" /> Add Menu Link
                    </Button>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-800">
                <h3 className="text-lg font-medium text-white">Footer Content</h3>
                <div className="space-y-2">
                    <Label>Footer Text</Label>
                    <Input
                        value={footer.text}
                        onChange={(e) => updateFooter({ text: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Copyright Text</Label>
                    <Input
                        value={footer.copyright}
                        onChange={(e) => updateFooter({ copyright: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
            </div>
        </div>
    );
}
