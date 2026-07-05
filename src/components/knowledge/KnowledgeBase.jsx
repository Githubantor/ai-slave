import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, Upload, Search, Link as LinkIcon, Folder, Trash2, Download } from 'lucide-react';
import { knowledgeBase } from '../../data/mockData';
import Card from '../common/Card';
import Modal from '../common/Modal';

const typeIcons = { pdf: FileText, docx: FileText, csv: FileText, url: LinkIcon, txt: FileText };

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const filtered = knowledgeBase.filter(k =>
    k.title.toLowerCase().includes(search.toLowerCase()) ||
    k.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(knowledgeBase.map(k => k.category))];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database size={24} className="text-accent-400" />
            <div>
              <h1 className="text-2xl font-bold">Knowledge Base</h1>
              <p className="text-surface-400 mt-1">Upload and manage business context for AI employees</p>
            </div>
          </div>
          <button onClick={() => setShowUpload(true)} className="btn-primary flex items-center gap-2">
            <Upload size={16} /> Upload
          </button>
        </div>
      </motion.div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search knowledge base..."
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><p className="text-2xl font-bold">{knowledgeBase.length}</p><p className="text-sm text-surface-400">Total Documents</p></Card>
        <Card><p className="text-2xl font-bold text-blue-400">{knowledgeBase.filter(k => k.type === 'pdf').length}</p><p className="text-sm text-surface-400">PDFs</p></Card>
        <Card><p className="text-2xl font-bold text-emerald-400">{categories.length}</p><p className="text-sm text-surface-400">Categories</p></Card>
        <Card><p className="text-2xl font-bold text-amber-400">1.2 GB</p><p className="text-sm text-surface-400">Total Size</p></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc, i) => {
          const Icon = typeIcons[doc.type] || FileText;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  doc.type === 'pdf' ? 'bg-red-500/20' : doc.type === 'docx' ? 'bg-blue-500/20' : doc.type === 'url' ? 'bg-purple-500/20' : 'bg-emerald-500/20'
                }`}>
                  <Icon size={20} className={`${
                    doc.type === 'pdf' ? 'text-red-400' : doc.type === 'docx' ? 'text-blue-400' : doc.type === 'url' ? 'text-purple-400' : 'text-emerald-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.title}</p>
                  <p className="text-xs text-surface-400">{doc.type.toUpperCase()} • {doc.size}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="badge-blue text-xs">{doc.category}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-glass-light text-surface-400"><Download size={14} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-glass-light text-red-400"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-xs text-surface-500 mt-2">Uploaded {doc.uploaded}</p>
            </motion.div>
          );
        })}
      </div>

      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload Document" size="sm">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center hover:border-accent-500/50 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto mb-3 text-surface-400" />
            <p className="text-sm text-surface-300">Drop files here or click to browse</p>
            <p className="text-xs text-surface-500 mt-1">Supports PDF, DOCX, CSV, TXT (max 50MB)</p>
          </div>
          <div>
            <label className="block text-xs text-surface-400 mb-1">Category</label>
            <select className="input-field">
              <option>Business</option>
              <option>Product</option>
              <option>Research</option>
              <option>Brand</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-surface-400 mb-1">Or paste a URL</label>
            <input type="url" placeholder="https://..." className="input-field" />
          </div>
          <button className="btn-primary w-full">Upload</button>
        </div>
      </Modal>
    </div>
  );
}
