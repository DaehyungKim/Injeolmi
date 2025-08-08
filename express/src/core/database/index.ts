import 'reflect-metadata';
import { DataSource } from 'typeorm';


const entityPaths = [
    // 개발 환경용: ts-node가 실행하는 TypeScript 파일 경로
    __dirname + '/../../features/**/*.entity.ts',

    // 프로덕션(컴파일 후) 환경용: node가 실행하는 JavaScript 파일 경로
    __dirname + '/../../features/**/*.entity.js'
];


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  // dropSchema: process.env.NODE_ENV === 'development', // 개발환경에서만 스키마 드롭
  logging: false,
  entities: [
    __dirname + '/../../features/**/entities/*.{ts,js}', 
  ],
  subscribers: [],
});