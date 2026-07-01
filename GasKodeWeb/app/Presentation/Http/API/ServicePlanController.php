<?php

namespace App\Presentation\Http\API;
use Illuminate\Http\Request;
use App\Core\Application\UseCases\ServicePlanUseCase;
use App\Presentation\Http\Controllers\Controller;

class ServicePlanController extends Controller
{
    public function index(ServicePlanUseCase $useCase)
    {
        return response()->json($useCase->executeGetAll());
    }

    public function store(Request $request, ServicePlanUseCase $useCase)
    {
        $data = $request->validate([
            'service_id'       => 'required|exists:services,id',
            'name'             => 'required|string',
            'price'            => 'required|numeric',
            'features'         => 'required|array',
            'maintenance_cost' => 'required|numeric',
            'is_featured'      => 'boolean'
        ]);

        return response()->json($useCase->executeCreate($data), 201);
    }

    public function show(int $id, ServicePlanUseCase $useCase)
    {
        $plan = $useCase->executeById($id);
        return $plan ? response()->json($plan) : response()->json(['message' => 'Plan not found'], 404);
    }

    public function update(Request $request, int $id, ServicePlanUseCase $useCase)
    {
        $data = $request->validate([
            'service_id'       => 'required|exists:services,id',
            'name'             => 'required|string',
            'price'            => 'required|numeric',
            'features'         => 'required|array',
            'maintenance_cost' => 'required|numeric',
            'is_featured'      => 'boolean'
        ]);

        return response()->json($useCase->executeUpdate($id, $data));
    }

    public function destroy(int $id, ServicePlanUseCase $useCase)
    {
        $useCase->executeDelete($id);
        return response()->json(['message' => 'Service plan deleted successfully']);
    }

    public function byService(int $serviceId, ServicePlanUseCase $useCase)
    {
        $plans = $useCase->executeByServiceId($serviceId);
        
        if (empty($plans)) {
            return response()->json([
                'message' => 'No plans found for this service'
            ], 404);
        }

        return response()->json($plans);
    }
}