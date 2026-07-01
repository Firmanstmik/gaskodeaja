<?php
namespace App\Infrastructure\Persistence\Eloquent;

use App\Models\QuestionAnswer as QuestionAnswerModel;
use App\Core\Domain\Entities\QuestionAnswer;
use App\Core\Domain\Repositories\QuestionAnswerRepositoryInterface;

class EloquentQuestionAnswerRepository implements QuestionAnswerRepositoryInterface {
    public function getAll(): array {
        return QuestionAnswerModel::all()->toArray();
    }

    public function getById(int $id): ?QuestionAnswer {
        $model = QuestionAnswerModel::find($id);
        if (!$model) return null;
        return new QuestionAnswer($model->id, $model->question, $model->answer);
    }

    public function create(array $data): QuestionAnswer {
        $model = QuestionAnswerModel::create($data);
        return new QuestionAnswer($model->id, $model->question, $model->answer);
    }

    public function update(int $id, array $data): QuestionAnswer {
        $model = QuestionAnswerModel::findOrFail($id);
        $model->update($data);
        return new QuestionAnswer($model->id, $model->question, $model->answer);
    }

    public function delete(int $id): bool {
        return QuestionAnswerModel::destroy($id) > 0;
    }
}