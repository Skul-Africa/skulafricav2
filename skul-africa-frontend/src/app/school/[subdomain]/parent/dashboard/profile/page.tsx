'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { User, Mail, Phone, Save } from 'lucide-react';

export default function ParentProfilePage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [parent, setParent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    relationship: '',
  });

  useEffect(() => {
    const currentParent = JSON.parse(localStorage.getItem(`${subdomain}-current-parent`) || 'null');
    if (currentParent) {
      setParent(currentParent);
      setFormData({
        firstName: currentParent.firstName || '',
        lastName: currentParent.lastName || '',
        email: currentParent.email || '',
        phone: currentParent.phone || '',
        relationship: currentParent.relationship || '',
      });
    }
  }, [subdomain]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!parent) return;

    const updatedParent = { ...parent, ...formData };
    setParent(updatedParent);

    // Update in localStorage
    localStorage.setItem(`${subdomain}-current-parent`, JSON.stringify(updatedParent));

    // Update in parents list
    const parents = JSON.parse(localStorage.getItem(`${subdomain}-parents`) || '[]');
    const updatedParents = parents.map((p: any) =>
      p.id === parent.id ? updatedParent : p
    );
    localStorage.setItem(`${subdomain}-parents`, JSON.stringify(updatedParents));

    setIsEditing(false);
  };

  if (!parent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-neutral-400">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {parent.firstName} {parent.lastName}
                </h3>
                <p className="text-neutral-400 mb-2">{parent.relationship}</p>
                <p className="text-neutral-400 text-sm">Parent Portal</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Personal Information</CardTitle>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <User className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{parent.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <User className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{parent.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-400 mr-3" />
                    <span className="text-white">{parent.email}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <Phone className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{parent.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Relationship
                  </label>
                  {isEditing ? (
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
                      className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 focus:border-primary"
                    >
                      <option value="Parent">Parent</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <User className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{parent.relationship || 'Parent'}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}