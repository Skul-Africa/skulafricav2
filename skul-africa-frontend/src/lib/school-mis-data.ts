// School Management Information System Data Management
// All data stored in localStorage for demo purposes

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  parentIds: string[];
  teacherIds: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  class: string;
  studentIds: string[];
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentIds: string[];
}

export interface Result {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  term: string;
  teacherId: string;
  date: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  status: 'present' | 'absent';
  date: string;
  teacherId: string;
  class: string;
}

export interface Notification {
  id: string;
  userId: string;
  userType: 'student' | 'teacher' | 'parent';
  type: 'result' | 'attendance' | 'announcement' | 'payment';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface TimetableEntry {
  id: string;
  class: string;
  subject: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
}

// Sample data for demo
const SAMPLE_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Adebayo Johnson',
    email: 'adebayo@student.school.edu',
    class: 'JSS 1',
    parentIds: ['p1'],
    teacherIds: ['t1', 't2']
  },
  {
    id: 's2',
    name: 'Fatima Ibrahim',
    email: 'fatima@student.school.edu',
    class: 'JSS 1',
    parentIds: ['p2'],
    teacherIds: ['t1', 't2']
  },
  {
    id: 's3',
    name: 'Chukwuemeka Nwosu',
    email: 'chukwuemeka@student.school.edu',
    class: 'JSS 2',
    parentIds: ['p3'],
    teacherIds: ['t3']
  }
];

const SAMPLE_TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Adebayo Johnson',
    email: 'adebayo@school.edu',
    subjects: ['Mathematics', 'Physics'],
    class: 'JSS 1',
    studentIds: ['s1', 's2']
  },
  {
    id: 't2',
    name: 'Mrs. Fatima Ibrahim',
    email: 'fatima@school.edu',
    subjects: ['English', 'Literature'],
    class: 'JSS 1',
    studentIds: ['s1', 's2']
  },
  {
    id: 't3',
    name: 'Mr. Chukwuemeka Nwosu',
    email: 'chukwuemeka@school.edu',
    subjects: ['Chemistry', 'Biology'],
    class: 'JSS 2',
    studentIds: ['s3']
  }
];

const SAMPLE_PARENTS: Parent[] = [
  {
    id: 'p1',
    name: 'Mr. Johnson Senior',
    email: 'johnson.senior@email.com',
    phone: '+234 801 234 5678',
    studentIds: ['s1']
  },
  {
    id: 'p2',
    name: 'Mrs. Ibrahim',
    email: 'ibrahim@email.com',
    phone: '+234 802 345 6789',
    studentIds: ['s2']
  },
  {
    id: 'p3',
    name: 'Mr. Nwosu',
    email: 'nwosu@email.com',
    phone: '+234 803 456 7890',
    studentIds: ['s3']
  }
];

// Utility functions
function getStorageKey(subdomain: string, type: string): string {
  return `${subdomain}-${type}`;
}

