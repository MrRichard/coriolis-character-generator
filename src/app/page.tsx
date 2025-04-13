// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Coriolis RPG Character Generator
        </h1>
        
        <div className="card mb-8 p-8">
          <p className="text-xl text-center mb-8">
            Create character sheets for your Coriolis RPG game with this step-by-step wizard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6 bg-opacity-70">
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <span>Group concept and talent selection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <span>Individual character creation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <span>AI-generated character portraits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">✦</span>
                  <span>Downloadable PDF character sheets</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6 bg-opacity-70">
              <h2 className="text-xl font-semibold mb-3">How It Works</h2>
              <ol className="space-y-2 list-decimal pl-5">
                <li>Select your group concept</li>
                <li>Choose group talents</li>
                <li>Create individual characters</li>
                <li>Generate portraits with AI</li>
                <li>Download finished character sheets</li>
              </ol>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/wizard" 
              className="btn-primary px-8 py-4 text-lg inline-block"
            >
              Start Character Creation
            </Link>
          </div>
        </div>
        
        <div className="card p-6 text-center">
          <h2 className="text-xl font-semibold mb-3">About Coriolis</h2>
          <p>
            Coriolis is a science fiction role-playing game set in a remote cluster of star systems called The Third Horizon. 
            It features a unique blend of Middle Eastern and North African aesthetics with space opera elements.
          </p>
        </div>
      </div>
    </main>
  );
}
