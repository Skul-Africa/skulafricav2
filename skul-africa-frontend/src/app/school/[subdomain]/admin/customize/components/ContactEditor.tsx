import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SchoolContact } from '@/hooks/useSchoolCustomization';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

interface ContactEditorProps {
    data: SchoolContact;
    update: (updates: Partial<SchoolContact>) => void;
}

export function ContactEditor({ data, update }: ContactEditorProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Contact Information</h3>
                <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Physical Address</Label>
                    <Input
                        value={data.address}
                        onChange={(e) => update({ address: e.target.value })}
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-800">
                <h3 className="text-lg font-medium text-white">Social Media Links</h3>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Facebook className="h-4 w-4" /> Facebook</Label>
                    <Input
                        value={data.socials.facebook}
                        onChange={(e) => update({ socials: { ...data.socials, facebook: e.target.value } })}
                        placeholder="https://facebook.com/..."
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Instagram</Label>
                    <Input
                        value={data.socials.instagram}
                        onChange={(e) => update({ socials: { ...data.socials, instagram: e.target.value } })}
                        placeholder="https://instagram.com/..."
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter / X</Label>
                    <Input
                        value={data.socials.twitter}
                        onChange={(e) => update({ socials: { ...data.socials, twitter: e.target.value } })}
                        placeholder="https://twitter.com/..."
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp</Label>
                    <Input
                        value={data.socials.whatsapp}
                        onChange={(e) => update({ socials: { ...data.socials, whatsapp: e.target.value } })}
                        placeholder="WhatsApp Number"
                        className="bg-neutral-800 border-neutral-700"
                    />
                </div>
            </div>
        </div>
    );
}
