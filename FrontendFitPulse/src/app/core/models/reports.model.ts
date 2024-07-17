export interface Report {
    id: string;
    studentId: string;
    teacherId: string;
    value: number;
    evaluationType: string;
    evaluationDate: Date;
}