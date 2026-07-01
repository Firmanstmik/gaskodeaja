<?php
namespace App\Presentation\Http\API;

use App\Core\Application\UseCases\ContactMeUseCase;
use App\Presentation\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactMeController extends Controller
{
    protected $contactMeUseCase;

    public function __construct(ContactMeUseCase $contactMeUseCase)
    {
        $this->contactMeUseCase = $contactMeUseCase;
    }

    public function index()
    {
        return response()->json($this->contactMeUseCase->getAllContacts());
    }

    public function show($id)
    {
        $contact = $this->contactMeUseCase->getContactById($id);
        return $contact ? response()->json($contact) : response()->json(['m' => 'Not Found'], 404);
    }

    public function store(Request $request)
    {
        $data = $this->contactMeUseCase->createContact($request->all());
        return response()->json($data, 201);
    }

    public function update(Request $request, $id)
    {
        $this->contactMeUseCase->updateContact($id, $request->all());
        return response()->json(['message' => 'Updated']);
    }

    public function destroy($id)
    {
        $this->contactMeUseCase->deleteContact($id);
        return response()->json(['message' => 'Deleted']);
    }

}