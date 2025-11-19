// FIX: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';

export enum FileType {
  PDF = 'PDF',
  IMAGE = 'Image',
  DOCUMENT = 'Document',
}

export enum FileSubject {
    ENGLISH = 'English',
    MATH = 'Math',
    PHYSICS = 'Physics',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'Biology',
    SCIENCE = 'Science',
}

export interface PortfolioFile {
  id: number;
  title: string;
  description: string;
  type: FileType;
  subject: FileSubject;
  url: string; // URL for download/view
}

export interface ContactLink {
  id: number;
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}
