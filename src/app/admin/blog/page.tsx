'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  FileText,
  ExternalLink,
  Check,
} from 'lucide-react';
import { useAdminStore } from '@/lib/store/admin-store';
import { BlogPost } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';

export default function AdminBlogPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdminStore();

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Editor mode: 'edit' or 'preview'
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Beslenme Rehberi',
    readingTimeMinutes: 3,
    isPublished: true,
  });

  const handleOpenAdd = () => {
    setEditingPostId(null);
    setActiveTab('edit');
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: `## Başlık\n\nYazı içeriğinizi buraya Markdown formatında yazabilirsiniz.\n\n### Alt Başlık\n- Madde 1\n- Madde 2\n\n> Önemli bir beslenme tavsiyesi.`,
      category: 'Beslenme Rehberi',
      readingTimeMinutes: 3,
      isPublished: true,
    });
    setIsEditorModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setActiveTab('edit');
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTimeMinutes: post.readingTimeMinutes,
      isPublished: post.isPublished,
    });
    setIsEditorModalOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    const slug = newTitle
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      // Auto generate slug if user hasn't explicitly customized it
      slug: prev.slug === '' || prev.slug === slug ? slug : prev.slug,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const postPayload = {
      title: formData.title,
      slug: formData.slug || `yazi-${Date.now()}`,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      readingTimeMinutes: Number(formData.readingTimeMinutes),
      publishedAt: new Date().toISOString().split('T')[0],
      isPublished: formData.isPublished,
    };

    if (editingPostId) {
      updateBlogPost(editingPostId, postPayload);
    } else {
      addBlogPost(postPayload);
    }

    setIsEditorModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      deleteBlogPost(postToDelete);
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Blog & Tarif Yazıları Yönetimi
          </h1>
          <p className="text-sm text-neutral-700 mt-0.5">
            Markdown editörüyle yeni blog veya tarif yazıları oluşturun, düzenleyin ve yayınlayın.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yeni Yazı Oluştur
        </Button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className={`bg-white border p-5 shadow-sm transition-opacity ${
              post.isPublished ? 'border-neutral-200/80' : 'border-neutral-200/50 opacity-70 bg-neutral-50/50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant={post.isPublished ? 'success' : 'default'}>
                    {post.isPublished ? 'Yayında' : 'Taslak'}
                  </Badge>
                  <Badge variant="info">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-neutral-700">
                    <Clock className="w-3 h-3" />
                    {post.readingTimeMinutes} dk okuma
                  </span>
                  <span className="flex items-center gap-1 text-neutral-700">
                    <Calendar className="w-3 h-3" />
                    {post.publishedAt}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-neutral-900">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-700 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="text-[11px] text-neutral-700 font-mono">
                  Slug: /{post.slug}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 justify-end">
                {post.isPublished && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Yazıyı Sitede Görüntüle"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateBlogPost(post.id, { isPublished: !post.isPublished })}
                  leftIcon={post.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                >
                  {post.isPublished ? 'Taslağa Al' : 'Yayınla'}
                </Button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  aria-label="Düzenle"
                  className="p-2 text-neutral-600 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPostToDelete(post.id);
                    setDeleteModalOpen(true);
                  }}
                  aria-label="Sil"
                  className="p-2 text-neutral-600 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Editor Modal with Markdown + Live Preview */}
      <Modal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        size="lg"
        title={editingPostId ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="post-title"
              label="Yazı Başlığı"
              required
              placeholder="Örn: Sürdürülebilir Beslenme Alışkanlıkları"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            <Input
              id="post-slug"
              label="URL Slug (Otomatik oluşturulur)"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Beslenme Rehberi">Beslenme Rehberi</option>
                <option value="Pratik Tarifler">Pratik Tarifler</option>
                <option value="Sağlıklı Yaşam">Sağlıklı Yaşam</option>
                <option value="Sporcu Beslenmesi">Sporcu Beslenmesi</option>
              </select>
            </div>

            <Input
              id="post-reading-time"
              type="number"
              label="Okuma Süresi (Dakika)"
              value={formData.readingTimeMinutes}
              onChange={(e) => setFormData({ ...formData, readingTimeMinutes: Number(e.target.value) })}
            />
          </div>

          <Textarea
            id="post-excerpt"
            label="Özet Metin (Kartta görünen)"
            rows={2}
            required
            placeholder="Yazının kısa özeti..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />

          {/* Markdown Editor / Preview Tabs */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <label className="block text-xs font-semibold text-neutral-700">
                İçerik (Markdown Formatı)
              </label>

              <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'edit'
                      ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  Düzenle (Markdown)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  Canlı Önizleme
                </button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <Textarea
                id="post-content"
                rows={10}
                required
                className="font-mono text-xs sm:text-sm"
                placeholder="Markdown içeriğinizi buraya yazın..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            ) : (
              <div className="min-h-[220px] max-h-[350px] overflow-y-auto p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm leading-relaxed prose prose-neutral max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              id="post-published"
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary"
            />
            <label htmlFor="post-published" className="text-sm font-medium text-neutral-800">
              Bu yazıyı hemen yayına al
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsEditorModalOpen(false)}>
              Vazgeç
            </Button>
            <Button variant="primary" size="sm" type="submit">
              {editingPostId ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Yazıyı Silmek İstediğinize Emin misiniz?"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-700">
            Bu blog yazısı kalıcı olarak silinecektir.
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
