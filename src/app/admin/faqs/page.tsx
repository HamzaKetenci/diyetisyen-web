'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { FaqItem } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

export default function AdminFaqsPage() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAdminStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 1,
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingFaqId(null);
    setFormData({
      question: '',
      answer: '',
      order: faqs.length + 1,
      isActive: true,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaqId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isActive: faq.isActive,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    if (editingFaqId) {
      updateFaq(editingFaqId, {
        question: formData.question,
        answer: formData.answer,
        order: Number(formData.order),
        isActive: formData.isActive,
      });
    } else {
      addFaq({
        question: formData.question,
        answer: formData.answer,
        order: Number(formData.order),
        isActive: formData.isActive,
      });
    }

    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (faqToDelete) {
      deleteFaq(faqToDelete);
      setDeleteModalOpen(false);
      setFaqToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Sıkça Sorulan Sorular Yönetimi
          </h1>
          <p className="text-sm text-neutral-700 mt-0.5">
            Ziyaretçilerin en çok merak ettiği soruları ve yanıtları düzenleyin.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Soru Ekle
        </Button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card
            key={faq.id}
            className={`bg-white border p-5 shadow-sm transition-opacity ${
              faq.isActive ? 'border-neutral-200/80' : 'border-neutral-200/50 opacity-70 bg-neutral-50/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant={faq.isActive ? 'success' : 'default'}>
                    {faq.isActive ? 'Yayında' : 'Yayında Değil'}
                  </Badge>
                  <span className="text-xs text-neutral-700 font-mono">
                    Sıra: {faq.order}
                  </span>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900">
                  {faq.question}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-body">
                  {faq.answer}
                </p>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                <button
                  type="button"
                  onClick={() => updateFaq(faq.id, { isActive: !faq.isActive })}
                  className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  {faq.isActive ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Kaldır</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      <span className="text-primary font-semibold">Yayınla</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(faq)}
                    aria-label="Düzenle"
                    className="p-1.5 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFaqToDelete(faq.id);
                      setDeleteModalOpen(true);
                    }}
                    aria-label="Sil"
                    className="p-1.5 text-neutral-600 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={editingFaqId ? 'Soruyu Düzenle' : 'Yeni Soru & Cevap Ekle'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="faq-question"
            label="Soru"
            required
            placeholder="Örn: Görüşmeler ne sıklıkla yapılıyor?"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          />

          <Input
            id="faq-order"
            type="number"
            label="Sıra Numarası"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
          />

          <Textarea
            id="faq-answer"
            label="Cevap"
            rows={4}
            required
            placeholder="Açıklayıcı ve net yanıt yazınız..."
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          />

          <div className="flex items-center gap-2 pt-1">
            <input
              id="faq-active"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
            />
            <label htmlFor="faq-active" className="text-sm font-medium text-neutral-800">
              Bu soruyu hemen yayında göster
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingFaqId ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Soruyu Silmek İstediğinize Emin misiniz?"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Bu soru ve cevap listeden kalıcı olarak silinecektir.
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
