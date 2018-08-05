from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from models import Tasks
from serializers import TasksSerializer

@csrf_exempt
def task_list(request):
    """
    List all code tasks, or create a new task.
    """
    if request.method == 'GET':
        tasks = Tasks.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        print("printGET:",repr(serializer))
        response = JsonResponse(serializer.data, safe=False)
        return response

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TasksSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            print(serializer.errors)
        return JsonResponse(serializer.data, status=400,)
        
@csrf_exempt        
def task_detail(request, id):
    """
    Retrieve, update or delete a task.
    """
    try:
        task = Tasks.objects.get(task_id=id)
    except task.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TasksSerializer(task)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TasksSerializer(task, data=data)
        print("printdata:",data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        else:
            print(serializer.errors)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        task.delete()
        return HttpResponse(status=204)     