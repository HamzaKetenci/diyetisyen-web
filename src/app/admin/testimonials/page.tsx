'use client';

import { useState } from 'react';
import { Plus, Check, X, Trash2, MessageSquare, Quote, Info, User } from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

export default function AdminTestimonialsPage() {
  const {
    testimonials,
    toggleTestimonialApproval,
    addTestimonial,
    deleteTestimonial,
  } = useAdminStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    feedback: '',
    serviceCategory: 'Bireysel Danışmanlık',
    isApproved: true,
  });

  const approvedCount = testimonials.filter((t) => t.isApproved).length;

  const handleOpenAdd = () => {
    setFormData({
      clientName: '',
      feedback: '',
      serviceCategory: 'Bireysel Danışmanlık',
      isApproved: true,
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.feedback.trim()) return;

    addTestimonial({
      clientName: formData.clientName,
      feedback: formData.feedback,
      serviceCategory: formData.serviceCategory,
      isApproved: formData.isApproved,
    });

    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (testimonialToDelete) {
      deleteTestimonial(testimonialToDelete);
      setDeleteModalOpen(false);
      setTestimonialToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Danışan Yorumları Yönetimi
          </h1>
          <p className="text-sm text-neutral-700 mt-0.5">
            Sitede görünecek danışan geri bildirimlerini onaylayın veya yayından kaldırın.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Yorum Ekle
        </Button>
      </div>

      {/* Info Callout about public section visibility */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong>Kural:</strong> Public ana sayfadaki Danışan Yorumları bölümü yalnızca{' '}
          <strong>onaylı</strong> yorumlar varsa görüntülenir. Şu anda{' '}
          <strong className="text-primary">{approvedCount} adet onaylı</strong> yorum bulunmaktadır.
          Tüm onaylar kaldırılırsa ana sayfadaki bölüm otomatik olarak tamamen gizlenir.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <Card
            key={item.id}
            className={`flex flex-col justify-between bg-white border p-5 sm:p-6 shadow-sm transition-opacity ${
              item.isApproved
                ? 'border-neutral-200/80'
                : 'border-neutral-200/50 opacity-65 bg-neutral-50/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 font-body">
                      {item.clientName}
                    </h3>
                    <span className="text-xs text-neutral-700">
                      {item.serviceCategory} &bull; {item.createdAt}
                    </span>
                  </div>
                </div>

                <Badge variant={item.isApproved ? 'success' : 'warning'}>
                  {item.isApproved ? 'Onaylı' : 'Beklemede'}
                </Badge>
              </div>

              <div className="relative pl-6 pt-1 text-sm text-neutral-700 italic font-body">
                <Quote className="w-4 h-4 text-primary/30 absolute left-0 top-1" />
                <p>&ldquo;{item.feedback}&rdquo;</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <Button
                variant={item.isApproved ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => toggleTestimonialApproval(item.id)}
                leftIcon={item.isApproved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
              >
                {item.isApproved ? 'Onayı Kaldır' : 'Yorumu Onayla'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setTestimonialToDelete(item.id);
                  setDeleteModalOpen(true);
                }}
                aria-label="Yorumu Sil"
                className="p-2 text-neutral-600 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Yeni Danışan Yorumu Ekle"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="client-name"
            label="Danışan Adı (Örnek Format: Örnek Danışan 3)"
            required
            placeholder="Örn: Örnek Danışan 3"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Hizmet Kategorisi
            </label>
            <select
              value={formData.serviceCategory}
              onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Bireysel Danışmanlık">Bireysel Danışmanlık</option>
              <option value="Online Diyet">Online Diyet</option>
              <option value="Kilo Yönetimi">Kilo Yönetimi</option>
              <option value="Gebelik Beslenmesi">Gebelik Beslenmesi</option>
              <option value="Sporcu Beslenmesi">Sporcu Beslenmesi</option>
            </select>
          </div>

          <Textarea
            id="testimonial-feedback"
            label="Danışan Yorumu"
            rows={4}
            required
            placeholder="Danışanın süreçle ilgili samimi deneyimi..."
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              id="testimonial-approve"
              type="checkbox"
              checked={formData.isApproved}
              onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
              className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
            />
            <label htmlFor="testimonial-approve" className="text-sm font-medium text-neutral-800">
              Bu yorumu hemen onaylayıp yayına al
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Kaydet
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Yorumu Silmek İstediğinize Emin misiniz?"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Bu danışan yorumu kalıcı olarak silinecektir.
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
