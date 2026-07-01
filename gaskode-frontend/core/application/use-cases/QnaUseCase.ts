import { IQnaRepository } from "@/core/domain/repositories/IQnaRepository";
import { Qna } from "@/core/domain/entities/Qna";

export class QnaUseCase {
    constructor(private qnaRepo: IQnaRepository) { }

    async getAllQna() {
        return await this.qnaRepo.findAll();
    }

    async addQna(data: Omit<Qna, 'id'>) {
        return await this.qnaRepo.create(data);
    }

    async updateQna(id: number, data: Partial<Qna>) {
        return await this.qnaRepo.update(id, data);
    }

    async deleteQna(id: number) {
        return await this.qnaRepo.delete(id);
    }
}