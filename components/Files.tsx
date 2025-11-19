import React, { useState } from 'react';
import { FileType, FileSubject, type PortfolioFile } from '../types';
import NeonCard from './NeonCard';
import PDFIcon from './icons/PDFIcon';
import ImageIcon from './icons/ImageIcon';
import DocumentIcon from './icons/DocumentIcon';
import PasswordModal from './PasswordModal';

const filesData: PortfolioFile[] = [
    { id: 1, title: 'Transformation of sentence sheet', description: 'Rules of transformation sentence.', type: FileType.PDF, subject: FileSubject.ENGLISH, url: 'https://drive.google.com/file/d/1SCMqWhzorgg4wtNfjp8TWBqJUzuS0Fg-/view?usp=drivesdk' },
    { id: 2, title: 'Calculus Cheat Sheet', description: 'Quick reference for derivatives, integrals, and theorems for your math classes.', type: FileType.PDF, subject: FileSubject.MATH, url: '#' },
    { id: 3, title: 'Thermodynamics Lecture Notes', description: 'Detailed notes from Physics 101, covering the laws of thermodynamics.', type: FileType.DOCUMENT, subject: FileSubject.PHYSICS, url: '#' },
    { id: 4, title: 'Chemistry 11', description: 'Question of chemistry.', type: FileType.PDF , subject: FileSubject.CHEMISTRY, url: 'https://drive.google.com/file/d/1VRY0Sz-HaANnBDQjyeApYjH0ZP3vlrh7/view?usp=drivesdk' },
    { id: 5, title: 'Cellular Biology Diagrams', description: 'A collection of diagrams illustrating animal and plant cell structures for biology students.', type: FileType.IMAGE, subject: FileSubject.BIOLOGY, url: '#' },
    { id: 6, title: 'Advanced Algebra Problems', description: 'Challenging practice problems for advanced algebra, complete with solutions.', type: FileType.PDF, subject: FileSubject.MATH, url: '#' },
    { id: 7, title: 'Shakespeare\'s Sonnets Analysis', description: 'An in-depth analysis of recurring themes and literary devices in Shakespeare\'s sonnets.', type: FileType.DOCUMENT, subject: FileSubject.ENGLISH, url: '#' },
    { id: 8, title: 'Science Cq', description: 'Question of science class 10.', type: FileType.PDF, subject: FileSubject.SCIENCE, url: 'https://drive.google.com/file/d/1Qiv4FLo2iYrPh4w7l6gnIp7jl6e_dAeV/view?usp=drivesdk' },
    { id: 9, title: 'Periodic Table Trends', description: 'A document explaining periodic trends such as electronegativity and atomic radius.', type: FileType.DOCUMENT, subject: FileSubject.CHEMISTRY, url: '#' },
    { id: 10, title: 'Genetics and DNA Replication', description: 'PDF slides covering the core concepts of DNA replication and modern genetics.', type: FileType.PDF, subject: FileSubject.BIOLOGY, url: '#' },
    { id: 11, title: 'Class 10 Math CQ', description: 'An exam question to test your math skills.', type: FileType.PDF, subject: FileSubject.MATH, url: 'https://drive.google.com/file/d/1ZAWGFETTgKGqTgom1Z3HH5hymYNm9Wkk/view?usp=sharing' },
    { id: 12, title: 'Class 10 Physics CQ', description: 'An exam question to test your physics knowledge.', type: FileType.PDF, subject: FileSubject.PHYSICS, url: 'https://drive.google.com/file/d/1ZAWGFETTgKGqTgom1Z3HH5hymYNm9Wkk/view?usp=sharing' },
  ];

const FileIcon = ({ type }: { type: FileType }) => {
  switch (type) {
    case FileType.PDF:
      return <PDFIcon className="w-8 h-8 text-fuchsia-400" />;
    case FileType.IMAGE:
      return <ImageIcon className="w-8 h-8 text-fuchsia-400" />;
    case FileType.DOCUMENT:
      return <DocumentIcon className="w-8 h-8 text-fuchsia-400" />;
    default:
      return null;
  }
};

const Files: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PortfolioFile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<FileSubject | 'All'>('All');

  const filteredFiles = filesData
    .filter(file => selectedSubject === 'All' || file.subject === selectedSubject)
    .filter(file =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const subjects: (FileSubject | 'All')[] = ['All', ...Object.values(FileSubject)];

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8 text-center neon-text-cyan glitch-effect" data-text="[Files Archive]">
        [Files Archive]
      </h2>

      <div className="mb-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="> Search files by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/70 border-2 border-cyan-500/50 focus:border-cyan-400 text-cyan-300 px-4 py-3 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-500/50 neon-border-cyan transition-all"
            aria-label="Search files"
          />
        </div>
      </div>

       <div className="mb-8 flex flex-wrap justify-center gap-2">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-3 py-2 uppercase tracking-widest text-xs font-bold border-2 transition-all duration-300 ${
                selectedSubject === subject
                  ? 'bg-cyan-500 text-black neon-border-cyan shadow-[0_0_15px_rgba(0,246,255,0.8)]'
                  : 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/40 hover:border-cyan-500'
              }`}
              aria-pressed={selectedSubject === subject}
            >
              {subject}
            </button>
          ))}
        </div>

      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFiles.map((file) => (
            <NeonCard key={file.id} borderColor="cyan" className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-cyan-300 pr-4">{file.title}</h3>
                <div className="flex-shrink-0">
                  <FileIcon type={file.type} />
                </div>
              </div>
              <p className="text-cyan-400/80 mb-4 flex-grow">{file.description}</p>
              <div className="mt-auto pt-4 border-t border-cyan-500/20 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-fuchsia-400/80 font-bold">{file.subject}</span>
                <button 
                  onClick={() => setSelectedFile(file)}
                  className="inline-block text-center bg-cyan-500/20 border-2 border-cyan-500 text-cyan-300 font-bold py-2 px-4 uppercase tracking-widest transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:neon-border-cyan"
                >
                  // Access File
                </button>
              </div>
            </NeonCard>
          ))}
        </div>
      ) : (
        <NeonCard borderColor="pink" className="text-center py-16">
          <h3 className="text-2xl text-fuchsia-400 neon-text-pink mb-4">// NO MATCHING FILES</h3>
          <p className="text-cyan-400/80">Your search query or filter returned no results. Try adjusting your criteria.</p>
        </NeonCard>
      )}
      
      <PasswordModal file={selectedFile} onClose={() => setSelectedFile(null)} />
    </div>
  );
};

export default Files;
