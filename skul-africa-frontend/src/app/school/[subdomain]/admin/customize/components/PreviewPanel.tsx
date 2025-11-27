import { SchoolBranding, HomepageContent, HomepageVisibility, SchoolTheme, SchoolContact, SchoolNavigation, SchoolFooter } from '@/hooks/useSchoolCustomization';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Menu } from 'lucide-react';

interface PreviewPanelProps {
    branding: SchoolBranding;
    homepage: HomepageContent;
    visibility: HomepageVisibility;
    theme: SchoolTheme;
    contact: SchoolContact;
    navigation: SchoolNavigation;
    footer: SchoolFooter;
}

export function PreviewPanel({ branding, homepage, visibility, theme, contact, navigation, footer }: PreviewPanelProps) {
    // Theme classes mapping
    const getThemeClasses = () => {
        switch (theme.mode) {
            case 'dark': return 'bg-neutral-950 text-white';
            case 'minimal': return 'bg-white text-neutral-900 font-light';
            case 'classic': return 'bg-slate-50 text-slate-900 font-serif';
            case 'modern': return 'bg-white text-neutral-900';
            case 'gradient': return 'bg-white text-neutral-900';
            default: return 'bg-white text-neutral-900';
        }
    };

    const getPrimaryColor = () => branding.primaryColor || '#000000';
    const getSecondaryColor = () => branding.secondaryColor || '#ffffff';
    const getAccentColor = () => branding.accentColor || '#3b82f6';

    return (
        <div className={`min-h-full w-full ${getThemeClasses()}`} style={{ fontFamily: branding.fontStyle }}>
            {/* Navigation */}
            <header className="sticky top-0 z-40 w-full border-b bg-opacity-90 backdrop-blur" style={{ borderColor: `${getPrimaryColor()}20`, backgroundColor: theme.mode === 'dark' ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}>
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {branding.logo ? (
                            <img src={branding.logo} alt="Logo" className="h-8 w-auto" />
                        ) : (
                            <div className="h-8 w-8 rounded bg-primary" style={{ backgroundColor: getPrimaryColor() }} />
                        )}
                        <span className="font-bold text-xl">{branding.schoolName || 'School Name'}</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.links.map(link => (
                            <a key={link.id} href={link.href} className="text-sm font-medium hover:opacity-70 transition-opacity">
                                {link.label}
                            </a>
                        ))}
                        <Button size="sm" style={{ backgroundColor: getAccentColor(), color: '#ffffff' }}>
                            Apply Now
                        </Button>
                    </nav>
                    <div className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            {visibility.hero && (
                <section className="relative py-20 md:py-32 overflow-hidden">
                    {homepage.hero.bgImage && (
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${homepage.hero.bgImage})` }}
                        >
                            <div className={`absolute inset-0 ${theme.mode === 'dark' ? 'bg-black/70' : 'bg-black/50'}`} />
                        </div>
                    )}
                    <div className="container relative z-10 mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: homepage.hero.bgImage ? 'white' : 'inherit' }}>
                            {homepage.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90" style={{ color: homepage.hero.bgImage ? 'rgba(255,255,255,0.9)' : 'inherit' }}>
                            {homepage.hero.subtitle}
                        </p>
                        <Button
                            size="lg"
                            className="text-lg px-8"
                            style={{ backgroundColor: getAccentColor(), color: '#ffffff' }}
                        >
                            {homepage.hero.ctaText}
                        </Button>
                    </div>
                </section>
            )}

            {/* About Section */}
            {visibility.about && (
                <section className="py-16 md:py-24" id="about">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6" style={{ color: getPrimaryColor() }}>About Us</h2>
                                <p className="text-lg mb-6 opacity-80 leading-relaxed">
                                    {homepage.about.description}
                                </p>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border" style={{ borderColor: `${getPrimaryColor()}20` }}>
                                        <h3 className="font-bold mb-2">Our Vision</h3>
                                        <p className="opacity-80">{homepage.about.vision}</p>
                                    </div>
                                    <div className="p-4 rounded-lg border" style={{ borderColor: `${getPrimaryColor()}20` }}>
                                        <h3 className="font-bold mb-2">Our Mission</h3>
                                        <p className="opacity-80">{homepage.about.mission}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-neutral-100">
                                {homepage.about.image ? (
                                    <img src={homepage.about.image} alt="About" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                                        No Image Uploaded
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Academics Section */}
            {visibility.academics && (
                <section className={`py-16 md:py-24 ${theme.mode === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`} id="academics">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4" style={{ color: getPrimaryColor() }}>Academic Programs</h2>
                            <p className="opacity-70 max-w-2xl mx-auto">Discover the wide range of educational programs we offer to nurture every student's potential.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {homepage.academics.length > 0 ? (
                                homepage.academics.map(program => (
                                    <div key={program.id} className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${theme.mode === 'dark' ? 'bg-neutral-800' : 'bg-white'}`}>
                                        <div className="h-48 bg-neutral-200 relative">
                                            {program.image && <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                                            <p className="opacity-70 text-sm">{program.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12 opacity-50 border-2 border-dashed rounded-xl">
                                    No academic programs added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {visibility.contact && (
                <section className="py-16 md:py-24" id="contact">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6" style={{ color: getPrimaryColor() }}>Get in Touch</h2>
                                <p className="opacity-80 mb-8">Have questions? We'd love to hear from you. Reach out to us using the contact details below.</p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-opacity-10" style={{ backgroundColor: `${getPrimaryColor()}20`, color: getPrimaryColor() }}>
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">Email Us</h3>
                                            <p className="opacity-70">{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-opacity-10" style={{ backgroundColor: `${getPrimaryColor()}20`, color: getPrimaryColor() }}>
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">Call Us</h3>
                                            <p className="opacity-70">{contact.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-full bg-opacity-10" style={{ backgroundColor: `${getPrimaryColor()}20`, color: getPrimaryColor() }}>
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">Visit Us</h3>
                                            <p className="opacity-70">{contact.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    {contact.socials.facebook && <Facebook className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />}
                                    {contact.socials.instagram && <Instagram className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />}
                                    {contact.socials.twitter && <Twitter className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" />}
                                </div>
                            </div>

                            <div className={`p-8 rounded-2xl ${theme.mode === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium opacity-70">First Name</label>
                                            <input className={`w-full p-3 rounded-lg border bg-transparent ${theme.mode === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium opacity-70">Last Name</label>
                                            <input className={`w-full p-3 rounded-lg border bg-transparent ${theme.mode === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium opacity-70">Email</label>
                                        <input className={`w-full p-3 rounded-lg border bg-transparent ${theme.mode === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium opacity-70">Message</label>
                                        <textarea className={`w-full p-3 rounded-lg border bg-transparent h-32 ${theme.mode === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`} />
                                    </div>
                                    <Button className="w-full" style={{ backgroundColor: getPrimaryColor(), color: getSecondaryColor() }}>
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className={`py-12 border-t ${theme.mode === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {branding.logo && <img src={branding.logo} alt="Logo" className="h-8 w-auto opacity-80" />}
                        <span className="font-bold text-xl opacity-90">{branding.schoolName}</span>
                    </div>
                    <p className="opacity-60 mb-6 max-w-md mx-auto">{footer.text}</p>
                    <div className="flex justify-center gap-6 mb-8 text-sm font-medium opacity-70">
                        {navigation.links.map(link => (
                            <a key={link.id} href={link.href} className="hover:opacity-100">{link.label}</a>
                        ))}
                    </div>
                    <p className="text-sm opacity-50">{footer.copyright}</p>
                </div>
            </footer>
        </div>
    );
}
