'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSchoolCustomization } from '@/hooks/useSchoolCustomization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Save, Layout, Type, Image as ImageIcon, Palette, Globe, Phone, Link as LinkIcon } from 'lucide-react';

import { BrandingEditor } from './components/BrandingEditor';
import { HomepageEditor } from './components/HomepageEditor';
import { ThemeSelector } from './components/ThemeSelector';
import { ContactEditor } from './components/ContactEditor';
import { NavigationEditor } from './components/NavigationEditor';
import { PreviewPanel } from './components/PreviewPanel';

export default function AdminCustomizePage() {
    const params = useParams();
    const subdomain = params.subdomain as string;
    const {
        branding,
        homepage,
        visibility,
        theme,
        contact,
        navigation,
        footer,
        isLoaded,
        updateBranding,
        updateHomepage,
        updateVisibility,
        updateTheme,
        updateContact,
        updateNavigation,
        updateFooter,
    } = useSchoolCustomization(subdomain);

    const [activeTab, setActiveTab] = useState('branding');
    const [showPreview, setShowPreview] = useState(true);

    if (!isLoaded) {
        return <div className="p-8 text-center">Loading customization...</div>;
    }

    return (
        <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
            {/* Editor Panel */}
            <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col border-r border-neutral-800 transition-all duration-300`}>
                <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
                    <h1 className="text-xl font-bold">Website Customization</h1>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview(!showPreview)}
                            className="border-neutral-700 hover:bg-neutral-800"
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-5 bg-neutral-900 mb-6">
                            <TabsTrigger value="branding"><Palette className="h-4 w-4 mr-2" /> Branding</TabsTrigger>
                            <TabsTrigger value="homepage"><Layout className="h-4 w-4 mr-2" /> Homepage</TabsTrigger>
                            <TabsTrigger value="theme"><Type className="h-4 w-4 mr-2" /> Theme</TabsTrigger>
                            <TabsTrigger value="contact"><Phone className="h-4 w-4 mr-2" /> Contact</TabsTrigger>
                            <TabsTrigger value="navigation"><LinkIcon className="h-4 w-4 mr-2" /> Nav & Footer</TabsTrigger>
                        </TabsList>

                        <TabsContent value="branding" className="space-y-4">
                            <Card className="bg-neutral-900 border-neutral-800">
                                <CardHeader>
                                    <CardTitle>School Branding</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BrandingEditor data={branding} update={updateBranding} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="homepage" className="space-y-4">
                            <Card className="bg-neutral-900 border-neutral-800">
                                <CardHeader>
                                    <CardTitle>Homepage Content</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <HomepageEditor
                                        data={homepage}
                                        update={updateHomepage}
                                        visibility={visibility}
                                        updateVisibility={updateVisibility}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="theme" className="space-y-4">
                            <Card className="bg-neutral-900 border-neutral-800">
                                <CardHeader>
                                    <CardTitle>Theme Selection</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ThemeSelector data={theme} update={updateTheme} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="contact" className="space-y-4">
                            <Card className="bg-neutral-900 border-neutral-800">
                                <CardHeader>
                                    <CardTitle>Contact & Socials</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ContactEditor data={contact} update={updateContact} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="navigation" className="space-y-4">
                            <Card className="bg-neutral-900 border-neutral-800">
                                <CardHeader>
                                    <CardTitle>Navigation & Footer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <NavigationEditor
                                        nav={navigation}
                                        updateNav={updateNavigation}
                                        footer={footer}
                                        updateFooter={updateFooter}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Live Preview Panel */}
            {showPreview && (
                <div className="w-1/2 bg-neutral-100 text-black overflow-hidden relative border-l border-neutral-800">
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs z-50 pointer-events-none shadow-lg">
                        Live Preview
                    </div>
                    <div className="h-full w-full overflow-y-auto">
                        <PreviewPanel
                            branding={branding}
                            homepage={homepage}
                            visibility={visibility}
                            theme={theme}
                            contact={contact}
                            navigation={navigation}
                            footer={footer}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
