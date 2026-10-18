'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  Clock,
  FileEdit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Inbox,
  User,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { AppointmentRequest, AppointmentStatus } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

const STATUS_LABELS: Record<
  AppointmentStatus,
  { label: string; variant: 'info' | 'warning' | 'success' | 'error' }
> = {
  yeni: { label: 'Yeni Talep', variant: 'warning' },
  arandi: { label: 'Arandı', variant: 'info' },
  randevu_verildi: { label: 'Randevu Verildi', variant: 'success' },
  iptal: { label: 'İptal Edildi', variant: 'error' },
};

export default function AdminAppointmentsPage() {
  const {
    appointments,
    updateAppointmentStatus,
    updateAppointmentNote,
    deleteAppointment,
  } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states for Notes
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<AppointmentRequest | null>(null);
  const [noteText, setNoteText] = useState('');

  // Modal states for Delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  // Status counts
  const totalCount = appointments.length;
  const newCount = appointments.filter((a) => a.status === 'yeni').length;
  const calledCount = appointments.filter((a) => a.status === 'arandi').length;
  const bookedCount = appointments.filter((a) => a.status === 'randevu_verildi').length;
  const cancelledCount = appointments.filter((a) => a.status === 'iptal').length;

  // Filtered appointments
  const filteredAppointments = appointments.filter((item) => {
    // Status filter
    if (selectedStatus !== 'all' && item.status !== selectedStatus) {
      return false;
    }

    // Search query filter (name, phone, email, target)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = item.fullName.toLowerCase().includes(q);
      const matchPhone = item.phone.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchTarget = item.target.toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail || matchTarget;
    }

    return true;
  });

  const handleOpenNoteModal = (appointment: AppointmentRequest) => {
    setActiveAppointment(appointment);
    setNoteText(appointment.note || '');
    setNoteModalOpen(true);
  };

  const handleSaveNote = () => {
    if (activeAppointment) {
      updateAppointmentNote(activeAppointment.id, noteText);
      setNoteModalOpen(false);
      setActiveAppointment(null);
    }
  };

  const handleConfirmDelete = () => {
    if (appointmentToDelete) {
      deleteAppointment(appointmentToDelete);
      setDeleteModalOpen(false);
      setAppointmentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Randevu Talepleri
          </h1>
          <p className="text-sm text-neutral-700 mt-0.5">
            Web sitesi üzerinden gelen randevu ve danışmanlık başvuruları.
          </p>
        </div>

        {/* Quick New Request Counter Badge */}
        {newCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warning/15 border border-warning/30 text-neutral-900 text-xs sm:text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
            <span>{newCount} yeni bekleyen talep</span>
          </div>
        )}
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedStatus('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              selectedStatus === 'all'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200'
            }`}
          >
            Tümü ({totalCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('yeni')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              selectedStatus === 'yeni'
                ? 'bg-warning text-neutral-900 font-bold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200'
            }`}
          >
            Yeni ({newCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('arandi')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              selectedStatus === 'arandi'
                ? 'bg-primary text-white font-semibold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200'
            }`}
          >
            Arandı ({calledCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('randevu_verildi')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              selectedStatus === 'randevu_verildi'
                ? 'bg-success text-white font-semibold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200'
            }`}
          >
            Randevu Verildi ({bookedCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('iptal')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              selectedStatus === 'iptal'
                ? 'bg-neutral-700 text-white font-semibold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-200'
            }`}
          >
            İptal ({cancelledCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <Input
            id="search-appointments"
            placeholder="İsim, telefon veya e-posta ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-neutral-400" />}
          />
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        /* Empty State */
        <div className="py-16 text-center rounded-2xl bg-white border border-neutral-200 p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-neutral-900">
              Kayıt Bulunamadı
            </h3>
            <p className="text-sm text-neutral-700 max-w-sm mx-auto">
              {searchQuery
                ? `"${searchQuery}" aramasıyla eşleşen randevu talebi bulunamadı.`
                : 'Seçili filtreye ait herhangi bir başvuru mevcut değil.'}
            </p>
          </div>
          {searchQuery && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchQuery('')}
            >
              Aramayı Temizle
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((item) => {
            const statusConfig = STATUS_LABELS[item.status];

            return (
              <Card
                key={item.id}
                className="bg-white border border-neutral-200/80 p-5 sm:p-6 shadow-sm space-y-4 hover:border-neutral-300 transition-colors"
              >
                {/* Header row: Person Name + Status Badge + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-neutral-900 font-body">
                        {item.fullName}
                      </h2>
                      <span className="text-xs text-neutral-700">
                        {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    <Badge variant={statusConfig.variant}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>

                {/* Body Row: Contact Details & Message */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
                  {/* Contact Info (col 4) */}
                  <div className="md:col-span-4 space-y-2 text-neutral-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                      <a
                        href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {item.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                      <a
                        href={`mailto:${item.email}`}
                        className="text-primary hover:underline truncate"
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>

                  {/* Target / Request Description (col 8) */}
                  <div className="md:col-span-8 bg-neutral-50 rounded-xl p-3.5 border border-neutral-100">
                    <span className="block text-xs font-semibold text-neutral-700 mb-1">
                      Başvuru Hedefi / Açıklama:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-body">
                      {item.target}
                    </p>
                  </div>
                </div>

                {/* Note display if exists */}
                {item.note && (
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-neutral-700 flex items-start gap-2">
                    <FileEdit className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-neutral-900 block">
                        Yönetici Notu:
                      </span>
                      <span>{item.note}</span>
                    </div>
                  </div>
                )}

                {/* Footer Controls Row: Status changer & Note / Delete actions */}
                <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  {/* Quick status selector */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-neutral-700">Durum:</span>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateAppointmentStatus(
                          item.id,
                          e.target.value as AppointmentStatus
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="yeni">Yeni</option>
                      <option value="arandi">Arandı</option>
                      <option value="randevu_verildi">Randevu Verildi</option>
                      <option value="iptal">İptal</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenNoteModal(item)}
                      leftIcon={<FileEdit className="w-3.5 h-3.5" />}
                    >
                      {item.note ? 'Notu Düzenle' : 'Not Ekle'}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setAppointmentToDelete(item.id);
                        setDeleteModalOpen(true);
                      }}
                      aria-label="Talebi Sil"
                      className="p-2 text-neutral-400 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Note Modal */}
      <Modal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title={activeAppointment ? `${activeAppointment.fullName} - Yönetici Notu` : 'Not Ekle'}
      >
        <div className="space-y-4">
          <Textarea
            id="appointment-note"
            label="Danışan Hakkında Notlar"
            placeholder="Örn: Görüşme yapıldı, kan tahlili istendi..."
            rows={4}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setNoteModalOpen(false)}
            >
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveNote}>
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Talebi Silmek İstediğinize Emin misiniz?"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Bu randevu talebi listeden silinecektir. Bu işlem geri alınamaz.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteModalOpen(false)}
            >
              Vazgeç
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-error hover:bg-error/90 text-white"
              onClick={handleConfirmDelete}
            >
              Evet, Sil
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
