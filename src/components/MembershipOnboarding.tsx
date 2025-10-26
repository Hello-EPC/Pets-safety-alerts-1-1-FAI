import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface FormData {
  petName: string;
  petType: string;
  breed: string;
  age: string;
  weight: string;
  microchipNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  vetClinicName: string;
  vetPhone: string;
  vetAddress: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
}

export const MembershipOnboarding: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    petName: '', petType: 'dog', breed: '', age: '', weight: '', microchipNumber: '',
    emergencyContactName: '', emergencyContactPhone: '', emergencyContactRelation: '',
    vetClinicName: '', vetPhone: '', vetAddress: '',
    medicalConditions: '', medications: '', allergies: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to complete membership",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Add pet information
      const { data: petData, error: petError } = await supabase.functions.invoke('handle-pet-operations', {
        body: {
          action: 'add-pet',
          data: {
            name: formData.petName,
            species: formData.petType,
            breed: formData.breed,
            age: parseInt(formData.age) || null,
            weight: parseFloat(formData.weight) || null,
            microchip_number: formData.microchipNumber,
            medical_conditions: formData.medicalConditions,
            medications: formData.medications,
            allergies: formData.allergies
          }
        }
      });

      if (petError) throw petError;

      // Add emergency contact
      const { error: contactError } = await supabase.functions.invoke('handle-pet-operations', {
        body: {
          action: 'add-emergency-contact',
          data: {
            name: formData.emergencyContactName,
            phone: formData.emergencyContactPhone,
            relationship: formData.emergencyContactRelation,
            is_primary: true
          }
        }
      });

      if (contactError) throw contactError;

      // Add vet info
      const { error: vetError } = await supabase.functions.invoke('handle-pet-operations', {
        body: {
          action: 'add-vet-info',
          data: {
            clinic_name: formData.vetClinicName,
            phone: formData.vetPhone,
            address: formData.vetAddress
          }
        }
      });

      if (vetError) throw vetError;

      toast({
        title: "Membership Complete!",
        description: "Your I.C.E. Pet Alert membership has been activated. QR badge is now available in your dashboard."
      });
      
      onClose();
      // Optionally, trigger a callback or state update here to refresh parent data
      // For example, you could call a prop like onMembershipComplete() if passed from parent
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete membership",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Pet Information</h3>
            <input type="text" placeholder="Pet Name *" value={formData.petName} onChange={e => updateField('petName', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" required />
            <select value={formData.petType} onChange={e => updateField('petType', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg">
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
            <input type="text" placeholder="Breed" value={formData.breed} onChange={e => updateField('breed', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Age (years)" value={formData.age} onChange={e => updateField('age', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
              <input type="number" placeholder="Weight (lbs)" value={formData.weight} onChange={e => updateField('weight', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
            </div>
            <input type="text" placeholder="Microchip Number (optional)" value={formData.microchipNumber} onChange={e => updateField('microchipNumber', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
            <input type="text" placeholder="Contact Name *" value={formData.emergencyContactName} onChange={e => updateField('emergencyContactName', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" required />
            <input type="tel" placeholder="Contact Phone *" value={formData.emergencyContactPhone} onChange={e => updateField('emergencyContactPhone', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" required />
            <input type="text" placeholder="Relationship" value={formData.emergencyContactRelation} onChange={e => updateField('emergencyContactRelation', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Veterinarian Info</h3>
            <input type="text" placeholder="Vet Clinic Name *" value={formData.vetClinicName} onChange={e => updateField('vetClinicName', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" required />
            <input type="tel" placeholder="Vet Phone *" value={formData.vetPhone} onChange={e => updateField('vetPhone', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" required />
            <input type="text" placeholder="Clinic Address" value={formData.vetAddress} onChange={e => updateField('vetAddress', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Medical Information</h3>
            <textarea placeholder="Medical Conditions (if any)" value={formData.medicalConditions} onChange={e => updateField('medicalConditions', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg h-24" />
            <textarea placeholder="Current Medications" value={formData.medications} onChange={e => updateField('medications', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg h-24" />
            <textarea placeholder="Allergies" value={formData.allergies} onChange={e => updateField('allergies', e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg h-24" />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Review & Complete</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <h4 className="font-bold text-lg">Membership Summary</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Pet:</strong> {formData.petName} ({formData.petType})</p>
                <p><strong>Emergency Contact:</strong> {formData.emergencyContactName}</p>
                <p><strong>Vet:</strong> {formData.vetClinicName}</p>
                <p><strong>Owner:</strong> {profile?.full_name || user?.email}</p>
              </div>
              <div className="border-t pt-3 mt-3">
                <p className="text-lg font-bold">Annual Membership: $150</p>
                <p className="text-sm text-gray-600">Includes QR badge, 24/7 emergency support, and sitter network access</p>
              </div>
            </div>
            {!user && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm">Please log in or create an account to complete your membership.</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">I.C.E. Pet Alert Membership</h2>
          <button onClick={onClose} className="text-3xl hover:text-red-600">&times;</button>
        </div>
        <div className="flex gap-2 mb-8">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-yellow-400' : 'bg-gray-300'}`} />
          ))}
        </div>
        {renderStep()}
        <div className="flex gap-4 mt-8">
          {step > 1 && <Button onClick={() => setStep(step - 1)} variant="outline" disabled={loading}>Back</Button>}
          <Button onClick={handleNext} className="flex-1" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step === 5 ? 'Complete Membership' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};