function getFromStorage<T>(subdomain: string, type: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const key = getStorageKey(subdomain, type);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

// Type-specific getters
function getRelationships(subdomain: string) {
  return getFromStorage(subdomain, 'relationships', {
    students: [] as Student[],
    teachers: [] as Teacher[],
    parents: [] as Parent[],
    links: [] as Array<{studentId: string, parentId?: string, teacherId?: string}>
  });
}

export function getResults(subdomain: string): Result[] {
  return getFromStorage(subdomain, 'results', [] as Result[]);
}

export function getAttendance(subdomain: string): Attendance[] {
  return getFromStorage(subdomain, 'attendance', [] as Attendance[]);
}

export function getNotifications(subdomain: string): Notification[] {
  return getFromStorage(subdomain, 'notifications', [] as Notification[]);
}

export function getTimetables(subdomain: string): TimetableEntry[] {
  return getFromStorage(subdomain, 'timetables', [] as TimetableEntry[]);
}

function saveToStorage(subdomain: string, type: string, data: any): void {
  if (typeof window === 'undefined') return;

  try {
    const key = getStorageKey(subdomain, type);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Initialize sample data for a school
export function initializeSchoolData(subdomain: string): void {
  // Initialize relationships
  const relationships = {
    students: SAMPLE_STUDENTS,
    teachers: SAMPLE_TEACHERS,
    parents: SAMPLE_PARENTS,
    links: [
      { studentId: 's1', parentId: 'p1' },
      { studentId: 's1', teacherId: 't1' },
      { studentId: 's1', teacherId: 't2' },
      { studentId: 's2', parentId: 'p2' },
      { studentId: 's2', teacherId: 't1' },
      { studentId: 's2', teacherId: 't2' },
      { studentId: 's3', parentId: 'p3' },
      { studentId: 's3', teacherId: 't3' }
    ]
  };

  saveToStorage(subdomain, 'relationships', relationships);

  // Initialize empty arrays for other data
  saveToStorage(subdomain, 'results', []);
  saveToStorage(subdomain, 'attendance', []);
  saveToStorage(subdomain, 'notifications', []);
  saveToStorage(subdomain, 'timetables', []);
}

// Relationship management
export async function getSchoolRelationships(subdomain: string) {
  return getRelationships(subdomain);
}

export async function getStudentsForTeacher(subdomain: string, teacherId: string): Promise<Student[]> {
  const relationships = await getSchoolRelationships(subdomain);
  const teacherLinks = relationships.links.filter(link => link.teacherId === teacherId);
  const studentIds = teacherLinks.map(link => link.studentId);

  return relationships.students.filter(student => studentIds.includes(student.id));
}

export async function getStudentsForParent(subdomain: string, parentId: string): Promise<Student[]> {
  const relationships = await getSchoolRelationships(subdomain);
  const parentLinks = relationships.links.filter(link => link.parentId === parentId);
  const studentIds = parentLinks.map(link => link.studentId);

  return relationships.students.filter(student => studentIds.includes(student.id));
}

export async function getTeachersForStudent(subdomain: string, studentId: string): Promise<Teacher[]> {
  const relationships = await getSchoolRelationships(subdomain);
  const studentLinks = relationships.links.filter(link => link.studentId === studentId);
  const teacherIds = studentLinks.map(link => link.teacherId);

  return relationships.teachers.filter(teacher => teacherIds.includes(teacher.id));
}

// Results management
export async function saveResult(subdomain: string, result: Omit<Result, 'id'>): Promise<void> {
  const results = getResults(subdomain);
  const newResult: Result = {
    ...result,
    id: Date.now().toString()
  };

  results.push(newResult);
  saveToStorage(subdomain, 'results', results);

  // Create notification for student
  await createNotification(subdomain, result.studentId, 'student', 'result',
    'New Result Available', `Your ${result.subject} result for ${result.term} is now available.`);

  // Create notification for parents
  const relationships = await getSchoolRelationships(subdomain);
  const student = relationships.students.find(s => s.id === result.studentId);
  if (student) {
    for (const parentId of student.parentIds) {
      await createNotification(subdomain, parentId, 'parent', 'result',
        'Child Result Available', `${student.name}'s ${result.subject} result for ${result.term} is now available.`);
    }
  }
}

export async function getResultsForStudent(subdomain: string, studentId: string): Promise<Result[]> {
  const results = getResults(subdomain);
  return results.filter(result => result.studentId === studentId);
}

export async function getResultsForTeacher(subdomain: string, teacherId: string): Promise<Result[]> {
  const results = getResults(subdomain);
  return results.filter(result => result.teacherId === teacherId);
}

// Attendance management
export async function saveAttendance(subdomain: string, attendance: Omit<Attendance, 'id'>): Promise<void> {
  const attendanceRecords = getAttendance(subdomain);
  const newAttendance: Attendance = {
    ...attendance,
    id: Date.now().toString()
  };

  attendanceRecords.push(newAttendance);
  saveToStorage(subdomain, 'attendance', attendanceRecords);

  // Create notification for student
  await createNotification(subdomain, attendance.studentId, 'student', 'attendance',
    'Attendance Marked', `Your attendance for ${attendance.date} has been marked as ${attendance.status}.`);

  // Create notification for parents
  const relationships = await getSchoolRelationships(subdomain);
  const student = relationships.students.find(s => s.id === attendance.studentId);
  if (student) {
    for (const parentId of student.parentIds) {
      await createNotification(subdomain, parentId, 'parent', 'attendance',
        'Child Attendance Update', `${student.name}'s attendance for ${attendance.date} has been marked as ${attendance.status}.`);
    }
  }
}

export async function getAttendanceForStudent(subdomain: string, studentId: string): Promise<Attendance[]> {
  const attendance = getAttendance(subdomain);
  return attendance.filter(record => record.studentId === studentId);
}

export async function getAttendanceForTeacher(subdomain: string, teacherId: string, date?: string): Promise<Attendance[]> {
  const attendance = getAttendance(subdomain);
  let filtered = attendance.filter(record => record.teacherId === teacherId);
  if (date) {
    filtered = filtered.filter(record => record.date === date);
  }
  return filtered;
}

// Notifications management
export async function createNotification(
  subdomain: string,
  userId: string,
  userType: 'student' | 'teacher' | 'parent',
  type: 'result' | 'attendance' | 'announcement' | 'payment',
  title: string,
  message: string
): Promise<void> {
  const notifications = getNotifications(subdomain);
  const newNotification: Notification = {
    id: Date.now().toString(),
    userId,
    userType,
    type,
    title,
    message,
    date: new Date().toISOString(),
    read: false
  };

  notifications.push(newNotification);
  saveToStorage(subdomain, 'notifications', notifications);
}

export async function getNotificationsForUser(
  subdomain: string,
  userId: string,
  userType: 'student' | 'teacher' | 'parent'
): Promise<Notification[]> {
  const notifications = getNotifications(subdomain);
  return notifications.filter(notification =>
    notification.userId === userId && notification.userType === userType
  );
}

export async function markNotificationAsRead(subdomain: string, notificationId: string): Promise<void> {
  const notifications = getNotifications(subdomain);
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    saveToStorage(subdomain, 'notifications', notifications);
  }
}

// Timetables management
export async function saveTimetable(subdomain: string, timetable: Omit<TimetableEntry, 'id'>): Promise<void> {
  const timetables = getTimetables(subdomain);
  const newTimetable: TimetableEntry = {
    ...timetable,
    id: Date.now().toString()
  };

  timetables.push(newTimetable);
  saveToStorage(subdomain, 'timetables', timetables);
}

export async function getTimetablesForClass(subdomain: string, className: string): Promise<TimetableEntry[]> {
  const timetables = getTimetables(subdomain);
  return timetables.filter(entry => entry.class === className);
}

export async function getTimetablesForTeacher(subdomain: string, teacherName: string): Promise<TimetableEntry[]> {
  const timetables = getTimetables(subdomain);
  return timetables.filter(entry => entry.teacher === teacherName);
}