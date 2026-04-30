import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const COLLECTION_NAME = 'settings';
const DOCUMENT_ID = 'courses';

const DEFAULT_COURSES = ["K14", "K15", "K16", "K17", "K18", "K19"];

interface CoursesData {
  courses: string[];
  updatedAt: string;
}

export async function getFirestoreCourses(): Promise<string[]> {
  const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    // Initialize with default courses
    await setDoc(docRef, {
      courses: DEFAULT_COURSES,
      updatedAt: new Date().toISOString(),
    });
    return DEFAULT_COURSES;
  }
  const data = docSnap.data() as CoursesData;
  return data.courses || DEFAULT_COURSES;
}

export async function saveFirestoreCourses(courses: string[]): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
  await setDoc(docRef, {
    courses,
    updatedAt: new Date().toISOString(),
  });
}

export async function addFirestoreCourse(course: string): Promise<string[]> {
  const currentCourses = await getFirestoreCourses();
  if (currentCourses.includes(course)) {
    return currentCourses;
  }
  const updatedCourses = [...currentCourses, course];
  await saveFirestoreCourses(updatedCourses);
  return updatedCourses;
}

export async function deleteFirestoreCourse(course: string): Promise<string[]> {
  const currentCourses = await getFirestoreCourses();
  const updatedCourses = currentCourses.filter(c => c !== course);
  await saveFirestoreCourses(updatedCourses);
  return updatedCourses;
}