'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { Recipe } from './types';

const firebaseConfig = {
  "projectId": "stepchef-yxuz6",
  "appId": "1:571185076885:web:ae3a9852dc6ffe11aed99c",
  "storageBucket": "stepchef-yxuz6.firebasestorage.app",
  "apiKey": "AIzaSyB_3zzmUBpP870L7LTC0zizXNg5A_ja2D8",
  "authDomain": "stepchef-yxuz6.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "571185076885"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { 
  app, 
  auth, 
  db, 
  googleProvider,
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
};
export type { User, Recipe };