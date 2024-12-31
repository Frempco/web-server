import { Socket } from 'socket.io';

export interface Classrooms {
  [classroomName: string]: {
    teacherSocketId: SocketId;
    students: SocketId[];
    // We track the chats so we can email them to the teacher at the end of class
    chats: ChatConversation | {};
  };
}

export interface Teachers {
  [teacherSocketId: SocketId]: {
    socket: Socket;
    classroomName: string;
  };
}

export interface Students {
  [studentSocketId: SocketId]: Student;
}

export interface Student {
  socket: Socket;
  classroomName: string;
  realName: string;
  peerSocketId: SocketId | null;
}

export interface ChatIds {
  [socketId: SocketId]: ChatId;
}

export type ChatId = '${SocketId}#${SocketId}';

type SocketId = string;

type ChatConversation = Record<ChatId, StudentChat>;

export interface StudentChat {
  studentPair: [StudentId, StudentId];
  messages: ChatMessage[];
}

interface StudentId {
  realName: string;
  character: string;
  socketId: SocketId;
}

export type ChatMessage = ['student1' | 'student2' | 'teacher', string];
