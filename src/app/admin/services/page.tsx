'use client';

import { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  UserCheck,
  Laptop,
  Scale,
  HeartHandshake,
  Activity,
  ShieldAlert,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { Service } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

function renderIconPreview(name: string) {
  const iconProps = { className: 'w-5 h-5 text-primary' };
  switch (name) {
    case 'UserCheck':
      return <UserCheck {...iconProps} />;
    case 'Laptop':
      return <Laptop {...iconProps} />;
    case 'Scale':
      return <Scale {...iconProps} />;
    case 'HeartHandshake':
      return <HeartHandshake {...iconProps} />;
    case 'Activity':
      return <Activity {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    default:
      return <UserCheck {...iconProps} />;
  }
}

export default function AdminServicesPage() {
  const { services, addService, updateService, deleteService } = useAdminStore();

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    iconName: 'UserCheck',
    features: '',
    order: 1,
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingServiceId(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      iconName: 'UserCheck',
      features: 'Özellik 1, Özellik 2, Özellik 3',
      order: services.length + 1,
      isActive: true,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingServiceId(service.id);
    setFormData({
      title: service.title,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      iconName: service.iconName,
      features: service.features.join(', '),
      order: service.order,
      isActive: service.isActive,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedFeatures = formData.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingServiceId) {
      updateService(editingServiceId, {
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        iconName: formData.iconName,
        features: parsedFeatures,
        order: Number(formData.order),
        isActive: formData.isActive,
      });
    } else {
      addService({
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        iconName: formData.iconName,
        features: parsedFeatures,
        order: Number(formData.order),
        isActive: formData.isActive,
      });
    }

    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete);
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Hizmetler Yönetimi
          </h1>
          <p className="text-sm text-neutral-700 mt-0.5">
            Sitede sunulan danışmanlık hizmetlerini ekleyin, düzenleyin veya yayından kaldırın.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Hizmet Ekle
        </Button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`flex flex-col justify-between bg-white border p-5 shadow-sm transition-opacity ${
              service.isActive ? 'border-neutral-200/80' : 'border-neutral-200/50 opacity-70 bg-neutral-50/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  {renderIconPreview(service.iconName)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={service.isActive ? 'success' : 'default'}>
                    {service.isActive ? 'Yayında' : 'Yayında Değil'}
                  </Badge>
                  <span className="text-xs text-neutral-700 font-mono">
                    Sıra: {service.order}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-700 mt-1.5 line-clamp-2">
                  {service.shortDescription}
                </p>
              </div>

              {/* Features Count */}
              <div className="text-xs text-neutral-700">
                <span className="font-semibold text-neutral-800">{service.features.length}</span> özellik tanımlı
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => updateService(service.id, { isActive: !service.isActive })}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {service.isActive ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Yayından Kaldır</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-semibold">Yayına Al</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                  aria-label="Düzenle"
                  className="p-1.5 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setServiceToDelete(service.id);
                    setDeleteModalOpen(true);
                  }}
                  aria-label="Sil"
                  className="p-1.5 text-neutral-600 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={editingServiceId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="service-title"
            label="Hizmet Başlığı"
            required
            placeholder="Örn: Bireysel Beslenme Danışmanlığı"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                İkon
              </label>
              <select
                value={formData.iconName}
                onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="UserCheck">UserCheck (Bireysel)</option>
                <option value="Laptop">Laptop (Online)</option>
                <option value="Scale">Scale (Kilo Yönetimi)</option>
                <option value="HeartHandshake">HeartHandshake (Gebelik)</option>
                <option value="Activity">Activity (Sporcu)</option>
                <option value="ShieldAlert">ShieldAlert (Tıbbi/Klinik)</option>
              </select>
            </div>

            <Input
              id="service-order"
              type="number"
              label="Görüntülenme Sırası"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            />
          </div>

          <Textarea
            id="service-short-desc"
            label="Kısa Açıklama (Kartta görünen)"
            rows={2}
            required
            placeholder="Özet açıklama giriniz..."
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />

          <Textarea
            id="service-features"
            label="Özellikler (Virgülle ayırarak yazınız)"
            rows={2}
            placeholder="Ayrıntılı analiz, Haftalık takip, WhatsApp desteği"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              id="service-active"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
            />
            <label htmlFor="service-active" className="text-sm font-medium text-neutral-800">
              Bu hizmeti hemen yayında göster
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingServiceId ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Hizmeti Silmek İstediğinize Emin misiniz?"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Bu hizmet listeden kaldırılacaktır. İstediğiniz zaman yeniden ekleyebilirsiniz.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setDeleteModalOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" className="bg-error hover:bg-error/90 text-white" onClick={handleConfirmDelete}>
              Evet, Sil
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
